export async function POST(req) {
  const { noteText, format, caseContext } = await req.json();

  const FORMAT_EVALUATION = {
    SOAP: `SOAP NOTE EVALUATION CRITERIA (based on exact template):

Required header elements: Client/ID, Date, Start Time, End Time, Counsellor Name and Credentials.

Sections to evaluate:
1. GOAL/OUTCOME/INTERVENTION: Must state the treatment goal, outcome being worked toward, and intervention used. Is it specific and clinically relevant?
2. MENTAL HEALTH STATUS EXAM: Must include observations on appearance, behaviour, affect, speech, thought content, orientation, and risk. Is it factual and observational?
3. SUBJECTIVE (S): Must contain what the CLIENT reported in their own words. Quotes are appropriate. Should not contain clinician interpretations.
4. OBJECTIVE (O): Must contain ONLY observable, measurable facts the clinician observed. No interpretations. Appearance, behaviour, affect, any assessments administered.
5. ASSESSMENT (A): Clinical interpretation only. Progress toward goals, response to treatment, risk assessment. Should not repeat subjective/objective content verbatim.
6. PLAN (P): Must include next session date/time/location, client homework or goals, referrals, any changes to treatment plan.
Required footer: Counsellor signature and date signed.`,

    DAP: `DAP NOTE EVALUATION CRITERIA (based on exact template):

Required header elements: Client/ID, Treatment Goal/Outcome/Intervention, Session Date, Start and Finish Time.

Sections to evaluate:
1. DATA (D): Must include ALL four sub-components: (a) focus of session, (b) descriptions and observations about client's current state, (c) interventions used and topics discussed, (d) client's response to interventions. Data combines subjective and objective information.
2. ASSESSMENT (A): Must include: client's progress, how client has responded to treatment, any diagnostic changes (if applicable), achievement of treatment goals, behaviour/affect/appearance of client.
3. PLAN (P): Must include: date/time/location of next session, goals or homework for client, referrals, any changes to current treatment plan.
Required footer: Counsellor name, signature, and date.`,

    TARP: `TARP NOTE EVALUATION CRITERIA (based on exact template):

Required header elements: Client Name/ID, Date, Start Time, End Time.

Sections to evaluate:
1. MENTAL HEALTH STATUS EXAM: Must include appearance, focus, speech, thought content and ability, and other relevant mental status observations. Factual and observational only.
2. T — TREATMENT: Must clearly state the treatment goal, objective, and intervention for this session.
3. A — ACTION: CRITICAL SECTION. Must use "Clinician..." language exclusively. Acceptable verbs: educated, assisted, prompted, coached, modeled, role-played, directed, inquired, processed. Must NOT contain quotes, must NOT use "I said/told/felt/had them." Must generalize and summarize — no word-for-word narrative of what was said.
4. R — RESPONSE: Must contain ONLY the client's words and behaviours. Direct quotes are appropriate and encouraged. Must NOT contain clinician perceptions or interpretations. Must be factual.
5. P — PLAN: Must include date/time/place of next session, focus of next session, any referrals or homework.
Required footer: Counsellor name, signature, and date.`,

    BIRP: `BIRP NOTE EVALUATION CRITERIA (based on exact template):

Required header elements: Client Name/ID, Date, Start Time, End Time, Treatment Goal/Objective/Intervention.

Sections to evaluate:
1. MENTAL HEALTH STATUS EXAM: Must include appearance, focus, speech, thought content and ability. Factual and observational only.
2. B — BEHAVIOUR: Must describe reported behaviour since last session. What did the client present with today? Their current presentation and what they brought to session.
3. I — INTERVENTION: CRITICAL SECTION. Must use "Counsellor/Clinician..." language exclusively. Acceptable verbs: educated, engaged, prompted, modeled, provided psychoeducation, processed, explored. Must NOT contain quotes, must NOT use "I." Must generalize — not narrate.
4. R — RESPONSE: Must contain ONLY the client's words and behaviours. Direct quotes are appropriate and encouraged. Must NOT contain clinician perceptions. Factual only.
5. P — PLAN: Must include date/time/place of next session, focus of next session, any referrals or homework.
Required footer: Counsellor name, signature, and date.`,
  };

  const GENERAL_RULES = `
GENERAL RULES FOR ALL NOTE FORMATS:
- Notes must be factual — not narrative, not a story, not the counsellor's opinion of the client
- No word-for-word detail of conversations
- Progress notes justify treatment — they are a factual account of service
- Intervention/Action sections: ONLY what the clinician did. Use "Clinician/Counsellor [verb]..." Acceptable verbs: educated, assisted, prompted, coached, accompanied, modeled, role-played, directed, inquired, processed, explored, provided psychoeducation, engaged. AVOID: told, explained, said, watched, gave, I felt, I had them, I asked
- Client Response sections: ONLY the client's words and behaviours. Direct quotes welcomed. NO clinician perceptions or interpretations
- Must include mental health status exam (where applicable to the format)
- Must include risk assessment information
- Must include goal/objective/intervention being addressed`;

  const system = `You are an expert clinical supervisor reviewing a graduate therapy student's progress note.

${FORMAT_EVALUATION[format] || "General progress note format."}

${GENERAL_RULES}

${caseContext ? `Case context for this note: ${caseContext}` : ""}

Review the student's note carefully against the exact criteria above and provide feedback in this exact JSON format:
{
  "overall": "2-3 sentence overall assessment of the note quality. Be specific about what kind of note this is and how well it follows the ${format} format.",
  "strengths": ["specific strength with direct example from their note", "another specific strength"],
  "issues": [
    {"section": "exact section name", "problem": "exactly what is wrong", "example": "the specific text from their note that illustrates the problem", "fix": "concrete guidance on how to correct it"},
    ...
  ],
  "missing": ["list of required elements or sections that are completely absent"],
  "revised_example": "Take ONE weak section from their note and rewrite it properly — showing exactly how it should look in ${format} format. Label which section you are rewriting.",
  "grade": "Competent | Developing | Needs Revision"
}

Grade criteria:
- Competent: All required sections present, correct language used, factual and appropriate, minor issues only
- Developing: Most sections present but notable issues with language, content placement, or missing elements
- Needs Revision: Significant problems — missing sections, wrong language in Action/Intervention, mixing subjective/objective content, narrative style

Be specific. Quote from their note directly. Be educational and constructive. This is a learning exercise.

Return raw JSON only. No text before or after.`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2000,
      system,
      messages: [{ role: "user", content: `Please review this ${format} progress note:\n\n${noteText}` }],
    }),
  });

  const data = await response.json();
  let text = data.content?.map((b) => b.text || "").join("") || "";
  text = text.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```\s*$/i, "").trim();
  return Response.json({ text });
}
