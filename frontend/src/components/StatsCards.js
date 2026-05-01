import {
  ClipboardList,
  CheckCircle,
  Clock3,
  AlertCircle,
} from "lucide-react";

const StatsCards = ({ tasks }) => {
  const total = tasks.length;

  const completed = tasks.filter(
    (t) => t.status === "completed"
  ).length;

  const pending = tasks.filter(
    (t) => t.status !== "completed"
  ).length;

  const overdue = tasks.filter((t) => {
    if (!t.deadline) return false;

    return (
      new Date(t.deadline) < new Date() &&
      t.status !== "completed"
    );
  }).length;

  const cards = [
    {
      title: "Total Tasks",
      value: total,
      subtitle: "All tasks created",
      icon: ClipboardList,
      bg: "#EEF2FF",
      color: "#4F46E5",
    },
    {
      title: "Completed",
      value: completed,
      subtitle: `${Math.round(
        (completed / total) * 100 || 0
      )}% of total tasks`,
      icon: CheckCircle,
      bg: "#ECFDF3",
      color: "#16A34A",
    },
    {
      title: "Pending",
      value: pending,
      subtitle: "Tasks in progress",
      icon: Clock3,
      bg: "#FEF3C7",
      color: "#D97706",
    },
    {
      title: "Overdue",
      value: overdue,
      subtitle:
        overdue > 0
          ? "Requires attention"
          : "All on track",
      icon: AlertCircle,
      bg: "#FEE2E2",
      color: "#DC2626",
    },
  ];

  return (
    <div className="stats-grid">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div className="stat-card" key={card.title}>
            <div className="stat-top">
            <div
              className="stat-icon"
              style={{ background: card.bg }}
            >
              <Icon
                size={24}
                color={card.color}
                strokeWidth={2.2}
              />
            </div>
            

            <div className="stats-content">
              <h4>{card.title}</h4>

              <h2>{card.value}</h2>

              <p style={{ color: card.color }}>
                {card.subtitle}
              </p>
            </div>
          </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;

