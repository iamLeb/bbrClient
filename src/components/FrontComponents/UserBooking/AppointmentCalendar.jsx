import { useState, useEffect, useCallback, useMemo } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Check } from "lucide-react";
import ConfirmationPopup from "../../../pages/dashboard/Availability/ConfirmationPopup";

//backend API
import api from "../../../services/api.js";

const AppointmentCalendar = () => {
  // State variables
  const [selectedDate, setSelectedDate] = useState(new Date()); // Stores the date selected by the user
  const [duration] = useState(15); // Duration of each appointment slot in minutes
  const [timeSlots, setTimeSlots] = useState([]); // Stores available time slots for the selected date
  const [selectedSlots, setSelectedSlots] = useState([]); // Stores the time slots selected by the user
  const [confirmation, setConfirmation] = useState(null); //confirmation
  const [isLoading, setIsLoading] = useState(false); //spinner animation for acitivity relate
  const [monthAvailability, setMonthAvailability] = useState({}); //to store 3 months avaibality ( previous month,current month ,next month)

  //for changing the dates CSS
  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      // Base class for all tiles to make them circular and add more spacing
      let baseClass =
        "rounded-full w-10 h-10 flex items-center justify-center transition duration-200 m-1 ";

      // Check if the date is selected
      if (date.toDateString() === selectedDate.toDateString()) {
        return baseClass + "bg-blue-500 text-white cursor-pointer";
      }

      // Check if the date is in the past
      if (date < new Date().setHours(0, 0, 0, 0)) {
        return baseClass + "bg-gray-100 text-gray-400 cursor-not-allowed";
      }

      // For current and future dates
      return isDateAvailable(date)
        ? baseClass + "bg-green-100 "
        : baseClass + "bg-red-100 ";
    }
  };

  //for intial active mount
  useEffect(() => {
    handleActiveStartDateChange({ activeStartDate: new Date() });
  }, []);

  //to fetch 3 months avilability  previous month,current month ,next month
  const fetchMonthAvailability = async (year, month) => {
    try {
      setIsLoading(true); // Set loading to true before fetching
      const response = await api.get(`/availability/month/${year}/${month}`);
      setMonthAvailability(response.data);
    } catch (error) {
      console.error("Error fetching month availability:", error);
    } finally {
      setIsLoading(false); // Set loading to true before fetching
    }
  };

  //the function is called only when the month view changes--sets monthAvailability intially
  const handleActiveStartDateChange = ({ activeStartDate }) => {
    fetchMonthAvailability(
      activeStartDate.getFullYear(),
      activeStartDate.getMonth() + 1
    );
  };

  //to check if any date is avilable
  const isDateAvailable = (date) => {
    const dateString = date.toISOString().split("T")[0];
    return monthAvailability[dateString] !== undefined;
  };

  const findAvailability = (date) => {
    try {
      const findDate = monthAvailability[date.toISOString().split("T")[0]];

      // Check if the response indicates no availability
      if (findDate === undefined) {
        return { notAvailable: true };
      }

      // Extract startTime and endTime from the response
      let { startTime, endTime } = findDate;

      // Function to subtract 5 hours from a time string
      const subtractFiveHours = (timeString) => {
        const [hours, minutes] = timeString.split(":").map(Number);
        let newHours = hours - 5;
        if (newHours < 0) newHours += 24;
        return `${String(newHours).padStart(2, "0")}:${String(minutes).padStart(
          2,
          "0"
        )}`;
      };

      // Subtract 5 hours from startTime and endTime
      startTime = subtractFiveHours(startTime);
      endTime = subtractFiveHours(endTime);

      // Return an object with startTime, endTime, and notAvailable flag
      return { startTime, endTime, notAvailable: false };
    } catch (error) {
      console.log("Error fetching availability:", error);
      // If there's an error, return an object indicating no availability
      return { notAvailable: true };
    }
  };

  // Generic function to handle confirmations
  const handleConfirmation = useCallback((message, onConfirm) => {
    setConfirmation({ message, onConfirm });
    setSelectedSlots([]);
  }, []);

  // Function to clear the confirmation
  const clearConfirmation = useCallback(() => setConfirmation(null), []);

  // Handler for when a new date is selected in the calendar
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedSlots([]); // Clear selected slots when date changes
  };

  // Generates an array of time slots between start and end times
  const generateTimeSlots = (start, end, interval) => {
    const slots = [];
    let current = new Date(start);
    const endTime = new Date(end);

    while (current < endTime) {
      slots.push(new Date(current));
      current.setMinutes(current.getMinutes() + interval);
    }

    return slots;
  };

  // Effect hook to update available time slots when selected date changes
  useMemo(() => {
    const updateTimeSlots = async () => {
      // Fetch availability for the selected date
      const availability = findAvailability(selectedDate);
      if (availability.notAvailable) {
        // If not available, set time slots to an empty array
        setTimeSlots([]);
      } else {
        // Fetch availability for the selected date
        const { startTime, endTime } = availability;

        // Convert start and end times to Date objects
        const start = new Date(selectedDate);
        start.setHours(
          parseInt(startTime.split(":")[0]),
          parseInt(startTime.split(":")[1]),
          0
        );
        const end = new Date(selectedDate);
        end.setHours(
          parseInt(endTime.split(":")[0]),
          parseInt(endTime.split(":")[1]),
          0
        );

        // Generate time slots and update state
        const slots = generateTimeSlots(start, end, duration);
        setTimeSlots(slots);
      }
    };

    updateTimeSlots();
  }, [selectedDate, duration, monthAvailability]);

  // Handler for selecting/deselecting time slots
  const handleSlotSelect = (slot) => {
    setSelectedSlots((prevSlots) => {
      // Check if the slot is already selected
      const slotIndex = prevSlots.findIndex(
        (selectedSlot) => selectedSlot.getTime() === slot.getTime()
      );

      if (slotIndex !== -1) {
        // If slot is already selected, remove it
        return prevSlots.filter((_, index) => index !== slotIndex);
      } else {
        // If slot is not selected, add it and ensure consecutive selection
        const newSlots = [...prevSlots, slot].sort((a, b) => a - b);

        // Check if the new set of slots are consecutive
        const isConsecutive = newSlots.every((slot, index, array) => {
          if (index === 0) return true;
          return (
            slot.getTime() - array[index - 1].getTime() === duration * 60000
          );
        });

        // Return new slots if consecutive, otherwise just the clicked slot
        return isConsecutive ? newSlots : [slot];
      }
    });
  };

  // Helper function to check if a slot is selected
  const isSlotSelected = (slot) => {
    return selectedSlots.some(
      (selectedSlot) => selectedSlot.getTime() === slot.getTime()
    );
  };

  // Handler for confirming the appointment
  const handleConfirm = () => {
    if (selectedSlots.length > 0) {
      let totalDuration = selectedSlots.length * duration;
      handleConfirmation(
        "Are you sure you want to confrim the booking?",
        () => {
          console.log("Appointment confirmed:", {
            date: selectedDate,
            startTime: selectedSlots[0],
            endTime: selectedSlots[selectedSlots.length - 1],
            duration: totalDuration,
          });
          clearConfirmation();
        }
      );
    }
  };

  // Render the component
  return (
    <div className=" mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Calendar section */}
          <div className="w-full lg:w-1/2">
            <Calendar
              className="w-full border-none"
              minDate={new Date()}
              onChange={handleDateChange}
              value={selectedDate}
              formatMonthYear={(locale, date) =>
                date.toLocaleDateString(locale, {
                  month: "short",
                  year: "numeric",
                })
              }
              formatShortWeekday={(locale, date) =>
                date.toLocaleDateString(locale, { weekday: "narrow" })
              }
              tileClassName={tileClassName}
              onActiveStartDateChange={handleActiveStartDateChange}
            />
          </div>
          {/* Appointment details section */}
          <div className="w-full lg:w-1/2 p-4 bg-gray-50">
            <h3 className="text-lg font-semibold mb-4">Appointment Details</h3>
            <div className="space-y-4">
              {/* Display selected date */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Selected Date
                </label>
                <div className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm">
                  {selectedDate.toDateString()}
                </div>
              </div>
              {/* Display appointment duration */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Duration
                </label>
                <div className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm">
                  {selectedSlots.length * duration} minutes
                </div>
              </div>
              {/* Available time slots */}
              <div>
                <h4 className="text-md font-semibold mb-2 text-center">
                  Available Slots
                  <br />
                  <span className="text-sm font-normal">
                    (Select one or more)
                  </span>
                </h4>
                {isLoading ? (
                  <div className="flex justify-center items-center h-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                  </div>
                ) : timeSlots.length === 0 ? (
                  <div className="flex justify-center items-center h-32 text-gray-500">
                    No available slots
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-64 overflow-y-auto">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot.toISOString()}
                        className={`flex items-center justify-center px-2 py-2 rounded text-sm ${
                          isSlotSelected(slot)
                            ? "bg-blue-800 text-white"
                            : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleSlotSelect(slot);
                        }}
                      >
                        {slot.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Confirm appointment button */}
              {timeSlots.length > 0 && (
                <button
                  className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                    selectedSlots.length > 0
                      ? "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleConfirm();
                  }}
                  disabled={selectedSlots.length === 0}
                >
                  <div className="flex items-center justify-center">
                    <Check size={18} className="mr-2" />
                    Confirm Appointment
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
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

export default AppointmentCalendar;
