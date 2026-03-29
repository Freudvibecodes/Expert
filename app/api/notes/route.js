export async function POST(req) {
  const { noteText, format, caseContext } = await req.json();

  const FORMAT_GUIDES = {
    SOAP: `SOAP Format: S=Subjective (client's words/report), O=Objective (observable facts, mental status, assessments), A=Assessment (clinical interpretation, progress toward goals, risk), P=Plan (next session details, planned interventions).`,
    DAP: `DAP Format: D=Data (both subjective and objective combined — what client said and what clinician observed), A=Assessment (clinical interpretation, progress, risk), P=Plan (next steps, next session).`,
    TARP: `TARP Format: T=Treatment (the goal/objective being addressed), A=Action (what the CLINICIAN did — use "Clinician..." language only, no quotes, verbs: educated, assisted, prompted, coached, modeled, role-played, directed, inquired, processed), R=Response (what the CLIENT did/said — factual, direct quotes welcome, no clinician perceptions), P=Plan (next session details).`,
    BIRP: `BIRP Format: B=Behaviour (client's presenting behaviour/mood/concern this session), I=Intervention (what the CLINICIAN did — "Counsellor/Clinician..." language, no quotes, generalize), R=Response (client's reaction — factual, client's words, direct quotes encouraged, no clinician perceptions), P=Plan (next session details).`,
  };

  const system = `You are an expert clinical supervisor reviewing a graduate therapy student's progress note.

${FORMAT_GUIDES[format] || "General progress note format."}

Key rules for ALL note formats:
- Must be factual. Not narrative. Not a story.
- No word-for-word detail of conversations.
- Intervention/Action section: ONLY what the clinician did. Use "Clinician [verb]..." language. Acceptable verbs: educated, assisted, prompted, coached, accompanied, modeled, role-played, directed, inquired, processed, explored, provided psychoeducation, engaged. AVOID: told, explained, said, watched, gave, I felt, I had them.
- Client response section: ONLY the client's words and behaviours. Direct quotes encouraged. No clinician perceptions or interpretations.
- Must justify treatment — it is a factual account of service, not the clinician's view of the client.
- Should include: date, time, session type, client name, client DOB, clinician name and credentials, treatment goal, objective, intervention, mental status, risk assessment, changes since last visit, what was done, how client responded, next session plan.

${caseContext ? `Case context provided: ${caseContext}` : ""}

Review the student's note and provide feedback in this exact JSON format:
{
  "overall": "2-3 sentence overall assessment of the note quality",
  "strengths": ["specific strength with example from their note", "another strength"],
  "issues": [
    {"section": "section name", "problem": "what is wrong", "example": "the specific text from their note that illustrates this", "fix": "how to correct it"},
    ...
  ],
  "missing": ["list of required elements that are absent"],
  "revised_example": "A short example of how one weak section could be rewritten properly — show don't just tell",
  "grade": "Competent | Developing | Needs Revision"
}

Be specific. Quote their note directly. Be educational and constructive — not harsh. This is a learning exercise.

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
