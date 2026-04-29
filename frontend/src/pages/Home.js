import React, { useState } from "react";
import { useEffect } from "react";
import TaskCard from "../components/TaskCard";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";

import StatsCards from "../components/StatsCards";

const Home = () => {
  const [text, setText] = useState("");
  const [tasks, setTasks] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [aiTyping, setAiTyping] = useState(false);
  //filter
  const filteredTasks = tasks.filter((task) => {
  const matchesFilter =
    filter === "All" || task.priority === filter;

  const matchesSearch =
    task.title.toLowerCase().includes(search.toLowerCase());

  return matchesFilter && matchesSearch;
});

const fetchTasks = async () => {
  const res = await fetch("http://localhost:5000/api/tasks");
  const data = await res.json();
  setTasks(data.tasks);
};

 useEffect(() => {
  fetchTasks();
}, []);

  const handleSubmit = async () => {
    if (!text.trim()) return;

    try {
      setLoading(true);
      setError("");
      setAiTyping(true); //  animation start

      const response = await fetch("http://localhost:5000/api/tasks/extract", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text, source: "manual" })
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error("Failed to extract tasks");
      }

      const res = await fetch("http://localhost:5000/api/tasks");
      const dbData = await res.json();

      setTasks(dbData.tasks);
      setText("");

    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again.");
    } finally {
       setLoading(false);
      setTimeout(() => {
       setAiTyping(false);
         }, 1200); 
    }
  };
  // return (
  //   <div style={{maxWidth: "800px",margin: "40px auto",padding: "20px",fontFamily: "Arial, sans-serif"}}>
  //   <div
  //     style={{
  //       backgroundColor: "white",
  //       padding: "30px",
  //       borderRadius: "10px",
  //       boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
  //     }}
  //   >
  //     <h2 style={{ textAlign: "center", marginBottom: "20px" }}>AI Task Extractor</h2>

  //     <textarea
  //       rows="6"
  //       style={{
  //       width: "100%",
  //       padding: "12px",
  //       borderRadius: "8px",
  //       border: "1px solid #ccc",
  //       marginBottom: "15px"
  //       }}
  //       placeholder="Paste your meeting notes..."
  //       value={text}
  //       onChange={(e) => setText(e.target.value)}
  //       />

  //     <br /><br />

  //   <div style={{ textAlign: "center" }}>
  // <button
  //   onClick={handleSubmit}
  //   disabled={loading}
  //   style={{
  //     padding: "10px 25px",
  //     backgroundColor: loading ? "#aaa" : "#007bff",
  //     color: "white",
  //     border: "none",
  //     borderRadius: "6px",
  //     cursor: "pointer",
  //     fontSize: "16px"
  //   }}
  // >
  //   {loading ? "Processing..." : "Extract Tasks"}
  // </button>
  //   </div>
    
  //   {/* loading... */}
  //     {loading && (
  //    <p style={{ color: "#007bff", fontWeight: "bold" }}>
  //     ⏳ Analyzing your input...
  //   </p>
  //   )}

  //   {/* ERROR */}
  //   {error && (
  //    <p style={{ color: "red", fontWeight: "bold" }}>
  //   {error}
  //  </p>
  //   )}
  //     {/* EMPTY STATE */}
  //   {!loading && tasks.length === 0 && (
  //   <p style={{ color: "#777" }}>
  //    No tasks yet. Paste notes and click "Extract Tasks".
  //    </p>
  //   )}
      
      
  //     <SearchBar search={search} setSearch={setSearch} />

  //     <FilterBar filter={filter} setFilter={setFilter} />
     
  //     <div>
  //       <h3>Tasks:</h3>

  //       {filteredTasks.map((task) => (
  //    <TaskCard key={task._id} task={task} refreshTasks={fetchTasks} />
  //    ))}
  //     </div>

  //   </div>
  //   </div>
  // );

return (
  <div>
   
    <div className="input-box">

  <div className="input-header">
    <span className="input-title">AI Task Extractor</span>
  </div>
         {aiTyping && (
  <div className="task-grid">
    {[1, 2, 3].map((i) => (
      <div key={i} className="task-skeleton">
        <div className="skeleton-title"></div>
        <div className="skeleton-line"></div>
        <div className="skeleton-line short"></div>
      </div>
    ))}
  </div>
)}
<textarea
  className="input-textarea"
  placeholder="Paste meeting notes..."
  value={text}
  onChange={(e) => setText(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter" && e.ctrlKey) {
      handleSubmit();
    }
  }}
/>

  <div className="input-footer">
    <span className="hint-text">AI will extract actionable tasks</span>

       <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
  {loading ? (
    <span className="loading-content">
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
    </span>
  ) : (
    "Extract Tasks →"
  )}
</button>
  </div>

</div>

    {error && <p style={{ color: "red" }}>{error}</p>}


    <StatsCards tasks={tasks} />

    <SearchBar search={search} setSearch={setSearch} />

    <FilterBar filter={filter} setFilter={setFilter} />

    {/* TASK GRID */}
    <div className="task-grid">
      {filteredTasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          refreshTasks={fetchTasks}
        />
      ))}
    </div>

  </div>
);
};

export default Home;