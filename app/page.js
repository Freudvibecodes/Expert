"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import TrainingArena from "./TrainingArena";
import NotesPractice from "./NotesPractice";
import { MODALITIES, ISSUES, PERSONALITIES, MODALITY_CONTEXT, RESOURCES } from "./constants";

const ROLE_OPPOSITE = {
  therapist: "Client",
  client: "Therapist",
  observer: "Other",
};

function buildGroupSystem(modality, role) {
  return `You are a clinical supervisor present in a live graduate therapy training session. You have been listening to everything said so far.

Modality being practised: ${modality}
${MODALITY_CONTEXT[modality] || ""}
Student role: ${role}

Your supervision philosophy:
- You supervise the WHOLE session — modality, direction, pacing, silence, emotional depth, question types, intervention choices, and any in-the-moment clinical decision.
- When a student asks whether to go deeper, stay on topic, change direction, hold silence, or any other in-the-moment question — guide them to think it through themselves.
- Never answer clinical questions directly. Ask the next right question.
- One question per response. One short reframe if truly needed. Four sentences maximum.
- If reasoning is on the right track, briefly validate then deepen with a question.
- Name ethical or safety concerns directly and clearly.
- Never diagnose or prescribe a specific intervention.
- Neutral, professional tone. You are in a live room — be concise.`;
}

function buildClientSystem(modality, issue, personality, sessionType) {
  const issueText = issue === "Randomised — surprise me"
    ? "a clinically rich presenting issue of your own choosing — do not reveal what it is upfront under any circumstances"
    : issue;
  const sessionContext = {
    intake: "This is a first intake session. Start with just a hello. Do not reveal anything about why you are here until the therapist asks.",
    early: "This is an early session. You have met this therapist once or twice. Still cautious but slightly more at ease.",
    mid: "This is a mid-therapy session. Established relationship. More open but still realistic.",
    closing: "This is a closing session. Warmth and trust. May reflect on the journey and express feelings about ending.",
    crisis: "This is a crisis session. You are in significant distress. May be tearful or overwhelmed.",
  };
  return `You are playing a real therapy client in a graduate training session. The student therapist is practising ${modality}.

Your presenting issue: ${issueText}
Your personality: ${personality}
Session context: ${sessionContext[sessionType] || sessionContext.intake}

CRITICAL RULES:
1. YOU DO NOT LEAD. The therapist leads. Only respond to what they ask or say.
2. START SLOW. First exchange — just say hello, nothing more. Do not mention why you are here.
3. REVEAL NOTHING until asked. Give only a vague hint when first asked. Build slowly across the session.
4. KEEP RESPONSES SHORT. One to three sentences maximum. Always.
5. FOLLOW THE THERAPIST'S LEAD. Closed question = short answer. Open question = open up slightly. Silence = sit in it.
6. SHOW REALISTIC HESITATION. Pause, deflect, say you do not know, minimise, change subject.
7. Never break character.
8. Asterisks for visible body language only — never internal thoughts.
9. If confused about therapy, say so briefly in one sentence and let the therapist handle it.`;
}

async function callAPI(endpoint, body) {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (data.error) { console.error("API Error:", data.error); return "Error: " + JSON.stringify(data.error); }
  return data.text || "";
}

async function saveSession(sessionData) {
  try {
    await fetch("/api/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sessionData),
    });
  } catch(e) { console.error("Failed to save session:", e); }
}

function formatDuration(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return m + "m " + s + "s";
}

function Typing() {
  return <div className="typing"><div className="tdot" /><div className="tdot" /><div className="tdot" /></div>;
}

function getBestVoice(voices) {
  if (!voices || voices.length === 0) return null;
  // Preferred high-quality voices across Chrome, Safari, iOS
  const preferred = [
    "Google UK English Female",
    "Google US English",
    "Microsoft Aria Online (Natural)",
    "Microsoft Jenny Online (Natural)",
    "Samantha",      // macOS/iOS — warm and natural
    "Karen",         // macOS Australian
    "Daniel",        // macOS UK
    "Moira",         // macOS Irish
    "Fiona",         // macOS Scottish
    "Tessa",         // macOS South African
    "Siri",          // some iOS versions expose this
  ];
  for (var i = 0; i < preferred.length; i++) {
    var v = voices.find(function(v) { return v.name === preferred[i]; });
    if (v) return v;
  }
  // Fallback: any English voice that is not compact/robotic
  var decent = voices.find(function(v) {
    return v.lang && v.lang.startsWith("en") &&
      !v.name.toLowerCase().includes("compact") &&
      !v.name.toLowerCase().includes("espeak") &&
      !v.name.toLowerCase().includes("novelty");
  });
  if (decent) return decent;
  // Last resort: any English voice
  return voices.find(function(v) { return v.lang && v.lang.startsWith("en"); }) || null;
}

function speakText(text, cb) {
  if (typeof window === "undefined" || !window.speechSynthesis) { cb && cb(); return; }
  window.speechSynthesis.cancel();
  var spokenText = text.replace(/\*[^*]+\*/g, "").replace(/\s+/g, " ").trim();
  if (!spokenText) { cb && cb(); return; }

  function doSpeak(voices) {
    var utt = new SpeechSynthesisUtterance(spokenText);
    var voice = getBestVoice(voices);
    if (voice) utt.voice = voice;
    utt.rate = 0.88; utt.pitch = 1.0; utt.volume = 1;
    utt.onend = function() { cb && cb(); };
    utt.onerror = function() { cb && cb(); };
    // Safari bug: speech sometimes silently hangs — add a timeout fallback
    var spoken = false;
    utt.onstart = function() { spoken = true; };
    window.speechSynthesis.speak(utt);
    // iOS Safari sometimes needs a resume call
    setTimeout(function() {
      if (window.speechSynthesis.paused) window.speechSynthesis.resume();
    }, 100);
    // Fallback if speech never starts after 6 seconds
    setTimeout(function() {
      if (!spoken) { window.speechSynthesis.cancel(); cb && cb(); }
    }, 6000);
  }

  var voices = window.speechSynthesis.getVoices();
  if (voices && voices.length > 0) {
    doSpeak(voices);
  } else {
    // Safari loads voices asynchronously — wait for them
    var attempts = 0;
    var interval = setInterval(function() {
      var v = window.speechSynthesis.getVoices();
      attempts++;
      if ((v && v.length > 0) || attempts > 20) {
        clearInterval(interval);
        doSpeak(v || []);
      }
    }, 100);
  }
}

// ── REVIEW RENDERER ───────────────────────────────────────────
function ReviewRenderer({ text }) {
  if (!text) return null;
  let data = null;
  try { data = JSON.parse(text); } catch(e) {
    return <div style={{ fontSize: "0.9rem", lineHeight: 1.8, color: "var(--text)", whiteSpace: "pre-wrap" }}>{text}</div>;
  }
  function ratingColor(r) {
    if (!r) return "var(--text2)";
    const rl = r.toLowerCase().trim();
    if (rl === "strong") return "#2D6A4F";
    if (rl === "developing") return "#854F0B";
    if (rl === "needs work") return "#8B2020";
    return "var(--text3)";
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
  const labelStyle = { fontSize: "0.72rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "0.75rem", paddingBottom: "0.4rem", borderBottom: "0.5px solid var(--border)" };
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
            <div style={{ flex: 1, minWidth: 200, padding: "0.75rem 1rem", background: "var(--surface2)", borderRadius: 8, fontSize: "0.85rem", color: "var(--text2)", lineHeight: 1.6 }}>
              <div style={{ fontWeight: 500, color: "var(--text)", marginBottom: "0.25rem", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Session length</div>
              {data.duration_note}
            </div>
          )}
          {data.intention_achieved && data.intention_achieved.trim() && (
            <div style={{ flex: 1, minWidth: 200, padding: "0.75rem 1rem", background: "#EBF0F8", borderRadius: 8, fontSize: "0.85rem", color: "var(--text2)", lineHeight: 1.6 }}>
              <div style={{ fontWeight: 500, color: "#185FA5", marginBottom: "0.25rem", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Intention check</div>
              {data.intention_achieved}
            </div>
          )}
        </div>
      )}
      {data.dimensions && data.dimensions.length > 0 && (
        <div style={sectionStyle}>
          <div style={{ ...labelStyle, color: "var(--blue)" }}>Dimensions</div>
          {(function() {
            const counts = { Strong: 0, Developing: 0, "Needs Work": 0, "N/A": 0 };
            data.dimensions.forEach(function(d) {
              const r = d.rating || "N/A";
              if (counts[r] !== undefined) counts[r]++;
              else counts["N/A"]++;
            });
            return (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "0.75rem" }}>
                {counts.Strong > 0 && <span style={{ padding: "3px 10px", borderRadius: 20, background: "var(--green-light)", color: "var(--green)", fontSize: "0.75rem", fontWeight: 500 }}>✓ {counts.Strong} Strong</span>}
                {counts.Developing > 0 && <span style={{ padding: "3px 10px", borderRadius: 20, background: "var(--accent2-light)", color: "var(--accent2)", fontSize: "0.75rem", fontWeight: 500 }}>~ {counts.Developing} Developing</span>}
                {counts["Needs Work"] > 0 && <span style={{ padding: "3px 10px", borderRadius: 20, background: "var(--red-light)", color: "var(--red)", fontSize: "0.75rem", fontWeight: 500 }}>↑ {counts["Needs Work"]} Needs Work</span>}
              </div>
            );
          })()}
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
          <div style={{ ...labelStyle, color: "#2D6A4F" }}>What landed well</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {data.landed_well.map(function(item, i) {
              return (
                <div key={i} style={{ padding: "0.75rem 1rem", background: "#EBF5F0", borderRadius: 8, borderLeft: "3px solid #2D6A4F" }}>
                  <div style={{ fontSize: "0.85rem", color: "#2D6A4F", fontWeight: 500, marginBottom: "0.3rem", fontStyle: "italic" }}>{item.moment}</div>
                  <div style={{ fontSize: "0.85rem", color: "var(--text2)", lineHeight: 1.6 }}>{item.why}</div>
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
                  <div style={{ fontSize: "0.85rem", color: "var(--text2)", lineHeight: 1.6 }}>{item.suggestion}</div>
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
          <div style={{ padding: "1rem 1.25rem", background: "var(--surface2)", borderRadius: 8, fontSize: "0.95rem", lineHeight: 1.7, color: "var(--text)", fontStyle: "italic" }}>
            {data.reflection_question}
          </div>
        </div>
      )}
    </div>
  );
}

// ── PROGRESS CHART ────────────────────────────────────────────
function ProgressChart({ sessions }) {
  if (!sessions || sessions.length < 2) return null;

  const KEY_DIMS = ["Rapport and therapeutic alliance","Question types (open vs closed, timing)","Paraphrasing","Emotional attunement","Session management (opening, structure, closing)"];
  const RATING_SCORE = { "strong": 3, "developing": 2, "needs work": 1, "n/a": null };

  function getScore(session, dim) {
    if (!session.review) return null;
    try {
      const data = JSON.parse(session.review);
      const d = data.dimensions && data.dimensions.find(function(x) { return x.name.toLowerCase() === dim.toLowerCase(); });
      if (!d) return null;
      return RATING_SCORE[d.rating.toLowerCase()] || null;
    } catch(e) { return null; }
  }

  const chartWidth = 500;
  const chartHeight = 160;
  const padL = 8, padR = 8, padT = 10, padB = 30;
  const innerW = chartWidth - padL - padR;
  const innerH = chartHeight - padT - padB;

  const colors = ["#185FA5","#2D6A4F","#854F0B","#8B2020","#534AB7"];
  const sortedSessions = sessions.slice().reverse();

  function getPoints(dim) {
    const pts = [];
    sortedSessions.forEach(function(s, i) {
      const score = getScore(s, dim);
      if (score !== null) {
        const x = padL + (sortedSessions.length === 1 ? innerW / 2 : (i / (sortedSessions.length - 1)) * innerW);
        const y = padT + innerH - ((score - 1) / 2) * innerH;
        pts.push({ x, y, score, date: new Date(s.date).toLocaleDateString("en-CA", { month: "short", day: "numeric" }) });
      }
    });
    return pts;
  }

  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <div style={{ fontSize: "0.75rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text3)", marginBottom: "0.75rem" }}>Progress over time</div>
      <div style={{ overflowX: "auto" }}>
        <svg width={chartWidth} height={chartHeight} style={{ display: "block", maxWidth: "100%" }}>
          {[1,2,3].map(function(v) {
            const y = padT + innerH - ((v-1)/2)*innerH;
            return (
              <g key={v}>
                <line x1={padL} x2={chartWidth-padR} y1={y} y2={y} stroke="var(--border)" strokeWidth={0.5} />
                <text x={padL} y={y-3} fontSize={9} fill="var(--text3)">{v===3?"Strong":v===2?"Developing":"Needs Work"}</text>
              </g>
            );
          })}
          {sortedSessions.map(function(s, i) {
            const x = padL + (sortedSessions.length === 1 ? innerW/2 : (i/(sortedSessions.length-1))*innerW);
            const label = new Date(s.date).toLocaleDateString("en-CA", { month: "short", day: "numeric" });
            return <text key={i} x={x} y={chartHeight-8} fontSize={9} fill="var(--text3)" textAnchor="middle">{label}</text>;
          })}
          {KEY_DIMS.map(function(dim, di) {
            const pts = getPoints(dim);
            if (pts.length < 1) return null;
            const color = colors[di % colors.length];
            const pathD = pts.map(function(p, i) { return (i===0?"M":"L") + p.x + "," + p.y; }).join(" ");
            return (
              <g key={dim}>
                {pts.length > 1 && <path d={pathD} fill="none" stroke={color} strokeWidth={1.5} strokeOpacity={0.7} />}
                {pts.map(function(p, i) {
                  return <circle key={i} cx={p.x} cy={p.y} r={3} fill={color} />;
                })}
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

// ── RESOURCES ─────────────────────────────────────────────────
function ResourcesPanel({ modality }) {
  const resources = RESOURCES[modality];
  if (!resources) return null;
  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <div style={{ fontSize: "0.75rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text3)", marginBottom: "0.75rem" }}>
        Resources — {modality}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {resources.map(function(r, i) {
          return (
            <div key={i} style={{ padding: "0.75rem 1rem", background: "var(--surface2)", borderRadius: 8, borderLeft: "3px solid var(--border2)" }}>
              <div style={{ fontSize: "0.85rem", fontWeight: 500, color: "var(--text)", marginBottom: "0.25rem" }}>{r.concept}</div>
              <div style={{ fontSize: "0.82rem", color: "var(--text2)", lineHeight: 1.6 }}>{r.desc}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── NAME SCREEN ───────────────────────────────────────────────
function NameScreen({ onContinue }) {
  const [name, setName] = useState(function() {
    try { return localStorage.getItem("clinicStudent") || ""; } catch(e) { return ""; }
  });
  const [pastSessions, setPastSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  async function handleContinue() {
    if (!name.trim()) { alert("Please enter your name."); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/sessions?student=" + encodeURIComponent(name.trim()));
      const data = await res.json();
      setPastSessions(data || []);
    } catch(e) { setPastSessions([]); }
    localStorage.setItem("clinicStudent", name.trim());
    setLoading(false);
    setChecked(true);
  }

  if (checked) {
    return (
      <div>
        <div className="header"><h1>Clinical Supervision</h1><p>Welcome back, {name.trim()}</p></div>
        <div className="card">
          <button className="btn primary" onClick={function() { onContinue(name.trim(), "new"); }} style={{ marginBottom: "0.75rem" }}>Start new session</button>
          {pastSessions.length > 0 && <button className="btn" onClick={function() { onContinue(name.trim(), "history"); }}>View my past sessions ({pastSessions.length})</button>}
        </div>
        {pastSessions.length > 0 && (
          <div className="card">
            <div className="section-label">Recent sessions</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "0.5rem" }}>
              {pastSessions.slice(0,3).map(function(s) {
                return (
                  <div key={s.id} style={{ fontSize: "0.85rem", color: "var(--text2)", padding: "0.5rem 0", borderBottom: "0.5px solid var(--border)" }}>
                    <span style={{ fontWeight: 500, color: "var(--text)" }}>{s.modality}</span>{" · "}{s.session_type}{" · "}{s.mode === "solo" ? "Solo" : "Group"}
                    {" · "}<span style={{ color: "var(--text3)" }}>{new Date(s.date).toLocaleDateString()}</span>
                    {s.duration_seconds > 0 && <span style={{ color: "var(--text3)" }}> · {formatDuration(s.duration_seconds)}</span>}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="header"><h1>Clinical Supervision</h1><p>A training platform for graduate therapy students</p></div>
      <div className="card">
        <div className="field">
          <label>Your name</label>
          <input type="text" value={name} onChange={function(e) { setName(e.target.value); }} onKeyDown={function(e) { if (e.key === "Enter") handleContinue(); }} placeholder="Enter your first and last name"
            style={{ width: "100%", padding: "0.7rem 1rem", fontSize: "0.95rem", border: "1px solid var(--border2)", borderRadius: 8, background: "var(--surface)", color: "var(--text)", outline: "none", fontFamily: "inherit" }} />
        </div>
        <button className="btn primary" onClick={handleContinue} disabled={loading}>{loading ? "Loading..." : "Continue"}</button>
      </div>
    </div>
  );
}

// ── HISTORY SCREEN ────────────────────────────────────────────
function HistoryScreen({ studentName, onBack }) {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [activeTab, setActiveTab] = useState("session");

  useEffect(function() {
    fetch("/api/sessions?student=" + encodeURIComponent(studentName))
      .then(function(r) { return r.json(); })
      .then(function(data) { setSessions(data || []); setLoading(false); })
      .catch(function() { setLoading(false); });
  }, [studentName]);

  const SESSION_TYPE_LABELS = { intake: "Intake", early: "Early", mid: "Mid-therapy", closing: "Closing", crisis: "Crisis" };

  function formatDate(d) {
    return new Date(d).toLocaleDateString("en-CA", { year: "numeric", month: "short", day: "numeric" });
  }

  if (selected) {
    let reviewData = null;
    try { reviewData = JSON.parse(selected.review); } catch(e) {}

    return (
      <div>
        <button className="btn btn-sm" onClick={function() { setSelected(null); setActiveTab("session"); }} style={{ marginBottom: "1rem" }}>Back to history</button>
        <div className="card">
          <div style={{ fontWeight: 500 }}>{selected.modality} — {SESSION_TYPE_LABELS[selected.session_type] || selected.session_type}</div>
          <div style={{ fontSize: "0.8rem", color: "var(--text2)", marginTop: 4, display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            <span>{formatDate(selected.date)}</span>
            <span>·</span>
            <span>{selected.mode === "solo" ? "Solo Practice" : "Group Supervision"}</span>
            {selected.duration_seconds > 0 && <><span>·</span><span>{formatDuration(selected.duration_seconds)}</span></>}
            {selected.issue && selected.issue !== "" && <><span>·</span><span>{selected.issue}</span></>}
          </div>
          {selected.intention && selected.intention !== "" && (
            <div style={{ marginTop: "0.5rem", fontSize: "0.82rem", color: "var(--text2)", background: "#EBF0F8", padding: "0.4rem 0.75rem", borderRadius: 6 }}>
              Intention: {selected.intention}
            </div>
          )}
          {selected.professor_note && (
            <div style={{ marginTop: "0.75rem", padding: "0.75rem 1rem", background: "#FDF3E3", borderRadius: 8, borderLeft: "3px solid #854F0B" }}>
              <div style={{ fontSize: "0.72rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em", color: "#854F0B", marginBottom: "0.25rem" }}>Professor note</div>
              <div style={{ fontSize: "0.875rem", color: "var(--text2)", lineHeight: 1.6 }}>{selected.professor_note}</div>
            </div>
          )}
        </div>

        <div className="tabs" style={{ marginBottom: "1rem" }}>
          <button className={"tab" + (activeTab === "session" ? " active" : "")} onClick={function() { setActiveTab("session"); }}>Review</button>
          <button className={"tab" + (activeTab === "transcript" ? " active" : "")} onClick={function() { setActiveTab("transcript"); }}>Transcript</button>
          {RESOURCES[selected.modality] && <button className={"tab" + (activeTab === "resources" ? " active" : "")} onClick={function() { setActiveTab("resources"); }}>Resources</button>}
        </div>

        {activeTab === "session" && (
          <div className="card">
            {selected.review ? <ReviewRenderer text={selected.review} /> : <div style={{ fontSize: "0.875rem", color: "var(--text3)", fontStyle: "italic" }}>No review available.</div>}
          </div>
        )}
        {activeTab === "transcript" && (
          <div className="card">
            <div className="section-label">Transcript</div>
            <div style={{ fontSize: "0.875rem", lineHeight: 1.8, color: "var(--text2)", whiteSpace: "pre-wrap", marginTop: "0.5rem" }}>{selected.transcript || "No transcript recorded."}</div>
          </div>
        )}
        {activeTab === "resources" && (
          <div className="card"><ResourcesPanel modality={selected.modality} /></div>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="header" style={{ paddingBottom: "1.5rem" }}>
        <h1>My Sessions</h1>
        <p>{studentName} · {sessions.length} session{sessions.length !== 1 ? "s" : ""}</p>
      </div>
      <button className="btn btn-sm" onClick={onBack} style={{ marginBottom: "1rem" }}>Back</button>

      {sessions.length >= 2 && (
        <div className="card"><ProgressChart sessions={sessions} /></div>
      )}

      {loading && <div className="card"><div style={{ fontSize: "0.875rem", color: "var(--text2)" }}>Loading...</div></div>}
      {!loading && sessions.length === 0 && (
        <div className="card"><div style={{ fontSize: "0.875rem", color: "var(--text3)", fontStyle: "italic" }}>No sessions yet. Complete a session to see it here.</div></div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {sessions.map(function(s) {
          return (
            <div key={s.id} style={{ display: "flex", alignItems: "stretch", gap: "0.5rem" }}>
              <button onClick={function() { setSelected(s); }}
                style={{ flex: 1, textAlign: "left", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "1rem 1.25rem", cursor: "pointer", fontFamily: "inherit" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontWeight: 500, fontSize: "0.95rem" }}>{s.modality}</div>
                    <div style={{ fontSize: "0.8rem", color: "var(--text2)", marginTop: 3 }}>
                      {SESSION_TYPE_LABELS[s.session_type] || s.session_type} · {s.mode === "solo" ? "Solo" : "Group"}
                      {s.issue && s.issue !== "" ? " · " + s.issue : ""}
                      {s.duration_seconds > 0 ? " · " + formatDuration(s.duration_seconds) : ""}
                    </div>
                    {s.intention && <div style={{ fontSize: "0.78rem", color: "var(--text3)", marginTop: 2, fontStyle: "italic" }}>Focus: {s.intention}</div>}
                    {s.professor_note && <div style={{ fontSize: "0.78rem", color: "#854F0B", marginTop: 2 }}>Professor note added</div>}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text3)" }}>{formatDate(s.date)}</div>
                </div>
              </button>
              <button
                onClick={async function() {
                  if (!window.confirm("Delete this session? This cannot be undone.")) return;
                  await fetch("/api/sessions?id=" + s.id + "&student=" + encodeURIComponent(studentName), { method: "DELETE" });
                  setSessions(function(prev) { return prev.filter(function(x) { return x.id !== s.id; }); });
                }}
                style={{ background: "#FDF0F0", border: "1px solid #E8C0C0", borderRadius: 12, padding: "0 0.75rem", cursor: "pointer", color: "#8B2020", fontSize: "1rem", flexShrink: 0 }}
                title="Delete session"
              >&#x1F5D1;</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}


// ── WELCOME SCREEN ────────────────────────────────────────────
function WelcomeScreen({ studentName, onContinue, onHistory }) {
  const modes = [
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="7" r="3"/><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
          <circle cx="18" cy="7" r="2"/><path d="M21 21v-1.5a3 3 0 0 0-2-2.83"/>
        </svg>
      ),
      label: "Group Supervised Session",
      color: "var(--blue)",
      colorLight: "var(--blue-light)",
      desc: "Practising with classmates or peers? Start here. This mode listens to your entire session and transcribes everything in real time. Whenever you need guidance — say Hey Claude and ask your question. Your supervisor will respond without interrupting the flow of the session. End the session to receive a full clinical review across 26 dimensions.",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="4"/><path d="M4 20v-1a7 7 0 0 1 14 0v1"/>
        </svg>
      ),
      label: "Solo Session",
      color: "var(--green)",
      colorLight: "var(--green-light)",
      desc: "Practice independently at any time. Claude plays a realistic simulated client — you choose the modality, presenting issue, and session type. Speak naturally and receive responses in real time. At the end, receive a detailed clinical review of your performance. The more sessions you complete, the more your progress is tracked over time.",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.5 17.5L3 6V3h3l11.5 11.5"/><path d="M13 19l6-6"/><path d="M2 2l20 20"/>
        </svg>
      ),
      label: "Training Arena",
      color: "var(--accent2)",
      colorLight: "var(--accent2-light)",
      desc: "A focused skill-building space designed for practicum preparation. Choose from nine targeted drills — case conceptualisation, miracle questions, goal structuring, ethical dilemmas, cognitive distortions, and more. Each mode gives you a real clinical scenario and coaches you through it using Socratic questioning. No answers given — only guided thinking.",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/>
        </svg>
      ),
      label: "Post-Note Taking Practice",
      color: "var(--accent)",
      colorLight: "var(--accent-light)",
      desc: "Documentation is a core clinical competency — and one of the hardest to practise. This mode gives you a rich client case summary and asks you to write a structured progress note in your chosen format: SOAP, DAP, TARP, or BIRP. Claude reviews your note in detail — identifying what you got right, what needs work, and how to fix it. Use a random case or pull from your own past sessions.",
    },
  ];

  return (
    <div>
      <div className="header">
        <h1>Clinical Supervision</h1>
        <p style={{ marginTop: "0.35rem" }}>Welcome back, <strong style={{ color: "var(--text)" }}>{studentName}</strong></p>
        <p style={{ fontSize: "0.82rem", color: "var(--text3)", marginTop: "0.25rem" }}>Choose a mode below to get started</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "0.85rem", marginBottom: "1.5rem" }}>
        {modes.map(function(m, i) {
          return (
            <div key={i} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "1.4rem", boxShadow: "var(--shadow)", display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: m.colorLight, display: "flex", alignItems: "center", justifyContent: "center", color: m.color, flexShrink: 0 }}>
                  {m.icon}
                </div>
                <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--text)", lineHeight: 1.3 }}>{m.label}</div>
              </div>
              <div style={{ fontSize: "0.82rem", color: "var(--text2)", lineHeight: 1.75, flex: 1 }}>{m.desc}</div>
            </div>
          );
        })}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        <button className="btn primary" onClick={onContinue} style={{ fontSize: "1rem", padding: "1rem" }}>
          Let's begin →
        </button>
        <button className="btn" onClick={onHistory} style={{ fontSize: "0.875rem" }}>
          View my past sessions
        </button>
      </div>
    </div>
  );
}

// ── SETUP ─────────────────────────────────────────────────────
function SetupScreen({ studentName, onStart, onHistory }) {
  const [mode, setMode] = useState("group");
  const [gModality, setGModality] = useState("");
  const [gRole, setGRole] = useState("therapist");
  const [gSessionType, setGSessionType] = useState("intake");
  const [gIntention, setGIntention] = useState("");
  const [sModality, setSModality] = useState("");
  const [sIssue, setSIssue] = useState("Randomised — surprise me");
  const [sRespMode, setSRespMode] = useState("voice");
  const [sSessionType, setSSessionType] = useState("intake");
  const [sIntention, setSIntention] = useState("");

  function handleStart() {
    if (mode === "group") {
      if (!gModality) { alert("Please select a modality."); return; }
      onStart({ mode: "group", modality: gModality, role: gRole, sessionType: gSessionType, studentName, intention: gIntention });
    } else if (mode === "solo") {
      if (!sModality) { alert("Please select a modality."); return; }
      onStart({ mode: "solo", modality: sModality, issue: sIssue, respMode: sRespMode, sessionType: sSessionType, studentName, intention: sIntention });
    }
  }

  const intentionInput = function(val, setVal) {
    return (
      <div className="field">
        <label>Session intention (optional)</label>
        <input type="text" value={val} onChange={function(e) { setVal(e.target.value); }} placeholder="What one thing do you want to focus on today?"
          style={{ width: "100%", padding: "0.7rem 1rem", fontSize: "0.9rem", border: "1px solid var(--border2)", borderRadius: 8, background: "var(--surface)", color: "var(--text)", outline: "none", fontFamily: "inherit" }} />
      </div>
    );
  };

  return (
    <div>
      <div className="header"><h1>Clinical Supervision</h1><p>{studentName}</p></div>
      <div className="card">
        <div className="tabs" style={{ flexWrap: "wrap" }}>
          <button className={"tab" + (mode === "group" ? " active" : "")} onClick={function() { setMode("group"); }}>
            <div style={{ fontSize: "0.8rem", fontWeight: 500, marginBottom: "0.35rem" }}>Group Supervised Session</div>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7 }}>
              <circle cx="9" cy="7" r="3"/><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
              <circle cx="18" cy="7" r="2"/><path d="M21 21v-1.5a3 3 0 0 0-2-2.83"/>
            </svg>
          </button>
          <button className={"tab" + (mode === "solo" ? " active" : "")} onClick={function() { setMode("solo"); }}>
            <div style={{ fontSize: "0.8rem", fontWeight: 500, marginBottom: "0.35rem" }}>Solo Session</div>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7 }}>
              <circle cx="12" cy="8" r="4"/><path d="M4 20v-1a7 7 0 0 1 14 0v1"/>
            </svg>
          </button>
          <button className={"tab" + (mode === "arena" ? " active" : "")} onClick={function() { setMode("arena"); }}>
            <div style={{ fontSize: "0.8rem", fontWeight: 500, marginBottom: "0.35rem" }}>Training Arena</div>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7 }}>
              <path d="M14.5 17.5L3 6V3h3l11.5 11.5"/><path d="M13 19l6-6"/><path d="M2 2l20 20"/>
            </svg>
          </button>
          <button className={"tab" + (mode === "notes" ? " active" : "")} onClick={function() { setMode("notes"); }}>
            <div style={{ fontSize: "0.8rem", fontWeight: 500, marginBottom: "0.35rem" }}>Post-Note Taking Practice</div>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7 }}>
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/>
            </svg>
          </button>
        </div>

        {mode === "group" && (
          <div>
            <p style={{ fontSize: "0.875rem", color: "var(--text2)", marginBottom: "1.25rem", lineHeight: 1.7 }}>Listen to your group session. Say <strong>Hey Claude</strong> at any point for live guidance.</p>
            <div className="field">
              <label>Modality being practised</label>
              <select value={gModality} onChange={function(e) { setGModality(e.target.value); }}>
                <option value="">Select modality...</option>
                {MODALITIES.map(function(m) { return <option key={m}>{m}</option>; })}
              </select>
            </div>
            <div className="field">
              <label>Session type</label>
              <select value={gSessionType} onChange={function(e) { setGSessionType(e.target.value); }}>
                <option value="intake">Intake / first session</option>
                <option value="early">Early session</option>
                <option value="mid">Mid-therapy</option>
                <option value="closing">Closing session</option>
                <option value="crisis">Crisis session</option>
              </select>
            </div>
            <div className="field">
              <label>Your role</label>
              <select value={gRole} onChange={function(e) { setGRole(e.target.value); }}>
                <option value="therapist">Therapist</option>
                <option value="client">Client</option>
                <option value="observer">Observer</option>
              </select>
            </div>
            {intentionInput(gIntention, setGIntention)}
          </div>
        )}

        {mode === "solo" && (
          <div>
            <p style={{ fontSize: "0.875rem", color: "var(--text2)", marginBottom: "1.25rem", lineHeight: 1.7 }}>Practice solo. Claude plays a real client. Press <strong>Start talking</strong> to speak, <strong>Done</strong> when finished.</p>
            <div className="field">
              <label>Modality to practise</label>
              <select value={sModality} onChange={function(e) { setSModality(e.target.value); }}>
                <option value="">Select modality...</option>
                {MODALITIES.map(function(m) { return <option key={m}>{m}</option>; })}
              </select>
            </div>
            <div className="field">
              <label>Client presenting issue</label>
              <select value={sIssue} onChange={function(e) { setSIssue(e.target.value); }}>
                {ISSUES.map(function(i) { return <option key={i}>{i}</option>; })}
              </select>
            </div>
            <div className="field">
              <label>Session type</label>
              <select value={sSessionType} onChange={function(e) { setSSessionType(e.target.value); }}>
                <option value="intake">Intake / first session</option>
                <option value="early">Early session</option>
                <option value="mid">Mid-therapy</option>
                <option value="closing">Closing session</option>
                <option value="crisis">Crisis session</option>
              </select>
            </div>
            <div className="field">
              <label>Client response mode</label>
              <select value={sRespMode} onChange={function(e) { setSRespMode(e.target.value); }}>
                <option value="voice">Voice — client speaks aloud</option>
                <option value="text">Text — client responds in writing</option>
              </select>
            </div>
            {intentionInput(sIntention, setSIntention)}
          </div>
        )}

        {mode === "arena" && (
          <div>
            <p style={{ fontSize: "0.875rem", color: "var(--text2)", marginBottom: "1.25rem", lineHeight: 1.7 }}>
              Drill specific clinical skills — case conceptualisation, miracle questions, goal structuring, ethical dilemmas, and more. Each mode gives you a scenario and coaches you through it.
            </p>
            <TrainingArena />
          </div>
        )}

        {mode === "notes" && (
          <div>
            <p style={{ fontSize: "0.875rem", color: "var(--text2)", marginBottom: "1.25rem", lineHeight: 1.7 }}>
              Practice writing clinical progress notes in SOAP, DAP, TARP, or BIRP format. Use a random case or one of your past sessions. Claude reviews your note with specific, structured feedback.
            </p>
            <NotesPractice studentSessions={[]} studentName={studentName} />
          </div>
        )}

        {(mode === "group" || mode === "solo") && (
          <div>
            {typeof window !== "undefined" && !(window.SpeechRecognition || window.webkitSpeechRecognition) && (
              <div style={{ padding: "0.75rem 1rem", background: "var(--accent2-light)", borderRadius: "var(--radius-sm)", borderLeft: "3px solid var(--accent2)", marginBottom: "0.75rem", fontSize: "0.82rem", color: "var(--text2)", lineHeight: 1.6 }}>
                <strong style={{ color: "var(--accent2)" }}>Voice sessions work best in Chrome.</strong> Your current browser does not support live microphone transcription. The session will still work but voice features will be limited.
              </div>
            )}
            <button className="btn primary" onClick={handleStart}>Begin session</button>
          </div>
        )}
        <button className="btn" onClick={onHistory} style={{ marginTop: "0.5rem" }}>View my past sessions</button>
      </div>
    </div>
  );
}

// ── GROUP ─────────────────────────────────────────────────────
function GroupScreen({ config, onEnd }) {
  const [transcript, setTranscript] = useState([]);
  const [interim, setInterim] = useState("");
  const [indText, setIndText] = useState("Listening to session...");
  const [dotState, setDotState] = useState("listening");
  const [supervisorReply, setSupervisorReply] = useState(null);
  const [isResponding, setIsResponding] = useState(false);
  const [currentSpeaker, setCurrentSpeaker] = useState(config.role);
  const [elapsed, setElapsed] = useState(0);

  const myRole = config.role;
  const otherRole = ROLE_OPPOSITE[config.role] || "Other";
  const recRef = useRef(null);
  const activeRef = useRef(true);
  const heyModeRef = useRef(false);
  const qBufferRef = useRef("");
  const silTimerRef = useRef(null);
  const transcriptRef = useRef([]);
  const transcriptBoxRef = useRef(null);
  const currentSpeakerRef = useRef(config.role);
  const startTimeRef = useRef(Date.now());
  const timerRef = useRef(null);

  useEffect(function() {
    timerRef.current = setInterval(function() { setElapsed(Math.floor((Date.now() - startTimeRef.current) / 1000)); }, 1000);
    return function() { clearInterval(timerRef.current); };
  }, []);

  const addLine = useCallback(function(text, type, speaker) {
    const line = { text, type, speaker, id: Date.now() + Math.random() };
    transcriptRef.current = transcriptRef.current.concat([line]);
    setTranscript(transcriptRef.current.slice());
  }, []);

  useEffect(function() {
    if (transcriptBoxRef.current) transcriptBoxRef.current.scrollTop = transcriptBoxRef.current.scrollHeight;
  }, [transcript]);

  const triggerResponse = useCallback(async function() {
    const q = qBufferRef.current.trim();
    qBufferRef.current = ""; heyModeRef.current = false;
    if (!q) return;
    activeRef.current = false;
    try { recRef.current.stop(); } catch(e) {}
    setDotState("responding"); setIndText("Supervisor is thinking..."); setIsResponding(true); setSupervisorReply("typing");
    const ctx = transcriptRef.current.slice(-40).map(function(l) { return (l.speaker ? l.speaker + ": " : "") + l.text; }).join("\n");
    const msg = "Session transcript so far:\n" + (ctx || "(session just started)") + "\n\nStudent just asked you: \"" + q + "\"";
    try {
      const reply = await callAPI("/api/chat", { system: buildGroupSystem(config.modality, config.role), messages: [{ role: "user", content: msg }] });
      setSupervisorReply(reply);
      addLine(reply, "supervisor-line", "Supervisor");
      speakText(reply, function() {
        setIsResponding(false); setDotState("listening"); setIndText("Listening to session..."); activeRef.current = true;
        try { recRef.current.start(); } catch(e) {}
      });
    } catch(e) {
      setSupervisorReply("Connection issue — please try again.");
      setIsResponding(false); setDotState("listening"); setIndText("Listening to session..."); activeRef.current = true;
      try { recRef.current.start(); } catch(e) {}
    }
  }, [config, addLine]);

  useEffect(function() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      setIndText("Live voice not supported on this browser. For best results use Chrome on desktop.");
      setDotState("idle");
      return;
    }
    const rec = new SR();
    rec.continuous = true; rec.interimResults = true; rec.lang = "en-US";
    recRef.current = rec;
    rec.onresult = function(e) {
      let interimText = "", finalText = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) finalText += e.results[i][0].transcript;
        else interimText += e.results[i][0].transcript;
      }
      setInterim(interimText);
      if (!finalText) return;
      setInterim("");
      const cleaned = finalText.trim();
      const lower = cleaned.toLowerCase();
      if (!heyModeRef.current) {
        if (lower.includes("hey claude")) {
          heyModeRef.current = true;
          const idx = lower.indexOf("hey claude");
          const before = cleaned.substring(0, idx).trim();
          const after = cleaned.substring(idx).trim();
          if (before) addLine(before, "speaker", currentSpeakerRef.current);
          addLine(after, "trigger", currentSpeakerRef.current);
          qBufferRef.current = after.replace(/hey claude/gi, "").trim();
          clearTimeout(silTimerRef.current);
          silTimerRef.current = setTimeout(triggerResponse, 2200);
        } else { addLine(cleaned, "speaker", currentSpeakerRef.current); }
      } else {
        addLine(cleaned, "speaker", currentSpeakerRef.current);
        qBufferRef.current += " " + cleaned;
        clearTimeout(silTimerRef.current);
        silTimerRef.current = setTimeout(triggerResponse, 2200);
      }
    };
    rec.onerror = function(e) {
      if (e.error === "not-allowed") { setIndText("Microphone access denied — please allow mic access in browser settings."); setDotState("idle"); return; }
      if (e.error === "service-not-allowed") { setIndText("Voice recognition not available on this browser. Please use Chrome for live sessions."); setDotState("idle"); return; }
      if (activeRef.current) setTimeout(function() { try { rec.start(); } catch(e) {} }, 800);
    };
    rec.onend = function() {
      if (activeRef.current && !isResponding) setTimeout(function() { try { rec.start(); } catch(e) {} }, 200);
    };
    try { rec.start(); } catch(e) { setIndText("Could not start voice recognition. Please use Chrome for live sessions."); setDotState("idle"); }
    return function() { activeRef.current = false; clearTimeout(silTimerRef.current); try { rec.stop(); } catch(e) {} };
  }, [addLine, triggerResponse]);

  function switchSpeaker() {
    const next = currentSpeakerRef.current === myRole ? otherRole : myRole;
    currentSpeakerRef.current = next;
    setCurrentSpeaker(next);
  }

  function handleEnd() {
    activeRef.current = false;
    clearInterval(timerRef.current);
    try { recRef.current.stop(); } catch(e) {}
    const fullTranscript = transcriptRef.current.map(function(l) { return (l.speaker ? l.speaker + ": " : "") + l.text; }).join("\n");
    onEnd(fullTranscript, elapsed);
  }

  const speakerColor = function(s) {
    if (!s) return "";
    const sl = s.toLowerCase();
    if (sl === "therapist") return "#185FA5";
    if (sl === "client") return "#854F0B";
    if (sl === "supervisor") return "#2D6A4F";
    return "var(--text2)";
  };

  return (
    <div>
      <div className="card">
        <div className="row">
          <div>
            <div style={{ fontWeight: 500 }}>Group Supervision</div>
            <div style={{ fontSize: "0.8rem", color: "var(--text2)", marginTop: 2 }}>
              <span className="badge">{config.modality}</span>{" "}<span className="badge">{config.role}</span>{" "}<span className="badge">{config.sessionType || "intake"}</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ fontSize: "0.85rem", color: "var(--text3)", fontVariantNumeric: "tabular-nums" }}>{formatDuration(elapsed)}</div>
            <button className="btn btn-sm danger" onClick={handleEnd}>End and review</button>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="indicator"><div className={"dot " + dotState} /><div className="ind-text">{indText}</div></div>
        {interim && <div className="interim">{interim}</div>}
        <div style={{ marginTop: "0.75rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{ fontSize: "0.85rem", color: "var(--text2)" }}>Speaking as: <strong style={{ color: speakerColor(currentSpeaker), textTransform: "capitalize" }}>{currentSpeaker}</strong></div>
          <button className="btn btn-sm" onClick={switchSpeaker}>Switch to {currentSpeakerRef.current === myRole ? otherRole : myRole}</button>
        </div>
        <div className="hint" style={{ marginTop: "0.5rem" }}>Say <strong>Hey Claude</strong> followed by your question at any point.</div>
      </div>
      <div className="card">
        <div className="section-label">Live transcript</div>
        <div className="transcript-wrap" ref={transcriptBoxRef}>
          {transcript.length === 0
            ? <div className="t-empty">Transcript will appear here...</div>
            : transcript.map(function(l) {
                return (
                  <div key={l.id} className={"t-line " + l.type}>
                    {l.speaker && <span style={{ fontSize: "0.75rem", fontWeight: 500, marginRight: "0.4rem", color: speakerColor(l.speaker), textTransform: "capitalize" }}>{l.speaker}</span>}
                    {l.text}
                  </div>
                );
              })
          }
        </div>
      </div>
      {supervisorReply && (
        <div className="card">
          <div className="response-area">
            <div className="response-label sup">Supervisor</div>
            <div className="response-text">{supervisorReply === "typing" ? <Typing /> : supervisorReply}</div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── SOLO ──────────────────────────────────────────────────────
function SoloScreen({ config, onEnd }) {
  const [conversation, setConversation] = useState([]);
  const [interim, setInterim] = useState("");
  const [indText, setIndText] = useState("Setting up your client...");
  const [dotState, setDotState] = useState("responding");
  const [clientReply, setClientReply] = useState(null);
  const [muted, setMuted] = useState(false);
  const [talking, setTalking] = useState(false);
  const [clientReady, setClientReady] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  const recRef = useRef(null);
  const respondingRef = useRef(false);
  const mutedRef = useRef(false);
  const talkingRef = useRef(false);
  const convRef = useRef([]);
  const personalityRef = useRef(PERSONALITIES[Math.floor(Math.random() * PERSONALITIES.length)]);
  const bufferRef = useRef("");
  const convBoxRef = useRef(null);
  const startTimeRef = useRef(null);
  const timerRef = useRef(null);

  const addLine = useCallback(function(text, role) {
    const line = { text, role, id: Date.now() + Math.random() };
    convRef.current = convRef.current.concat([line]);
    setConversation(convRef.current.slice());
  }, []);

  useEffect(function() {
    if (convBoxRef.current) convBoxRef.current.scrollTop = convBoxRef.current.scrollHeight;
  }, [conversation]);

  function startTimer() {
    startTimeRef.current = Date.now();
    timerRef.current = setInterval(function() { setElapsed(Math.floor((Date.now() - startTimeRef.current) / 1000)); }, 1000);
  }

  function toggleMute() {
    const next = !mutedRef.current;
    mutedRef.current = next;
    setMuted(next);
    if (next && talkingRef.current) { talkingRef.current = false; setTalking(false); try { recRef.current && recRef.current.stop(); } catch(e) {} }
  }

  function isSpeechSupported() {
    return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
  }

  function setupRec() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      setIndText("Voice input not supported on this browser. Use Chrome on desktop for push-to-talk.");
      setDotState("idle");
      return null;
    }
    const rec = new SR();
    rec.continuous = true; rec.interimResults = true; rec.lang = "en-US";
    recRef.current = rec;
    rec.onresult = function(e) {
      if (!talkingRef.current) return;
      let interimText = "", finalText = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) finalText += e.results[i][0].transcript;
        else interimText += e.results[i][0].transcript;
      }
      setInterim(interimText);
      if (finalText) { bufferRef.current += " " + finalText.trim(); setInterim(bufferRef.current.trim()); }
    };
    rec.onerror = function(e) {
      if (e.error === "not-allowed") { setIndText("Microphone access denied — please allow mic access in browser settings."); setDotState("idle"); return; }
      if (e.error === "service-not-allowed") { setIndText("Voice not available on this browser. Please use Chrome."); setDotState("idle"); return; }
    };
    rec.onend = function() { if (talkingRef.current) setTimeout(function() { try { rec.start(); } catch(e) {} }, 100); };
    return rec;
  }

  function startTalking() {
    if (respondingRef.current || mutedRef.current || !clientReady) return;
    bufferRef.current = ""; setInterim("");
    talkingRef.current = true; setTalking(true);
    setIndText("Listening — press Done when finished"); setDotState("listening");
    if (!recRef.current) { setupRec(); }
    try { recRef.current.start(); } catch(e) {}
  }

  function stopTalking() {
    if (!talkingRef.current) return;
    talkingRef.current = false; setTalking(false); setInterim("");
    try { recRef.current && recRef.current.stop(); } catch(e) {}
    const said = bufferRef.current.trim();
    bufferRef.current = "";
    if (said) { handleTherapist(said); }
    else { setIndText("Session in progress — press Start talking when ready"); setDotState("client"); }
  }

  async function handleTherapist(text) {
    if (respondingRef.current) return;
    respondingRef.current = true;
    addLine(text, "therapist");
    setDotState("responding"); setIndText("Client is thinking..."); setClientReply("typing");
    const history = convRef.current.slice(-20).map(function(l) { return { role: l.role === "therapist" ? "user" : "assistant", content: l.text }; });
    try {
      const reply = await callAPI("/api/chat", { system: buildClientSystem(config.modality, config.issue, personalityRef.current, config.sessionType || "intake"), messages: history });
      addLine(reply, "client");
      setClientReply(reply);
      setDotState("client"); setIndText("Session in progress — press Start talking when ready");
      function afterSpeak() { respondingRef.current = false; setDotState("client"); setIndText("Session in progress — press Start talking when ready"); }
      if (config.respMode === "voice") { speakText(reply, afterSpeak); } else { afterSpeak(); }
    } catch(e) {
      setClientReply("Connection issue — please try again.");
      respondingRef.current = false; setIndText("Session in progress — press Start talking when ready");
    }
  }

  useEffect(function() {
    setupRec();
    async function init() {
      try {
        const reply = await callAPI("/api/chat", {
          system: buildClientSystem(config.modality, config.issue, personalityRef.current, config.sessionType || "intake"),
          messages: [{ role: "user", content: "You have just walked into the therapy room and sat down. The therapist is about to greet you. Say hello naturally and nothing more. One sentence only." }],
        });
        addLine(reply, "client");
        setClientReply(reply);
        setDotState("client"); setIndText("Session in progress — press Start talking when ready");
        function startListening() { setClientReady(true); startTimer(); }
        if (config.respMode === "voice") { speakText(reply, startListening); } else { startListening(); }
      } catch(e) { setIndText("Connection issue — please refresh and try again."); }
    }
    init();
  }, []);

  function handleEnd() {
    talkingRef.current = false;
    clearInterval(timerRef.current);
    try { recRef.current && recRef.current.stop(); } catch(e) {}
    window.speechSynthesis && window.speechSynthesis.cancel();
    onEnd(convRef.current.map(function(l) { return (l.role === "therapist" ? "Therapist: " : "Client: ") + l.text; }).join("\n"), elapsed);
  }

  return (
    <div>
      <div className="card">
        <div className="row">
          <div>
            <div style={{ fontWeight: 500 }}>Solo Practice</div>
            <div style={{ fontSize: "0.8rem", color: "var(--text2)", marginTop: 2 }}>
              <span className="badge">{config.modality}</span>{" "}<span className="badge">{config.issue}</span>{" "}<span className="badge">{config.sessionType || "intake"}</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ fontSize: "0.85rem", color: "var(--text3)", fontVariantNumeric: "tabular-nums" }}>{formatDuration(elapsed)}</div>
            <button className="btn btn-sm" onClick={toggleMute}>{muted ? "Unmute mic" : "Mute mic"}</button>
            <button className="btn btn-sm danger" onClick={handleEnd}>End session</button>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="indicator">
          <div className={"dot " + (muted ? "idle" : dotState)} />
          <div className="ind-text">{muted ? "Mic muted — client cannot hear you" : indText}</div>
        </div>
        {talking && interim && <div className="interim" style={{ marginTop: "0.5rem" }}>{interim}</div>}
        {!muted && clientReady && (
          <div style={{ marginTop: "0.75rem" }}>
            {!talking
              ? <button className="btn primary" onClick={startTalking}>Start talking</button>
              : <button className="btn" onClick={stopTalking} style={{ borderColor: "#D85A30", color: "#D85A30" }}>Done — send to client</button>
            }
          </div>
        )}
      </div>
      <div className="card">
        <div className="section-label">Session conversation</div>
        <div className="transcript-wrap" ref={convBoxRef}>
          {conversation.length === 0
            ? <div className="t-empty">Session will appear here...</div>
            : conversation.map(function(l) {
                return (
                  <div key={l.id} className={"t-line " + (l.role === "therapist" ? "therapist" : "client")}>
                    <span style={{ opacity: 0.45, fontSize: "0.75rem", marginRight: "0.4rem" }}>{l.role === "therapist" ? "You" : "Client"}</span>
                    {l.text}
                  </div>
                );
              })
          }
        </div>
      </div>
      {clientReply && (
        <div className="card">
          <div className="response-area">
            <div className="response-label cli">Client</div>
            <div className="response-text">{clientReply === "typing" ? <Typing /> : clientReply}</div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── REVIEW ────────────────────────────────────────────────────
function ReviewScreen({ config, transcript, duration, onReset }) {
  const [step, setStep] = useState("choose");
  const [reviewText, setReviewText] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const sessionType = config.sessionType || "intake";

  async function generate(mode) {
    setStep("loading");
    try {
      const text = await callAPI("/api/review", {
        transcript, modality: config.modality, issue: config.issue || "",
        mode: config.mode, sessionType, duration_seconds: duration || 0,
        intention: config.intention || "",
      });
      setReviewText(text);
      setStep("done");
      setSaving(true);
      await saveSession({
        student_name: config.studentName, mode: config.mode, modality: config.modality,
        session_type: sessionType, issue: config.issue || "", transcript,
        review: text, duration_seconds: duration || 0, intention: config.intention || "",
      });
      setSaving(false); setSaved(true);
      if (mode === "voice" && window.speechSynthesis) { speakText(text, function() {}); }
    } catch(e) { setReviewText("Connection issue — please try again."); setStep("done"); }
  }

  return (
    <div>
      <div className="header" style={{ paddingBottom: "1.5rem" }}>
        <h1>Session Review</h1>
        <p>{config.modality}{config.issue ? " — " + config.issue : ""} — {config.mode === "solo" ? "Solo Practice" : "Group Supervision"}
        {duration > 0 && " — " + formatDuration(duration)}</p>
      </div>

      {step === "choose" && (
        <div className="card">
          <div style={{ fontSize: "0.95rem", marginBottom: "1rem", color: "var(--text2)" }}>How would you like to receive your clinical review?</div>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button className="btn" style={{ flex: 1 }} onClick={function() { generate("text"); }}>Written only</button>
            <button className="btn" style={{ flex: 1 }} onClick={function() { generate("voice"); }}>Read aloud and written</button>
          </div>
        </div>
      )}

      {step === "loading" && (
        <div className="card">
          <div className="response-area">
            <div className="response-label sup">Clinical Review</div>
            <Typing />
            <div style={{ fontSize: "0.8rem", color: "var(--text3)", marginTop: "0.5rem" }}>Reviewing your session across all clinical dimensions...</div>
          </div>
        </div>
      )}

      {step === "done" && (
        <div>
          {saving && <div style={{ fontSize: "0.8rem", color: "var(--text3)", marginBottom: "0.5rem", textAlign: "center" }}>Saving session...</div>}
          {saved && <div style={{ fontSize: "0.8rem", color: "#2D6A4F", marginBottom: "0.5rem", textAlign: "center" }}>Session saved to your history.</div>}
          <div className="card">
            <div className="response-area">
              <div className="response-label sup">Clinical Review</div>
              <ReviewRenderer text={reviewText} />
            </div>
          </div>
          <button className="btn" onClick={onReset} style={{ marginTop: "0.5rem" }}>Start new session</button>
        </div>
      )}
    </div>
  );
}

// ── ROOT ──────────────────────────────────────────────────────
export default function Home() {
  const [screen, setScreen] = useState(function() {
    try { const saved = localStorage.getItem("clinicStudent"); return saved ? "welcome" : "name"; } catch(e) { return "name"; }
  });
  const [studentName, setStudentName] = useState(function() {
    try { return localStorage.getItem("clinicStudent") || ""; } catch(e) { return ""; }
  });
  const [config, setConfig] = useState(null);
  const [finalTranscript, setFinalTranscript] = useState("");
  const [finalDuration, setFinalDuration] = useState(0);

  function handleName(name, action) { setStudentName(name); if (action === "history") setScreen("history"); else setScreen("welcome"); }
  function handleStart(cfg) { setConfig(cfg); setScreen(cfg.mode); }
  function handleEnd(transcript, duration) { setFinalTranscript(transcript); setFinalDuration(duration || 0); setScreen("review"); }
  function handleReset() { setConfig(null); setFinalTranscript(""); setFinalDuration(0); setScreen("welcome"); }

  const [darkMode, setDarkMode] = useState(function() {
    try {
      const saved = localStorage.getItem("clinicTheme");
      if (saved) return saved === "dark";
      return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    } catch(e) { return false; }
  });

  useEffect(function() {
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
    try { localStorage.setItem("clinicTheme", darkMode ? "dark" : "light"); } catch(e) {}
  }, [darkMode]);

  return (
    <div className="app">
      <button
        className="theme-toggle"
        onClick={function() { setDarkMode(function(d) { return !d; }); }}
        title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        aria-label="Toggle dark mode"
      >
        {darkMode ? "☀" : "☾"}
      </button>
      {screen === "name" && <NameScreen onContinue={handleName} />}
      {screen === "history" && <HistoryScreen studentName={studentName} onBack={function() { setScreen("setup"); }} />}
      {screen === "welcome" && <WelcomeScreen studentName={studentName} onContinue={function() { setScreen("setup"); }} onHistory={function() { setScreen("history"); }} />}
      {screen === "setup" && <SetupScreen studentName={studentName} onStart={handleStart} onHistory={function() { setScreen("history"); }} />}
      {screen === "group" && <GroupScreen config={config} onEnd={handleEnd} />}
      {screen === "solo" && <SoloScreen config={config} onEnd={handleEnd} />}
      {screen === "review" && <ReviewScreen config={config} transcript={finalTranscript} duration={finalDuration} onReset={handleReset} />}
    </div>
  );
}
