import { useState } from "react";

const TaskInput = ({ addTask }) => {
  const [task, setTask] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("Medium");

  const priorities = ["Low", "Medium", "High"];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    addTask({ task, deadline, priority, status: "Pending" });
    setTask("");
    setDeadline("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-900 text-white rounded-lg p-4 flex gap-3 items-center justify-center w-11/12 max-w-3xl mx-auto"
    >
      <input
        type="text"
        className="p-3 rounded-md text-black w-2/4"
        placeholder="Enter task name..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      
      <input
        type="date"
        className="p-3 rounded-md text-black w-1/4"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />

      <select
        className="p-3 rounded-md text-black w-1/4"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        {priorities.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>

      <button className="bg-blue-800 p-2 rounded-xl w-2/12">Add Task</button>
    </form>
  );
};

export default TaskInput;
