"use client";
import { useState, useEffect } from "react";

function ReviewRenderer({ text }) {
  if (!text) return null;
  let data = null;
  try { data = JSON.parse(text); } catch(e) {
    return <div style={{ fontSize: "0.9rem", lineHeight: 1.8, color: "var(--text)", whiteSpace: "pre-wrap" }}>{text}</div>;
  }
  function ratingColor(r) {
    if (!r) return "var(--text2)";
    const rl = r.toLowerCase().trim();
    if (rl === "strong") return "var(--green)";
    if (rl === "developing") return "var(--accent2)";
    if (rl === "needs work") return "var(--red)";
    return "var(--text3)";
  }
  function ratingBg(r) {
    if (!r) return "transparent";
    const rl = r.toLowerCase().trim();
    if (rl === "strong") return "var(--green-light)";
    if (rl === "developing") return "var(--accent2-light)";
    if (rl === "needs work") return "var(--red-light)";
    return "transparent";
  }
  const sectionStyle = { marginBottom: "1.75rem" };
  const labelStyle = { fontSize: "0.72rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "0.75rem", paddingBottom: "0.4rem", borderBottom: "0.5px solid var(--border)" };
  return (
    <div style={{ marginTop: "0.5rem" }}>
      {data.overview && (
        <div style={sectionStyle}>
          <div style={{ ...labelStyle, color: "var(--text3)" }}>Overview</div>
          <div style={{ fontSize: "0.9rem", lineHeight: 1.8, color: "var(--text)" }}>{data.overview}</div>
        </div>
      )}
      {(data.duration_note || data.intention_achieved) && (
        <div style={{ ...sectionStyle, display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          {data.duration_note && data.duration_note.trim() && (
            <div style={{ flex: 1, minWidth: 200, padding: "0.75rem 1rem", background: "var(--surface2)", borderRadius: "var(--radius-sm)", fontSize: "0.85rem", color: "var(--text2)", lineHeight: 1.6 }}>
              <div style={{ fontWeight: 500, color: "var(--text)", marginBottom: "0.25rem", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Session length</div>
              {data.duration_note}
            </div>
          )}
          {data.intention_achieved && data.intention_achieved.trim() && (
            <div style={{ flex: 1, minWidth: 200, padding: "0.75rem 1rem", background: "var(--blue-light)", borderRadius: "var(--radius-sm)", fontSize: "0.85rem", color: "var(--text2)", lineHeight: 1.6 }}>
              <div style={{ fontWeight: 500, color: "var(--blue)", marginBottom: "0.25rem", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Intention check</div>
              {data.intention_achieved}
            </div>
          )}
        </div>
      )}
      {data.dimensions && data.dimensions.length > 0 && (
        <div style={sectionStyle}>
          <div style={{ ...labelStyle, color: "var(--blue)" }}>Dimensions</div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left", padding: "8px 10px", borderBottom: "2px solid var(--border2)", color: "var(--text2)", fontWeight: 500, width: "28%" }}>Dimension</th>
                  <th style={{ textAlign: "left", padding: "8px 10px", borderBottom: "2px solid var(--border2)", color: "var(--text2)", fontWeight: 500, width: "12%" }}>Rating</th>
                  <th style={{ textAlign: "left", padding: "8px 10px", borderBottom: "2px solid var(--border2)", color: "var(--text2)", fontWeight: 500 }}>Evidence from session</th>
                </tr>
              </thead>
              <tbody>
                {data.dimensions.map(function(d, i) {
                  return (
                    <tr key={i} style={{ borderBottom: "0.5px solid var(--border)", background: i % 2 === 0 ? "transparent" : "var(--surface2)" }}>
                      <td style={{ padding: "8px 10px", color: "var(--text)", fontWeight: 500, verticalAlign: "top", lineHeight: 1.5 }}>{d.name}</td>
                      <td style={{ padding: "8px 10px", verticalAlign: "top" }}>
                        <span style={{ display: "inline-block", padding: "2px 8px", borderRadius: 20, fontSize: "0.75rem", fontWeight: 500, background: ratingBg(d.rating), color: ratingColor(d.rating), whiteSpace: "nowrap" }}>{d.rating}</span>
                      </td>
                      <td style={{ padding: "8px 10px", color: "var(--text2)", verticalAlign: "top", lineHeight: 1.6 }}>{d.evidence}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {data.landed_well && data.landed_well.length > 0 && (
        <div style={sectionStyle}>
          <div style={{ ...labelStyle, color: "var(--green)" }}>What landed well</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {data.landed_well.map(function(item, i) {
              return (
                <div key={i} style={{ padding: "0.75rem 1rem", background: "var(--green-light)", borderRadius: "var(--radius-sm)", borderLeft: "3px solid var(--green)" }}>
                  <div style={{ fontSize: "0.85rem", color: "var(--green)", fontWeight: 500, marginBottom: "0.3rem", fontStyle: "italic" }}>{item.moment}</div>
                  <div style={{ fontSize: "0.85rem", color: "var(--text2)", lineHeight: 1.6 }}>{item.why}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {data.priority_focus && data.priority_focus.length > 0 && (
        <div style={sectionStyle}>
          <div style={{ ...labelStyle, color: "var(--accent2)" }}>Priority focus for next session</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {data.priority_focus.map(function(item, i) {
              return (
                <div key={i} style={{ padding: "0.75rem 1rem", background: "var(--accent2-light)", borderRadius: "var(--radius-sm)", borderLeft: "3px solid var(--accent2)" }}>
                  <div style={{ fontSize: "0.85rem", color: "var(--accent2)", fontWeight: 500, marginBottom: "0.3rem" }}>{item.area}</div>
                  <div style={{ fontSize: "0.85rem", color: "var(--text2)", lineHeight: 1.6 }}>{item.suggestion}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {data.explore_further && data.explore_further.length > 0 && (
        <div style={sectionStyle}>
          <div style={{ ...labelStyle, color: "var(--blue)" }}>Explore further</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {data.explore_further.map(function(item, i) {
              return (
                <div key={i} style={{ padding: "0.75rem 1rem", background: "var(--blue-light)", borderRadius: "var(--radius-sm)", borderLeft: "3px solid var(--blue)" }}>
                  <div style={{ fontSize: "0.85rem", color: "var(--blue)", fontWeight: 500, marginBottom: "0.3rem" }}>{item.concept}</div>
                  <div style={{ fontSize: "0.85rem", color: "var(--text2)", lineHeight: 1.6 }}>{item.reason}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {data.reflection_question && (
        <div style={sectionStyle}>
          <div style={{ ...labelStyle, color: "var(--text3)" }}>Reflection question</div>
          <div style={{ padding: "1rem 1.25rem", background: "var(--surface2)", borderRadius: "var(--radius-sm)", fontSize: "0.95rem", lineHeight: 1.7, color: "var(--text)", fontStyle: "italic" }}>
            {data.reflection_question}
          </div>
        </div>
      )}
    </div>
  );
}

function StudentTrendsChart({ sessions }) {
  if (!sessions || sessions.length < 2) return null;
  const KEY_DIMS = [
    "Rapport and therapeutic alliance",
    "Question types (open vs closed, timing)",
    "Paraphrasing",
    "Emotional attunement",
    "Session management (opening, structure, closing)",
  ];
  const RATING_SCORE = { "strong": 3, "developing": 2, "needs work": 1 };
  function getScore(session, dim) {
    if (!session.review) return null;
    try {
      const data = JSON.parse(session.review);
      const d = data.dimensions && data.dimensions.find(function(x) { return x.name.toLowerCase() === dim.toLowerCase(); });
      if (!d) return null;
      return RATING_SCORE[d.rating.toLowerCase()] || null;
    } catch(e) { return null; }
  }
  const W = 520, H = 160, padL = 8, padR = 8, padT = 10, padB = 30;
  const innerW = W - padL - padR, innerH = H - padT - padB;
  const colors = ["#185FA5","#2D6A4F","#854F0B","#8B2020","#534AB7"];
  const sorted = sessions.slice().sort(function(a,b) { return new Date(a.date) - new Date(b.date); });
  function getPoints(dim) {
    const pts = [];
    sorted.forEach(function(s, i) {
      const score = getScore(s, dim);
      if (score !== null) {
        const x = padL + (sorted.length === 1 ? innerW/2 : (i/(sorted.length-1))*innerW);
        const y = padT + innerH - ((score-1)/2)*innerH;
        pts.push({ x, y, score, label: new Date(s.date).toLocaleDateString("en-CA", { month:"short", day:"numeric" }) });
      }
    });
    return pts;
  }
  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <div style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text3)", marginBottom: "0.75rem" }}>Progress over time</div>
      <div style={{ overflowX: "auto" }}>
        <svg width={W} height={H} style={{ display: "block", maxWidth: "100%" }}>
          {[1,2,3].map(function(v) {
            const y = padT + innerH - ((v-1)/2)*innerH;
            return (
              <g key={v}>
                <line x1={padL} x2={W-padR} y1={y} y2={y} stroke="var(--border)" strokeWidth={0.5} />
                <text x={padL} y={y-3} fontSize={9} fill="var(--text3)">{v===3?"Strong":v===2?"Developing":"Needs Work"}</text>
              </g>
            );
          })}
          {sorted.map(function(s, i) {
            const x = padL + (sorted.length===1 ? innerW/2 : (i/(sorted.length-1))*innerW);
            return <text key={i} x={x} y={H-8} fontSize={9} fill="var(--text3)" textAnchor="middle">{new Date(s.date).toLocaleDateString("en-CA",{month:"short",day:"numeric"})}</text>;
          })}
          {KEY_DIMS.map(function(dim, di) {
            const pts = getPoints(dim);
            if (pts.length < 1) return null;
            const color = colors[di % colors.length];
            const pathD = pts.map(function(p,i){return(i===0?"M":"L")+p.x+","+p.y;}).join(" ");
            return (
              <g key={dim}>
                {pts.length > 1 && <path d={pathD} fill="none" stroke={color} strokeWidth={1.5} strokeOpacity={0.8} />}
                {pts.map(function(p,i){return <circle key={i} cx={p.x} cy={p.y} r={3} fill={color} />;  })}
              </g>
            );
          })}
        </svg>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.5rem" }}>
        {KEY_DIMS.map(function(dim, di) {
          return (
            <div key={dim} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.72rem", color: "var(--text2)" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: colors[di % colors.length], flexShrink: 0 }} />
              {dim.split("(")[0].trim()}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StudentDetailView({ student, sessions, password, onBack }) {
  const [selected, setSelected] = useState(null);
  const [activeTab, setActiveTab] = useState("review");
  const [noteText, setNoteText] = useState("");
  const [savingNote, setSavingNote] = useState(false);
  const [noteSaved, setNoteSaved] = useState(false);
  const [allSessions, setAllSessions] = useState(sessions);

  const SESSION_TYPE_LABELS = { intake:"Intake", early:"Early", mid:"Mid-therapy", closing:"Closing", crisis:"Crisis" };

  function formatDate(d) { return new Date(d).toLocaleDateString("en-CA", { year:"numeric", month:"short", day:"numeric", hour:"2-digit", minute:"2-digit" }); }
  function formatDuration(s) { if (!s) return null; return Math.floor(s/60) + "m " + (s%60) + "s"; }

  async function saveNote() {
    if (!selected || !noteText.trim()) return;
    setSavingNote(true);
    try {
      await fetch("/api/sessions", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selected.id, professor_note: noteText.trim(), password }),
      });
      const updated = { ...selected, professor_note: noteText.trim() };
      setSelected(updated);
      setAllSessions(function(prev) { return prev.map(function(s) { return s.id === selected.id ? updated : s; }); });
      setNoteSaved(true);
      setTimeout(function() { setNoteSaved(false); }, 2000);
    } catch(e) {}
    setSavingNote(false);
  }

  // Summary stats
  const totalSessions = allSessions.length;
  const avgDuration = allSessions.filter(function(s){return s.duration_seconds > 0;}).length > 0
    ? Math.round(allSessions.filter(function(s){return s.duration_seconds>0;}).reduce(function(a,s){return a+s.duration_seconds;},0) / allSessions.filter(function(s){return s.duration_seconds>0;}).length / 60)
    : null;
  const modalities = [...new Set(allSessions.map(function(s){return s.modality;}))];

  if (selected) {
    return (
      <div>
        <button onClick={function(){setSelected(null);setActiveTab("review");setNoteText("");}} style={{fontSize:"0.85rem",color:"var(--text2)",background:"none",border:"none",cursor:"pointer",padding:"0 0 1rem",fontFamily:"inherit"}}>
          ← Back to {student}
        </button>
        <div className="card">
          <div style={{fontWeight:500,fontSize:"1rem",color:"var(--text)"}}>{selected.modality}</div>
          <div style={{fontSize:"0.8rem",color:"var(--text2)",marginTop:4,display:"flex",flexWrap:"wrap",gap:"0.5rem"}}>
            <span>{formatDate(selected.date)}</span>
            <span>·</span><span>{SESSION_TYPE_LABELS[selected.session_type]||selected.session_type}</span>
            <span>·</span><span>{selected.mode==="solo"?"Solo":"Group"}</span>
            {selected.duration_seconds>0&&<><span>·</span><span>{formatDuration(selected.duration_seconds)}</span></>}
            {selected.issue&&selected.issue!==""&&<><span>·</span><span>{selected.issue}</span></>}
          </div>
          {selected.intention&&selected.intention!==""&&(
            <div style={{marginTop:"0.5rem",fontSize:"0.82rem",color:"var(--text2)",background:"var(--blue-light)",padding:"0.4rem 0.75rem",borderRadius:"var(--radius-sm)"}}>
              Student intention: {selected.intention}
            </div>
          )}
        </div>
        <div className="tabs">
          {["review","transcript","note"].map(function(tab){
            return <button key={tab} className={"tab"+(activeTab===tab?" active":"")} onClick={function(){setActiveTab(tab);}}>{tab==="note"?"Add note":tab.charAt(0).toUpperCase()+tab.slice(1)}</button>;
          })}
        </div>
        {activeTab==="review"&&(
          <div className="card">
            {selected.professor_note&&(
              <div style={{marginBottom:"1.25rem",padding:"0.75rem 1rem",background:"var(--accent2-light)",borderRadius:"var(--radius-sm)",borderLeft:"3px solid var(--accent2)"}}>
                <div style={{fontSize:"0.72rem",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.05em",color:"var(--accent2)",marginBottom:"0.25rem"}}>Your note</div>
                <div style={{fontSize:"0.875rem",color:"var(--text2)",lineHeight:1.6}}>{selected.professor_note}</div>
              </div>
            )}
            <ReviewRenderer text={selected.review} />
          </div>
        )}
        {activeTab==="transcript"&&(
          <div className="card">
            <div className="section-label">Transcript</div>
            <div style={{fontSize:"0.875rem",lineHeight:1.8,color:"var(--text2)",whiteSpace:"pre-wrap"}}>{selected.transcript||"No transcript recorded."}</div>
          </div>
        )}
        {activeTab==="note"&&(
          <div className="card">
            <div style={{fontSize:"0.75rem",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em",color:"var(--accent2)",marginBottom:"0.75rem"}}>Leave a note for {student}</div>
            <textarea value={noteText} onChange={function(e){setNoteText(e.target.value);}} placeholder="Write your feedback here — the student will see this when they open this session..." style={{minHeight:140,resize:"vertical",lineHeight:1.7}} />
            <div style={{marginTop:"0.75rem",display:"flex",alignItems:"center",gap:"0.75rem"}}>
              <button onClick={saveNote} disabled={savingNote||!noteText.trim()} className="btn btn-sm" style={{background:"var(--accent2)",color:"#fff",borderColor:"var(--accent2)",opacity:savingNote||!noteText.trim()?0.5:1}}>
                {savingNote?"Saving...":"Save note"}
              </button>
              {noteSaved&&<span style={{fontSize:"0.85rem",color:"var(--green)"}}>Saved — student will see this.</span>}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <button onClick={onBack} style={{fontSize:"0.85rem",color:"var(--text2)",background:"none",border:"none",cursor:"pointer",padding:"0 0 1rem",fontFamily:"inherit"}}>← All students</button>
      <div className="header" style={{paddingTop:"1rem",paddingBottom:"1.5rem",marginBottom:"1rem"}}>
        <h1 style={{fontSize:"1.8rem"}}>{student}</h1>
        <p>{totalSessions} session{totalSessions!==1?"s":""}{avgDuration?" · avg "+avgDuration+"min":""} · {modalities.join(", ")}</p>
      </div>

      {allSessions.length >= 2 && (
        <div className="card"><StudentTrendsChart sessions={allSessions} /></div>
      )}

      <div style={{display:"flex",flexDirection:"column",gap:"0.6rem"}}>
        {allSessions.map(function(s){
          return (
            <button key={s.id} onClick={function(){setSelected(s);setNoteText(s.professor_note||"");setActiveTab("review");}}
              className="card"
              style={{textAlign:"left",cursor:"pointer",fontFamily:"inherit",transition:"border-color 0.15s"}}
              onMouseOver={function(e){e.currentTarget.style.borderColor="var(--border2)";}}
              onMouseOut={function(e){e.currentTarget.style.borderColor="var(--border)";}}>
              <div className="row">
                <div>
                  <div style={{fontWeight:500,fontSize:"0.9rem",color:"var(--text)"}}>{s.modality} — {SESSION_TYPE_LABELS[s.session_type]||s.session_type}</div>
                  <div style={{fontSize:"0.78rem",color:"var(--text2)",marginTop:2}}>
                    {s.mode==="solo"?"Solo":"Group"}
                    {s.duration_seconds>0&&" · "+formatDuration(s.duration_seconds)}
                    {s.issue&&s.issue!==""&&" · "+s.issue}
                  </div>
                  {s.intention&&s.intention!==""&&<div style={{fontSize:"0.75rem",color:"var(--text3)",marginTop:1,fontStyle:"italic"}}>Focus: {s.intention}</div>}
                  {s.professor_note&&<div style={{fontSize:"0.75rem",color:"var(--accent2)",marginTop:1}}>Note added</div>}
                </div>
                <div style={{fontSize:"0.75rem",color:"var(--text3)",whiteSpace:"nowrap"}}>{formatDate(s.date)}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function ProfessorPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(function() {
    try {
      const saved = localStorage.getItem("clinicTheme");
      if (saved) setDarkMode(saved==="dark");
      else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) setDarkMode(true);
    } catch(e) {}
  }, []);

  useEffect(function() {
    document.documentElement.setAttribute("data-theme", darkMode?"dark":"light");
    try { localStorage.setItem("clinicTheme", darkMode?"dark":"light"); } catch(e) {}
  }, [darkMode]);

  const [allStudents, setAllStudents] = useState([]);

  async function login() {
    setLoading(true); setError("");
    try {
      const [sessRes, studRes] = await Promise.all([
        fetch("/api/sessions?all=true&password="+encodeURIComponent(password)),
        fetch("/api/students?password="+encodeURIComponent(password)),
      ]);
      if (!sessRes.ok) { setError("Incorrect password."); setLoading(false); return; }
      const sessData = await sessRes.json();
      const studData = studRes.ok ? await studRes.json() : [];
      setSessions(sessData);
      setAllStudents(studData || []);
      setAuthed(true);
    } catch(e) { setError("Connection issue — please try again."); }
    setLoading(false);
  }

  const students = [...new Set(sessions.map(function(s){return s.student_name;}))].sort();

  if (!authed) {
    return (
      <div style={{fontFamily:"inherit"}}>
        <button className="theme-toggle" onClick={function(){setDarkMode(function(d){return !d;})}}>{darkMode?"☀":"☾"}</button>
        <div style={{maxWidth:400,margin:"4rem auto",padding:"0 1.5rem"}}>
          <div style={{textAlign:"center",marginBottom:"2rem"}}>
            <h1 style={{fontSize:"2rem",color:"var(--text)",marginBottom:"0.5rem"}}>Professor Access</h1>
            <p style={{fontSize:"0.9rem",color:"var(--text2)"}}>Enter your password to view all student sessions.</p>
          </div>
          <div className="card">
            <div className="field">
              <label>Password</label>
              <input type="password" value={password} onChange={function(e){setPassword(e.target.value);}} onKeyDown={function(e){if(e.key==="Enter")login();}} placeholder="Enter password" />
            </div>
            {error&&<div style={{fontSize:"0.85rem",color:"var(--red)",marginBottom:"0.75rem"}}>{error}</div>}
            <button className="btn primary" onClick={login} disabled={loading}>{loading?"Loading...":"Access dashboard"}</button>
          </div>
        </div>
      </div>
    );
  }

  if (selectedStudent) {
    const studentSessions = sessions.filter(function(s){return s.student_name===selectedStudent;}).sort(function(a,b){return new Date(b.date)-new Date(a.date);});
    return (
      <div className="app">
        <button className="theme-toggle" onClick={function(){setDarkMode(function(d){return !d;})}}>{darkMode?"☀":"☾"}</button>
        <StudentDetailView student={selectedStudent} sessions={studentSessions} password={password} onBack={function(){setSelectedStudent(null);}} />
      </div>
    );
  }

  return (
    <div className="app">
      <button className="theme-toggle" onClick={function(){setDarkMode(function(d){return !d;})}}>{darkMode?"☀":"☾"}</button>
      <div className="header">
        <h1>Professor Dashboard</h1>
        <p>{sessions.length} sessions · {allStudents.length} registered student{allStudents.length !== 1 ? "s" : ""}</p>
      </div>
      {/* Merge allStudents with session data so zero-session users appear */}
      {(function() {
        const sessionStudents = [...new Set(sessions.map(function(s){return s.student_name;}))];
        const registeredNames = allStudents.map(function(s){return s.name;});
        const allNames = [...new Set([...registeredNames, ...sessionStudents])].sort();

        return (
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:"0.75rem"}}>
            {allNames.map(function(student){
              const studentSessions = sessions.filter(function(s){return s.student_name===student;});
              const lastSession = studentSessions[0];
              const modalities = [...new Set(studentSessions.map(function(s){return s.modality;}))];
              const registered = allStudents.find(function(s){return s.name===student;});
              const hasNoSessions = studentSessions.length === 0;
              return (
                <button key={student} onClick={function(){setSelectedStudent(student);}}
                  className="card"
                  style={{textAlign:"left",cursor:"pointer",fontFamily:"inherit",transition:"all 0.15s",opacity: hasNoSessions ? 0.75 : 1}}
                  onMouseOver={function(e){e.currentTarget.style.borderColor="var(--accent)";e.currentTarget.style.boxShadow="0 0 0 3px var(--accent-light)";}}
                  onMouseOut={function(e){e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.boxShadow="var(--shadow)";}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"0.35rem"}}>
                    <div style={{fontWeight:600,fontSize:"0.95rem",color:"var(--text)"}}>{student}</div>
                    {hasNoSessions && <span style={{fontSize:"0.68rem",padding:"2px 8px",borderRadius:20,background:"var(--surface2)",color:"var(--text3)",border:"1px solid var(--border)"}}>No sessions yet</span>}
                  </div>
                  <div style={{fontSize:"0.78rem",color:"var(--text2)",marginBottom:"0.35rem"}}>
                    {studentSessions.length} session{studentSessions.length!==1?"s":""}
                    {modalities.length > 0 && " · " + modalities.slice(0,2).join(", ") + (modalities.length>2?" +"+(modalities.length-2)+" more":"")}
                  </div>
                  {registered && <div style={{fontSize:"0.7rem",color:"var(--text3)"}}>First seen: {new Date(registered.first_seen).toLocaleDateString("en-CA",{month:"short",day:"numeric",year:"numeric"})}</div>}
                  {lastSession && <div style={{fontSize:"0.7rem",color:"var(--text3)"}}>Last session: {new Date(lastSession.date).toLocaleDateString("en-CA",{month:"short",day:"numeric",year:"numeric"})}</div>}
                </button>
              );
            })}
          </div>
        );
      })()}
    </div>
  );
}
