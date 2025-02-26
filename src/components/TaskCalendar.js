import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function TaskCalendar({ tasks, onDateSelect }) {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onDateSelect(date); // Filter tasks by date
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        tileContent={({ date, view }) => {
          if (view !== "month") return null;

          // Count tasks on this date
          const taskCount = tasks.filter((task) => {
            if (!task.deadline) return false;
            const taskDate = new Date(task.deadline);
            if (isNaN(taskDate)) return false;
            return taskDate.toISOString().split("T")[0] === date.toISOString().split("T")[0];
          }).length;

          return taskCount > 0 ? (
            <span className="text-xs font-bold text-blue-600">{taskCount}</span>
          ) : null;
        }}
      />

      {selectedDate && (
        <button
          onClick={() => {
            setSelectedDate(null);
            onDateSelect(null); // Reset filter
          }}
          className="mt-2 bg-gray-300 hover:bg-gray-400 text-black text-sm px-3 py-1 rounded"
        >
          Show All
        </button>
      )}
    </div>
  );
}
