// Import necessary dependencies and components
import { useState } from "react";
import { format } from "date-fns";
import { Clock, Calendar as CalendarIcon, Repeat } from "lucide-react";
import { generateAvailabilities } from "./availabilityHelpers";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import PropTypes from "prop-types"; //for eslint error

// Define the AvailabilityForm component
const AvailabilityForm = ({
  availabilities,
  setAvailabilities,
  addNotification,
}) => {
  // State hooks for form inputs
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");
  const [repeat, setRepeat] = useState("none");
  const [repeatUntil, setRepeatUntil] = useState(new Date());

  // Handler for date changes in the calendar
  const handleDateChange = (date) => setSelectedDate(date);

  // Form submission handler
  const onSubmit = (e) => {
    e.preventDefault();

    // Generate new availabilities based on form inputs
    const { newAvailabilities, skippedDates } = generateAvailabilities(
      selectedDate,
      startTime,
      endTime,
      repeat,
      repeatUntil,
      availabilities
    );

    // If there are skipped dates due to conflicts, notify the user
    if (skippedDates.length > 0) {
      addNotification(
        `Some dates couldn't be added due to conflicts: ${skippedDates.join(
          ", "
        )}. Please choose different times for these dates.`,
        "error"
      );
    }

    // If new availabilities were generated, add them and notify the user
    if (newAvailabilities.length > 0) {
      setAvailabilities((prev) => [...prev, ...newAvailabilities]);
      addNotification(
        `Added ${newAvailabilities.length} new availability ${
          newAvailabilities.length === 1 ? "slot" : "slots"
        } in pending section.`,
        "pending"
      );
    }
  };

  // Handlers for form input changes
  const onStartTimeChange = (e) => setStartTime(e.target.value);
  const onEndTimeChange = (e) => setEndTime(e.target.value);
  const onRepeatChange = (e) => setRepeat(e.target.value);
  const onRepeatUntilChange = (e) => setRepeatUntil(e.target.value);

  // Render the component
  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Calendar section */}
      <div className="md:w-1/2">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            className="w-full border-none"
            minDate={new Date()}
          />
        </div>
      </div>
      {/* Form section */}
      <div className="md:w-1/2">
        <form
          onSubmit={onSubmit}
          className="bg-white p-6 rounded-lg shadow-md space-y-6"
        >
          {/* Selected Date input */}
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
          {/* Start and End Time inputs */}
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
                  onChange={onStartTimeChange}
                  className="pl-10 w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  step="60"
                  required
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
                  onChange={onEndTimeChange}
                  className="pl-10 w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  step="60"
                  required
                  min={startTime}
                />
              </div>
            </div>
          </div>
          {/* Repeat options */}
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
                onChange={onRepeatChange}
                className="pl-10 w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="none">No repeat</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
              </select>
            </div>
          </div>
          {/* Repeat Until input (only shown if repeat is not 'none') */}
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
                  onChange={onRepeatUntilChange}
                  min={format(selectedDate, "yyyy-MM-dd")}
                  className="pl-10 w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          )}
          {/* Submit button */}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center"
          >
            <CalendarIcon size={20} className="mr-2" />
            Add availability to pending section
          </button>
        </form>
      </div>
    </div>
  );
};
// Custom styles to override weekend color
const styles = `
.react-calendar__month-view__days__day--weekend {
  color: inherit;
}
`;

// Create a style element and append it to the document head
const styleElement = document.createElement("style");
styleElement.textContent = styles;
document.head.appendChild(styleElement);

AvailabilityForm.propTypes = {
  availabilities: PropTypes.array.isRequired,
  setAvailabilities: PropTypes.func.isRequired,
  addNotification: PropTypes.func.isRequired,
};
export default AvailabilityForm;
