"use client";
import { useState, useRef, useEffect, useCallback } from "react";

const MODALITIES = [
  "SFBT","CBT","Narrative Therapy","Adlerian Therapy","Structural Family Therapy",
  "Person-Centred Therapy","DBT","ACT","Psychodynamic Therapy","EFT","Gestalt Therapy",
  "Motivational Interviewing","EMDR","Schema Therapy","Existential Therapy","Integrative","Other",
];

const ISSUES = [
  "Randomised — surprise me","Anxiety","Depression","Grief and loss","Relationship conflict",
  "Family conflict","Trauma","Low self-esteem","Life transitions","Addiction","Anger management",
  "Identity and belonging","Work and burnout","Procrastination","People-pleasing / boundary difficulties",
  "Chronic guilt","Perfectionism","Health anxiety","Social isolation / loneliness","Imposter syndrome",
  "Decision paralysis","Body image distress","Existential drift",
];

const PERSONALITIES = [
  "somewhat withdrawn and slow to trust, but genuinely wants help",
  "emotionally expressive and tends to over-explain",
  "guarded and intellectualises feelings",
  "quietly desperate but presents as composed",
  "resistant at first, warms up with patience",
  "chatty and deflects with humour",
  "introspective but struggles to articulate feelings",
  "presents as fine on the surface but clearly is not",
];

const MODALITY_CONTEXT = {
  "SFBT":"Solution-Focused Brief Therapy — miracle question, scaling questions, exception-finding, compliments, future focus.",
  "CBT":"Cognitive Behavioural Therapy — thought records, Socratic questioning, cognitive restructuring, behavioural activation.",
  "Narrative Therapy":"Narrative Therapy — externalisation, re-authoring, unique outcomes, definitional ceremony.",
  "Adlerian Therapy":"Adlerian Therapy — lifestyle assessment, early recollections, encouragement, social interest.",
  "Structural Family Therapy":"Structural Family Therapy — joining, enactment, reframing, boundary making, subsystems.",
  "Person-Centred Therapy":"Person-Centred Therapy — unconditional positive regard, empathy, congruence, non-directiveness.",
  "DBT":"DBT — TIPP, DEAR MAN, chain analysis, validation, dialectical strategies.",
  "ACT":"ACT — acceptance, defusion, present moment, values clarification, committed action.",
  "Psychodynamic Therapy":"Psychodynamic Therapy — transference, countertransference, free association, interpretation.",
  "EFT":"Emotionally Focused Therapy — empathic reflection, evocative responding, enactment, attachment bonds.",
  "Gestalt Therapy":"Gestalt Therapy — empty chair, two-chair work, here-and-now focus, unfinished business.",
  "Motivational Interviewing":"Motivational Interviewing — OARS, change talk, rolling with resistance, developing discrepancy.",
  "EMDR":"EMDR — bilateral stimulation, trauma processing, desensitisation, installation, body scan.",
  "Schema Therapy":"Schema Therapy — early maladaptive schemas, modes, limited reparenting, imagery rescripting.",
  "Existential Therapy":"Existential Therapy — freedom, responsibility, mortality, isolation, meaninglessness.",
  "Integrative":"Integrative approach drawing on multiple modalities as clinically appropriate.",
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

function buildClientSystem(modality, issue, personality) {
  const issueText = issue === "Randomised — surprise me"
    ? "a clinically rich presenting issue of your own choosing — do not reveal what it is upfront"
    : issue;
  return `You are playing a real therapy client in a graduate training session. The student therapist is practising ${modality}.

Your presenting issue: ${issueText}
Your personality: ${personality}

Rules:
1. Reveal your presenting problem gradually — in small natural pieces, the way a real client would. Never dump it all at once.
2. Keep responses short — 1 to 4 sentences. Real clients do not monologue.
3. React authentically to question quality. Great open question means open up more. Closed question means short answer. Clumsy or leading question means feel slightly put off.
4. Show emotional complexity — hesitation, deflection, moments of vulnerability followed by pulling back.
5. Never break character. You are the client throughout the entire session.
6. When the therapist closes the session properly, respond naturally as a client would. Do not initiate the ending yourself.
7. Speak only words the client would say out loud. No asterisks, no stage directions, no narration like shifts in chair or pauses. Pure spoken dialogue only.`;
}

async function callAPI(endpoint, body) {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (data.error) {
    console.error("API Error:", data.error);
    return "Error: " + JSON.stringify(data.error);
  }
  return data.text || "";
}

function Typing() {
  return (
    <div className="typing">
      <div className="tdot" />
      <div className="tdot" />
      <div className="tdot" />
    </div>
  );
}

function getBestVoice() {
  const voices = window.speechSynthesis.getVoices();
  const preferred = [
    "Google UK English Female",
    "Google US English",
    "Microsoft Aria Online (Natural)",
    "Microsoft Jenny Online (Natural)",
    "Microsoft Guy Online (Natural)",
    "Samantha",
    "Karen",
    "Daniel",
  ];
  for (const name of preferred) {
    const v = voices.find(v => v.name === name);
    if (v) return v;
  }
  return voices.find(v => v.lang.startsWith("en") && !v.name.toLowerCase().includes("compact")) || null;
}

function speakText(text, cb) {
  if (!window.speechSynthesis) { cb && cb(); return; }
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  const voice = getBestVoice();
  if (voice) utt.voice = voice;
  utt.rate = 0.88;
  utt.pitch = 1.05;
  utt.volume = 1;
  utt.onend = cb;
  utt.onerror = cb;
  window.speechSynthesis.speak(utt);
}

// ── SETUP ─────────────────────────────────────────────────────
function SetupScreen({ onStart }) {
  const [mode, setMode] = useState("group");
  const [gModality, setGModality] = useState("");
  const [gRole, setGRole] = useState("therapist");
  const [sModality, setSModality] = useState("");
  const [sIssue, setSIssue] = useState("Randomised — surprise me");
  const [sRespMode, setSRespMode] = useState("voice");

  function handleStart() {
    if (mode === "group") {
      if (!gModality) { alert("Please select a modality."); return; }
      onStart({ mode: "group", modality: gModality, role: gRole });
    } else {
      if (!sModality) { alert("Please select a modality."); return; }
      onStart({ mode: "solo", modality: sModality, issue: sIssue, respMode: sRespMode });
    }
  }

  return (
    <div>
      <div className="header">
        <h1>Clinical Supervision</h1>
        <p>A training platform for graduate therapy students</p>
      </div>
      <div className="card">
        <div className="tabs">
          <button className={"tab" + (mode === "group" ? " active" : "")} onClick={() => setMode("group")}>Group Supervision</button>
          <button className={"tab" + (mode === "solo" ? " active" : "")} onClick={() => setMode("solo")}>Solo Practice</button>
        </div>

        {mode === "group" && (
          <div>
            <p style={{ fontSize: "0.875rem", color: "var(--text2)", marginBottom: "1.25rem", lineHeight: 1.7 }}>
              Listen to your group session. Say <strong>Hey Claude</strong> at any point for live guidance. A full clinical review is generated at the end.
            </p>
            <div className="field">
              <label>Modality being practised</label>
              <select value={gModality} onChange={function(e) { setGModality(e.target.value); }}>
                <option value="">Select modality...</option>
                {MODALITIES.map(function(m) { return <option key={m}>{m}</option>; })}
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
          </div>
        )}

        {mode === "solo" && (
          <div>
            <p style={{ fontSize: "0.875rem", color: "var(--text2)", marginBottom: "1.25rem", lineHeight: 1.7 }}>
              Practice solo. Claude plays a real client with a randomised personality. Receive a full clinical review when you close the session.
            </p>
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
              <label>Client response mode</label>
              <select value={sRespMode} onChange={function(e) { setSRespMode(e.target.value); }}>
                <option value="voice">Voice — client speaks responses aloud</option>
                <option value="text">Text — client responds in writing</option>
              </select>
            </div>
          </div>
        )}

        <button className="btn primary" onClick={handleStart}>Begin session</button>
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

  const recRef = useRef(null);
  const activeRef = useRef(true);
  const heyModeRef = useRef(false);
  const qBufferRef = useRef("");
  const silTimerRef = useRef(null);
  const transcriptRef = useRef([]);

  const addLine = useCallback(function(text, type) {
    const line = { text: text, type: type, id: Date.now() + Math.random() };
    transcriptRef.current = transcriptRef.current.concat([line]);
    setTranscript(transcriptRef.current.slice());
  }, []);

  const triggerResponse = useCallback(async function() {
    const q = qBufferRef.current.trim();
    qBufferRef.current = "";
    heyModeRef.current = false;
    if (!q) return;
    activeRef.current = false;
    try { recRef.current.stop(); } catch(e) {}
    setDotState("responding");
    setIndText("Supervisor is thinking...");
    setIsResponding(true);
    setSupervisorReply("typing");
    const ctx = transcriptRef.current.slice(-40).map(function(l) { return l.text; }).join("\n");
    const msg = "Session transcript so far:\n" + (ctx || "(session just started)") + "\n\nStudent just asked you: \"" + q + "\"";
    try {
      const reply = await callAPI("/api/chat", {
        system: buildGroupSystem(config.modality, config.role),
        messages: [{ role: "user", content: msg }],
      });
      setSupervisorReply(reply);
      addLine("[Supervisor]: " + reply, "supervisor-line");
      speakText(reply, function() {
        setIsResponding(false);
        setDotState("listening");
        setIndText("Listening to session...");
        activeRef.current = true;
        try { recRef.current.start(); } catch(e) {}
      });
    } catch(e) {
      setSupervisorReply("Connection issue — please try again.");
      setIsResponding(false);
      setDotState("listening");
      setIndText("Listening to session...");
      activeRef.current = true;
      try { recRef.current.start(); } catch(e) {}
    }
  }, [config, addLine]);

  useEffect(function() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { setIndText("Voice not supported — please use Chrome."); return; }
    const rec = new SR();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = "en-US";
    recRef.current = rec;

    rec.onresult = function(e) {
      let interimText = "";
      let finalText = "";
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
          if (before) addLine(before, "");
          addLine(after, "trigger");
          qBufferRef.current = after.replace(/hey claude/gi, "").trim();
          clearTimeout(silTimerRef.current);
          silTimerRef.current = setTimeout(triggerResponse, 2200);
        } else {
          addLine(cleaned, "");
        }
      } else {
        addLine(cleaned, "");
        qBufferRef.current += " " + cleaned;
        clearTimeout(silTimerRef.current);
        silTimerRef.current = setTimeout(triggerResponse, 2200);
      }
    };

    rec.onerror = function(e) {
      if (e.error === "not-allowed") { setIndText("Microphone access denied."); return; }
      if (activeRef.current) setTimeout(function() { try { rec.start(); } catch(e) {} }, 800);
    };
    rec.onend = function() {
      if (activeRef.current && !isResponding) setTimeout(function() { try { rec.start(); } catch(e) {} }, 200);
    };

    try { rec.start(); } catch(e) {}

    return function() {
      activeRef.current = false;
      clearTimeout(silTimerRef.current);
      try { rec.stop(); } catch(e) {}
    };
  }, [addLine, triggerResponse]);

  function handleEnd() {
    activeRef.current = false;
    try { recRef.current.stop(); } catch(e) {}
    onEnd(transcriptRef.current.map(function(l) { return l.text; }).join("\n"));
  }

  return (
    <div>
      <div className="card">
        <div className="row">
          <div>
            <div style={{ fontWeight: 500 }}>Group Supervision</div>
            <div style={{ fontSize: "0.8rem", color: "var(--text2)", marginTop: 2 }}>
              <span className="badge">{config.modality}</span>
              {" "}
              <span className="badge">{config.role}</span>
            </div>
          </div>
          <button className="btn btn-sm danger" onClick={handleEnd}>End and review</button>
        </div>
      </div>
      <div className="card">
        <div className="indicator">
          <div className={"dot " + dotState} />
          <div className="ind-text">{indText}</div>
        </div>
        {interim && <div className="interim">{interim}</div>}
        <div className="hint" style={{ marginTop: "0.5rem" }}>Say <strong>Hey Claude</strong> followed by your question at any point.</div>
      </div>
      <div className="card">
        <div className="section-label">Live transcript</div>
        <div className="transcript-wrap">
          {transcript.length === 0
            ? <div className="t-empty">Transcript will appear here as the session unfolds...</div>
            : transcript.map(function(l) { return <div key={l.id} className={"t-line " + l.type}>{l.text}</div>; })
          }
        </div>
      </div>
      {supervisorReply && (
        <div className="card">
          <div className="response-area">
            <div className="response-label sup">Supervisor</div>
            <div className="response-text">
              {supervisorReply === "typing" ? <Typing /> : supervisorReply}
            </div>
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

  const recRef = useRef(null);
  const activeRef = useRef(false);
  const respondingRef = useRef(false);
  const convRef = useRef([]);
  const personalityRef = useRef(PERSONALITIES[Math.floor(Math.random() * PERSONALITIES.length)]);
  const speechTimerRef = useRef(null);
  const therapistBufferRef = useRef("");

  const addLine = useCallback(function(text, role) {
    const line = { text: text, role: role, id: Date.now() + Math.random() };
    convRef.current = convRef.current.concat([line]);
    setConversation(convRef.current.slice());
  }, []);

  function startMic() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { setIndText("Voice not supported — please use Chrome."); return; }
    const rec = new SR();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = "en-US";
    recRef.current = rec;

    rec.onresult = function(e) {
      if (respondingRef.current) return;
      let interimText = "";
      let finalText = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) finalText += e.results[i][0].transcript;
        else interimText += e.results[i][0].transcript;
      }
      setInterim(interimText);
      if (finalText) {
        setInterim("");
        therapistBufferRef.current += " " + finalText.trim();
        clearTimeout(speechTimerRef.current);
        speechTimerRef.current = setTimeout(function() {
          const said = therapistBufferRef.current.trim();
          therapistBufferRef.current = "";
          if (said) handleTherapist(said);
        }, 1800);
      }
    };

    rec.onerror = function(e) {
      if (e.error === "not-allowed") { setIndText("Microphone access denied."); return; }
      if (activeRef.current && !respondingRef.current) setTimeout(function() { try { rec.start(); } catch(e) {} }, 800);
    };
    rec.onend = function() {
      if (activeRef.current && !respondingRef.current) setTimeout(function() { try { rec.start(); } catch(e) {} }, 200);
    };

    try { rec.start(); } catch(e) {}
  }

  async function handleTherapist(text) {
    if (respondingRef.current) return;
    respondingRef.current = true;
    activeRef.current = false;
    try { recRef.current.stop(); } catch(e) {}
    addLine(text, "therapist");
    setDotState("responding");
    setIndText("Client is thinking...");
    setClientReply("typing");

    const history = convRef.current.slice(-20).map(function(l) {
      return { role: l.role === "therapist" ? "user" : "assistant", content: l.text };
    });

    try {
      const reply = await callAPI("/api/chat", {
        system: buildClientSystem(config.modality, config.issue, personalityRef.current),
        messages: history,
      });
      addLine(reply, "client");
      setClientReply(reply);
      setDotState("client");
      setIndText("Session in progress — you are the therapist");

      function afterSpeak() {
        respondingRef.current = false;
        activeRef.current = true;
        try { recRef.current.start(); } catch(e) {}
      }

      if (config.respMode === "voice") {
        speakText(reply, afterSpeak);
      } else {
        afterSpeak();
      }
    } catch(e) {
      setClientReply("Connection issue — please try again.");
      respondingRef.current = false;
      activeRef.current = true;
      try { recRef.current.start(); } catch(e) {}
    }
  }

  useEffect(function() {
    async function init() {
      try {
        const reply = await callAPI("/api/chat", {
          system: buildClientSystem(config.modality, config.issue, personalityRef.current),
          messages: [{ role: "user", content: "The therapist has just welcomed you in. You have just sat down. You have not spoken yet. Wait for them to begin. Give a brief natural settling-in response, spoken words only, no asterisks or stage directions." }],
        });
        addLine(reply, "client");
        setClientReply(reply);
        setDotState("client");
        setIndText("Session in progress — you are the therapist");

        function startListening() {
          activeRef.current = true;
          startMic();
        }

        if (config.respMode === "voice") {
          speakText(reply, startListening);
        } else {
          startListening();
        }
      } catch(e) {
        setIndText("Connection issue — please refresh and try again.");
      }
    }
    init();
  }, []);

  function handleEnd() {
    activeRef.current = false;
    clearTimeout(speechTimerRef.current);
    try { recRef.current.stop(); } catch(e) {}
    window.speechSynthesis && window.speechSynthesis.cancel();
    onEnd(convRef.current.map(function(l) {
      return (l.role === "therapist" ? "Therapist: " : "Client: ") + l.text;
    }).join("\n"));
  }

  return (
    <div>
      <div className="card">
        <div className="row">
          <div>
            <div style={{ fontWeight: 500 }}>Solo Practice</div>
            <div style={{ fontSize: "0.8rem", color: "var(--text2)", marginTop: 2 }}>
              <span className="badge">{config.modality}</span>
              {" "}
              <span className="badge">{config.issue}</span>
            </div>
          </div>
          <button className="btn btn-sm danger" onClick={handleEnd}>End session</button>
        </div>
      </div>
      <div className="card">
        <div className="indicator">
          <div className={"dot " + dotState} />
          <div className="ind-text">{indText}</div>
        </div>
        {interim && <div className="interim">{interim}</div>}
        <div className="hint" style={{ marginTop: "0.5rem" }}>Speak naturally — the microphone is always on. The client responds after you pause.</div>
      </div>
      <div className="card">
        <div className="section-label">Session conversation</div>
        <div className="transcript-wrap">
          {conversation.length === 0
            ? <div className="t-empty">Session will appear here...</div>
            : conversation.map(function(l) {
                return (
                  <div key={l.id} className={"t-line " + (l.role === "therapist" ? "therapist" : "client")}>
                    <span style={{ opacity: 0.45, fontSize: "0.75rem", marginRight: "0.4rem" }}>
                      {l.role === "therapist" ? "You" : "Client"}
                    </span>
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
            <div className="response-text">
              {clientReply === "typing" ? <Typing /> : clientReply}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── REVIEW ────────────────────────────────────────────────────
function ReviewScreen({ config, transcript, onReset }) {
  const [step, setStep] = useState("choose");
  const [reviewText, setReviewText] = useState("");

  async function generate(mode) {
    setStep("loading");
    try {
      const text = await callAPI("/api/review", {
        transcript: transcript,
        modality: config.modality,
        issue: config.issue || "",
        mode: config.mode,
      });
      setReviewText(text);
      setStep("done");
      if (mode === "voice" && window.speechSynthesis) {
        speakText(text, function() {});
      }
    } catch(e) {
      setReviewText("Connection issue — please try again.");
      setStep("done");
    }
  }

  return (
    <div>
      <div className="header" style={{ paddingBottom: "1.5rem" }}>
        <h1>Session Review</h1>
        <p>{config.modality}{config.issue ? " — " + config.issue : ""} — {config.mode === "solo" ? "Solo Practice" : "Group Supervision"}</p>
      </div>

      {step === "choose" && (
        <div className="card">
          <div style={{ fontSize: "0.95rem", marginBottom: "1rem", color: "var(--text2)" }}>
            How would you like to receive your clinical review?
          </div>
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
            <div style={{ fontSize: "0.8rem", color: "var(--text3)", marginTop: "0.5rem" }}>
              Reviewing your session across all clinical dimensions...
            </div>
          </div>
        </div>
      )}

      {step === "done" && (
        <div>
          <div className="card">
            <div className="response-area">
              <div className="response-label sup">Clinical Review</div>
              <div className="review-text">{reviewText}</div>
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
  const [screen, setScreen] = useState("setup");
  const [config, setConfig] = useState(null);
  const [finalTranscript, setFinalTranscript] = useState("");

  function handleStart(cfg) {
    setConfig(cfg);
    setScreen(cfg.mode);
  }

  function handleEnd(transcript) {
    setFinalTranscript(transcript);
    setScreen("review");
  }

  function handleReset() {
    setConfig(null);
    setFinalTranscript("");
    setScreen("setup");
  }

  return (
    <div className="app">
      {screen === "setup" && <SetupScreen onStart={handleStart} />}
      {screen === "group" && <GroupScreen config={config} onEnd={handleEnd} />}
      {screen === "solo" && <SoloScreen config={config} onEnd={handleEnd} />}
      {screen === "review" && <ReviewScreen config={config} transcript={finalTranscript} onReset={handleReset} />}
    </div>
  );
}
