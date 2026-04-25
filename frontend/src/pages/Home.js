import React, { useState } from "react";

const Home = () => {
  const [text, setText] = useState("");
  const [tasks, setTasks] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  //filter
  const filteredTasks = tasks.filter((task) => {
  const matchesFilter =
    filter === "All" || task.priority === filter;

  const matchesSearch =
    task.title.toLowerCase().includes(search.toLowerCase());

  return matchesFilter && matchesSearch;
});

 const handleSubmit = async () => {
  try {
    setLoading(true);     // start loading
    setError("");         // reset error

    const response = await fetch("http://localhost:5000/api/tasks/extract", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: text,
        source: "manual"
      })
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error("Something went wrong");
    }

    setTasks(data.data.tasks);

  } catch (err) {
    console.error(err);
    setError("Failed to extract tasks. Try again.");
  } finally {
    setLoading(false); // stop loading
  }
};
  
  return (
    <div style={{maxWidth: "800px",margin: "40px auto",padding: "20px",fontFamily: "Arial, sans-serif"}}>
    <div
      style={{
        backgroundColor: "white",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>AI Task Extractor</h2>

      <textarea
        rows="6"
        style={{
        width: "100%",
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        marginBottom: "15px"
        }}
        placeholder="Paste your meeting notes..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        />

      <br /><br />

    <div style={{ textAlign: "center" }}>
  <button
    onClick={handleSubmit}
    disabled={loading}
    style={{
      padding: "10px 25px",
      backgroundColor: loading ? "#aaa" : "#007bff",
      color: "white",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "16px"
    }}
  >
    {loading ? "Processing..." : "Extract Tasks"}
  </button>
    </div>
    
    {/* loading... */}
      {loading && (
     <p style={{ color: "#007bff", fontWeight: "bold" }}>
      ⏳ Analyzing your input...
    </p>
    )}

    {/* ERROR */}
    {error && (
     <p style={{ color: "red", fontWeight: "bold" }}>
    ❌ {error}
   </p>
    )}
      {/* EMPTY STATE */}
    {!loading && tasks.length === 0 && (
    <p style={{ color: "#777" }}>
     No tasks yet. Paste notes and click "Extract Tasks".
     </p>
    )}
      
      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
           marginTop: "20px",
          borderRadius: "6px",
          border: "1px solid #ccc"
        }}
      />
     <div
  style={{
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginTop: "20px"
  }}
>
  {["All", "High", "Medium", "Low"].map((type) => (
    <button
      key={type}
      onClick={() => setFilter(type)}
      style={{
        padding: "8px 16px",
        borderRadius: "20px",
        border: "none",
        cursor: "pointer",
        fontWeight: "bold",
        backgroundColor:
          filter === type
            ? type === "High"
              ? "#ff4d4f"
              : type === "Medium"
              ? "#faad14"
              : type === "Low"
              ? "#52c41a"
              : "#007bff"
            : "#e0e0e0",
        color: filter === type ? "white" : "black",
        transition: "0.2s"
      }}
    >
      {type}
    </button>
  ))}
</div>
     
      <div>
        <h3>Tasks:</h3>

        {filteredTasks.map((task) => (
            <div
              key={task.id}
              style={{
                backgroundColor: "#f9f9f9",
                borderRadius: "10px",
                padding: "15px",
                marginTop: "15px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
                }}
            >
  <h4 style={{ marginBottom: "10px" }}>{task.title}</h4>

        <p>👤 {task.assigned_to}</p>
        <p>📅 {task.deadline}</p>

        <p>
         ⚡{" "}
        <span
            style={{
            color:
            task.priority === "High"
            ? "red"
            : task.priority === "Medium"
            ? "orange"
            : "green",
            fontWeight: "bold"
             }}
         >
                  {task.priority}
        </span>
        </p>
            <p>📊 Confidence: {task.confidence}</p>
          </div>
        ))}
      </div>

    </div>
    </div>
  );
};

export default Home;