"use client";
import { useState, useEffect } from "react";

function ReviewRenderer({ text }) {
  if (!text) return null;
  let data = null;
  try { data = JSON.parse(text); } catch(e) {
    return <div style={{ fontSize: "0.9rem", lineHeight: 1.8, color: "var(--color-text-primary)", whiteSpace: "pre-wrap" }}>{text}</div>;
  }
  function ratingColor(r) {
    if (!r) return "var(--color-text-secondary)";
    const rl = r.toLowerCase().trim();
    if (rl === "strong") return "#2D6A4F";
    if (rl === "developing") return "#854F0B";
    if (rl === "needs work") return "#8B2020";
    return "var(--color-text-tertiary)";
  }
  function ratingBg(r) {
    if (!r) return "transparent";
    const rl = r.toLowerCase().trim();
    if (rl === "strong") return "#EBF5F0";
    if (rl === "developing") return "#FDF3E3";
    if (rl === "needs work") return "#FDF0F0";
    return "transparent";
  }
  const sectionStyle = { marginBottom: "1.75rem" };
  const labelStyle = { fontSize: "0.72rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "0.75rem", paddingBottom: "0.4rem", borderBottom: "0.5px solid var(--color-border-tertiary)" };
  return (
    <div style={{ marginTop: "0.5rem" }}>
      {data.overview && (
        <div style={sectionStyle}>
          <div style={{ ...labelStyle, color: "var(--color-text-tertiary)" }}>Overview</div>
          <div style={{ fontSize: "0.9rem", lineHeight: 1.8, color: "var(--color-text-primary)" }}>{data.overview}</div>
        </div>
      )}
      {(data.duration_note || data.intention_achieved) && (
        <div style={{ ...sectionStyle, display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          {data.duration_note && data.duration_note.trim() && (
            <div style={{ flex: 1, minWidth: 200, padding: "0.75rem 1rem", background: "var(--color-background-secondary)", borderRadius: 8, fontSize: "0.85rem", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
              <div style={{ fontWeight: 500, color: "var(--color-text-primary)", marginBottom: "0.25rem", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Session length</div>
              {data.duration_note}
            </div>
          )}
          {data.intention_achieved && data.intention_achieved.trim() && (
            <div style={{ flex: 1, minWidth: 200, padding: "0.75rem 1rem", background: "#EBF0F8", borderRadius: 8, fontSize: "0.85rem", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
              <div style={{ fontWeight: 500, color: "#185FA5", marginBottom: "0.25rem", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Intention check</div>
              {data.intention_achieved}
            </div>
          )}
        </div>
      )}
      {data.dimensions && data.dimensions.length > 0 && (
        <div style={sectionStyle}>
          <div style={{ ...labelStyle, color: "#185FA5" }}>Dimensions</div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left", padding: "8px 10px", borderBottom: "2px solid var(--color-border-secondary)", color: "var(--color-text-secondary)", fontWeight: 500, width: "28%" }}>Dimension</th>
                  <th style={{ textAlign: "left", padding: "8px 10px", borderBottom: "2px solid var(--color-border-secondary)", color: "var(--color-text-secondary)", fontWeight: 500, width: "12%" }}>Rating</th>
                  <th style={{ textAlign: "left", padding: "8px 10px", borderBottom: "2px solid var(--color-border-secondary)", color: "var(--color-text-secondary)", fontWeight: 500 }}>Evidence from session</th>
                </tr>
              </thead>
              <tbody>
                {data.dimensions.map(function(d, i) {
                  return (
                    <tr key={i} style={{ borderBottom: "0.5px solid var(--color-border-tertiary)", background: i % 2 === 0 ? "transparent" : "var(--color-background-secondary)" }}>
                      <td style={{ padding: "8px 10px", color: "var(--color-text-primary)", fontWeight: 500, verticalAlign: "top", lineHeight: 1.5 }}>{d.name}</td>
                      <td style={{ padding: "8px 10px", verticalAlign: "top" }}>
                        <span style={{ display: "inline-block", padding: "2px 8px", borderRadius: 20, fontSize: "0.75rem", fontWeight: 500, background: ratingBg(d.rating), color: ratingColor(d.rating), whiteSpace: "nowrap" }}>{d.rating}</span>
                      </td>
                      <td style={{ padding: "8px 10px", color: "var(--color-text-secondary)", verticalAlign: "top", lineHeight: 1.6 }}>{d.evidence}</td>
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
          <div style={{ ...labelStyle, color: "#2D6A4F" }}>What landed well</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {data.landed_well.map(function(item, i) {
              return (
                <div key={i} style={{ padding: "0.75rem 1rem", background: "#EBF5F0", borderRadius: 8, borderLeft: "3px solid #2D6A4F" }}>
                  <div style={{ fontSize: "0.85rem", color: "#2D6A4F", fontWeight: 500, marginBottom: "0.3rem", fontStyle: "italic" }}>{item.moment}</div>
                  <div style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>{item.why}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {data.priority_focus && data.priority_focus.length > 0 && (
        <div style={sectionStyle}>
          <div style={{ ...labelStyle, color: "#854F0B" }}>Priority focus for next session</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {data.priority_focus.map(function(item, i) {
              return (
                <div key={i} style={{ padding: "0.75rem 1rem", background: "#FDF3E3", borderRadius: 8, borderLeft: "3px solid #854F0B" }}>
                  <div style={{ fontSize: "0.85rem", color: "#854F0B", fontWeight: 500, marginBottom: "0.3rem" }}>{item.area}</div>
                  <div style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>{item.suggestion}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {data.explore_further && data.explore_further.length > 0 && (
        <div style={sectionStyle}>
          <div style={{ ...labelStyle, color: "#185FA5" }}>Explore further</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {data.explore_further.map(function(item, i) {
              return (
                <div key={i} style={{ padding: "0.75rem 1rem", background: "#EBF0F8", borderRadius: 8, borderLeft: "3px solid #185FA5" }}>
                  <div style={{ fontSize: "0.85rem", color: "#185FA5", fontWeight: 500, marginBottom: "0.3rem" }}>{item.concept}</div>
                  <div style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>{item.reason}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {data.reflection_question && (
        <div style={sectionStyle}>
          <div style={{ ...labelStyle, color: "var(--color-text-tertiary)" }}>Reflection question</div>
          <div style={{ padding: "1rem 1.25rem", background: "var(--color-background-secondary)", borderRadius: 8, fontSize: "0.95rem", lineHeight: 1.7, color: "var(--color-text-primary)", fontStyle: "italic" }}>
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
      setSessions(function(prev) {
        return prev.map(function(s) { return s.id === selected.id ? { ...s, professor_note: noteText.trim() } : s; });
      });
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

  const cardStyle = { background: "var(--color-background-primary)", border: "1px solid var(--color-border-tertiary)", borderRadius: 12, padding: "1.25rem", marginBottom: "1rem" };

  if (!authed) {
    return (
      <div style={{ maxWidth: 400, margin: "4rem auto", padding: "0 1.5rem", fontFamily: "var(--font-sans)" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "1.8rem", fontWeight: 400, color: "var(--color-text-primary)" }}>Professor Access</h1>
          <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", marginTop: "0.5rem" }}>Enter your password to view all student sessions.</p>
        </div>
        <div style={cardStyle}>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "0.4rem" }}>Password</label>
            <input type="password" value={password} onChange={function(e) { setPassword(e.target.value); }} onKeyDown={function(e) { if (e.key === "Enter") login(); }}
              style={{ width: "100%", padding: "0.7rem 1rem", fontSize: "0.95rem", border: "1px solid var(--color-border-secondary)", borderRadius: 8, background: "var(--color-background-primary)", color: "var(--color-text-primary)", outline: "none", fontFamily: "inherit", boxSizing: "border-box" }}
              placeholder="Enter password" />
          </div>
          {error && <div style={{ fontSize: "0.85rem", color: "#D85A30", marginBottom: "0.75rem" }}>{error}</div>}
          <button onClick={login} disabled={loading}
            style={{ width: "100%", padding: "0.85rem", fontSize: "0.95rem", fontWeight: 500, background: "var(--color-text-primary)", color: "var(--color-background-primary)", border: "none", borderRadius: 8, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.6 : 1, fontFamily: "inherit" }}>
            {loading ? "Loading..." : "Access dashboard"}
          </button>
        </div>
      </div>
    );
  }

  if (selected) {
    return (
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "2rem 1.5rem 4rem", fontFamily: "var(--font-sans)" }}>
        <button onClick={function() { setSelected(null); setActiveTab("review"); setNoteText(""); }} style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", background: "none", border: "none", cursor: "pointer", padding: "0 0 1.5rem", fontFamily: "inherit" }}>
          ← Back to dashboard
        </button>

        <div style={cardStyle}>
          <div style={{ fontWeight: 500, fontSize: "1rem", color: "var(--color-text-primary)" }}>{selected.student_name}</div>
          <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)", marginTop: 4, display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            <span>{formatDate(selected.date)}</span>
            <span>·</span><span>{selected.modality}</span>
            <span>·</span><span>{SESSION_TYPE_LABELS[selected.session_type] || selected.session_type}</span>
            <span>·</span><span>{selected.mode === "solo" ? "Solo Practice" : "Group Supervision"}</span>
            {selected.duration_seconds > 0 && <><span>·</span><span>{formatDuration(selected.duration_seconds)}</span></>}
            {selected.issue && selected.issue !== "" && <><span>·</span><span>{selected.issue}</span></>}
          </div>
          {selected.intention && selected.intention !== "" && (
            <div style={{ marginTop: "0.5rem", fontSize: "0.82rem", color: "var(--color-text-secondary)", background: "#EBF0F8", padding: "0.4rem 0.75rem", borderRadius: 6 }}>
              Student intention: {selected.intention}
            </div>
          )}
        </div>

        <div style={{ display: "flex", border: "1px solid var(--color-border-secondary)", borderRadius: 8, overflow: "hidden", marginBottom: "1rem" }}>
          {["review","transcript","note"].map(function(tab) {
            return (
              <button key={tab} onClick={function() { setActiveTab(tab); }}
                style={{ flex: 1, padding: "0.75rem", fontSize: "0.875rem", fontFamily: "inherit", background: activeTab === tab ? "var(--color-text-primary)" : "var(--color-background-primary)", color: activeTab === tab ? "var(--color-background-primary)" : "var(--color-text-secondary)", border: "none", borderRight: tab !== "note" ? "1px solid var(--color-border-secondary)" : "none", cursor: "pointer", fontWeight: activeTab === tab ? 500 : 400, textTransform: "capitalize" }}>
                {tab === "note" ? "Add note" : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            );
          })}
        </div>

        {activeTab === "review" && (
          <div style={cardStyle}>
            {selected.professor_note && (
              <div style={{ marginBottom: "1.25rem", padding: "0.75rem 1rem", background: "#FDF3E3", borderRadius: 8, borderLeft: "3px solid #854F0B" }}>
                <div style={{ fontSize: "0.72rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em", color: "#854F0B", marginBottom: "0.25rem" }}>Your note</div>
                <div style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>{selected.professor_note}</div>
              </div>
            )}
            <ReviewRenderer text={selected.review} />
          </div>
        )}

        {activeTab === "transcript" && (
          <div style={cardStyle}>
            <div style={{ fontSize: "0.75rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--color-text-tertiary)", marginBottom: "0.75rem" }}>Transcript</div>
            <div style={{ fontSize: "0.875rem", lineHeight: 1.8, color: "var(--color-text-secondary)", whiteSpace: "pre-wrap" }}>{selected.transcript || "No transcript recorded."}</div>
          </div>
        )}

        {activeTab === "note" && (
          <div style={cardStyle}>
            <div style={{ fontSize: "0.75rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em", color: "#854F0B", marginBottom: "0.75rem" }}>Leave a note for {selected.student_name}</div>
            <textarea value={noteText} onChange={function(e) { setNoteText(e.target.value); }} placeholder="Write your feedback here — the student will see this when they open this session..."
              style={{ width: "100%", minHeight: 140, padding: "0.75rem 1rem", fontSize: "0.9rem", fontFamily: "inherit", border: "1px solid var(--color-border-secondary)", borderRadius: 8, background: "var(--color-background-primary)", color: "var(--color-text-primary)", outline: "none", resize: "vertical", boxSizing: "border-box", lineHeight: 1.7 }} />
            <div style={{ marginTop: "0.75rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <button onClick={saveNote} disabled={savingNote || !noteText.trim()}
                style={{ padding: "0.7rem 1.25rem", fontSize: "0.9rem", fontWeight: 500, fontFamily: "inherit", background: "#854F0B", color: "#fff", border: "none", borderRadius: 8, cursor: savingNote || !noteText.trim() ? "not-allowed" : "pointer", opacity: savingNote || !noteText.trim() ? 0.5 : 1 }}>
                {savingNote ? "Saving..." : "Save note"}
              </button>
              {noteSaved && <span style={{ fontSize: "0.85rem", color: "#2D6A4F" }}>Note saved — student will see this.</span>}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "2rem 1.5rem 4rem", fontFamily: "var(--font-sans)" }}>
      <div style={{ textAlign: "center", borderBottom: "1px solid var(--color-border-tertiary)", paddingBottom: "1.5rem", marginBottom: "1.5rem" }}>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", fontWeight: 400, color: "var(--color-text-primary)" }}>Professor Dashboard</h1>
        <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", marginTop: "0.4rem" }}>{sessions.length} sessions across {students.length} students</p>
      </div>

      <div style={{ marginBottom: "1.25rem" }}>
        <label style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "0.4rem" }}>Filter by student</label>
        <select value={filterStudent} onChange={function(e) { setFilterStudent(e.target.value); }}
          style={{ padding: "0.7rem 1rem", fontSize: "0.9rem", border: "1px solid var(--color-border-secondary)", borderRadius: 8, background: "var(--color-background-primary)", color: "var(--color-text-primary)", fontFamily: "inherit", outline: "none", minWidth: 220 }}>
          <option value="all">All students ({sessions.length})</option>
          {students.map(function(s) {
            const count = sessions.filter(function(x) { return x.student_name === s; }).length;
            return <option key={s} value={s}>{s} ({count})</option>;
          })}
        </select>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {filtered.length === 0 && <div style={{ fontSize: "0.875rem", color: "var(--color-text-tertiary)", fontStyle: "italic", padding: "1rem 0" }}>No sessions yet.</div>}
        {filtered.map(function(s) {
          return (
            <button key={s.id} onClick={function() { setSelected(s); setNoteText(s.professor_note || ""); setActiveTab("review"); }}
              style={{ textAlign: "left", background: "var(--color-background-primary)", border: "1px solid var(--color-border-tertiary)", borderRadius: 12, padding: "1rem 1.25rem", cursor: "pointer", fontFamily: "inherit", width: "100%" }}
              onMouseOver={function(e) { e.currentTarget.style.borderColor = "var(--color-border-secondary)"; }}
              onMouseOut={function(e) { e.currentTarget.style.borderColor = "var(--color-border-tertiary)"; }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontWeight: 500, fontSize: "0.95rem", color: "var(--color-text-primary)" }}>{s.student_name}</div>
                  <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)", marginTop: 3 }}>
                    {s.modality} · {SESSION_TYPE_LABELS[s.session_type] || s.session_type} · {s.mode === "solo" ? "Solo" : "Group"}
                    {s.duration_seconds > 0 ? " · " + formatDuration(s.duration_seconds) : ""}
                    {s.issue && s.issue !== "" ? " · " + s.issue : ""}
                  </div>
                  {s.intention && s.intention !== "" && <div style={{ fontSize: "0.78rem", color: "var(--color-text-tertiary)", marginTop: 2, fontStyle: "italic" }}>Focus: {s.intention}</div>}
                  {s.professor_note && <div style={{ fontSize: "0.78rem", color: "#854F0B", marginTop: 2 }}>Note added</div>}
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--color-text-tertiary)", whiteSpace: "nowrap", marginLeft: "1rem" }}>{formatDate(s.date)}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
