// StripeFlow.js
import React from 'react';

export default function StripeFlow() {
  return (
    <div className="stripeflow-wrap">
      <style>{`
        .stripeflow-wrap{
          --accent:#A6FF47;               /* Spanzor lime */
          --ink:#e6edf3;
          --bg:#0f161b;                    /* near your hero bg */
          --tile:#111a22;
          --lineA:#7c5cff;                 /* gradient line L->R */
          --lineB:#A6FF47;
          --shadow: 0 8px 30px rgba(0,0,0,.25);
          position:relative;
          margin-top:18px;
        }
        /* hide on small screens—hero stays clean */
        @media (max-width: 768px){ .stripeflow-grid{ display:none; } }

        .stripeflow-grid{
          display:grid;
          grid-template-columns: repeat(6, minmax(0, 1fr));
          gap:14px;
          padding:10px;
          border-radius:16px;
          background: linear-gradient(180deg, rgba(255,255,255,0.035), transparent);
          position:relative;
          overflow:hidden;
        }
        .sf-card{
          height:112px;
          border-radius:14px;
          background:var(--tile);
          border:1px solid rgba(255,255,255,.06);
          box-shadow: inset 0 1px 0 rgba(255,255,255,.02);
          display:flex; align-items:center; justify-content:center;
          position:relative;
          transition: transform .25s ease, border-color .25s ease, background .25s ease;
        }
        .sf-card.dim{ opacity:.5; filter:saturate(.65); }
        .sf-card:hover{ transform: translateY(-2px); }

        .sf-card.elevated{
          background:linear-gradient(180deg, #121c25, #0f171f);
          border-color: rgba(255,255,255,.12);
          box-shadow: var(--shadow);
        }
        .sf-pill{
          position:absolute; top:10px; left:10px;
          font-size:11px; letter-spacing:.2px;
          background:rgba(255,255,255,.06);
          color:var(--ink); padding:4px 8px; border-radius:999px;
        }
        .sf-title{
          position:absolute; bottom:12px; left:12px; right:12px;
          color:#cfe3f5; font-weight:700; font-size:13px;
        }
        .sf-caption{
          position:absolute; bottom:12px; right:12px; color:#93a6bb;
          font-size:12px; font-weight:500; text-align:right;
        }
        .sf-icon{
          width:36px;height:36px;border-radius:8px;
          display:grid;place-items:center;
          background: radial-gradient(80% 80% at 30% 25%, rgba(255,255,255,.1), rgba(255,255,255,0) 60%);
          border:1px solid rgba(255,255,255,.05);
        }
        .sf-icon svg{ width:22px;height:22px; opacity:.95 }

        /* animated connector lines */
        .sf-connector{ position:absolute; inset:0; pointer-events:none; }
        .sf-connector svg{ width:100%; height:100%; }
        .wire{
          stroke:url(#wireGrad); stroke-width:3; fill:none;
          stroke-linecap:round;
          stroke-dasharray: 6 10;
          filter: drop-shadow(0 0 6px rgba(124,92,255,.35));
          animation: dash 3.8s linear infinite;
        }
        @keyframes dash { to { stroke-dashoffset: -200; } }

        /* subtle background glow */
        .sf-glow{
          position:absolute; inset:-20%;
          background:
            radial-gradient(24% 22% at 30% 45%, rgba(166,255,71,.09), transparent 60%),
            radial-gradient(22% 20% at 75% 40%, rgba(124,92,255,.08), transparent 70%);
          filter: blur(28px);
          z-index:0;
        }
      `}</style>

      <div className="sf-glow" />

      <div className="stripeflow-grid">
        {/* ===== Row 1 ===== */}
        {/* Discovery (Brands) — Highlight LEFT */}
        <div className="sf-card elevated" style={{gridColumn:'1 / span 2'}}>
          <span className="sf-pill">Brands</span>
          <div className="sf-icon">
            {/* Search/graph icon */}
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="#9bd3ff">
              <circle cx="10.5" cy="10.5" r="5.5"/>
              <path d="M14.8 14.8L19 19" stroke="#7c5cff"/>
            </svg>
          </div>
          <div className="sf-title">Discovery</div>
          <div className="sf-caption">AI-matched creators for your niche</div>
        </div>

        <div className="sf-card dim" />
        <div className="sf-card dim" />

        {/* Opportunities (Influencers) — Highlight RIGHT */}
        <div className="sf-card elevated" style={{gridColumn:'5 / span 2'}}>
          <span className="sf-pill">Influencers</span>
          <div className="sf-icon">
            {/* Spark/opportunity icon */}
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
              <path d="M12 3v6M12 15v6M3 12h6M15 12h6" stroke="#ff7ad9"/>
              <circle cx="12" cy="12" r="3.5" stroke="#ffb86b"/>
            </svg>
          </div>
          <div className="sf-title">Opportunities</div>
          <div className="sf-caption">New briefs posted daily</div>
        </div>

        {/* ===== Row 2 (dim support tiles) ===== */}
        <div className="sf-card dim" />
        <div className="sf-card dim" />
        <div className="sf-card dim" />
        <div className="sf-card dim" />
        <div className="sf-card dim" />
        <div className="sf-card dim" />

        {/* ===== Row 3 ===== */}
        <div className="sf-card dim" />
        {/* Secure Payments — Highlight CENTER/BOTTOM */}
        <div className="sf-card elevated" style={{gridColumn:'2 / span 2'}}>
          <span className="sf-pill">Platform</span>
          <div className="sf-icon">
            {/* shield/credit icon */}
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
              <path d="M12 3l7 3v6c0 5-3.5 7.5-7 9-3.5-1.5-7-4-7-9V6l7-3Z" stroke="#A6FF47"/>
              <path d="M8 12h8M8 9h8" stroke="#9bd3ff"/>
            </svg>
          </div>
          <div className="sf-title">Secure Payments</div>
          <div className="sf-caption">Escrow protection & instant payouts</div>
        </div>
        <div className="sf-card dim" />
        <div className="sf-card dim" />
        <div className="sf-card dim" />

        {/* Connectors (Discovery → Opportunities, Opportunities → Secure Payments) */}
        <svg className="sf-connector" preserveAspectRatio="none">
          <defs>
            <linearGradient id="wireGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--lineA)"/>
              <stop offset="100%" stopColor="var(--lineB)"/>
            </linearGradient>
          </defs>
          {/* Discovery (left) to Opportunities (right) */}
          <path className="wire" d="M 20% 18% C 36% 18%, 46% 18%, 78% 18%" />
          {/* Opportunities (right) down to Secure Payments (bottom center) */}
          <path className="wire" d="M 78% 18% C 70% 30%, 55% 40%, 38% 52%" />
        </svg>
      </div>
    </div>
  );
}

