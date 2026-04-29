const StatsCards = ({ tasks }) => {
  const total = tasks.length;
  const completed = tasks.filter(t => t.status === "completed").length;
  const pending = tasks.filter(t => t.status !== "completed").length;
  const overdue = tasks.filter(t => {
    if (!t.deadline) return false;
    return new Date(t.deadline) < new Date() && t.status !== "completed";
  }).length;

  const cards = [
    { label: "Total Tasks", value: total, icon: "📋", cls: "purple", sub: "All tasks created", change: null },
    { label: "Completed", value: completed, icon: "✅", cls: "green", sub: total ? `${Math.round(completed/total*100)}% of total` : "—", change: "up" },
    { label: "Pending", value: pending, icon: "⏳", cls: "amber", sub: "Tasks in progress", change: null },
    { label: "Overdue", value: overdue, icon: "⚠️", cls: "red", sub: overdue ? "Requires attention" : "All on track", change: overdue > 0 ? "down" : null },
  ];

  return (
    <div className="stats-grid">
      {cards.map(c => (
        <div className="stat-card" key={c.label}>
          <div className="stat-top">
            <div className={`stat-icon ${c.cls}`}>{c.icon}</div>
            {c.change && <span className={`stat-change ${c.change}`}>{c.change === "up" ? "↑" : "↓"}</span>}
          </div>
          <div>
            <div className="stat-num">{c.value}</div>
            <div className="stat-label">{c.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;