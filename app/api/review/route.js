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

  const SESSION_TYPE_LABELS = {
    intake: "Intake / first session",
    early: "Early session",
    mid: "Mid-therapy session",
    closing: "Closing session",
    crisis: "Crisis session",
  };

  const SESSION_TYPE_GUIDANCE = {
    intake: "This is an intake or first session. Do NOT penalise absence of interventions or techniques — they are not expected. Goals are rapport, safety, history gathering, and alliance building. Evaluate warmth, listening, question quality, confidentiality handling, and how well the client felt heard. Do not penalise missing goal-setting, interventions, or modality techniques.",
    early: "This is an early session. The therapeutic relationship is still forming. Some goal clarification is expected but deep intervention is not yet the focus. Evaluate rapport, alliance, goal exploration, and early modality framework use.",
    mid: "This is a mid-therapy session. Intervention quality and technique execution are now central. Evaluate modality adherence, specific techniques, depth of exploration, and movement toward goals.",
    closing: "This is a closing session. Evaluate consolidation of gains, handling of endings, progress review, addressing the client's feelings about ending, and setting the client up for independence.",
    crisis: "This is a crisis session. Evaluate safety assessment, risk management, stabilisation, empathy under pressure, and appropriate referral decisions. Do not expect standard modality techniques.",
  };

  const sessionLabel = SESSION_TYPE_LABELS[sessionType] || "General therapy session";
  const sessionGuidance = SESSION_TYPE_GUIDANCE[sessionType] || "";

  const system = `You are an expert clinical supervisor reviewing a graduate therapy student's session. You are fair, warm, evidence-based, and invested in their growth. Your feedback should feel like a good supervision debrief — honest, specific, and encouraging without being soft.

Modality practised: ${modality}
${MODALITY_CONTEXT[modality] || ""}
${mode === "solo" && issue ? `Client presenting issue: ${issue}` : ""}
Session type: ${sessionLabel}

CALIBRATION: ${sessionGuidance}

Produce the review in EXACTLY this format — do not deviate from it:

---

OVERVIEW
Write 2-3 sentences capturing the overall character of this session. What kind of therapist showed up today? What was the dominant quality of the work? Be specific and grounded — not generic praise or criticism.

---

DIMENSIONS TABLE
Produce a markdown table with these exact columns: Dimension | Rating | Evidence from session

Rating must be one of: Strong | Developing | Needs Work

Only rate dimensions that are RELEVANT to this session type. For intake sessions, skip intervention-heavy dimensions. Include every dimension listed below that applies.

Dimensions to include where relevant:
1. Rapport and therapeutic alliance
2. Modality adherence
3. Intervention quality and technique execution
4. Pacing
5. Use of silence
6. Question types (open vs closed, timing)
7. Minimal encouragers
8. Paraphrasing
9. Reflecting meaning and value
10. Probing and clarifying
11. Summarising
12. Focusing and session direction
13. Signalling and transitioning
14. Planning and goal-setting
15. Thematic work
16. Challenging and pointing out discrepancies
17. Session management (opening, structure, closing)
18. Use of self in the therapeutic relationship
19. Transference and countertransference awareness
20. Conflict and rupture management
21. Ethical attunement
22. Cultural humility
23. Hypothesis formation
24. Emotional attunement
25. Managing own anxiety
26. Collaboration and consent with client

Evidence must be a direct quote or close paraphrase from the transcript — never generic. If something did not occur in the session, note "Not observed this session" under evidence and rate as N/A.

---

WHAT LANDED WELL
List 2-3 specific moments from the session that demonstrate genuine clinical skill. Quote or closely paraphrase what was actually said. Explain why each moment was effective clinically.

---

PRIORITY FOCUS FOR NEXT SESSION
Identify 1-2 things only — the highest leverage areas to work on. Be specific and actionable. For each one, suggest one concrete thing to try differently next time. Do not list everything that needs work — choose what matters most right now for this student's development.

---

EXPLORE FURTHER
Suggest 1-2 clinical concepts, techniques, or frameworks directly relevant to something that came up in this session. Frame it as an invitation to deepen their understanding, not a correction.

---

REFLECTION QUESTION
One single question for the student to sit with. It should prompt genuine self-reflection about this specific session — not generic. Something a good supervisor would ask at the end of a debrief to send the student away thinking.

---

Ground every observation in the transcript. Never make a claim without evidence. Be warm but honest. This student is in training — meet them where they are, not where they should eventually be.`;

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
          content: `Full session transcript:\n\n${transcript}\n\nPlease provide the clinical review in the exact format specified.`,
        },
      ],
    }),
  });

  const data = await response.json();
  const text = data.content?.map((b) => b.text || "").join("") || "";
  return Response.json({ text });
}
