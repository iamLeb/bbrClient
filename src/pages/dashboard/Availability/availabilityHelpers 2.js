import {
  isValid,
  addMinutes,
  isBefore,
  isEqual,
  format,
  parse,
  addDays,
} from "date-fns";

//to check if they are same date ,i think i can do this directly like if same daya
export const checkOverlap = (availabilities, newDate) => {
  return availabilities.some((availability) => {
    const existingDate = new Date(availability.date);
    return (
      existingDate.getFullYear() === newDate.getFullYear() &&
      existingDate.getMonth() === newDate.getMonth() &&
      existingDate.getDate() === newDate.getDate()
    );
  });
};

//for creating availability
export const addAvailability = (date, startTime, endTime, availabilities) => {
  const dateString = format(date, "yyyy-MM-dd");

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

  if (!checkOverlap(availabilities, date)) {
    return {
      id: Date.now() + Math.random(),
      date: date,
      startTime: newStart,
      endTime: newEnd,
      status: "pending",
      isEditing: false,
    };
  }
  return null;
};

//this generates avaiablabilies based on daily,weekly or none until repeatUntil Date
export const generateAvailabilities = (
  selectedDate,
  startTime,
  endTime,
  repeat,
  repeatUntil,
  availabilities
) => {
  let currentDate = new Date(selectedDate);
  currentDate.setHours(0, 0, 0, 0); //start it from midnight so that i can repeat todays date as well otherwise we have to skip it unless starttime equals current date

  const newAvailabilities = []; //contains availabillites that are not overlapped with exisiting availabilities
  const skippedDates = []; //avaialbilies that are overlapped with existing availabilities

  const repeatUntilDate =
    repeat === "none"
      ? currentDate
      : parse(repeatUntil, "yyyy-MM-dd", new Date());

  while (currentDate <= repeatUntilDate) {
    const newAvailability = addAvailability(
      currentDate,
      startTime,
      endTime,
      availabilities
    );

    if (newAvailability) {
      newAvailabilities.push(newAvailability);
    } else {
      skippedDates.push(format(currentDate, "MMMM dd, yyyy"));
    }

    if (repeat === "none") break;
    currentDate = addDays(currentDate, repeat === "weekly" ? 7 : 1);
  }

  return { newAvailabilities, skippedDates };
};

export const updateAvailability = (availability, field, value) => {
  // Create a shallow copy of the availability object to avoid mutating the original
  const updatedAvail = { ...availability };

  // Check if we're updating a time field (startTime or endTime)
  if (field === "startTime" || field === "endTime") {
    // Only process the update if the input is a complete time string (HH:MM format)
    if (value.length === 5) {
      // Split the time string into hours and minutes
      const [hours, minutes] = value.split(":");
      // Create a new Date object based on the existing time in the availability
      const updatedTime = new Date(availability[field]);
      // Update the hours and minutes of this new Date object
      // parseInt is used with base 10 to ensure correct parsing of string numbers
      updatedTime.setHours(parseInt(hours, 10));
      updatedTime.setMinutes(parseInt(minutes, 10));

      // Check if the resulting time is valid
      if (isValid(updatedTime)) {
        // If valid, update the field with the new time
        updatedAvail[field] = updatedTime;

        // Additional logic to ensure end time is always after start time
        if (field === "startTime") {
          // If we're updating the start time, check it against the current end time
          const currentEndTime = new Date(availability.endTime);
          // If the new start time is equal to or after the current end time...
          if (
            isEqual(updatedTime, currentEndTime) ||
            isBefore(currentEndTime, updatedTime)
          ) {
            // ...set the end time to be 1 minute after the new start time
            updatedAvail.endTime = addMinutes(updatedTime, 1);
          }
        } else if (field === "endTime") {
          // If we're updating the end time, check it against the current start time
          const currentStartTime = new Date(availability.startTime);
          // If the new end time is equal to or before the current start time...
          if (
            isEqual(updatedTime, currentStartTime) ||
            isBefore(updatedTime, currentStartTime)
          ) {
            // ...set the end time to be 1 minute after the current start time
            updatedAvail.endTime = addMinutes(currentStartTime, 1);
          }
        }
      } else {
        // If the time is invalid, log an error and return the original availability
        console.log("Invalid time:", value);
        return availability;
      }
    } else {
      // If the input is incomplete (less than 5 characters), store it in a temporary field
      // This allows for partial input to be saved without affecting the actual time
      updatedAvail[`${field}Input`] = value;
    }
  } else {
    // For non-time fields, simply update the field with the new value
    updatedAvail[field] = value;
  }

  // Mark the availability as pending and in editing mode
  updatedAvail.status = "pending";
  updatedAvail.isEditing = true;

  // Return the updated availability object
  return updatedAvail;
};
