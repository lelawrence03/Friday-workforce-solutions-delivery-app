import { useState, useEffect, useCallback } from "react";

// ── Brand Colors ──────────────────────────────────────────────────────────────
const BRAND = {
  red: "#C41230",
  darkGray: "#2C2C2C",
  midGray: "#5A5A5A",
  lightGray: "#F5F5F5",
  border: "#E0E0E0",
  white: "#FFFFFF",
  gold: "#B8860B",
  green: "#1A7A3A",
  amber: "#D97706",
  blue: "#1D4ED8",
};

// ── Static Data ───────────────────────────────────────────────────────────────
const DELIVERY_STAGES = [
  {
    id: "intake",
    label: "Intake & Contracting",
    color: BRAND.blue,
    cards: [
      {
        id: "intake-contracting",
        title: "Intake & Contracting",
        description: "Discovery conversation, proposal, agreement execution",
        timer_days: null,
        checklist: [
          "Conduct discovery conversation (up to 1.5 hrs) — ask more than you talk",
          "Request in-person meeting & facility tour",
          "Understand current team dynamic, workflows, and hiring challenges",
          "Review company culture, job duties, and shift details",
          "Discuss and agree on next steps with client",
          "Send proposal for client review",
          "Obtain signed agreement / contract",
          "Upload signed agreement to client file",
          "Log all notes in Sales & Services system",
        ],
        excellence: [
          "Client feels heard — they talked more than we did during discovery",
          "Proposal clearly maps services to the exact pain points they expressed",
          "Agreement signed within 5 business days of first meeting",
          "All documents uploaded and notes logged same day as meeting",
          "Client knows exactly what happens next and when",
        ],
        templates: [
          "RPO Questionnaire Template",
          "RPO Proposal Template",
          "RPO Service Packages Proposal.docx",
          "RPO Service Package Agreement.docx",
          "Weekly Direct Hire Proposal Template",
          "Weekly DH Service Package Agreement.docx",
          "Professional DH Proposal Template",
          "Rate Calculator (WF Pivot RPO_Rate_Finder.xlsx)",
        ],
      },
    ],
  },
  {
    id: "handoff",
    label: "Handoff & Onboarding",
    color: "#7C3AED",
    cards: [
      {
        id: "app-setup",
        title: "App Setup / Account Handoff",
        description: "Transfer from contracting to delivery; confirm add-ons",
        timer_days: 2,
        checklist: [
          "Confirm all add-ons selected and documented in client profile",
          "Set up client account in Friday's system",
          "Create shared tracking folder (Teams/Google Drive)",
          "Assign recruiter(s) to the account",
          "Build out candidate tracking spreadsheet",
          "Ensure client has access to shared tracking system",
        ],
        excellence: [
          "Client account fully configured before recruiter kickoff meeting",
          "All add-ons documented and scheduled",
          "Tracking spreadsheet is clean, labeled, and shared with client",
        ],
        templates: [
          "Candidate Spreadsheet Tracking Template",
          "Client Intake Sheet",
          "Job Order Worksheet",
        ],
      },
      {
        id: "recruiter-deep-dive",
        title: "Recruiter Assignment & Company Deep Dive",
        description: "Full infrastructure setup, onsite tour, training",
        timer_days: 5,
        checklist: [
          "Schedule and complete facility tour with assigned recruiter",
          "Complete large questionnaire for each open job order",
          "Set up all teams/folders and candidate tracking",
          "Conduct onboarding meeting with client",
          "Train client on how to use Friday's shared system",
          "Document all meetings and notes in client file",
          "Confirm communication cadence and meeting schedule with client",
        ],
        excellence: [
          "Recruiter arrives at tour fully briefed on client and role(s)",
          "All job order worksheets completed and filed after tour",
          "Client knows exactly how to access the tracking spreadsheet",
          "First weekly check-in scheduled before leaving the meeting",
        ],
        templates: [
          "Job Order Worksheet FSS-146",
          "Ideal Candidate Profile Questionnaire Template",
          "RPO Recruiter Training Checklist",
        ],
      },
    ],
  },
  {
    id: "setup",
    label: "Setup Client Products",
    color: BRAND.amber,
    cards: [
      {
        id: "job-description",
        title: "Create Job Description",
        description: "Build accurate JD using structured intake",
        timer_days: 3,
        checklist: [
          "Gather role details: title, pay, shift, duties, skills, certifications",
          "Collect existing JD or job posting if available",
          "Identify soft skills, team environment, and success indicators",
          "Complete purpose-driven recruiting intake template",
          "Draft job description using standard structure",
          "Send draft to client for review",
          "Incorporate client edits and finalize",
          "File final JD in client folder",
        ],
        excellence: [
          "JD accurately reflects role — no vague language",
          "Draft delivered to client within 48 hours of kickoff",
          "Client reviews and approves within 1–2 days of receiving draft",
          "Final JD answers WIIFM for both employer AND candidate",
        ],
        templates: [
          "Job Description Outline Template",
          "AI Purpose Driven Job Description Prompt",
          "ChatGPT Template to process PDJD",
        ],
      },
      {
        id: "job-ad",
        title: "Create Optimized Job Ad",
        description: "High-converting ad with SEO and candidate targeting",
        timer_days: 2,
        checklist: [
          "Review finalized job description",
          "Run intake through AI job ad prompt",
          "Optimize job title for search visibility",
          "Add WIIFM language for target candidate",
          "Include employer brand / culture hooks",
          "Post to relevant job boards",
          "Send ad copy to client for awareness",
        ],
        excellence: [
          "Job ad reads differently from a JD — it sells the role",
          "Keyword-optimized title and description for AI screening",
          "Posted within 24 hours of JD approval",
          "Client confirms they reviewed and are comfortable with posting",
        ],
        templates: [
          "AI Purpose Driven Job Description Prompt",
          "Job-Ad-Template-Guide-ApplicantPro.pdf",
          "GPT Job Ad creation template",
        ],
      },
      {
        id: "icp",
        title: "Build Ideal Candidate Profile (ICP)",
        description: "Define the 85% match criteria for candidate screening",
        timer_days: 3,
        checklist: [
          "Schedule ICP questionnaire conversation with hiring manager (1 hr)",
          "Complete AI ICP questionnaire with client",
          "Identify KSAs, soft skills, and culture fit requirements",
          "Define 85% match criteria for screening",
          "Build screening questionnaire from ICP",
          "Review ICP with client and get sign-off",
          "Share finalized ICP document with client",
          "Document ICP in ATS / client file",
        ],
        excellence: [
          "Client says 'yes, that's exactly who we're looking for'",
          "ICP delivered as a branded Friday document — not just notes",
          "Screening questionnaire is directly traceable to ICP criteria",
          "Completed within 1 week of kickoff meeting",
        ],
        templates: [
          "AI ICP Questionnaire Template",
          "Ideal Candidate Profile Questionnaire Template.docx",
          "ICP Delivery Template (client-facing)",
          "AI prompt for questionnaire for ICP",
        ],
      },
      {
        id: "comp-benchmarking",
        title: "Regional Comp Benchmarking",
        description: "Data-backed pay range report vs. market",
        timer_days: 5,
        checklist: [
          "Collect role details: title, skills, shift, experience level, current pay",
          "Complete Job Comp Intake Form",
          "Pull data from regional labor reports and industry databases",
          "Analyze recommended pay band (low / mid / high)",
          "Create comparison chart showing client's position in market",
          "Write summary explaining impact on hiring success",
          "Review report with client and answer questions",
          "Provide recommended pay adjustments if needed",
        ],
        excellence: [
          "Report includes at least 3 regional data sources",
          "Client can immediately see where they stand in the market",
          "Summary explains 'what this means for your hiring' in plain language",
          "Delivered within 5 business days of intake",
        ],
        templates: [
          "Job Comp Intake Form",
          "Comparison Chart Template for Comp Benchmarking",
          "Trained GPT database for Compensation Benchmarking",
          "Regional data reference sheet",
        ],
      },
      {
        id: "interview-questions",
        title: "Interview Questions & Ranking System",
        description: "Structured behavioral interview toolkit",
        timer_days: 3,
        checklist: [
          "Gather JD, job ad, ICP, and current interview questions from client",
          "Use AI prompt to build behavioral interview questions",
          "Build ranking system aligned to ICP criteria",
          "Create virtual (phone/video) screening questions",
          "Create on-site interview questions",
          "Review questionnaire and ranking system with client (30 min)",
          "Deliver finalized documents to client",
          "Schedule follow-up after client starts using questions",
        ],
        excellence: [
          "Every question ties directly to an ICP requirement",
          "Ranking system is simple enough for any hiring manager to use",
          "Client can run consistent, fair interviews without coaching",
          "Follow-up scheduled 2 weeks after delivery to capture feedback",
        ],
        templates: [
          "Questionnaire Building Prompt for AI",
          "Ranking System Prompt for AI",
          "Interview Questionnaire Template",
          "Ranking System Format",
          "Quick Reference Card for Interviews and Ref Checking.docx",
        ],
      },
    ],
  },
  {
    id: "active",
    label: "Active Recruiting",
    color: BRAND.green,
    cards: [
      {
        id: "active-recruiting",
        title: "Active Recruiting (Weekly)",
        description: "Core recruiting delivery — runs weekly until filled",
        timer_days: 7,
        weekly: true,
        checklist: [
          "Screen all new inbound candidates against questionnaire/ICP",
          "Source candidates through all active channels",
          "Review and contact internal referral / pipeline candidates",
          "Log all candidate activity in candidate tracking spreadsheet",
          "Update client tracking spreadsheet with pipeline status",
          "Send weekly activity report to client",
          "Conduct weekly 15-min check-in call with hiring manager",
          "Submit qualified candidates with screening summary",
          "Coordinate interview scheduling for qualified candidates",
          "Document all client feedback on submitted candidates",
        ],
        excellence: [
          "100% of applicants receive communication — none ghosted",
          "Tracking spreadsheet updated before weekly check-in call",
          "Weekly report sent every Monday (or agreed day)",
          "Client spends time ONLY on interviewing pre-qualified candidates",
          "Hiring manager feedback captured and applied to next week's search",
        ],
        templates: [
          "Candidate Spreadsheet Tracking Template",
          "RPO Service Check-In Template",
          "Success Fee Procedure.docx",
          "RPO Candidate Rejection Communication Toolkit.docx",
          "Rejection email templates (future potential / no thank you)",
        ],
      },
      {
        id: "candidate-pipeline",
        title: "Candidate Pipeline & Sourcing",
        description: "Internal referrals, job boards, and pipeline management",
        timer_days: 7,
        weekly: true,
        checklist: [
          "Monitor and respond to all job board applications",
          "Activate internal referral program if applicable",
          "Access client ATS/HRIS for internal pipeline candidates",
          "Re-engage past runner-up candidates from similar roles",
          "Run targeted sourcing for passive candidates (if Elite package)",
          "Ensure all applicant sources are tracked by channel",
        ],
        excellence: [
          "Multiple sourcing channels active simultaneously",
          "Internal referral program live within 2 weeks of kickoff",
          "Past candidate re-engagement completed within first 10 days",
          "Source-of-hire tracked for every candidate submitted",
        ],
        templates: [
          "Referral Program Template (budget)",
          "Referral Program Template (no budget)",
          "Candidate Sourcing Log",
        ],
      },
      {
        id: "candidate-communication",
        title: "Applicant Communication & Status Updates",
        description: "Professional communication loop for all applicants",
        timer_days: 5,
        checklist: [
          "Bucket all candidates: Hired / Future Pipeline / Not a Fit",
          "Send hired notification to client with next steps",
          "Send rejection letters through job board OR email (use correct template)",
          "Ensure all communication comes from client email when possible",
          "Log all communication in candidate tracking sheet",
          "Confirm 100% of applicants have received a response",
        ],
        excellence: [
          "Zero candidates leave the process without communication",
          "Rejection letters are professional and preserve employer brand",
          "Future pipeline candidates are tagged for re-engagement",
          "Client can confirm 100% of their applicants were communicated with",
        ],
        templates: [
          "Rejection email template — future potential",
          "Rejection email template — not a fit",
          "Job board rejection template",
          "Hired candidate communication template",
        ],
      },
    ],
  },
  {
    id: "addons",
    label: "Add-Ons",
    color: "#0891B2",
    cards: [
      {
        id: "reference-checks",
        title: "Reference Checking",
        description: "Thorough reference checks with position-specific questions",
        timer_days: 3,
        checklist: [
          "Have candidate sign reference check release form",
          "Collect reference list from candidate (3 minimum)",
          "Use AI prompt to build position-specific reference questions",
          "Contact each reference (allow up to 5 business days for callbacks)",
          "Document all reference answers on template",
          "Deliver reference check summary to client",
          "OR deliver reference question list to client if they prefer to call",
          "File completed reference checks in client folder",
        ],
        excellence: [
          "All reference questions tie back to specific ICP requirements",
          "At least 2 of 3 references are previous direct supervisors",
          "Summary delivered within 2 business days of completing calls",
          "Client has documented validation of candidate's key claims",
        ],
        templates: [
          "Reference Checking Questionnaire Template",
          "AI prompt for Reference Checking Questions",
          "Reference Check Scripts (Internal Team)",
          "Quick Reference Card for Interviews and Ref Checking.docx",
        ],
      },
      {
        id: "pre-employment-assessments",
        title: "Pre-Employment Assessments",
        description: "Skills and behavioral assessments matched to role",
        timer_days: 2,
        checklist: [
          "Determine assessment type needed (skills / behavioral / cognitive)",
          "Set up assessment through platform for candidate",
          "Send assessment invitation to candidate with deadline",
          "Review results against ICP / role requirements",
          "Summarize results and forward to client with context",
          "Log assessment completion in candidate file",
        ],
        excellence: [
          "Assessment type is directly justified by ICP requirements",
          "Results summary explains what findings mean for the role — not just scores",
          "Candidate receives assessment within 24 hours of selection",
        ],
        templates: [
          "In-house assessment template",
          "Assessment results summary template",
          "Platform instructions for candidate",
        ],
      },
      {
        id: "comp-benchmarking-addon",
        title: "Regional Comp Benchmarking (Add-On)",
        description: "Standalone comp study for existing clients",
        timer_days: 5,
        checklist: [
          "Complete Job Comp Intake Form",
          "Gather all relevant role and location data",
          "Research 3+ regional data sources",
          "Build comparison chart",
          "Write plain-language summary for client",
          "Deliver and review report with client",
        ],
        excellence: [
          "Client leaves the review saying 'now I understand why we can't find anyone'",
          "Report includes actionable pay band recommendation",
          "Delivered within 5 business days",
        ],
        templates: [
          "Job Comp Intake Form",
          "Comparison Chart Template",
          "Regional data reference sheet",
        ],
      },
      {
        id: "orientation-support",
        title: "Orientation / Onboarding Support",
        description: "First-day readiness and post-hire check-ins",
        timer_days: 10,
        checklist: [
          "Two pre-start candidate touch points (between offer and start date)",
          "Send First-Day Readiness Checklist to candidate",
          "Confirm: documents, location, dress code, schedule, parking",
          "Day-1 recruiter check-in with candidate",
          "Day-3 check-in call (candidate and client)",
          "Day-10 check-in call",
          "30-day check-in meeting with client",
          "Document all check-ins in client file",
        ],
        excellence: [
          "Zero no-shows — every candidate was touched before start date",
          "Client confirms new hire had everything they needed day one",
          "30-day check-in captures retention risk early",
        ],
        templates: [
          "First-Day Readiness Checklist",
          "Offer Letter Templates",
          "30-Day RPO Service Check-In Questionnaire.docx",
          "Candidate check-in call scripts",
        ],
      },
    ],
  },
  {
    id: "quality",
    label: "Quality Control",
    color: BRAND.red,
    cards: [
      {
        id: "admin-checkin",
        title: "Admin Check-Ins (Friday Leadership)",
        description: "Leadership oversight of account health",
        timer_days: 30,
        checklist: [
          "Review account dashboard metrics (calls, activities, fills, hours)",
          "Confirm recruiter is hitting weekly activity targets",
          "Review candidate pipeline health with recruiter",
          "Identify any bottlenecks or client relationship risks",
          "Confirm all templates and documents are being completed",
          "Check that success fees have been tracked and billed correctly",
          "Confirm client satisfaction is being measured",
        ],
        excellence: [
          "Admin knows account status without asking recruiter to summarize",
          "Any at-risk accounts flagged and actioned within 48 hours",
          "Success fees billed on time every time",
          "Client would rate experience 9/10 or higher at check-in",
        ],
        templates: [
          "30-Day RPO Service Check-In Questionnaire.docx",
          "Admin account dashboard",
          "Success Fee Procedure.docx",
        ],
      },
      {
        id: "data-reporting",
        title: "Client Data & Reporting",
        description: "KPI tracking and performance reporting",
        timer_days: 7,
        weekly: true,
        checklist: [
          "Update all KPI metrics in client dashboard",
          "Track: # candidates reviewed, screened, submitted, interviewed, hired",
          "Track: days job has been actively searched",
          "Track: jobs filled vs. jobs open",
          "Track: success fees secured",
          "Track: hours spent on account (recruiter time)",
          "Send weekly report to client",
          "Prepare monthly summary for leadership review",
        ],
        excellence: [
          "Data is updated BEFORE the weekly client call — never during",
          "Client can see real progress even before a hire is made",
          "Reports tell a story — not just numbers",
          "Hours tracked to within 30-minute accuracy",
        ],
        templates: [
          "Client tracking spreadsheet",
          "Weekly activity report template",
          "Success Fee Tracking (Tageos RPO Candidate Tracking.xlsx)",
          "Direct Hire Billing.xlsx",
        ],
      },
    ],
  },
];

const ADDONS_OPTIONS = [
  "Regional Comp Benchmarking",
  "Pre-Employment Assessments",
  "Reference Checking",
  "Interview Questions & Ranking System",
  "Orientation / Onboarding Support",
  "Outbound Recruiting",
  "Offer Letter Guidance",
  "After-Hours Recruiting Coverage",
  "Internal Referral Program Setup",
  "Candidate Marketing Package",
  "Reporting Dashboard (Live)",
  "Job Fair Support",
];

const PACKAGE_OPTIONS = [
  "Dedicated Recruiting Support – Turnkey",
  "Dedicated Recruiting Support – Extension",
  "Weekly Direct Hire – Package 1 (Turnkey)",
  "Weekly Direct Hire – Package 2 (Extension)",
  "Weekly Direct Hire – Package 3 (Core)",
  "Professional Direct Hire – Retained",
  "Professional Direct Hire – Engaged",
  "Professional Direct Hire – Contingent",
  "Contract-to-Hire",
  "Contract (Temps)",
  "Split Shifts",
  "Employer of Record",
];

const TEAM_MEMBERS = ["Kelsey", "William", "Lisa", "Recruiter A", "Recruiter B", "Admin"];

// ── Helpers ───────────────────────────────────────────────────────────────────
const uid = () => Math.random().toString(36).slice(2, 9);
const today = () => new Date().toISOString().slice(0, 10);

function daysBetween(dateStr) {
  if (!dateStr) return null;
  const diff = Date.now() - new Date(dateStr).getTime();
  return Math.floor(diff / 86400000);
}

// ── Storage helpers ───────────────────────────────────────────────────────────
async function loadData(key) {
  try {
    const r = await window.storage.get(key);
    return r ? JSON.parse(r.value) : null;
  } catch { return null; }
}
async function saveData(key, val) {
  try { await window.storage.set(key, JSON.stringify(val)); } catch {}
}

// ══════════════════════════════════════════════════════════════════════════════
// ROOT APP
// ══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [view, setView] = useState("dashboard"); // dashboard | clients | client | card | tasks | admin
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedStage, setSelectedStage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user] = useState({ name: "Kelsey M.", role: "admin", email: "kelsey@fridayservices.com" });
  const [taskView, setTaskView] = useState(false);
  const [showNewClient, setShowNewClient] = useState(false);

  useEffect(() => {
    loadData("friday-clients").then(d => {
      if (d) setClients(d);
      setLoading(false);
    });
  }, []);

  const persist = useCallback((updated) => {
    setClients(updated);
    saveData("friday-clients", updated);
  }, []);

  const openClient = (c) => { setSelectedClient(c); setView("client"); setSelectedCard(null); };
  const openCard = (c, stage) => { setSelectedCard(c); setSelectedStage(stage); setView("card"); };

  if (loading) return <LoadingScreen />;

  if (view === "card" && selectedCard && selectedClient)
    return <CardView card={selectedCard} stage={selectedStage} client={selectedClient}
             clients={clients} persist={persist} onBack={() => setView("client")} user={user} />;

  if (view === "client" && selectedClient)
    return <ClientView client={selectedClient} clients={clients} persist={persist}
             onBack={() => setView("dashboard")} openCard={openCard} user={user} />;

  if (view === "tasks")
    return <TasksView clients={clients} persist={persist} user={user} onBack={() => setView("dashboard")} />;

  if (view === "admin")
    return <AdminView clients={clients} onBack={() => setView("dashboard")} />;

  return (
    <DashboardView clients={clients} user={user}
      openClient={openClient} showNew={showNewClient} setShowNew={setShowNewClient}
      persist={persist} setView={setView} />
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// LOADING
// ══════════════════════════════════════════════════════════════════════════════
function LoadingScreen() {
  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:"100vh", background: BRAND.darkGray }}>
      <div style={{ textAlign:"center", color: BRAND.white }}>
        <div style={{ fontSize:32, fontWeight:900, letterSpacing:2, color: BRAND.red }}>FRIDAY</div>
        <div style={{ fontSize:13, letterSpacing:4, opacity:.6, marginTop:4 }}>WORKFORCE SOLUTIONS</div>
        <div style={{ marginTop:24, fontSize:13, opacity:.5 }}>Loading delivery system…</div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// TOP NAV
// ══════════════════════════════════════════════════════════════════════════════
function TopNav({ user, setView, currentView, onBack, backLabel }) {
  return (
    <div style={{ background: BRAND.darkGray, padding:"0 24px", display:"flex", alignItems:"center", justifyContent:"space-between", height:56, flexShrink:0 }}>
      <div style={{ display:"flex", alignItems:"center", gap:16 }}>
        {onBack && (
          <button onClick={onBack} style={{ background:"none", border:"none", color:BRAND.red, cursor:"pointer", fontSize:13, display:"flex", alignItems:"center", gap:6, padding:"4px 8px", borderRadius:4 }}>
            ← {backLabel || "Back"}
          </button>
        )}
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <span style={{ color: BRAND.red, fontWeight:900, fontSize:18, letterSpacing:1 }}>FRIDAY</span>
          <span style={{ color: BRAND.white, fontSize:13, opacity:.7, letterSpacing:.5 }}>Workforce Solutions</span>
        </div>
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
        {[{label:"Dashboard",v:"dashboard"},{label:"Clients",v:"clients"},{label:"My Tasks",v:"tasks"},{label:"Admin",v:"admin"}].map(n => (
          <button key={n.v} onClick={() => setView(n.v)}
            style={{ background: currentView===n.v ? BRAND.red : "transparent", color: BRAND.white,
              border:"none", cursor:"pointer", padding:"6px 14px", borderRadius:4, fontSize:12, fontWeight:600, letterSpacing:.3 }}>
            {n.label}
          </button>
        ))}
        <div style={{ marginLeft:12, background:"rgba(255,255,255,.1)", borderRadius:20, padding:"4px 12px", color: BRAND.white, fontSize:12 }}>
          {user.name}
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// DASHBOARD
// ══════════════════════════════════════════════════════════════════════════════
function DashboardView({ clients, user, openClient, showNew, setShowNew, persist, setView }) {
  const totalJobs = clients.reduce((s,c) => s + (c.jobs||[]).length, 0);
  const totalFilled = clients.reduce((s,c) => s + (c.jobs||[]).filter(j=>j.filled).length, 0);
  const activeClients = clients.filter(c => c.status === "active").length;
  const totalRevenue = clients.reduce((s,c) => s + ((c.jobs||[]).reduce((js,j) => js + (j.successFee||0),0)),0);

  return (
    <div style={{ height:"100vh", display:"flex", flexDirection:"column", background: BRAND.lightGray, fontFamily:"Georgia, serif" }}>
      <TopNav user={user} setView={setView} currentView="dashboard" />
      <div style={{ flex:1, overflow:"auto", padding:28 }}>
        {/* Stats */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:28 }}>
          {[
            { label:"Active Clients", value: activeClients, color: BRAND.green },
            { label:"Total Jobs Open", value: totalJobs - totalFilled, color: BRAND.blue },
            { label:"Jobs Filled", value: totalFilled, color: BRAND.green },
            { label:"Success Fees", value:`$${totalRevenue.toLocaleString()}`, color: BRAND.gold },
          ].map(s => (
            <div key={s.label} style={{ background: BRAND.white, borderRadius:8, padding:"20px 24px", boxShadow:"0 1px 4px rgba(0,0,0,.08)", borderTop:`3px solid ${s.color}` }}>
              <div style={{ fontSize:28, fontWeight:700, color: s.color }}>{s.value}</div>
              <div style={{ fontSize:12, color: BRAND.midGray, marginTop:4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Client Cards */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
          <h2 style={{ margin:0, fontSize:18, color: BRAND.darkGray }}>Client Accounts</h2>
          <button onClick={() => setShowNew(true)}
            style={{ background: BRAND.red, color: BRAND.white, border:"none", borderRadius:6, padding:"8px 20px", cursor:"pointer", fontWeight:700, fontSize:13 }}>
            + New Client
          </button>
        </div>

        {clients.length === 0 && (
          <div style={{ textAlign:"center", padding:60, color: BRAND.midGray }}>
            <div style={{ fontSize:40, marginBottom:12 }}>📋</div>
            <div style={{ fontSize:16 }}>No clients yet. Add your first client to get started.</div>
          </div>
        )}

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:16 }}>
          {clients.map(c => <ClientCard key={c.id} client={c} onClick={() => openClient(c)} />)}
        </div>

        {showNew && <NewClientModal onClose={() => setShowNew(false)} onSave={(nc) => { const updated=[...clients,nc]; persist(updated); setShowNew(false); openClient(nc); }} />}
      </div>
    </div>
  );
}

function ClientCard({ client, onClick }) {
  const openJobs = (client.jobs||[]).filter(j => !j.filled).length;
  const filledJobs = (client.jobs||[]).filter(j => j.filled).length;
  const successFees = (client.jobs||[]).reduce((s,j) => s + (j.successFee||0), 0);
  const stageProgress = DELIVERY_STAGES.map(s => {
    const done = client.stageCompletion?.[s.id] || 0;
    return { stage: s, done };
  });

  return (
    <div onClick={onClick} style={{ background: BRAND.white, borderRadius:10, padding:20, boxShadow:"0 2px 8px rgba(0,0,0,.07)", cursor:"pointer", transition:"box-shadow .2s", borderLeft:`4px solid ${client.status==="active"?BRAND.green:BRAND.midGray}` }}
      onMouseEnter={e => e.currentTarget.style.boxShadow="0 4px 16px rgba(0,0,0,.13)"}
      onMouseLeave={e => e.currentTarget.style.boxShadow="0 2px 8px rgba(0,0,0,.07)"}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
        <div>
          <div style={{ fontWeight:700, fontSize:16, color: BRAND.darkGray }}>{client.name}</div>
          <div style={{ fontSize:12, color: BRAND.midGray, marginTop:2 }}>{client.contact?.name} · {client.package}</div>
        </div>
        <span style={{ background: client.status==="active"?`${BRAND.green}20`:BRAND.lightGray, color: client.status==="active"?BRAND.green:BRAND.midGray, borderRadius:12, padding:"2px 10px", fontSize:11, fontWeight:700 }}>
          {client.status||"pending"}
        </span>
      </div>

      {/* Stage progress dots */}
      <div style={{ display:"flex", gap:6, marginBottom:14 }}>
        {stageProgress.map(({stage, done}) => (
          <div key={stage.id} title={stage.label}
            style={{ flex:1, height:4, borderRadius:2, background: done ? stage.color : BRAND.border }} />
        ))}
      </div>

      <div style={{ display:"flex", gap:16, fontSize:12 }}>
        <div><span style={{ fontWeight:700, color: BRAND.blue }}>{openJobs}</span> <span style={{ color: BRAND.midGray }}>open</span></div>
        <div><span style={{ fontWeight:700, color: BRAND.green }}>{filledJobs}</span> <span style={{ color: BRAND.midGray }}>filled</span></div>
        {successFees > 0 && <div><span style={{ fontWeight:700, color: BRAND.gold }}>${successFees.toLocaleString()}</span> <span style={{ color: BRAND.midGray }}>fees</span></div>}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// NEW CLIENT MODAL
// ══════════════════════════════════════════════════════════════════════════════
function NewClientModal({ onClose, onSave }) {
  const [form, setForm] = useState({ name:"", package:"", status:"active", addons:[], notes:"",
    contact:{ name:"", title:"", email:"", phone:"" } });
  const set = (k,v) => setForm(f => ({...f,[k]:v}));
  const setContact = (k,v) => setForm(f => ({...f, contact:{...f.contact,[k]:v}}));
  const toggleAddon = (a) => setForm(f => ({ ...f, addons: f.addons.includes(a)?f.addons.filter(x=>x!==a):[...f.addons,a] }));

  const save = () => {
    if (!form.name.trim()) return;
    onSave({ ...form, id: uid(), createdAt: today(), jobs:[], stageCompletion:{}, cardData:{}, tasks:[], hoursLog:[], activityLog:[] });
  };

  return (
    <Modal title="New Client Setup" onClose={onClose} onSave={save} saveLabel="Create Client">
      <div style={{ display:"grid", gap:14 }}>
        <Field label="Company Name *" value={form.name} onChange={v=>set("name",v)} />
        <Select label="Package / Product" value={form.package} onChange={v=>set("package",v)} options={PACKAGE_OPTIONS} />

        <div style={{ fontWeight:700, fontSize:13, color: BRAND.darkGray, marginTop:4, borderBottom:`1px solid ${BRAND.border}`, paddingBottom:6 }}>Point of Contact</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
          <Field label="Name" value={form.contact.name} onChange={v=>setContact("name",v)} />
          <Field label="Title" value={form.contact.title} onChange={v=>setContact("title",v)} />
          <Field label="Email" value={form.contact.email} onChange={v=>setContact("email",v)} />
          <Field label="Phone" value={form.contact.phone} onChange={v=>setContact("phone",v)} />
        </div>

        <div style={{ fontWeight:700, fontSize:13, color: BRAND.darkGray, marginTop:4, borderBottom:`1px solid ${BRAND.border}`, paddingBottom:6 }}>Add-Ons Selected</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
          {ADDONS_OPTIONS.map(a => (
            <label key={a} style={{ display:"flex", alignItems:"center", gap:8, fontSize:12, cursor:"pointer" }}>
              <input type="checkbox" checked={form.addons.includes(a)} onChange={()=>toggleAddon(a)} />
              {a}
            </label>
          ))}
        </div>

        <div>
          <label style={{ fontSize:12, fontWeight:700, color: BRAND.midGray, display:"block", marginBottom:4 }}>Notes</label>
          <textarea value={form.notes} onChange={e=>set("notes",e.target.value)} rows={3}
            style={{ width:"100%", border:`1px solid ${BRAND.border}`, borderRadius:6, padding:8, fontSize:13, resize:"vertical", boxSizing:"border-box" }} />
        </div>
      </div>
    </Modal>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// CLIENT VIEW
// ══════════════════════════════════════════════════════════════════════════════
function ClientView({ client, clients, persist, onBack, openCard, user }) {
  const [tab, setTab] = useState("pipeline"); // pipeline | jobs | tasks | activity | profile
  const [showNewJob, setShowNewJob] = useState(false);

  const updateClient = (updates) => {
    const updated = clients.map(c => c.id === client.id ? {...c,...updates} : c);
    persist(updated);
  };

  const clientData = clients.find(c => c.id === client.id) || client;
  const openJobs = (clientData.jobs||[]).filter(j=>!j.filled).length;

  return (
    <div style={{ height:"100vh", display:"flex", flexDirection:"column", background: BRAND.lightGray, fontFamily:"Georgia, serif" }}>
      <TopNav user={user} setView={()=>{}} currentView="client" onBack={onBack} backLabel="Dashboard" />

      {/* Client Header */}
      <div style={{ background: BRAND.darkGray, padding:"16px 28px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div>
          <div style={{ color: BRAND.white, fontSize:22, fontWeight:700 }}>{clientData.name}</div>
          <div style={{ color:"rgba(255,255,255,.6)", fontSize:13, marginTop:2 }}>
            {clientData.package} · {clientData.contact?.name} · {clientData.contact?.email}
          </div>
          {clientData.addons?.length > 0 && (
            <div style={{ display:"flex", gap:6, marginTop:8, flexWrap:"wrap" }}>
              {clientData.addons.map(a => (
                <span key={a} style={{ background: BRAND.red, color: BRAND.white, fontSize:10, padding:"2px 8px", borderRadius:10 }}>{a}</span>
              ))}
            </div>
          )}
        </div>
        <div style={{ display:"flex", gap:16, textAlign:"right" }}>
          <div style={{ color: BRAND.white }}>
            <div style={{ fontSize:20, fontWeight:700, color: BRAND.amber }}>{openJobs}</div>
            <div style={{ fontSize:11, opacity:.6 }}>Open Jobs</div>
          </div>
          <div style={{ color: BRAND.white }}>
            <div style={{ fontSize:20, fontWeight:700, color: BRAND.green }}>{(clientData.jobs||[]).filter(j=>j.filled).length}</div>
            <div style={{ fontSize:11, opacity:.6 }}>Filled</div>
          </div>
          <div style={{ color: BRAND.white }}>
            <div style={{ fontSize:20, fontWeight:700, color: BRAND.gold }}>${(clientData.jobs||[]).reduce((s,j)=>s+(j.successFee||0),0).toLocaleString()}</div>
            <div style={{ fontSize:11, opacity:.6 }}>Success Fees</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ background: BRAND.white, borderBottom:`1px solid ${BRAND.border}`, padding:"0 28px", display:"flex", gap:0 }}>
        {[["pipeline","Pipeline"],["jobs","Jobs"],["tasks","Tasks"],["activity","Activity"],["profile","Profile"]].map(([v,l]) => (
          <button key={v} onClick={() => setTab(v)}
            style={{ background:"none", border:"none", borderBottom: tab===v?`3px solid ${BRAND.red}`:"3px solid transparent",
              color: tab===v ? BRAND.red : BRAND.midGray, cursor:"pointer", padding:"14px 18px", fontSize:13, fontWeight:tab===v?700:400 }}>
            {l}
          </button>
        ))}
      </div>

      <div style={{ flex:1, overflow:"auto", padding:28 }}>
        {tab === "pipeline" && <PipelineTab client={clientData} updateClient={updateClient} openCard={openCard} />}
        {tab === "jobs" && <JobsTab client={clientData} updateClient={updateClient} showNew={showNewJob} setShowNew={setShowNewJob} />}
        {tab === "tasks" && <TasksTab client={clientData} updateClient={updateClient} />}
        {tab === "activity" && <ActivityTab client={clientData} updateClient={updateClient} />}
        {tab === "profile" && <ProfileTab client={clientData} updateClient={updateClient} />}
      </div>
    </div>
  );
}

// ── Pipeline Tab ──────────────────────────────────────────────────────────────
function PipelineTab({ client, updateClient, openCard }) {
  return (
    <div>
      {DELIVERY_STAGES.map(stage => {
        const completion = client.stageCompletion?.[stage.id] || 0;
        return (
          <div key={stage.id} style={{ marginBottom:28 }}>
            {/* Stage Header */}
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:12 }}>
              <div style={{ width:12, height:12, borderRadius:"50%", background: stage.color }} />
              <div style={{ fontWeight:700, fontSize:15, color: BRAND.darkGray }}>{stage.label}</div>
              <div style={{ flex:1, height:2, background:`${stage.color}30` }}>
                <div style={{ height:"100%", width:`${completion}%`, background: stage.color, transition:"width .4s" }} />
              </div>
              <div style={{ fontSize:12, color: BRAND.midGray }}>{completion}%</div>
            </div>

            {/* Cards */}
            <div style={{ display:"flex", gap:14, overflowX:"auto", paddingBottom:4 }}>
              {stage.cards.map(card => {
                const cardData = client.cardData?.[card.id] || {};
                const completed = cardData.completed || false;
                const checkedCount = Object.values(cardData.checks||{}).filter(Boolean).length;
                const totalChecks = card.checklist.length;
                const pct = Math.round((checkedCount/totalChecks)*100);
                const daysSince = cardData.lastUpdated ? daysBetween(cardData.lastUpdated) : null;
                const overdue = card.timer_days && daysSince !== null && daysSince > card.timer_days;

                return (
                  <div key={card.id} onClick={() => openCard(card, stage)}
                    style={{ minWidth:200, maxWidth:240, background: BRAND.white, borderRadius:10, padding:16, cursor:"pointer",
                      boxShadow:"0 2px 6px rgba(0,0,0,.07)", borderTop:`3px solid ${completed?stage.color:overdue?BRAND.red:BRAND.border}`,
                      opacity: completed ? .7 : 1, transition:"opacity .2s, box-shadow .2s" }}
                    onMouseEnter={e=>e.currentTarget.style.boxShadow="0 4px 14px rgba(0,0,0,.13)"}
                    onMouseLeave={e=>e.currentTarget.style.boxShadow="0 2px 6px rgba(0,0,0,.07)"}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
                      <div style={{ fontWeight:700, fontSize:13, color: BRAND.darkGray, lineHeight:1.3 }}>{card.title}</div>
                      {completed && <span style={{ fontSize:16 }}>✅</span>}
                    </div>
                    <div style={{ fontSize:11, color: BRAND.midGray, marginBottom:10, lineHeight:1.4 }}>{card.description}</div>

                    {/* Progress */}
                    <div style={{ height:4, background: BRAND.border, borderRadius:2, marginBottom:8 }}>
                      <div style={{ height:"100%", width:`${pct}%`, background: stage.color, borderRadius:2, transition:"width .3s" }} />
                    </div>
                    <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, color: BRAND.midGray }}>
                      <span>{checkedCount}/{totalChecks} steps</span>
                      {overdue && <span style={{ color: BRAND.red, fontWeight:700 }}>⚠ Overdue</span>}
                      {card.weekly && <span style={{ color: BRAND.blue }}>↻ Weekly</span>}
                    </div>
                    {daysSince !== null && !completed && card.timer_days && (
                      <div style={{ marginTop:6, fontSize:10, color: overdue ? BRAND.red : BRAND.midGray }}>
                        Last updated {daysSince}d ago (target: {card.timer_days}d)
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Jobs Tab ──────────────────────────────────────────────────────────────────
function JobsTab({ client, updateClient, showNew, setShowNew }) {
  const [form, setForm] = useState({ title:"", payRate:"", startDate:"", filled:false, successFee:0, daysSearching:0, notes:"" });
  const setF = (k,v) => setForm(f=>({...f,[k]:v}));

  const addJob = () => {
    if (!form.title.trim()) return;
    const jobs = [...(client.jobs||[]), { ...form, id:uid(), createdAt:today() }];
    updateClient({ jobs });
    setForm({ title:"", payRate:"", startDate:"", filled:false, successFee:0, daysSearching:0, notes:"" });
    setShowNew(false);
  };

  const toggleFilled = (jobId) => {
    const jobs = (client.jobs||[]).map(j => j.id===jobId ? {...j, filled:!j.filled, filledDate:!j.filled?today():null} : j);
    updateClient({ jobs });
  };

  const updateSuccessFee = (jobId, fee) => {
    const jobs = (client.jobs||[]).map(j => j.id===jobId ? {...j, successFee:parseFloat(fee)||0} : j);
    updateClient({ jobs });
  };

  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
        <h3 style={{ margin:0, fontSize:16, color: BRAND.darkGray }}>Job Orders</h3>
        <button onClick={() => setShowNew(true)}
          style={{ background: BRAND.red, color: BRAND.white, border:"none", borderRadius:6, padding:"8px 16px", cursor:"pointer", fontWeight:700, fontSize:13 }}>
          + Add Job
        </button>
      </div>

      {showNew && (
        <div style={{ background: BRAND.white, borderRadius:10, padding:20, marginBottom:16, boxShadow:"0 2px 8px rgba(0,0,0,.08)" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:12 }}>
            <Field label="Job Title *" value={form.title} onChange={v=>setF("title",v)} />
            <Field label="Pay Rate" value={form.payRate} onChange={v=>setF("payRate",v)} />
            <Field label="Target Start Date" type="date" value={form.startDate} onChange={v=>setF("startDate",v)} />
            <Field label="Success Fee ($)" type="number" value={form.successFee} onChange={v=>setF("successFee",v)} />
          </div>
          <div style={{ marginBottom:12 }}>
            <label style={{ fontSize:12, fontWeight:700, color: BRAND.midGray, display:"block", marginBottom:4 }}>Notes</label>
            <textarea value={form.notes} onChange={e=>setF("notes",e.target.value)} rows={2}
              style={{ width:"100%", border:`1px solid ${BRAND.border}`, borderRadius:6, padding:8, fontSize:13, boxSizing:"border-box" }} />
          </div>
          <div style={{ display:"flex", gap:10 }}>
            <button onClick={addJob} style={{ background: BRAND.green, color: BRAND.white, border:"none", borderRadius:6, padding:"8px 20px", cursor:"pointer", fontWeight:700 }}>Add Job</button>
            <button onClick={() => setShowNew(false)} style={{ background: BRAND.border, color: BRAND.darkGray, border:"none", borderRadius:6, padding:"8px 16px", cursor:"pointer" }}>Cancel</button>
          </div>
        </div>
      )}

      {(client.jobs||[]).length === 0 && <div style={{ color: BRAND.midGray, padding:40, textAlign:"center" }}>No job orders yet.</div>}

      <div style={{ display:"grid", gap:12 }}>
        {(client.jobs||[]).map(job => {
          const days = job.createdAt ? daysBetween(job.createdAt) : 0;
          return (
            <div key={job.id} style={{ background: BRAND.white, borderRadius:10, padding:16, boxShadow:"0 1px 4px rgba(0,0,0,.07)", borderLeft:`4px solid ${job.filled?BRAND.green:BRAND.amber}` }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                <div>
                  <div style={{ fontWeight:700, fontSize:15, color: BRAND.darkGray }}>{job.title}</div>
                  <div style={{ fontSize:12, color: BRAND.midGray, marginTop:2 }}>
                    Pay: {job.payRate || "TBD"} · Added: {job.createdAt} · Searching {days} days
                  </div>
                  {job.notes && <div style={{ fontSize:12, color: BRAND.midGray, marginTop:4, fontStyle:"italic" }}>{job.notes}</div>}
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                  <div style={{ textAlign:"right" }}>
                    <div style={{ fontSize:11, color: BRAND.midGray, marginBottom:4 }}>Success Fee</div>
                    <input type="number" value={job.successFee||0} onChange={e => updateSuccessFee(job.id, e.target.value)}
                      style={{ width:80, border:`1px solid ${BRAND.border}`, borderRadius:4, padding:"4px 6px", fontSize:13, textAlign:"right" }} />
                  </div>
                  <button onClick={() => toggleFilled(job.id)}
                    style={{ background: job.filled?BRAND.midGray:BRAND.green, color: BRAND.white, border:"none", borderRadius:6, padding:"8px 14px", cursor:"pointer", fontSize:12, fontWeight:700, whiteSpace:"nowrap" }}>
                    {job.filled ? "Mark Open" : "Mark Filled"}
                  </button>
                </div>
              </div>
              {job.filled && <div style={{ marginTop:8, fontSize:12, color: BRAND.green, fontWeight:700 }}>✅ Filled {job.filledDate}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Tasks Tab (per client) ────────────────────────────────────────────────────
function TasksTab({ client, updateClient }) {
  const [text, setText] = useState(""); const [assignee, setAssignee] = useState(TEAM_MEMBERS[0]);
  const [dueDate, setDueDate] = useState(""); const [stage, setStage] = useState(DELIVERY_STAGES[0].id);

  const addTask = () => {
    if (!text.trim()) return;
    const tasks = [...(client.tasks||[]), { id:uid(), text, assignee, dueDate, stage, done:false, createdAt:today() }];
    updateClient({ tasks });
    setText(""); setDueDate("");
  };

  const toggleDone = (id) => {
    const tasks = (client.tasks||[]).map(t => t.id===id?{...t,done:!t.done}:t);
    updateClient({ tasks });
  };

  const deleteTask = (id) => {
    const tasks = (client.tasks||[]).filter(t=>t.id!==id);
    updateClient({ tasks });
  };

  const grouped = TEAM_MEMBERS.reduce((acc, m) => {
    acc[m] = (client.tasks||[]).filter(t=>t.assignee===m && !t.done);
    return acc;
  }, {});

  return (
    <div>
      {/* Add task */}
      <div style={{ background: BRAND.white, borderRadius:10, padding:16, marginBottom:20, boxShadow:"0 1px 4px rgba(0,0,0,.07)" }}>
        <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:10, marginBottom:10 }}>
          <Field label="Action Step" value={text} onChange={setText} />
          <Select label="Assign To" value={assignee} onChange={setAssignee} options={TEAM_MEMBERS} />
          <Select label="Stage" value={stage} onChange={setStage} options={DELIVERY_STAGES.map(s=>s.id)} labels={DELIVERY_STAGES.map(s=>s.label)} />
          <Field label="Due Date" type="date" value={dueDate} onChange={setDueDate} />
        </div>
        <button onClick={addTask} style={{ background: BRAND.red, color: BRAND.white, border:"none", borderRadius:6, padding:"8px 20px", cursor:"pointer", fontWeight:700 }}>
          + Add Action
        </button>
      </div>

      {/* Open tasks */}
      <h3 style={{ margin:"0 0 12px", fontSize:15, color: BRAND.darkGray }}>Open Actions</h3>
      {(client.tasks||[]).filter(t=>!t.done).length === 0 && <div style={{ color: BRAND.midGray, marginBottom:20 }}>No open tasks.</div>}
      <div style={{ display:"grid", gap:8, marginBottom:24 }}>
        {(client.tasks||[]).filter(t=>!t.done).map(task => (
          <TaskRow key={task.id} task={task} onToggle={()=>toggleDone(task.id)} onDelete={()=>deleteTask(task.id)} />
        ))}
      </div>

      {/* Completed */}
      {(client.tasks||[]).filter(t=>t.done).length > 0 && (
        <>
          <h3 style={{ margin:"0 0 12px", fontSize:15, color: BRAND.midGray }}>Completed</h3>
          <div style={{ display:"grid", gap:8, opacity:.6 }}>
            {(client.tasks||[]).filter(t=>t.done).map(task => (
              <TaskRow key={task.id} task={task} onToggle={()=>toggleDone(task.id)} onDelete={()=>deleteTask(task.id)} done />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function TaskRow({ task, onToggle, onDelete, done }) {
  const stageColor = DELIVERY_STAGES.find(s=>s.id===task.stage)?.color || BRAND.midGray;
  return (
    <div style={{ display:"flex", alignItems:"center", gap:10, background: BRAND.white, borderRadius:8, padding:"10px 14px", boxShadow:"0 1px 3px rgba(0,0,0,.06)" }}>
      <input type="checkbox" checked={done||false} onChange={onToggle} style={{ cursor:"pointer", width:16, height:16 }} />
      <div style={{ flex:1 }}>
        <div style={{ fontSize:13, color: BRAND.darkGray, textDecoration: done?"line-through":"none" }}>{task.text}</div>
        <div style={{ fontSize:11, color: BRAND.midGray, marginTop:2 }}>
          <span style={{ background:`${stageColor}20`, color: stageColor, borderRadius:10, padding:"1px 8px", marginRight:8 }}>{task.stage}</span>
          {task.assignee} {task.dueDate && `· Due: ${task.dueDate}`}
        </div>
      </div>
      <button onClick={onDelete} style={{ background:"none", border:"none", color: BRAND.midGray, cursor:"pointer", fontSize:16 }}>×</button>
    </div>
  );
}

// ── Activity Tab ──────────────────────────────────────────────────────────────
function ActivityTab({ client, updateClient }) {
  const [form, setForm] = useState({ type:"call", note:"", hours:0, date:today() });
  const setF = (k,v) => setForm(f=>({...f,[k]:v}));

  const log = () => {
    if (!form.note.trim()) return;
    const activityLog = [...(client.activityLog||[]), { ...form, id:uid() }];
    updateClient({ activityLog });
    setForm({ type:"call", note:"", hours:0, date:today() });
  };

  const totalCalls = (client.activityLog||[]).filter(a=>a.type==="call").length;
  const totalHours = (client.activityLog||[]).reduce((s,a)=>s+(parseFloat(a.hours)||0),0);

  return (
    <div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14, marginBottom:24 }}>
        {[{l:"Total Calls",v:totalCalls,c:BRAND.blue},{l:"Total Meetings",v:(client.activityLog||[]).filter(a=>a.type==="meeting").length,c:BRAND.green},{l:"Hours Logged",v:totalHours.toFixed(1),c:BRAND.amber}].map((s,i)=>(
          <div key={i} style={{ background: BRAND.white, borderRadius:8, padding:16, textAlign:"center", boxShadow:"0 1px 4px rgba(0,0,0,.07)" }}>
            <div style={{ fontSize:24, fontWeight:700, color: s.c }}>{s.v??s["v"]}</div>
            <div style={{ fontSize:12, color: BRAND.midGray, marginTop:4 }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Log activity */}
      <div style={{ background: BRAND.white, borderRadius:10, padding:16, marginBottom:20, boxShadow:"0 1px 4px rgba(0,0,0,.07)" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 2fr 1fr 1fr", gap:10, marginBottom:10 }}>
          <Select label="Type" value={form.type} onChange={v=>setF("type",v)} options={["call","meeting","email","task","other"]} />
          <Field label="Note" value={form.note} onChange={v=>setF("note",v)} />
          <Field label="Hours" type="number" value={form.hours} onChange={v=>setF("hours",v)} />
          <Field label="Date" type="date" value={form.date} onChange={v=>setF("date",v)} />
        </div>
        <button onClick={log} style={{ background: BRAND.blue, color: BRAND.white, border:"none", borderRadius:6, padding:"8px 20px", cursor:"pointer", fontWeight:700 }}>+ Log Activity</button>
      </div>

      <div style={{ display:"grid", gap:8 }}>
        {[...(client.activityLog||[])].reverse().map(a => (
          <div key={a.id} style={{ background: BRAND.white, borderRadius:8, padding:"10px 14px", display:"flex", gap:12, alignItems:"center", boxShadow:"0 1px 3px rgba(0,0,0,.06)" }}>
            <div style={{ fontSize:18 }}>{ {call:"📞",meeting:"🤝",email:"✉️",task:"✅",other:"📝"}[a.type]||"📝" }</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:13, color: BRAND.darkGray }}>{a.note}</div>
              <div style={{ fontSize:11, color: BRAND.midGray, marginTop:2 }}>{a.date} {a.hours>0 && `· ${a.hours}h`}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Profile Tab ───────────────────────────────────────────────────────────────
function ProfileTab({ client, updateClient }) {
  const [form, setForm] = useState({ ...client });
  const setF = (k,v) => setForm(f=>({...f,[k]:v}));
  const setContact = (k,v) => setForm(f=>({...f,contact:{...f.contact,[k]:v}}));
  const toggleAddon = (a) => setForm(f=>({...f, addons: f.addons?.includes(a)?f.addons.filter(x=>x!==a):[...(f.addons||[]),a]}));

  return (
    <div style={{ maxWidth:700 }}>
      <div style={{ background: BRAND.white, borderRadius:10, padding:24, boxShadow:"0 1px 4px rgba(0,0,0,.07)", marginBottom:16 }}>
        <h3 style={{ margin:"0 0 16px", fontSize:16 }}>Client Information</h3>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:14 }}>
          <Field label="Company Name" value={form.name||""} onChange={v=>setF("name",v)} />
          <Select label="Package" value={form.package||""} onChange={v=>setF("package",v)} options={PACKAGE_OPTIONS} />
          <Select label="Status" value={form.status||"active"} onChange={v=>setF("status",v)} options={["active","paused","closed"]} />
        </div>
        <div>
          <label style={{ fontSize:12, fontWeight:700, color: BRAND.midGray, display:"block", marginBottom:4 }}>Notes</label>
          <textarea value={form.notes||""} onChange={e=>setF("notes",e.target.value)} rows={3}
            style={{ width:"100%", border:`1px solid ${BRAND.border}`, borderRadius:6, padding:8, fontSize:13, boxSizing:"border-box" }} />
        </div>
      </div>

      <div style={{ background: BRAND.white, borderRadius:10, padding:24, boxShadow:"0 1px 4px rgba(0,0,0,.07)", marginBottom:16 }}>
        <h3 style={{ margin:"0 0 16px", fontSize:16 }}>Point of Contact</h3>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
          <Field label="Name" value={form.contact?.name||""} onChange={v=>setContact("name",v)} />
          <Field label="Title" value={form.contact?.title||""} onChange={v=>setContact("title",v)} />
          <Field label="Email" value={form.contact?.email||""} onChange={v=>setContact("email",v)} />
          <Field label="Phone" value={form.contact?.phone||""} onChange={v=>setContact("phone",v)} />
        </div>
      </div>

      <div style={{ background: BRAND.white, borderRadius:10, padding:24, boxShadow:"0 1px 4px rgba(0,0,0,.07)", marginBottom:16 }}>
        <h3 style={{ margin:"0 0 16px", fontSize:16 }}>Add-Ons</h3>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
          {ADDONS_OPTIONS.map(a => (
            <label key={a} style={{ display:"flex", alignItems:"center", gap:8, fontSize:13, cursor:"pointer" }}>
              <input type="checkbox" checked={(form.addons||[]).includes(a)} onChange={()=>toggleAddon(a)} />
              {a}
            </label>
          ))}
        </div>
      </div>

      <button onClick={() => updateClient(form)}
        style={{ background: BRAND.red, color: BRAND.white, border:"none", borderRadius:6, padding:"10px 28px", cursor:"pointer", fontWeight:700, fontSize:14 }}>
        Save Changes
      </button>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// CARD VIEW
// ══════════════════════════════════════════════════════════════════════════════
function CardView({ card, stage, client, clients, persist, onBack, user }) {
  const clientData = clients.find(c=>c.id===client.id)||client;
  const cardData = clientData.cardData?.[card.id] || {};
  const checks = cardData.checks || {};
  const notes = cardData.notes || "";
  const completed = cardData.completed || false;
  const [tab, setTab] = useState("checklist"); // checklist | excellence | templates | tasks | documents
  const [newTask, setNewTask] = useState(""); const [newAssignee, setNewAssignee] = useState(TEAM_MEMBERS[0]);
  const [showComplete, setShowComplete] = useState(false);
  const [docName, setDocName] = useState(""); const [docUrl, setDocUrl] = useState("");

  const updateCardData = (updates) => {
    const newCardData = { ...(clientData.cardData||{}), [card.id]: { ...cardData, ...updates, lastUpdated: today() } };
    const stageCompletion = computeStageCompletion(clients.find(c=>c.id===client.id)||client, card.id, newCardData);
    const updated = clients.map(c => c.id===client.id ? {...c, cardData: newCardData, stageCompletion} : c);
    persist(updated);
  };

  const computeStageCompletion = (c, updatedCardId, newCardData) => {
    const sc = {};
    DELIVERY_STAGES.forEach(s => {
      const cardDatas = s.cards.map(cd => (cd.id===updatedCardId ? newCardData[updatedCardId] : (c.cardData||{})[cd.id]) || {});
      const totalChecks = s.cards.reduce((sum,cd)=>sum+cd.checklist.length,0);
      const done = s.cards.reduce((sum,cd,i)=>sum+Object.values(cardDatas[i]?.checks||{}).filter(Boolean).length,0);
      sc[s.id] = totalChecks > 0 ? Math.round((done/totalChecks)*100) : 0;
    });
    return sc;
  };

  const toggleCheck = (idx) => {
    const newChecks = { ...checks, [idx]: !checks[idx] };
    updateCardData({ checks: newChecks });
  };

  const checkedCount = Object.values(checks).filter(Boolean).length;
  const pct = Math.round((checkedCount/card.checklist.length)*100);

  const markComplete = () => {
    if (pct < 100) { alert("Please complete all checklist items before marking this card complete."); return; }
    updateCardData({ completed: true });
    setShowComplete(false);
  };

  const addCardTask = () => {
    if (!newTask.trim()) return;
    const tasks = [...(clientData.tasks||[]), { id:uid(), text:newTask, assignee:newAssignee, stage:stage.id, cardId:card.id, done:false, createdAt:today() }];
    const updated = clients.map(c=>c.id===client.id?{...c,tasks}:c);
    persist(updated);
    setNewTask("");
  };

  const addDocument = () => {
    if (!docName.trim()) return;
    const docs = [...(cardData.documents||[]), { id:uid(), name:docName, url:docUrl, addedAt:today() }];
    updateCardData({ documents: docs });
    setDocName(""); setDocUrl("");
  };

  const daysSince = cardData.lastUpdated ? daysBetween(cardData.lastUpdated) : null;
  const overdue = card.timer_days && daysSince !== null && daysSince > card.timer_days;

  return (
    <div style={{ height:"100vh", display:"flex", flexDirection:"column", background: BRAND.lightGray, fontFamily:"Georgia, serif" }}>
      <TopNav user={user} setView={()=>{}} currentView="card" onBack={onBack} backLabel={clientData.name} />

      {/* Card Header */}
      <div style={{ background: stage.color, padding:"16px 28px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div>
          <div style={{ color: BRAND.white, fontSize:11, opacity:.8, marginBottom:4 }}>{stage.label}</div>
          <div style={{ color: BRAND.white, fontSize:22, fontWeight:700 }}>{card.title}</div>
          <div style={{ color:"rgba(255,255,255,.75)", fontSize:13, marginTop:2 }}>{card.description}</div>
        </div>
        <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:10 }}>
          {/* Progress ring */}
          <div style={{ background:"rgba(255,255,255,.2)", borderRadius:8, padding:"8px 18px", textAlign:"center" }}>
            <div style={{ color: BRAND.white, fontSize:26, fontWeight:700 }}>{pct}%</div>
            <div style={{ color:"rgba(255,255,255,.75)", fontSize:11 }}>{checkedCount}/{card.checklist.length} steps</div>
          </div>
          {completed ? (
            <span style={{ background: BRAND.green, color: BRAND.white, borderRadius:20, padding:"4px 16px", fontWeight:700, fontSize:12 }}>✅ COMPLETE</span>
          ) : (
            <button onClick={markComplete}
              style={{ background: BRAND.white, color: stage.color, border:"none", borderRadius:20, padding:"6px 16px", fontWeight:700, fontSize:12, cursor:"pointer" }}>
              Mark Complete
            </button>
          )}
          {overdue && <span style={{ background:"rgba(255,0,0,.3)", color: BRAND.white, borderRadius:10, padding:"2px 10px", fontSize:11 }}>⚠ Overdue by {daysSince - card.timer_days}d</span>}
          {card.timer_days && <span style={{ color:"rgba(255,255,255,.7)", fontSize:11 }}>Target: every {card.timer_days} days{card.weekly?" (weekly)":""}</span>}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ background: BRAND.white, borderBottom:`1px solid ${BRAND.border}`, padding:"0 28px", display:"flex", gap:0 }}>
        {[["checklist","Delivery Checklist"],["excellence","Excellence Standard"],["templates","Templates"],["tasks","Action Steps"],["documents","Documents"]].map(([v,l]) => (
          <button key={v} onClick={() => setTab(v)}
            style={{ background:"none", border:"none", borderBottom: tab===v?`3px solid ${stage.color}`:"3px solid transparent",
              color: tab===v ? stage.color : BRAND.midGray, cursor:"pointer", padding:"14px 16px", fontSize:13, fontWeight:tab===v?700:400 }}>
            {l}
          </button>
        ))}
      </div>

      <div style={{ flex:1, overflow:"auto", padding:28 }}>
        {tab === "checklist" && (
          <div style={{ maxWidth:700 }}>
            {/* Progress bar */}
            <div style={{ background: BRAND.border, borderRadius:4, height:8, marginBottom:20 }}>
              <div style={{ height:"100%", width:`${pct}%`, background: stage.color, borderRadius:4, transition:"width .3s" }} />
            </div>
            {card.checklist.map((item, i) => (
              <label key={i} style={{ display:"flex", alignItems:"flex-start", gap:12, cursor:"pointer", marginBottom:14, padding:"10px 14px",
                background: checks[i] ? `${stage.color}10` : BRAND.white, borderRadius:8,
                border:`1px solid ${checks[i]?stage.color:BRAND.border}`, transition:"all .2s" }}>
                <input type="checkbox" checked={!!checks[i]} onChange={()=>toggleCheck(i)}
                  style={{ cursor:"pointer", width:18, height:18, marginTop:1, accentColor: stage.color }} />
                <span style={{ fontSize:14, color: checks[i]?stage.color:BRAND.darkGray, textDecoration: checks[i]?"line-through":"none", lineHeight:1.5 }}>{item}</span>
              </label>
            ))}

            {/* Notes */}
            <div style={{ marginTop:20 }}>
              <label style={{ fontSize:12, fontWeight:700, color: BRAND.midGray, display:"block", marginBottom:6 }}>Card Notes</label>
              <textarea value={notes} onChange={e=>updateCardData({notes:e.target.value})} rows={4}
                placeholder="Add notes for this delivery step..."
                style={{ width:"100%", border:`1px solid ${BRAND.border}`, borderRadius:8, padding:10, fontSize:13, boxSizing:"border-box", resize:"vertical" }} />
            </div>
          </div>
        )}

        {tab === "excellence" && (
          <div style={{ maxWidth:700 }}>
            <div style={{ background: `${stage.color}10`, border:`2px solid ${stage.color}40`, borderRadius:10, padding:20, marginBottom:20 }}>
              <div style={{ fontWeight:700, fontSize:14, color: stage.color, marginBottom:4 }}>⭐ What Excellent Service Looks Like</div>
              <div style={{ fontSize:12, color: BRAND.midGray }}>Use this rubric to verify the card is complete and at the highest standard before marking it done.</div>
            </div>
            {card.excellence.map((item, i) => (
              <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:12, marginBottom:12, padding:"12px 16px",
                background: BRAND.white, borderRadius:8, border:`1px solid ${BRAND.border}` }}>
                <div style={{ color: BRAND.green, fontSize:18, marginTop:1 }}>⭐</div>
                <div style={{ fontSize:14, color: BRAND.darkGray, lineHeight:1.5 }}>{item}</div>
              </div>
            ))}
          </div>
        )}

        {tab === "templates" && (
          <div style={{ maxWidth:700 }}>
            <div style={{ marginBottom:16, padding:"12px 16px", background:`${BRAND.amber}15`, border:`1px solid ${BRAND.amber}40`, borderRadius:8, fontSize:13, color: BRAND.amber }}>
              📎 These templates are associated with this delivery step. Upload completed documents in the Documents tab.
            </div>
            <div style={{ display:"grid", gap:10 }}>
              {card.templates.map((t, i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:12, background: BRAND.white, borderRadius:8, padding:"12px 16px", border:`1px solid ${BRAND.border}` }}>
                  <div style={{ fontSize:20 }}>📄</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:13, fontWeight:600, color: BRAND.darkGray }}>{t}</div>
                  </div>
                  <div style={{ display:"flex", gap:8 }}>
                    <button style={{ background: BRAND.lightGray, border:"none", borderRadius:4, padding:"4px 10px", fontSize:11, cursor:"pointer", color: BRAND.midGray }}>Locate</button>
                    <button style={{ background:`${stage.color}20`, border:"none", borderRadius:4, padding:"4px 10px", fontSize:11, cursor:"pointer", color: stage.color, fontWeight:700 }}>Generate Email</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "tasks" && (
          <div style={{ maxWidth:700 }}>
            <div style={{ background: BRAND.white, borderRadius:10, padding:16, marginBottom:16, boxShadow:"0 1px 4px rgba(0,0,0,.07)" }}>
              <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr", gap:10, marginBottom:10 }}>
                <Field label="Action Step" value={newTask} onChange={setNewTask} />
                <Select label="Assign To" value={newAssignee} onChange={setNewAssignee} options={TEAM_MEMBERS} />
              </div>
              <button onClick={addCardTask} style={{ background: stage.color, color: BRAND.white, border:"none", borderRadius:6, padding:"8px 20px", cursor:"pointer", fontWeight:700 }}>
                + Add Action
              </button>
            </div>
            {(clientData.tasks||[]).filter(t=>t.cardId===card.id).map(task => (
              <TaskRow key={task.id} task={task} done={task.done}
                onToggle={() => { const tasks = clientData.tasks.map(t=>t.id===task.id?{...t,done:!t.done}:t); const u = clients.map(c=>c.id===client.id?{...c,tasks}:c); persist(u); }}
                onDelete={() => { const tasks = clientData.tasks.filter(t=>t.id!==task.id); const u = clients.map(c=>c.id===client.id?{...c,tasks}:c); persist(u); }} />
            ))}
            {(clientData.tasks||[]).filter(t=>t.cardId===card.id).length === 0 && (
              <div style={{ color: BRAND.midGray, textAlign:"center", padding:30 }}>No action steps for this card yet.</div>
            )}
          </div>
        )}

        {tab === "documents" && (
          <div style={{ maxWidth:700 }}>
            <div style={{ background: BRAND.white, borderRadius:10, padding:16, marginBottom:16 }}>
              <div style={{ display:"grid", gridTemplateColumns:"2fr 2fr", gap:10, marginBottom:10 }}>
                <Field label="Document Name" value={docName} onChange={setDocName} />
                <Field label="URL or File Path" value={docUrl} onChange={setDocUrl} />
              </div>
              <button onClick={addDocument} style={{ background: stage.color, color: BRAND.white, border:"none", borderRadius:6, padding:"8px 20px", cursor:"pointer", fontWeight:700 }}>
                + Add Document
              </button>
            </div>

            {(cardData.documents||[]).length === 0 && <div style={{ color: BRAND.midGray, textAlign:"center", padding:30 }}>No documents added yet.</div>}
            <div style={{ display:"grid", gap:10 }}>
              {(cardData.documents||[]).map(doc => (
                <div key={doc.id} style={{ display:"flex", alignItems:"center", gap:12, background: BRAND.white, borderRadius:8, padding:"12px 16px", border:`1px solid ${BRAND.border}` }}>
                  <div style={{ fontSize:20 }}>📁</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:13, fontWeight:600, color: BRAND.darkGray }}>{doc.name}</div>
                    {doc.url && <div style={{ fontSize:11, color: BRAND.blue, marginTop:2 }}><a href={doc.url} target="_blank" rel="noreferrer">{doc.url}</a></div>}
                    <div style={{ fontSize:11, color: BRAND.midGray, marginTop:2 }}>Added {doc.addedAt}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// TASKS VIEW (cross-client)
// ══════════════════════════════════════════════════════════════════════════════
function TasksView({ clients, persist, user, onBack }) {
  const [filterPerson, setFilterPerson] = useState("All");
  const allTasks = clients.flatMap(c => (c.tasks||[]).map(t => ({...t, clientName: c.name, clientId: c.id})));
  const filtered = filterPerson==="All" ? allTasks : allTasks.filter(t=>t.assignee===filterPerson);
  const open = filtered.filter(t=>!t.done);

  const grouped = DELIVERY_STAGES.reduce((acc, s) => {
    acc[s.id] = open.filter(t=>t.stage===s.id);
    return acc;
  }, {});

  return (
    <div style={{ height:"100vh", display:"flex", flexDirection:"column", background: BRAND.lightGray, fontFamily:"Georgia, serif" }}>
      <TopNav user={user} setView={()=>{}} currentView="tasks" onBack={onBack} backLabel="Dashboard" />
      <div style={{ flex:1, overflow:"auto", padding:28 }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
          <h2 style={{ margin:0, fontSize:20 }}>All Action Steps</h2>
          <div style={{ display:"flex", gap:8 }}>
            {["All",...TEAM_MEMBERS].map(m => (
              <button key={m} onClick={()=>setFilterPerson(m)}
                style={{ background: filterPerson===m?BRAND.red:BRAND.white, color: filterPerson===m?BRAND.white:BRAND.darkGray,
                  border:`1px solid ${filterPerson===m?BRAND.red:BRAND.border}`, borderRadius:20, padding:"6px 14px", cursor:"pointer", fontSize:12, fontWeight:600 }}>
                {m}
              </button>
            ))}
          </div>
        </div>

        {DELIVERY_STAGES.map(stage => {
          const tasks = grouped[stage.id] || [];
          if (tasks.length === 0) return null;
          return (
            <div key={stage.id} style={{ marginBottom:24 }}>
              <div style={{ fontWeight:700, fontSize:14, color: stage.color, marginBottom:10, display:"flex", alignItems:"center", gap:8 }}>
                <div style={{ width:10, height:10, borderRadius:"50%", background: stage.color }} />
                {stage.label} ({tasks.length})
              </div>
              <div style={{ display:"grid", gap:8 }}>
                {tasks.map(task => (
                  <div key={task.id} style={{ background: BRAND.white, borderRadius:8, padding:"10px 14px", display:"flex", gap:12, alignItems:"center", boxShadow:"0 1px 3px rgba(0,0,0,.06)" }}>
                    <input type="checkbox" checked={task.done} onChange={() => {
                      const updated = clients.map(c => c.id===task.clientId ? {...c, tasks: c.tasks.map(t=>t.id===task.id?{...t,done:!t.done}:t)} : c);
                      persist(updated);
                    }} style={{ cursor:"pointer", width:16, height:16 }} />
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:13, color: BRAND.darkGray }}>{task.text}</div>
                      <div style={{ fontSize:11, color: BRAND.midGray, marginTop:2 }}>
                        <span style={{ fontWeight:700, color: BRAND.red }}>{task.clientName}</span> · {task.assignee} {task.dueDate && `· Due: ${task.dueDate}`}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {open.length === 0 && <div style={{ textAlign:"center", color: BRAND.midGray, padding:60 }}>🎉 No open action steps!</div>}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// ADMIN VIEW
// ══════════════════════════════════════════════════════════════════════════════
function AdminView({ clients, onBack }) {
  const totalClients = clients.length;
  const activeClients = clients.filter(c=>c.status==="active").length;
  const totalJobs = clients.reduce((s,c)=>s+(c.jobs||[]).length,0);
  const totalFilled = clients.reduce((s,c)=>s+(c.jobs||[]).filter(j=>j.filled).length,0);
  const totalFees = clients.reduce((s,c)=>s+(c.jobs||[]).reduce((js,j)=>js+(j.successFee||0),0),0);
  const totalHours = clients.reduce((s,c)=>s+(c.activityLog||[]).reduce((as,a)=>as+(parseFloat(a.hours)||0),0),0);
  const totalCalls = clients.reduce((s,c)=>s+(c.activityLog||[]).filter(a=>a.type==="call").length,0);
  const totalMeetings = clients.reduce((s,c)=>s+(c.activityLog||[]).filter(a=>a.type==="meeting").length,0);

  return (
    <div style={{ height:"100vh", display:"flex", flexDirection:"column", background: BRAND.lightGray, fontFamily:"Georgia, serif" }}>
      <div style={{ background: BRAND.darkGray, padding:"0 24px", display:"flex", alignItems:"center", justifyContent:"space-between", height:56, flexShrink:0 }}>
        <div style={{ display:"flex", alignItems:"center", gap:16 }}>
          <button onClick={onBack} style={{ background:"none", border:"none", color:BRAND.red, cursor:"pointer", fontSize:13 }}>← Back</button>
          <span style={{ color: BRAND.red, fontWeight:900, fontSize:18 }}>FRIDAY</span>
          <span style={{ color: BRAND.white, fontSize:13, opacity:.7 }}>Admin Overview</span>
        </div>
      </div>

      <div style={{ flex:1, overflow:"auto", padding:28 }}>
        <h2 style={{ margin:"0 0 20px", fontSize:20 }}>Admin Dashboard</h2>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:28 }}>
          {[
            {l:"Total Clients",v:totalClients,c:BRAND.darkGray},
            {l:"Active Clients",v:activeClients,c:BRAND.green},
            {l:"Total Jobs",v:totalJobs,c:BRAND.blue},
            {l:"Jobs Filled",v:totalFilled,c:BRAND.green},
            {l:"Success Fees",v:`$${totalFees.toLocaleString()}`,c:BRAND.gold},
            {l:"Hours Logged",v:totalHours.toFixed(1),c:BRAND.amber},
            {l:"Total Calls",v:totalCalls,c:BRAND.blue},
            {l:"Total Meetings",v:totalMeetings,c:BRAND.blue},
          ].map(s => (
            <div key={s.l} style={{ background: BRAND.white, borderRadius:8, padding:"16px 20px", boxShadow:"0 1px 4px rgba(0,0,0,.07)" }}>
              <div style={{ fontSize:24, fontWeight:700, color: s.c }}>{s.v}</div>
              <div style={{ fontSize:12, color: BRAND.midGray, marginTop:4 }}>{s.l}</div>
            </div>
          ))}
        </div>

        <h3 style={{ margin:"0 0 14px", fontSize:17 }}>All Clients</h3>
        <div style={{ background: BRAND.white, borderRadius:10, overflow:"hidden", boxShadow:"0 1px 4px rgba(0,0,0,.07)" }}>
          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
            <thead>
              <tr style={{ background: BRAND.darkGray, color: BRAND.white }}>
                {["Client","Package","Status","Open Jobs","Filled","Fees","Hours","Last Activity"].map(h => (
                  <th key={h} style={{ padding:"10px 16px", textAlign:"left", fontWeight:700, fontSize:12 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {clients.map((c, i) => {
                const openJ = (c.jobs||[]).filter(j=>!j.filled).length;
                const filledJ = (c.jobs||[]).filter(j=>j.filled).length;
                const fees = (c.jobs||[]).reduce((s,j)=>s+(j.successFee||0),0);
                const hrs = (c.activityLog||[]).reduce((s,a)=>s+(parseFloat(a.hours)||0),0);
                const lastAct = (c.activityLog||[]).slice(-1)[0]?.date || "—";
                return (
                  <tr key={c.id} style={{ background: i%2===0?BRAND.white:BRAND.lightGray, borderBottom:`1px solid ${BRAND.border}` }}>
                    <td style={{ padding:"10px 16px", fontWeight:700, color: BRAND.darkGray }}>{c.name}</td>
                    <td style={{ padding:"10px 16px", color: BRAND.midGray, fontSize:12 }}>{c.package}</td>
                    <td style={{ padding:"10px 16px" }}>
                      <span style={{ background: c.status==="active"?`${BRAND.green}20`:BRAND.lightGray, color: c.status==="active"?BRAND.green:BRAND.midGray, borderRadius:10, padding:"2px 10px", fontSize:11, fontWeight:700 }}>
                        {c.status||"pending"}
                      </span>
                    </td>
                    <td style={{ padding:"10px 16px", color: BRAND.blue, fontWeight:700 }}>{openJ}</td>
                    <td style={{ padding:"10px 16px", color: BRAND.green, fontWeight:700 }}>{filledJ}</td>
                    <td style={{ padding:"10px 16px", color: BRAND.gold, fontWeight:700 }}>${fees.toLocaleString()}</td>
                    <td style={{ padding:"10px 16px", color: BRAND.midGray }}>{hrs.toFixed(1)}h</td>
                    <td style={{ padding:"10px 16px", color: BRAND.midGray }}>{lastAct}</td>
                  </tr>
                );
              })}
              {clients.length===0 && (
                <tr><td colSpan={8} style={{ padding:40, textAlign:"center", color: BRAND.midGray }}>No clients yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// SHARED COMPONENTS
// ══════════════════════════════════════════════════════════════════════════════
function Modal({ title, children, onClose, onSave, saveLabel="Save" }) {
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.5)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:999 }}>
      <div style={{ background: BRAND.white, borderRadius:12, padding:28, width:680, maxHeight:"85vh", overflowY:"auto", boxShadow:"0 8px 40px rgba(0,0,0,.25)" }}>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:20 }}>
          <h2 style={{ margin:0, fontSize:18, color: BRAND.darkGray }}>{title}</h2>
          <button onClick={onClose} style={{ background:"none", border:"none", fontSize:22, cursor:"pointer", color: BRAND.midGray }}>×</button>
        </div>
        {children}
        <div style={{ display:"flex", gap:10, marginTop:20, justifyContent:"flex-end" }}>
          <button onClick={onClose} style={{ background: BRAND.border, border:"none", borderRadius:6, padding:"9px 20px", cursor:"pointer", fontSize:13 }}>Cancel</button>
          <button onClick={onSave} style={{ background: BRAND.red, color: BRAND.white, border:"none", borderRadius:6, padding:"9px 24px", cursor:"pointer", fontWeight:700, fontSize:13 }}>{saveLabel}</button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type="text" }) {
  return (
    <div>
      <label style={{ fontSize:12, fontWeight:700, color: BRAND.midGray, display:"block", marginBottom:4 }}>{label}</label>
      <input type={type} value={value} onChange={e=>onChange(e.target.value)}
        style={{ width:"100%", border:`1px solid ${BRAND.border}`, borderRadius:6, padding:"8px 10px", fontSize:13, boxSizing:"border-box" }} />
    </div>
  );
}

function Select({ label, value, onChange, options, labels }) {
  return (
    <div>
      <label style={{ fontSize:12, fontWeight:700, color: BRAND.midGray, display:"block", marginBottom:4 }}>{label}</label>
      <select value={value} onChange={e=>onChange(e.target.value)}
        style={{ width:"100%", border:`1px solid ${BRAND.border}`, borderRadius:6, padding:"8px 10px", fontSize:13, boxSizing:"border-box", background: BRAND.white }}>
        {options.map((o,i) => <option key={o} value={o}>{labels?labels[i]:o}</option>)}
      </select>
    </div>
  );
}

