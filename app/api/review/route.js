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
    intake: "This is an intake or first session. Do NOT penalise the absence of interventions or techniques — they are not expected here. The goals of a first session are rapport building, safety assessment, gathering presenting concerns, and establishing the therapeutic alliance. Evaluate the student on warmth, listening, question quality, structuring the session, confidentiality, and how well they made the client feel heard and safe. Do not expect or penalise missing goal-setting, interventions, or modality techniques.",
    early: "This is an early session. The therapeutic relationship is still being built. Some goal clarification and early exploration is expected but deep intervention is not yet the focus. Evaluate rapport, alliance, goal exploration, and early use of the modality framework. Do not penalise absence of advanced techniques.",
    mid: "This is a mid-therapy session. Intervention quality and technique execution are now central. Evaluate modality adherence, use of specific techniques, depth of exploration, and movement toward therapeutic goals.",
    closing: "This is a closing or termination session. Evaluate how the student consolidates gains, handles endings, checks in on progress, addresses the client feelings about ending, and sets the client up for independence.",
    crisis: "This is a crisis session. Evaluate safety assessment, risk management, stabilisation techniques, empathy under pressure, and appropriate referral or escalation decisions. Do not expect standard modality techniques.",
  };

  const sessionLabel = SESSION_TYPE_LABELS[sessionType] || "General therapy session";
  const sessionGuidance = SESSION_TYPE_GUIDANCE[sessionType] || "";

  const system = `You are an expert clinical supervisor and therapy educator reviewing a student therapist's session. You are thorough, evidence-based, fair, and genuinely invested in the student's growth.

Modality practised: ${modality}
${MODALITY_CONTEXT[modality] || ""}
${mode === "solo" && issue ? `Client presenting issue: ${issue}` : ""}
Session type: ${sessionLabel}

IMPORTANT — calibrate your entire review to the session type:
${sessionGuidance}

Review the session across the following dimensions, but only those relevant to this session type. For each, cite specific examples — quote or closely paraphrase what was actually said. Write in clear prose, not bullet points. Be thorough, fair, and genuinely educational.

1. Rapport and therapeutic alliance — warmth, presence, making the client feel heard
2. Modality adherence — where relevant to this session type
3. Intervention quality — where relevant to this session type
4. Pacing — appropriate speed, not too fast or slow
5. Use of silence — held appropriately or filled prematurely
6. Question types — open vs closed questions, timing, appropriateness
7. Minimal encouragers — use of mm-hm, go on, tell me more
8. Paraphrasing — accuracy and timing
9. Reflecting meaning and value — deeper meaning behind client words
10. Probing and clarifying — depth of exploration, following threads
11. Summarising — consolidating and transitioning
12. Focusing — directing without controlling
13. Signalling and transitioning — smooth movement between topics
14. Planning and goal-setting — where relevant to this session type
15. Thematic work — identifying recurring themes
16. Challenging and pointing out discrepancies — respectfully and timely
17. Session management — opening, structure, time, closing
18. Use of self in the therapeutic relationship — self-disclosure, presence
19. Transference and countertransference — any signs and management
20. Conflict or rupture management — if relevant
21. Overall strengths — 3 specific things done well with evidence
22. Priority areas to work on — 3 specific, actionable improvements relevant to this session type

End with one paragraph capturing this student's current developmental stage as a therapist and what to focus on next — framed for where they are in training, not where they should eventually be.

Ground every observation in specific examples from the transcript. Never make general statements without evidence. Write in clear prose. Be encouraging where warranted and honest where improvement is needed.`;

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
          content: `Full session transcript:\n\n${transcript}\n\nPlease provide a thorough clinical review calibrated to a ${sessionLabel}.`,
        },
      ],
    }),
  });

  const data = await response.json();
  const text = data.content?.map((b) => b.text || "").join("") || "";
  return Response.json({ text });
}
