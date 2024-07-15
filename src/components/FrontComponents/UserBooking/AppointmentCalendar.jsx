import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Clock, Check } from "lucide-react";

const AppointmentCalendar = () => {
  // State variables
  const [selectedDate, setSelectedDate] = useState(new Date()); // Stores the date selected by the user
  const [duration] = useState(15); // Duration of each appointment slot in minutes
  const [timeSlots, setTimeSlots] = useState([]); // Stores available time slots for the selected date
  const [selectedSlots, setSelectedSlots] = useState([]); // Stores the time slots selected by the user

  // Mock function to fetch availability from a database
  // In a real application, this would be an API call
  const fetchAvailability = async () => {
    // Currently returns fixed start and end times
    // TODO: Implement actual API call to fetch availability
    return {
      startTime: "09:00",
      endTime: "17:00",
    };
  };

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
  useEffect(() => {
    const updateTimeSlots = async () => {
      // Fetch availability for the selected date
      const { startTime, endTime } = await fetchAvailability(selectedDate);

      // Convert start and end times to Date objects
      const start = new Date(selectedDate);
      start.setHours(
        parseInt(startTime.split(":")[0]),
        parseInt(startTime.split(":")[1]),
        0,
      );
      const end = new Date(selectedDate);
      end.setHours(
        parseInt(endTime.split(":")[0]),
        parseInt(endTime.split(":")[1]),
        0,
      );

      // Generate time slots and update state
      const slots = generateTimeSlots(start, end, duration);
      setTimeSlots(slots);
    };

    updateTimeSlots();
  }, [selectedDate, duration]);

  // Handler for selecting/deselecting time slots
  const handleSlotSelect = (slot) => {
    setSelectedSlots((prevSlots) => {
      // Check if the slot is already selected
      const slotIndex = prevSlots.findIndex(
        (selectedSlot) => selectedSlot.getTime() === slot.getTime(),
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
      (selectedSlot) => selectedSlot.getTime() === slot.getTime(),
    );
  };

  // Handler for confirming the appointment
  // TODO: Implement actual appointment confirmation logic
  const handleConfirm = () => {
    if (selectedSlots.length > 0) {
      const totalDuration = selectedSlots.length * duration;
      console.log("Appointment confirmed:", {
        date: selectedDate,
        startTime: selectedSlots[0],
        endTime: selectedSlots[selectedSlots.length - 1],
        duration: totalDuration,
      });
      alert(`Appointment confirmed for ${totalDuration} minutes!`);
    }
  };

  // Render the component
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Calendar section */}
          <div className="w-full lg:w-1/2 p-4">
            <Calendar
              className="w-full border-none"
              minDate={new Date()}
              onChange={handleDateChange}
              value={selectedDate}
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
                <h4 className="text-md font-semibold mb-2">Available Slots</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-64 overflow-y-auto">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.toISOString()}
                      className={`flex items-center justify-center px-2 py-2 rounded text-sm ${
                        isSlotSelected(slot)
                          ? "bg-indigo-600 text-white"
                          : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleSlotSelect(slot);
                      }}
                    >
                      <Clock size={14} className="mr-1" />
                      {slot.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </button>
                  ))}
                </div>
              </div>
              {/* Confirm appointment button */}
              <button
                className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  selectedSlots.length > 0
                    ? "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCalendar;
