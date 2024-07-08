//Dependencies
import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  format,
  addDays,
  parse,
  setMilliseconds,
  setHours,
  setMinutes,
  setSeconds,
} from "date-fns";
import {
  Clock,
  Calendar as CalendarIcon,
  Repeat,
  Trash2,
  Edit2,
  Check,
  X,
} from "lucide-react";

const Availability = () => {
  //States

  // Stores the currently selected date from the calendar
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Stores the selected start time for availability
  const [startTime, setStartTime] = useState("09:00");

  // Stores the selected end time for availability
  const [endTime, setEndTime] = useState("17:00");

  // Stores the repeat option (none, daily, weekly)
  const [repeat, setRepeat] = useState("none");

  // Stores the end date for repeated availabilities
  const [repeatUntil, setRepeatUntil] = useState(new Date());

  // Array to store all added availabilities
  const [availabilities, setAvailabilities] = useState([]);

  // State handlers

  // Updates the selected date when the user picks a new date on the calendar
  const handleDateChange = (e) => {
    setSelectedDate(e);
  };

  // Updates the start time when the user changes it
  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
  };

  // Updates the end time when the user changes it
  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
  };

  // Updates the repeat option when the user selects a different option
  const handleRepeatChange = (e) => {
    setRepeat(e.target.value);
  };

  // Updates the repeat until date when the user changes it
  const handleRepeatUntilChange = (e) => {
    setRepeatUntil(e.target.value);
  };
  // Updates the editing of an availability to true by adding isEditing field
  const handleStartEdit = (index) => {
    setAvailabilities(
      availabilities.map((a, i) =>
        i === index ? { ...a, isEditing: true } : a
      )
    );
  };

  // Confirms or cancels the editing of an availability
  const handleConfirmCancelEdit = (index) => {
    setAvailabilities(
      availabilities.map((a, i) =>
        i === index ? { ...a, isEditing: false } : a
      )
    );
  };

  // Handles editing of start or end time for an availability
  const handleEditTime = (index, field, value) => {
    setAvailabilities(
      availabilities.map((a, i) =>
        i === index
          ? {
              ...a,
              [field]: parse(
                `${format(a.date, "yyyy-MM-dd")} ${value}`,
                "yyyy-MM-dd HH:mm",
                new Date()
              ),
            }
          : a
      )
    );
  };

  // Deletes an availability from the list
  const handleDelete = (index) => {
    setAvailabilities(availabilities.filter((_, i) => i !== index));
  };

  // Prepares availabilities data for sending to the database
  const handleSendToDatabase = () => {
    const cleanedAvailabilities = availabilities.map(availability => {
      const cleanedAvailability = { ...availability };
      delete cleanedAvailability.isEditing;
      return cleanedAvailability;
    });
    console.log("Sending to database:");
    console.log(cleanedAvailabilities);
    // TODO: Implement actual database sending logic
  };

  // Handles form submission to add new availabilities
  const handleSubmit = (e) => {
    e.preventDefault();

    // Set the time to midnight for consistent date comparison
    let currentDate = setMilliseconds(
      setSeconds(setMinutes(setHours(new Date(selectedDate), 0), 0), 0),
      0
    );
    let dateString = format(currentDate, "yyyy-MM-dd");

    const newAvailabilities = [];

    if (typeof repeatUntil === "string") {
      const repeatUntilDate = parse(repeatUntil, "yyyy-MM-dd", new Date());

      while (currentDate <= repeatUntilDate) {
        dateString = format(currentDate, "yyyy-MM-dd");

        newAvailabilities.push({
          date: parse(
            `${dateString} ${startTime}`,
            "yyyy-MM-dd HH:mm",
            new Date()
          ),
          startTime: parse(
            `${dateString} ${startTime}`,
            "yyyy-MM-dd HH:mm",
            new Date()
          ),
          endTime: parse(
            `${dateString} ${endTime}`,
            "yyyy-MM-dd HH:mm",
            new Date()
          ),
        });

        if (repeat === "none") break;
        currentDate = addDays(currentDate, repeat === "weekly" ? 7 : 1);
      }
    } else if (selectedDate === repeatUntil) {
      newAvailabilities.push({
        date: parse(
          `${dateString} ${startTime}`,
          "yyyy-MM-dd HH:mm",
          new Date()
        ),
        startTime: parse(
          `${dateString} ${startTime}`,
          "yyyy-MM-dd HH:mm",
          new Date()
        ),
        endTime: parse(
          `${dateString} ${endTime}`,
          "yyyy-MM-dd HH:mm",
          new Date()
        ),
      });
    }

    // Add new availabilities to the existing ones
    setAvailabilities((prev) => [...prev, ...newAvailabilities]);
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
                  className="bg-gray-50 p-4 rounded-md flex flex-wrap justify-between items-center gap-4 transition-all duration-300 hover:shadow-md"
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
                </li>
              ))}
            </ul>
            <button
              onClick={handleSendToDatabase}
              className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center"
            >
              <CalendarIcon size={20} className="mr-2" />
              Send to Database
            </button>
          </>
        ) : (
          <p className="text-gray-500 italic">No availabilities added yet.</p>
        )}
      </div>
    </div>
  );
};

export default Availability;
