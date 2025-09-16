import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/tasks/")
      .then(res => setTasks(res.data));
  }, []);

  const addTask = () => {
    axios.post("http://127.0.0.1:8000/api/tasks/", { title, completed: false })
      .then(res => setTasks([...tasks, res.data]));
    setTitle("");
  };

  const deleteTask = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/tasks/${id}/`)
      .then(() => setTasks(tasks.filter(t => t.id !== id)));
  };

  return (
    <div className="p-4">
      <h1>Todo App</h1>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New task" />
      <button onClick={addTask}>Add</button>

      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.title} 
            <button onClick={() => deleteTask(task.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

