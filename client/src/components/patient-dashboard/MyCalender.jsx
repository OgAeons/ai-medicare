import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import the default calendar styles

const MyCalendar = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
        console.log("Selected date:", date);
    };

    return (
        <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mt-20">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Choose a Date</h2>
            <Calendar
                onChange={handleDateChange}
                value={selectedDate}
                className="custom-calendar"
            />
            <p className="mt-4 text-gray-600">
                Selected Date:{" "}
                <span className="font-semibold text-blue-500">
                    {selectedDate.toDateString()}
                </span>
            </p>
        </div>
    );
};

export default MyCalendar;
