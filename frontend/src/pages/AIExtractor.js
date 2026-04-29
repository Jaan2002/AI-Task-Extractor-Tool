import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useToast } from "../context/ToastContext";
import { showToastGlobal}  from "../components/ToastContainer";
import Icon from "../components/Icon";

// const AIExtractor = () => {
//       const [text, setText] = useState("");
//     //  const [tasks, setTasks] = useState([]); 
//       const [loading, setLoading] = useState(false);
//       const [error, setError] = useState("");
//       const [aiTyping, setAiTyping] = useState(false);
//       const [toast, setToast] = useState(null);
//      const navigate = useNavigate();
//      const { showToast } = useToast();

// const handleSubmit = async () => {
//     if (!text.trim()) return;

//     try {
//       setLoading(true);
//       setError("");
//       setAiTyping(true); //  animation start

//       const response = await fetch("http://localhost:5000/api/tasks/extract", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ text, source: "manual" })
//       });

//       const data = await response.json();

//       if (!data.success) {
//         throw new Error("Failed to extract tasks");
//       }

//     //   const res = await fetch("http://localhost:5000/api/tasks");
//     //   const dbData = await res.json();

//     //   setTasks(dbData.tasks);
//     //   setText("");
//     showToast("Tasks added successfully!", "success");
//     setTimeout(() => {
//       navigate("/");
//     }, 2000);
     
//     }catch {
//         console.error(error);
//     showToast("Append Task failed", "error");
//   }finally {
//        setLoading(false);
//       setTimeout(() => {
//        setAiTyping(false);
//          }, 1200); 
//     }
//   };
//   return (
//     <div className="input-box">

//   <div className="input-header">
//     <span className="input-title">AI Task Extractor</span>
//   </div>
//          {aiTyping && (
//   <div className="task-grid">
//     {[1, 2, 3].map((i) => (
//       <div key={i} className="task-skeleton">
//         <div className="skeleton-title"></div>
//         <div className="skeleton-line"></div>
//         <div className="skeleton-line short"></div>
//       </div>
//     ))}
//   </div>
// )}
// <textarea
//   className="input-textarea"
//   placeholder="Paste meeting notes..."
//   value={text}
//   onChange={(e) => setText(e.target.value)}
//   onKeyDown={(e) => {
//     if (e.key === "Enter" && e.ctrlKey) {
//       handleSubmit();
//     }
//   }}
// />
// {toast && (
//   <Toast
//     message={toast.message}
//     type={toast.type}
//     onClose={() => setToast(null)}
//   />
// )}

//   <div className="input-footer">
//     <span className="hint-text">AI will extract actionable tasks</span>

//        <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
//   {loading ? (
//     <span className="loading-content">
//       <span className="dot"></span>
//       <span className="dot"></span>
//       <span className="dot"></span>
//     </span>
//   ) : (
//     "Extract Tasks →"
//   )}
// </button>
//   </div>

// </div>
//   );
// };

const API = "http://localhost:5000/api/tasks";
const AIExtractor = ({ onExtracted }) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiTyping, setAiTyping] = useState(false);

  const handleSubmit = async () => {
    if (!text.trim()) return;
    try {
      setLoading(true);
      setAiTyping(true);
      const res = await fetch(`${API}/extract`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ text, source: "manual" })
      });
      const data = await res.json();
      if (!data.success) throw new Error();
      showToastGlobal("Tasks extracted successfully!", "success");
      setText("");
      setTimeout(() => { onExtracted(); }, 1200);
    } catch {
      showToastGlobal("Extraction failed", "error");
    } finally {
      setLoading(false);
      setTimeout(() => setAiTyping(false), 1200);
    }
  };

  return (
    <div style={{maxWidth:"780px",margin:"0 auto",width:"100%"}}>
      <div className="ai-page-header">
        <div className="ai-page-title">✦ AI Task Extractor</div>
        <p style={{color:"var(--text2)",fontSize:"14px",marginTop:"8px",lineHeight:"1.6"}}>
          Paste your meeting notes, emails, or any text. AI will extract actionable tasks, assign priorities, deadlines &amp; owners.
        </p>
      </div>

      <div style={{marginTop:"28px"}} className="ai-box">
        <div className="ai-header">
          <div className="ai-title">
            <Icon name="sparkle" size={16}/> Meeting Intelligence
          </div>
          <span className="ai-chip">GPT-4o Powered</span>
        </div>

        {aiTyping && (
          <div className="skeleton-row">
            {[1,2,3].map(i => (
              <div key={i} style={{background:"var(--bg3)",borderRadius:"10px",padding:"14px",display:"flex",flexDirection:"column",gap:"8px"}}>
                <div className="skel skel-title"></div>
                <div className="skel skel-line"></div>
                <div className="skel skel-short"></div>
              </div>
            ))}
          </div>
        )}

        <div className="ai-body">
          <textarea
            className="ai-textarea"
            rows={7}
            placeholder="e.g. 'John to fix the login bug by Friday. Sarah will review the design by next Monday. Aman needs to deploy to production ASAP...'"
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={e => { if(e.key==="Enter" && e.ctrlKey) handleSubmit(); }}
          />
        </div>

        <div className="ai-footer">
          <span className="ai-hint">⌘ + Enter to submit · AI extracts tasks, deadlines & owners</span>
          <button className="extract-btn" onClick={handleSubmit} disabled={loading || !text.trim()}>
            {loading ? (
              <span className="dots"><span/><span/><span/></span>
            ) : (
              <><Icon name="sparkle" size={14}/> Extract Tasks</>
            )}
          </button>
        </div>
      </div>

      <div style={{marginTop:"20px",padding:"16px 20px",background:"var(--surface)",border:"1px solid var(--border)",borderRadius:"var(--r2)"}}>
        <p style={{fontSize:"12px",color:"var(--text3)",lineHeight:"1.7"}}>
          <strong style={{color:"var(--text2)"}}>Pro tips:</strong> Mention assignees by name ("John to..."), include time references ("by Friday", "next week"), and describe urgency ("ASAP", "critical") for best results. Works with Slack messages, email threads, and meeting transcripts.
        </p>
      </div>
    </div>
  );
};

export default AIExtractor;