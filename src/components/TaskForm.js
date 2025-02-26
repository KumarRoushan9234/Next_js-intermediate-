import { useState } from "react";
import styles from "../styles/TaskForm.module.css";
import toast from "react-hot-toast";

const TaskForm = ({ setTasks }) => {
  const [text, setText] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("Medium");

  const addTask = (e) => {
    e.preventDefault();
    if (!text.trim()) return toast.error("Task cannot be empty!");

    const newTask = {
      id: Date.now(),
      text,
      deadline: deadline || "No deadline",
      priority,
      completed: false,
    };

    setTasks((prev) => [...prev, newTask]);
    setText("");
    setDeadline("");
    toast.success("Task added!");
  };

  return (
    <form className={styles.taskForm} onSubmit={addTask}>
      <input type="text" placeholder="New task..." value={text} onChange={(e) => setText(e.target.value)} />
      <input type="datetime-local" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="High">🔥 High</option>
        <option value="Medium">⚡ Medium</option>
        <option value="Low">✅ Low</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
