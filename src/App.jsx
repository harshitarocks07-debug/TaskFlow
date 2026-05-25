import { useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [date, setDate] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task.trim() === "") return;

    const newTask = {
      text: task,
      priority,
      date,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTask("");
    setPriority("Medium");
    setDate("");
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const completeTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  return (
    <div className="app">
      <h1>
        TaskFlow 🚀
      </h1>

      <div className="task-input">
        <input
          type="text"
          placeholder="Enter a task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button onClick={addTask}>Add Task</button>
      </div>

      <div className="task-list">
        {tasks.map((item, index) => (
          <div
            className={`task-card ${item.completed ? "completed" : ""}`}
            key={index}
          >
            <h2>{item.text}</h2>

            <p>
              Priority:
              <span className={item.priority.toLowerCase()}>
                {" "}
                {item.priority}
              </span>
            </p>

            <p>
              Due Date: {item.date ? item.date : "Not set"}
            </p>

            <div className="buttons">
              <button
                className="complete-btn"
                onClick={() => completeTask(index)}
              >
                {item.completed ? "Undo" : "Complete"}
              </button>

              <button
                className="delete-btn"
                onClick={() => deleteTask(index)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;