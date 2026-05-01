import Icon from "./Icon";
import Logo from "./Logo";
const Sidebar = ({ page, setPage }) => {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "home" },
    { id: "tasks", label: "Tasks", icon: "tasks" },
    { id: "analytics", label: "Analytics", icon: "chart" },
    { id: "ai", label: "AI Extractor", icon: "ai" },
    { id: "calendar", label: "Calendar", icon: "calendar" },
    { id: "teams", label: "Teams", icon: "user" },
    { id: "settings", label: "Settings", icon: "settings" },
  ];
  return (
     <div className="sidebar">

      {/* LOGO */}
      <div className="logo">
        <div className="logo-icon">
          <Icon name="check" size={20} />
        </div>
        <span className="logo-text">TaskGenie</span>
      </div>

      {/* NAV */}
      {navItems.map(item => (
        <button
          key={item.id}
          className={`nav-item ${page === item.id ? "active" : ""}`}
          onClick={() => setPage(item.id)}
        >
          <Icon name={item.icon} size={18} />
          {item.label}
        </button>
      ))}

      {/* UPGRADE CARD */}
      <div className="upgrade-box">
        <div className="upgrade-icon">
          <Icon name="sparkle" size={18} />
        </div>
        <h4>Upgrade to Pro</h4>
        <p>Unlock more features and boost your productivity.</p>
        <button>Upgrade Now</button>
      </div>

      {/* USER */}
      <div className="user-avatar">
      <img
        src="https://api.dicebear.com/7.x/adventurer/svg?seed=Suzzy&gender=female"
         alt="user"
         className="avatar-img"
      />

     <div className="user-info">
     <div className="user-name">Jaanvi Sharma</div>
     <div className="user-email">jaanvi@example.com</div>
     </div>
   </div>

    </div>
  );
};

export default Sidebar;
