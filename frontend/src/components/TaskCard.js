import Icon from "./Icon";
import { showToastGlobal}  from "../components/ToastContainer";
import { formatDate } from "../utils/formatDate";
const API = "http://localhost:5000/api/tasks";
const TaskCard = ({ task, refreshTasks }) => {
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
  const priorityClass = {
    High: "badge-high",
    Medium: "badge-medium",
    Low: "badge-low"
  }[task.priority] || "badge-medium";
     const sClass = task.status === "completed" ? "chip-completed" : task.status === "in-progress" ? "chip-in-progress" : "chip-pending";
//   const confVal = task.confidence === "High" ? 85 : task.confidence === "Medium" ? 55 : task.confidence === "Low" ? 25 : 60;
 const confClass = task.confidence === "High" ? "conf-high" : task.confidence === "Medium" ? "conf-medium" : "conf-low";

  const statusClass = {
    completed: "status-completed",
    pending: "status-pending",
    "in-progress": "status-progress"
  }[task.status] || "status-pending";


   const avatar = `https://api.dicebear.com/7.x/personas/svg?seed=${task.assigned_to || "User"}`;
  
  return (
    <div className="task-card">

      {/* TOP */}
      <div className="task-card-top">
        <h3 className="task-title">{task.title}</h3>
        <span className={`priority-badge ${priorityClass}`}>
          {task.priority}
        </span>
      </div>

      {/* USER + DATE */}
      <div className="task-user-row">
        <img src={avatar} className="avatar-img" />

        <span className="task-user">
          {task.assigned_to || "Unassigned"}
        </span>

            <span className="dot">•</span>

          <div className="task-date-group">
              <Icon name="calendar" size={14} />
              <span className="task-date">
               {formatDate(task.deadline)}
               </span>
          </div>
      </div>

      {/* STATUS */}
      <div className="task-row">
        <span className="label">Status:</span>
        <span className={`status-chip ${sClass}`}>
          {task.status}
        </span>
      </div>

      {/* CONFIDENCE */}
      <div className="task-row">
        <span className="label">Confidence:</span>
        <span className={`confidence-badge ${confClass}`}>
          {task.confidence}
        </span>
      </div>

      {/* ACTIONS */}
      
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