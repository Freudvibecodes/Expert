"use client";
import { useState, useEffect } from "react";

export default function ProfessorPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);
  const [filterStudent, setFilterStudent] = useState("all");

  async function login() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/sessions?all=true&password=${encodeURIComponent(password)}`);
      if (!res.ok) { setError("Incorrect password."); setLoading(false); return; }
      const data = await res.json();
      setSessions(data);
      setAuthed(true);
    } catch(e) {
      setError("Connection issue — please try again.");
    }
    setLoading(false);
  }

  const students = [...new Set(sessions.map(function(s) { return s.student_name; }))].sort();
  const filtered = filterStudent === "all" ? sessions : sessions.filter(function(s) { return s.student_name === filterStudent; });

  function formatDate(d) {
    return new Date(d).toLocaleDateString("en-CA", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
  }

  const SESSION_TYPE_LABELS = {
    intake: "Intake", early: "Early", mid: "Mid-therapy", closing: "Closing", crisis: "Crisis",
  };

  if (!authed) {
    return (
      <div style={{ maxWidth: 400, margin: "4rem auto", padding: "0 1.5rem", fontFamily: "var(--font-sans)" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "1.8rem", fontWeight: 400 }}>Professor Access</h1>
          <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", marginTop: "0.5rem" }}>Enter your password to view all student sessions.</p>
        </div>
        <div style={{ background: "var(--color-background-primary)", border: "1px solid var(--color-border-tertiary)", borderRadius: 12, padding: "1.5rem" }}>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "0.4rem" }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={function(e) { setPassword(e.target.value); }}
              onKeyDown={function(e) { if (e.key === "Enter") login(); }}
              style={{ width: "100%", padding: "0.7rem 1rem", fontSize: "0.95rem", border: "1px solid var(--color-border-secondary)", borderRadius: 8, background: "var(--color-background-primary)", color: "var(--color-text-primary)", outline: "none", fontFamily: "inherit" }}
              placeholder="Enter password"
            />
          </div>
          {error && <div style={{ fontSize: "0.85rem", color: "#D85A30", marginBottom: "0.75rem" }}>{error}</div>}
          <button
            onClick={login}
            disabled={loading}
            style={{ width: "100%", padding: "0.85rem", fontSize: "0.95rem", fontWeight: 500, background: "var(--color-text-primary)", color: "var(--color-background-primary)", border: "none", borderRadius: 8, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.6 : 1, fontFamily: "inherit" }}
          >
            {loading ? "Loading..." : "Access dashboard"}
          </button>
        </div>
      </div>
    );
  }

  if (selected) {
    return (
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "2rem 1.5rem 4rem", fontFamily: "var(--font-sans)" }}>
        <button onClick={function() { setSelected(null); }} style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", background: "none", border: "none", cursor: "pointer", padding: "0 0 1.5rem", fontFamily: "inherit" }}>
          Back to dashboard
        </button>
        <div style={{ background: "var(--color-background-primary)", border: "1px solid var(--color-border-tertiary)", borderRadius: 12, padding: "1.25rem", marginBottom: "1rem" }}>
          <div style={{ fontWeight: 500, fontSize: "1rem" }}>{selected.student_name}</div>
          <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)", marginTop: 4 }}>
            {formatDate(selected.date)} · {selected.modality} · {SESSION_TYPE_LABELS[selected.session_type] || selected.session_type} · {selected.mode === "solo" ? "Solo Practice" : "Group Supervision"}
          </div>
        </div>

        {selected.transcript && (
          <div style={{ background: "var(--color-background-primary)", border: "1px solid var(--color-border-tertiary)", borderRadius: 12, padding: "1.25rem", marginBottom: "1rem" }}>
            <div style={{ fontSize: "0.75rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--color-text-tertiary)", marginBottom: "0.75rem" }}>Transcript</div>
            <div style={{ fontSize: "0.875rem", lineHeight: 1.8, color: "var(--color-text-secondary)", whiteSpace: "pre-wrap" }}>{selected.transcript}</div>
          </div>
        )}

        {selected.review && (
          <div style={{ background: "var(--color-background-primary)", border: "1px solid var(--color-border-tertiary)", borderRadius: 12, padding: "1.25rem" }}>
            <div style={{ fontSize: "0.75rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em", color: "#185FA5", marginBottom: "0.75rem" }}>Clinical Review</div>
            <div style={{ fontSize: "0.875rem", lineHeight: 1.9, color: "var(--color-text-primary)", whiteSpace: "pre-wrap" }}>{selected.review}</div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "2rem 1.5rem 4rem", fontFamily: "var(--font-sans)" }}>
      <div style={{ textAlign: "center", borderBottom: "1px solid var(--color-border-tertiary)", paddingBottom: "1.5rem", marginBottom: "1.5rem" }}>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", fontWeight: 400 }}>Professor Dashboard</h1>
        <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", marginTop: "0.4rem" }}>{sessions.length} sessions across {students.length} students</p>
      </div>

      <div style={{ marginBottom: "1.25rem" }}>
        <label style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "0.4rem" }}>Filter by student</label>
        <select value={filterStudent} onChange={function(e) { setFilterStudent(e.target.value); }} style={{ padding: "0.7rem 1rem", fontSize: "0.9rem", border: "1px solid var(--color-border-secondary)", borderRadius: 8, background: "var(--color-background-primary)", color: "var(--color-text-primary)", fontFamily: "inherit", outline: "none", minWidth: 200 }}>
          <option value="all">All students ({sessions.length})</option>
          {students.map(function(s) {
            const count = sessions.filter(function(x) { return x.student_name === s; }).length;
            return <option key={s} value={s}>{s} ({count})</option>;
          })}
        </select>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {filtered.length === 0 && (
          <div style={{ fontSize: "0.875rem", color: "var(--color-text-tertiary)", fontStyle: "italic", padding: "1rem 0" }}>No sessions yet.</div>
        )}
        {filtered.map(function(s) {
          return (
            <button key={s.id} onClick={function() { setSelected(s); }} style={{ textAlign: "left", background: "var(--color-background-primary)", border: "1px solid var(--color-border-tertiary)", borderRadius: 12, padding: "1rem 1.25rem", cursor: "pointer", fontFamily: "inherit", transition: "border-color 0.15s" }}
              onMouseOver={function(e) { e.currentTarget.style.borderColor = "var(--color-border-secondary)"; }}
              onMouseOut={function(e) { e.currentTarget.style.borderColor = "var(--color-border-tertiary)"; }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontWeight: 500, fontSize: "0.95rem", color: "var(--color-text-primary)" }}>{s.student_name}</div>
                  <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)", marginTop: 3 }}>
                    {s.modality} · {SESSION_TYPE_LABELS[s.session_type] || s.session_type} · {s.mode === "solo" ? "Solo" : "Group"}
                    {s.issue && s.issue !== "" && ` · ${s.issue}`}
                  </div>
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--color-text-tertiary)", whiteSpace: "nowrap", marginLeft: "1rem" }}>{formatDate(s.date)}</div>
              </div>
              {s.review && <div style={{ fontSize: "0.78rem", color: "var(--color-text-tertiary)", marginTop: "0.5rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.review.substring(0, 120)}...</div>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
