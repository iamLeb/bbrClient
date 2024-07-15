import { useState } from "react";

// Main components
import AvailabilityForm from "./AvailabilityForm";
import AvailabilityList from "./AvailabilityList";
import { useNotifications } from "./useNotifications";

const Availability = () => {
  // State to store array of availabilities to be sent to database
  const [availabilities, setAvailabilities] = useState([]);

  // Custom hook for managing notifications that popup to show various messages to user
  const { Notifications, notificationsRef, addNotification } =
    useNotifications();

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto bg-gray-50 min-h-screen overflow-x-hidden">
      {/* Page title */}
      <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center text-gray-800">
        Availability Management
      </h1>

      {/* Notifications component */}
      <Notifications ref={notificationsRef} />

      {/* Form for adding new availabilities */}
      <div className="mb-8 md:mb-12">
        <AvailabilityForm
          availabilities={availabilities}
          setAvailabilities={setAvailabilities}
          addNotification={addNotification}
        />
      </div>

      {/* List of existing availabilities not fetched from database  */}
      <AvailabilityList
        availabilities={availabilities}
        setAvailabilities={setAvailabilities}
        addNotification={addNotification}
      />
    </div>
  );
};

export default Availability;
