import { useState, useEffect } from "react";
import {
  Calendar,
  ChevronUp,
  ChevronDown,
  ArrowUp,
  ArrowDown,
  Clock,
  User,
  Mail,
  Phone,
  Edit,
  Trash2,
  Search,
  MessageSquare
} from "lucide-react";
import api from "../../../services/api";
import EditForm from "./EditForm"; // Adjust the import path as needed

const AvailabilityManager = () => {
  const [availabilities, setAvailabilities] = useState([]); // Stores all availabilities
  const [filteredAvailabilities, setFilteredAvailabilities] = useState([]); // Stores filtered availabilities based on user criteria
  const [isExpanded, setIsExpanded] = useState(false); // Controls the expansion of the availability manager
  const [searchTerm, setSearchTerm] = useState(""); // Stores the user's search input
  const [showOnlyWithBookings, setShowOnlyWithBookings] = useState(false); // Toggle to show only availabilities with bookings
  const [sortDirection, setSortDirection] = useState("asc"); // Controls the sort direction of availabilities
  const [expandedAvailabilities, setExpandedAvailabilities] = useState({}); // Tracks which availabilities are expanded to show bookings
  const [timeFilter, setTimeFilter] = useState("week"); // Filters availabilities by time period (all, week, month)
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState({});
  // Fetch availabilities when the component mounts
  useEffect(() => {
    fetchAvailabilities();
  }, [availabilities]);

  // Apply filters whenever relevant state changes
  useEffect(() => {
    filterAvailabilities();
  }, [
    showOnlyWithBookings,
    timeFilter,
    searchTerm,
    availabilities,
    sortDirection,
    availabilities
    
  ]);

  // Fetch all availabilities from the API
  const fetchAvailabilities = async () => {
    try {
      const response = await api.get("/availability/getall");
      setAvailabilities(response.data);
    } catch (error) {
      console.error("Error fetching availabilities:", error);
    }
  };

  // Filter and sort availabilities based on user-selected criteria
  const filterAvailabilities = () => {
    let filtered = [...availabilities];

    // If any filters are applied, go through the filtering process
    if (timeFilter !== "all" || showOnlyWithBookings || searchTerm !== "") {
      filtered = []; // Reset filtered array

      const currentDate = new Date();

      for (const availability of availabilities) {
        // Check if availability matches search term
        if (searchTerm !== "" && !availability.date.includes(searchTerm)) {
          continue; // Skip this availability if it doesn't match the search term
        }

        // Check if availability should be shown based on booking filter
        if (showOnlyWithBookings && availability.bookings.length === 0) {
          continue; // Skip this availability if it has no bookings and we're only showing those with bookings
        }

        // Check if availability falls within selected time filter
        if (timeFilter === "week" && !isWithinThisWeek(availability.date)) {
          if (availability.date > currentDate) break; // Stop checking if we've passed current date
          continue; // Skip this availability if it's not within this week
        }

        if (timeFilter === "month" && !isWithinThisMonth(availability.date)) {
          if (availability.date > currentDate) break; // Stop checking if we've passed current date
          continue; // Skip this availability if it's not within this month
        }

        // If we've made it here, the availability passes all filters
        filtered.push(availability);
      }
    }

    // Sort the filtered availabilities
    filtered.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
    });

    // Update the state with the filtered and sorted availabilities
    setFilteredAvailabilities(filtered);
  };

  // Check if a given date is within the current week
  const isWithinThisWeek = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const availabilityDate = new Date(date);
    const startOfWeek = new Date(
      today.setDate(today.getDate() - today.getDay())
    );
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    return availabilityDate >= startOfWeek && availabilityDate <= endOfWeek;
  };

  // Check if a given date is within the current month
  const isWithinThisMonth = (date) => {
    const today = new Date();
    const availabilityDate = new Date(date);
    return (
      availabilityDate.getMonth() === today.getMonth() &&
      availabilityDate.getFullYear() === today.getFullYear()
    );
  };

  // Toggle functions for various UI elements
  const toggleDropdown = () => setIsExpanded(!isExpanded);
  const toggleSortDirection = () =>{
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    filterAvailabilities();
  }
  const toggleExpand = (id) =>
    setExpandedAvailabilities((prev) => ({ ...prev, [id]: !prev[id] }));

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    filterAvailabilities();
  };

  // Placeholder functions for CRUD operations (to be implemented)
  const handleEditAvailability = (availability) => {
    setItemToEdit({ ...availability, type: "availability" });
    setIsEditFormOpen(true);
  };

  const handleEditBooking = (booking) => {
    setItemToEdit({ ...booking, type: "booking" ,contact_id: booking.contact});
    setIsEditFormOpen(true);
  };

  const handleSaveEdit = (editedItem) => {
    if (editedItem.type === "availability") {
      // Update availability in state
      setAvailabilities((prevAvailabilities) =>
        prevAvailabilities.map((avail) =>
          avail._id === editedItem._id ? { ...avail, ...editedItem } : avail
        )
      );
    } else {

      // Update booking in state
      setAvailabilities((prevAvailabilities) =>
        prevAvailabilities.map((avail) =>
          avail._id === editedItem.availability
            ? {
                ...avail,
                bookings: avail.bookings.map((booking) =>
                  booking._id === editedItem._id
                    ? { ...booking, ...editedItem }
                    : booking
                ),
              }
            : avail
        )
      );
    }
  };

  const handleDeleteAvailability = (id) =>
    console.log(`Delete availability with id: ${id}`);

  const handleDeleteBooking = (bookingId) =>
    console.log(
      `Delete booking with id: ${bookingId} for availability: ${availabilityId}`
    );

  // Helper functions to format date and time
  const formatDate = (isoString) =>
    new Date(isoString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  const formatTime = (isoString) =>
    new Date(isoString).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  return (
    <div className="mx-auto p-4 bg-gray-100 shadow-lg rounded-lg">
      {/* Header section with title and expand/collapse button */}
      <header className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center">
          <Calendar className="mr-2 h-6 w-6" />
          Manage Availability
        </h1>
        <button
          onClick={toggleDropdown}
          className="p-2 rounded-full hover:bg-gray-200"
        >
          {isExpanded ? <ChevronUp /> : <ChevronDown />}
        </button>
      </header>

      {/* Expanded section with filters and availability list */}
      {isExpanded && (
        <div className="space-y-3">
          {/* Search and filter controls */}
          <div className="p-4 rounded-lg shadow-lg space-y-6">
            {/* Search form */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search date (YYYY-MM-DD)"
                className="w-full border rounded-md p-2 focus:ring-4"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
              >
                <Search size={20} />
              </button>
            </form>

            {/* Toggle for showing only booked dates */}
            <div className="flex justify-between bg-white p-2 rounded-md shadow">
              <span className="font-medium">Booked dates only</span>
              <button
                onClick={() => setShowOnlyWithBookings(!showOnlyWithBookings)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  showOnlyWithBookings ? "bg-blue-600" : "bg-black"
                }`}
              >
                <span className="sr-only">Toggle booked dates only</span>
                <span
                  className={`inline-block h-4 w-4 rounded-full bg-white transition ${
                    showOnlyWithBookings ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Time filter and sort direction controls */}
            <div className="space-y-4">
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="w-full border rounded-md p-2"
              >
                <option value="all">All time</option>
                <option value="week">This week</option>
                <option value="month">This month</option>
              </select>

              <button
                onClick={toggleSortDirection}
                className="flex w-full items-center justify-center bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md"
              >
                Sort {sortDirection === "asc" ? "Descending" : "Ascending"}
                {sortDirection === "asc" ? (
                  <ArrowUp className="ml-2" />
                ) : (
                  <ArrowDown className="ml-2" />
                )}
              </button>
            </div>
          </div>

          {/* Availability list */}
          <div>
            <h2 className="text-2xl font-bold mb-4  ">Availability Schedule</h2>
            <div className="bg-gray-150 rounded-lg border shadow-md  divide-gray-200">
              {filteredAvailabilities.map((availability) => (
                <div key={availability._id} className="hover:bg-gray-200">
                  {/* Availability summary */}
                  <div className="grid border  sm:grid-cols-4 gap-4 p-4 items-center">
                    <div className="font-medium">
                      {formatDate(availability.date)}
                    </div>
                    <div className="text-sm text-gray-600">
                      {formatTime(availability.startTime)} -{" "}
                      {formatTime(availability.endTime)}
                    </div>
                    <div
                      className="flex items-center cursor-pointer sm:justify-center"
                      onClick={() => toggleExpand(availability._id)}
                    >
                      <span className="mr-2">
                        {availability.bookings.length} bookings
                      </span>
                      {expandedAvailabilities[availability._id] ? (
                        <ChevronUp />
                      ) : (
                        <ChevronDown />
                      )}
                    </div>
                    <div className="flex space-x-2 sm:justify-end ">
                      <button
                        onClick={() => handleEditAvailability(availability)}
                        className="p-1 hover:bg-gray-100 rounded-full"
                      >
                        <Edit className="text-blue-600" />
                      </button>
                      <button
                        onClick={() => handleDeleteBooking(availability._id)}
                        className="p-1 hover:bg-gray-100 rounded-full"
                      >
                        <Trash2 className="text-red-600" />
                      </button>
                    </div>
                  </div>
                  {/* Expanded booking details */}
                  {expandedAvailabilities[availability._id] && (
                    <div className="p-4 bg-gray-50 border-t border ">
                      {availability.bookings.length > 0 ? (
                        availability.bookings.map((booking) => (
                          <div
                            key={booking._id}
                            className="bg-white rounded-md shadow-sm p-4 mb-4 hover:shadow border  border-blue-700"
                          >
                            {/* Booking time and action buttons */}
                            <div className="grid sm:grid-cols-2 gap-4 mb-2 ">
                              <span className="font-medium flex items-center">
                                <Clock className="mr-2" />
                                {formatTime(booking.startTime)} -{" "}
                                {formatTime(new Date(booking.endTime))}
                              </span>
                              <div className="flex space-x-2 sm:justify-end">
                                <button
                                  onClick={() => handleEditBooking(booking)}
                                  className="p-1 hover:bg-blue-100 rounded-full"
                                >
                                  <Edit className="text-blue-600" />
                                </button>
                                <button
                                  onClick={() =>
                                    handleDeleteBooking(
                                      availability._id,
                                      booking._id
                                    )
                                  }
                                  className="p-1 hover:bg-red-100 rounded-full"
                                >
                                  <Trash2 className="text-red-600" />
                                </button>
                              </div>
                            </div>
                            {/* Booking contact information */}
                            <div className="text-sm text-gray-700 space-y-2 ">
                              <p className="flex items-center">
                                <User className="mr-2" />
                                {booking.contact.name}
                              </p>
                              <p className="flex items-center">
                                <Mail className="mr-2" />
                                <a
                                  href={`mailto:${booking.contact.email}`}
                                  className="hover:underline text-gray-700 "
                                >
                                  {booking.contact.email}
                                </a>
                              </p>
                              <p className="flex items-center">
                                <Phone className="mr-2" />
                                <a
                                  href={`tel:${booking.contact.phone}`}
                                  className="hover:underline text-gray-700 "
                                >
                                  {booking.contact.phone}
                                </a>
                              </p>
                              <p className="flex items-center">
                                <MessageSquare className="mr-2" />
                                <a
              
                                  className=" text-gray-700 "
                                >
                                  {booking.contact.message}
                                </a>
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-700 italic">
                          No bookings for this day.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <EditForm
        isOpen={isEditFormOpen}
        onClose={() => setIsEditFormOpen(false)}
        onSave={handleSaveEdit}
        itemToEdit={itemToEdit}
      />
    </div>
  );
};

// Export the component for use in other parts of the application
export default AvailabilityManager;
