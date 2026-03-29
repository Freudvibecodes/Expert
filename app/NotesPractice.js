"use client";
import { useState } from "react";
import { CASE_VIGNETTES, NOTE_FORMATS, NOTE_REQUIREMENTS } from "./constants";

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
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <span style={{ display: "inline-block", padding: "4px 14px", borderRadius: 20, background: gradeBg, color: gradeColor, fontWeight: 600, fontSize: "0.85rem" }}>{data.grade}</span>
        <div style={{ fontSize: "0.9rem", color: "var(--text)", lineHeight: 1.7 }}>{data.overall}</div>
      </div>

      {data.strengths && data.strengths.length > 0 && (
        <div>
          <div style={{ fontSize: "0.72rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--green)", marginBottom: "0.5rem" }}>Strengths</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            {data.strengths.map((s, i) => (
              <div key={i} style={{ padding: "0.6rem 0.9rem", background: "var(--green-light)", borderRadius: "var(--radius-sm)", borderLeft: "3px solid var(--green)", fontSize: "0.85rem", color: "var(--text)", lineHeight: 1.6 }}>{s}</div>
            ))}
          </div>
        </div>
      )}

      {data.issues && data.issues.length > 0 && (
        <div>
          <div style={{ fontSize: "0.72rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--red)", marginBottom: "0.5rem" }}>Issues to address</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {data.issues.map((issue, i) => (
              <div key={i} style={{ padding: "0.75rem 1rem", background: "var(--red-light)", borderRadius: "var(--radius-sm)", borderLeft: "3px solid var(--red)" }}>
                <div style={{ fontWeight: 600, fontSize: "0.82rem", color: "var(--red)", marginBottom: "0.25rem" }}>{issue.section}</div>
                <div style={{ fontSize: "0.85rem", color: "var(--text)", marginBottom: "0.25rem" }}>{issue.problem}</div>
                {issue.example && <div style={{ fontSize: "0.8rem", color: "var(--text2)", fontStyle: "italic", marginBottom: "0.25rem" }}>From your note: "{issue.example}"</div>}
                {issue.fix && <div style={{ fontSize: "0.82rem", color: "var(--text2)", marginTop: "0.25rem" }}>Fix: {issue.fix}</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {data.missing && data.missing.length > 0 && (
        <div>
          <div style={{ fontSize: "0.72rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--accent2)", marginBottom: "0.5rem" }}>Missing elements</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
            {data.missing.map((m, i) => (
              <span key={i} style={{ padding: "3px 10px", background: "var(--accent2-light)", borderRadius: 20, fontSize: "0.78rem", color: "var(--accent2)", fontWeight: 500 }}>{m}</span>
            ))}
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

export default function NotesPractice({ studentSessions }) {
  const [source, setSource] = useState("random"); // random | session
  const [format, setFormat] = useState("SOAP");
  const [caseContext, setCaseContext] = useState("");
  const [noteText, setNoteText] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);

  function generateRandomCase() {
    const v = CASE_VIGNETTES[Math.floor(Math.random() * CASE_VIGNETTES.length)];
    setCaseContext(`Client vignette: ${v.vignette}\n\nPresenting concern: ${v.presenting}\n\nImagine this was a 50-minute intake session. The client shared the above and you used ${format} approaches to begin building rapport and gathering information.`);
    setNoteText("");
    setReviewText("");
  }

  function loadSession(session) {
    setSelectedSession(session);
    setCaseContext(`Session transcript:\n${session.transcript}\n\nModality: ${session.modality}\nSession type: ${session.session_type}`);
    setNoteText("");
    setReviewText("");
  }

  async function submitNote() {
    if (!noteText.trim()) { alert("Please write your note first."); return; }
    setLoading(true);
    setReviewText("");
    try {
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ noteText, format, caseContext }),
      });
      const data = await res.json();
      setReviewText(data.text || "");
    } catch(e) { setReviewText("Connection issue — please try again."); }
    setLoading(false);
  }

  const formatInfo = NOTE_FORMATS[format];

  return (
    <div>
      <div style={{ fontSize: "0.9rem", color: "var(--text2)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
        Practice writing clinical progress notes. Choose a format, get a case, write your note, and receive structured feedback.
      </div>

      <div className="card">
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "1rem" }}>
          <div className="field" style={{ flex: 1, minWidth: 180, marginBottom: 0 }}>
            <label>Note format</label>
            <select value={format} onChange={e => { setFormat(e.target.value); setReviewText(""); }}>
              {Object.keys(NOTE_FORMATS).map(f => <option key={f}>{f}</option>)}
            </select>
          </div>
          <div className="field" style={{ flex: 1, minWidth: 180, marginBottom: 0 }}>
            <label>Case source</label>
            <select value={source} onChange={e => { setSource(e.target.value); setCaseContext(""); setReviewText(""); }}>
              <option value="random">Random case vignette</option>
              {studentSessions && studentSessions.length > 0 && <option value="session">From my past sessions</option>}
            </select>
          </div>
        </div>

        <button className="btn btn-sm" onClick={() => setShowGuide(!showGuide)} style={{ marginBottom: "0.75rem" }}>
          {showGuide ? "Hide" : "Show"} {format} format guide
        </button>

        {showGuide && formatInfo && (
          <div style={{ padding: "0.75rem 1rem", background: "var(--blue-light)", borderRadius: "var(--radius-sm)", borderLeft: "3px solid var(--blue)", fontSize: "0.82rem", color: "var(--text)", lineHeight: 1.7, marginBottom: "0.75rem", whiteSpace: "pre-wrap" }}>
            {formatInfo.guidance}
          </div>
        )}

        {source === "random" && (
          <button className="btn primary" onClick={generateRandomCase}>Generate case</button>
        )}

        {source === "session" && studentSessions && (
          <div>
            <div style={{ fontSize: "0.82rem", color: "var(--text2)", marginBottom: "0.5rem" }}>Select a past session:</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", maxHeight: 180, overflowY: "auto" }}>
              {studentSessions.map(s => (
                <button key={s.id} onClick={() => loadSession(s)}
                  style={{ textAlign: "left", padding: "0.6rem 0.9rem", borderRadius: "var(--radius-sm)", border: "1px solid " + (selectedSession?.id === s.id ? "var(--accent)" : "var(--border)"), background: selectedSession?.id === s.id ? "var(--accent-light)" : "var(--surface2)", cursor: "pointer", fontFamily: "inherit", fontSize: "0.82rem", color: "var(--text)" }}>
                  {s.modality} · {s.session_type} · {new Date(s.date).toLocaleDateString()}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {caseContext && (
        <div className="card">
          <div style={{ fontSize: "0.72rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text3)", marginBottom: "0.5rem" }}>Case context</div>
          <div style={{ fontSize: "0.875rem", color: "var(--text2)", lineHeight: 1.7, whiteSpace: "pre-wrap", maxHeight: 200, overflowY: "auto" }}>{caseContext}</div>
        </div>
      )}

      {caseContext && (
        <div className="card">
          <div style={{ fontSize: "0.72rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text3)", marginBottom: "0.5rem" }}>
            Your {format} note
          </div>
          <div style={{ fontSize: "0.78rem", color: "var(--text3)", marginBottom: "0.5rem" }}>
            Sections: {formatInfo?.sections.join(" → ")}
          </div>
          <textarea
            value={noteText}
            onChange={e => setNoteText(e.target.value)}
            placeholder={`Write your ${format} note here. Include all required sections: ${formatInfo?.sections.join(", ")}.`}
            style={{ minHeight: 280, resize: "vertical", lineHeight: 1.7, fontSize: "0.9rem" }}
          />
          <button className="btn primary" onClick={submitNote} disabled={loading} style={{ marginTop: "0.75rem" }}>
            {loading ? "Reviewing..." : "Submit for review"}
          </button>
        </div>
      )}

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
          <button className="btn btn-sm" onClick={() => { setNoteText(""); setReviewText(""); }} style={{ marginTop: "1rem" }}>Write another note</button>
        </div>
      )}
    </div>
  );
}
