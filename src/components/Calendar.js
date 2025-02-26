import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function TaskCalendar({ tasks, onDateSelect }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onDateSelect(date); // Call parent function to filter tasks
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        tileContent={({ date, view }) => {
          if (view !== "month") return null;

          // Get the number of tasks on this date by filtering valid deadlines
          const taskCounts = tasks.reduce((acc, task) => {
            if (!task.deadline) return acc; // Ignore tasks without deadlines
            const taskDate = new Date(task.deadline);
            if (isNaN(taskDate)) return acc; // Ignore invalid dates

            const formattedTaskDate = taskDate.toISOString().split("T")[0];
            const currentDate = date.toISOString().split("T")[0];

            if (formattedTaskDate === currentDate) {
              acc[task.priority] = (acc[task.priority] || 0) + 1;
            }
            return acc;
          }, {});

          return (
            <div className="flex flex-col items-center">
              {Object.entries(taskCounts).map(([priority, count]) => (
                <span key={priority} className={`text-xs font-bold text-${priorityColor(priority)}`}>
                  {priority}: {count}
                </span>
              ))}
            </div>
          );
        }}
      />
    </div>
  );
}

// Priority Color Helper Function
function priorityColor(priority) {
  switch (priority) {
    case "High":
      return "red-500"; // Red color for high priority
    case "Medium":
      return "yellow-500"; // Yellow for medium priority
    case "Low":
      return "green-500"; // Green for low priority
    default:
      return "gray-500";
  }
}
