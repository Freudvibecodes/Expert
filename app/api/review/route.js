export async function POST(req) {
  const { transcript, modality, issue, mode, sessionType } = await req.json();

  const MODALITY_CONTEXT = {
    SFBT: "Solution-Focused Brief Therapy — miracle question, scaling questions, exception-finding, compliments, future focus.",
    CBT: "Cognitive Behavioural Therapy — thought records, Socratic questioning, cognitive restructuring, behavioural activation.",
    "Narrative Therapy": "Narrative Therapy — externalisation, re-authoring, unique outcomes, definitional ceremony.",
    "Adlerian Therapy": "Adlerian Therapy — lifestyle assessment, early recollections, encouragement, social interest.",
    "Structural Family Therapy": "Structural Family Therapy — joining, enactment, reframing, boundary making, subsystems.",
    "Person-Centred Therapy": "Person-Centred Therapy — unconditional positive regard, empathy, congruence, non-directiveness.",
    DBT: "DBT — TIPP, DEAR MAN, chain analysis, validation, dialectical strategies.",
    ACT: "ACT — acceptance, defusion, present moment, values clarification, committed action.",
    "Psychodynamic Therapy": "Psychodynamic Therapy — transference, countertransference, free association, interpretation.",
    EFT: "Emotionally Focused Therapy — empathic reflection, evocative responding, enactment, attachment bonds.",
    "Gestalt Therapy": "Gestalt Therapy — empty chair, two-chair work, here-and-now focus, unfinished business.",
    "Motivational Interviewing": "Motivational Interviewing — OARS, change talk, rolling with resistance, developing discrepancy.",
    EMDR: "EMDR — bilateral stimulation, trauma processing, desensitisation, installation, body scan.",
    "Schema Therapy": "Schema Therapy — early maladaptive schemas, modes, limited reparenting, imagery rescripting.",
    "Existential Therapy": "Existential Therapy — freedom, responsibility, mortality, isolation, meaninglessness.",
    Integrative: "Integrative approach drawing on multiple modalities as clinically appropriate.",
  };

  const SESSION_TYPE_GUIDANCE = {
    intake: "INTAKE SESSION: Do not penalise absence of interventions or techniques. Focus on rapport, warmth, confidentiality handling, question quality, pacing, and how safe the client felt. Mark intervention-heavy dimensions as N/A.",
    early: "EARLY SESSION: Relationship still forming. Evaluate rapport, alliance building, goal exploration, early modality use. Some techniques expected but not full intervention.",
    mid: "MID-THERAPY SESSION: Intervention quality and technique execution are central. Evaluate all dimensions fully.",
    closing: "CLOSING SESSION: Evaluate consolidation of gains, termination handling, progress review, client readiness for independence.",
    crisis: "CRISIS SESSION: Evaluate safety assessment, risk management, stabilisation, empathy under pressure. Standard techniques not expected.",
  };

  const sessionLabel = { intake: "Intake", early: "Early", mid: "Mid-therapy", closing: "Closing", crisis: "Crisis" }[sessionType] || "General";
  const sessionGuidance = SESSION_TYPE_GUIDANCE[sessionType] || "";

  const system = `You are an expert clinical supervisor reviewing a graduate therapy student's session.

Modality: ${modality}
${MODALITY_CONTEXT[modality] || ""}
${mode === "solo" && issue ? `Presenting issue: ${issue}` : ""}
Session type: ${sessionLabel}
${sessionGuidance}

YOU MUST respond using ONLY the exact JSON format below. Do not add any text before or after the JSON. Do not use markdown. Return raw JSON only.

{
  "overview": "2-3 sentences describing the overall character of this session. What kind of therapist showed up? Be specific and grounded.",
  "dimensions": [
    {"name": "Rapport and therapeutic alliance", "rating": "Strong|Developing|Needs Work|N/A", "evidence": "Direct quote or close paraphrase from transcript"},
    {"name": "Modality adherence", "rating": "Strong|Developing|Needs Work|N/A", "evidence": "..."},
    {"name": "Intervention quality and technique execution", "rating": "Strong|Developing|Needs Work|N/A", "evidence": "..."},
    {"name": "Pacing", "rating": "Strong|Developing|Needs Work|N/A", "evidence": "..."},
    {"name": "Use of silence", "rating": "Strong|Developing|Needs Work|N/A", "evidence": "..."},
    {"name": "Question types (open vs closed, timing)", "rating": "Strong|Developing|Needs Work|N/A", "evidence": "..."},
    {"name": "Minimal encouragers", "rating": "Strong|Developing|Needs Work|N/A", "evidence": "..."},
    {"name": "Paraphrasing", "rating": "Strong|Developing|Needs Work|N/A", "evidence": "..."},
    {"name": "Reflecting meaning and value", "rating": "Strong|Developing|Needs Work|N/A", "evidence": "..."},
    {"name": "Probing and clarifying", "rating": "Strong|Developing|Needs Work|N/A", "evidence": "..."},
    {"name": "Summarising", "rating": "Strong|Developing|Needs Work|N/A", "evidence": "..."},
    {"name": "Focusing and session direction", "rating": "Strong|Developing|Needs Work|N/A", "evidence": "..."},
    {"name": "Signalling and transitioning", "rating": "Strong|Developing|Needs Work|N/A", "evidence": "..."},
    {"name": "Planning and goal-setting", "rating": "Strong|Developing|Needs Work|N/A", "evidence": "..."},
    {"name": "Thematic work", "rating": "Strong|Developing|Needs Work|N/A", "evidence": "..."},
    {"name": "Challenging and pointing out discrepancies", "rating": "Strong|Developing|Needs Work|N/A", "evidence": "..."},
    {"name": "Session management (opening, structure, closing)", "rating": "Strong|Developing|Needs Work|N/A", "evidence": "..."},
    {"name": "Use of self in the therapeutic relationship", "rating": "Strong|Developing|Needs Work|N/A", "evidence": "..."},
    {"name": "Transference and countertransference awareness", "rating": "Strong|Developing|Needs Work|N/A", "evidence": "..."},
    {"name": "Conflict and rupture management", "rating": "Strong|Developing|Needs Work|N/A", "evidence": "..."},
    {"name": "Ethical attunement", "rating": "Strong|Developing|Needs Work|N/A", "evidence": "..."},
    {"name": "Cultural humility", "rating": "Strong|Developing|Needs Work|N/A", "evidence": "..."},
    {"name": "Hypothesis formation", "rating": "Strong|Developing|Needs Work|N/A", "evidence": "..."},
    {"name": "Emotional attunement", "rating": "Strong|Developing|Needs Work|N/A", "evidence": "..."},
    {"name": "Managing own anxiety", "rating": "Strong|Developing|Needs Work|N/A", "evidence": "..."},
    {"name": "Collaboration and consent with client", "rating": "Strong|Developing|Needs Work|N/A", "evidence": "..."}
  ],
  "landed_well": [
    {"moment": "Specific quote or paraphrase from session", "why": "Why this was clinically effective"},
    {"moment": "...", "why": "..."},
    {"moment": "...", "why": "..."}
  ],
  "priority_focus": [
    {"area": "Name of area", "suggestion": "One concrete thing to try differently next time"},
    {"area": "Name of area", "suggestion": "..."}
  ],
  "explore_further": [
    {"concept": "Name of concept or technique", "reason": "Why it is relevant to this session"},
    {"concept": "...", "reason": "..."}
  ],
  "reflection_question": "One specific question for the student to sit with — grounded in this session, not generic."
}

Fill in EVERY dimension with a real rating and real evidence from the transcript. For dimensions not observable this session, write the rating as N/A and evidence as Not observed in this session. Do not skip any dimension.`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4000,
      system,
      messages: [
        {
          role: "user",
          content: `Transcript:\n\n${transcript}\n\nReturn the JSON review only. No other text.`,
        },
      ],
    }),
  });

  const data = await response.json();
  let text = data.content?.map((b) => b.text || "").join("") || "";

  // Strip any markdown code fences if present
  text = text.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```\s*$/i, "").trim();

  return Response.json({ text });
}
