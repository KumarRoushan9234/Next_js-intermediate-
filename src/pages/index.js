import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import TaskInput from "../components/TaskInput";
import TaskList from "../components/TaskList";
import TaskCalendar from "../components/TaskCalendar";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const filteredTasks = selectedDate
    ? tasks.filter(task => task.deadline && task.deadline.startsWith(selectedDate.toISOString().split("T")[0]))

    : tasks;

  const addTask = (task) => setTasks([...tasks, { id: Date.now(), ...task }]);
  const updateTask = (id) => setTasks(prev => prev.map(task => task.id === id ? { ...task, status: task.status === "Completed" ? "Pending" : "Completed" } : task));
  const deleteTask = (id) => setTasks(tasks.filter(task => task.id !== id));

  // ✅ Define editTask function here
  const editTask = (taskId, newTaskText) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, task: newTaskText } : task
      )
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="p-4 flex">
        <div className="w-1/4">
          <TaskCalendar tasks={tasks} onDateSelect={setSelectedDate} />
        </div>
        <div className="w-3/4">
          <TaskInput addTask={addTask} />
          <TaskList 
            tasks={filteredTasks} 
            updateTask={updateTask} 
            deleteTask={deleteTask} 
            editTask={editTask} // ✅ Now it's correctly defined and passed
          />
        </div>
      </div>
    </div>
  );
}
