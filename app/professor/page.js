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

function formatDuration(seconds) {
  if (!seconds) return null;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return m + "m " + s + "s";
}

export default function ProfessorPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);
  const [filterStudent, setFilterStudent] = useState("all");
  const [activeTab, setActiveTab] = useState("review");
  const [noteText, setNoteText] = useState("");
  const [savingNote, setSavingNote] = useState(false);
  const [noteSaved, setNoteSaved] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(function() {
    try {
      const saved = localStorage.getItem("clinicTheme");
      if (saved) { setDarkMode(saved === "dark"); }
      else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) { setDarkMode(true); }
    } catch(e) {}
  }, []);

  useEffect(function() {
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
    try { localStorage.setItem("clinicTheme", darkMode ? "dark" : "light"); } catch(e) {}
  }, [darkMode]);

  async function login() {
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/sessions?all=true&password=" + encodeURIComponent(password));
      if (!res.ok) { setError("Incorrect password."); setLoading(false); return; }
      const data = await res.json();
      setSessions(data); setAuthed(true);
    } catch(e) { setError("Connection issue — please try again."); }
    setLoading(false);
  }

  async function saveNote() {
    if (!selected || !noteText.trim()) return;
    setSavingNote(true);
    try {
      await fetch("/api/sessions", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selected.id, professor_note: noteText.trim(), password }),
      });
      setSessions(function(prev) { return prev.map(function(s) { return s.id === selected.id ? { ...s, professor_note: noteText.trim() } : s; }); });
      setSelected(function(s) { return { ...s, professor_note: noteText.trim() }; });
      setNoteSaved(true);
      setTimeout(function() { setNoteSaved(false); }, 2000);
    } catch(e) {}
    setSavingNote(false);
  }

  const students = [...new Set(sessions.map(function(s) { return s.student_name; }))].sort();
  const filtered = filterStudent === "all" ? sessions : sessions.filter(function(s) { return s.student_name === filterStudent; });

  function formatDate(d) {
    return new Date(d).toLocaleDateString("en-CA", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
  }

  const SESSION_TYPE_LABELS = { intake: "Intake", early: "Early", mid: "Mid-therapy", closing: "Closing", crisis: "Crisis" };

  if (!authed) {
    return (
      <div style={{ fontFamily: "inherit" }}>
        <button className="theme-toggle" onClick={function() { setDarkMode(function(d) { return !d; }); }} title={darkMode ? "Switch to light mode" : "Switch to dark mode"}>
          {darkMode ? "☀" : "☾"}
        </button>
        <div style={{ maxWidth: 400, margin: "4rem auto", padding: "0 1.5rem" }}>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <h1 style={{ fontSize: "2rem", color: "var(--text)", marginBottom: "0.5rem" }}>Professor Access</h1>
            <p style={{ fontSize: "0.9rem", color: "var(--text2)" }}>Enter your password to view all student sessions.</p>
          </div>
          <div className="card">
            <div className="field">
              <label>Password</label>
              <input type="password" value={password} onChange={function(e) { setPassword(e.target.value); }} onKeyDown={function(e) { if (e.key === "Enter") login(); }} placeholder="Enter password" />
            </div>
            {error && <div style={{ fontSize: "0.85rem", color: "var(--red)", marginBottom: "0.75rem" }}>{error}</div>}
            <button className="btn primary" onClick={login} disabled={loading}>{loading ? "Loading..." : "Access dashboard"}</button>
          </div>
        </div>
      </div>
    );
  }

  if (selected) {
    return (
      <div className="app">
        <button className="theme-toggle" onClick={function() { setDarkMode(function(d) { return !d; }); }}>{darkMode ? "☀" : "☾"}</button>
        <button onClick={function() { setSelected(null); setActiveTab("review"); setNoteText(""); }}
          style={{ fontSize: "0.85rem", color: "var(--text2)", background: "none", border: "none", cursor: "pointer", padding: "0 0 1.5rem", fontFamily: "inherit" }}>
          ← Back to dashboard
        </button>
        <div className="card">
          <div style={{ fontWeight: 500, fontSize: "1rem", color: "var(--text)" }}>{selected.student_name}</div>
          <div style={{ fontSize: "0.8rem", color: "var(--text2)", marginTop: 4, display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            <span>{formatDate(selected.date)}</span>
            <span>·</span><span>{selected.modality}</span>
            <span>·</span><span>{SESSION_TYPE_LABELS[selected.session_type] || selected.session_type}</span>
            <span>·</span><span>{selected.mode === "solo" ? "Solo Practice" : "Group Supervision"}</span>
            {selected.duration_seconds > 0 && <><span>·</span><span>{formatDuration(selected.duration_seconds)}</span></>}
            {selected.issue && selected.issue !== "" && <><span>·</span><span>{selected.issue}</span></>}
          </div>
          {selected.intention && selected.intention !== "" && (
            <div style={{ marginTop: "0.5rem", fontSize: "0.82rem", color: "var(--text2)", background: "var(--blue-light)", padding: "0.4rem 0.75rem", borderRadius: "var(--radius-sm)" }}>
              Student intention: {selected.intention}
            </div>
          )}
        </div>

        <div className="tabs">
          {["review", "transcript", "note"].map(function(tab) {
            return (
              <button key={tab} className={"tab" + (activeTab === tab ? " active" : "")} onClick={function() { setActiveTab(tab); }}>
                {tab === "note" ? "Add note" : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            );
          })}
        </div>

        {activeTab === "review" && (
          <div className="card">
            {selected.professor_note && (
              <div style={{ marginBottom: "1.25rem", padding: "0.75rem 1rem", background: "var(--accent2-light)", borderRadius: "var(--radius-sm)", borderLeft: "3px solid var(--accent2)" }}>
                <div style={{ fontSize: "0.72rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--accent2)", marginBottom: "0.25rem" }}>Your note</div>
                <div style={{ fontSize: "0.875rem", color: "var(--text2)", lineHeight: 1.6 }}>{selected.professor_note}</div>
              </div>
            )}
            <ReviewRenderer text={selected.review} />
          </div>
        )}

        {activeTab === "transcript" && (
          <div className="card">
            <div className="section-label">Transcript</div>
            <div style={{ fontSize: "0.875rem", lineHeight: 1.8, color: "var(--text2)", whiteSpace: "pre-wrap" }}>{selected.transcript || "No transcript recorded."}</div>
          </div>
        )}

        {activeTab === "note" && (
          <div className="card">
            <div style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--accent2)", marginBottom: "0.75rem" }}>
              Leave a note for {selected.student_name}
            </div>
            <textarea value={noteText} onChange={function(e) { setNoteText(e.target.value); }}
              placeholder="Write your feedback here — the student will see this when they open this session..."
              style={{ minHeight: 140, resize: "vertical", lineHeight: 1.7 }} />
            <div style={{ marginTop: "0.75rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <button onClick={saveNote} disabled={savingNote || !noteText.trim()}
                className="btn btn-sm"
                style={{ background: "var(--accent2)", color: "#fff", borderColor: "var(--accent2)", opacity: savingNote || !noteText.trim() ? 0.5 : 1 }}>
                {savingNote ? "Saving..." : "Save note"}
              </button>
              {noteSaved && <span style={{ fontSize: "0.85rem", color: "var(--green)" }}>Saved — student will see this.</span>}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="app">
      <button className="theme-toggle" onClick={function() { setDarkMode(function(d) { return !d; }); }}>{darkMode ? "☀" : "☾"}</button>
      <div className="header">
        <h1>Professor Dashboard</h1>
        <p>{sessions.length} sessions across {students.length} students</p>
      </div>

      <div className="card">
        <div className="field">
          <label>Filter by student</label>
          <select value={filterStudent} onChange={function(e) { setFilterStudent(e.target.value); }}>
            <option value="all">All students ({sessions.length})</option>
            {students.map(function(s) {
              const count = sessions.filter(function(x) { return x.student_name === s; }).length;
              return <option key={s} value={s}>{s} ({count})</option>;
            })}
          </select>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {filtered.length === 0 && <div style={{ fontSize: "0.875rem", color: "var(--text3)", fontStyle: "italic", padding: "1rem 0" }}>No sessions yet.</div>}
        {filtered.map(function(s) {
          return (
            <button key={s.id} onClick={function() { setSelected(s); setNoteText(s.professor_note || ""); setActiveTab("review"); }}
              className="card"
              style={{ textAlign: "left", cursor: "pointer", fontFamily: "inherit", width: "100%", transition: "border-color 0.15s" }}
              onMouseOver={function(e) { e.currentTarget.style.borderColor = "var(--border2)"; }}
              onMouseOut={function(e) { e.currentTarget.style.borderColor = "var(--border)"; }}>
              <div className="row">
                <div>
                  <div style={{ fontWeight: 500, fontSize: "0.95rem", color: "var(--text)" }}>{s.student_name}</div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text2)", marginTop: 3 }}>
                    {s.modality}
                    <span style={{ margin: "0 0.3rem", opacity: 0.4 }}>·</span>
                    {SESSION_TYPE_LABELS[s.session_type] || s.session_type}
                    <span style={{ margin: "0 0.3rem", opacity: 0.4 }}>·</span>
                    {s.mode === "solo" ? "Solo" : "Group"}
                    {s.duration_seconds > 0 && <><span style={{ margin: "0 0.3rem", opacity: 0.4 }}>·</span>{formatDuration(s.duration_seconds)}</>}
                    {s.issue && s.issue !== "" && <><span style={{ margin: "0 0.3rem", opacity: 0.4 }}>·</span>{s.issue}</>}
                  </div>
                  {s.intention && s.intention !== "" && <div style={{ fontSize: "0.78rem", color: "var(--text3)", marginTop: 2, fontStyle: "italic" }}>Focus: {s.intention}</div>}
                  {s.professor_note && <div style={{ fontSize: "0.78rem", color: "var(--accent2)", marginTop: 2 }}>Note added</div>}
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--text3)", whiteSpace: "nowrap", marginLeft: "1rem" }}>{formatDate(s.date)}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
