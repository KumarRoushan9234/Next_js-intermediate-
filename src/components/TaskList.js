import { useState, useEffect } from "react";
import { TrashIcon, PencilSquareIcon, CheckCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";

const TaskList = ({ tasks, updateTask, deleteTask, editTask }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("All"); 

  const tasksPerPage = 10;
  
  const filteredTasks = tasks.filter(task => 
    filter === "All" ? true : filter === "Completed" ? task.status === "Completed" : task.status === "Pending"
  );

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  const getTimeLeft = (deadline) => {
    if (!deadline) return "No Deadline";
    const timeLeft = new Date(deadline) - new Date();
    if (timeLeft <= 0) return "Time's up!";
    
    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m left`;
  };

  return (
    <div className="w-full max-w-3xl mx-auto relative z-10">
      {/* Filter Buttons (Grouped) */}
      <div className="flex justify-center mt-4 mb-4 space-x-2">
        {["All", "Pending", "Completed"].map((status) => (
          <button
            key={status}
            className={`px-4 py-2 rounded-md transition duration-300 ${filter === status ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-300"}`}
            onClick={() => setFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Task List */}
      {currentTasks.map((task) => (
        <div 
          key={task.id} 
          className={`relative p-4 rounded-lg my-2 shadow-lg transition-colors duration-1000 ${
            task.status === "Completed" 
              ? "bg-gradient-to-r from-green-900 to-teal-800" 
              : "bg-gradient-to-r from-orange-900 to-red-800"
          }`}
        >
          <button onClick={() => updateTask(task.id)} className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <CheckCircleIcon className={`h-6 w-6 ${task.status === "Completed" ? "text-green-400" : "text-yellow-500"}`} />
          </button>

          <div className="ml-14">
            <span 
              className="text-lg font-semibold truncate block max-w-[250px] hover:whitespace-normal text-white" 
              title={task.task}
            >
              {task.task}
            </span>
            <span className="block text-sm text-gray-300">{getTimeLeft(task.deadline)}</span>
          </div>

          <div className="flex gap-2 items-center absolute right-3 top-1/2 transform -translate-y-1/2">
            <button onClick={() => editTask(task.id)}>
              <PencilSquareIcon className="h-6 w-6 text-blue-400" />
            </button>
            <button onClick={() => deleteTask(task.id)}>
              <TrashIcon className="h-6 w-6 text-red-400" />
            </button>
          </div>
        </div>
      ))}

      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        <button 
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
          disabled={currentPage === 1} 
          className={`px-4 py-2 rounded-md ${currentPage === 1 ? "bg-gray-700 text-gray-500 cursor-not-allowed" : "bg-gray-800 text-white"}`}
        >
          Previous
        </button>
        <span className="text-lg font-semibold text-white">{currentPage}</span>
        <button 
          onClick={() => setCurrentPage(prev => (indexOfLastTask < filteredTasks.length ? prev + 1 : prev))} 
          disabled={indexOfLastTask >= filteredTasks.length} 
          className={`px-4 py-2 rounded-md ${indexOfLastTask >= filteredTasks.length ? "bg-gray-700 text-gray-500 cursor-not-allowed" : "bg-gray-800 text-white"}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TaskList;
