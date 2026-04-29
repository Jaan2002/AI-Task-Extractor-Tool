const Analytics = ({ tasks }) => {
  const total = tasks.length || 1;
  const completed = tasks.filter(t => t.status === "completed").length;
  const high = tasks.filter(t => t.priority === "High").length;
  const medium = tasks.filter(t => t.priority === "Medium").length;
  const low = tasks.filter(t => t.priority === "Low").length;

  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">Analytics</h1>
          <p className="page-sub">Task insights & distribution</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon green">📊</div>
          <div className="stat-num">{Math.round(completed/total*100)}%</div>
          <div className="stat-label">Completion Rate</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon red">🔥</div>
          <div className="stat-num">{high}</div>
          <div className="stat-label">High Priority</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon amber">⚡</div>
          <div className="stat-num">{medium}</div>
          <div className="stat-label">Medium Priority</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">🌿</div>
          <div className="stat-num">{low}</div>
          <div className="stat-label">Low Priority</div>
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"14px"}}>
        <div style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:"var(--r2)",padding:"20px"}}>
          <div style={{fontFamily:"var(--font-head)",fontSize:"14px",fontWeight:"600",marginBottom:"16px"}}>Priority Distribution</div>
          {[["High",high,total,"var(--red)"],["Medium",medium,total,"var(--amber)"],["Low",low,total,"var(--green)"]].map(([label,val,tot,color])=>(
            <div key={label} style={{marginBottom:"12px"}}>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:"12px",marginBottom:"5px"}}>
                <span style={{color:"var(--text2)"}}>{label}</span>
                <span style={{fontWeight:"500"}}>{val}</span>
              </div>
              <div style={{height:"6px",background:"var(--bg3)",borderRadius:"3px"}}>
                <div style={{height:"100%",background:color,borderRadius:"3px",width:`${Math.round(val/tot*100)}%`,transition:"width 0.5s ease"}}></div>
              </div>
            </div>
          ))}
        </div>

        <div style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:"var(--r2)",padding:"20px"}}>
          <div style={{fontFamily:"var(--font-head)",fontSize:"14px",fontWeight:"600",marginBottom:"16px"}}>Task Status</div>
          {[
            ["Completed", completed, "var(--green)"],
            ["Pending", tasks.filter(t=>t.status==="pending").length, "var(--amber)"],
            ["In Progress", tasks.filter(t=>t.status==="in-progress").length, "var(--blue)"],
          ].map(([label,val,color])=>(
            <div key={label} style={{marginBottom:"12px"}}>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:"12px",marginBottom:"5px"}}>
                <span style={{color:"var(--text2)"}}>{label}</span>
                <span style={{fontWeight:"500"}}>{val}</span>
              </div>
              <div style={{height:"6px",background:"var(--bg3)",borderRadius:"3px"}}>
                <div style={{height:"100%",background:color,borderRadius:"3px",width:`${Math.round(val/total*100)}%`,transition:"width 0.5s ease"}}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Analytics;