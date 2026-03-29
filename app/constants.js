export const MODALITIES = [
  "SFBT","CBT","Narrative Therapy","Adlerian Therapy","Structural Family Therapy",
  "Person-Centred Therapy","DBT","ACT","Psychodynamic Therapy","EFT","Gestalt Therapy",
  "Motivational Interviewing","EMDR","Schema Therapy","Existential Therapy","Integrative","Other",
];

export const ISSUES = [
  "Randomised — surprise me","Anxiety","Depression","Grief and loss","Relationship conflict",
  "Family conflict","Trauma","Low self-esteem","Life transitions","Addiction","Anger management",
  "Identity and belonging","Work and burnout","Procrastination","People-pleasing / boundary difficulties",
  "Chronic guilt","Perfectionism","Health anxiety","Social isolation / loneliness","Imposter syndrome",
  "Decision paralysis","Body image distress","Existential drift",
];

export const PERSONALITIES = [
  "somewhat withdrawn and slow to trust, but genuinely wants help",
  "emotionally expressive and tends to over-explain",
  "guarded and intellectualises feelings",
  "quietly desperate but presents as composed",
  "resistant at first, warms up with patience",
  "chatty and deflects with humour",
  "introspective but struggles to articulate feelings",
  "presents as fine on the surface but clearly is not",
];

export const MODALITY_CONTEXT = {
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

export const MAINTAINING_MECHANISMS = {
  "Anxiety": ["Threat amplification", "Avoidance", "Safety behaviours", "Intolerance of uncertainty"],
  "Depression": ["Withdrawal", "Negative self-schema", "Shame", "Meaning collapse"],
  "Relationship conflict": ["Attachment insecurity", "Reactivity cycles", "Projection", "Vulnerability avoidance"],
  "Low self-esteem": ["Internalized critic", "Conditions of worth", "Comparison identity"],
  "Trauma": ["Hyperarousal", "Avoidance", "Dissociation", "Shame"],
  "Procrastination": ["Anxiety avoidance", "Perfectionism", "Shame anticipation"],
  "Anger": ["Secondary emotion masking hurt", "Threat bias", "Control strategies"],
  "Addiction": ["Emotion regulation deficit", "Relief cycle", "Shame-relapse loop"],
  "Grief": ["Attachment rupture", "Meaning disruption", "Avoidance of grief waves"],
  "Life transitions": ["Identity instability", "Value confusion", "Freedom-responsibility tension"],
  "Burnout": ["Chronic overextension without recovery", "Role over-identification", "Boundary failure", "Perfectionistic standards", "Suppressed resentment", "Values-behaviour misalignment"],
  "People-pleasing": ["Fear of rejection or abandonment", "Conditional worth schema", "Conflict avoidance", "Externalized self-definition", "Hyper-attunement to others"],
  "Chronic guilt": ["Inflated responsibility beliefs", "Moral perfectionism", "Fear of harming others", "Unresolved attachment injury", "Fusion of thought and action"],
  "Perfectionism": ["Shame avoidance", "All-or-nothing cognition", "Identity fused with achievement", "Fear of exposure", "Procrastination as self-protection"],
  "Health anxiety": ["Catastrophic misinterpretation of bodily cues", "Reassurance-seeking cycles", "Intolerance of uncertainty", "Hypervigilance to threat", "Checking behaviours reinforcing fear"],
  "Social isolation": ["Rejection sensitivity", "Avoidant coping", "Mind-reading bias", "Fear of vulnerability", "Self-fulfilling withdrawal loops"],
  "Imposter syndrome": ["External attribution of success", "Internal attribution of failure", "Comparison-based self-evaluation", "Fear of exposure", "Core inadequacy schema"],
  "Decision paralysis": ["Fear of regret", "Intolerance of ambiguity", "Over-analysis as anxiety regulation", "Avoidance of responsibility", "Perceived permanence of choice"],
  "Body image distress": ["Internalized comparison standards", "Shame and self-objectification", "Conditional attractiveness beliefs", "Social reinforcement loops", "Control attempts to manage insecurity"],
  "Existential drift": ["Identity diffusion", "Meaning deficit", "Emotional numbing", "Chronic distraction", "Lack of commitment to values", "Avoidance of long-term responsibility"],
};

export const NOTE_FORMATS = {
  SOAP: {
    name: "SOAP",
    sections: ["Goal/Outcome/Intervention", "Mental Health Status Exam", "Subjective", "Objective", "Assessment", "Plan"],
    template: `SOAP Note Template:

Client/ID: _______________
Date: _______________ Start Time: _______________ End Time: _______________
Counsellor Name and Credentials: _______________

GOAL / OUTCOME / INTERVENTION:
[State the treatment goal, outcome being worked toward, and intervention used this session]

MENTAL HEALTH STATUS EXAM:
[Appearance, behaviour, affect, speech, thought content, orientation, risk]

SUBJECTIVE:
[What the client reported — their words, feelings, concerns. Use quotes where appropriate.]

OBJECTIVE:
[Observable, measurable facts only. What the clinician observed — appearance, behaviour, affect. Any standardized assessments administered.]

ASSESSMENT:
[Clinical interpretation. Progress toward goals. How the client is responding to treatment. Risk assessment.]

PLAN:
[Next session date, time, location. Goals or homework for client. Any referrals. Changes to treatment plan.]

Counsellor Signature: _______________ Date Signed: _______________`,
    guidance: `SOAP Note — what goes in each section:
• Goal/Outcome/Intervention: State the treatment goal, the outcome being targeted, and the intervention used this session.
• Mental Health Status Exam: Appearance, focus, speech, thought content and ability, affect, orientation, risk.
• Subjective (S): What the CLIENT reported — their words, feelings, complaints, concerns. Use quotes where appropriate.
• Objective (O): Observable, measurable FACTS only. What the clinician observed — appearance, behaviour, affect. Any assessments administered. No interpretations.
• Assessment (A): Clinical interpretation. Progress toward goals, how client is responding to treatment, risk level.
• Plan (P): Next session date/time/location. Client homework or goals. Referrals. Any changes to treatment plan.`
  },
  DAP: {
    name: "DAP",
    sections: ["Treatment Goal/Outcome/Intervention", "Session Date & Time", "Data", "Assessment", "Plan"],
    template: `DAP Note Template:

Client/ID: _______________
Treatment Goal/Outcome/Intervention: _______________

Session Date: _______________
Start and Finish Time: _______________

DATA:
• Focus of session:
• Descriptions and observations about the client's current state:
• Interventions used during the session and topics discussed:
• Client's response to interventions:

ASSESSMENT:
• Client's progress:
• How the client has responded to treatment:
• Changes to client's diagnosis (if applicable):
• Achievement of treatment goals:
• Behaviour, affect, appearance of client:

PLAN:
• Date, time, and location of next session:
• Goals or homework for client:
• Referrals:
• Any changes to current treatment plan:

Counsellor Name and Signature: _______________ Date: _______________`,
    guidance: `DAP Note — what goes in each section:
• Treatment Goal/Outcome/Intervention: Clearly state what goal is being worked on, the outcome targeted, and the intervention.
• Data (D): Combines subjective and objective. Include: focus of session, observations about client's current state, interventions used and topics discussed, client's response to interventions.
• Assessment (A): Client's progress, how they have responded to treatment, any diagnostic changes, achievement of goals, behaviour/affect/appearance.
• Plan (P): Date/time/location of next session, client homework or goals, referrals, any changes to treatment plan.`
  },
  TARP: {
    name: "TARP",
    sections: ["Mental Health Status Exam", "Treatment", "Action", "Response", "Plan"],
    template: `TARP Note Template:

Client Name/ID: _______________
Date: _______________ Start Time: _______________ End Time: _______________

MENTAL HEALTH STATUS EXAM:
[Appearance, focus, speech, thought content and ability, etc.]

T — TREATMENT:
• Treatment Goal:
• Objective:
• Intervention:

A — ACTION (Clinician interventions):
[Use "Clinician..." language only. Clinician educated / assisted / prompted / coached / modeled / role-played / directed / inquired / processed. No quotes. No "I said." Generalize and summarize.]

R — RESPONSE (Client's response):
[How did the client respond to the interventions? What did they say? Direct quotes welcome. Client words and behaviours only — no clinician perceptions.]

P — PLAN:
• Date, time, place of next session:
• Focus of next session:
• Any referrals or homework:

Counsellor Name and Signature: _______________ Date: _______________`,
    guidance: `TARP Note — what goes in each section:
• Mental Health Status Exam: Appearance, focus, speech, thought content and ability, affect, orientation.
• Treatment (T): Treatment goal, objective being worked on, and intervention used this session.
• Action (A): What the CLINICIAN did. Must use "Clinician..." language. Use verbs: educated, assisted, prompted, coached, modeled, role-played, directed, inquired, processed. NO quotes. NO "I said/told." Generalize — do not narrate word-for-word.
• Response (R): How the CLIENT responded. Their words and behaviours only. Direct quotes are welcome. Do NOT include clinician perceptions or interpretations.
• Plan (P): Date/time/place of next session, focus of next session, any referrals or homework.`
  },
  BIRP: {
    name: "BIRP",
    sections: ["Treatment Goal/Objective/Intervention", "Mental Health Status Exam", "Behaviour", "Intervention", "Response", "Plan"],
    template: `BIRP Note Template:

Client Name/ID: _______________
Date: _______________ Start Time: _______________ End Time: _______________
Treatment Goal/Objective/Intervention: _______________

MENTAL HEALTH STATUS EXAM:
[Appearance, focus, speech, thought content and ability, etc.]

B — BEHAVIOUR:
[Describe reported behaviour since last session. What did the client bring in today?]

I — INTERVENTION (Counsellor interventions):
[Use "Counsellor/Clinician..." language. Generalize — no quotes, no "I told them." Use verbs: educated, engaged, prompted, modeled, provided psychoeducation, processed, explored.]

R — RESPONSE (Client's response):
[How did the client respond to interventions? What did they say? Direct quotes welcome. Client words and behaviours only — no clinician perceptions.]

P — PLAN:
• Date, time, place of next session:
• Focus of next session:
• Any referrals or homework:

Counsellor Name and Signature: _______________ Date: _______________`,
    guidance: `BIRP Note — what goes in each section:
• Treatment Goal/Objective/Intervention: State clearly at the top.
• Mental Health Status Exam: Appearance, focus, speech, thought content and ability, affect, orientation.
• Behaviour (B): Describe reported behaviour since last session. What the client brought to this session. Their current presentation.
• Intervention (I): What the COUNSELLOR/CLINICIAN did. Must use "Counsellor/Clinician..." language. Use verbs: educated, engaged, prompted, modeled, provided psychoeducation, processed, explored. NO quotes. NO "I." Generalize.
• Response (R): How the CLIENT responded. Their words and behaviours only. Direct quotes encouraged. NO clinician perceptions.
• Plan (P): Date/time/place of next session, focus of next session, referrals or homework.`
  },
};

export const NOTE_REQUIREMENTS = `
All formats must include: date, time, type of session, client name, client DOB, clinician name and credentials, treatment goal, objective, intervention worked on, mental status, risk assessment, any change since last visit, what clinician did, how client responded, plan for next session.

Key rules:
- Be factual. Not narrative or a story.
- No word-for-word detail.
- Interventions section: ONLY what the clinician did. Use "Clinician [verb]..." language. Verbs: educated, assisted, prompted, coached, accompanied, modeled, role-played, directed, inquired, processed, explored, provided psychoeducation.
- AVOID in intervention section: told, explained, said, watched, gave, I felt, I had them.
- Client response section: ONLY the client's words and behaviours. Direct quotes welcome. No clinician perceptions.
- Progress notes justify treatment. They are not a counsellor's view of the client.
`;

export const CASE_VIGNETTES = [
  {
    vignette: "Alex, 34, comes in appearing exhausted. He reports he has stopped going to the gym, quit his weekly poker night with friends, and has been calling in sick to work more often. He says he feels empty and like nothing matters anymore. He has been sleeping 11-12 hours a day but still feels tired.",
    presenting: "Depression",
    mechanisms: ["Withdrawal", "Negative self-schema", "Meaning collapse"],
    explanation: "Alex's pattern of stopping activities he previously enjoyed (gym, poker, work), social withdrawal, hypersomnia, and feelings of emptiness and meaninglessness are classic depression indicators. The withdrawal maintains depression by removing positive reinforcement. Meaning collapse is evident in 'nothing matters anymore.'"
  },
  {
    vignette: "Maya, 28, describes constantly worrying about getting sick. She checks her body for symptoms every morning, googles her symptoms regularly, and avoids public spaces during flu season. She knows her fear is 'probably irrational' but cannot stop. She carries hand sanitizer everywhere and won't touch door handles.",
    presenting: "Health anxiety",
    mechanisms: ["Catastrophic misinterpretation of bodily cues", "Reassurance-seeking cycles", "Intolerance of uncertainty", "Checking behaviours reinforcing fear"],
    explanation: "Maya's daily symptom checking, googling, and avoidance of public spaces are classic health anxiety maintaining mechanisms. Each checking behaviour provides brief relief but reinforces the underlying fear. Her insight that it is irrational but inability to stop is characteristic of the reassurance-seeking cycle."
  },
  {
    vignette: "James, 42, reports that he has been passed over for promotion again and believes his colleagues are more talented than him despite receiving strong performance reviews. He downplays his achievements saying he just got lucky, while attributing any mistakes entirely to his own incompetence. He lives in fear of being 'found out.'",
    presenting: "Imposter syndrome",
    mechanisms: ["External attribution of success", "Internal attribution of failure", "Fear of exposure", "Core inadequacy schema"],
    explanation: "James attributes his successes to luck (external) and his failures to incompetence (internal) — the hallmark attribution pattern of imposter syndrome. His fear of being 'found out' directly names the fear of exposure mechanism. Strong reviews not shifting his self-view indicates a core inadequacy schema."
  },
  {
    vignette: "Sara, 19, says she says yes to everyone — covering shifts for coworkers, helping friends move, attending events she does not want to attend. She reports feeling resentful and exhausted but says she cannot say no because she is terrified people will be angry or stop liking her. She does not know what she actually wants.",
    presenting: "People-pleasing / boundary difficulties",
    mechanisms: ["Fear of rejection or abandonment", "Conditional worth schema", "Conflict avoidance", "Externalized self-definition"],
    explanation: "Sara's pattern of compulsive yes-saying despite resentment, driven by fear of anger or rejection, reflects people-pleasing maintaining mechanisms. Her difficulty knowing what she wants suggests her sense of self is externally defined. Worth is conditional on others' approval."
  },
  {
    vignette: "David, 31, has been working 70-hour weeks for two years. He reports feeling numb, irritable with his family, and unable to enjoy weekends because he feels guilty not working. He says his value comes from being productive. He has cancelled vacations three times and cannot remember the last time he felt rested.",
    presenting: "Burnout",
    mechanisms: ["Chronic overextension without recovery", "Role over-identification", "Boundary failure", "Suppressed resentment", "Values-behaviour misalignment"],
    explanation: "David's 70-hour weeks, inability to rest without guilt, identity fused with productivity, cancelled vacations, and numbness and irritability are textbook burnout. His statement that his value comes from being productive confirms role over-identification. Irritability with family reflects suppressed resentment."
  },
  {
    vignette: "Leila, 25, reports she has been feeling stuck for years. She does not know what career she wants, what her values are, or who she is. She spends most of her free time on social media and streaming shows. She says she feels vaguely empty but cannot name why. She avoids making any long-term commitments.",
    presenting: "Existential drift",
    mechanisms: ["Identity diffusion", "Meaning deficit", "Emotional numbing", "Chronic distraction", "Avoidance of long-term responsibility"],
    explanation: "Leila's inability to name her values, career direction, or identity reflects identity diffusion. The vague emptiness without a specific cause is characteristic of meaning deficit. Chronic social media and streaming use functions as distraction from existential discomfort. Avoidance of long-term commitment prevents the anxiety of choosing."
  },
  {
    vignette: "Michael, 38, reports that he has been in a cycle of drinking heavily on weekends to unwind from a stressful work week, then feeling ashamed of his behaviour on Monday, which increases his work stress, which leads him to drink again the following weekend. He says alcohol is the only thing that turns his brain off.",
    presenting: "Addiction",
    mechanisms: ["Emotion regulation deficit", "Relief cycle", "Shame-relapse loop"],
    explanation: "Michael's drinking functions as emotion regulation — the only way he can turn his brain off. The weekend drinking, Monday shame, increased stress, weekend drinking again is a textbook shame-relapse loop. The relief cycle is maintained because alcohol works in the short term, reinforcing the behaviour."
  },
  {
    vignette: "Priya, 22, says she cannot make any decision without agonising over it for days. She researches every option exhaustively, asks everyone around her for their opinion, and still freezes. She missed the application deadline for graduate school because she could not decide between programs. She says she is terrified of making the wrong choice.",
    presenting: "Decision paralysis",
    mechanisms: ["Fear of regret", "Intolerance of ambiguity", "Over-analysis as anxiety regulation", "Perceived permanence of choice"],
    explanation: "Priya's exhaustive research and consultation functions as anxiety management rather than genuine decision-making. Her terror of the wrong choice reflects fear of regret and perceived permanence — as if a decision cannot be changed or recovered from. Missing the deadline is avoidance manifested. Intolerance of ambiguity keeps her stuck in analysis."
  },
];

export const TRAINING_ARENA_MODES = [
  { id: "case_conceptualisation", label: "Case Conceptualisation", desc: "Read a vignette and identify the presenting concern and maintaining mechanisms." },
  { id: "miracle_question", label: "Miracle Question Practice", desc: "Practice constructing and delivering effective miracle questions." },
  { id: "goal_structuring", label: "Goal Structuring", desc: "Practice writing SMART therapeutic goals from client presentations." },
  { id: "reflection_feeling", label: "Reflection of Feeling", desc: "Given a client statement, practice reflecting the emotion underneath." },
  { id: "open_closed", label: "Open vs Closed Questions", desc: "Rewrite closed or leading questions into effective open questions." },
  { id: "ethical_dilemma", label: "Ethical Dilemmas", desc: "Navigate clinical situations with ethical dimensions and explain your reasoning." },
  { id: "cognitive_distortions", label: "Identifying Cognitive Distortions", desc: "Identify the cognitive distortion type in client statements." },
  { id: "transference", label: "Transference & Countertransference", desc: "Spot signs of transference or countertransference in session excerpts." },
  { id: "intervention_matching", label: "Intervention Matching", desc: "Match appropriate interventions to client presentations and explain why." },
];
