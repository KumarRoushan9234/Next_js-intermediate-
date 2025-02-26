import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { TrashIcon, PencilSquareIcon, CheckCircleIcon } from "@heroicons/react/24/solid";

const TaskList = ({ tasks, updateTask, deleteTask, editTask, setTasks }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("All");

  const tasksPerPage = 10;

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

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

  // **Fix: Save new order to localStorage after drag**
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const updatedTasks = [...tasks];
    const [movedTask] = updatedTasks.splice(result.source.index, 1);
    updatedTasks.splice(result.destination.index, 0, movedTask);

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Save new order
  };

  return (
    <div className="w-full max-w-3xl mt-4 mx-auto relative z-10 border-2 border-gray-500 rounded-lg p-4 shadow-lg">

      {/* Filter Buttons */}
      <div className="flex justify-center mt-4 mb-4 space-x-2 border-spacing-2 border-gray-500 rounded-lg p-2 shadow-sm">
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

      {/* Drag & Drop Context */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}
            className="border-2 border-gray-500 rounded-lg p-3 shadow-md"
            >
              {currentTasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                  {(provided) => (
                    <div 
                      ref={provided.innerRef} 
                      {...provided.draggableProps} 
                      {...provided.dragHandleProps}
                      className={`relative p-4 my-2 cursor-grab transition-all rounded-2xl duration-100 ${
                        task.status === "Completed" 
                          ? "bg-gradient-to-r from-green-900 to-teal-800" 
                          : "bg-gradient-to-r from-orange-900 to-red-800"
                      }`}
                      // border-2 border-gray-400 rounded-lg shadow-lg 
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
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

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
