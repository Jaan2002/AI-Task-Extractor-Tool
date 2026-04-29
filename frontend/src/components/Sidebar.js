import Icon from "./Icon";
import Logo from "./Logo";
const Sidebar = ({ page, setPage }) => {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "home" },
    { id: "tasks", label: "Tasks", icon: "tasks" },
    { id: "analytics", label: "Analytics", icon: "chart" },
    { id: "ai", label: "AI Extractor", icon: "ai" },
  ];
  return (
    <div className="sidebar">
          <Logo/>
          <div className="nav-label">Menu</div>
          {navItems.map(item => (
            <button key={item.id} className={`nav-item ${page===item.id?"active":""}`} onClick={()=>setPage(item.id)}>
              <Icon name={item.icon} size={16}/>
              {item.label}
              {page===item.id && <span className="nav-dot"/>}
            </button>
          ))}

          <div className="nav-label" style={{marginTop:"auto"}}>Account</div>
          <button className="nav-item" style={{marginBottom:"4px"}}>
            <Icon name="settings" size={16}/> Settings
          </button>

          <div className="sidebar-bottom">
            <div className="user-card">
              <div className="avatar">JS</div>
              <div className="user-info">
                <div className="user-name">Jaanvi kapoor</div>
                <div className="user-email">jaanvi@example.com</div>
              </div>
            </div>
          </div>
        </div>
  );
};

export default Sidebar;
