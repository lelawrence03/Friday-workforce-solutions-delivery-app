// ─────────────────────────────────────────────────────────────────────────────
// FRIDAY WORKFORCE SOLUTIONS — DELIVERY PLAYBOOK DATA
//
// This file contains ALL stage/card/checklist/excellence/template content.
// To update checklist steps, excellence standards, or template names:
//   1. Find the relevant product or add-on below
//   2. Edit the text
//   3. Save → git commit → git push → site updates in 2 minutes
// ─────────────────────────────────────────────────────────────────────────────

// ── SHARED STAGES ─────────────────────────────────────────────────────────────
// These two stages appear on EVERY client regardless of product selection.

export const SHARED_STAGES = [
  {
    id: 'intake',
    label: 'Intake & Contracting',
    color: '#1D4ED8',
    timerDays: 5,
    cards: [
      {
        id: 'intake-contracting',
        title: 'Intake & Contracting',
        checklist: [
          'Complete discovery conversation (minimum 1.5 hours)',
          'Schedule and complete in-person meeting and facility tour',
          'Understand team dynamics, culture, and reporting structure',
          'Review job duties, compensation, and expectations in detail',
          'Agree on next steps and timeline with client',
          'Send tailored proposal mapped to client pain points',
          'Obtain signed agreement and upload to client folder',
          'Upload all discovery documents and notes to shared folder',
          'Log all discovery call notes in client profile',
          'Confirm client knows their next steps and point of contact',
        ],
        excellence: [
          'Client talked more than the recruiter during discovery',
          'Proposal specifically addresses the pain points the client voiced',
          'Agreement signed and returned within 5 business days',
          'All documents uploaded the same day they are received',
          'Client can clearly state what happens next and who to contact',
        ],
        templates: [
          { name: 'RPO Questionnaire', folder: 'intake' },
          { name: 'RPO Proposal Template', folder: 'intake' },
          { name: 'RPO Service Agreement', folder: 'intake' },
          { name: 'Weekly DH Proposal', folder: 'intake' },
          { name: 'Weekly DH Agreement', folder: 'intake' },
          { name: 'Professional DH Proposal', folder: 'intake' },
          { name: 'Rate Calculator', folder: 'intake' },
        ],
      },
    ],
  },
  {
    id: 'handoff',
    label: 'Handoff & Onboarding',
    color: '#7C3AED',
    timerDays: 5,
    cards: [
      {
        id: 'account-setup',
        title: 'App Setup & Account Handoff',
        timerDays: 2,
        checklist: [
          'Confirm all selected add-ons with account manager',
          'Set up client account in the delivery system',
          'Create shared tracking folder in Google Drive or agreed platform',
          'Assign lead recruiter and any supporting recruiters',
          'Build candidate tracking spreadsheet with correct columns',
          'Confirm client has access to shared folder',
        ],
        excellence: [
          'Client account set up within 48 hours of signed agreement',
          'Shared folder organized and labeled before first recruiter touch',
          'All assigned team members notified with context before starting',
        ],
        templates: [
          { name: 'Candidate Spreadsheet Tracking', folder: 'handoff' },
          { name: 'Client Intake Sheet', folder: 'handoff' },
          { name: 'Job Order Worksheet', folder: 'handoff' },
        ],
      },
      {
        id: 'deep-dive',
        title: 'Recruiter Assignment & Company Deep Dive',
        timerDays: 5,
        checklist: [
          'Schedule facility tour with hiring manager',
          'Complete job questionnaire for each open role',
          'Set up Teams/Slack channel and shared drive folders',
          'Conduct recruiter onboarding meeting with client',
          'Train client on candidate tracking system',
          'Document all onboarding meeting notes',
          'Confirm communication cadence (weekly call day and time)',
        ],
        excellence: [
          'Recruiter has toured the facility before sourcing begins',
          'Client and recruiter agree on communication schedule in writing',
          'Every open role has a completed job questionnaire on file',
        ],
        templates: [
          { name: 'Job Order Worksheet FSS-146', folder: 'handoff' },
          { name: 'ICP Questionnaire', folder: 'handoff' },
          { name: 'RPO Recruiter Training Checklist', folder: 'handoff' },
        ],
      },
    ],
  },
  {
    id: 'quality',
    label: 'Quality Control',
    color: '#C41230',
    timerDays: 30,
    cards: [
      {
        id: 'admin-checkin',
        title: 'Admin Check-In (Monthly)',
        timerDays: 30,
        checklist: [
          'Review account dashboard metrics: calls, activities, fills, hours',
          'Confirm recruiter is hitting weekly activity targets',
          'Review candidate pipeline health for all open roles',
          'Identify any bottlenecks or at-risk relationship flags',
          'Confirm all required templates are being completed',
          'Verify success fees are tracked and billed correctly',
          'Confirm client satisfaction has been measured this month',
        ],
        excellence: [
          'Admin can state account status without asking the recruiter',
          'At-risk accounts identified and flagged within 48 hours',
          'Success fees billed on time every time',
          'Client would rate the service 9 out of 10 or higher',
        ],
        templates: [
          { name: '30-Day RPO Service Check-In Questionnaire', folder: 'quality' },
          { name: 'Admin Account Dashboard', folder: 'quality' },
          { name: 'Success Fee Procedure', folder: 'quality' },
        ],
      },
      {
        id: 'reporting',
        title: 'Client Data & Reporting',
        timerDays: 7,
        weekly: true,
        checklist: [
          'Update all KPI metrics in the client dashboard',
          'Track candidates reviewed, screened, submitted, interviewed, hired',
          'Track days each job has been actively searched',
          'Track jobs filled vs still open',
          'Track success fees secured this period',
          'Track total hours spent on account this week',
          'Send weekly activity report to client',
          'Prepare monthly summary for leadership review',
        ],
        excellence: [
          'Data updated before the weekly client call, never during',
          'Client can see measurable progress even before a hire is made',
          'Reports tell a story and show effort — not just numbers',
          'Hours tracked with 30-minute accuracy',
        ],
        templates: [
          { name: 'Client Tracking Spreadsheet', folder: 'quality' },
          { name: 'Weekly Activity Report Template', folder: 'quality' },
          { name: 'Success Fee Tracking Sheet', folder: 'quality' },
          { name: 'Direct Hire Billing Template', folder: 'quality' },
        ],
      },
    ],
  },
]

// ── 7 DELIVERY SERVICE STAGES ─────────────────────────────────────────────────
// These are the core WHAT-WE-DELIVER services. Every client's pipeline is built
// from whichever of these they purchased, sandwiched between the shared
// Intake/Handoff stages at the start and Quality Control at the end.
//
// NOTE: The contract/package TYPE (RPO, Weekly DH, Professional DH, etc.) is
// captured on the client record for context and billing — but the pipeline stages
// below represent the actual delivery work regardless of contract type.

export const PRODUCTS = [

  // ── 1. BUILD IDEAL CANDIDATE PROFILE (ICP) ───────────────────────────────
  {
    id: 'icp',
    label: 'Build Ideal Candidate Profile',
    color: '#7C3AED',
    description: 'Define exactly what a great hire looks like before sourcing begins',
    cards: [
      {
        id: 'icp-build',
        title: 'Build Ideal Candidate Profile (ICP)',
        timerDays: 3,
        checklist: [
          'Schedule 1-hour ICP conversation with hiring manager',
          'Complete AI ICP questionnaire during or after the call',
          'Identify KSAs (knowledge, skills, abilities) required for the role',
          'Define soft skills and culture fit indicators',
          "Define what an '85% match' looks like for this specific role",
          'Build candidate screening questionnaire aligned to ICP criteria',
          'Review finalized ICP with client and confirm accuracy',
          'Share finalized ICP document with client for sign-off',
          'Upload finalized ICP to shared folder and ATS',
        ],
        excellence: [
          'Client and recruiter both agree on exactly what a great candidate looks like before a single resume is reviewed',
          "85% match criteria documented clearly enough that any recruiter on the team could screen to it",
          'Screening questionnaire built and tested before the job posting goes live',
          'Client signs off on ICP — no ambiguity about what they want',
        ],
        templates: [
          { name: 'AI ICP Questionnaire', folder: 'icp' },
          { name: 'ICP Questionnaire Template', folder: 'icp' },
          { name: 'ICP Delivery Template', folder: 'icp' },
          { name: 'AI ICP Prompt', folder: 'icp' },
        ],
      },
    ],
  },

  // ── 2. JOB DESCRIPTION & OPTIMIZED JOB AD ───────────────────────────────
  {
    id: 'jd-ad',
    label: 'Job Description & Optimized Job Ad',
    color: '#0891B2',
    description: 'Write and post job content that attracts the right candidates',
    cards: [
      {
        id: 'job-description',
        title: 'Create Job Description',
        timerDays: 3,
        checklist: [
          'Gather all required role details from hiring manager',
          'Collect any existing job description or previous postings',
          'Identify soft skills and success indicators beyond the listed duties',
          'Complete job description intake template',
          'Draft full job description using intake data',
          'Send draft to client for review and edits',
          'Incorporate all client edits and finalize',
          'File final approved JD in client shared folder',
        ],
        excellence: [
          'JD captures the "why someone would love this job" — not just the requirements',
          'Soft skills and culture fit criteria are clearly defined in the JD',
          'Client approves the JD before any posting goes live',
        ],
        templates: [
          { name: 'Job Description Outline Template', folder: 'jd-ad' },
          { name: 'AI Purpose-Driven JD Prompt', folder: 'jd-ad' },
          { name: 'ChatGPT PDJD Template', folder: 'jd-ad' },
        ],
      },
      {
        id: 'job-ad',
        title: 'Optimized Job Ad',
        timerDays: 2,
        checklist: [
          'Review finalized job description before writing the ad',
          'Run job description through AI optimization prompt',
          'Optimize job title for search engine visibility (no internal jargon)',
          "Add WIIFM (What's In It For Me) candidate-facing language",
          'Include culture hooks and differentiators that set the role apart',
          'Post to all agreed job boards',
          'Send live posting links to client for review and confirmation',
        ],
        excellence: [
          'Job title is searchable — a candidate who has never heard of the company would find it',
          'Ad reads from the candidate\'s perspective, not the employer\'s',
          'Posted live within 48 hours of JD approval',
        ],
        templates: [
          { name: 'AI Job Ad Optimization Prompt', folder: 'jd-ad' },
          { name: 'Job Ad Template Guide (ApplicantPro)', folder: 'jd-ad' },
          { name: 'GPT Job Ad Template', folder: 'jd-ad' },
        ],
      },
    ],
  },

  // ── 3. REGIONAL COMP BENCHMARKING ────────────────────────────────────────
  {
    id: 'comp-benchmarking',
    label: 'Regional Comp Benchmarking',
    color: '#B8860B',
    description: 'Pull regional market data and advise on competitive pay ranges',
    cards: [
      {
        id: 'comp-benchmark',
        title: 'Regional Comp Benchmarking',
        timerDays: 5,
        checklist: [
          'Collect role details and current pay rate from client',
          'Complete Job Comp Intake Form',
          'Pull regional and industry compensation data from benchmarks',
          'Analyze pay band and identify gaps vs. the market',
          'Create visual comparison chart for client presentation',
          'Write executive summary of findings and recommendations',
          'Review findings with client in scheduled call',
          'Provide specific, actionable pay adjustment recommendations',
          'File completed report in client shared folder',
        ],
        excellence: [
          'Data sourced from at least 3 credible regional benchmarks',
          'Recommendations are specific dollar amounts — not just ranges',
          'Client receives clear next steps, not just a data dump',
          'Report delivered within the agreed timeline',
        ],
        templates: [
          { name: 'Job Comp Intake Form', folder: 'comp-benchmarking' },
          { name: 'Comparison Chart Template', folder: 'comp-benchmarking' },
          { name: 'Trained GPT Comp Database', folder: 'comp-benchmarking' },
          { name: 'Regional Data Reference Sheet', folder: 'comp-benchmarking' },
        ],
      },
    ],
  },

  // ── 4. INTERVIEW QUESTIONS & RANKING SYSTEM ──────────────────────────────
  {
    id: 'interview-system',
    label: 'Interview Questions & Ranking System',
    color: '#059669',
    description: 'Build structured interview questions and an objective scoring system',
    cards: [
      {
        id: 'interview-build',
        title: 'Interview Questions & Ranking System',
        timerDays: 3,
        checklist: [
          'Gather JD, job ad, ICP, and any current interview questions client uses',
          'Use AI prompt to build behavioral interview questions aligned to ICP',
          'Build numerical ranking system aligned to ICP success criteria',
          'Create virtual/phone pre-screen questions',
          'Create on-site interview questions for the hiring manager',
          'Review full question set and ranking system with client',
          'Deliver final documents to client and save to shared folder',
          'Schedule brief follow-up call after first candidate is interviewed using the system',
        ],
        excellence: [
          'All questions are behavioral (STAR format) — no hypothetical "what would you do" questions',
          'Ranking system is objective enough that two different interviewers score the same candidate similarly',
          'Client feels confident going into their first interview before the candidate arrives',
        ],
        templates: [
          { name: 'Questionnaire Building AI Prompt', folder: 'interview-system' },
          { name: 'Ranking System AI Prompt', folder: 'interview-system' },
          { name: 'Interview Questionnaire Template', folder: 'interview-system' },
          { name: 'Ranking System Format', folder: 'interview-system' },
          { name: 'Interviewer Quick Reference Card', folder: 'interview-system' },
        ],
      },
    ],
  },

  // ── 5. REFERENCE CHECKING ────────────────────────────────────────────────
  {
    id: 'reference-checking',
    label: 'Reference Checking',
    color: '#065F46',
    description: 'Conduct thorough reference checks with position-specific questions',
    cards: [
      {
        id: 'reference-check',
        title: 'Reference Checking',
        timerDays: 3,
        checklist: [
          'Obtain signed reference release form from candidate',
          'Collect 3 professional references from candidate',
          'Use AI to generate position-specific reference questions tied to ICP',
          'Contact all 3 references — allow up to 5 business days for callbacks',
          'Document all reference answers in detail',
          'Write reference summary with overall hire/no-hire recommendation',
          'Deliver completed summary to client',
          'File all completed reference checks in client shared folder',
        ],
        excellence: [
          'All 3 references contacted and documented before candidate is presented to client',
          'Questions are specific to the role — not a generic reference script',
          'Summary includes a clear recommendation, not just raw answers',
        ],
        templates: [
          { name: 'Reference Checking Questionnaire', folder: 'reference-checking' },
          { name: 'AI Reference Checking Prompt', folder: 'reference-checking' },
          { name: 'Reference Check Phone Scripts', folder: 'reference-checking' },
          { name: 'Reference Quick Reference Card', folder: 'reference-checking' },
        ],
      },
    ],
  },

  // ── 6. APPLICANT COMMUNICATION ───────────────────────────────────────────
  {
    id: 'applicant-comms',
    label: 'Applicant Communication',
    color: '#BE185D',
    description: 'Ensure every applicant receives a professional, timely response',
    cards: [
      {
        id: 'comms-management',
        title: 'Applicant Communication & Status Updates',
        timerDays: 5,
        weekly: true,
        checklist: [
          'Bucket all applicants: Hired / Advancing / Future Pipeline / Not a Fit',
          'Send hired/advancing notification to client within 24 hours of decision',
          'Send rejection communications via job board message or recruiter email',
          'Ensure outreach goes from the client\'s email address when possible',
          'Log all candidate communication with date and outcome',
          'Confirm 100% response rate — no applicant left without a status update',
          'Save strong "future pipeline" candidates to the client\'s talent pool',
        ],
        excellence: [
          '100% of applicants receive a response — zero candidates ghosted',
          'Rejection emails are professional, warm, and brand-appropriate for the client',
          'Future pipeline candidates tagged and available for the next search',
          'Response time to all applicants under 5 business days',
        ],
        templates: [
          { name: 'Rejection Email — Future Potential', folder: 'applicant-comms' },
          { name: 'Rejection Email — Not a Fit', folder: 'applicant-comms' },
          { name: 'Job Board Rejection Template', folder: 'applicant-comms' },
          { name: 'Hired Candidate Communication Template', folder: 'applicant-comms' },
        ],
      },
    ],
  },

  // ── 7. ORIENTATION / ONBOARDING SUPPORT ─────────────────────────────────
  {
    id: 'orientation',
    label: 'Orientation / Onboarding Support',
    color: '#D97706',
    description: 'Support the placed candidate through their first 30 days',
    cards: [
      {
        id: 'orientation-checkins',
        title: 'Orientation & Onboarding Support',
        timerDays: 10,
        checklist: [
          'Conduct two pre-start candidate touches to confirm excitement and logistics',
          'Send First-Day Readiness Checklist to candidate',
          'Confirm documents, location, dress code, start time, and parking details',
          'Day 1: Recruiter check-in call with candidate after their first day',
          'Day 3: Follow-up check-in with candidate on experience so far',
          'Day 10: Full check-in with candidate and separate check-in with hiring manager',
          'Conduct 30-day onboarding review meeting with client',
          'Document all check-in notes and outcomes in client record',
        ],
        excellence: [
          'Candidate shows up on Day 1 fully prepared — zero logistical surprises',
          'All three candidate check-ins completed on schedule, not skipped',
          '30-day review surfaces any performance or fit issues before they become problems',
          'Client feels supported throughout the candidate\'s first month',
        ],
        templates: [
          { name: 'First-Day Readiness Checklist', folder: 'orientation' },
          { name: 'Offer Letter Templates', folder: 'orientation' },
          { name: '30-Day RPO Service Check-In Questionnaire', folder: 'orientation' },
          { name: 'Candidate Check-In Scripts', folder: 'orientation' },
        ],
      },
    ],
  },

]

// ── CONTRACT PACKAGE TYPES (reference only — not pipeline stages) ─────────────
// These define what the client purchased and appear on the client profile
// for context and billing. They do NOT create their own pipeline stages.
// The delivery stages above are what actually gets built into the pipeline.

export const PACKAGE_TYPES = [
  { id: 'rpo-turnkey', label: 'Dedicated Recruiting — Turnkey', category: 'RPO' },
  { id: 'rpo-extension', label: 'Dedicated Recruiting — Extension', category: 'RPO' },
  { id: 'weekly-dh-1', label: 'Weekly Direct Hire — Package 1', category: 'Direct Hire' },
  { id: 'weekly-dh-2', label: 'Weekly Direct Hire — Package 2', category: 'Direct Hire' },
  { id: 'weekly-dh-3', label: 'Weekly Direct Hire — Package 3', category: 'Direct Hire' },
  { id: 'pro-dh-retained', label: 'Professional DH — Retained', category: 'Professional' },
  { id: 'pro-dh-engaged', label: 'Professional DH — Engaged', category: 'Professional' },
  { id: 'pro-dh-contingent', label: 'Professional DH — Contingent', category: 'Professional' },
  { id: 'c2h', label: 'Contract-to-Hire', category: 'Contract' },
  { id: 'contract-temp', label: 'Contract Staffing (Temps)', category: 'Contract' },
  { id: 'split-shifts', label: 'Split Shifts', category: 'Contract' },
  { id: 'eor', label: 'Employer of Record', category: 'Contract' },
]

// ── ADD-ONS ───────────────────────────────────────────────────────────────────
// These appear as optional stages when selected during client setup.

export const ADDONS = [
  {
    id: 'comp-benchmarking',
    label: 'Regional Comp Benchmarking',
    color: '#B8860B',
    cards: [
      {
        id: 'comp-benchmark-card',
        title: 'Regional Comp Benchmarking',
        timerDays: 5,
        checklist: [
          'Collect role details and current pay from client',
          'Complete Job Comp Intake Form',
          'Pull regional and industry compensation data',
          'Analyze pay band and identify gaps',
          'Create comparison chart for client presentation',
          'Write executive summary of findings',
          'Review findings with client in scheduled call',
          'Provide specific pay adjustment recommendations',
        ],
        excellence: [
          'Data sourced from at least 3 credible regional benchmarks',
          'Recommendations are specific — not just ranges',
          'Client receives actionable next steps, not just data',
        ],
        templates: [
          { name: 'Job Comp Intake Form', folder: 'addons' },
          { name: 'Comparison Chart Template', folder: 'addons' },
          { name: 'Regional Data Reference Sheet', folder: 'addons' },
        ],
      },
    ],
  },
  {
    id: 'pre-employment',
    label: 'Pre-Employment Assessments',
    color: '#0891B2',
    cards: [
      {
        id: 'assessments-card',
        title: 'Pre-Employment Assessments',
        timerDays: 2,
        checklist: [
          'Determine assessment type: skills, behavioral, or cognitive',
          'Set up assessment through agreed platform',
          'Send candidate invitation with clear deadline',
          'Review results against ICP criteria',
          'Write assessment summary and recommendation',
          'Forward results to client with context',
          'Log assessment completion for each candidate',
        ],
        excellence: [
          'Assessment type selected based on role requirements, not default',
          'Results framed in context of ICP — not just raw scores',
          'Every assessed candidate receives a documented outcome',
        ],
        templates: [
          { name: 'In-House Assessment Template', folder: 'addons' },
          { name: 'Assessment Results Summary Template', folder: 'addons' },
        ],
      },
    ],
  },
  {
    id: 'reference-checking',
    label: 'Reference Checking',
    color: '#065F46',
    cards: [
      {
        id: 'reference-card',
        title: 'Reference Checking',
        timerDays: 3,
        checklist: [
          'Obtain signed reference release form from candidate',
          'Collect 3 professional references from candidate',
          'Use AI to generate position-specific reference questions',
          'Contact all 3 references (allow 5 business days for callbacks)',
          'Document all reference answers verbatim',
          'Write reference summary with overall recommendation',
          'Deliver summary to client or deliver question list for self-check',
          'File completed reference checks in client folder',
        ],
        excellence: [
          'All 3 references contacted before submitting candidate to client',
          'Questions are role-specific — not generic',
          'Summary includes a clear recommendation, not just raw answers',
        ],
        templates: [
          { name: 'Reference Checking Questionnaire', folder: 'addons' },
          { name: 'AI Reference Checking Prompt', folder: 'addons' },
          { name: 'Reference Check Scripts', folder: 'addons' },
          { name: 'Reference Quick Reference Card', folder: 'addons' },
        ],
      },
    ],
  },
  {
    id: 'interview-questions',
    label: 'Interview Questions & Ranking System',
    color: '#7C3AED',
    cards: [
      {
        id: 'interview-questions-card',
        title: 'Interview Questions & Ranking System',
        timerDays: 3,
        checklist: [
          'Gather JD, job ad, ICP, and any current interview questions',
          'Use AI to build behavioral interview questions aligned to ICP',
          'Build numerical ranking system aligned to ICP criteria',
          'Create virtual/phone screening questions',
          'Create on-site interview questions for hiring manager',
          'Review full question set with client',
          'Deliver final documents to client and save to shared folder',
          'Schedule follow-up to review ranking system after first use',
        ],
        excellence: [
          'Questions are behavioral (STAR format) — not hypothetical',
          'Ranking system is objective and can be used by any interviewer',
          'Client feels confident interviewing before first candidate is scheduled',
        ],
        templates: [
          { name: 'Questionnaire Building AI Prompt', folder: 'addons' },
          { name: 'Ranking System AI Prompt', folder: 'addons' },
          { name: 'Interview Questionnaire Template', folder: 'addons' },
          { name: 'Ranking System Format', folder: 'addons' },
          { name: 'Interviewer Quick Reference Card', folder: 'addons' },
        ],
      },
    ],
  },
  {
    id: 'orientation-support',
    label: 'Orientation / Onboarding Support',
    color: '#BE185D',
    cards: [
      {
        id: 'orientation-card',
        title: 'Orientation & Onboarding Support',
        timerDays: 10,
        checklist: [
          'Conduct two pre-start candidate touches (confirm excitement and logistics)',
          'Send First-Day Readiness Checklist to candidate',
          'Confirm documents, location, dress code, schedule, and parking',
          'Day 1: Recruiter check-in call with candidate after first day',
          'Day 3: Follow-up check-in with candidate on experience so far',
          'Day 10: Full check-in with candidate and hiring manager separately',
          'Conduct 30-day onboarding review meeting with client',
          'Document all check-in notes and outcomes',
        ],
        excellence: [
          'Candidate never shows up unprepared — zero first-day surprises',
          'All three candidate check-ins completed on schedule',
          '30-day review identifies any issues before they become problems',
        ],
        templates: [
          { name: 'First-Day Readiness Checklist', folder: 'addons' },
          { name: 'Offer Letter Templates', folder: 'addons' },
          { name: '30-Day RPO Service Check-In Questionnaire', folder: 'addons' },
          { name: 'Candidate Check-In Scripts', folder: 'addons' },
        ],
      },
    ],
  },
  {
    id: 'outbound-recruiting',
    label: 'Outbound Recruiting',
    color: '#D97706',
    cards: [
      {
        id: 'outbound-card',
        title: 'Outbound Recruiting Campaign',
        timerDays: 7,
        weekly: true,
        checklist: [
          'Build targeted list of passive candidates from LinkedIn and other sources',
          'Craft personalized outreach messages for each target profile',
          'Send outreach in batches and track response rates',
          'Follow up with non-responders at 5 and 10 day marks',
          'Qualify all responders against ICP before submitting',
          'Report outreach metrics to client weekly',
        ],
        excellence: [
          'Outreach messages are personalized — not mass blasted',
          'Response rate tracked and strategy adjusted weekly',
          'Only ICP-qualified responders submitted to client',
        ],
        templates: [
          { name: 'Outbound Outreach Message Templates', folder: 'addons' },
          { name: 'Outbound Campaign Tracker', folder: 'addons' },
        ],
      },
    ],
  },
  {
    id: 'offer-letter',
    label: 'Offer Letter Guidance',
    color: '#1D4ED8',
    cards: [
      {
        id: 'offer-letter-card',
        title: 'Offer Letter Guidance',
        timerDays: 2,
        checklist: [
          'Review offer details with client before letter is drafted',
          'Identify any terms that could create risk or confusion',
          'Provide template and language recommendations',
          'Review final offer letter before it is sent to candidate',
          'Coach client on how to present the offer verbally',
          'Follow up post-offer to confirm acceptance or address counters',
        ],
        excellence: [
          'Offer presented verbally before written letter is sent',
          'Compensation, start date, and contingencies all clearly stated',
          'Acceptance confirmed in writing before close is counted',
        ],
        templates: [
          { name: 'Offer Letter Template Library', folder: 'addons' },
          { name: 'Offer Presentation Script', folder: 'addons' },
        ],
      },
    ],
  },
  {
    id: 'candidate-marketing',
    label: 'Candidate Marketing',
    color: '#92400E',
    cards: [
      {
        id: 'candidate-marketing-card',
        title: 'Candidate Marketing',
        timerDays: 7,
        checklist: [
          'Define target candidate persona with client',
          'Design social media content for job promotion',
          'Post to agreed channels on agreed schedule',
          'Monitor engagement and adjust content weekly',
          'Track applications sourced from marketing efforts',
          'Report marketing performance metrics monthly',
        ],
        excellence: [
          'Content speaks to the candidate, not the employer',
          'At least one piece of content posted per week per role',
          'All marketing-sourced applications tracked separately',
        ],
        templates: [
          { name: 'Candidate Marketing Content Calendar', folder: 'addons' },
          { name: 'Social Post Templates', folder: 'addons' },
        ],
      },
    ],
  },
]

// ── TEAM MEMBERS ──────────────────────────────────────────────────────────────
export const TEAM_MEMBERS = [
  { id: 'kelsey', name: 'Kelsey M.', role: 'admin', email: 'kelsey@fridayservices.com' },
  { id: 'william', name: 'William R.', role: 'recruiter', email: 'william@fridayservices.com' },
  { id: 'lisa', name: 'Lisa T.', role: 'recruiter', email: 'lisa@fridayservices.com' },
  { id: 'recruiter-a', name: 'Recruiter A', role: 'recruiter', email: 'recruitera@fridayservices.com' },
  { id: 'recruiter-b', name: 'Recruiter B', role: 'recruiter', email: 'recruiterb@fridayservices.com' },
]

// ── HELPER: BUILD CLIENT PIPELINE ─────────────────────────────────────────────
// Given a list of selected product IDs and add-on IDs, returns the full
// ordered stage list for that client's pipeline.
//
// Stage order: Intake → Handoff → [selected products] → [selected add-ons] → Quality
//
export function buildClientPipeline(selectedProductIds = [], selectedAddonIds = []) {
  const [intakeStage, handoffStage, qualityStage] = [
    SHARED_STAGES[0],
    SHARED_STAGES[1],
    SHARED_STAGES[2],
  ]

  const productStages = PRODUCTS.filter(p => selectedProductIds.includes(p.id))
  const addonStages = ADDONS.filter(a => selectedAddonIds.includes(a.id))

  return [intakeStage, handoffStage, ...productStages, ...addonStages, qualityStage]
}

// ── HELPER: COMPUTE STAGE COMPLETION ─────────────────────────────────────────
// Given a client's cardData (checklist state), returns completion % per stage.
export function computeStageCompletion(pipeline, cardData = {}) {
  const result = {}
  for (const stage of pipeline) {
    let total = 0
    let done = 0
    for (const card of stage.cards) {
      const checks = cardData[card.id] || {}
      total += card.checklist.length
      done += card.checklist.filter((_, i) => checks[i]).length
    }
    result[stage.id] = total === 0 ? 0 : Math.round((done / total) * 100)
  }
  return result
}
