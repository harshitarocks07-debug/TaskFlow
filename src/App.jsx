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
      priority,
      dueDate,
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

  const getPriorityColor = (priority) => {
    if (priority === "High") return "#ff4d4d"
    if (priority === "Medium") return "#ffaa00"
    return "#00cc66"
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to right, #141e30, #243b55)",
        padding: "40px",
        fontFamily: "Arial",
        color: "white",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "50px",
          marginBottom: "30px",
        }}
      >
        TaskFlow 🚀
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          flexWrap: "wrap",
          marginBottom: "30px",
        }}
      >
        <input
          type="text"
          placeholder="Enter a task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          style={{
            padding: "12px",
            width: "250px",
            borderRadius: "10px",
            border: "none",
          }}
        />

        <select
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value)
          }
          style={{
            padding: "12px",
            borderRadius: "10px",
            border: "none",
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
            padding: "12px",
            borderRadius: "10px",
            border: "none",
          }}
        />

        <button
          onClick={addTask}
          style={{
            padding: "12px 20px",
            borderRadius: "10px",
            border: "none",
            backgroundColor: "#00bfff",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Add Task
        </button>
      </div>

      <div
        style={{
          maxWidth: "700px",
          margin: "auto",
        }}
      >
        {tasks.map((item, index) => (
          <div
            key={index}
            style={{
              background: "#ffffff15",
              padding: "20px",
              borderRadius: "15px",
              marginBottom: "20px",
              boxShadow:
                "0 4px 10px rgba(0,0,0,0.3)",
            }}
          >
            <h2
              style={{
                textDecoration: item.completed
                  ? "line-through"
                  : "none",
              }}
            >
              {item.text}
            </h2>

            <p>
              Priority:
              <span
                style={{
                  color: getPriorityColor(
                    item.priority
                  ),
                  fontWeight: "bold",
                  marginLeft: "5px",
                }}
              >
                {item.priority}
              </span>
            </p>

            <p>
              Due Date:{" "}
              {item.dueDate || "Not set"}
            </p>

            <button
              onClick={() =>
                toggleComplete(index)
              }
              style={{
                marginRight: "10px",
                padding: "8px 14px",
                borderRadius: "8px",
                border: "none",
                backgroundColor: "#00cc66",
                color: "white",
                cursor: "pointer",
              }}
            >
              {item.completed
                ? "Undo"
                : "Complete"}
            </button>

            <button
              onClick={() => deleteTask(index)}
              style={{
                padding: "8px 14px",
                borderRadius: "8px",
                border: "none",
                backgroundColor: "#ff4d4d",
                color: "white",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App