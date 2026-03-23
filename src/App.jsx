import { useState, useEffect, useRef } from "react";

const TABS = ["Home", "Knowledge Base", "Request Support", "System Status"];

const METRICS = [
  { label: "Pipeline Generated", value: "$2.4M", change: "+18%", up: true },
  { label: "SQL Conversion", value: "34%", change: "+5.2%", up: true },
  { label: "Avg Deal Cycle", value: "28d", change: "-3d", up: true },
  { label: "BDR Efficiency", value: "87%", change: "+12%", up: true },
];

const AGENTS = [
  { name: "Account Transfer Bot", status: "active", desc: "Slack â n8n â Bitscale â Salesforce pipeline for BDR account transfers", icon: "ð" },
  { name: "TAM Enrichment Engine", status: "active", desc: "7-layer enrichment: ICP scoring, title normalization, intent signals", icon: "ð¯" },
  { name: "Lead Router", status: "active", desc: "Apollo â Salesforce routing with territory & tier assignment", icon: "ð¤ï¸" },
  { name: "Hashtag Cleanup Agent", status: "building", desc: "Automated #churn tag removal & hashtag normalization in Salesforce", icon: "ð·ï¸" },
  { name: "Sequence Enrollment Bot", status: "active", desc: "ICP-validated contacts auto-enrolled into Apollo sequences", icon: "ð§" },
  { name: "BDR Assignment Engine", status: "active", desc: "Round-robin + tier-weighted allocation across 70 BDRs", icon: "ð¥" },
];

const TOOLS = [
  { name: "Salesforce", icon: "âï¸", color: "#00A1E0" },
  { name: "Apollo", icon: "ð", color: "#6C5CE7" },
  { name: "Bitscale", icon: "â¡", color: "#00B894" },
  { name: "n8n", icon: "ð", color: "#EA4B71" },
  { name: "Slack", icon: "ð¬", color: "#E01E5A" },
];

const GUIDES = [
  { title: "BDR Account Transfer Process", tag: "Workflow", time: "5 min" },
  { title: "Salesforce Field Reference Guide", tag: "CRM", time: "8 min" },
  { title: "Apollo Sequence Setup", tag: "Outbound", time: "6 min" },
  { title: "TAM Enrichment Layer Walkthrough", tag: "Data Ops", time: "12 min" },
  { title: "ICP Persona Bucket Definitions", tag: "Strategy", time: "4 min" },
];

const ROADMAP = [
  { item: "CPQ Tool Implementation", status: "In Progress", pct: 40, quarter: "Q3" },
  { item: "Layer 2 â ICP Title Normalization", status: "In Progress", pct: 75, quarter: "Q2" },
  { item: "Intent Scoring (Layer 3)", status: "Planned", pct: 10, quarter: "Q3" },
  { item: "Hashtag Cleanup Fix", status: "In Progress", pct: 55, quarter: "Q2" },
];

const ANNOUNCEMENTS = [
  { text: "Account Transfer pipeline end-to-end testing underway", date: "Mar 21", hot: true },
  { text: "New AE Onboarding program launched", date: "Mar 18", hot: false },
  { text: "BDR mapping file updated â 70 reps confirmed", date: "Mar 15", hot: false },
  { text: "ICP Persona Buckets finalized (4 tiers)", date: "Mar 10", hot: false },
];

function AnimatedCounter({ target, suffix = "" }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const num = parseFloat(target.replace(/[^0-9.]/g, ""));
    let start = 0;
    const dur = 1200;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(ease * num);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target]);
  const prefix = target.startsWith("$") ? "$" : "";
  const isDecimal = target.includes(".");
  return <span>{prefix}{isDecimal ? val.toFixed(1) : Math.round(val)}{suffix}</span>;
}

function StatusDot({ status }) {
  const colors = { active: "#00B894", building: "#FDCB6E", offline: "#E17055" };
  return (
    <span style={{
      display: "inline-block", width: 8, height: 8, borderRadius: "50%",
      background: colors[status] || "#B2BEC3",
      boxShadow: `0 0 6px ${colors[status] || "#B2BEC3"}`,
      marginRight: 6,
    }} />
  );
}

function ProgressBar({ pct, color = "#00B894" }) {
  const [width, setWidth] = useState(0);
  useEffect(() => { setTimeout(() => setWidth(pct), 100); }, [pct]);
  return (
    <div style={{ background: "#1a2a3a", borderRadius: 6, height: 8, flex: 1, overflow: "hidden" }}>
      <div style={{
        width: `${width}%`, height: "100%", borderRadius: 6,
        background: `linear-gradient(90deg, ${color}, ${color}aa)`,
        transition: "width 1s cubic-bezier(0.22,1,0.36,1)",
      }} />
    </div>
  );
}

export default function RevOpsCentral() {
  const [activeTab, setActiveTab] = useState("Home");
  const [supportCat, setSupportCat] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAgentModal, setShowAgentModal] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const categories = ["CRM & Access Help", "Data & Reporting", "Process Improvement"];

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a1628",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      color: "#e0e8f0",
      overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,500;0,9..40,700&family=Space+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #1e3a5f; border-radius: 3px; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideIn { from { opacity: 0; transform: translateX(-12px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }
        @keyframes gridMove { 0% { background-position: 0 0; } 100% { background-position: 40px 40px; } }
        .card {
          background: linear-gradient(135deg, #0f1f35 0%, #132744 100%);
          border: 1px solid #1a3050;
          border-radius: 14px;
          padding: 24px;
          transition: all 0.3s cubic-bezier(0.22,1,0.36,1);
          position: relative;
          overflow: hidden;
        }
        .card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #00b89450, transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .card:hover { border-color: #1e4a6e; transform: translateY(-2px); box-shadow: 0 8px 32px #00000040; }
        .card:hover::before { opacity: 1; }
        .btn-primary {
          background: linear-gradient(135deg, #00B894 0%, #00a884 100%);
          color: #fff;
          border: none;
          padding: 10px 22px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 13px;
          cursor: pointer;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          transition: all 0.2s;
          font-family: 'Space Mono', monospace;
        }
        .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 4px 16px #00B89440; }
        .btn-outline {
          background: transparent;
          color: #00B894;
          border: 1.5px solid #00B89450;
          padding: 8px 18px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
        }
        .btn-outline:hover { background: #00B89415; border-color: #00B894; }
        .tag {
          display: inline-block;
          padding: 3px 10px;
          border-radius: 4px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          font-family: 'Space Mono', monospace;
        }
        .nav-item {
          padding: 8px 18px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          border: none;
          background: transparent;
          color: #8899aa;
          font-family: 'DM Sans', sans-serif;
        }
        .nav-item:hover { color: #e0e8f0; background: #ffffff08; }
        .nav-item.active { color: #00B894; background: #00B89412; }
        .cat-btn {
          padding: 10px 18px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          border: 1.5px solid #1a3050;
          background: #0a1628;
          color: #8899aa;
          font-family: 'DM Sans', sans-serif;
        }
        .cat-btn:hover { border-color: #00B894; color: #00B894; }
        .cat-btn.active { border-color: #00B894; color: #fff; background: #00B89420; }
        .modal-overlay {
          position: fixed; inset: 0; background: #00000080; backdrop-filter: blur(4px);
          display: flex; align-items: center; justify-content: center; z-index: 100;
        }
        .modal-content {
          background: #0f1f35; border: 1px solid #1a3050; border-radius: 16px;
          padding: 32px; max-width: 500px; width: 90%; position: relative;
        }
      `}</style>

      {/* Background grid */}
      <div style={{
        position: "fixed", inset: 0, opacity: 0.03,
        backgroundImage: "linear-gradient(#00B894 1px, transparent 1px), linear-gradient(90deg, #00B894 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        animation: "gridMove 8s linear infinite",
        pointerEvents: "none",
      }} />

      {/* Header */}
      <header style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "linear-gradient(180deg, #0a1628 60%, #0a162800)",
        padding: "0 32px",
      }}>
        <div style={{
          maxWidth: 1280, margin: "0 auto",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "16px 0", borderBottom: "1px solid #1a305040",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10,
              background: "linear-gradient(135deg, #00B894, #00a884)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18, fontWeight: 900, color: "#fff",
              fontFamily: "'Space Mono', monospace",
              boxShadow: "0 2px 12px #00B89440",
            }}>RO</div>
            <div>
              <div style={{
                fontFamily: "'Space Mono', monospace", fontWeight: 700,
                fontSize: 18, color: "#fff", letterSpacing: "-0.5px",
              }}>REVOPS CENTRAL</div>
              <div style={{ fontSize: 10, color: "#5a7a9a", letterSpacing: 2, textTransform: "uppercase", fontFamily: "'Space Mono', monospace" }}>Testsigma Revenue Operations</div>
            </div>
          </div>

          <nav style={{ display: "flex", gap: 4 }}>
            {TABS.map(t => (
              <button key={t} className={`nav-item ${activeTab === t ? "active" : ""}`}
                onClick={() => setActiveTab(t)}>{t}</button>
            ))}
          </nav>

          <button className="btn-primary" style={{ fontSize: 12, padding: "8px 16px" }}>
            ð Get Help
          </button>
        </div>
      </header>

      {/* Main */}
      <main style={{ maxWidth: 1280, margin: "0 auto", padding: "24px 32px 60px" }}>

        {/* Top metrics ticker */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16,
          marginBottom: 28,
          animation: mounted ? "fadeUp 0.6s ease" : "none",
        }}>
          {METRICS.map((m, i) => (
            <div key={i} className="card" style={{
              padding: 20, animationDelay: `${i * 0.1}s`,
              animation: mounted ? `fadeUp 0.5s ease ${i * 0.08}s both` : "none",
            }}>
              <div style={{ fontSize: 11, color: "#5a7a9a", textTransform: "uppercase", letterSpacing: 1.2, fontFamily: "'Space Mono', monospace", marginBottom: 8 }}>
                {m.label}
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                <span style={{ fontSize: 28, fontWeight: 700, color: "#fff", fontFamily: "'Space Mono', monospace" }}>
                  <AnimatedCounter target={m.value} suffix={m.value.includes("%") ? "%" : m.value.includes("d") ? "d" : m.value.includes("M") ? "M" : ""} />
                </span>
                <span style={{
                  fontSize: 12, fontWeight: 700,
                  color: m.up ? "#00B894" : "#E17055",
                  fontFamily: "'Space Mono', monospace",
                }}>{m.change}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Main grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20, marginBottom: 20 }}>

          {/* Metrics Explorer */}
          <div className="card" style={{ animation: mounted ? "fadeUp 0.5s ease 0.3s both" : "none" }}>
            <div style={{ marginBottom: 18 }}>
              <h3 style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: 16, color: "#fff", letterSpacing: "-0.3px" }}>
                ð Metrics Explorer
              </h3>
              <p style={{ fontSize: 13, color: "#5a7a9a", marginTop: 6 }}>Interactive KPI Dashboards & Definitions</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 18 }}>
              {["Pipeline Velocity", "Conversion Funnel", "BDR Scorecards", "Revenue Attribution"].map((d, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "10px 14px", borderRadius: 8,
                  background: "#0a162880", border: "1px solid #1a305040",
                  animation: mounted ? `slideIn 0.4s ease ${0.4 + i * 0.06}s both` : "none",
                }}>
                  <span style={{ fontSize: 13 }}>{d}</span>
                  <span style={{ fontSize: 16, opacity: 0.4 }}>â</span>
                </div>
              ))}
            </div>
            <button className="btn-primary" style={{ width: "100%" }}>Explore Now</button>
          </div>

          {/* Agent Directory */}
          <div className="card" style={{ animation: mounted ? "fadeUp 0.5s ease 0.35s both" : "none" }}>
            <div style={{ marginBottom: 18 }}>
              <h3 style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: 16, color: "#fff", letterSpacing: "-0.3px" }}>
                ð¤ Agent Directory
              </h3>
              <p style={{ fontSize: 13, color: "#5a7a9a", marginTop: 6 }}>Deployed Automations & User Guides</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 18 }}>
              {AGENTS.slice(0, 4).map((a, i) => (
                <div key={i} onClick={() => setShowAgentModal(a)} style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "10px 12px", borderRadius: 8,
                  background: "#0a162880", border: "1px solid #1a305040",
                  cursor: "pointer", transition: "all 0.2s",
                  animation: mounted ? `slideIn 0.4s ease ${0.45 + i * 0.06}s both` : "none",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#1e4a6e"; e.currentTarget.style.background = "#0f1f35"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#1a305040"; e.currentTarget.style.background = "#0a162880"; }}
                >
                  <span style={{ fontSize: 18 }}>{a.icon}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#e0e8f0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.name}</div>
                  </div>
                  <StatusDot status={a.status} />
                </div>
              ))}
            </div>
            <button className="btn-primary" style={{ width: "100%" }}>View All Agents</button>
          </div>

          {/* Request Support */}
          <div className="card" style={{
            background: "linear-gradient(135deg, #0c2440 0%, #0f2d52 100%)",
            border: "1px solid #1a4060",
            animation: mounted ? "fadeUp 0.5s ease 0.4s both" : "none",
          }}>
            <h3 style={{
              fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: 16,
              color: "#fff", textAlign: "center", marginBottom: 16, letterSpacing: "-0.3px",
            }}>ð« Request Support</h3>

            <div style={{ display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap" }}>
              {categories.map(c => (
                <button key={c} className={`cat-btn ${supportCat === c ? "active" : ""}`}
                  onClick={() => setSupportCat(supportCat === c ? null : c)}
                  style={{ flex: 1, minWidth: "30%", fontSize: 11, padding: "8px 10px", textAlign: "center" }}>
                  {c}
                </button>
              ))}
            </div>

            <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 12 }}>Start Your Request:</div>

            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 11, color: "#5a7a9a", textTransform: "uppercase", letterSpacing: 0.8, display: "block", marginBottom: 4, fontFamily: "'Space Mono', monospace" }}>Subject</label>
              <input type="text" placeholder="Brief description..." style={{
                width: "100%", padding: "10px 12px", borderRadius: 8,
                background: "#0a1628", border: "1px solid #1a3050",
                color: "#e0e8f0", fontSize: 13, outline: "none",
                fontFamily: "'DM Sans', sans-serif",
              }} />
            </div>

            <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: 11, color: "#5a7a9a", textTransform: "uppercase", letterSpacing: 0.8, display: "block", marginBottom: 4, fontFamily: "'Space Mono', monospace" }}>Priority</label>
                <select style={{
                  width: "100%", padding: "10px 12px", borderRadius: 8,
                  background: "#0a1628", border: "1px solid #1a3050",
                  color: "#e0e8f0", fontSize: 13, outline: "none",
                  fontFamily: "'DM Sans', sans-serif",
                }}>
                  <option>Low</option><option>Medium</option><option>High</option><option>Critical</option>
                </select>
              </div>
            </div>

            <button className="btn-primary" style={{ width: "100%", fontSize: 14, padding: "12px" }}>
              Submit Request
            </button>
          </div>
        </div>

        {/* Bottom row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>

          {/* Left: Onboarding + Tool Stack */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Onboarding Guides */}
            <div className="card" style={{ animation: mounted ? "fadeUp 0.5s ease 0.5s both" : "none" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <h3 style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: 16, color: "#fff" }}>
                  ð Onboarding Guides
                </h3>
                <button className="btn-outline">Start Learning</button>
              </div>
              <p style={{ fontSize: 13, color: "#5a7a9a", marginBottom: 14 }}>Tool Setup & Process Walkthroughs</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {GUIDES.map((g, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "10px 14px", borderRadius: 8,
                    background: "#0a162880", border: "1px solid #1a305040",
                    animation: mounted ? `slideIn 0.4s ease ${0.55 + i * 0.05}s both` : "none",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span className="tag" style={{ background: "#00B89420", color: "#00B894" }}>{g.tag}</span>
                      <span style={{ fontSize: 13 }}>{g.title}</span>
                    </div>
                    <span style={{ fontSize: 11, color: "#5a7a9a", fontFamily: "'Space Mono', monospace" }}>{g.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tool Stack */}
            <div className="card" style={{ animation: mounted ? "fadeUp 0.5s ease 0.6s both" : "none" }}>
              <h3 style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: 16, color: "#fff", marginBottom: 14 }}>
                ð§ Tool Stack
              </h3>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {TOOLS.map((t, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 8,
                    padding: "10px 16px", borderRadius: 10,
                    background: `${t.color}12`, border: `1px solid ${t.color}30`,
                    animation: mounted ? `fadeUp 0.4s ease ${0.65 + i * 0.05}s both` : "none",
                  }}>
                    <span style={{ fontSize: 16 }}>{t.icon}</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: t.color }}>{t.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Roadmap + Updates */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Roadmap */}
            <div className="card" style={{ animation: mounted ? "fadeUp 0.5s ease 0.5s both" : "none" }}>
              <h3 style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: 16, color: "#fff", marginBottom: 16 }}>
                ðºï¸ Rev-Ops Roadmap
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {ROADMAP.map((r, i) => (
                  <div key={i} style={{
                    animation: mounted ? `slideIn 0.4s ease ${0.55 + i * 0.06}s both` : "none",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ fontSize: 13, fontWeight: 600 }}>{r.item}</span>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span className="tag" style={{
                          background: r.status === "In Progress" ? "#FDCB6E20" : "#6C5CE720",
                          color: r.status === "In Progress" ? "#FDCB6E" : "#6C5CE7",
                        }}>{r.quarter}</span>
                        <span style={{ fontSize: 12, color: "#5a7a9a", fontFamily: "'Space Mono', monospace", minWidth: 36, textAlign: "right" }}>~{r.pct}%</span>
                      </div>
                    </div>
                    <ProgressBar pct={r.pct} color={r.status === "In Progress" ? "#00B894" : "#6C5CE7"} />
                  </div>
                ))}
              </div>
            </div>

            {/* Latest Announcements */}
            <div className="card" style={{ animation: mounted ? "fadeUp 0.5s ease 0.6s both" : "none" }}>
              <h3 style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: 16, color: "#fff", marginBottom: 14 }}>
                ð¢ Latest Announcements
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {ANNOUNCEMENTS.map((a, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "flex-start", gap: 10,
                    padding: "10px 14px", borderRadius: 8,
                    background: a.hot ? "#E1705510" : "#0a162880",
                    border: `1px solid ${a.hot ? "#E1705530" : "#1a305040"}`,
                    animation: mounted ? `slideIn 0.4s ease ${0.65 + i * 0.05}s both` : "none",
                  }}>
                    {a.hot && <span style={{ fontSize: 10, animation: "pulse 1.5s infinite" }}>ð´</span>}
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, lineHeight: 1.4 }}>{a.text}</div>
                      <div style={{ fontSize: 11, color: "#5a7a9a", marginTop: 4, fontFamily: "'Space Mono', monospace" }}>{a.date}</div>
                    </div>
                    <button className="btn-outline" style={{ fontSize: 10, padding: "4px 10px", whiteSpace: "nowrap" }}>Read More</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Agent Modal */}
      {showAgentModal && (
        <div className="modal-overlay" onClick={() => setShowAgentModal(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowAgentModal(null)} style={{
              position: "absolute", top: 16, right: 16, background: "none",
              border: "none", color: "#5a7a9a", fontSize: 20, cursor: "pointer",
            }}>â</button>
            <div style={{ fontSize: 36, marginBottom: 12 }}>{showAgentModal.icon}</div>
            <h2 style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: 20, color: "#fff", marginBottom: 8 }}>
              {showAgentModal.name}
            </h2>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 16 }}>
              <StatusDot status={showAgentModal.status} />
              <span style={{ fontSize: 12, color: "#5a7a9a", textTransform: "capitalize" }}>{showAgentModal.status}</span>
            </div>
            <p style={{ fontSize: 14, color: "#8899aa", lineHeight: 1.6, marginBottom: 20 }}>
              {showAgentModal.desc}
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              <button className="btn-primary">View Documentation</button>
              <button className="btn-outline">Run Health Check</button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{
        textAlign: "center", padding: "24px 32px",
        borderTop: "1px solid #1a305030",
        fontSize: 11, color: "#3a5a7a",
        fontFamily: "'Space Mono', monospace",
      }}>
        Testsigma Revenue Operations Â· RevOps Central v1.0 Â· Built with ð¤ by Sales Ops Team
      </footer>
    </div>
  );
}
