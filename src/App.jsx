import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskFilter from "./components/TaskFilter";
import { loadTasks, saveTasks, loadUsername } from "./utils/localStorage";
import "./styles/App.css";
import { FaSearch } from "react-icons/fa";

const FILTERS = {
  all: (tasks) => tasks,
  completed: (tasks) => tasks.filter((t) => t.completed),
  pending: (tasks) => tasks.filter((t) => !t.completed),
};

function App() {
  const [username, setUsername] = useState(loadUsername());
  const [tasks, setTasks] = useState(loadTasks());
  const [filter, setFilter] = useState("all");
  const [editingTask, setEditingTask] = useState(null);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const handleLogin = (name) => {
    setUsername(name);
  };

  const handleAddTask = (data) => {
    const newTask = {
      id: Date.now(),
      title: data.title,
      description: data.description,
      priority: data.priority || "Medium",
      dueDate: data.dueDate || '',
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks([newTask, ...tasks]);
  };

  const handleEditTask = (data) => {
    setTasks(
      tasks.map((t) =>
        t.id === editingTask.id
          ? { ...t, ...data, priority: data.priority || t.priority || "Medium", dueDate: data.dueDate || t.dueDate || '' }
          : t
      )
    );
    setEditingTask(null);
  };

  const handleDeleteTask = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks(tasks.filter((t) => t.id !== id));
    }
  };

  const handleToggleTask = (id) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const filteredTasks = FILTERS[filter](tasks).filter(
    (task) =>
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase())
  );
  const counts = {
    all: tasks.length,
    completed: tasks.filter((t) => t.completed).length,
    pending: tasks.filter((t) => !t.completed).length,
  };

  const handleSearchIconClick = () => {
    if (!search.trim()) {
      setSearchResult(null);
      return;
    }
    const found = tasks.find(
      (task) =>
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResult(found || false);
  };

  if (!username) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app-container">
      <div className="app-header">
        <h2>Welcome, {username}!</h2>
        <button
          className="logout-btn"
          onClick={() => {
            localStorage.removeItem("username");
            setUsername("");
          }}
        >
          Logout
        </button>
      </div>
      <div className="search-bar-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setSearchResult(null);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearchIconClick();
          }}
        />
        <button
          className="search-icon-btn"
          onClick={handleSearchIconClick}
          aria-label="Search"
        >
          <FaSearch />
        </button>
      </div>
      {searchResult !== null && (
        <div className="search-result-container">
          {searchResult === false ? (
            <div className="search-not-found">No matching task found.</div>
          ) : (
            <TaskList
              tasks={[searchResult]}
              onToggle={handleToggleTask}
              onEdit={setEditingTask}
              onDelete={handleDeleteTask}
            />
          )}
        </div>
      )}
      {searchResult === null && (
        <TaskForm
          onSubmit={editingTask ? handleEditTask : handleAddTask}
          initialData={editingTask}
          onCancel={() => setEditingTask(null)}
        />
      )}
      {searchResult === null && (
        <TaskFilter filter={filter} setFilter={setFilter} counts={counts} />
      )}
      {searchResult === null && (
        <TaskList
          tasks={filteredTasks}
          onToggle={handleToggleTask}
          onEdit={setEditingTask}
          onDelete={handleDeleteTask}
        />
      )}
    </div>
  );
}

export default App;
