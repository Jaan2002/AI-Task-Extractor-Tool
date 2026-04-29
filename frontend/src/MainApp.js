import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Analytics from "./pages/Analytics";
import AIExtractor from "./pages/AIExtractor";
import { ToastContainer } from "./components/ToastContainer";
const API = "http://localhost:5000/api/tasks";


const MainApp = () => {
  const [page, setPage] = useState("dashboard");
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setTasks(data.tasks || []);
    } catch {}
  };

  useEffect(() => {
    fetchTasks();
  }, []);


  const renderPage = () => {
    switch (page) {
      case "dashboard":
        return <Dashboard tasks={tasks} refreshTasks={fetchTasks} />;
      case "tasks":
        return <Tasks tasks={tasks} refreshTasks={fetchTasks} />;
      case "analytics":
        return <Analytics tasks={tasks} />;
      case "ai":
        return <AIExtractor onExtracted={() => {
          setPage("dashboard");
        }} />;
      default:
        return null;
    }
  };

  return (
    <div className="app">
      <Sidebar page={page} setPage={setPage} />

      <div className="main">
        <Topbar page={page}/>

        <div className="content">
          {renderPage()}
        </div>
      </div>
      <ToastContainer /> 
    </div>
  );
};

export default MainApp;