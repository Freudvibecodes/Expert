"use client";
import { useState } from "react";
import { TRAINING_ARENA_MODES, CASE_VIGNETTES, MAINTAINING_MECHANISMS } from "./constants";

async function callArena(mode, userInput, context) {
  const res = await fetch("/api/arena", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mode, userInput, context }),
  });
  const data = await res.json();
  return data.text || "";
}

function Typing() {
  return <div className="typing"><div className="tdot" /><div className="tdot" /><div className="tdot" /></div>;
}

// ── CASE CONCEPTUALISATION ────────────────────────────────────
function CaseConceptualisation() {
  const [vignette, setVignette] = useState(null);
  const [presentingAnswer, setPresentingAnswer] = useState("");
  const [mechanismAnswer, setMechanismAnswer] = useState("");
  const [conversation, setConversation] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [phase, setPhase] = useState("presenting"); // presenting | mechanisms | discussion

  function pickVignette() {
    const v = CASE_VIGNETTES[Math.floor(Math.random() * CASE_VIGNETTES.length)];
    setVignette(v);
    setConversation([]);
    setPresentingAnswer("");
    setMechanismAnswer("");
    setPhase("presenting");
    setInput("");
  }

  async function submitPresenting() {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput("");
    setPresentingAnswer(userMsg);
    setConversation([{ role: "user", text: userMsg }]);
    setLoading(true);
    const prompt = `Vignette: "${vignette.vignette}"\n\nStudent's answer for presenting concern: "${userMsg}"\n\nCorrect answer: ${vignette.presenting}\n\nEvaluate their answer. If correct or close, confirm and then ask them to now identify the probable maintaining mechanisms. If incorrect or incomplete, guide them with a Socratic question.`;
    const reply = await callArena("case_conceptualisation", prompt, "");
    setConversation(prev => [...prev, { role: "supervisor", text: reply }]);
    setLoading(false);
    setPhase("mechanisms");
  }

  async function submitMessage() {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    const newConv = [...conversation, { role: "user", text: userMsg }];
    setConversation(newConv);
    setLoading(true);
    const history = newConv.map(m => (m.role === "user" ? "Student: " : "Supervisor: ") + m.text).join("\n\n");
    const correctMechanisms = vignette.mechanisms.join(", ");
    const prompt = `Vignette: "${vignette.vignette}"\n\nCorrect maintaining mechanisms: ${correctMechanisms}\n\nExplanation: ${vignette.explanation}\n\nConversation so far:\n${history}\n\nContinue the supervision conversation. If the student has now identified the key mechanisms, affirm and explain the clinical reasoning. If they are still missing some, guide them further.`;
    const reply = await callArena("case_conceptualisation", prompt, "");
    setConversation(prev => [...prev, { role: "supervisor", text: reply }]);
    setLoading(false);
  }

  if (!vignette) {
    return (
      <div>
        <div style={{ fontSize: "0.9rem", color: "var(--text2)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
          You will be given a client vignette. First identify the presenting concern, then identify the probable maintaining mechanisms — the psychological processes keeping the problem going.
        </div>
        <button className="btn primary" onClick={pickVignette}>Get a case vignette</button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ padding: "1rem 1.25rem", background: "var(--surface2)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", marginBottom: "1rem", fontSize: "0.9rem", lineHeight: 1.8, color: "var(--text)" }}>
        <div style={{ fontSize: "0.72rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text3)", marginBottom: "0.5rem" }}>Client Vignette</div>
        {vignette.vignette}
      </div>

      {phase === "presenting" && (
        <div>
          <div style={{ fontSize: "0.85rem", color: "var(--text2)", marginBottom: "0.75rem" }}>What is the likely <strong>presenting concern</strong>?</div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter") submitPresenting(); }} placeholder="e.g. Depression, Anxiety, Burnout..." style={{ flex: 1 }} />
            <button className="btn btn-sm primary" onClick={submitPresenting} style={{ whiteSpace: "nowrap" }}>Submit</button>
          </div>
        </div>
      )}

      {conversation.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", margin: "1rem 0" }}>
          {conversation.map((m, i) => (
            <div key={i} style={{ padding: "0.75rem 1rem", borderRadius: "var(--radius-sm)", background: m.role === "user" ? "var(--surface2)" : "var(--accent-light)", border: "1px solid var(--border)", fontSize: "0.875rem", lineHeight: 1.7, color: "var(--text)" }}>
              <div style={{ fontSize: "0.72rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: m.role === "user" ? "var(--text3)" : "var(--accent)", marginBottom: "0.3rem" }}>
                {m.role === "user" ? "You" : "Supervisor"}
              </div>
              {m.text}
            </div>
          ))}
          {loading && <div style={{ padding: "0.75rem 1rem", borderRadius: "var(--radius-sm)", background: "var(--accent-light)", border: "1px solid var(--border)" }}><Typing /></div>}
        </div>
      )}

      {phase === "mechanisms" && !loading && (
        <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
          <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter") submitMessage(); }} placeholder="Name the maintaining mechanisms..." style={{ flex: 1 }} />
          <button className="btn btn-sm primary" onClick={submitMessage} style={{ whiteSpace: "nowrap" }}>Send</button>
        </div>
      )}

      <button className="btn btn-sm" onClick={pickVignette} style={{ marginTop: "1rem" }}>New vignette</button>
    </div>
  );
}

// ── GENERIC ARENA MODE ────────────────────────────────────────
function GenericArenaMode({ modeId, modeName, placeholder, contextPrompt }) {
  const [conversation, setConversation] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const [prompt, setPrompt] = useState("");

  async function start() {
    setStarted(true);
    setLoading(true);
    setConversation([]);
    const reply = await callArena(modeId, "Please give me a practice scenario or prompt to work with.", contextPrompt || "");
    setConversation([{ role: "supervisor", text: reply }]);
    setLoading(false);
  }

  async function send() {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    const newConv = [...conversation, { role: "user", text: userMsg }];
    setConversation(newConv);
    setLoading(true);
    const history = newConv.map(m => (m.role === "user" ? "Student: " : "Supervisor: ") + m.text).join("\n\n");
    const reply = await callArena(modeId, history, contextPrompt || "");
    setConversation(prev => [...prev, { role: "supervisor", text: reply }]);
    setLoading(false);
  }

  if (!started) {
    return (
      <div>
        <button className="btn primary" onClick={start}>Start {modeName} practice</button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1rem" }}>
        {conversation.map((m, i) => (
          <div key={i} style={{ padding: "0.75rem 1rem", borderRadius: "var(--radius-sm)", background: m.role === "user" ? "var(--surface2)" : "var(--accent-light)", border: "1px solid var(--border)", fontSize: "0.875rem", lineHeight: 1.7, color: "var(--text)" }}>
            <div style={{ fontSize: "0.72rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: m.role === "user" ? "var(--text3)" : "var(--accent)", marginBottom: "0.3rem" }}>
              {m.role === "user" ? "You" : "Supervisor"}
            </div>
            {m.text}
          </div>
        ))}
        {loading && (
          <div style={{ padding: "0.75rem 1rem", borderRadius: "var(--radius-sm)", background: "var(--accent-light)", border: "1px solid var(--border)" }}><Typing /></div>
        )}
      </div>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter") send(); }} placeholder={placeholder || "Type your response..."} style={{ flex: 1 }} />
        <button className="btn btn-sm primary" onClick={send} style={{ whiteSpace: "nowrap" }}>Send</button>
      </div>
      <button className="btn btn-sm" onClick={start} style={{ marginTop: "0.75rem" }}>Reset</button>
    </div>
  );
}

// ── MAIN TRAINING ARENA ───────────────────────────────────────
export default function TrainingArena() {
  const [activeMode, setActiveMode] = useState(null);

  if (activeMode) {
    const mode = TRAINING_ARENA_MODES.find(m => m.id === activeMode);
    return (
      <div>
        <button onClick={() => setActiveMode(null)} style={{ fontSize: "0.85rem", color: "var(--text2)", background: "none", border: "none", cursor: "pointer", padding: "0 0 1rem", fontFamily: "inherit" }}>← Back to modes</button>
        <div className="card">
          <div style={{ fontWeight: 500, fontSize: "1rem", marginBottom: "0.25rem" }}>{mode.label}</div>
          <div style={{ fontSize: "0.82rem", color: "var(--text2)", marginBottom: "1.25rem" }}>{mode.desc}</div>
          {activeMode === "case_conceptualisation" && <CaseConceptualisation />}
          {activeMode === "miracle_question" && <GenericArenaMode modeId="miracle_question" modeName="Miracle Question" placeholder="Type your miracle question attempt..." />}
          {activeMode === "goal_structuring" && <GenericArenaMode modeId="goal_structuring" modeName="Goal Structuring" placeholder="Write a therapeutic goal..." />}
          {activeMode === "reflection_feeling" && <GenericArenaMode modeId="reflection_feeling" modeName="Reflection of Feeling" placeholder="Write your reflection of feeling..." />}
          {activeMode === "open_closed" && <GenericArenaMode modeId="open_closed" modeName="Open vs Closed Questions" placeholder="Rewrite the question as an open question..." />}
          {activeMode === "ethical_dilemma" && <GenericArenaMode modeId="ethical_dilemma" modeName="Ethical Dilemmas" placeholder="What would you do and why..." />}
          {activeMode === "cognitive_distortions" && <GenericArenaMode modeId="cognitive_distortions" modeName="Cognitive Distortions" placeholder="Name the cognitive distortion..." />}
          {activeMode === "transference" && <GenericArenaMode modeId="transference" modeName="Transference & Countertransference" placeholder="Identify what you notice and why..." />}
          {activeMode === "intervention_matching" && <GenericArenaMode modeId="intervention_matching" modeName="Intervention Matching" placeholder="Name the intervention and explain why..." />}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ fontSize: "0.9rem", color: "var(--text2)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
        Choose a skill to practise. Each mode gives you a scenario and coaches you through it — Socratic style.
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "0.75rem" }}>
        {TRAINING_ARENA_MODES.map(mode => (
          <button key={mode.id} onClick={() => setActiveMode(mode.id)}
            className="card"
            style={{ textAlign: "left", cursor: "pointer", fontFamily: "inherit", transition: "border-color 0.15s, box-shadow 0.15s" }}
            onMouseOver={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.boxShadow = "0 0 0 3px var(--accent-light)"; }}
            onMouseOut={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "var(--shadow)"; }}>
            <div style={{ fontWeight: 500, fontSize: "0.9rem", color: "var(--text)", marginBottom: "0.3rem" }}>{mode.label}</div>
            <div style={{ fontSize: "0.8rem", color: "var(--text2)", lineHeight: 1.6 }}>{mode.desc}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
