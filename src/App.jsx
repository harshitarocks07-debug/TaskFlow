import { useState, useEffect } from "react";
import "./App.css";

const themes = {
  Pink:    { bg: "linear-gradient(135deg, #f7a8d5, #f8d7e8)", accent: "#ff4f9a" },
  Purple:  { bg: "linear-gradient(135deg, #c084fc, #e9d5ff)", accent: "#9333ea" },
  Blue:    { bg: "linear-gradient(135deg, #60a5fa, #bfdbfe)", accent: "#2563eb" },
  Green:   { bg: "linear-gradient(135deg, #6ee7b7, #d1fae5)", accent: "#059669" },
  Orange:  { bg: "linear-gradient(135deg, #fdba74, #ffedd5)", accent: "#ea580c" },
  Red:     { bg: "linear-gradient(135deg, #f87171, #fee2e2)", accent: "#dc2626" },
  Teal:    { bg: "linear-gradient(135deg, #2dd4bf, #ccfbf1)", accent: "#0d9488" },
  Yellow:  { bg: "linear-gradient(135deg, #fde047, #fef9c3)", accent: "#ca8a04" },
  Indigo:  { bg: "linear-gradient(135deg, #818cf8, #e0e7ff)", accent: "#4338ca" },
  Rose:    { bg: "linear-gradient(135deg, #fb7185, #ffe4e6)", accent: "#e11d48" },
};

function App() {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [date, setDate] = useState("");
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "Pink");
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");
  const [sortByDate, setSortByDate] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const [editPriority, setEditPriority] = useState("");
  const [editDate, setEditDate] = useState("");
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (!darkMode) document.body.style.background = themes[theme].bg;
  }, [theme, darkMode]);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    if (darkMode) {
      document.body.style.background = "linear-gradient(135deg, #1a1a2e, #16213e)";
    } else {
      document.body.style.background = themes[theme].bg;
    }
  }, [darkMode]);

  const accent = themes[theme].accent;

  const isOverdue = (dateStr) => {
    if (!dateStr) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(dateStr) < today;
  };

  const addTask = () => {
    if (task.trim() === "") return;
    const newTask = { text: task, priority, date, completed: false };
    setTasks([...tasks, newTask]);
    setTask("");
    setPriority("Medium");
    setDate("");
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const completeTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const clearCompleted = () => {
    setTasks(tasks.filter((t) => !t.completed));
  };

  const startEdit = (index) => {
    setEditIndex(index);
    setEditText(tasks[index].text);
    setEditPriority(tasks[index].priority);
    setEditDate(tasks[index].date);
  };

  const saveEdit = () => {
    const updatedTasks = [...tasks];
    updatedTasks[editIndex] = {
      ...updatedTasks[editIndex],
      text: editText,
      priority: editPriority,
      date: editDate,
    };
    setTasks(updatedTasks);
    setEditIndex(null);
  };

  const cancelEdit = () => {
    setEditIndex(null);
  };

  const counts = {
    All: tasks.filter((t) => !t.completed).length,
    High: tasks.filter((t) => t.priority === "High" && !t.completed).length,
    Medium: tasks.filter((t) => t.priority === "Medium" && !t.completed).length,
    Low: tasks.filter((t) => t.priority === "Low" && !t.completed).length,
  };

  const sortTasks = (list) => {
    if (!sortByDate) return list;
    return [...list].sort((a, b) => {
      if (!a.date) return 1;
      if (!b.date) return -1;
      return new Date(a.date) - new Date(b.date);
    });
  };

  const filteredActive = sortTasks(
    tasks
      .filter((t) => !t.completed)
      .filter((t) => filter === "All" || t.priority === filter)
      .filter((t) => t.text.toLowerCase().includes(search.toLowerCase()))
  );

  const filteredCompleted = tasks
    .filter((t) => t.completed)
    .filter((t) => t.text.toLowerCase().includes(search.toLowerCase()));

  const TaskCard = ({ item, index }) => (
    <div className={`task-card ${item.completed ? "completed" : ""} ${isOverdue(item.date) && !item.completed ? "overdue" : ""}`}>
      {editIndex === index ? (
        <div className="edit-form">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="edit-input"
          />
          <select
            value={editPriority}
            onChange={(e) => setEditPriority(e.target.value)}
            className="edit-select"
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
          <input
            type="date"
            value={editDate}
            onChange={(e) => setEditDate(e.target.value)}
            className="edit-input"
            style={{ colorScheme: darkMode ? "dark" : "light" }}
          />
          <div className="buttons">
            <button
              className="save-btn"
              onClick={saveEdit}
              style={{ background: accent }}
            >
              Save
            </button>
            <button className="cancel-btn" onClick={cancelEdit}>Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <div className="card-header">
            <h2>{item.text}</h2>
            {isOverdue(item.date) && !item.completed && (
              <span className="overdue-badge">⚠️ Overdue</span>
            )}
          </div>
          <p>Priority: <span className={item.priority.toLowerCase()}>{item.priority}</span></p>
          <p>Due Date: {item.date ? item.date : "Not set"}</p>
          <div className="buttons">
            <button className="complete-btn" onClick={() => completeTask(index)}>
              {item.completed ? "Undo" : "Complete"}
            </button>
            {!item.completed && (
              <button
                className="edit-btn"
                onClick={() => startEdit(index)}
                style={{ background: accent }}
              >
                Edit
              </button>
            )}
            <button className="delete-btn" onClick={() => deleteTask(index)}>
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className={`layout ${darkMode ? "dark" : ""}`}>
      <div className="sidebar">
        <h2 className="sidebar-title">🗂 Filter</h2>
        {["All", "High", "Medium", "Low"].map((f) => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? "active-filter" : ""}`}
            style={filter === f ? { background: accent, boxShadow: `0 5px 15px ${accent}88` } : {}}
            onClick={() => setFilter(f)}
          >
            <span>{f}</span>
            <span className="count-badge">{counts[f]}</span>
          </button>
        ))}

        <hr className="sidebar-divider" />

        <h2 className="sidebar-title">🎨 Theme</h2>
        <div className="theme-grid">
          {Object.entries(themes).map(([name, val]) => (
            <button
              key={name}
              className={`theme-dot ${theme === name ? "active-theme" : ""}`}
              style={{ background: val.accent }}
              title={name}
              onClick={() => setTheme(name)}
            />
          ))}
        </div>
      </div>

      <div className="app">
        <button
          className="dark-mode-btn"
          onClick={() => setDarkMode(!darkMode)}
          title="Toggle Dark Mode"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        <h1>TaskFlow 🚀</h1>

        <div className="task-input">
          <div className="input-group">
            <label>Task</label>
            <input
              type="text"
              placeholder="Enter a task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Priority</label>
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>

          <div className="input-group">
            <label>Due Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{ colorScheme: darkMode ? "dark" : "light" }}
            />
          </div>

          <div className="input-group">
            <label></label>
            <button
              onClick={addTask}
              style={{ background: accent, boxShadow: `0 5px 15px ${accent}88` }}
            >
              Add Task
            </button>
          </div>
        </div>

        <div className="toolbar">
          <div className="search-bar">
            <input
              type="text"
              placeholder="🔍 Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button
            className={`sort-btn ${sortByDate ? "sort-active" : ""}`}
            onClick={() => setSortByDate(!sortByDate)}
            style={sortByDate ? { background: accent, color: "white" } : {}}
          >
            📅 Sort by Date
          </button>
        </div>

        {filteredActive.length === 0 && filteredCompleted.length === 0 && (
          <p className="no-tasks">No tasks found! 🎉</p>
        )}

        {filteredActive.length > 0 && (
          <>
            <h2 className="section-title">📋 Pending ({filteredActive.length})</h2>
            <div className="task-list">
              {filteredActive.map((item) => (
                <TaskCard key={tasks.indexOf(item)} item={item} index={tasks.indexOf(item)} />
              ))}
            </div>
          </>
        )}

        {filteredCompleted.length > 0 && (
          <>
            <div className="completed-header">
              <h2 className="section-title completed-title">✅ Completed ({filteredCompleted.length})</h2>
              <button
                className="clear-btn"
                onClick={clearCompleted}
              >
                🗑 Clear All
              </button>
            </div>
            <div className="task-list">
              {filteredCompleted.map((item) => (
                <TaskCard key={tasks.indexOf(item)} item={item} index={tasks.indexOf(item)} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;