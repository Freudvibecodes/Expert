export const MODALITIES = [
  "General Practice — No Specific Modality",
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

export const RESOURCES = {
  "SFBT": [
    { concept: "Miracle Question", desc: "A key SFBT technique. Ask the client to imagine waking up tomorrow and the problem is solved — what would be different? How would they know?" },
    { concept: "Scaling Questions", desc: "Ask the client to rate their situation on a scale of 1-10, then explore what a small step forward would look like." },
    { concept: "Exception Finding", desc: "Explore times when the problem was less present or absent. What was different? What were they doing differently?" },
    { concept: "Complimenting", desc: "Genuine, specific affirmations of client strengths and efforts observed in session. Not generic praise." },
  ],
  "CBT": [
    { concept: "Socratic Questioning", desc: "Guide clients to examine the evidence for and against their beliefs rather than directly challenging them." },
    { concept: "Thought Records", desc: "Help clients identify automatic negative thoughts, examine evidence, and develop balanced alternative thoughts." },
    { concept: "Cognitive Restructuring", desc: "Identify cognitive distortions (catastrophising, mind-reading, etc.) and collaboratively challenge them." },
    { concept: "Behavioural Activation", desc: "Schedule activities that increase positive reinforcement, especially for depression. Link mood to activity." },
  ],
  "Narrative Therapy": [
    { concept: "Externalisation", desc: "Separate the problem from the person. 'The anxiety' rather than 'your anxiety.' Explore how the problem affects the client." },
    { concept: "Unique Outcomes", desc: "Find moments when the problem did not win — times the client resisted, escaped, or worked around it." },
    { concept: "Re-authoring", desc: "Help clients construct an alternative story of their lives that centres their values and preferred identity." },
    { concept: "Definitional Ceremony", desc: "Invite witnesses to reflect on what they noticed about the client — powerful for identity work." },
  ],
  "Person-Centred Therapy": [
    { concept: "Unconditional Positive Regard", desc: "Accepting the client fully without judgment, regardless of what they share. Warmth without conditions." },
    { concept: "Empathic Reflection", desc: "Reflecting back the felt sense of what the client is experiencing — not just content, but the emotion underneath." },
    { concept: "Congruence", desc: "Being genuine and authentic in the therapeutic relationship. Using self appropriately and not hiding behind a professional mask." },
    { concept: "The Actualising Tendency", desc: "Trust that clients have an innate drive toward growth. The therapist's role is to create conditions, not direct." },
  ],
  "DBT": [
    { concept: "Validation Strategies", desc: "Six levels of validation — from listening, to reflecting, to radical genuineness. Master all six." },
    { concept: "Dialectics", desc: "Hold opposites simultaneously — acceptance AND change. Both/and rather than either/or." },
    { concept: "Chain Analysis", desc: "Map the chain of events, thoughts, and emotions that led to a problem behaviour. Identify intervention points." },
    { concept: "DEAR MAN", desc: "Interpersonal effectiveness skill for asserting needs: Describe, Express, Assert, Reinforce, Mindful, Appear confident, Negotiate." },
  ],
  "ACT": [
    { concept: "Cognitive Defusion", desc: "Creating distance from thoughts — noticing thoughts as mental events rather than facts. 'I'm having the thought that...'" },
    { concept: "Values Clarification", desc: "Distinguish values (directions) from goals (outcomes). Help clients identify what truly matters to them." },
    { concept: "Acceptance", desc: "Willingness to experience difficult thoughts and feelings without struggling against them unnecessarily." },
    { concept: "Committed Action", desc: "Taking concrete steps in valued directions even in the presence of difficult internal experiences." },
  ],
  "Motivational Interviewing": [
    { concept: "OARS", desc: "Open questions, Affirmations, Reflections, Summaries — the four core MI skills. Practice reflective listening especially." },
    { concept: "Change Talk", desc: "Listen for and amplify DARN-C: Desire, Ability, Reasons, Need, Commitment to change." },
    { concept: "Rolling with Resistance", desc: "Avoid arguing or confronting. Reflect resistance, reframe, or shift focus." },
    { concept: "Developing Discrepancy", desc: "Help clients notice the gap between their current behaviour and their stated values or goals." },
  ],
  "Adlerian Therapy": [
    { concept: "Early Recollections", desc: "Explore earliest memories as windows into the client's private logic and lifestyle beliefs." },
    { concept: "Encouragement", desc: "Central to Adlerian work — not praise but genuine recognition of effort and capability." },
    { concept: "Social Interest", desc: "Gemeinschaftsgefuhl — the sense of belonging and contribution to community. A marker of psychological health." },
    { concept: "Lifestyle Assessment", desc: "Understanding the client's characteristic pattern of moving through life — their core beliefs and goals." },
  ],
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
All formats must include: date, time, type of session, client name, client DOB, clinician name and credentials, treatment goal, objective, intervention worked on, mental status, risk assessment, any change since last visit, what clinician did, how client responded, next session plan.

Key rules:
- Be factual. Not narrative or a story.
- No word-for-word detail.
- Interventions section: ONLY what the clinician did. Use "Clinician [verb]..." language. Verbs: educated, assisted, prompted, coached, accompanied, modeled, role-played, directed, inquired, processed, explored, provided psychoeducation.
- AVOID in intervention section: told, explained, said, watched, gave, I felt, I had them.
- Client response section: ONLY the client's words and behaviours. Direct quotes welcome. No clinician perceptions.
- Progress notes justify treatment. They are not a counsellor's view of the client.
`;

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

export const CASE_VIGNETTES = [
  // DEPRESSION
  {
    vignette: "Alex, 34, comes in appearing exhausted. He reports he has stopped going to the gym, quit his weekly poker night with friends, and has been calling in sick to work more often. He says he feels empty and like nothing matters anymore. He has been sleeping 11-12 hours a day but still feels tired.",
    session_detail: "Alex, 34, presents to his first session appearing visibly exhausted with dark circles and slumped posture. He speaks slowly and makes minimal eye contact. He reports that over the past three months he has stopped going to the gym, dropped out of his weekly poker night, and has been calling in sick two or three times a week. When asked what a typical day looks like he says he gets up around noon, scrolls on his phone, and watches television until he falls back asleep. He states: 'I just feel empty. Like nothing matters anymore.' He denies active suicidal ideation but says he does not see the point of most things. He was oriented to time and place. Affect was flat and mood self-reported as low. He engaged minimally but was cooperative throughout the session. Clinician explored his withdrawal pattern and what he used to value in those activities.",
    presenting: "Depression",
    mechanisms: ["Withdrawal", "Negative self-schema", "Meaning collapse"],
    explanation: "Alex's pattern of stopping activities he previously enjoyed, social withdrawal, hypersomnia, and feelings of emptiness are classic depression indicators. Withdrawal maintains depression by removing positive reinforcement. Meaning collapse is evident in 'nothing matters anymore.'"
  },
  {
    vignette: "Fatima, 29, used to love painting and cooking for friends. She says she has not touched her brushes in four months and cancelled her last three dinner plans. She describes herself as 'just going through the motions' at work and cries most evenings without knowing why. She says she feels like a burden to everyone around her.",
    session_detail: "Fatima, 29, presents neatly dressed but with a flat, downcast affect. She speaks in short sentences and pauses frequently. She reports that four months ago she stopped painting — a lifelong hobby — and has cancelled multiple plans with friends, citing exhaustion. She says: 'I just go through the motions at work. I come home and cry and I don't even know what I'm crying about.' She reports feeling like a burden to her family and friends and says she would not be missed if she disappeared, though she denies intent or plan. Risk was assessed and she contracted for safety. She was oriented and coherent. Clinician explored the onset and context of these changes and reflected her sense of loss around activities that previously brought meaning.",
    presenting: "Depression",
    mechanisms: ["Withdrawal", "Negative self-schema", "Shame", "Meaning collapse"],
    explanation: "Fatima's abandonment of previously loved activities, social withdrawal, sense of burdensomeness, and passive suicidal ideation point to depression. The belief she is a burden reflects negative self-schema. Meaning collapse is evident in going through the motions."
  },
  {
    vignette: "Marcus, 45, was laid off six months ago and has barely left the house since. He says he applies for jobs sometimes but mostly watches television. He reports that he feels like a failure and that his family would be better off without him. He has stopped calling his friends back and says he does not see the point.",
    session_detail: "Marcus, 45, arrives in casual clothing, unshaven, and appears significantly underslept. He was referred by his GP. He has been unemployed for six months following a layoff and has had minimal structure or social contact since. He states: 'I don't see the point of most things. My family would honestly be better off without me.' Risk was assessed — he denied intent or plan but endorsed passive ideation. He was oriented. He reported applying for jobs 'sometimes' but mostly watching television for eight or more hours daily. He became tearful when discussing his children, stating he feels like a failure. He engaged with some prompting. Clinician validated his distress around loss of the provider role and explored what small structure might look like in his day.",
    presenting: "Depression",
    mechanisms: ["Withdrawal", "Negative self-schema", "Shame", "Meaning collapse"],
    explanation: "Marcus's isolation, inactivity, shame about unemployment, passive suicidal ideation, and loss of purpose are serious depression indicators. Withdrawal and meaning collapse are the primary maintaining mechanisms."
  },
  {
    vignette: "Nina, 17, comes in with her parents who are concerned she has been sleeping through school. She says everything feels grey and flat. She used to be top of her class but stopped handing in assignments two months ago. She reports she is not sad exactly, just empty. She has been spending hours alone in her room scrolling on her phone.",
    session_detail: "Nina, 17, was brought in by her parents who are concerned about her declining school attendance and performance. Nina presents as cooperative but guarded, speaking quietly and avoiding eye contact. She says: 'I'm not sad. It's more like everything is grey. Flat.' She reports she has not handed in assignments in two months despite previously being a high achiever. She spends most of her time alone in her room, sleeping or on her phone. She denies suicidal ideation. She was oriented. Her parents report she has stopped seeing her friends and rarely comes out of her room. In session, clinician saw Nina slightly, briefly, before she shut down again when parents were mentioned. Clinician explored the difference between her life now and six months ago, noting her description of flatness rather than sadness as clinically significant.",
    presenting: "Depression",
    mechanisms: ["Withdrawal", "Meaning collapse", "Negative self-schema"],
    explanation: "Nina's anhedonia, academic withdrawal, social isolation, and empty affect are consistent with adolescent depression. Phone scrolling functions as distraction and avoidance. Meaning collapse is present in her loss of motivation and purpose."
  },
  // ANXIETY
  {
    vignette: "Rania, 27, is a new manager who cannot stop thinking about everything that could go wrong at work. She prepares for every meeting for hours, triple-checks emails before sending, and has started having her partner proofread her texts to friends. She wakes at 3am running through worst-case scenarios and has had two panic attacks in the past month.",
    session_detail: "Rania, 27, presents alert and well-dressed but visibly tense. She speaks quickly and her hands are clasped tightly in her lap. She was recently promoted to a management role and reports that her worry has significantly intensified since. She prepares for every meeting for two or more hours, triple-checks emails before sending, and has asked her partner to proofread personal texts. She states: 'I keep running through everything that could go wrong.' She reports waking around 3am unable to stop catastrophic thoughts and has had two panic attacks in the past month — one at work. She denies avoidance of work itself but reports the effort of managing her anxiety is exhausting. Risk was negative. Affect was anxious. Clinician explored the function of checking behaviours and what the worry is trying to protect against.",
    presenting: "Anxiety",
    mechanisms: ["Threat amplification", "Safety behaviours", "Intolerance of uncertainty"],
    explanation: "Rania's exhaustive preparation, checking behaviours, and reassurance-seeking are anxiety safety behaviours that provide short-term relief but maintain underlying anxiety. Threat amplification is evident in 3am catastrophic thinking. Panic attacks suggest escalation."
  },
  {
    vignette: "Tom, 33, has been avoiding driving on highways since a minor fender-bender two years ago. He has rerouted his daily commute to add 40 minutes. He says he knows nothing will happen but the moment he approaches a highway on-ramp his heart races and he exits immediately. He has turned down two jobs because they required highway driving.",
    session_detail: "Tom, 33, presents calmly in session but becomes visibly uncomfortable when discussing driving. He describes a fender-bender two years ago — no injuries, minor damage — that has since resulted in complete avoidance of highways. He now adds 40 minutes to his commute daily using side roads. He states: 'I know rationally nothing is going to happen. But the second I see an on-ramp my heart just races and I get off.' He has turned down two job offers that required highway driving. He reports no other significant avoidance areas. He denied panic attacks outside of driving contexts. Clinician explored the immediate relief he experiences upon exiting and gently named the avoidance cycle. Tom was able to identify that the relief feels good in the moment but the fear has not reduced over two years.",
    presenting: "Anxiety",
    mechanisms: ["Avoidance", "Safety behaviours", "Threat amplification"],
    explanation: "Tom's highway avoidance is a classic anxiety maintaining mechanism — each exit provides short-term relief that reinforces avoidance, preventing corrective learning. The avoidance has significantly impacted his life. Threat amplification maintains the perceived danger."
  },
  // HEALTH ANXIETY
  {
    vignette: "Maya, 28, describes constantly worrying about getting sick. She checks her body for symptoms every morning, googles her symptoms regularly, and avoids public spaces during flu season. She knows her fear is probably irrational but cannot stop. She carries hand sanitizer everywhere and will not touch door handles.",
    session_detail: "Maya, 28, presents neatly and appears in good physical health. She reports spending 20-30 minutes each morning checking her body for symptoms and regularly googling symptoms she notices. She states: 'I know it's probably nothing. But what if it isn't?' She avoids public transit during flu season and carries hand sanitizer at all times, refusing to touch door handles. She had four doctor visits in the past three months — all unremarkable. She acknowledges the irrationality but cannot override the fear. She was oriented and denied other anxiety concerns. Clinician explored what happens after googling — Maya identified that she initially feels relieved when she finds an explanation, then begins worrying about the next thing. She was able to name this pattern when it was reflected back to her.",
    presenting: "Health anxiety",
    mechanisms: ["Catastrophic misinterpretation of bodily cues", "Reassurance-seeking cycles", "Intolerance of uncertainty", "Checking behaviours reinforcing fear"],
    explanation: "Maya's daily symptom checking, googling, and avoidance are classic health anxiety maintaining mechanisms. Each checking behaviour provides brief relief but reinforces the underlying fear. The reassurance-seeking cycle is self-sustaining."
  },
  {
    vignette: "Gerald, 52, has been to the emergency room four times in the past year convinced he was having a heart attack. Each time doctors cleared him completely. He says the next day he is relieved but within a week he notices a new symptom — a flutter, a twinge, a shortness of breath — and the cycle begins again. He has started avoiding exercise because he fears exertion will trigger something.",
    session_detail: "Gerald, 52, presents as a fit-looking man who appears anxious and sits forward in his chair. He describes four ER visits in the past year for chest-related symptoms — each time doctors found nothing and discharged him. He states: 'They keep saying I'm fine. But then the next week I feel something and I think, this time is different.' He has stopped exercising completely over the past six months, fearing exertion will trigger a cardiac event. He checks his pulse multiple times daily. His cardiologist has recommended therapy. He was oriented and calm in session. Clinician explored what happens in the week after being cleared — Gerald identified the pattern himself, noting that relief lasts perhaps two or three days before a new sensation appears. He expressed frustration that he cannot trust his own body.",
    presenting: "Health anxiety",
    mechanisms: ["Catastrophic misinterpretation of bodily cues", "Reassurance-seeking cycles", "Checking behaviours reinforcing fear", "Avoidance"],
    explanation: "Gerald's repeated ER visits function as reassurance-seeking that provides temporary relief without resolving the underlying fear. Avoidance of exercise removes corrective experiences. Bodily sensations are catastrophically misinterpreted as dangerous."
  },
  // TRAUMA
  {
    vignette: "Yara, 31, was in a serious car accident 18 months ago. She says she is fine now but flinches every time she hears brakes screech, cannot watch movies with car chases, and has not slept through the night since. She says she goes over the accident in her mind even when she does not want to. She has started avoiding her best friend who drives.",
    session_detail: "Yara, 31, presents calmly but becomes visibly tense when the accident is mentioned. She was in a significant collision 18 months ago — her car was hit from behind at highway speed. She was not seriously injured physically but has not slept through the night since. She startles at the sound of brakes, avoids films with car chases, and has been declining rides from her best friend. She states: 'I keep replaying it. I don't want to but it just starts.' She reports feeling on edge most of the time and has difficulty concentrating at work. She was oriented. Risk was negative. Clinician noted hypervigilance in posture and eye contact throughout session. Clinician normalized the trauma response and explored what helps versus worsens the intrusions, without pressing for detailed recounting of the accident.",
    presenting: "Trauma",
    mechanisms: ["Hyperarousal", "Avoidance", "Dissociation"],
    explanation: "Yara's startle response, sleep disturbance, intrusive recollections, avoidance of trauma-related stimuli, and hypervigilance are classic trauma responses. Avoidance prevents processing. Hyperarousal keeps the nervous system in a defensive state."
  },
  {
    vignette: "Deon, 24, grew up in a household with a volatile and unpredictable parent. He says he has a hard time trusting people and often feels like he is waiting for something bad to happen even when things are going well. He says he feels numb a lot of the time and sometimes watches himself from outside his body when he is stressed.",
    session_detail: "Deon, 24, presents guardedly, scoping the room as he enters and choosing a seat near the door. He speaks carefully and offers information in small pieces. He grew up with a parent whose moods were unpredictable — calm one moment, explosive the next. He reports hypervigilance as his baseline: 'Even when things are fine I'm waiting for it to fall apart.' He describes episodes of feeling numb and, under significant stress, feeling like he is watching himself from outside his body. He has difficulty in close relationships, stating he does not trust easily and pulls back when people get too close. He denied current suicidal ideation. Risk was assessed and negative. Clinician moved slowly, did not press for detail, and reflected Deon's guardedness as something that made complete sense given his history. Deon briefly made sustained eye contact near the end of the session.",
    presenting: "Trauma",
    mechanisms: ["Hyperarousal", "Dissociation", "Avoidance", "Shame"],
    explanation: "Deon's hypervigilance in safe situations, emotional numbing, and dissociative experiences are consistent with complex trauma from childhood. The sense of waiting for something bad reflects a threat-oriented nervous system. Avoidance of closeness protects against re-injury."
  },
  // GRIEF
  {
    vignette: "Claudette, 58, lost her husband of 30 years eight months ago. She says she keeps finding herself talking to him when she comes home. She has not changed anything in the house and cannot bring herself to sort through his belongings. She says she knows she has to move forward but does not want to because it feels like a betrayal.",
    session_detail: "Claudette, 58, presents as a well-dressed woman who becomes tearful early in the session. She lost her husband of 30 years to a sudden cardiac event eight months ago. She reports still speaking to him when she arrives home — telling him about her day. Nothing in the house has been changed. His coat is still on the hook. She has attempted to sort his belongings three times and each time cannot continue. She states: 'Moving forward feels like I'm saying it's okay that he's gone. Like I'm betraying him.' She is sleeping and eating adequately. She was oriented. Risk was negative. She attends church and has some social support but says she cannot talk to her children about how she really feels because she does not want to burden them. Clinician reflected the love embedded in her difficulty letting go and explored what moving forward might mean to her versus abandoning her husband.",
    presenting: "Grief and loss",
    mechanisms: ["Attachment rupture", "Meaning disruption", "Avoidance of grief waves"],
    explanation: "Claudette's maintained rituals, refusal to change the environment, and framing of grief as betrayal reflect avoidance of the loss reality. Meaning disruption is central — her life's structure was built around her marriage. Attachment rupture is the core wound."
  },
  {
    vignette: "Jerome, 40, lost his mother to cancer six months ago. He says he has been fine and just needs to stay busy. He has taken on extra projects at work, signed up for three new activities, and says he does not really think about it. When asked about his mother he becomes briefly tearful then quickly changes the subject. He says he is sleeping badly.",
    session_detail: "Jerome, 40, was referred by his partner who was concerned. He presents as upbeat and businesslike, stating he is doing well and just came because his partner insisted. He has taken on three new work projects, joined a running club, and started a home renovation since his mother died six months ago. He says: 'I'm a doer. Staying busy is how I cope.' When asked to describe his mother he pauses, his eyes briefly fill, and he quickly moves on: 'She was great. Anyway, the running has been good.' He reports waking at 2-3am and having trouble returning to sleep. He was oriented. Risk was negative. Clinician noted the pattern of activity as avoidance and gently reflected the contrast between his busyness and his sleep. Jerome acknowledged at the session's end that he has not cried since the funeral.",
    presenting: "Grief and loss",
    mechanisms: ["Avoidance of grief waves", "Attachment rupture", "Meaning disruption"],
    explanation: "Jerome's staying busy is active grief avoidance. The brief tearfulness followed by deflection suggests suppressed emotion. Sleep disturbance often accompanies unprocessed grief. His not crying since the funeral indicates emotional suppression maintaining the grief."
  },
  // RELATIONSHIP CONFLICT
  {
    vignette: "Keiko, 36, and her partner have the same argument repeatedly. She says every time she tries to bring up a concern her partner shuts down and leaves the room, which makes her pursue more intensely, which makes her partner withdraw further. She describes the cycle but does not know how to break it. She says she feels unheard and her partner says she is overwhelming.",
    session_detail: "Keiko, 36, presents animated and articulate. She describes a recurring conflict pattern with her partner of five years: she raises a concern, her partner goes quiet and eventually leaves the room, she follows and escalates, her partner withdraws further. She states: 'I know I'm doing it. I can see myself doing it. But I can't stop because if I stop it's like it never gets addressed.' She reports feeling chronically unheard. Her partner has told her she is overwhelming. She denies physical conflict. She was oriented. Clinician explored what she is afraid will happen if she does not pursue. Keiko identified that she fears her partner does not care, and that silence confirms abandonment. She was able to reflect that her pursuit, while logical to her, likely confirms overwhelm for her partner.",
    presenting: "Relationship conflict",
    mechanisms: ["Reactivity cycles", "Attachment insecurity", "Vulnerability avoidance"],
    explanation: "Keiko describes a classic pursue-withdraw cycle. Both her pursuit and her partner's withdrawal are attempts to manage emotional distress driven by attachment insecurity. Each behaviour escalates the other. Vulnerability avoidance on her partner's side and fear of abandonment on hers drive the cycle."
  },
  {
    vignette: "Ryan, 29, says he gets along with everyone except his older brother. Any conversation about their childhood quickly turns into a shouting match. He says he knows his brother is not his father but sometimes when his brother uses a certain tone he feels like he is twelve years old again and responds accordingly.",
    session_detail: "Ryan, 29, presents as warm and reflective in session. He describes himself as easygoing with good friendships and relationships — except with his older brother. Any conversation that touches on their childhood rapidly escalates to shouting. He states: 'I know he's not my dad. But when he uses that tone — that dismissive thing — something just snaps in me. I'm twelve again.' He and his brother had a falling out at a family event last month and have not spoken since. He expresses genuine regret about the dynamic. He was oriented. Risk was negative. Clinician explored what the tone triggers in him and what he is responding to underneath the anger. Ryan identified feeling dismissed and unseen — the same feeling he had with his father growing up. He made the connection himself near the end of the session.",
    presenting: "Relationship conflict",
    mechanisms: ["Reactivity cycles", "Projection", "Attachment insecurity"],
    explanation: "Ryan's awareness that he responds to his brother as if he were his father is a clear example of projection and unresolved attachment patterns. The trigger of a 'certain tone' suggests conditioned emotional responses from childhood. The reactivity cycle is maintained because neither party responds to the present-moment interaction."
  },
  // LOW SELF-ESTEEM
  {
    vignette: "Amara, 23, says she has never felt like she was enough. She grew up in a family where achievement was praised but effort was taken for granted. She got into a competitive university but felt like a fraud the whole time. She constantly compares herself to peers on social media and always comes up short. She says she is not sure she has any real qualities.",
    session_detail: "Amara, 23, presents as articulate and self-aware but speaks about herself with consistent negativity. She describes a childhood where academic excellence was expected and unremarkable — only failure was noticed. She attended a competitive university and describes feeling like a fraud throughout. She currently compares herself to peers on social media daily and says: 'Everyone else seems to have figured something out that I haven't. I don't really have any qualities that stand out.' When clinician reflects her evident intelligence and insight, she deflects immediately. She was oriented. Risk was negative. Clinician explored the origins of the critical internal voice and what it says. Amara identified it sounds like her father. She was surprised by this connection and sat with it briefly.",
    presenting: "Low self-esteem",
    mechanisms: ["Internalized critic", "Conditions of worth", "Comparison identity"],
    explanation: "Amara's worth was conditioned on achievement in childhood — creating conditions of worth. Her internalized critic maintains the belief she is never enough. Constant social media comparison is the comparison identity mechanism, using external metrics to evaluate self-worth and always finding deficiency."
  },
  {
    vignette: "Paul, 38, was told repeatedly as a child that he was not as smart as his sister. He has built a successful business but describes it as luck. When complimented he deflects or minimizes. He says the voice in his head telling him he is incompetent has been there as long as he can remember. He avoids taking on anything that might expose him.",
    session_detail: "Paul, 38, presents as confident in demeanor but contradicts this through his self-description. He built a business from scratch that now employs 20 people. When clinician reflects this back he waves it off: 'I got lucky. Right place, right time.' He reports an internal voice — constant since childhood — that tells him he is incompetent. He grew up being explicitly compared to his older sister who was academically gifted. He has turned down speaking invitations and board positions because he fears being exposed as less capable than people think. He was oriented. Risk was negative. Clinician asked him to notice the discrepancy between what the voice says and what the evidence shows. Paul acknowledged the gap but said the voice feels more true than the evidence.",
    presenting: "Low self-esteem",
    mechanisms: ["Internalized critic", "Conditions of worth", "Comparison identity"],
    explanation: "Paul's internalized critic is directly traceable to childhood comparison with his sister — a conditions of worth schema. The persistent internal voice and deflection of compliments maintain low self-esteem. Avoidance of exposure prevents contradictory evidence from changing the schema."
  },
  // PROCRASTINATION
  {
    vignette: "Sofia, 26, has a thesis due in four months. She says she sits down to write every day but within minutes is cleaning her apartment, checking social media, or making elaborate to-do lists about the thesis rather than writing it. She says it has to be perfect or she should not hand it in. She has had three extensions already.",
    session_detail: "Sofia, 26, presents with visible anxiety, speaking quickly. She is in her final year of a master's program with a thesis due in four months and has had three deadline extensions already. She reports sitting at her desk daily with the intention to write, then spending hours cleaning, reorganizing, or making detailed plans about writing rather than writing. She states: 'If I can't make it perfect I'd rather not hand it in at all.' She has not written new material in six weeks. She was oriented. Risk was negative. Clinician explored what happens in the moment of sitting down — Sofia identified a wave of fear and then an urge to do something else. She described the cleaning as feeling productive while also knowing it is avoidance. Clinician reflected the function of perfectionism as protection from the shame of an imperfect product.",
    presenting: "Procrastination",
    mechanisms: ["Anxiety avoidance", "Perfectionism", "Shame anticipation"],
    explanation: "Sofia's cleaning, social media, and list-making are avoidance behaviours that reduce immediate anxiety about starting. Her perfectionism means beginning feels too risky. Shame anticipation — fear of producing something inadequate — makes starting feel threatening."
  },
  {
    vignette: "Kwame, 32, has wanted to start his own business for five years. He has filled three notebooks with ideas, taken four online courses, and spoken to several mentors. He says he is not ready yet and needs to do more research. When pushed to name what exactly is missing he struggles to answer. His partner says he has been saying he is almost ready for years.",
    session_detail: "Kwame, 32, presents as thoughtful and enthusiastic when discussing his business idea — a sustainable clothing brand. He can articulate the concept clearly and has significant preparation behind him: three notebooks of ideas, four completed online courses, and conversations with multiple mentors. When asked what is left before he can start, he pauses for a long time and says: 'I'm not sure exactly. I just don't feel ready.' His partner referred him after growing frustrated. He was oriented. Risk was negative. Clinician explored what 'ready' would look and feel like. Kwame could not define it. Clinician gently named the possibility that readiness was being used as a condition that could never be met. Kwame became quiet and then said: 'I think I'm scared it won't work and then I'll have nothing to dream about.'",
    presenting: "Procrastination",
    mechanisms: ["Anxiety avoidance", "Perfectionism", "Shame anticipation"],
    explanation: "Kwame's extensive preparation without action is procrastination — each course and notebook feels productive while avoiding the vulnerability of starting. The inability to name what is missing suggests the barrier is emotional not informational. Shame anticipation and perfectionism maintain the holding pattern."
  },
  // ANGER
  {
    vignette: "Derek, 41, was referred after his partner gave him an ultimatum. He says he does not have an anger problem — he just has a low tolerance for stupidity. He describes frequent road rage, arguments with colleagues, and three incidents where he has punched walls. He becomes tearful when describing that his children are scared of him but quickly becomes defensive again.",
    session_detail: "Derek, 41, arrives on time, sits with arms crossed. He states immediately that he does not think he has a problem but came because his partner threatened to leave. He describes multiple incidents of road rage, two HR complaints from colleagues, and three occasions of punching walls. He denies physical aggression toward people. When asked about his children he pauses and his eyes fill briefly: 'My youngest flinches when I raise my voice. That's not—' He stops, jaw tightens, and says: 'I just have a low tolerance for people being stupid.' He was oriented. Risk was assessed given history of property damage — he denied intent to harm himself or others. Clinician noted the emotional shift around his children and gently reflected it. Derek deflected but returned to it unprompted near the end of the session.",
    presenting: "Anger",
    mechanisms: ["Secondary emotion masking hurt", "Threat bias", "Control strategies"],
    explanation: "Derek's anger is a secondary emotion — the brief tearfulness about his children reveals hurt and fear underneath. His 'low tolerance for stupidity' reflects threat bias. Anger functions as a control strategy to manage vulnerability. The defensive shift away from tearfulness illustrates this."
  },
  {
    vignette: "Layla, 35, says she is fine most of the time but has explosive arguments with her mother that leave both of them shaken. She describes going from zero to furious very quickly, saying things she regrets, and then feeling flooded with guilt. She says her mother knows exactly which buttons to push. She cannot understand why she cannot stay calm with the one person she loves most.",
    session_detail: "Layla, 35, presents warmly and with good insight. She describes herself as generally calm and conflict-avoidant — except with her mother. Arguments escalate rapidly, she says things she immediately regrets, and the aftermath is significant guilt and often days of distance. She states: 'She says one thing and I'm just gone. I feel twelve years old and I hate it.' She cannot identify what specifically triggers the escalation. She was oriented. Risk was negative. Clinician explored the speed of the escalation and what she is feeling underneath the anger before it fires. Layla identified fear — that her mother is disappointed in her — and hurt. She reflected that the anger feels easier than admitting she still desperately wants her mother's approval.",
    presenting: "Anger",
    mechanisms: ["Secondary emotion masking hurt", "Reactivity cycles", "Threat bias"],
    explanation: "Layla's explosive anger with her mother while calm with others suggests the relationship activates specific attachment wounds. The rapid escalation, regret, and guilt cycle reflects secondary emotion dynamics — anger masks hurt and fear in the attachment relationship."
  },
  // ADDICTION
  {
    vignette: "Michael, 38, has been in a cycle of drinking heavily on weekends to unwind from a stressful work week, then feeling ashamed on Monday, which increases his work stress, which leads him to drink again the following weekend. He says alcohol is the only thing that turns his brain off.",
    session_detail: "Michael, 38, presents professionally dressed and articulate. He works in finance and describes significant work pressure. He began drinking heavily on weekends about two years ago and describes a clear cycle: intense week, Friday night drinking, weekend blackout at times, Monday shame and anxiety, difficult week, repeat. He states: 'It's the only thing that turns my brain off. I've tried everything else.' He drinks alone, has hidden bottles from his partner, and has called in sick after weekends three times this year. He was oriented. Risk was negative. Clinician explored what the drinking is turning off — Michael identified a near-constant internal monologue of self-criticism and performance anxiety. He reflected that the relief he gets from alcohol is real, which is what makes stopping feel impossible.",
    presenting: "Addiction",
    mechanisms: ["Emotion regulation deficit", "Relief cycle", "Shame-relapse loop"],
    explanation: "Michael's drinking functions as emotion regulation. The shame-relapse loop is textbook: drink, feel shame, stress increases, drink again. The relief cycle is maintained because alcohol works in the short term, reinforcing the behaviour."
  },
  {
    vignette: "Tanya, 45, has been using prescription painkillers for back pain for three years. Her back pain resolved 18 months ago but she continues taking them. She says she tried to stop twice but felt so anxious and irritable she could not function. She has started seeing multiple doctors to maintain her prescriptions and feels disgusted with herself.",
    session_detail: "Tanya, 45, presents neatly dressed but with visible shame — she avoids eye contact at the start of the session. She was prescribed opioid painkillers three years ago following a back injury. The back pain resolved approximately 18 months ago but she has continued taking the medication. She attempted to stop twice — once cold turkey, once tapering — and both times experienced severe anxiety, irritability, and inability to function. She has since been visiting three different doctors to maintain prescriptions. She states: 'I know exactly what I'm doing. I'm disgusted with myself. But I can't stop.' She was oriented. Risk was assessed — she denied suicidal intent but expressed hopelessness about change. Clinician acknowledged the courage it took to come in and normalized the neurological basis of dependence, gently separating this from moral failure.",
    presenting: "Addiction",
    mechanisms: ["Emotion regulation deficit", "Relief cycle", "Shame-relapse loop"],
    explanation: "Tanya's continued use despite resolution of original pain suggests medication now primarily serves emotional regulation. Withdrawal symptoms are a powerful maintaining mechanism. Shame maintains secrecy, preventing help-seeking. Doctor-shopping reflects the desperation of the relief cycle."
  },
  // LIFE TRANSITIONS
  {
    vignette: "Ben, 22, graduated six months ago and says he feels lost. He did everything right — good grades, extracurriculars, internships — and now does not know who he is without the structure of school. He has a job but says it does not feel like him. He says he thought adult life would feel more certain.",
    session_detail: "Ben, 22, presents as articulate and self-reflective, though clearly distressed by his own confusion. He graduated from university six months ago after following what he describes as a script: strong grades, leadership roles, two internships. He has a job in marketing but says: 'It doesn't feel like me. I don't know what would feel like me.' He says he thought completing his degree would produce clarity. Instead he feels more lost than ever. He spends significant time comparing himself to peers on LinkedIn and feels behind. He was oriented. Risk was negative. Clinician explored what the structure of school provided beyond academics — Ben identified identity, community, external validation of effort, and clear direction. He reflected that without it he has no way of knowing if he is doing well.",
    presenting: "Life transitions",
    mechanisms: ["Identity instability", "Value confusion", "Freedom-responsibility tension"],
    explanation: "Ben's identity was organized around academic achievement and structure. Without it he experiences identity instability. His comparison to peers reflects value confusion — he does not yet know what success means outside school metrics. Freedom-responsibility tension is present: adult freedom feels overwhelming."
  },
  {
    vignette: "Miriam, 55, took early retirement six months ago. She says she thought she would love it but feels purposeless and oddly depressed. She does not know what to do with herself. She was a teacher for 28 years and her whole social life was connected to school. She says she wakes up and does not know what she is for anymore.",
    session_detail: "Miriam, 55, presents warmly but with a flat underlying affect. She took early retirement six months ago after 28 years of teaching — a role she says she loved. She describes retirement as a loss she did not anticipate: no routine, no purpose, no colleagues, no students. She states: 'I wake up and I think — what am I for today? And I don't have an answer.' She has been filling time with errands and television but nothing feels meaningful. Her husband is still working. She socializes less than before retirement. She was oriented. Risk was negative. Clinician explored what teaching provided beyond income — Miriam identified purpose, identity, relationships, and a sense of impact. Clinician reflected that what she is grieving is a version of herself, not just a job.",
    presenting: "Life transitions",
    mechanisms: ["Identity instability", "Value confusion", "Freedom-responsibility tension"],
    explanation: "Miriam's identity was fused with her teaching role. Retirement removed the structure, social connection, and purpose that organized her sense of self. Identity instability and meaning deficit are the core maintaining mechanisms."
  },
  // IMPOSTER SYNDROME
  {
    vignette: "James, 42, reports he has been passed over for promotion again and believes his colleagues are more talented despite receiving strong performance reviews. He downplays his achievements saying he just got lucky, while attributing any mistakes entirely to his own incompetence. He lives in fear of being found out.",
    session_detail: "James, 42, presents as measured and self-deprecating. He was passed over for a senior role last month despite consistently strong performance reviews over five years. He believes the decision was correct: 'My colleagues are genuinely more talented. I've just been lucky.' He attributes every success to timing or circumstance and every mistake to personal incompetence. He describes a persistent fear that colleagues will 'figure out' he does not belong. He has begun over-preparing for meetings and arriving early to set up, fearing being caught unprepared. He was oriented. Risk was negative. Clinician reflected the discrepancy between his five-year review record and his self-assessment. James acknowledged the gap intellectually but said: 'The reviews feel wrong. My sense of myself feels right.'",
    presenting: "Imposter syndrome",
    mechanisms: ["External attribution of success", "Internal attribution of failure", "Fear of exposure", "Core inadequacy schema"],
    explanation: "James attributes successes to luck and failures to incompetence — the hallmark attribution pattern of imposter syndrome. Fear of exposure directly names the mechanism. Strong reviews not shifting his self-view indicates a core inadequacy schema immune to contradictory evidence."
  },
  {
    vignette: "Carmen, 30, just became the youngest partner at her law firm. She says she is terrified every day that someone will figure out she does not belong. She overprepares for every meeting, never delegates, and works 80-hour weeks. She says her colleagues seem so confident and natural.",
    session_detail: "Carmen, 30, presents as poised but speaks with an undercurrent of anxiety. She was recently made the youngest partner in her firm's history — an achievement she describes with discomfort rather than pride. She works 80-hour weeks, prepares exhaustively for every meeting, and refuses to delegate because she fears delegated work will reflect poorly on her. She states: 'Everyone else just seems to know what they're doing. I'm always waiting for someone to figure out I don't.' She compares her internal experience to her colleagues' external confidence. She was oriented. Risk was negative. Clinician explored the function of the overwork and what she is protecting against. Carmen identified that if she works hard enough, the exposure cannot happen. Clinician reflected that the overwork perpetuates the belief she is not enough on her own.",
    presenting: "Imposter syndrome",
    mechanisms: ["Fear of exposure", "External attribution of success", "Core inadequacy schema"],
    explanation: "Carmen's overpreparation and refusal to delegate are safety behaviours preventing feared exposure. The 80-hour weeks maintain the imposter cycle by never allowing rest that might reveal inadequacy."
  },
  // PEOPLE-PLEASING
  {
    vignette: "Sara, 19, says she says yes to everyone — covering shifts, helping friends move, attending events she does not want to attend. She feels resentful and exhausted but cannot say no because she is terrified people will be angry or stop liking her. She does not know what she actually wants.",
    session_detail: "Sara, 19, presents as eager and pleasant in session — quick to smile and agree. She describes covering three shifts for coworkers this month, helping a friend move despite having an exam the next day, and attending a party she did not want to go to. She feels chronically exhausted. She states: 'I know I should say no but the second I think about it I just imagine them being angry and I can't handle it.' When asked what she would have done with her weekend if she had no obligations she pauses for a long time and says: 'I actually don't know.' She was oriented. Risk was negative. Clinician noted her agreeableness in session and explored whether that same dynamic might be operating in the room. Sara laughed and said: 'Oh. Yeah. Probably.'",
    presenting: "People-pleasing / boundary difficulties",
    mechanisms: ["Fear of rejection or abandonment", "Conditional worth schema", "Conflict avoidance", "Externalized self-definition"],
    explanation: "Sara's compulsive yes-saying despite resentment is driven by fear of anger or rejection. Her difficulty knowing what she wants suggests her sense of self is externally defined. Worth is conditional on others' approval."
  },
  {
    vignette: "Hassan, 43, says he has never been able to disagree with his wife. He goes along with her decisions even when he strongly disagrees, then feels quietly resentful for weeks. His wife has started saying she does not know who he really is. He says conflict feels dangerous even though his wife has never been aggressive.",
    session_detail: "Hassan, 43, presents as calm and deliberate, choosing words carefully. He describes a marriage of 12 years in which he has never once directly contradicted his wife, despite frequently disagreeing. He reports ongoing low-grade resentment as a result. His wife recently told him she feels like she does not know who he actually is. He states: 'Even when I know she's wrong I just — I can't. Something in me just shuts that down.' He grew up in a household where disagreement was met with severe punishment. He was oriented. Risk was negative. Clinician explored what conflict represented to Hassan growing up. He described it as genuinely dangerous — associated with a parent's rage. Clinician reflected that his body learned something true in that environment, even if it is no longer accurate in his current relationship. Hassan became visibly moved by this.",
    presenting: "People-pleasing / boundary difficulties",
    mechanisms: ["Fear of rejection or abandonment", "Conflict avoidance", "Conditional worth schema"],
    explanation: "Hassan's inability to voice disagreement despite his wife wanting authenticity maintains a false relational dynamic. The felt danger of conflict despite no actual threat suggests this pattern is rooted in earlier experiences. People-pleasing erodes intimacy."
  },
  // CHRONIC GUILT
  {
    vignette: "Lily, 28, moved across the country for a job two years ago. She says she feels guilty every day for leaving her family. She calls her mother every night, sends money home despite barely covering her own rent, and has turned down promotions because they would require more travel. She cannot enjoy her new life because it feels like abandonment.",
    session_detail: "Lily, 28, presents as warm but visibly burdened. She moved for a career opportunity two years ago and describes daily guilt since. She calls her mother every evening, sometimes for over an hour. She sends money home monthly despite being in debt herself. She declined two promotions that would have required additional travel. She states: 'I can't let myself enjoy it here. It feels like rubbing it in. Like I'm abandoning them.' Her family is functional and has not asked her to return. She was oriented. Risk was negative. Clinician explored where the obligation originated — Lily identified that she was the eldest of four and had always been the responsible one. Clinician asked whose voice was telling her she had abandoned her family. Lily went quiet and then said: 'Mine, I think. No one else has said that.'",
    presenting: "Chronic guilt",
    mechanisms: ["Inflated responsibility beliefs", "Moral perfectionism", "Fear of harming others"],
    explanation: "Lily's daily guilt despite her family being functional reflects inflated responsibility. Her financial sacrifice and career limitation are guilt-driven compensatory behaviours. The inability to enjoy her life suggests guilt has become pervasive and identity-shaping."
  },
  {
    vignette: "Noel, 36, made a mistake at work three years ago that cost the company money. The issue was resolved and his manager moved on. He says he thinks about it every single day and cannot forgive himself. He works twice as hard as everyone else and volunteers for every difficult project. He says he does not deserve to feel comfortable at work until he has made it right.",
    session_detail: "Noel, 36, presents as highly motivated but visibly tense. Three years ago he made an error that resulted in a lost client — the loss was significant but the company recovered and his manager explicitly told him to move on. He reports thinking about the incident every single day. He now works significantly longer hours than his colleagues, volunteers for every high-pressure assignment, and declines to take his full vacation days. He states: 'I don't deserve to feel at ease here until I've paid it back. Whatever that means.' He acknowledges his manager has moved on. He was oriented. Risk was negative. Clinician explored what 'making it right' would look like — Noel was unable to define it. Clinician reflected that he may be holding himself to a standard of punishment that has no endpoint.",
    presenting: "Chronic guilt",
    mechanisms: ["Inflated responsibility beliefs", "Moral perfectionism", "Unresolved attachment injury"],
    explanation: "Noel's inability to accept resolution reflects moral perfectionism — the belief he must be punished until a perfect standard is restored. His overwork is a guilt-driven reparative behaviour. The standard he applies to himself is significantly harsher than what others apply to him."
  },
  // PERFECTIONISM
  {
    vignette: "Elena, 24, is a medical student who says she has to get everything perfect or it means she is not cut out for medicine. She rewrites her notes after already having written them, studies 14 hours a day, and cried for three days after getting an 88 on an exam. She has not seen her friends in two months.",
    session_detail: "Elena, 24, presents as tightly composed and articulate. She is in her second year of medical school and describes a life organized entirely around performance. She rewrites notes after completing them, studies 12-14 hours daily, and recently cried for three days after receiving an 88 on an exam. She states: 'If I'm not excellent I'm failing. There's no middle ground for me.' She has not seen friends in two months. She sleeps five hours a night. She was oriented. Risk was assessed — she denied suicidal ideation though noted she sometimes wonders if she can sustain this. Clinician explored what an 88 means to her. Elena identified that it means someone else got a higher mark, and that someone else is more suited to this than she is. Clinician reflected the all-or-nothing logic embedded in this belief.",
    presenting: "Perfectionism",
    mechanisms: ["Shame avoidance", "All-or-nothing cognition", "Identity fused with achievement", "Fear of exposure"],
    explanation: "Elena's all-or-nothing framing, identity fused with academic performance, and extreme distress at a high but imperfect grade are classic perfectionism maintaining mechanisms. Note rewriting is a compulsive safety behaviour. Social withdrawal removes contexts where she might appear less than perfect."
  },
  {
    vignette: "Victor, 50, is an architect who says he has missed three project deadlines because he keeps revising. His partners are frustrated. He says he knows the work is good but he cannot submit it until he is sure there is nothing better. He has lost two major clients over delays. He says he would rather lose the client than submit something he is not proud of.",
    session_detail: "Victor, 50, presents as thoughtful and precise in speech. He is a senior architect who has missed three project deadlines this year due to ongoing revisions. Two major clients have left as a result. His partners have issued a formal warning. He acknowledges the work is objectively good — his partners and past clients have said so. He states: 'I know it's good. But what if it's better? I can't submit it knowing there might be something I haven't considered.' He works evenings and weekends on projects that are past their submission dates. He was oriented. Risk was negative. Clinician explored what submitting would mean to him. Victor identified exposure — once it is submitted, it can be judged. Revision is protection. Clinician reflected that the delays, paradoxically, have produced the very professional consequences he was trying to avoid through perfection.",
    presenting: "Perfectionism",
    mechanisms: ["Shame avoidance", "All-or-nothing cognition", "Fear of exposure", "Procrastination as self-protection"],
    explanation: "Victor's revisions beyond reasonable standard reflect perfectionism maintaining avoidance — submission means exposure to judgment. The professional cost he tolerates reveals how central the schema is. Imperfect work would confirm inadequacy."
  },
  // SOCIAL ISOLATION
  {
    vignette: "Amelia, 27, moved to a new city 18 months ago. She says she wants friends but feels exhausted after social interactions and has started declining invitations. She tells herself people would not want to get to know her if they really knew her. She now spends most evenings alone watching television and feels invisible.",
    session_detail: "Amelia, 27, presents quietly, choosing her words carefully. She moved to the city for work 18 months ago and has not built a social network. She reports that she does want connection but finds social interactions draining and anxiety-provoking. She has begun declining invitations from work colleagues, finding excuses not to go. She states: 'I know I should go. But then I think — what's the point. They'd probably find out eventually that I'm not that interesting.' She spends most evenings alone watching television and reports feeling invisible and increasingly low. She was oriented. Risk was negative but she reported persistent low mood. Clinician explored what she imagines people would discover if they got to know her. Amelia identified that she would be exposed as boring and awkward. Clinician gently asked how she knows this before giving anyone the chance to find out.",
    presenting: "Social isolation / loneliness",
    mechanisms: ["Rejection sensitivity", "Avoidant coping", "Mind-reading bias", "Fear of vulnerability"],
    explanation: "Amelia's mind-reading bias justifies avoidance before rejection can occur. Each declined invitation reinforces isolation without testing the belief. The self-fulfilling withdrawal loop is active — she withdraws, has fewer connections, feels more invisible, withdraws more."
  },
  {
    vignette: "Grant, 55, retired early and says he did not realize how much of his social life was work-based. He describes sitting at home alone most days, wanting to call people but not wanting to be a burden. He says he is probably boring now that he does not have anything interesting to say. He has turned down two invitations this month.",
    session_detail: "Grant, 55, presents as friendly but clearly uncomfortable discussing his current situation. He retired 18 months ago after 30 years in engineering. He describes his social life as having been almost entirely work-based. He has not cultivated other friendships. He thinks about calling former colleagues but stops himself: 'I don't want to be one of those guys who pesters people.' He turned down two invitations this month, citing vague excuses. He states: 'I don't really have anything interesting to say anymore. Work was my thing.' He was oriented. Risk was negative though he noted feeling increasingly low. Clinician explored his assumption that he would be a burden. Grant acknowledged he had not tested this and that former colleagues had reached out to him first.",
    presenting: "Social isolation / loneliness",
    mechanisms: ["Mind-reading bias", "Avoidant coping", "Self-fulfilling withdrawal loops"],
    explanation: "Grant's assumption that he would be a burden and is boring are mind-reading distortions preventing connection. Each declined invitation reinforces the withdrawal loop. His identity was organized around his professional role, which is now gone."
  },
  // DECISION PARALYSIS
  {
    vignette: "Priya, 22, cannot make any decision without agonising for days. She researches every option exhaustively, asks everyone for opinions, and still freezes. She missed the application deadline for graduate school because she could not decide between programs. She says she is terrified of making the wrong choice.",
    session_detail: "Priya, 22, presents as bright and articulate. She missed a graduate school application deadline last month — not because she did not want to apply, but because she could not decide between two programs. She researched both exhaustively, spoke to current students, attended open days, and still could not commit. She states: 'What if I choose wrong? What if the other one was better?' She describes this pattern across all significant decisions — where to live, which job to take, even which grocery items to buy. She was oriented. Risk was negative. Clinician explored what the worst case of making the wrong choice would be. Priya described it as irreversible and catastrophic. Clinician asked how many of her past decisions, even imperfect ones, had been truly irreversible. Priya paused and acknowledged that very few had been.",
    presenting: "Decision paralysis",
    mechanisms: ["Fear of regret", "Intolerance of ambiguity", "Over-analysis as anxiety regulation", "Perceived permanence of choice"],
    explanation: "Priya's exhaustive research functions as anxiety management rather than genuine decision-making. Her terror of the wrong choice reflects fear of regret and perceived permanence. Missing the deadline is avoidance manifested. Intolerance of ambiguity keeps her stuck."
  },
  {
    vignette: "Marcus, 39, has been in the same job for eight years and says he is unhappy but cannot bring himself to leave. He has had interviews at three other companies but cancelled them all beforehand. He says what if the new job is worse. He makes lists of pros and cons that he never finishes. He will do it when he feels ready but has been saying that for four years.",
    session_detail: "Marcus, 39, presents as self-aware and somewhat amused at his own situation. He describes eight years in a role he does not enjoy, three cancelled job interviews, and four years of unfinished pros and cons lists. He states: 'I know what I'm doing. I'm stalling. I just can't make myself stop.' He cancelled his most recent interview two hours before it was scheduled. He says he is waiting until he feels ready. When asked what ready would feel like he says: 'Less scared, I suppose.' He was oriented. Risk was negative. Clinician explored what happens to fear if he waits for it to go away before acting. Marcus identified that it has not gone away in four years of waiting. Clinician reflected that readiness may be a feeling that comes through action rather than before it.",
    presenting: "Decision paralysis",
    mechanisms: ["Fear of regret", "Intolerance of ambiguity", "Avoidance of responsibility", "Perceived permanence of choice"],
    explanation: "Marcus's unfinished pro-con lists and cancelled interviews are avoidance behaviours that feel productive without requiring commitment. Waiting until he feels ready is indefinite postponement — readiness is used as a condition that avoidance ensures will never be met."
  },
  // BODY IMAGE
  {
    vignette: "Isabella, 21, says she cannot leave the house without spending an hour on her appearance. She checks her reflection in every window she passes, avoids photos, and cancelled a beach trip with friends because she could not face being seen in a swimsuit. She knows it is probably not as bad as she thinks but cannot stop seeing flaws.",
    session_detail: "Isabella, 21, presents stylishly dressed with visible effort. She reports spending 60-90 minutes preparing before leaving the house each day. She checks her reflection in shop windows, car mirrors, and glass doors as she passes. She declines to be photographed. She cancelled a beach vacation with close friends last summer because she could not tolerate the idea of being in a swimsuit. She states: 'I know I probably look fine. But I can't see it. I see everything that's wrong.' She was oriented. Risk was assessed — she denied self-harm though endorsed some restrictive eating patterns. Clinician asked her to describe what she sees vs what she knows. Isabella identified the gap clearly but said the felt sense overrides the intellectual knowledge.",
    presenting: "Body image distress",
    mechanisms: ["Shame and self-objectification", "Conditional attractiveness beliefs", "Social reinforcement loops", "Control attempts to manage insecurity"],
    explanation: "Isabella's mirror-checking and window-checking are reassurance-seeking behaviours that momentarily reduce anxiety but reinforce the salience of her appearance. Beach avoidance maintains the belief that her body cannot be seen. The preparation ritual is a control attempt to manage insecurity."
  },
  {
    vignette: "Daniel, 34, has been going to the gym twice a day for the past year. He says he cannot miss a session or his anxiety becomes unmanageable. He has turned down dinner invitations because they would conflict with his gym schedule. He is not satisfied with how he looks despite others commenting on his physique. His girlfriend says she feels like she is in a relationship with the gym.",
    session_detail: "Daniel, 34, presents as physically fit and articulate. He trains twice daily — once before work and once after — and has maintained this schedule for over a year. He describes significant anxiety on the two occasions he has missed a session. He has declined social invitations that conflicted with training. His girlfriend told him last week she felt like she came third, after work and the gym. He states: 'I know it's a lot. But when I look in the mirror I still don't see what other people apparently see.' He describes dissatisfaction with his physique despite others commenting on it positively. He was oriented. Risk was negative. Clinician explored what he is training toward. Daniel identified that he does not have a specific goal — he just cannot stop. Clinician gently reflected the difference between training for health versus training to manage anxiety.",
    presenting: "Body image distress",
    mechanisms: ["Control attempts to manage insecurity", "Internalized comparison standards", "Conditional attractiveness beliefs"],
    explanation: "Daniel's compulsive gym attendance functions as anxiety regulation. Dissatisfaction despite objective progress reflects internalized comparison standards that continuously shift. The relationship impact suggests the behaviour has become consuming."
  },
  // EXISTENTIAL DRIFT
  {
    vignette: "Leila, 25, has been feeling stuck for years. She does not know what career she wants, her values, or who she is. She spends most of her free time on social media and streaming shows. She feels vaguely empty but cannot name why. She avoids making any long-term commitments.",
    session_detail: "Leila, 25, presents calmly but describes a pervasive sense of emptiness she finds difficult to articulate. She completed a degree in communications three years ago and has worked in several jobs since, leaving each within a year. She does not know what she wants to do or who she is outside of external roles. She states: 'I know I should feel something more. But everything just feels kind of grey and pointless.' She spends most evenings on social media or streaming without being able to recall what she watched. She has avoided serious relationships and long-term housing commitments. She was oriented. Risk was negative. Clinician explored the last time she felt genuinely alive or interested. Leila identified a trip she took at 21 — backpacking alone for a month. She said: 'I was scared and I felt real. I haven't felt real like that since.'",
    presenting: "Existential drift",
    mechanisms: ["Identity diffusion", "Meaning deficit", "Emotional numbing", "Chronic distraction", "Avoidance of long-term responsibility"],
    explanation: "Leila's inability to name her values or identity reflects identity diffusion. The vague emptiness is characteristic of meaning deficit. Chronic social media use functions as distraction from existential discomfort. Avoidance of commitment prevents the anxiety of choosing a direction."
  },
  {
    vignette: "Adrian, 30, says he used to care about things — music, politics, his friends — but over the past few years it has all faded. He goes to work, comes home, and repeats. He says he is not unhappy exactly, just absent. He has started spending hours on his phone without knowing what he was looking at. He feels like he is watching his life from behind glass.",
    session_detail: "Adrian, 30, presents as thoughtful but subdued. He describes a gradual fading of passion and engagement over the past three to four years. He was previously active in a band, politically engaged, and socially connected. All of this has quietly stopped. He states: 'I'm not sad. It's more like I'm watching my life happen from behind glass. I'm there but I'm not in it.' He works a stable job in IT, comes home, eats, and spends three to four hours on his phone without being able to say what he looked at. He was oriented. Risk was assessed — he denied suicidal ideation but the dissociative quality of his description warranted attention. He denied substances. Clinician explored what was happening in his life around the time the fading began. Adrian identified a significant relationship ending and a career pivot both occurring within the same year. He had not previously connected the timing.",
    presenting: "Existential drift",
    mechanisms: ["Meaning deficit", "Emotional numbing", "Chronic distraction", "Identity diffusion"],
    explanation: "Adrian's description of watching his life from behind glass is consistent with profound existential disconnection. The fading of former passions reflects meaning deficit. Emotional numbing prevents the discomfort of meaninglessness from becoming sharp enough to force change."
  },
  // BURNOUT
  {
    vignette: "David, 31, has been working 70-hour weeks for two years. He reports feeling numb, irritable with his family, and unable to enjoy weekends because he feels guilty not working. He says his value comes from being productive. He has cancelled vacations three times and cannot remember the last time he felt rested.",
    session_detail: "David, 31, presents alert but visibly fatigued. He works in consulting and has averaged 70 hours per week for two years. He cancelled three family vacations. He describes feeling numb most of the time, irritable with his wife and young son, and unable to enjoy weekends because he feels guilty not checking his email. He states: 'My value is in what I produce. If I stop I'm not sure what's left.' He cannot remember the last time he felt rested. He sleeps five to six hours. He was oriented. Risk was negative. Clinician explored the guilty feeling during rest — David identified that when he is not working he feels like he is failing, as if rest is a character flaw. Clinician asked where he learned that. David went quiet and eventually said: 'My dad. He worked constantly. It was the only thing he was proud of.'",
    presenting: "Burnout",
    mechanisms: ["Chronic overextension without recovery", "Role over-identification", "Boundary failure", "Suppressed resentment", "Values-behaviour misalignment"],
    explanation: "David's 70-hour weeks, inability to rest without guilt, identity fused with productivity, and numbness and irritability are textbook burnout. His statement confirms role over-identification. Irritability with family reflects suppressed resentment about the cost of overwork."
  },
  {
    vignette: "Serena, 38, is a nurse who says she used to love her job. She now dreads going in, feels nothing when patients improve, and finds herself annoyed by patients she knows she should feel compassion for. She cries in her car before shifts. Her partner says she has become someone else.",
    session_detail: "Serena, 38, presents with visible fatigue and a flat affect. She has been nursing for 14 years and describes loving it for the first ten. Over the past four years her experience has shifted: she dreads shifts, feels minimal response when patients recover, and notices herself feeling irritated by patients she knows deserve her compassion. She cries in her car most mornings before entering the building and has called in sick seven times in the past two months. She states: 'I don't know who I am if I'm not a good nurse. But I can't access it anymore. I have nothing left.' Her partner of eight years says she has become emotionally unavailable at home. She was oriented. Risk was assessed — she denied suicidal intent but reported wondering if she can continue. Clinician normalized compassion fatigue and burnout as a predictable consequence of sustained care without sufficient recovery, not a personal failing.",
    presenting: "Burnout",
    mechanisms: ["Chronic overextension without recovery", "Values-behaviour misalignment", "Suppressed resentment", "Role over-identification"],
    explanation: "Serena's emotional exhaustion, depersonalization, and cynicism are the three core components of clinical burnout. The discrepancy between her values and current experience reflects values-behaviour misalignment. Crying before shifts indicates she is still in the role despite depletion."
  },
  // COMPLEX
  {
    vignette: "Olivia, 33, describes herself as very successful on paper — good job, good relationship, good apartment. She says she should feel happy but there is something hollow underneath everything. She performs happiness for others and says she has a public face and a private nothing. She cannot remember genuinely laughing in months.",
    session_detail: "Olivia, 33, presents as polished and composed. She is a marketing director, in a committed relationship, financially stable. She describes being unable to explain why she is not happy. She states: 'Everything looks right from the outside. But when I come home and close the door it's just — hollow.' She performs enthusiasm and positivity with colleagues and friends. She describes a 'public face and a private nothing.' She cannot remember laughing genuinely in months. She was oriented. Risk was assessed — she denied suicidal ideation though described occasional thoughts that it would be easier not to exist. This was explored carefully. Clinician named the exhaustion of sustained performance. Olivia became tearful for the first time in session, stating: 'It's so tiring. Being fine.'",
    presenting: "Depression",
    mechanisms: ["Meaning collapse", "Negative self-schema", "Shame"],
    explanation: "Olivia's high-functioning depression is characterized by maintained external performance masking internal emptiness. The public face and private nothing is a dissociative split. Meaning collapse is dominant — success has not produced the meaning she expected."
  },
  {
    vignette: "Felix, 44, says he is constantly irritable and does not know why. He snaps at his kids, his team at work, and his friends. He says he is not a bad person but something is wrong with him. When asked what he is feeling underneath the irritability he goes quiet for a long time and says he does not know. He says he has never really talked about his feelings.",
    session_detail: "Felix, 44, presents with a tightly controlled affect, speaking carefully. He was referred by his GP after his wife raised concerns. He describes escalating irritability over the past 18 months — snapping at his children over small things, losing patience with his team at work, and withdrawing from friends. He states: 'I'm not an angry person. Something is wrong with me.' When clinician asks what he is feeling underneath the irritability he pauses for over a minute, then says: 'I genuinely don't know. I don't think I've ever thought about that.' He has never been in therapy before and describes a family culture where feelings were not discussed. He was oriented. Risk was negative. Clinician asked him to notice what is happening in his body when the irritability rises — Felix identified a tightening in his chest and throat. Clinician reflected that the body often holds feelings that words have not yet found.",
    presenting: "Depression",
    mechanisms: ["Withdrawal", "Shame", "Negative self-schema"],
    explanation: "Felix's irritability as the presenting surface likely masks depression — anger is often more acceptable than sadness. His inability to identify feelings beneath irritability suggests chronic emotional suppression. The negative self-schema is present in 'something is wrong with me.'"
  },
  {
    vignette: "Amara, 20, is a first-year university student who says she has been struggling since arriving on campus. She says everyone else seems to know what they are doing and she is the only one who is confused. She has missed several classes because she could not get out of bed, and when she does attend she sits at the back and leaves immediately after.",
    session_detail: "Amara, 20, presents quietly, sitting with her coat on and bag in her lap as if ready to leave. She started university two months ago and has found the transition significantly harder than anticipated. She has missed three weeks of classes over the past month, unable to get out of bed. When she does attend she chooses the back row and exits before conversation can occur. She calls her parents daily, often in tears. She states: 'Everyone else knows what they're doing. I'm the only one who's completely lost.' She was oriented. Risk was assessed — she denied suicidal ideation but endorsed passive thoughts of going home and not returning. Clinician explored the evidence for her belief that everyone else has it together. Amara acknowledged she had not actually spoken to anyone enough to know. Clinician reflected that the back-of-the-room strategy prevented any data from contradicting her assumption.",
    presenting: "Anxiety",
    mechanisms: ["Threat amplification", "Avoidance", "Safety behaviours"],
    explanation: "Amara's perception that everyone else has it together reflects mind-reading bias combined with social comparison. Class avoidance prevents corrective experiences. Back-row and immediate-exit strategies are safety behaviours. Daily parental calls function as reassurance-seeking."
  },
];
