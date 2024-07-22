import { useState, useEffect, useCallback, useMemo } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

//backend API
import api from "../../../services/api.js";

const AppointmentCalendar = ({
  selectedSlots,
  setSelectedSlots,
  refreshCalendar,
}) => {
  // State variables
  const [selectedDate, setSelectedDate] = useState(new Date()); // Stores the date selected by the user
  const [duration] = useState(15); // Duration of each appointment slot in minutes
  const [timeSlots, setTimeSlots] = useState([]); // Stores available time slots for the selected date
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
  }, [refreshCalendar]);

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
    // Adjust the selected date when the user changes the month view
    if (activeStartDate.getMonth() === new Date().getMonth()) {
      // If the displayed month is the current month, set selected date to today
      setSelectedDate(new Date());
    } else {
      // Otherwise, set selected date to the first day of the displayed month
      setSelectedDate(activeStartDate);
    }

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

      // Extract startTime,endTime and bookings from the response
      let { startTime, endTime, bookings } = findDate;

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
      return { startTime, endTime, notAvailable: false, bookings };
    } catch (error) {
      console.log("Error fetching availability:", error);
      // If there's an error, return an object indicating no availability
      return { notAvailable: true };
    }
  };

  // Handler for when a new date is selected in the calendar
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedSlots([]); // Clear selected slots when date changes
  };

  // Main function to generate available time slots
  const generateTimeSlots = (start, end, interval, bookings) => {
    // Convert start and end to Date objects
    const startTime = new Date(start);
    const endTime = new Date(end);

    // Create a Set to store booked time slots
    const bookedSlots = new Set();

    // Process bookings
    bookings.forEach((booking) => {
      const bookingStart = new Date(booking.startTime);
      const bookingEnd = new Date(
        bookingStart.getTime() + booking.duration * 60000
      );

      let current = new Date(bookingStart);
      while (current < bookingEnd) {
        bookedSlots.add(current.toISOString().slice(0, 16));
        current.setMinutes(current.getMinutes() + interval);
      }
    });

    const allSlots = [];
    let current = new Date(startTime);

    while (current < endTime) {
      const slotKey = current.toISOString().slice(0, 16);
      allSlots.push({
        time: new Date(current),
        isBooked: bookedSlots.has(slotKey),
      });
      current.setMinutes(current.getMinutes() + interval);
    }

    return allSlots;
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
        //console.log("test new 111",availability);
        const { startTime, endTime, bookings } = availability;

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
        const slots = generateTimeSlots(start, end, duration, bookings);
        setTimeSlots(slots);
      }
    };

    updateTimeSlots();
  }, [
    selectedDate,
    duration,
    monthAvailability,
    selectedSlots,
    setSelectedSlots,
  ]);

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
                <div style={{ minHeight: "256px" }}>
                  {isLoading ? (
                    <div className="flex justify-center items-center h-32">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 "></div>
                    </div>
                  ) : timeSlots.length === 0 ? (
                    <div className="flex justify-center items-center h-32 text-gray-500">
                      No available slots
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-64 overflow-y-auto">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot.time.toISOString()}
                          className={`flex items-center justify-center px-2 py-2 rounded text-sm ${
                            slot.isBooked
                              ? "bg-red-100 text-red-800 cursor-not-allowed opacity-50"
                              : isSlotSelected(slot.time)
                              ? "bg-blue-800 text-white"
                              : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            if (!slot.isBooked) {
                              handleSlotSelect(slot.time);
                            }
                          }}
                          disabled={slot.isBooked}
                        >
                          {slot.time.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCalendar;
