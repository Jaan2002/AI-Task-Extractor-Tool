import { showToastGlobal}  from "../components/ToastContainer";
import Icon from "../components/Icon";
const API = "http://localhost:5000/api/tasks";
const TaskCard = ({ task, refreshTasks }) => {
  const pClass = { High: "badge-high", Medium: "badge-medium", Low: "badge-low" }[task.priority] || "badge-medium";
  const sClass = task.status === "completed" ? "chip-completed" : task.status === "in-progress" ? "chip-in-progress" : "chip-pending";
  const confVal = task.confidence === "High" ? 85 : task.confidence === "Medium" ? 55 : task.confidence === "Low" ? 25 : 60;
  const confClass = task.confidence === "High" ? "conf-high" : task.confidence === "Medium" ? "conf-medium" : "conf-low";

  const handleDelete = async () => {
    try {
      await fetch(`${API}/${task._id}`, { method: "DELETE" });
      showToastGlobal("Task deleted", "success");
      refreshTasks();
    } catch { showToastGlobal("Delete failed", "error"); }
  };

  const handleComplete = async () => {
    try {
      await fetch(`${API}/${task._id}`, { method: "PUT" });
      showToastGlobal("Task completed ✓", "success");
      refreshTasks();
    } catch { showToastGlobal("Update failed", "error"); }
  };

  return (
    <div className={`task-card ${task.status === "completed" ? "completed" : ""}`}>
      <div className="task-card-top">
        <div className={`task-title ${task.status === "completed" ? "done" : ""}`}>{task.title} </div>
        <span className={`priority-badge ${pClass}`}>{task.priority || "Medium"}</span>
      </div>
      <div className="task-meta">
        <div className="meta-row">
          <span className="meta-icon"><Icon name="user" size={12}/></span>
          <span>{task.assigned_to || "Unassigned"}</span>
          <span style={{margin:"0 4px",color:"var(--text3)"}}>·</span>
          <span><span className={`status-chip ${sClass}`}>{task.status || "pending"}</span></span>
        </div>
        <div className="meta-row">
          <span className="meta-icon"><Icon name="calendar" size={12}/></span>
          <span>{task.deadline || "No deadline"}</span>
        </div>
      </div>
      {task.confidence && (
        <div>
          <div style={{fontSize:"11px",color:"var(--text3)",marginBottom:"4px"}}>AI Confidence</div>
          <div className="confidence-bar">
            <div className={`confidence-fill ${confClass}`} style={{width: `${confVal}%`}}></div>
          </div>
        </div>
      )}
      <div className="task-actions">
        <button className="action-btn btn-complete" onClick={handleComplete} disabled={task.status === "completed"}>
          <Icon name="check" size={12}/> Complete
        </button>
        <button className="action-btn btn-delete" onClick={handleDelete}>
          <Icon name="trash" size={12}/> Delete
        </button>
      </div>
    </div>
  );
};
export default TaskCard;