"use client";
import { useState, useEffect } from "react";
import { CASE_VIGNETTES, NOTE_FORMATS } from "./constants";

function Typing() {
  return <div className="typing"><div className="tdot" /><div className="tdot" /><div className="tdot" /></div>;
}

function NoteReview({ reviewText }) {
  if (!reviewText) return null;
  let data = null;
  try { data = JSON.parse(reviewText); } catch(e) {
    return <div style={{ fontSize: "0.9rem", lineHeight: 1.8, color: "var(--text)", whiteSpace: "pre-wrap" }}>{reviewText}</div>;
  }
  const gradeColor = data.grade === "Competent" ? "var(--green)" : data.grade === "Developing" ? "var(--accent2)" : "var(--red)";
  const gradeBg = data.grade === "Competent" ? "var(--green-light)" : data.grade === "Developing" ? "var(--accent2-light)" : "var(--red-light)";
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", flexWrap: "wrap" }}>
        <span style={{ display: "inline-block", padding: "3px 12px", borderRadius: 20, background: gradeBg, color: gradeColor, fontWeight: 600, fontSize: "0.82rem" }}>{data.grade}</span>
        <div style={{ fontSize: "0.9rem", color: "var(--text)", lineHeight: 1.7, flex: 1 }}>{data.overall}</div>
      </div>
      {data.strengths && data.strengths.length > 0 && (
        <div>
          <div style={{ fontSize: "0.72rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--green)", marginBottom: "0.5rem" }}>Strengths</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            {data.strengths.map(function(s, i) {
              return <div key={i} style={{ padding: "0.6rem 0.9rem", background: "var(--green-light)", borderRadius: "var(--radius-sm)", borderLeft: "3px solid var(--green)", fontSize: "0.85rem", color: "var(--text)", lineHeight: 1.6 }}>{s}</div>;
            })}
          </div>
        </div>
      )}
      {data.issues && data.issues.length > 0 && (
        <div>
          <div style={{ fontSize: "0.72rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--red)", marginBottom: "0.5rem" }}>Issues to address</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {data.issues.map(function(issue, i) {
              return (
                <div key={i} style={{ padding: "0.75rem 1rem", background: "var(--red-light)", borderRadius: "var(--radius-sm)", borderLeft: "3px solid var(--red)" }}>
                  <div style={{ fontWeight: 600, fontSize: "0.82rem", color: "var(--red)", marginBottom: "0.25rem" }}>{issue.section}</div>
                  <div style={{ fontSize: "0.85rem", color: "var(--text)", marginBottom: "0.25rem" }}>{issue.problem}</div>
                  {issue.example && <div style={{ fontSize: "0.8rem", color: "var(--text2)", fontStyle: "italic", marginBottom: "0.25rem" }}>From your note: "{issue.example}"</div>}
                  {issue.fix && <div style={{ fontSize: "0.82rem", color: "var(--text2)", marginTop: "0.25rem" }}>Fix: {issue.fix}</div>}
                </div>
              );
            })}
          </div>
        </div>
      )}
      {data.missing && data.missing.length > 0 && (
        <div>
          <div style={{ fontSize: "0.72rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--accent2)", marginBottom: "0.5rem" }}>Missing elements</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
            {data.missing.map(function(m, i) {
              return <span key={i} style={{ padding: "3px 10px", background: "var(--accent2-light)", borderRadius: 20, fontSize: "0.78rem", color: "var(--accent2)", fontWeight: 500 }}>{m}</span>;
            })}
          </div>
        </div>
      )}
      {data.revised_example && (
        <div>
          <div style={{ fontSize: "0.72rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--blue)", marginBottom: "0.5rem" }}>How it could look</div>
          <div style={{ padding: "0.75rem 1rem", background: "var(--blue-light)", borderRadius: "var(--radius-sm)", borderLeft: "3px solid var(--blue)", fontSize: "0.85rem", color: "var(--text)", lineHeight: 1.7 }}>{data.revised_example}</div>
        </div>
      )}
    </div>
  );
}

const STORAGE_KEY = "notesPracticeAttempts";
function loadAttempts() {
  try { const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) : []; } catch(e) { return []; }
}
function saveAttempts(attempts) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(attempts)); } catch(e) {}
}


export default function NotesPractice({ studentSessions, studentName }) {
  const [attempts, setAttempts] = useState([]);
  const [activeAttemptId, setActiveAttemptId] = useState(null);
  const [source, setSource] = useState("random");
  const [format, setFormat] = useState("SOAP");
  const [caseContext, setCaseContext] = useState("");
  const [noteText, setNoteText] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [view, setView] = useState("list");

  useEffect(function() {
    const saved = loadAttempts();
    setAttempts(saved.filter(function(a) { return a.studentName === studentName; }));
  }, [studentName]);

  function createNewAttempt() {
    setCaseContext(""); setNoteText(""); setReviewText("");
    setSelectedSession(null); setActiveAttemptId(null);
    setView("editor");
  }

  function openAttempt(attempt) {
    setActiveAttemptId(attempt.id);
    setFormat(attempt.format);
    setCaseContext(attempt.caseContext);
    setNoteText(attempt.noteText);
    setReviewText(attempt.reviewText || "");
    setView("editor");
  }

  function persistAttempt(updates) {
    const all = loadAttempts();
    const id = activeAttemptId || ("note_" + Date.now());
    if (!activeAttemptId) setActiveAttemptId(id);
    const existing = all.find(function(a) { return a.id === id; });
    const updated = {
      id, studentName,
      format: updates.format !== undefined ? updates.format : format,
      caseContext: updates.caseContext !== undefined ? updates.caseContext : caseContext,
      noteText: updates.noteText !== undefined ? updates.noteText : noteText,
      reviewText: updates.reviewText !== undefined ? updates.reviewText : reviewText,
      grade: updates.grade || (existing && existing.grade) || null,
      caseName: updates.caseName || (existing && existing.caseName) || "Untitled case",
      updatedAt: new Date().toISOString(),
      createdAt: (existing && existing.createdAt) || new Date().toISOString(),
    };
    const newAll = existing
      ? all.map(function(a) { return a.id === id ? updated : a; })
      : [updated, ...all];
    saveAttempts(newAll);
    setAttempts(newAll.filter(function(a) { return a.studentName === studentName; }));
    return id;
  }

  function generateRandomCase() {
    const v = CASE_VIGNETTES[Math.floor(Math.random() * CASE_VIGNETTES.length)];
    const ctx = "Client session summary:\n\n" + v.session_detail + "\n\nPresenting concern: " + v.presenting + "\n\nThis was a 50-minute session. Write a " + format + " progress note based on the above information.";
    setCaseContext(ctx); setNoteText(""); setReviewText("");
    persistAttempt({ caseContext: ctx, noteText: "", reviewText: "", caseName: v.presenting + " — " + v.vignette.split(",")[0] });
  }

  function loadSession(session) {
    setSelectedSession(session);
    const ctx = "Session transcript:\n" + session.transcript + "\n\nModality: " + session.modality + "\nSession type: " + session.session_type;
    setCaseContext(ctx); setNoteText(""); setReviewText("");
    persistAttempt({ caseContext: ctx, noteText: "", reviewText: "", caseName: session.modality + " session" });
  }

  function handleNoteChange(val) {
    setNoteText(val);
    persistAttempt({ noteText: val });
  }

  function handleFormatChange(val) {
    setFormat(val);
    persistAttempt({ format: val });
  }

  async function submitNote() {
    if (!noteText.trim()) { alert("Please write your note first."); return; }
    setLoading(true); setReviewText("");
    try {
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ noteText, format, caseContext }),
      });
      const data = await res.json();
      const text = data.text || "";
      setReviewText(text);
      let grade = null;
      try { grade = JSON.parse(text).grade; } catch(e) {}
      persistAttempt({ reviewText: text, grade });
    } catch(e) { setReviewText("Connection issue — please try again."); }
    setLoading(false);
  }

  function deleteAttempt(id, e) {
    e.stopPropagation();
    if (!window.confirm("Delete this note attempt?")) return;
    const all = loadAttempts().filter(function(a) { return a.id !== id; });
    saveAttempts(all);
    setAttempts(all.filter(function(a) { return a.studentName === studentName; }));
  }

  // ── LIST VIEW ─────────────────────────────────────────────
  if (view === "list") {
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <div style={{ fontSize: "0.9rem", color: "var(--text2)" }}>
            {attempts.length === 0 ? "No note attempts yet." : attempts.length + " saved attempt" + (attempts.length !== 1 ? "s" : "")}
          </div>
          <button className="btn btn-sm primary" onClick={createNewAttempt}>+ New note</button>
        </div>
        {attempts.length === 0 && (
          <div className="card" style={{ textAlign: "center", padding: "2rem" }}>
            <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>📝</div>
            <div style={{ fontWeight: 500, marginBottom: "0.5rem" }}>Start your first note</div>
            <div style={{ fontSize: "0.85rem", color: "var(--text2)", marginBottom: "1.25rem", lineHeight: 1.6 }}>Choose a case, write your note, and get detailed feedback. Your progress is saved automatically.</div>
            <button className="btn primary" onClick={createNewAttempt}>Begin</button>
          </div>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          {attempts.map(function(a) {
            const gradeColors = { "Competent": "var(--green)", "Developing": "var(--accent2)", "Needs Revision": "var(--red)" };
            const color = a.grade ? gradeColors[a.grade] : "var(--text3)";
            return (
              <button key={a.id} onClick={function() { openAttempt(a); }}
                className="card"
                style={{ textAlign: "left", cursor: "pointer", fontFamily: "inherit", borderLeft: "3px solid " + (a.grade ? gradeColors[a.grade] : "var(--border2)"), display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 500, fontSize: "0.9rem", color: "var(--text)", marginBottom: "0.2rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.caseName || "Untitled"}</div>
                  <div style={{ fontSize: "0.78rem", color: "var(--text2)" }}>
                    {a.format}
                    {a.grade && <span style={{ color: color, fontWeight: 500 }}> · {a.grade}</span>}
                    <span style={{ color: "var(--text3)" }}> · {new Date(a.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0 }}>
                  {!a.reviewText && <span style={{ fontSize: "0.72rem", color: "var(--text3)", background: "var(--surface2)", padding: "2px 8px", borderRadius: 20 }}>Draft</span>}
                  {a.reviewText && <span style={{ fontSize: "0.72rem", color: color, padding: "2px 8px", borderRadius: 20, background: "var(--surface2)" }}>Reviewed</span>}
                  <button onClick={function(e) { deleteAttempt(a.id, e); }}
                    style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text3)", fontSize: "0.85rem", padding: "2px 6px" }}>✕</button>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // ── EDITOR VIEW — two column layout ──────────────────────
  return (
    <div>
      <button onClick={function() { setView("list"); }} style={{ fontSize: "0.85rem", color: "var(--text2)", background: "none", border: "none", cursor: "pointer", padding: "0 0 1rem", fontFamily: "inherit" }}>
        ← Back to my notes
      </button>

      {/* Format picker row */}
      <div className="card" style={{ marginBottom: "1rem" }}>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
          {Object.keys(NOTE_FORMATS).map(function(f) {
            const isActive = format === f;
            const colors = { SOAP: "#185FA5", DAP: "#2D6A4F", TARP: "#854F0B", BIRP: "#2D6A6A" };
            const c = colors[f] || "var(--accent)";
            return (
              <button key={f} onClick={function() { handleFormatChange(f); }}
                style={{
                  padding: "0.5rem 1.25rem", borderRadius: "var(--radius-sm)", fontFamily: "inherit",
                  fontWeight: isActive ? 700 : 500, fontSize: "0.9rem", cursor: "pointer",
                  border: isActive ? "2px solid " + c : "1px solid var(--border)",
                  background: isActive ? c : "var(--surface2)",
                  color: isActive ? "#fff" : "var(--text2)",
                  transition: "all 0.15s",
                }}>
                {f}
              </button>
            );
          })}
        </div>

        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <div className="field" style={{ flex: 1, minWidth: 160, marginBottom: 0 }}>
            <label>Case source</label>
            <select value={source} onChange={function(e) { setSource(e.target.value); setCaseContext(""); setReviewText(""); }}>
              <option value="random">Random case vignette</option>
              {studentSessions && studentSessions.length > 0 && <option value="session">From my past sessions</option>}
            </select>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", paddingBottom: "0" }}>
            {source === "random" && (
              <button className="btn btn-sm primary" onClick={generateRandomCase}>{caseContext ? "New case" : "Generate case"}</button>
            )}
          </div>
        </div>

        {source === "session" && studentSessions && (
          <div style={{ marginTop: "0.75rem" }}>
            <div style={{ fontSize: "0.82rem", color: "var(--text2)", marginBottom: "0.5rem" }}>Select a past session:</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", maxHeight: 160, overflowY: "auto" }}>
              {studentSessions.map(function(s) {
                return (
                  <button key={s.id} onClick={function() { loadSession(s); }}
                    style={{ textAlign: "left", padding: "0.6rem 0.9rem", borderRadius: "var(--radius-sm)", border: "1px solid " + (selectedSession && selectedSession.id === s.id ? "var(--accent)" : "var(--border)"), background: selectedSession && selectedSession.id === s.id ? "var(--accent-light)" : "var(--surface2)", cursor: "pointer", fontFamily: "inherit", fontSize: "0.82rem", color: "var(--text)" }}>
                    {s.modality} · {s.session_type} · {new Date(s.date).toLocaleDateString()}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Three column layout */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", alignItems: "start" }}>

        {/* LEFT: writing area */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {caseContext && (
            <div className="card">
              <div style={{ fontSize: "0.72rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text3)", marginBottom: "0.5rem" }}>Case context</div>
              <div style={{ fontSize: "0.82rem", color: "var(--text2)", lineHeight: 1.7, whiteSpace: "pre-wrap", maxHeight: 200, overflowY: "auto" }}>{caseContext}</div>
            </div>
          )}
          <div className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
              <div style={{ fontSize: "0.72rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text3)" }}>Your {format} note</div>
              <div style={{ fontSize: "0.7rem", color: "var(--text3)" }}>Auto-saved</div>
            </div>
            <div style={{ fontSize: "0.75rem", color: "var(--text3)", marginBottom: "0.5rem" }}>Sections: {NOTE_FORMATS[format] && NOTE_FORMATS[format].sections.join(" → ")}</div>
            <textarea
              value={noteText}
              onChange={function(e) { handleNoteChange(e.target.value); }}
              placeholder={"Write your " + format + " note here following the template on the right."}
              style={{ minHeight: 360, resize: "vertical", lineHeight: 1.7, fontSize: "0.88rem" }}
            />
            <button className="btn primary" onClick={submitNote} disabled={loading || !caseContext} style={{ marginTop: "0.75rem" }}>
              {loading ? "Reviewing..." : "Submit for review"}
            </button>
          </div>
          {loading && (
            <div className="card">
              <div className="response-label sup">Reviewing your note...</div>
              <Typing />
            </div>
          )}
          {reviewText && !loading && (
            <div className="card">
              <div className="response-label sup" style={{ marginBottom: "1rem" }}>Note Review</div>
              <NoteReview reviewText={reviewText} />
              <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}>
                <button className="btn btn-sm primary" onClick={createNewAttempt}>New note</button>
                <button className="btn btn-sm" onClick={function() { setView("list"); }}>My notes</button>
              </div>
            </div>
          )}
        </div>

        {/* MIDDLE: what goes in each section */}
        <div style={{ position: "sticky", top: "1rem" }}>
          {(function() {
            const info = NOTE_FORMATS[format];
            const colors = { SOAP: "#185FA5", DAP: "#2D6A4F", TARP: "#854F0B", BIRP: "#2D6A6A" };
            const lights = { SOAP: "var(--blue-light)", DAP: "var(--green-light)", TARP: "var(--accent2-light)", BIRP: "var(--accent-light)" };
            const color = colors[format] || "var(--accent)";
            const light = lights[format] || "var(--accent-light)";
            return (
              <div className="card">
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.85rem" }}>
                  <div style={{ padding: "3px 12px", borderRadius: 20, background: light, color: color, fontWeight: 700, fontSize: "0.9rem" }}>{format}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text3)" }}>section guide</div>
                </div>
                <div style={{ fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", color: color, marginBottom: "0.6rem" }}>What goes in each section</div>
                <div style={{ padding: "0.85rem", background: light, borderRadius: "var(--radius-sm)", borderLeft: "3px solid " + color }}>
                  <div style={{ fontSize: "0.78rem", color: "var(--text)", lineHeight: 1.85, whiteSpace: "pre-wrap" }}>{info && info.guidance}</div>
                </div>
              </div>
            );
          })()}
        </div>

        {/* RIGHT: full template structure */}
        <div style={{ position: "sticky", top: "1rem" }}>
          {(function() {
            const info = NOTE_FORMATS[format];
            return (
              <div className="card">
                <div style={{ fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--text3)", marginBottom: "0.6rem" }}>Template structure</div>
                <div style={{ padding: "0.85rem", background: "var(--surface2)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)" }}>
                  <div style={{ fontSize: "0.76rem", color: "var(--text2)", lineHeight: 1.85, whiteSpace: "pre-wrap", fontFamily: "monospace" }}>{info && info.template}</div>
                </div>
              </div>
            );
          })()}
        </div>

      </div>
    </div>
  );
}
