import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const addTask = () => {
    if (!title) return;
    const newTask = { id: Date.now(), title, completed: false };
    setTasks([newTask, ...tasks]);
    setTitle("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-xl w-full max-w-md p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">✨ My Todo List</h1>

        {/* Input */}
        <div className="flex mb-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <button
            onClick={addTask}
            className="bg-pink-500 text-white px-4 rounded-r-lg hover:bg-pink-600 transition"
          >
            Add
          </button>
        </div>

        {/* Todo List */}
        <ul>
          {tasks.map(task => (
            <li
              key={task.id}
              className="flex items-center justify-between bg-gray-100 rounded-lg px-4 py-2 mb-2 hover:bg-gray-200 transition"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task.id)}
                  className="mr-3 w-5 h-5 accent-pink-500"
                />
                <span className={task.completed ? "line-through text-gray-400" : ""}>
                  {task.title}
                </span>
              </div>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-500 hover:text-red-700 transition"
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

