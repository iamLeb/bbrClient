import { useState, useCallback } from "react";

//date-utility function to format date as string as like HH_MM or YYYY_MM_DD
import { format } from "date-fns";

import PropTypes from "prop-types";

//icons
import {
  CalendarIcon,
  Edit2,
  Trash2,
  Check,
  X,
  EyeOff,
  Eye,
} from "lucide-react";

//helper functions
import { updateAvailability } from "./availabilityHelpers";

import ConfirmationPopup from "./ConfirmationPopup";

const LoadingSpinner = () => (
  <svg
    className="animate-spin h-8 w-8 text-blue-500 mx-auto"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
      fill="none"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

//backend API
import api from "../../../services/api.js";

const AvailabilityList = ({
  availabilities,
  setAvailabilities,
  addNotification,
}) => {
  const [hideAdded, setHideAdded] = useState(false);
  const [confirmation, setConfirmation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Generic function to handle confirmations
  const handleConfirmation = useCallback((message, onConfirm) => {
    setConfirmation({ message, onConfirm });
  }, []);

    //to delete a particular availablity from availablities[] and  pop up a display message
    const onDelete = useCallback(
      (index) => {
        const deletedAvailability = availabilities[index];
        setAvailabilities((prev) => prev.filter((_, i) => i !== index));
        addNotification(
          `Availability for ${format(
            new Date(deletedAvailability.date),
            "MMMM dd, yyyy"
          )} has been removed from sending to databases.`,
          "info"
        );
      },
      [availabilities, setAvailabilities, addNotification]
    );
  

  // Function to clear the confirmation
  const clearConfirmation = useCallback(() => setConfirmation(null), []);
  const onClearAll = () => {
    setAvailabilities([]);
    addNotification("All availabilities have been cleared.", "info");
  };

  const onClearAdded = () => {
    setAvailabilities((prev) =>
      prev.filter((avail) => avail.status !== "added")
    );
    addNotification("All added availabilities have been cleared.", "info");
  };

  // Updated clear all function
  const handleClearAll = () => {
    if (availabilities.length > 0) {
      handleConfirmation(
        "Are you sure you want to clear all availabilities?",
        () => {
          onClearAll();
          clearConfirmation();
        }
      );
    }
  };

  // Updated clear added function
  const handleClearAdded = () => {
    const addedCount = availabilities.filter(
      (a) => a.status === "added"
    ).length;
    if (addedCount > 0) {
      handleConfirmation(
        "Are you sure you want to clear all added availabilities?",
        () => {
          onClearAdded();
          clearConfirmation();
        }
      );
    }
  };

  // Updated delete function
  const handleDelete = useCallback(
    (index) => {
      handleConfirmation(
        `Are you sure you want to delete this availability for ${format(
          new Date(availabilities[index].date),
          "MMMM dd, yyyy"
        )}?`,
        () => {
          onDelete(index);
          clearConfirmation();
        }
      );
    },
    [availabilities, handleConfirmation, onDelete, clearConfirmation]
  );

  //to cancel an update by setting isEditing to false
  const onCancel = useCallback(
    (index) => {
      setAvailabilities((prev) =>
        prev.map((avail, i) =>
          i === index ? { ...avail, isEditing: false } : avail
        )
      );
    },
    [setAvailabilities]
  );

  //to filterAvailabilities based on hideAdded being true ot false
  const filteredAvailabilities = hideAdded
    ? availabilities.filter((a) => a.status !== "added")
    : availabilities;


  //to update a particular availability
  const onEdit = useCallback(
    (index, field, value) => {
      setAvailabilities((prev) =>
        prev.map((avail, i) =>
          i === index ? updateAvailability(avail, field, value) : avail
        )
      );
    },
    [setAvailabilities]
  );

  //to confirm a particular update
  const onConfirm = useCallback(
    (index) => {
      setAvailabilities((prev) =>
        prev.map((avail, i) =>
          i === index
            ? {
                ...avail,
                isEditing: false,
                startTimeInput: undefined,
                endTimeInput: undefined,
              }
            : avail
        )
      );
    },
    [setAvailabilities]
  );

  //for sending to database
  const onSendToDatabase = async () => {
    // Set loading state to true to show a loading spinner
    setIsLoading(true);

    try {
      // Filter out pending availabilities from the current state
      const pendingAvailabilities = availabilities.filter(
        (avail) => avail.status === "pending"
      );

      // Check if there are any pending availabilities to process
      if (pendingAvailabilities.length === 0) {
        addNotification("No pending availabilities to send.", "info");
        return;
      }

      // Use Promise.allSettled to send all pending availabilities to the server concurrently
      // This allows us to process both successful and failed requests
      const results = await Promise.allSettled(
        pendingAvailabilities.map((availability) =>
          api.post("/availability/create", availability)
        )
      );

      // Process the results of the API calls
      const updatedAvailabilities = results.map((result, index) => {
        const availability = pendingAvailabilities[index];

        if (result.status === "fulfilled") {
          // If the API call was successful, update the availability status and add the server-generated ID
          return {
            ...availability,
            status: "added",
            _id: result.value.data._id,
          };
        } else {
          // If the API call failed, determine the reason for rejection
          const errorMessage =
            result.reason.response?.data?.error || "Unknown error";

          // Categorize the error based on its content
          const rejectionReason = errorMessage.includes(
            "Duplicate availability"
          )
            ? "existing-availability"
            : errorMessage.includes("covers this time range already exists")
            ? "overlapping-availability"
            : "unknown-error";

          // Return the availability with updated status and reason
          return {
            ...availability,
            status: `rejected : ${rejectionReason}`,
          };
        }
      });

      // Update the availabilities state, replacing the processed availabilities with their updated versions
      setAvailabilities((prev) =>
        prev.map(
          (avail) =>
            updatedAvailabilities.find((updated) => updated.id === avail.id) ||
            avail
        )
      );

      // Count successful and failed operations
      const successCount = results.filter(
        (r) => r.status === "fulfilled"
      ).length;
      const failCount = results.length - successCount;

      // Notify the user of the results
      if (successCount > 0) {
        addNotification(`Sent ${successCount} availability slots.`, "success");
      }
      if (failCount > 0) {
        addNotification(
          `Failed to send ${failCount} slots. Check details.`,
          "error"
        );
      }
    } catch (error) {
      // Handle any unexpected errors that weren't caught by Promise.allSettled
      console.error("Error in send to database process:", error);
      addNotification("Unexpected error. Please try again later.", "error");
    } finally {
      // Ensure that the loading state is set back to false, regardless of success or failure
      setIsLoading(false);
    }
  };

  const AvailabilityItem = useCallback(
    (availability, index) => (
      <li
        key={availability.id}
        className={`bg-gray-50 p-4 rounded-md flex flex-wrap justify-between items-center gap-4 transition-all duration-300 hover:shadow-md ${
          availability.status === "rejected"
            ? "border-l-4 border-red-500"
            : availability.status === "added"
            ? "border-l-4 border-green-500"
            : "border-l-4 border-yellow-500"
        }`}
      >
        <span className="flex items-center space-x-4 flex-grow">
          <CalendarIcon size={20} className="text-gray-500" />
          <span className="font-medium text-gray-700">
            {format(new Date(availability.date), "yyyy-MM-dd")}:
          </span>
          {availability.isEditing ? (
            <div className="flex items-center space-x-2">
              <input
                type="time"
                value={format(new Date(availability.startTime), "HH:mm")}
                onChange={(e) => onEdit(index, "startTime", e.target.value)}
                className="w-24 px-2 py-1 border rounded text-sm"
              />
              <span>-</span>
              <input
                type="time"
                value={format(new Date(availability.endTime), "HH:mm")}
                onChange={(e) => onEdit(index, "endTime", e.target.value)}
                className="w-24 px-2 py-1 border rounded text-sm"
              />
            </div>
          ) : (
            <span className="text-gray-600">
              {format(new Date(availability.startTime), "HH:mm")} -{" "}
              {format(new Date(availability.endTime), "HH:mm")}
            </span>
          )}
        </span>
        <div className="space-x-2 flex items-center">
          {availability.isEditing ? (
            <>
              <button
                onClick={() => onConfirm(index)}
                className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors duration-300"
                title="Confirm"
              >
                <Check size={16} />
              </button>
              <button
                onClick={() => onCancel(index)}
                className="p-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors duration-300"
                title="Cancel"
              >
                <X size={16} />
              </button>
            </>
          ) : (
            <button
              onClick={() => onEdit(index, "isEditing", true)}
              className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300"
              title="Edit"
            >
              <Edit2 size={16} />
            </button>
          )}
          <button
            onClick={() => handleDelete(index)}
            className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-300"
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
          <span
            className={`ml-2 px-2 py-1 rounded-full text-xs ${
              availability.status === "rejected"
                ? "bg-red-100 text-red-800"
                : availability.status === "added"
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {availability.status}
          </span>
        </div>
      </li>
    ),
    [onEdit, onConfirm, onCancel, handleDelete]
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex flex-col mb-6 space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          Pending Availabilities to be added
        </h2>
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4">
          {/* Hide/Show toggle button */}
          <button
            onClick={() => setHideAdded(!hideAdded)}
            className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-md transition-colors duration-200 ease-in-out w-full sm:w-auto ${
              hideAdded
                ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {hideAdded ? (
              <>
                <EyeOff size={18} />
                <span>Show All</span>
              </>
            ) : (
              <>
                <Eye size={18} />
                <span>Hide Added</span>
              </>
            )}
          </button>
          {/* Clear All button */}
          <button
            onClick={handleClearAll}
            disabled={availabilities.length === 0}
            className={`px-4 py-2 rounded-md transition-colors duration-200 ease-in-out w-full sm:w-auto ${
              availabilities.length === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-red-500 text-white hover:bg-red-600"
            }`}
          >
            Clear All
          </button>
          <button
            onClick={handleClearAdded}
            disabled={
              availabilities.filter((a) => a.status === "added").length === 0
            }
            className={`px-4 py-2 rounded-md transition-colors duration-200 ease-in-out w-full sm:w-auto ${
              availabilities.filter((a) => a.status === "added").length === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-yellow-500 text-white hover:bg-yellow-600"
            }`}
          >
            Clear Added
          </button>
          <button
            onClick={onSendToDatabase}
            disabled={
              isLoading ||
              availabilities.filter((a) => a.status === "pending").length === 0
            }
            className={`px-4 py-2 rounded-md transition-colors duration-200 ease-in-out w-full sm:w-auto ${
              isLoading ||
              availabilities.filter((a) => a.status === "pending").length === 0
                ? "bg-blue-300 text-blue-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            {isLoading ? <LoadingSpinner /> : "Send to Database"}
          </button>
        </div>
      </div>
      {filteredAvailabilities.length > 0 ? (
        <ul className="space-y-4">
          {filteredAvailabilities.map(AvailabilityItem)}
        </ul>
      ) : (
        <p className="text-gray-500 italic">No availabilities found.</p>
      )}
      {/* Add the ConfirmationPopup here */}
      {confirmation && (
        <ConfirmationPopup
          message={confirmation.message}
          onConfirm={confirmation.onConfirm}
          onCancel={clearConfirmation}
        />
      )}
    </div>
  );
};

AvailabilityList.propTypes = {
  availabilities: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      startTime: PropTypes.string.isRequired,
      endTime: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      isEditing: PropTypes.bool,
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  setAvailabilities: PropTypes.func.isRequired,
  addNotification: PropTypes.func.isRequired,
};

export default AvailabilityList;
