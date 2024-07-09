// ===== IMPORTS =====

// React hooks for state management and side effects
import { useState, useEffect } from "react";

// Calendar component and its styles
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

// Date manipulation utilities
import {
  format,
  addDays,
  parse,
  setMilliseconds,
  setHours,
  setMinutes,
  setSeconds,
} from "date-fns";

// Icons for UI elements
import {
  Clock,
  Calendar as CalendarIcon,
  Repeat,
  Trash2,
  Edit2,
  Check,
  X,
} from "lucide-react";

// API service for backend communication
import api from "../../services/api";

const Availability = () => {
  // ===== STATE DECLARATIONS =====

  // Date and time states
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");

  //Repeat functionality states
  const [repeat, setRepeat] = useState("none");
  const [repeatUntil, setRepeatUntil] = useState(new Date());

  //Availability management states
  const [availabilities, setAvailabilities] = useState([]);
  const [availabilityStatuses, setAvailabilityStatuses] = useState([]);

  //UI states
  const [notifications, setNotifications] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // ===== EVENT HANDLERS =====

  // Simple state update handlers
  const handleDateChange = (e) => setSelectedDate(e);
  const handleStartTimeChange = (e) => setStartTime(e.target.value);
  const handleEndTimeChange = (e) => setEndTime(e.target.value);
  const handleRepeatChange = (e) => setRepeat(e.target.value);
  const handleRepeatUntilChange = (e) => setRepeatUntil(e.target.value);

  // ===== AVAILABILITY EDITING FUNCTIONS =====

  /**
   * Initiates the editing process for a specific availability
   * @param {number} index - The index of the availability to edit
   */
  const handleStartEdit = (index) => {
    // Start the editing process for a specific availability
    setIsEditing(true);

    // Update the availabilities array
    setAvailabilities(
      availabilities.map(
        (a, i) =>
          i === index
            ? { ...a, isEditing: true } // Add 'isEditing' flag to the selected availability
            : a // Leave other availabilities unchanged
      )
    );
  };

  /**
   * Confirms or cancels the editing of an availability
   * @param {number} index - The index of the availability being edited
   */ const handleConfirmCancelEdit = (index) => {
    setIsEditing(false);

    setAvailabilities(
      availabilities.map((a, i) =>
        i === index ? { ...a, isEditing: false } : a
      )
    );
  };

  // ===== AVAILABILITY MANAGEMENT FUNCTIONS =====

  /**
   * Checks if a new availability overlaps with existing ones just the dates not starting and ending time
   * @param {Date} newDate - The date to check for overlap
   * @returns {boolean} True if overlap exists, false otherwise
   */

  const checkOverlap = (newDate) => {
    return availabilities.some((availability) => {
      const existingDate = new Date(availability.date);
      return (
        existingDate.getFullYear() === newDate.getFullYear() &&
        existingDate.getMonth() === newDate.getMonth() &&
        existingDate.getDate() === newDate.getDate()
      );
    });
  };

  /**
   * Handles editing of start or end time for an availability
   * @param {number} index - Index of the availability to edit
   * @param {string} field - Field to edit ('startTime' or 'endTime')
   * @param {string} value - New time value
   */
  const handleEditTime = (index, field, value) => {
    // Update availabilities array using map function
    const updatedAvailabilities = availabilities.map((a, i) => {
      // Check if the current availability is the one being updated
      if (i === index) {
        // Parse this combined string into a Date object
        const updatedDate = parse(
          `${format(a.date, "yyyy-MM-dd")} ${value}`,
          "yyyy-MM-dd HH:mm",
          new Date()
        );

        // Create a new availability object, spreading the existing properties
        // and updating the specified field (startTime or endTime) with the new date
        let updatedAvailability = { ...a, [field]: updatedDate };

        // Handle potential conflicts between start and end times
        if (
          field === "startTime" &&
          updatedAvailability.endTime &&
          updatedAvailability.startTime >= updatedAvailability.endTime
        ) {
          // If we're updating the start time and it's now later than or equal to the end time,
          // adjust the end time to be 1 minute after the new start time
          updatedAvailability.endTime = new Date(
            updatedAvailability.startTime.getTime() + 60000
          ); // Add 60,000 milliseconds (1 minute)
        } else if (
          field === "endTime" &&
          updatedAvailability.startTime &&
          updatedAvailability.endTime <= updatedAvailability.startTime
        ) {
          // If we're updating the end time and it's now earlier than or equal to the start time,
          // adjust the start time to be 1 minute before the new end time
          updatedAvailability.startTime = new Date(
            updatedAvailability.endTime.getTime() - 60000
          ); // Subtract 60,000 milliseconds (1 minute)
        }
        // Update the status of the edited availability
        setAvailabilityStatuses((prevStatuses) =>
          prevStatuses.map(
            (status, i) =>
              i === index
                ? { status: "pending" } // Set the status of the edited availability to "pending"
                : status // Keep the status of other availabilities unchanged
          )
        );
        // Return the updated availability object
        return updatedAvailability;
      }
      // If this isn't the availability being updated, return it unchanged
      return a;
    });

    setAvailabilities(updatedAvailabilities);
  };

  /**
   * Deletes an availability from the list
   * @param {number} index - Index of the availability to delete
   */
  const handleDelete = (index) => {
    setAvailabilities(availabilities.filter((_, i) => i !== index));
    setAvailabilityStatuses((prevStatuses) =>
      prevStatuses.filter((_, i) => i !== index)
    );
    setIsEditing(false);
  };

  // ===== NOTIFICATION MANAGEMENT =====
  /**
   * Adds a new notification and removes it after 5 seconds
   * @param {string} message - Notification message
   * @param {string} type - Notification type ('warning', 'success', 'error')
   */

  const addNotification = (message, type = "warning") => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications((prev) =>
        prev.filter((notification) => notification.id !== id)
      );
    }, 5000);
  };

  // ===== DATABASE INTERACTION =====
  /**
   * Sends availabilities to the database and updates local state
   */
  const handleSendToDatabase = async () => {
    setIsLoading(true);
    try {
      // Remove 'isEditing' property from each availability object
      const cleanedAvailabilities = availabilities.map((availability) => {
        const cleanedAvailability = { ...availability };
        delete cleanedAvailability.isEditing;
        return cleanedAvailability;
      });

      const createdAvailabilities = []; // Array to store successfully created availabilities
      const statuses = []; // Array to store status of each availability creation attempt

      // Iterate through each cleaned availability
      for (let availability of cleanedAvailabilities) {
        try {
          // Send POST request to create availability in the database
          const response = await api.post("/availability/create", availability);

          // If successful, add to createdAvailabilities and update status
          createdAvailabilities.push(response.data);
          statuses.push({ id: response.data._id, status: "added" });
        } catch (error) {
          // If creation fails, log error and update status with error information
          console.error("Error creating availability:", error);
          statuses.push({
            id: availability._id,
            status: "rejected",
            reason: error.response?.data?.error || "Unknown error",
          });
        }
      }

      // Update the availability statuses
      setAvailabilityStatuses(statuses);

      // Get IDs of successfully added availabilities
      const successfullyAddedIds = statuses
        .filter((status) => status.status === "added")
        .map((status) => status.id);

      // Remove successfully added availabilities from local state
      setAvailabilities((prevAvailabilities) =>
        prevAvailabilities.filter(
          (availability) => !successfullyAddedIds.includes(availability._id)
        )
      );

      // Add success notification
      addNotification(
        `${createdAvailabilities.length} availabilities sent to database successfully`,
        "success"
      );

      // Clear all notifications after a short delay
      setTimeout(() => {
        setNotifications([]);
      }, 5000); // Clear after 5 seconds
    } catch (error) {
      console.error("Error in send to database process:", error);
      addNotification(
        "Failed to complete send to database process. Some availabilities may not have been added.",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // ===== FORM SUBMISSION =====
  /**
   * Handles form submission for adding new availabilities
   * @param {Event} e - Form submit event
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    // Set the current date to midnight (00:00:00.000) of the selected date
    let currentDate = setMilliseconds(
      setSeconds(setMinutes(setHours(new Date(selectedDate), 0), 0), 0),
      0
    );

    // Format the current date as a string (YYYY-MM-DD)
    let dateString = format(currentDate, "yyyy-MM-dd");

    const newAvailabilities = []; // Array to store new availabilities
    const skippedDates = []; // Array to store dates that couldn't be added due to overlap

    // Check if repeatUntil is a string (valid date input)
    if (typeof repeatUntil === "string") {
      // Parse the repeatUntil date
      const repeatUntilDate = parse(repeatUntil, "yyyy-MM-dd", new Date());

      // Loop through dates from currentDate to repeatUntilDate
      while (currentDate <= repeatUntilDate) {
        dateString = format(currentDate, "yyyy-MM-dd");

        // Create new Date objects for start and end times
        const newStart = parse(
          `${dateString} ${startTime}`,
          "yyyy-MM-dd HH:mm",
          new Date()
        );
        const newEnd = parse(
          `${dateString} ${endTime}`,
          "yyyy-MM-dd HH:mm",
          new Date()
        );

        // Check for overlap with existing availabilities
        if (!checkOverlap(newStart, newEnd)) {
          newAvailabilities.push({
            date: currentDate,
            startTime: newStart,
            endTime: newEnd,
          });
        } else {
          // If overlap, add date to skipped dates
          skippedDates.push(format(currentDate, "MMMM dd, yyyy"));
        }

        if (repeat === "none") break;
        currentDate = addDays(currentDate, repeat === "weekly" ? 7 : 1);
      }
    } else if (selectedDate === repeatUntil) {
      const newStart = parse(
        `${dateString} ${startTime}`,
        "yyyy-MM-dd HH:mm",
        new Date()
      );
      const newEnd = parse(
        `${dateString} ${endTime}`,
        "yyyy-MM-dd HH:mm",
        new Date()
      );

      if (!checkOverlap(newStart, newEnd)) {
        newAvailabilities.push({
          date: currentDate,
          startTime: newStart,
          endTime: newEnd,
        });
      } else {
        skippedDates.push(format(currentDate, "MMMM dd, yyyy"));
      }
    }

    // If any dates were skipped due to overlap, show notification
    if (skippedDates.length > 0) {
      addNotification(
        `Overlap detected for the following dates: ${skippedDates.join(
          ", "
        )}.Cannot be added on pending state.`,
        "error"
      );
    }

    // If new availabilities were created
    if (newAvailabilities.length > 0) {
      const newAvailabilitiesWithIds = newAvailabilities.map((avail) => ({
        ...avail,
        _id: Date.now() + Math.random(),
      }));

      setAvailabilities((prev) => [...prev, ...newAvailabilitiesWithIds]);

      // Update availabilityStatuses for new availabilities
      const newStatuses = newAvailabilitiesWithIds.map((avail) => ({
        id: avail._id,
        status: "pending",
      }));

      setAvailabilityStatuses((prevStatuses) => [
        ...prevStatuses,
        ...newStatuses,
      ]);

      addNotification(
        `Added ${newAvailabilities.length} availabilities`,
        "success"
      );
    }
  };

  // Update repeatUntil when selectedDate changes
  useEffect(() => {
    setRepeatUntil(selectedDate);
  }, [selectedDate]);

  return (
    <div className="p-8 max-w-6xl mx-auto bg-gray-50 min-h-screen">
      {/* Main heading */}
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Availability Management
      </h1>

      {/* Calendar and form container */}
      <div className="flex flex-col lg:flex-row gap-8 mb-12">
        {/* Calendar component */}
        <div className="lg:w-1/2">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              className="w-full border-none"
              minDate={new Date()}
            />
          </div>
        </div>

        {/* Form */}
        <div className="lg:w-1/2">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-md space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Selected Date
              </label>
              <div className="relative">
                <CalendarIcon
                  className="absolute top-3 left-3 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  value={format(selectedDate, "MMMM dd, yyyy")}
                  readOnly
                  className="pl-10 w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Time
                </label>
                <div className="relative">
                  <Clock
                    className="absolute top-3 left-3 text-gray-400"
                    size={20}
                  />
                  <input
                    type="time"
                    value={startTime}
                    onChange={handleStartTimeChange}
                    className="pl-10 w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    step="60"
                  />
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Time
                </label>
                <div className="relative">
                  <Clock
                    className="absolute top-3 left-3 text-gray-400"
                    size={20}
                  />
                  <input
                    type="time"
                    value={endTime}
                    onChange={handleEndTimeChange}
                    className="pl-10 w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    step="60"
                    min={startTime}
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Repeat
              </label>
              <div className="relative">
                <Repeat
                  className="absolute top-3 left-3 text-gray-400"
                  size={20}
                />
                <select
                  value={repeat}
                  onChange={handleRepeatChange}
                  className="pl-10 w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="none">No repeat</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                </select>
              </div>
            </div>
            {repeat !== "none" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Repeat Until
                </label>
                <div className="relative">
                  <CalendarIcon
                    className="absolute top-3 left-3 text-gray-400"
                    size={20}
                  />
                  <input
                    type="date"
                    value={repeatUntil}
                    onChange={handleRepeatUntilChange}
                    min={format(selectedDate, "yyyy-MM-dd")}
                    className="pl-10 w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            )}
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center"
            >
              <CalendarIcon size={20} className="mr-2" />
              Add Availability
            </button>
          </form>
        </div>
      </div>

      {/* Notifications */}
      {notifications.length > 0 && (
        <div className="mb-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`mb-2 p-3 rounded-md shadow-md text-white ${
                notification.type === "success"
                  ? "bg-green-500"
                  : notification.type === "error"
                  ? "bg-red-500"
                  : "bg-yellow-500"
              }`}
            >
              {notification.message}
            </div>
          ))}
        </div>
      )}

      {/* Added Availabilities */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Availabilities Pending Approval
        </h2>
        {availabilities.length > 0 ? (
          <>
            <ul className="space-y-4">
              {availabilities.map((availability, index) => (
                <li
                  key={index}
                  className={`bg-gray-50 p-4 rounded-md flex flex-wrap justify-between items-center gap-4 transition-all duration-300 hover:shadow-md ${
                    availabilityStatuses[index]?.status === "rejected"
                      ? "border-l-4 border-red-500"
                      : availabilityStatuses[index]?.status === "added"
                      ? "border-l-4 border-green-500"
                      : ""
                  }`}
                >
                  <span className="flex items-center space-x-4 flex-grow">
                    <CalendarIcon size={20} className="text-gray-500" />
                    <span className="font-medium text-gray-700">
                      {format(availability.date, "yyyy-MM-dd")}:
                    </span>
                    {availability.isEditing ? (
                      <div className="flex items-center space-x-2">
                        <input
                          type="time"
                          value={format(availability.startTime, "HH:mm")}
                          onChange={(e) =>
                            handleEditTime(index, "startTime", e.target.value)
                          }
                          className="w-24 px-2 py-1 border rounded text-sm"
                        />
                        <span>-</span>
                        <input
                          type="time"
                          value={format(availability.endTime, "HH:mm")}
                          onChange={(e) =>
                            handleEditTime(index, "endTime", e.target.value)
                          }
                          className="w-24 px-2 py-1 border rounded text-sm"
                        />
                      </div>
                    ) : (
                      <span className="text-gray-600">
                        {format(availability.startTime, "HH:mm")} -{" "}
                        {format(availability.endTime, "HH:mm")}
                      </span>
                    )}
                  </span>
                  <div className="space-x-2">
                    {availability.isEditing ? (
                      <>
                        <button
                          onClick={() => handleConfirmCancelEdit(index)}
                          className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors duration-300"
                          title="Confirm"
                        >
                          <Check size={16} />
                        </button>
                        <button
                          onClick={() => handleConfirmCancelEdit(index)}
                          className="p-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors duration-300"
                          title="Cancel"
                        >
                          <X size={16} />
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleStartEdit(index)}
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
                  </div>
                  {availabilityStatuses[index] && (
                    <span
                      className={`ml-2 px-2 py-1 rounded-full text-xs ${
                        availabilityStatuses[index].status === "rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {availabilityStatuses[index].status}
                      {availabilityStatuses[index].reason &&
                        ` - ${availabilityStatuses[index].reason}`}
                    </span>
                  )}
                </li>
              ))}
            </ul>
            {!isEditing && (
              <button
                onClick={handleSendToDatabase}
                disabled={isLoading}
                className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div role="status" className="mr-2">
                      <svg
                        aria-hidden="true"
                        className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-400"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                    Processing...
                  </>
                ) : (
                  <>
                    <CalendarIcon size={20} className="mr-2" />
                    Send to Database
                  </>
                )}
              </button>
            )}
          </>
        ) : (
          <p className="text-gray-500 italic">No availabilities added yet!</p>
        )}
      </div>
    </div>
  );
};

export default Availability;
