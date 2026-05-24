import { useState } from "react"

function App() {
  const [task, setTask] = useState("")
  const [priority, setPriority] = useState("Medium")
  const [dueDate, setDueDate] = useState("")
  const [tasks, setTasks] = useState([])

  const addTask = () => {
    if (task.trim() === "") return

    const newTask = {
      text: task,
      priority: priority,
      dueDate: dueDate,
      completed: false,
    }

    setTasks([...tasks, newTask])

    setTask("")
    setPriority("Medium")
    setDueDate("")
  }

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter(
      (_, i) => i !== index
    )

    setTasks(updatedTasks)
  }

  const toggleComplete = (index) => {
    const updatedTasks = [...tasks]

    updatedTasks[index].completed =
      !updatedTasks[index].completed

    setTasks(updatedTasks)
  }

  return (
    <div
      style={{
        padding: "40px",
        fontFamily: "Arial",
        textAlign: "center",
      }}
    >
      <h1>TaskFlow 🚀</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter a task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          style={{
            padding: "10px",
            width: "220px",
            marginRight: "10px",
          }}
        />

        <select
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value)
          }
          style={{
            padding: "10px",
            marginRight: "10px",
          }}
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(e) =>
            setDueDate(e.target.value)
          }
          style={{
            padding: "10px",
            marginRight: "10px",
          }}
        />

        <button
          onClick={addTask}
          style={{
            padding: "10px 20px",
            cursor: "pointer",
          }}
        >
          Add
        </button>
      </div>

      <ul
        style={{
          listStyle: "none",
          padding: 0,
        }}
      >
        {tasks.map((item, index) => (
          <li
            key={index}
            style={{
              marginBottom: "15px",
              border: "1px solid gray",
              padding: "15px",
              borderRadius: "10px",
            }}
          >
            <div
              style={{
                textDecoration: item.completed
                  ? "line-through"
                  : "none",
                fontWeight: "bold",
                marginBottom: "8px",
              }}
            >
              {item.text}
            </div>

            <div style={{ marginBottom: "8px" }}>
              Priority: {item.priority}
            </div>

            <div style={{ marginBottom: "10px" }}>
              Due Date: {item.dueDate || "Not set"}
            </div>

            <button
              onClick={() => toggleComplete(index)}
              style={{
                marginRight: "10px",
                padding: "5px 10px",
              }}
            >
              {item.completed
                ? "Undo"
                : "Complete"}
            </button>

            <button
              onClick={() => deleteTask(index)}
              style={{
                padding: "5px 10px",
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App