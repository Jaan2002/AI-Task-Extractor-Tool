import { useTheme } from "../context/ThemeContext";
import Icon from "./Icon";
const Topbar = ({ page, setPage }) => {
  const { toggleTheme, theme } = useTheme();

  const titles = {
    "/": "Dashboard",
    "/tasks": "Tasks",
    "/analytics": "Analytics",
    "/ai": "AI Extractor"
  };

  return (
    
          <div className="topbar">
            <span className="topbar-title">{titles[page]}</span>

            <div className="topbar-right">
          <div className="icon-btn theme-toggle" onClick={toggleTheme}>
          <Icon name={theme === "dark" ? "sun" : "moon"} size={18} />
         </div>
              <div className="icon-btn" style={{position:"relative"}}>
                <Icon name="bell" size={16}/>
                <span className="notif-badge">3</span>
              </div>
              <div className="avatar" style={{cursor:"pointer"}}>JS</div>
            </div>
          </div>
  );
};

export default Topbar;