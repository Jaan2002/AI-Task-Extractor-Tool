// const Tasks = () => {
//   return (
//     <div>
//       <h2>All Tasks</h2>

//       <div className="task-grid">
//         {/* full task list */}
//       </div>
//     </div>
//   );
// };

// export default Tasks;
import { useState} from "react";
import Icon from "../components/Icon";
import TaskCard from "../components/TaskCard";
const Tasks = ({tasks,refreshTasks}) => {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const filtered = tasks.filter(t => {
    const mf = filter === "All" || t.priority === filter;
    const ms = (t.title || "").toLowerCase().includes(search.toLowerCase());
    const mst = statusFilter === "All" || t.status === statusFilter;
    return mf && ms && mst;
  });

  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">All Tasks</h1>
          <p className="page-sub">{tasks.length} total tasks</p>
        </div>
      </div>

      <div className="tasks-filters">
        <div className="search-wrap" style={{maxWidth:"300px"}}>
          <span className="search-icon"><Icon name="search" size={14}/></span>
          <input className="search-input" placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)}/>
        </div>
        <div className="filter-tabs">
          {["All","High","Medium","Low"].map(f => (
            <button key={f} className={`filter-tab ${filter===f?"active":""}`} onClick={()=>setFilter(f)}>
              {f !== "All" && <span className={`priority-dot dot-${f.toLowerCase()}`}/>}
              {f}
            </button>
          ))}
        </div>
        <div className="filter-tabs">
          {["All","pending","completed","in-progress"].map(s => (
            <button key={s} className={`filter-tab ${statusFilter===s?"active":""}`} onClick={()=>setStatusFilter(s)}>
              {s === "All" ? "All Status" : s}
            </button>
          ))}
        </div>
      </div>

      <div className="task-grid">
        {filtered.length === 0 ? (
          <div className="empty">
            <div className="empty-icon">📭</div>
            <div>No tasks match your filters</div>
          </div>
        ) : filtered.map(t => (
          <TaskCard key={t._id} task={t} refreshTasks={refreshTasks}/>
        ))}
      </div>
    </>
  );
};

export default Tasks;