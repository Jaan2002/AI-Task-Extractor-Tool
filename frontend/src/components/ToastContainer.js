import { useState, useEffect } from "react";

let toastSetterGlobal = null;
const showToastGlobal = (msg, type) => {
  if (toastSetterGlobal) toastSetterGlobal(prev => [...prev, { id: Date.now(), msg, type }]);
};

const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);
  toastSetterGlobal = setToasts;
  useEffect(() => {
    if (toasts.length === 0) return;
    const t = setTimeout(() => setToasts(prev => prev.slice(1)), 3000);
    return () => clearTimeout(t);
  }, [toasts]);
  return (
    <div className="toast-container">
      {toasts.map(t => (
        <div key={t.id} className={`toast ${t.type}`}>
          {t.type === "success" ? "✓" : "✕"} {t.msg}
        </div>
      ))}
    </div>
  );
};
export { showToastGlobal,ToastContainer};