import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import TaskInput from "../components/TaskInput";
import TaskList from "../components/TaskList";
import TaskCalendar from "../components/TaskCalendar";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  // ✅ Load tasks from localStorage **only when component mounts**
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  // ✅ Save tasks to localStorage when `tasks` state changes (prevent overwriting on first load)
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const filteredTasks = selectedDate
    ? tasks.filter(task => task.deadline?.startsWith(selectedDate.toISOString().split("T")[0]))
    : tasks;

  const addTask = (task) => {
    const newTasks = [...tasks, { id: Date.now(), ...task }];
    setTasks(newTasks);
  };

  const updateTask = (id) => {
    const newTasks = tasks.map(task =>
      task.id === id ? { ...task, status: task.status === "Completed" ? "Pending" : "Completed" } : task
    );
    setTasks(newTasks);
  };

  const deleteTask = (id) => {
    const newTasks = tasks.filter(task => task.id !== id);
    setTasks(newTasks);
  };

  const editTask = (taskId, newTaskText) => {
    const newTasks = tasks.map(task =>
      task.id === taskId ? { ...task, task: newTaskText } : task
    );
    setTasks(newTasks);
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
            editTask={editTask}
            setTasks={setTasks}  
          />
        </div>
      </div>
    </div>
  );
}
