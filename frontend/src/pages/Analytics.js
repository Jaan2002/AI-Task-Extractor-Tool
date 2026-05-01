import {
  BarChart3,
  Flame,
  Activity,
  Leaf,
  CheckCircle2,
  Clock3,
  LoaderCircle,
} from "lucide-react";

const Analytics = ({ tasks }) => {
  const total = tasks.length || 1;

  const completed = tasks.filter(
    (t) => t.status === "completed"
  ).length;

  const pending = tasks.filter(
    (t) => t.status === "pending"
  ).length;

  const progress = tasks.filter(
    (t) => t.status === "in-progress"
  ).length;

  const high = tasks.filter(
    (t) => t.priority === "High"
  ).length;

  const medium = tasks.filter(
    (t) => t.priority === "Medium"
  ).length;

  const low = tasks.filter(
    (t) => t.priority === "Low"
  ).length;

  const statCards = [
    {
      title: "Completion Rate",
      value: `${Math.round((completed / total) * 100)}%`,
      icon: BarChart3,
      bg: "#ECFDF3",
      color: "#16A34A",
      sub: "Tasks completed successfully",
    },
    {
      title: "High Priority",
      value: high,
      icon: Flame,
      bg: "#FEE2E2",
      color: "#DC2626",
      sub: "Urgent tasks requiring attention",
    },
    {
      title: "Medium Priority",
      value: medium,
      icon: Activity,
      bg: "#FEF3C7",
      color: "#D97706",
      sub: "Moderate priority workload",
    },
    {
      title: "Low Priority",
      value: low,
      icon: Leaf,
      bg: "#DCFCE7",
      color: "#16A34A",
      sub: "Lower impact scheduled tasks",
    },
  ];

  const priorityData = [
    {
      label: "High",
      value: high,
      color: "#DC2626",
    },
    {
      label: "Medium",
      value: medium,
      color: "#D97706",
    },
    {
      label: "Low",
      value: low,
      color: "#16A34A",
    },
  ];

  const statusData = [
    {
      label: "Completed",
      value: completed,
      color: "#16A34A",
      icon: CheckCircle2,
    },
    {
      label: "Pending",
      value: pending,
      color: "#D97706",
      icon: Clock3,
    },
    {
      label: "In Progress",
      value: progress,
      color: "#2563EB",
      icon: LoaderCircle,
    },
  ];

  return (
    <div className="analytics-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">
            Analytics Dashboard
          </h1>

          <p className="page-sub">
            Monitor productivity, priorities, and
            task performance
          </p>
        </div>
      </div>

      <div className="analytics-stats-grid">
        {statCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              className="analytics-stat-card"
              key={card.title}
            >
              <div
                className="analytics-icon"
                style={{
                  background: card.bg,
                }}
              >
                <Icon
                  size={24}
                  color={card.color}
                  strokeWidth={2.2}
                />
              </div>

              <div className="analytics-content">
                <h4>{card.title}</h4>

                <h2>{card.value}</h2>

                <p>{card.sub}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="analytics-grid">
        <div className="analytics-panel">
          <div className="panel-header">
            <h3>Priority Distribution</h3>
          </div>

          <div className="panel-body">
            {priorityData.map((item) => (
              <div
                className="progress-item"
                key={item.label}
              >
                <div className="progress-top">
                  <span>{item.label}</span>

                  <span>{item.value}</span>
                </div>

                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{
                      background: item.color,
                      width: `${
                        (item.value / total) * 100
                      }%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="analytics-panel">
          <div className="panel-header">
            <h3>Task Status</h3>
          </div>

          <div className="panel-body">
            {statusData.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  className="status-row"
                  key={item.label}
                >
                  <div className="status-left">
                    <div
                      className="status-icon"
                      style={{
                        background: `${item.color}15`,
                      }}
                    >
                      <Icon
                        size={18}
                        color={item.color}
                      />
                    </div>

                    <span>{item.label}</span>
                  </div>

                  <div className="status-right">
                    <span>{item.value}</span>

                    <div className="status-bar">
                      <div
                        className="status-fill"
                        style={{
                          width: `${
                            (item.value / total) * 100
                          }%`,
                          background: item.color,
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

