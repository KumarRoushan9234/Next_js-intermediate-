export default function handler(req, res) {
  if (typeof window !== "undefined") {
    return res.status(500).json({ message: "API cannot run in browser!" });
  }

  let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

  if (req.method === "GET") {
    return res.status(200).json(tasks);
  }

  if (req.method === "POST") {
    const { text, deadline, priority } = req.body;
    if (!text) return res.status(400).json({ message: "Task cannot be empty!" });

    const newTask = { id: Date.now(), text, deadline, priority, status: "Pending" };
    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    return res.status(201).json(newTask);
  }

  if (req.method === "PUT") {
    const { id, text, status } = req.body;
    tasks = tasks.map((task) =>
      task.id === id ? { ...task, text: text || task.text, status: status || task.status } : task
    );
    localStorage.setItem("tasks", JSON.stringify(tasks));

    return res.status(200).json({ message: "Task updated!" });
  }

  if (req.method === "DELETE") {
    const { id } = req.body;
    tasks = tasks.filter((task) => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    return res.status(200).json({ message: "Task deleted!" });
  }

  res.status(405).json({ message: "Method Not Allowed" });
}
