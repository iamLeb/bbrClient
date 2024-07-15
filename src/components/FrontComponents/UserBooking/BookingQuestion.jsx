import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import AppointmentCalendar from "./AppointmentCalendar";

const BookingQuestion = () => {
  // State to control component expansion and calendar visibility
  const [isOpen, setIsOpen] = useState(true);
  const [showCalendar, setShowCalendar] = useState(false);

  // Handler for "No" button click
  const handleNoClick = () => {
    setIsOpen(false);
    setShowCalendar(false);
  };

  // Handler for "Yes" button click
  const handleYesClick = () => {
    setShowCalendar(true);
    setIsOpen(false);
  };

  // Toggle component expansion
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    // Outer container with responsive padding
    <div className="w-full py-2 px-2 sm:py-4 sm:px-4">
      {/* Inner container with styling */}
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 ease-in-out transform opacity-100 translate-y-0">
        {/* Header section */}
        <div className="p-3 sm:p-6 flex justify-between items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white transition-all duration-300 ease-in-out">
          {/* Dynamic header text */}
          <h2 className="text-lg sm:text-2xl font-semibold pr-2 sm:pr-4 transition-all duration-300 ease-in-out">
            {showCalendar
              ? "Book Appointment"
              : "Would you like to book an appointment?"}
          </h2>
          {/* Conditional rendering of cancel button or chevron icon */}
          {showCalendar ? (
            <button
              onClick={() => {
                setShowCalendar(false);
                setIsOpen(true);
              }}
              className="bg-white text-blue-600 font-medium py-1 px-2 sm:px-3 rounded-lg transition-all duration-300 ease-in-out text-xs sm:text-sm hover:bg-opacity-90 hover:scale-105 active:scale-95"
            >
              Cancel
            </button>
          ) : (
            <div
              onClick={toggleOpen}
              className="cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110 active:scale-90"
            >
              {isOpen ? (
                <ChevronUp className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0" />
              ) : (
                <ChevronDown className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0" />
              )}
            </div>
          )}
        </div>
        {/* Expandable content */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen && !showCalendar
              ? "max-h-96 opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-3 sm:px-6 pb-3 sm:pb-6">
            {/* Descriptive text */}
            <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-6">
              Take the next step and schedule your appointment now. We are here
              to assist you.
            </p>
            {/* Action buttons container */}
            <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
              {/* "Yes" button */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleYesClick();
                }}
                className="w-full sm:flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium py-2 px-3 sm:py-3 sm:px-6 rounded-lg transition-all duration-300 ease-in-out text-sm sm:text-base hover:shadow-lg hover:scale-105 active:scale-95"
              >
                Yes, Book Now
              </button>
              {/* "No" button */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleNoClick();
                }}
                className="w-full sm:flex-1 bg-gray-200 text-gray-800 font-medium py-2 px-3 sm:py-3 sm:px-6 rounded-lg transition-all duration-300 ease-in-out text-sm sm:text-base hover:bg-gray-300 hover:scale-105 active:scale-95"
              >
                No, Maybe Later
              </button>
            </div>
          </div>
        </div>
        {/* Calendar content */}
        <div
          className={`transition-all duration-500 ease-in-out ${
            showCalendar ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <AppointmentCalendar />
        </div>
      </div>
    </div>
  );
};

export default BookingQuestion;
