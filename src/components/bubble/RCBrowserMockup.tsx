import { useState, useEffect, useRef } from "react";
import { Braces } from "lucide-react";

type Severity = "critical" | "high" | "medium";

const TAB_MEMBERS = [
  { initials: "SC", name: "Sarah Chen",  bg: "bg-purple-100", fg: "text-purple-600" },
  { initials: "MD", name: "Marc Dubois", bg: "bg-emerald-100", fg: "text-emerald-600" },
  { initials: "JM", name: "Julie Martin",bg: "bg-orange-100", fg: "text-orange-600" },
  { initials: "AT", name: "Alex Torres", bg: "bg-blue-100",   fg: "text-blue-600" },
  { initials: "NK", name: "Nina Kovač",  bg: "bg-pink-100",   fg: "text-pink-600" },
];

const FAKE_VALUES: Record<string, string> = {
  password_hash:      '"$2b$10$xK9mNp..."',
  bank_iban:          '"DE89370400440532013000"',
  salary:             "87500",
  health_condition:   '"type_2_diabetes"',
  stripe_customer_id: '"cus_Nx4kP9mQ2..."',
  date_of_birth:      '"1988-03-14"',
  admin_token:        '"eyJhbGci.e30..."',
  internal_notes:     '"Performance review pending"',
  salary_gross:       "87500",
  salary_net:         "68420",
  social_security_nr: '"1 88 03 75 108 023 47"',
  tax_rate:           "0.245",
  bonus_amount:       "4200",
  tax_id:             '"FR76401080100001"',
  contract_pdf_url:   '"https://s3.../ctr_2024.pdf"',
  diagnosis_code:     '"E11.9"',
  disability_status:  '"partial_50pct"',
  medication:         '"metformin 500mg"',
  treatment_notes:    '"Follow-up Q3 2026"',
  insurance_id:       '"AXA-2024-00847261"',
};

const TAB_DATA: Record<string, {
  label: string; monitor: string; clientFields: string[];
  columns: string[]; rows: string[][];
  leaked: { field: string; severity: Severity }[];
}> = {
  team: {
    label: "Team", monitor: "User · Get Team Members", clientFields: ["bank_iban"],
    columns: ["Name", "Email", "Department", "Role", "Status"],
    rows: [
      ["Sarah Chen",  "s.chen@co.io",   "Engineering", "Senior Dev",   "Active"],
      ["Marc Dubois", "m.dubois@co.io", "Finance",     "CFO",          "Active"],
      ["Julie Martin","j.martin@co.io", "HR",          "HR Manager",   "On leave"],
      ["Alex Torres", "a.torres@co.io", "Sales",       "Account Exec", "Active"],
      ["Nina Kovač",  "n.kovac@co.io",  "Engineering", "Lead Dev",     "Active"],
    ],
    leaked: [
      { field: "password_hash",      severity: "critical" },
      { field: "bank_iban",          severity: "critical" },
      { field: "salary",             severity: "high" },
      { field: "health_condition",   severity: "high" },
      { field: "stripe_customer_id", severity: "high" },
      { field: "date_of_birth",      severity: "medium" },
      { field: "admin_token",        severity: "critical" },
      { field: "internal_notes",     severity: "medium" },
    ],
  },
  payroll: {
    label: "Payroll", monitor: "PayrollEntry · Get Payroll", clientFields: ["bank_iban", "tax_id"],
    columns: ["Name", "Period", "Contract", "Hours", "Status"],
    rows: [
      ["Sarah Chen",  "Apr 2026", "Full-time",  "160h", "Processed"],
      ["Marc Dubois", "Apr 2026", "Full-time",  "160h", "Processed"],
      ["Julie Martin","Apr 2026", "Full-time",  "80h",  "Pending"],
      ["Alex Torres", "Apr 2026", "Commission", "—",    "Processed"],
      ["Nina Kovač",  "Apr 2026", "Full-time",  "160h", "Processed"],
    ],
    leaked: [
      { field: "salary_gross",       severity: "critical" },
      { field: "salary_net",         severity: "critical" },
      { field: "bank_iban",          severity: "critical" },
      { field: "social_security_nr", severity: "critical" },
      { field: "tax_rate",           severity: "high" },
      { field: "bonus_amount",       severity: "high" },
      { field: "tax_id",             severity: "high" },
      { field: "contract_pdf_url",   severity: "medium" },
    ],
  },
  medical: {
    label: "Medical", monitor: "User · Get Medical Records", clientFields: [],
    columns: ["Name", "Coverage", "Provider", "Renewal", "Status"],
    rows: [
      ["Sarah Chen",  "Full",  "AXA Health", "Jan 2027", "Active"],
      ["Marc Dubois", "Full",  "AXA Health", "Mar 2027", "Active"],
      ["Julie Martin","Basic", "Allianz",    "Jun 2026", "Active"],
      ["Alex Torres", "Full",  "AXA Health", "Sep 2026", "Active"],
      ["Nina Kovač",  "Basic", "Allianz",    "Feb 2027", "Active"],
    ],
    leaked: [
      { field: "health_condition", severity: "critical" },
      { field: "diagnosis_code",   severity: "critical" },
      { field: "disability_status",severity: "critical" },
      { field: "medication",       severity: "critical" },
      { field: "treatment_notes",  severity: "high" },
      { field: "insurance_id",     severity: "high" },
      { field: "date_of_birth",    severity: "medium" },
    ],
  },
};

const drw = {
  meta:   "text-[8.5px] font-mono text-white/45",
  header: "text-[8.5px] font-mono text-white/45 uppercase tracking-wider",
  field:  "font-mono text-[10px] text-white/85",
  bright: "font-mono text-[10px] text-white",
  label:  "text-[8px] font-mono text-white/60 uppercase tracking-wider",
} as const;

const RCBrowserMockup = () => {
  const [highlight,        setHighlight]        = useState(false);
  const [activeTab,        setActiveTab]        = useState<keyof typeof TAB_DATA>("team");
  const [tabInteracted,    setTabInteracted]    = useState(false);
  const [selectedDatatype, setSelectedDatatype] = useState<"user" | "client">("user");
  const [gotoArrow,        setGotoArrow]        = useState(false);
  const [gotoY,            setGotoY]            = useState(0);
  const browserContentRef = useRef<HTMLDivElement>(null);

  const handleGoto = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = browserContentRef.current;
    if (container) {
      const rowRect = e.currentTarget.getBoundingClientRect();
      const cRect   = container.getBoundingClientRect();
      setGotoY(rowRect.top - cRect.top + rowRect.height / 2);
    }
    setSelectedDatatype("client");
    setGotoArrow(true);
    setTimeout(() => setGotoArrow(false), 1400);
  };

  const handleTabChange = (key: keyof typeof TAB_DATA) => {
    setActiveTab(key);
    setTabInteracted(true);
  };

  useEffect(() => { setSelectedDatatype("user"); }, [activeTab]);
  useEffect(() => {
    const t = setTimeout(() => setHighlight(true), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="rounded-xl overflow-hidden border border-white/10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)]">
      <style>{`
        @keyframes rtl-travel {
          0%   { transform: translateY(-50%) translateX(0);      opacity: 0; }
          10%  { opacity: 1; }
          68%  { opacity: 1; }
          88%  { opacity: 0.5; }
          100% { transform: translateY(-50%) translateX(-560px); opacity: 0; }
        }
        @keyframes rtl-chevron { 0%,100% { opacity: 0.3; } 50% { opacity: 1; } }
        .drw-scroll::-webkit-scrollbar       { width: 4px; }
        .drw-scroll::-webkit-scrollbar-track { background: #000; border-radius: 2px; }
        .drw-scroll::-webkit-scrollbar-thumb { background: #4ade80; border-radius: 2px; }
        @keyframes red-warning-glow {
          0%,100% { box-shadow: 0 0 18px -4px rgba(239,68,68,.2),  0 0 0 1px rgba(239,68,68,.12); }
          50%     { box-shadow: 0 0 40px -2px rgba(239,68,68,.55), 0 0 0 1px rgba(239,68,68,.4);  }
        }
        @keyframes dash-march { to { stroke-dashoffset: -22; } }
        .ldr-path { animation: dash-march 1.8s linear infinite; }
      `}</style>

      {/* Chrome toolbar */}
      <div className="bg-[#dee1e6] px-3 py-1.5 flex items-center gap-2 border-b border-black/10 shrink-0">
        <div className="flex gap-1.5 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex items-end ml-1 gap-0.5 text-[9px]">
          <div className="px-3 py-1 bg-white/40 text-black/30 rounded-t-md border-t border-x border-black/5">My App — Home</div>
          <div className="px-3 py-1 bg-white/50 text-black/40 rounded-t-md border-t border-x border-black/5">Dashboard — Editor</div>
          <div className="px-3 py-1 bg-white text-black/60 rounded-t-md border-t border-x border-black/5 font-medium shadow-sm">Dashboard — version-test</div>
        </div>
        <div className="flex-1 bg-white/60 rounded-full px-3 py-0.5 text-[9px] text-black/25 font-mono truncate border border-black/5 ml-1">
          my-saas-app.bubbleapps.io/version-test/dashboard
        </div>
      </div>

      {/* Browser content */}
      <div ref={browserContentRef} className="bg-[#e8e8ea] p-3 flex gap-0 h-[520px] relative">
        {gotoArrow && (
          <div
            className="absolute pointer-events-none z-30 flex items-center gap-1"
            style={{ top: gotoY, right: 296, animation: "rtl-travel 1.8s cubic-bezier(0.4,0,0.2,1) forwards" }}
          >
            {[0, 1, 2].map((i) => (
              <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="none"
                style={{ animation: `rtl-chevron 0.6s ease-in-out ${i * 100}ms infinite` }}>
                <path d="M9 2L4 7L9 12" stroke="rgba(139,92,246,0.95)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ))}
          </div>
        )}

        {/* LEFT — Bubble Privacy Rules */}
        <div className="flex-[2] rounded-l-lg border border-black/10 overflow-hidden flex flex-col min-w-0 bg-white shadow-sm">
          <div className="bg-white border-b border-gray-200 px-2 py-1 flex items-center gap-2 shrink-0">
            <div className="w-5 h-5 rounded-full bg-white border border-gray-300 flex items-center justify-center shrink-0">
              <span className="text-[9px] font-bold text-gray-600">b</span>
            </div>
            <span className="text-[8px] text-gray-400 border border-gray-200 rounded px-1.5 py-0.5">Web ∨</span>
            <span className="text-[8px] text-gray-400 border border-gray-200 rounded px-1.5 py-0.5">index ∨</span>
            <div className="flex-1" />
            <span className="text-[7px] text-orange-500 border border-orange-200 bg-orange-50 rounded px-1.5 py-0.5">⚠ 72 issues</span>
            <div className="px-2 py-0.5 bg-[#1994ec] text-white text-[8px] font-medium rounded flex items-center gap-1">▶ Deploy</div>
          </div>
          <div className="flex flex-1 overflow-hidden">
            <div className="w-7 bg-white border-r border-gray-100 flex flex-col items-center pt-2 gap-2 shrink-0">
              {["✏️","🔗","⊞","◉","{}","☆","⚙","📊","▦"].map((ic, i) => (
                <div key={i} className={`w-5 h-5 flex items-center justify-center text-[9px] rounded ${i === 3 ? "bg-blue-50 text-blue-500" : "text-gray-300"}`}>{ic}</div>
              ))}
            </div>
            <div className="flex flex-col flex-1 overflow-hidden">
              <div className="flex border-b border-gray-200 text-[8px] shrink-0 bg-white">
                {["Data types","Privacy","App data","Option sets","File manager"].map((tab) => (
                  <div key={tab} className={`px-2.5 py-1.5 cursor-pointer whitespace-nowrap ${tab === "Privacy" ? "text-[#1994ec] border-b-2 border-[#1994ec] font-medium" : "text-gray-400"}`}>{tab}</div>
                ))}
              </div>
              <div className="flex flex-1 overflow-hidden">
                <div className="w-36 border-r border-gray-200 flex flex-col overflow-hidden shrink-0">
                  <div className="px-2 py-1.5 border-b border-gray-100 text-[8.5px] font-medium text-gray-600">Privacy</div>
                  <div className="px-2 py-1 border-b border-gray-100 shrink-0">
                    <div className="border border-gray-200 rounded px-1.5 py-0.5 text-[7.5px] text-gray-300">Data types</div>
                  </div>
                  <div className="flex-1 overflow-hidden text-[9px]">
                    {[
                      { name: "Client",   label: "Publicly visible" },
                      { name: "Contract", label: "Privacy rules applied" },
                      { name: "Invoice",  label: "Privacy rules applied" },
                      { name: "Project",  label: "Privacy rules applied" },
                      { name: "User",     label: "Privacy rules applied" },
                    ].map(({ name, label }) => {
                      const isClient = name === "Client" && selectedDatatype === "client";
                      const isUser   = name === "User"   && selectedDatatype === "user";
                      return (
                        <div key={name} className={`relative flex items-center gap-1 px-2 py-1 border-b border-gray-50 transition-colors duration-300 ${isClient ? "bg-orange-50" : isUser ? "bg-blue-50" : ""}`}>
                          {isClient && <span className="absolute left-0.5 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-orange-400 animate-ping" />}
                          <span className={`pl-1 shrink-0 ${isClient ? "text-orange-600 font-medium" : isUser ? "text-[#1994ec] font-medium" : "text-gray-600"}`}>{name}</span>
                          <span className={`text-[7.5px] truncate min-w-0 ${isClient ? "text-orange-400" : isUser ? "text-[#1994ec]" : name === "Client" ? "text-orange-400" : "text-gray-300"}`}>{label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="flex-1 overflow-hidden flex flex-col bg-[#fafafa] transition-all duration-300">
                  {selectedDatatype === "user" ? (
                    <>
                      <div className="px-3 py-1.5 border-b border-gray-100 text-[11px] text-gray-500 shrink-0">Privacy rules for type <strong>User</strong></div>
                      <div className="flex-1 overflow-hidden p-2 space-y-2">
                        <div className="bg-white border border-gray-200 rounded">
                          <div className="flex items-center justify-between px-2 py-1 border-b border-gray-100">
                            <span className="text-[11px] font-medium text-gray-500">Name</span>
                            <span className="text-[11px] text-gray-600">User's own data</span>
                          </div>
                          <div className="flex items-center gap-1 px-2 py-1 border-b border-gray-100">
                            <span className="text-[11px] text-gray-500">When</span>
                            <span className="text-[11px] text-[#1994ec] font-medium">This User is Current User</span>
                          </div>
                          <div className="px-2 py-1">
                            <div className="grid grid-cols-3 text-[10px] text-gray-400 mb-1 border-b border-gray-100 pb-0.5">
                              <div>Field</div><div className="text-center">View ✓</div><div className="text-center">Auto-bind</div>
                            </div>
                            {["email","salary","bank_iban","phone","last name"].map((f) => (
                              <div key={f} className="grid grid-cols-3 text-[10px] py-0.5">
                                <div className="text-gray-600">{f}</div>
                                <div className="flex justify-center"><div className="w-3 h-3 border border-[#1994ec] rounded-sm bg-[#1994ec]/10 flex items-center justify-center"><span className="text-[7px] text-[#1994ec]">✓</span></div></div>
                                <div className="flex justify-center"><div className="w-3 h-3 border border-gray-200 rounded-sm" /></div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="bg-white border border-gray-200 rounded">
                          <div className="px-2 py-1 border-b border-gray-100">
                            <span className="text-[11px] text-gray-500">Everyone else <span className="text-gray-400">(default)</span></span>
                          </div>
                          <div className="px-2 py-1">
                            <div className="grid grid-cols-3 text-[10px] text-gray-400 mb-1 border-b border-gray-100 pb-0.5">
                              <div>Field</div><div className="text-center">View 0</div><div className="text-center">Auto-bind</div>
                            </div>
                            {["email","salary","bank_iban","phone","last name"].map((f) => (
                              <div key={f} className="grid grid-cols-3 text-[10px] py-0.5">
                                <div className="text-gray-600">{f}</div>
                                <div className="flex justify-center"><div className="w-3 h-3 border border-gray-200 rounded-sm" /></div>
                                <div className="flex justify-center"><div className="w-3 h-3 border border-gray-200 rounded-sm" /></div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="px-3 py-1.5 border-b border-orange-100 bg-orange-50/60 text-[11px] text-orange-700 shrink-0 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
                        Privacy rules for type <strong>Client</strong>
                      </div>
                      <div className="flex-1 overflow-hidden p-2 space-y-2">
                        <div className="bg-orange-50 border border-orange-200 rounded px-2 py-1.5">
                          <p className="text-[11px] text-orange-700 font-medium">No rules configured</p>
                          <p className="text-[9.5px] text-orange-500 mt-0.5">This type is publicly visible. All fields are accessible by default.</p>
                        </div>
                        <div className="bg-white border border-gray-200 rounded">
                          <div className="px-2 py-1 border-b border-gray-100">
                            <span className="text-[11px] text-gray-500">Everyone else <span className="text-orange-400 font-medium">(all fields open)</span></span>
                          </div>
                          <div className="px-2 py-1">
                            <div className="grid grid-cols-3 text-[10px] text-gray-400 mb-1 border-b border-gray-100 pb-0.5">
                              <div>Field</div><div className="text-center">View ✓</div><div className="text-center">Auto-bind</div>
                            </div>
                            {["name","bank_iban","tax_id","contract_pdf","address"].map((f) => {
                              const sensitive = ["bank_iban","tax_id","contract_pdf"].includes(f);
                              return (
                                <div key={f} className="grid grid-cols-3 text-[10px] py-0.5">
                                  <div className={sensitive ? "text-orange-600 font-medium" : "text-gray-600"}>{f}</div>
                                  <div className="flex justify-center">
                                    <div className={`w-3 h-3 border rounded-sm flex items-center justify-center ${sensitive ? "border-orange-400 bg-orange-50" : "border-[#1994ec] bg-[#1994ec]/10"}`}>
                                      <span className={`text-[7px] ${sensitive ? "text-orange-500" : "text-[#1994ec]"}`}>✓</span>
                                    </div>
                                  </div>
                                  <div className="flex justify-center"><div className="w-3 h-3 border border-gray-200 rounded-sm" /></div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="w-4 flex flex-col items-center justify-center shrink-0 relative cursor-col-resize">
          <div className="absolute inset-y-0 left-1/2 w-px bg-black/10" />
          <div className="relative z-10 w-4 h-10 bg-white border border-black/10 rounded-full flex flex-col items-center justify-center gap-0.5 shadow-sm">
            <div className="w-px h-3 bg-black/20 rounded-full" />
            <div className="w-px h-3 bg-black/20 rounded-full" />
          </div>
        </div>

        {/* RIGHT — Live app + RC drawer */}
        <div className="flex-[3] rounded-r-lg border border-white/10 overflow-hidden relative min-w-0 bg-[#f8f9fa]">
          <div className="absolute inset-0 overflow-hidden flex flex-col">
            <div className="bg-white border-b border-gray-200 px-3 py-1.5 flex items-center gap-2 shrink-0">
              <div className="w-5 h-5 rounded bg-indigo-600 flex items-center justify-center shrink-0">
                <span className="text-[7px] font-bold text-white">H</span>
              </div>
              <span className="text-[8px] font-semibold text-gray-700">HireDesk</span>
              <div className="ml-auto w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                <span className="text-[7px] font-semibold text-indigo-600">A</span>
              </div>
            </div>
            <div className="flex border-b border-gray-200 bg-white shrink-0 px-2 pt-5 gap-1">
              {(Object.keys(TAB_DATA) as (keyof typeof TAB_DATA)[]).map((key) => {
                const isActive  = activeTab === key;
                const showHint  = !tabInteracted && !isActive;
                return (
                  <button key={key} onClick={() => handleTabChange(key)}
                    className={`relative cursor-pointer px-3 py-1 text-[9px] font-medium rounded-t transition-all border-b-2 ${isActive ? "text-indigo-600 border-indigo-600 bg-white" : "text-gray-500 border-transparent hover:text-gray-700"}`}>
                    {showHint && (
                      <span className="absolute -top-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5 animate-bounce">
                        <svg width="13" height="9" viewBox="0 0 13 9" fill="none"><path d="M1.5 1.5L6.5 7L11.5 1.5" stroke="rgba(99,102,246,0.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        <svg width="13" height="9" viewBox="0 0 13 9" fill="none"><path d="M1.5 1.5L6.5 7L11.5 1.5" stroke="rgba(99,102,246,0.45)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </span>
                    )}
                    {TAB_DATA[key].label}
                  </button>
                );
              })}
            </div>
            <div className="flex-1 overflow-hidden pr-[292px]">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    {TAB_DATA[activeTab].columns.map((col) => (
                      <th key={col} className="px-2 py-1.5 text-left text-[9px] font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap">{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TAB_DATA[activeTab].rows.map((cells, ri) => {
                    const m = TAB_MEMBERS[ri];
                    return (
                      <tr key={ri} className="border-b border-gray-100 hover:bg-white/70 transition-colors">
                        <td className="px-2 py-2">
                          <div className="flex items-center gap-1.5">
                            <div className={`w-6 h-6 rounded-full ${m.bg} flex items-center justify-center shrink-0`}>
                              <span className={`text-[8px] font-semibold ${m.fg}`}>{m.initials}</span>
                            </div>
                            <span className="text-[11px] text-gray-700 font-medium whitespace-nowrap">{cells[0]}</span>
                          </div>
                        </td>
                        {cells.slice(1).map((cell, ci) => (
                          <td key={ci} className="px-2 py-2 text-[10px] text-gray-500 whitespace-nowrap">{cell}</td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* RC Drawer */}
          <div className="absolute top-5 right-0 bottom-3 w-72 bg-[#0c0c18] rounded-tl-xl border-l border-t border-b border-violet-500/40 shadow-[0_8px_40px_rgba(0,0,0,0.6)] flex flex-col overflow-visible">
            <div style={{ position:"absolute", top:-12, left:"50%", transform:"translateX(-50%)", display:"flex", alignItems:"center", justifyContent:"center", background:"white", border:"1px solid rgba(99,102,241,0.28)", borderRadius:4, padding:"3px 8px", boxShadow:"0 1px 4px rgba(0,0,0,0.10)", zIndex:10, whiteSpace:"nowrap" }}>
              <img src="/nocodext-logo-small.png" alt="nocodext" style={{ height:10, width:"auto", display:"block" }} />
            </div>
            <div className="px-3 pt-4 pb-2 border-b border-white/5 shrink-0 overflow-hidden rounded-tl-xl">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-white/80 font-mono">Reality Checker</span>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[9px] text-green-400 font-mono">Live</span>
                </div>
              </div>
              <div className={`${drw.meta} mt-0.5 truncate`}>Monitoring · {TAB_DATA[activeTab].monitor}</div>
            </div>
            <div className={`grid grid-cols-2 px-3 py-1.5 border-b border-white/5 ${drw.header} shrink-0`}>
              <div>Field</div><div>Status</div>
            </div>
            <div className="flex-1 overflow-hidden">
              {TAB_DATA[activeTab].leaked.map((row, i) => {
                const isClientField = TAB_DATA[activeTab].clientFields.includes(row.field);
                const severityColor = row.severity === "critical" ? "text-red-300 bg-red-500/10 border-red-500/20" : row.severity === "high" ? "text-orange-300 bg-orange-500/10 border-orange-500/20" : "text-yellow-300 bg-yellow-500/10 border-yellow-500/20";
                const dotColor      = row.severity === "critical" ? "bg-red-400" : row.severity === "high" ? "bg-orange-400" : "bg-yellow-400";
                return (
                  <div key={`${activeTab}-${row.field}`}
                    onClick={isClientField ? handleGoto : undefined}
                    className={`flex items-center px-3 py-1.5 border-b border-white/[0.04] transition-all duration-500 ${isClientField ? "cursor-pointer hover:bg-violet-500/10 bg-violet-500/5" : ""} ${highlight ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
                    style={{ transitionDelay: `${i * 120 + 300}ms` }}>
                    <div className={`${isClientField ? drw.bright : drw.field} truncate flex-1 pr-1`}>{row.field}</div>
                    <div className={`shrink-0 transition-all duration-300 ${highlight ? "opacity-100" : "opacity-0"}`} style={{ transitionDelay: `${i * 120 + 420}ms` }}>
                      {isClientField ? (
                        <span className="inline-flex items-center gap-0.5 text-[9px] text-violet-400 font-mono whitespace-nowrap">goto Privacy rule</span>
                      ) : (
                        <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[8.5px] border whitespace-nowrap ${severityColor}`}>
                          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColor}`} />Exposed
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mx-2 mb-1.5 rounded-lg bg-black/50 border border-white/[0.07] overflow-hidden shrink-0">
              <div className="px-2 py-1 border-b border-white/[0.06] flex items-center gap-1.5">
                <Braces className="w-3 h-3 text-violet-400 shrink-0" strokeWidth={2} />
                <span className={drw.label}>Payload excerpt</span>
              </div>
              <div className="drw-scroll px-2 py-1.5 font-mono text-[8.5px] leading-relaxed max-h-24 overflow-y-auto overflow-x-hidden">
                <div className="text-white/50 whitespace-nowrap">{"{"}</div>
                {TAB_DATA[activeTab].leaked.map(({ field }, i, arr) => (
                  <div key={field} className="pl-2 whitespace-nowrap">
                    <span className="text-red-300">"{field}"</span>
                    <span className="text-white/50">: </span>
                    <span className="text-yellow-200">{FAKE_VALUES[field] ?? '"..."'}{i < arr.length - 1 ? "," : ""}</span>
                  </div>
                ))}
                <div className="text-white/50 whitespace-nowrap">{"}"}</div>
              </div>
            </div>
            <div className="px-3 py-2 border-t border-white/5 flex items-center justify-between shrink-0">
              <span className={drw.meta}>{TAB_DATA[activeTab].leaked.length} fields flagged</span>
              <span className="text-[9px] text-red-400 font-mono font-medium">⚠ Review</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RCBrowserMockup;
