import Link from "next/link";

export default function LandingPage() {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .landing-container {
              max-width: 1200px;
              margin: 0 auto;
              padding: 0 2rem;
              position: relative;
              z-index: 1;
            }

            /* NAV */
            .landing-nav {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              z-index: 100;
              background: rgba(5, 5, 5, 0.75);
              backdrop-filter: blur(24px) saturate(1.2);
              border-bottom: 1px solid rgba(255, 255, 255, 0.06);
            }
            .nav-inner {
              max-width: 1200px;
              margin: 0 auto;
              padding: 0 2rem;
              display: flex;
              align-items: center;
              justify-content: space-between;
              height: 72px;
            }
            .logo {
              font-family: 'JetBrains Mono', monospace;
              font-weight: 800;
              font-size: 1.4rem;
              letter-spacing: 0.18em;
              text-transform: uppercase;
              background: linear-gradient(135deg, #10b981 0%, #6ee7b7 50%, #10b981 100%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
            }
            .logo-dot {
              display: inline-block;
              width: 8px;
              height: 8px;
              background: #10b981;
              border-radius: 50%;
              margin-left: 2px;
              vertical-align: middle;
              box-shadow: 0 0 12px rgba(16, 185, 129, 0.3);
              animation: pulse-dot 2.5s ease-in-out infinite;
            }
            @keyframes pulse-dot {
              0%, 100% { opacity: 1; box-shadow: 0 0 12px rgba(16, 185, 129, 0.3); }
              50% { opacity: 0.5; box-shadow: 0 0 4px rgba(16, 185, 129, 0.3); }
            }
            .nav-links {
              display: flex;
              align-items: center;
              gap: 2rem;
              list-style: none;
            }
            .nav-links a {
              font-family: 'JetBrains Mono', monospace;
              font-size: 0.78rem;
              font-weight: 500;
              color: #8a8a96;
              text-decoration: none;
              letter-spacing: 0.06em;
              text-transform: uppercase;
              transition: color 0.25s ease;
            }
            .nav-links a:hover { color: #10b981; }

            /* Buttons */
            .btn {
              display: inline-flex;
              align-items: center;
              gap: 8px;
              font-family: 'JetBrains Mono', monospace;
              font-size: 0.8rem;
              font-weight: 600;
              letter-spacing: 0.04em;
              padding: 12px 24px;
              border-radius: 100px;
              text-decoration: none;
              transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
              cursor: pointer;
              border: none;
            }
            .btn-primary {
              background: #10b981;
              color: #050505;
              box-shadow: 0 0 20px rgba(16, 185, 129, 0.12), 0 2px 8px rgba(0,0,0,0.3);
            }
            .btn-primary:hover {
              box-shadow: 0 0 40px rgba(16, 185, 129, 0.3), 0 4px 16px rgba(0,0,0,0.4);
              transform: translateY(-2px);
            }
            .btn-outline {
              background: transparent;
              color: #8a8a96;
              border: 1px solid rgba(255, 255, 255, 0.12);
            }
            .btn-outline:hover {
              border-color: #10b981;
              color: #10b981;
              box-shadow: 0 0 24px rgba(16, 185, 129, 0.12);
            }
            .btn-nav { font-size: 0.75rem; padding: 10px 20px; }

            /* Hero */
            .hero {
              padding: 180px 0 120px;
              position: relative;
            }
            .hero::before {
              content: '';
              position: absolute;
              top: 80px;
              left: 50%;
              transform: translateX(-50%);
              width: 800px;
              height: 500px;
              background: radial-gradient(ellipse at center, rgba(16, 185, 129, 0.12) 0%, transparent 60%);
              filter: blur(80px);
              pointer-events: none;
            }
            .hero::after {
              content: '';
              position: absolute;
              top: 200px;
              right: 10%;
              width: 300px;
              height: 300px;
              background: radial-gradient(circle, rgba(139, 92, 246, 0.10) 0%, transparent 70%);
              filter: blur(60px);
              pointer-events: none;
            }
            .hero-label {
              font-family: 'JetBrains Mono', monospace;
              font-size: 0.72rem;
              font-weight: 500;
              letter-spacing: 0.2em;
              text-transform: uppercase;
              color: #10b981;
              margin-bottom: 28px;
              display: flex;
              align-items: center;
              gap: 12px;
            }
            .hero-label::before {
              content: '';
              display: block;
              width: 24px;
              height: 1px;
              background: #10b981;
            }
            .hero-heading {
              font-family: 'Syne', sans-serif;
              font-size: clamp(3.2rem, 7.5vw, 6.5rem);
              font-weight: 800;
              line-height: 1.02;
              letter-spacing: -0.035em;
              margin-bottom: 32px;
              background: linear-gradient(180deg, #ffffff 0%, #d4d4d8 25%, #a1a1aa 50%, #d4d4d8 75%, #ffffff 100%);
              background-size: 100% 200%;
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
              animation: metal-shift 6s ease-in-out infinite;
            }
            @keyframes metal-shift {
              0%, 100% { background-position: 0% 0%; }
              50% { background-position: 0% 100%; }
            }
            .hero-heading .accent {
              background: linear-gradient(135deg, #10b981 0%, #6ee7b7 100%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
            }
            .hero-sub {
              font-size: 1.15rem;
              color: #8a8a96;
              max-width: 580px;
              line-height: 1.7;
              margin-bottom: 48px;
              font-weight: 400;
            }
            .hero-ctas { display: flex; gap: 16px; margin-bottom: 72px; }
            .hero-stats { display: flex; gap: 48px; }
            .hero-stat { opacity: 0; animation: fade-in-up 0.6s ease forwards; }
            .hero-stat:nth-child(1) { animation-delay: 0.8s; }
            .hero-stat:nth-child(2) { animation-delay: 1.0s; }
            .hero-stat:nth-child(3) { animation-delay: 1.2s; }
            .hero-stat-value {
              font-family: 'JetBrains Mono', monospace;
              font-size: 1.5rem;
              font-weight: 700;
              color: #f0f0f2;
            }
            .hero-stat-value .green { color: #10b981; }
            .hero-stat-label {
              font-family: 'JetBrains Mono', monospace;
              font-size: 0.7rem;
              color: #55555f;
              text-transform: uppercase;
              letter-spacing: 0.1em;
              margin-top: 4px;
            }
            @keyframes fade-in-up {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }

            /* Sections */
            .section-label {
              font-family: 'JetBrains Mono', monospace;
              font-size: 0.7rem;
              font-weight: 500;
              letter-spacing: 0.2em;
              text-transform: uppercase;
              color: #55555f;
              margin-bottom: 16px;
            }
            .section-title {
              font-family: 'Syne', sans-serif;
              font-size: clamp(2rem, 4vw, 3rem);
              font-weight: 700;
              letter-spacing: -0.03em;
              margin-bottom: 20px;
              line-height: 1.1;
            }
            .section-desc {
              color: #8a8a96;
              max-width: 520px;
              margin-bottom: 56px;
              font-size: 1.05rem;
            }

            /* Steps */
            .how-it-works { padding: 100px 0; }
            .steps {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 2px;
              background: rgba(255, 255, 255, 0.06);
              border-radius: 16px;
              overflow: hidden;
            }
            .step {
              background: #0a0a0c;
              padding: 48px 36px;
              transition: background 0.3s ease;
            }
            .step:hover { background: #111115; }
            .step-num {
              font-family: 'JetBrains Mono', monospace;
              font-size: 0.65rem;
              font-weight: 600;
              color: #10b981;
              letter-spacing: 0.15em;
              text-transform: uppercase;
              margin-bottom: 20px;
              display: flex;
              align-items: center;
              gap: 10px;
            }
            .step-num::after {
              content: '';
              flex: 1;
              height: 1px;
              background: rgba(255, 255, 255, 0.06);
            }
            .step-icon {
              width: 48px;
              height: 48px;
              border-radius: 10px;
              display: flex;
              align-items: center;
              justify-content: center;
              margin-bottom: 20px;
              font-size: 1.3rem;
            }
            .step:nth-child(1) .step-icon { background: rgba(16, 185, 129, 0.12); }
            .step:nth-child(2) .step-icon { background: rgba(139, 92, 246, 0.10); }
            .step:nth-child(3) .step-icon { background: rgba(16, 185, 129, 0.12); }
            .step-title {
              font-family: 'Syne', sans-serif;
              font-size: 1.3rem;
              font-weight: 700;
              margin-bottom: 12px;
              letter-spacing: -0.02em;
            }
            .step-desc { font-size: 0.92rem; color: #8a8a96; line-height: 1.6; }

            /* Features */
            .features { padding: 100px 0; }
            .features-grid {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 20px;
            }
            .feature-card {
              background: rgba(12, 12, 16, 0.6);
              backdrop-filter: blur(16px);
              border: 1px solid rgba(255, 255, 255, 0.06);
              border-radius: 16px;
              padding: 36px 30px;
              transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
              position: relative;
              overflow: hidden;
            }
            .feature-card:hover {
              border-color: rgba(255, 255, 255, 0.12);
              background: rgba(18, 18, 24, 0.8);
              transform: translateY(-4px);
            }
            .feature-icon {
              width: 44px;
              height: 44px;
              border-radius: 10px;
              background: rgba(16, 185, 129, 0.12);
              display: flex;
              align-items: center;
              justify-content: center;
              margin-bottom: 20px;
            }
            .feature-card:nth-child(2) .feature-icon,
            .feature-card:nth-child(5) .feature-icon {
              background: rgba(139, 92, 246, 0.10);
            }
            .feature-title {
              font-family: 'JetBrains Mono', monospace;
              font-size: 0.95rem;
              font-weight: 600;
              margin-bottom: 10px;
            }
            .feature-desc { font-size: 0.88rem; color: #55555f; line-height: 1.6; }

            /* Metrics */
            .landing-metrics { padding: 80px 0; }
            .metrics-card {
              background: #0a0a0c;
              border: 1px solid rgba(255, 255, 255, 0.06);
              border-radius: 16px;
              padding: 56px;
              position: relative;
              overflow: hidden;
            }
            .metrics-card::before {
              content: '';
              position: absolute;
              top: -1px;
              left: 0;
              right: 0;
              height: 1px;
              background: linear-gradient(90deg, transparent 0%, #10b981 30%, #8b5cf6 70%, transparent 100%);
              opacity: 0.7;
            }
            .metrics-header { text-align: center; margin-bottom: 48px; }
            .metrics-grid {
              display: grid;
              grid-template-columns: repeat(4, 1fr);
              gap: 0;
            }
            .metric {
              text-align: center;
              padding: 24px;
              position: relative;
            }
            .metric:not(:last-child)::after {
              content: '';
              position: absolute;
              right: 0;
              top: 20%;
              height: 60%;
              width: 1px;
              background: rgba(255, 255, 255, 0.06);
            }
            .metric-value {
              font-family: 'JetBrains Mono', monospace;
              font-size: 2.8rem;
              font-weight: 800;
              letter-spacing: -0.03em;
              margin-bottom: 8px;
            }
            .metric-value.green { color: #10b981; }
            .metric-value.violet { color: #8b5cf6; }
            .metric-label {
              font-family: 'JetBrains Mono', monospace;
              font-size: 0.68rem;
              color: #55555f;
              text-transform: uppercase;
              letter-spacing: 0.12em;
            }
            .metric-note {
              font-size: 0.7rem;
              color: #55555f;
              margin-top: 6px;
              font-style: italic;
            }

            /* CTA */
            .cta-section { padding: 120px 0; }
            .cta-inner { text-align: center; max-width: 680px; margin: 0 auto; }
            .cta-heading {
              font-family: 'Syne', sans-serif;
              font-size: clamp(2rem, 4vw, 2.8rem);
              font-weight: 700;
              letter-spacing: -0.03em;
              margin-bottom: 20px;
              line-height: 1.15;
            }
            .cta-heading .accent { color: #10b981; }
            .cta-desc { color: #8a8a96; margin-bottom: 40px; font-size: 1.05rem; }

            /* Footer */
            .landing-footer {
              border-top: 1px solid rgba(255, 255, 255, 0.06);
              padding: 48px 0;
              position: relative;
              z-index: 1;
            }
            .footer-inner {
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
            .footer-left { display: flex; align-items: center; gap: 32px; }
            .footer-logo {
              font-family: 'JetBrains Mono', monospace;
              font-weight: 700;
              font-size: 1rem;
              letter-spacing: 0.15em;
              color: #55555f;
            }
            .footer-links { display: flex; gap: 24px; list-style: none; }
            .footer-links a {
              font-family: 'JetBrains Mono', monospace;
              font-size: 0.72rem;
              color: #55555f;
              text-decoration: none;
              letter-spacing: 0.04em;
              transition: color 0.2s ease;
            }
            .footer-links a:hover { color: #8a8a96; }
            .footer-bottom {
              margin-top: 32px;
              padding-top: 24px;
              border-top: 1px solid rgba(255, 255, 255, 0.06);
              font-family: 'JetBrains Mono', monospace;
              font-size: 0.68rem;
              color: #55555f;
              text-align: center;
              letter-spacing: 0.04em;
            }

            /* Code block */
            .code-block {
              background: #0a0a0c;
              border: 1px solid rgba(255, 255, 255, 0.06);
              border-radius: 10px;
              padding: 20px 24px;
              font-family: 'JetBrains Mono', monospace;
              font-size: 0.8rem;
              color: #8a8a96;
              margin-top: 24px;
              overflow-x: auto;
            }
            .code-block .comment { color: #55555f; }
            .code-block .keyword { color: #8b5cf6; }
            .code-block .string { color: #10b981; }
            .code-block .func { color: #fbbf24; }

            /* Responsive */
            @media (max-width: 900px) {
              .steps, .features-grid { grid-template-columns: 1fr; }
              .metrics-grid { grid-template-columns: repeat(2, 1fr); }
              .metric:not(:last-child)::after { display: none; }
              .nav-links { display: none; }
              .hero-stats { flex-direction: column; gap: 20px; }
              .hero-heading { font-size: 2.8rem; }
              .hero { padding: 140px 0 80px; }
              .footer-inner { flex-direction: column; gap: 24px; text-align: center; }
              .footer-left { flex-direction: column; gap: 16px; }
            }
            @media (max-width: 600px) {
              .features-grid { gap: 12px; }
              .metrics-grid { grid-template-columns: 1fr; }
              .hero-ctas { flex-direction: column; width: fit-content; }
            }
          `,
        }}
      />

      {/* NAV */}
      <nav className="landing-nav">
        <div className="nav-inner">
          <div className="logo">
            VEIL<span className="logo-dot"></span>
          </div>
          <ul className="nav-links">
            <li><a href="#how-it-works">Protocol</a></li>
            <li><a href="#features">Agents</a></li>
            <li><a href="#metrics">Compliance</a></li>
            <li>
              <Link href="/shield" className="btn btn-primary btn-nav">
                Launch App
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="landing-container">
          <div className="hero-label">Privacy Infrastructure for Solana</div>
          <h1 className="hero-heading">
            Private Payments.
            <br />
            <span className="accent">Public Compliance.</span>
          </h1>
          <p className="hero-sub">
            The privacy infrastructure for the agentic economy. ZK-powered
            selective disclosure so AI agents transact privately &mdash; while
            staying fully compliant.
          </p>
          <div className="hero-ctas">
            <Link href="/shield" className="btn btn-primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></svg>
              Launch App
            </Link>
            <a href="#how-it-works" className="btn btn-outline">
              Explore Protocol &rarr;
            </a>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-value"><span className="green">0</span> data leaks</div>
              <div className="hero-stat-label">Since inception</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value"><span className="green">$0</span> regulatory fines</div>
              <div className="hero-stat-label">Compliant by design</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value"><span className="green">100%</span> on-chain</div>
              <div className="hero-stat-label">Verifiable. Always.</div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-it-works" id="how-it-works">
        <div className="landing-container">
          <div className="section-label">{"// How it works"}</div>
          <h2 className="section-title">Three steps to private,<br />compliant settlement.</h2>
          <p className="section-desc">No trusted intermediaries. No data exposure. Just math.</p>
          <div className="steps">
            <div className="step">
              <div className="step-num">Step 01</div>
              <div className="step-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M9 8h7M8 12h6m-5 4h4" /></svg>
              </div>
              <h3 className="step-title">Agent Initiates</h3>
              <p className="step-desc">AI agent sends a payment through VEIL. The SDK handles encryption, proof generation, and routing &mdash; one function call.</p>
            </div>
            <div className="step">
              <div className="step-num">Step 02</div>
              <div className="step-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /><path d="m9 12 2 2 4-4" /></svg>
              </div>
              <h3 className="step-title">ZK Proof Generated</h3>
              <p className="step-desc">Transaction is shielded with a selective disclosure proof. Only the fields you choose are visible &mdash; amount, sender, purpose. You decide.</p>
            </div>
            <div className="step">
              <div className="step-num">Step 03</div>
              <div className="step-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" /></svg>
              </div>
              <h3 className="step-title">Compliant Settlement</h3>
              <p className="step-desc">Regulators verify compliance without seeing private data. The math proves you&apos;re clean. No trust required.</p>
            </div>
          </div>

          <div className="code-block" style={{ marginTop: "40px" }}>
            <span className="comment">{"// One line to shield a payment"}</span><br />
            <span className="keyword">const</span> tx = <span className="keyword">await</span> veil.<span className="func">shieldTransfer</span>{"({"}<br />
            &nbsp;&nbsp;to: <span className="string">&quot;agent_0x8f...3a&quot;</span>,<br />
            &nbsp;&nbsp;amount: <span className="string">&quot;1000&quot;</span>,<br />
            &nbsp;&nbsp;token: <span className="string">&quot;USDC&quot;</span>,<br />
            &nbsp;&nbsp;disclose: [<span className="string">&quot;compliance_status&quot;</span>, <span className="string">&quot;jurisdiction&quot;</span>]<br />
            {"});"}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features" id="features">
        <div className="landing-container">
          <div className="section-label">{"// Capabilities"}</div>
          <h2 className="section-title">Built for agents.<br />Trusted by regulators.</h2>
          <p className="section-desc">Everything an autonomous agent needs to move money privately and legally.</p>
          <div className="features-grid">
            {[
              { title: "Selective Disclosure", desc: "Choose exactly what to reveal. Nothing more. ZK proofs let you prove compliance without exposing the transaction graph.", stroke: "#10b981", icon: <><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></> },
              { title: "Agent-Native SDK", desc: "Built for AI agents. MCP server, REST API, and TypeScript SDK. One function call to shield any payment.", stroke: "#8b5cf6", icon: <><path d="M17 6.1H3" /><path d="M21 12.1H3" /><path d="M15.1 18H3" /><path d="m17 18 4-4-4-4" /></> },
              { title: "Multi-Chain", desc: "Solana-native with sub-second finality. Base and Polygon integrations shipping Q2 2026.", stroke: "#10b981", icon: <><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></> },
              { title: "Regulatory Ready", desc: "AML/KYC verification without exposing transaction data. Compliance proofs are verifiable by any jurisdiction.", stroke: "#10b981", icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /> },
              { title: "Sub-Second Settlement", desc: "Solana speed. ZK proofs generated in <400ms. No waiting. No batching. Real-time private settlement.", stroke: "#8b5cf6", icon: <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" /> },
              { title: "Open Source", desc: "Audit the code. Trust the math. Every proof circuit, every contract, every line — publicly verifiable on GitHub.", stroke: "#10b981", icon: <><path d="M16 22h2c.5 0 1-.2 1.4-.6.4-.4.6-.9.6-1.4V7.5L14.5 2H6c-.5 0-1 .2-1.4.6C4.2 3 4 3.5 4 4v3" /><polyline points="14,2 14,8 20,8" /><path d="M4.04 11.71a5.17 5.17 0 1 0 0 7.32" /><path d="M12 18H4" /></> },
            ].map((f, i) => (
              <div className="feature-card" key={i}>
                <div className="feature-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={f.stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{f.icon}</svg>
                </div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* METRICS */}
      <section className="landing-metrics" id="metrics">
        <div className="landing-container">
          <div className="metrics-card">
            <div className="metrics-header">
              <div className="section-label" style={{ color: "#10b981" }}>{"// Live Protocol Metrics"}</div>
              <h2 className="section-title" style={{ marginBottom: 0 }}>Transparency in real time.</h2>
            </div>
            <div className="metrics-grid">
              <div className="metric">
                <div className="metric-value green">2,491</div>
                <div className="metric-label">Transactions Shielded</div>
                <div className="metric-note">Since devnet launch</div>
              </div>
              <div className="metric">
                <div className="metric-value violet">87</div>
                <div className="metric-label">Agents Connected</div>
                <div className="metric-note">Private beta</div>
              </div>
              <div className="metric">
                <div className="metric-value green">100%</div>
                <div className="metric-label">Compliance Rate</div>
                <div className="metric-note">By design</div>
              </div>
              <div className="metric">
                <div className="metric-value" style={{ color: "#f0f0f2" }}>1</div>
                <div className="metric-label">Chains Supported</div>
                <div className="metric-note">Solana</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="landing-container">
          <div className="cta-inner">
            <div className="section-label" style={{ display: "flex", justifyContent: "center" }}>{"// Get started"}</div>
            <h2 className="cta-heading">
              The agentic economy needs privacy<br />
              that <span className="accent">regulators trust.</span>
            </h2>
            <p className="cta-desc">Start building on compliant private infrastructure today.</p>
            <Link href="/shield" className="btn btn-primary" style={{ fontSize: "0.9rem", padding: "14px 32px" }}>
              Launch App &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="landing-footer">
        <div className="landing-container">
          <div className="footer-inner">
            <div className="footer-left">
              <div className="footer-logo">VEIL</div>
              <ul className="footer-links">
                <li><a href="#how-it-works">Protocol</a></li>
                <li><a href="#features">Agents</a></li>
                <li><a href="#metrics">Compliance</a></li>
                <li><Link href="/shield">Dashboard</Link></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            VEIL PROTOCOL &copy; 2026 &mdash; Privacy infrastructure for the agentic economy. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
