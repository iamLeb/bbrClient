import { useState, useEffect } from "react";

import api from "../../../services/api";

const SimpleEditForm = ({ isOpen, onClose, onSave, itemToEdit }) => {
  const [formData, setFormData] = useState();
  const [error, setError] = useState(null);
  const [oldDate, setOldDate] = useState(null);

  useEffect(() => {
    setFormData(itemToEdit);
    setError(null);
  }, [itemToEdit]);

  // Convert ISO date string to YYYY-MM-DD format
  const formatDate = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return date.toISOString().split("T")[0];
  };

  // Convert ISO date-time string to HH:MM format
  const formatTime = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  //to update startTime and endTime
  const updateTimeInISO = (isoString, newTime) => {
    // Parse the new time
    const [hours, minutes] = newTime.split(":").map(Number);

    // Create a Date object from the ISO string
    const date = new Date(isoString);

    // Update hours and minutes
    date.setHours(hours, minutes, 0, 0);

    // Return the new ISO string
    return date.toISOString();
  };

  const handleChange = (e) => {
  
    let { name, value } = e.target;

    if (name === "date") {
   
      value = new Date(value + "T00:00:00");
      value = value.toISOString();
    } else if (name === "startTime") {
      value = updateTimeInISO(formData.startTime, value);
    } else if (name === "endTime") {
      value = updateTimeInISO(formData.endTime, value);
    }

    

    if (name === "endTime" && formData.type !== "availability") {
      setFormData((prev) => ({ ...prev, [name]: value }));
    } else if (name === "name" || name === "email" || name === "phone") {
      setFormData((prev) => ({
        ...prev,
        contact: { ...prev.contact, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
   
    e.preventDefault();
    setError(null);

    try {
      let submittedData;

      if (formData.type === "availability") {
        const date = new Date(formData.date);
        date.setHours(0, 0, 0, 0);
        let startTime = new Date(formData.startTime);
        let endTime = new Date(formData.endTime);

     

        const new_availability = {
          date: formData.date,
          startTime: formData.startTime,
          endTime: formData.endTime,
          oldDate: itemToEdit.date,
        };

        const response = await api.put(
          "/availability/update",
          new_availability
        );

        //fetcha and populate boookings though availability




        
        submittedData = {
          ...formData,
          date: date.toISOString(),
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
        };

     

        if (
          !submittedData.date ||
          !submittedData.startTime ||
          !submittedData.endTime
        ) {
          throw new Error("Invalid date or time while editing availability");
        }
      } else {
        // For bookings
    

        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        let startTime = new Date(formData.startTime);

        let endTime = new Date(formData.endTime);

        const new_booking = {
          availability: itemToEdit.availability,
          startTime: formData.startTime,
          endTime: formData.endTime,
          id: itemToEdit._id,
          name:formData.contact.name,
          email:formData.contact.email,
          phone:formData.contact.phone,
          message:formData.contact.message
          
        };

  

        const response = await api.put("/booking/update", new_booking);

        submittedData = {
          ...formData,
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
          contact: {
            name: formData.contact?.name || "",
            email: formData.contact?.email || "",
            phone: formData.contact?.phone || "",
            message: formData.contact?.message || "",
          },
        };

        if (!submittedData.startTime || !submittedData.endTime) {
          throw new Error("Invalid time while editing booking");
        }
      }
      onSave(submittedData);
      onClose();
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const errorMessage =
          error.response.data && error.response.data.message
            ? error.response.data.message
            : "An unknown error occurred";
        setError(errorMessage);
      } else if (error.request) {
        // The request was made but no response was received
        setError("No response received from the server");
      } else {
        // Something happened in setting up the request that triggered an Error
        setError("Error setting up the request");
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        {/* Title that changes based on form type  */}
        <h2 className="mb-4 text-xl font-bold">
          {formData.type === "availability"
            ? "Edit Availability"
            : "Edit Booking"}
        </h2>

        {/*Error may be use fUll */}
        {error && <div className="text-red-500 mb-4">{error}</div>}

        {/*Actual form that renders based on form.type(availability || booking) */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {formData.type === "availability" && (
            <div>
              {/* Label for the date input */}
              <label
                htmlFor="date"
                className="block text-sm font-medium text-black"
              >
                Date
              </label>

              {/* Date input field */}
              <input
                type="date"
                id="date"
                name="date"
                value={formatDate(formData.date) || ""}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
          )}

          {/*Start Time) */}
          <div>
            <label
              htmlFor="startTime"
              className="block text-sm font-medium text-gray-700"
            >
              Start Time
            </label>
            <input
              type="time"
              id="startTime"
              name="startTime"
              value={formatTime(formData.startTime) || ""}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          {/*End Time) */}
          <div>
            <label
              htmlFor="endTime"
              className="block text-sm font-medium text-gray-700"
            >
              End Time
            </label>
            <input
              type="time"
              id="endTime"
              name="endTime"
              value={
                formData.type === "availability"
                  ? formatTime(formData.endTime)
                  : formatTime(formData.endTime)
              }
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          {formData.type !== "availability" && (
            <>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.contact?.name || ""}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.contact?.email || ""}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.contact?.phone || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </>
          )}
          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SimpleEditForm;
