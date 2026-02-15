import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");

  // Calculator
  const [calcInput, setCalcInput] = useState("");

  // Calendar
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Notes
  const [note, setNote] = useState("");

  // Todo
  const [taskInput, setTaskInput] = useState("");
  const [tasks, setTasks] = useState([]);

  const calculate = () => {
    try {
      // eslint-disable-next-line no-eval
      setCalcInput(eval(calcInput).toString());
    } catch {
      setCalcInput("Error");
    }
  };

  const addTask = () => {
    if (taskInput.trim() === "") return;
    setTasks([...tasks, taskInput]);
    setTaskInput("");
  };

  const deleteTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  return (
    <div className="app-container">

      {/* HOME PAGE */}
      {page === "home" && (
        <div className="home">
          <button onClick={() => setPage("calculator")}>🧮 Calculator</button>
          <button onClick={() => setPage("calendar")}>📅 Calendar</button>
          <button onClick={() => setPage("notes")}>📝 Notes</button>
          <button onClick={() => setPage("todo")}>✅ To-Do</button>
        </div>
      )}

      {/* CALCULATOR */}
      {page === "calculator" && (
        <div className="card">
          <button className="back" onClick={() => setPage("home")}>
            ⬅ Back
          </button>

          <div className="display">{calcInput || "0"}</div>

          <div className="grid">
            {["7","8","9","/","4","5","6","*","1","2","3","-","0",".","+","C","="].map((btn, i) => (
              <button
                key={i}
                onClick={() => {
                  if (btn === "C") setCalcInput("");
                  else if (btn === "=") calculate();
                  else setCalcInput(calcInput + btn);
                }}
              >
                {btn}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* CALENDAR */}
      {page === "calendar" && (
        <div className="card">
          <button className="back" onClick={() => setPage("home")}>
            ⬅ Back
          </button>

          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
          />

          <p className="selected-date">
            {selectedDate.toDateString()}
          </p>
        </div>
      )}

      {/* NOTES */}
      {page === "notes" && (
        <div className="card">
          <button className="back" onClick={() => setPage("home")}>
            ⬅ Back
          </button>

          <textarea
            className="notes-area"
            placeholder="Write your notes..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
      )}

      {/* TODO */}
      {page === "todo" && (
        <div className="card">
          <button className="back" onClick={() => setPage("home")}>
            ⬅ Back
          </button>

          <div className="todo-input">
            <input
              type="text"
              placeholder="Add task..."
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
            />
            <button onClick={addTask}>Add</button>
          </div>

          <ul className="todo-list">
            {tasks.map((task, index) => (
              <li key={index}>
                {task}
                <button onClick={() => deleteTask(index)}>❌</button>
              </li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
}

export default App;
