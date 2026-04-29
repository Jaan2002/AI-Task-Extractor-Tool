import { useState } from "react";
import StatsCards from "../components/StatsCards";
import Icon from "../components/Icon";
import TaskCard from "../components/TaskCard";
const Dashboard= ({tasks,refreshTasks}) => {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = tasks.filter(t => {
    const mf = filter === "All" || t.priority === filter;
    const ms = (t.title || "").toLowerCase().includes(search.toLowerCase());
    return mf && ms;
  });

  return (
    <>
      <StatsCards tasks={tasks}/>

      <div className="toolbar">
        <div className="search-wrap">
          <span className="search-icon"><Icon name="search" size={14}/></span>
          <input className="search-input" placeholder="Search tasks..." value={search} onChange={e => setSearch(e.target.value)}/>
        </div>
        <div className="filter-tabs">
          {["All","High","Medium","Low"].map(f => (
            <button key={f} className={`filter-tab ${filter===f?"active":""}`} onClick={()=>setFilter(f)}>
              {f !== "All" && <span className={`priority-dot dot-${f.toLowerCase()}`}/>}
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="task-grid">
        {filtered.length === 0 ? (
          <div className="empty">
            <div className="empty-icon">🎯</div>
            <div>No tasks found. Use the AI Extractor to add some!</div>
          </div>
        ) : filtered.map(t => (
          <TaskCard key={t._id} task={t} refreshTasks={refreshTasks}/>
        ))}
      </div>
    </>
  );
};
export default Dashboard;