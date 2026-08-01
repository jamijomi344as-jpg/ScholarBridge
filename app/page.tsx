"use client";

import React from "react";

export default function Home() {
  const findUrl = "https://scholarbridge-gjlm.onrender.com/find";

  return (
    <div
      style={{
        background: "#F7F8FC",
        color: "#1E2A4A",
        fontFamily: "'Inter', sans-serif",
        lineHeight: 1.6,
        WebkitFontSmoothing: "antialiased",
        overflowX: "hidden",
        minHeight: "100vh",
        margin: 0,
        padding: 0,
      }}
    >
      {/* Dynamic Embedded Styles for Keyframe Animations & Media Queries */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap");

        *,
        *::before,
        *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        html {
          scroll-behavior: smooth;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .wrap {
          max-width: 1160px;
          margin: 0 auto;
          padding: 0 32px;
          position: relative;
        }

        @media (max-width: 640px) {
          .wrap {
            padding: 0 18px;
          }
          .nav-links .nav-link {
            display: none;
          }
        }

        /* NAV */
        nav {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(247, 248, 252, 0.88);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid #e2e6f0;
        }
        .nav-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 66px;
        }
        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: "Instrument Serif", serif;
          font-size: 1.2rem;
          color: #1e2a4a;
        }
        .logo-mark {
          width: 34px;
          height: 34px;
          border-radius: 9px;
          background: #1e2a4a;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: "JetBrains Mono", monospace;
          font-size: 0.65rem;
          font-weight: 500;
          color: #aae4fe;
          flex-shrink: 0;
        }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 28px;
        }
        .nav-link {
          font-size: 0.87rem;
          color: #5a6882;
          transition: color 0.15s;
        }
        .nav-link:hover {
          color: #1e2a4a;
        }
        .nav-btn {
          font-size: 0.87rem;
          font-weight: 600;
          background: #1e2a4a;
          color: #fff;
          padding: 10px 22px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          transition: background 0.15s, transform 0.15s;
          display: inline-block;
        }
        .nav-btn:hover {
          background: #2a3a60;
          transform: translateY(-1px);
        }

        /* HERO */
        .hero {
          padding: 96px 0 72px;
          text-align: center;
        }
        .badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: "JetBrains Mono", monospace;
          font-size: 0.72rem;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          color: #3b6fe0;
          border: 1px solid #c5d5f8;
          background: #eef3fd;
          padding: 7px 14px;
          border-radius: 100px;
          margin-bottom: 30px;
        }
        .badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #3b6fe0;
          animation: blink 2s ease infinite;
        }
        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.3;
          }
        }

        h1 {
          font-family: "Instrument Serif", serif;
          font-size: clamp(2.6rem, 5vw, 4.4rem);
          line-height: 1.05;
          letter-spacing: -0.02em;
          color: #1e2a4a;
          max-width: 14ch;
          margin: 0 auto 22px;
        }
        h1 em {
          font-style: italic;
          color: #3b6fe0;
        }
        .hero-sub {
          font-size: 1.08rem;
          color: #5a6882;
          max-width: 50ch;
          margin: 0 auto 40px;
          line-height: 1.75;
          font-weight: 400;
        }
        .hero-ctas {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          flex-wrap: wrap;
          margin-bottom: 64px;
        }
        .btn-main {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #1e2a4a;
          color: #fff;
          font-size: 0.98rem;
          font-weight: 600;
          padding: 14px 30px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          transition: background 0.18s, transform 0.18s;
        }
        .btn-main:hover {
          background: #2a3a60;
          transform: translateY(-2px);
        }
        .btn-main svg {
          width: 17px;
          height: 17px;
          flex-shrink: 0;
        }
        .btn-sec {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.95rem;
          color: #5a6882;
          border: 1px solid #d0d7e8;
          background: #fff;
          padding: 14px 26px;
          border-radius: 10px;
          transition: border-color 0.15s, color 0.15s;
        }
        .btn-sec:hover {
          border-color: #3b6fe0;
          color: #1e2a4a;
        }

        /* DASHBOARD PREVIEW */
        .dashboard-preview {
          background: #fff;
          border: 1px solid #dde3ef;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(30, 42, 74, 0.04),
            0 20px 60px rgba(30, 42, 74, 0.08), 0 0 0 1px rgba(30, 42, 74, 0.04);
          max-width: 900px;
          margin: 0 auto;
        }
        .db-topbar {
          background: #f2f4f9;
          border-bottom: 1px solid #dde3ef;
          padding: 13px 18px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .db-dots {
          display: flex;
          gap: 7px;
        }
        .db-dot {
          width: 11px;
          height: 11px;
          border-radius: 50%;
        }
        .db-dot.r {
          background: #ff5f57;
        }
        .db-dot.y {
          background: #febc2e;
        }
        .db-dot.g {
          background: #28c840;
        }
        .db-url {
          flex: 1;
          background: #fff;
          border: 1px solid #dde3ef;
          border-radius: 6px;
          padding: 5px 12px;
          font-family: "JetBrains Mono", monospace;
          font-size: 0.72rem;
          color: #8a96aa;
          text-align: center;
        }
        .db-body {
          display: grid;
          grid-template-columns: 250px 1fr;
          min-height: 360px;
        }
        @media (max-width: 700px) {
          .db-body {
            grid-template-columns: 1fr;
          }
          .db-sidebar {
            display: none;
          }
          .stats {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        .db-sidebar {
          border-right: 1px solid #dde3ef;
          padding: 20px;
          background: #f7f9fd;
          text-align: left;
        }
        .db-sidebar-head {
          font-family: "JetBrains Mono", monospace;
          font-size: 0.65rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #8a96aa;
          margin-bottom: 14px;
        }
        .profile-field {
          background: #fff;
          border: 1px solid #dde3ef;
          border-radius: 8px;
          padding: 10px 12px;
          margin-bottom: 8px;
        }
        .pf-label {
          font-size: 0.68rem;
          color: #8a96aa;
          margin-bottom: 2px;
        }
        .pf-val {
          font-family: "JetBrains Mono", monospace;
          font-size: 0.85rem;
          color: #1e2a4a;
          font-weight: 500;
          opacity: 0;
          animation: fadeIn 0.4s ease forwards;
        }
        .profile-field:nth-child(2) .pf-val {
          animation-delay: 0.5s;
        }
        .profile-field:nth-child(3) .pf-val {
          animation-delay: 0.9s;
        }
        .profile-field:nth-child(4) .pf-val {
          animation-delay: 1.3s;
        }
        .profile-field:nth-child(5) .pf-val {
          animation-delay: 1.7s;
        }
        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }
        .match-btn {
          width: 100%;
          margin-top: 14px;
          padding: 11px;
          border-radius: 9px;
          background: #1e2a4a;
          color: #fff;
          font-size: 0.85rem;
          font-weight: 600;
          border: none;
          cursor: pointer;
          opacity: 0;
          animation: fadeIn 0.4s ease forwards;
          animation-delay: 2.1s;
          display: inline-block;
          text-align: center;
        }
        .db-results {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          background: #fff;
          text-align: left;
        }
        .db-results-head {
          font-family: "JetBrains Mono", monospace;
          font-size: 0.65rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #8a96aa;
          margin-bottom: 4px;
        }
        .uni-card {
          background: #f7f9fd;
          border: 1px solid #dde3ef;
          border-radius: 10px;
          padding: 13px 15px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          opacity: 0;
          animation: fadeIn 0.4s ease forwards;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .uni-card:hover {
          border-color: #aae4fe;
          box-shadow: 0 2px 12px rgba(59, 111, 224, 0.08);
        }
        .uni-card.c1 {
          animation-delay: 2.3s;
        }
        .uni-card.c2 {
          animation-delay: 2.6s;
        }
        .uni-card.c3 {
          animation-delay: 2.9s;
        }
        .uni-card.featured {
          border-color: #c5d5f8;
          background: #eef3fd;
        }
        .uni-name {
          font-size: 0.88rem;
          font-weight: 600;
          color: #1e2a4a;
          margin-bottom: 3px;
        }
        .uni-meta {
          font-size: 0.73rem;
          color: #8a96aa;
          display: flex;
          align-items: center;
          gap: 7px;
        }
        .uni-meta .sep {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: #c8d0df;
          display: inline-block;
        }
        .uni-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 5px;
          flex-shrink: 0;
        }
        .match-pct {
          font-family: "JetBrains Mono", monospace;
          font-size: 1.05rem;
          font-weight: 600;
        }
        .match-pct.high {
          color: #16a34a;
        }
        .match-pct.mid {
          color: #d97706;
        }
        .match-pct.vhigh {
          color: #0d9488;
        }
        .uni-tag {
          font-size: 0.66rem;
          padding: 3px 8px;
          border-radius: 100px;
          font-family: "JetBrains Mono", monospace;
        }
        .uni-tag.reach {
          background: #fef3c7;
          color: #92400e;
          border: 1px solid #fde68a;
        }
        .uni-tag.target {
          background: #eef3fd;
          color: #1d4ed8;
          border: 1px solid #c5d5f8;
        }
        .uni-tag.safety {
          background: #ecfdf5;
          color: #065f46;
          border: 1px solid #a7f3d0;
        }

        /* STATS */
        .stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: #dde3ef;
          border: 1px solid #dde3ef;
          border-radius: 14px;
          overflow: hidden;
          margin-top: 56px;
        }
        .stat {
          background: #fff;
          padding: 26px 22px;
          text-align: center;
        }
        .stat-n {
          font-family: "Instrument Serif", serif;
          font-size: 2.2rem;
          line-height: 1;
          margin-bottom: 5px;
          color: #1e2a4a;
        }
        .stat-l {
          font-size: 0.82rem;
          color: #8a96aa;
        }

        /* SECTIONS */
        .section {
          padding: 92px 0;
        }
        .s-label {
          font-family: "JetBrains Mono", monospace;
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #3b6fe0;
          margin-bottom: 14px;
        }
        h2 {
          font-family: "Instrument Serif", serif;
          font-size: clamp(1.9rem, 3vw, 2.7rem);
          letter-spacing: -0.015em;
          line-height: 1.1;
          color: #1e2a4a;
          margin-bottom: 12px;
        }
        .s-sub {
          font-size: 1rem;
          color: #5a6882;
          max-width: 46ch;
          margin-bottom: 52px;
        }

        /* PROBLEMS */
        .prob-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }
        @media (max-width: 760px) {
          .prob-grid,
          .how-grid {
            grid-template-columns: 1fr !important;
          }
          .step {
            border-right: none !important;
            border-bottom: 1px solid #dde3ef;
          }
          .step:last-child {
            border-bottom: none;
          }
        }
        .prob {
          border: 1px solid #dde3ef;
          border-radius: 14px;
          padding: 28px 24px;
          background: #fff;
          transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
        }
        .prob:hover {
          border-color: #aae4fe;
          box-shadow: 0 8px 24px rgba(30, 42, 74, 0.07);
          transform: translateY(-3px);
        }
        .prob-num {
          font-family: "JetBrains Mono", monospace;
          font-size: 0.68rem;
          color: #c0c8d8;
          margin-bottom: 16px;
          letter-spacing: 0.08em;
        }
        .prob-icon {
          font-size: 1.5rem;
          margin-bottom: 12px;
          display: block;
        }
        .prob h3 {
          font-family: "Instrument Serif", serif;
          font-size: 1.12rem;
          color: #1e2a4a;
          margin-bottom: 8px;
        }
        .prob p {
          font-size: 0.88rem;
          color: #5a6882;
          line-height: 1.7;
        }

        /* HOW IT WORKS */
        .how-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border: 1px solid #dde3ef;
          border-radius: 16px;
          overflow: hidden;
          margin-top: 48px;
          background: #fff;
        }
        .step {
          padding: 34px 28px;
          border-right: 1px solid #dde3ef;
          position: relative;
        }
        .step:last-child {
          border-right: none;
        }
        .step::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
        }
        .step.s1::after {
          background: #fbbf24;
        }
        .step.s2::after {
          background: #3b6fe0;
        }
        .step.s3::after {
          background: #10b981;
        }
        .step-n {
          font-family: "JetBrains Mono", monospace;
          font-size: 0.68rem;
          color: #c0c8d8;
          margin-bottom: 16px;
        }
        .step-icon {
          font-size: 1.4rem;
          margin-bottom: 12px;
          display: block;
        }
        .step h3 {
          font-family: "Instrument Serif", serif;
          font-size: 1.1rem;
          color: #1e2a4a;
          margin-bottom: 7px;
        }
        .step p {
          font-size: 0.87rem;
          color: #5a6882;
          line-height: 1.65;
          max-width: 26ch;
        }

        /* BENTO */
        .bento {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 14px;
          margin-top: 48px;
        }
        .b {
          border: 1px solid #dde3ef;
          border-radius: 14px;
          padding: 26px 22px;
          background: #fff;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .b:hover {
          border-color: #aae4fe;
          box-shadow: 0 6px 20px rgba(30, 42, 74, 0.06);
        }
        .b1 {
          grid-column: span 7;
        }
        .b2 {
          grid-column: span 5;
        }
        .b3 {
          grid-column: span 4;
        }
        .b4 {
          grid-column: span 4;
        }
        .b5 {
          grid-column: span 4;
        }
        @media (max-width: 860px) {
          .b1,
          .b2,
          .b3,
          .b4,
          .b5 {
            grid-column: span 12 !important;
          }
        }
        .b-tag {
          font-family: "JetBrains Mono", monospace;
          font-size: 0.67rem;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          color: #8a96aa;
          margin-bottom: 12px;
        }
        .b h3 {
          font-family: "Instrument Serif", serif;
          font-size: 1.12rem;
          color: #1e2a4a;
          margin-bottom: 7px;
        }
        .b p {
          font-size: 0.87rem;
          color: #5a6882;
          line-height: 1.65;
        }
        .b-accent {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 16px;
          font-size: 0.81rem;
          font-weight: 500;
        }
        .b-accent.blue {
          color: #3b6fe0;
        }
        .b-accent.gold {
          color: #d97706;
        }
        .b-accent.green {
          color: #059669;
        }

        .mini-chart {
          display: flex;
          align-items: flex-end;
          gap: 5px;
          height: 52px;
          margin-top: 16px;
        }
        .bar {
          flex: 1;
          border-radius: 3px 3px 0 0;
          background: linear-gradient(to top, #c5d5f8, #3b6fe0);
          animation: growBar 0.6s ease forwards;
          transform-origin: bottom;
        }
        @keyframes growBar {
          from {
            transform: scaleY(0);
          }
          to {
            transform: scaleY(1);
          }
        }
        .bar:nth-child(1) {
          height: 35%;
          animation-delay: 0.1s;
        }
        .bar:nth-child(2) {
          height: 55%;
          animation-delay: 0.2s;
        }
        .bar:nth-child(3) {
          height: 45%;
          animation-delay: 0.3s;
        }
        .bar:nth-child(4) {
          height: 80%;
          animation-delay: 0.4s;
        }
        .bar:nth-child(5) {
          height: 65%;
          animation-delay: 0.5s;
        }
        .bar:nth-child(6) {
          height: 90%;
          animation-delay: 0.6s;
        }
        .bar:nth-child(7) {
          height: 75%;
          animation-delay: 0.7s;
        }

        .score-ring-wrap {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-top: 14px;
        }
        .score-ring {
          position: relative;
          width: 66px;
          height: 66px;
          flex-shrink: 0;
        }
        .score-ring svg {
          width: 66px;
          height: 66px;
          transform: rotate(-90deg);
        }
        .score-ring circle {
          fill: none;
          stroke: #e8f0fe;
          stroke-width: 5;
        }
        .score-ring .fill {
          stroke: #10b981;
          stroke-width: 5;
          stroke-linecap: round;
          stroke-dasharray: 160;
          stroke-dashoffset: 160;
          animation: drawRing 1.5s ease forwards;
          animation-delay: 0.8s;
        }
        @keyframes drawRing {
          to {
            stroke-dashoffset: 40;
          }
        }
        .score-ring .label {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: "JetBrains Mono", monospace;
          font-size: 0.88rem;
          color: #059669;
          font-weight: 500;
        }
        .score-info .score-name {
          font-size: 0.9rem;
          font-weight: 600;
          color: #1e2a4a;
          margin-bottom: 2px;
        }
        .score-info .score-sub {
          font-size: 0.76rem;
          color: #8a96aa;
        }

        /* CTA */
        .cta-wrap {
          padding: 92px 0 100px;
          text-align: center;
        }
        .cta-box {
          max-width: 560px;
          margin: 0 auto;
          background: #1e2a4a;
          border-radius: 20px;
          padding: 60px 44px;
          position: relative;
          overflow: hidden;
        }
        .cta-box::before {
          content: "";
          position: absolute;
          top: -80px;
          right: -80px;
          width: 260px;
          height: 260px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(170, 228, 254, 0.12) 0%,
            transparent 70%
          );
          pointer-events: none;
        }
        .cta-box h2 {
          color: #fff;
          margin-bottom: 14px;
        }
        .cta-box p {
          color: rgba(255, 255, 255, 0.55);
          margin-bottom: 30px;
          font-size: 0.97rem;
        }
        .cta-box .badge {
          border-color: rgba(170, 228, 254, 0.25);
          background: rgba(170, 228, 254, 0.08);
          color: #aae4fe;
          margin-bottom: 22px;
        }
        .btn-light {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #aae4fe;
          color: #1e2a4a;
          font-size: 0.98rem;
          font-weight: 700;
          padding: 14px 30px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          transition: background 0.18s, transform 0.18s;
        }
        .btn-light:hover {
          background: #c5edff;
          transform: translateY(-2px);
        }
        .btn-light svg {
          width: 17px;
          height: 17px;
        }

        /* FOOTER */
        footer {
          border-top: 1px solid #dde3ef;
          padding: 28px 0;
          background: #fff;
        }
        .foot {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }
        .foot-right {
          font-family: "JetBrains Mono", monospace;
          font-size: 0.72rem;
          color: #a0aabb;
          display: flex;
          gap: 20px;
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
          }
          .pf-val,
          .uni-card,
          .match-btn {
            opacity: 1;
          }
          .score-ring .fill {
            stroke-dashoffset: 40;
          }
          .bar {
            transform: scaleY(1);
          }
        }
      `}</style>

      {/* NAVBAR */}
      <nav>
        <div className="wrap nav-inner">
          <div className="logo">
            <div className="logo-mark">SB</div>
            ScholarBridge
            <span
              style={{
                color: "#AAE4FE",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.7rem",
                marginLeft: "5px",
                background: "#1E2A4A",
                padding: "1px 5px",
                borderRadius: "4px",
              }}
            >
              AI
            </span>
          </div>
          <div className="nav-links">
            <a href="#how" className="nav-link">
              How it works
            </a>
            <a href="#features" className="nav-link">
              Features
            </a>
            <a href={findUrl} className="nav-btn">
              Get matched →
            </a>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="hero wrap">
        <div className="badge">
          <span className="badge-dot"></span>Built for international students
        </div>
        <h1>
          Find schools that would <em>actually</em> want you.
        </h1>
        <p className="hero-sub">
          Enter your GPA, IELTS, and major. ScholarBridge AI analyzes real
          admission patterns and returns a ranked shortlist — with scholarships
          and deadlines attached.
        </p>
        <div className="hero-ctas">
          <a href={findUrl} className="btn-main">
            Start your match
            <svg viewBox="0 0 18 18" fill="none">
              <path
                d="M3.5 9h11M10 4.5l4.5 4.5L10 13.5"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a href="#how" className="btn-sec">
            See how it works
          </a>
        </div>

        {/* DASHBOARD PREVIEW */}
        <div className="dashboard-preview">
          <div className="db-topbar">
            <div className="db-dots">
              <div className="db-dot r"></div>
              <div className="db-dot y"></div>
              <div className="db-dot g"></div>
            </div>
            <div className="db-url">app.scholarbridge.ai/matches</div>
          </div>
          <div className="db-body">
            <div className="db-sidebar">
              <div className="db-sidebar-head">Your profile</div>
              <div className="profile-field">
                <div className="pf-label">Country</div>
                <div className="pf-val">Uzbekistan</div>
              </div>
              <div className="profile-field">
                <div className="pf-label">GPA</div>
                <div className="pf-val">3.85 / 4.0</div>
              </div>
              <div className="profile-field">
                <div className="pf-label">IELTS</div>
                <div className="pf-val">7.5 Overall</div>
              </div>
              <div className="profile-field">
                <div className="pf-label">Major</div>
                <div className="pf-val">Comp. Science</div>
              </div>
              <a href={findUrl} className="match-btn">
                Find my matches →
              </a>
            </div>
            <div className="db-results">
              <div className="db-results-head">AI Matches — 5 found</div>
              <div className="uni-card featured c1">
                <div>
                  <div className="uni-name">University of Toronto</div>
                  <div className="uni-meta">
                    <span>CS · Full Scholarship</span>
                    <span className="sep"></span>
                    <span>Dec 1 deadline</span>
                  </div>
                </div>
                <div className="uni-right">
                  <div className="match-pct high">87%</div>
                  <div className="uni-tag target">Target</div>
                </div>
              </div>
              <div className="uni-card c2">
                <div>
                  <div className="uni-name">TU Delft</div>
                  <div className="uni-meta">
                    <span>Engineering · Partial aid</span>
                    <span className="sep"></span>
                    <span>Jan 15 deadline</span>
                  </div>
                </div>
                <div className="uni-right">
                  <div className="match-pct mid">74%</div>
                  <div className="uni-tag reach">Reach</div>
                </div>
              </div>
              <div className="uni-card c3">
                <div>
                  <div className="uni-name">Seoul National University</div>
                  <div className="uni-meta">
                    <span>CS · Full Scholarship</span>
                    <span className="sep"></span>
                    <span>Nov 30 deadline</span>
                  </div>
                </div>
                <div className="uni-right">
                  <div className="match-pct vhigh">91%</div>
                  <div className="uni-tag safety">Safety</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="stats">
          <div className="stat">
            <div className="stat-n">12K+</div>
            <div className="stat-l">Scholarships tracked</div>
          </div>
          <div className="stat">
            <div className="stat-n">200+</div>
            <div className="stat-l">Universities</div>
          </div>
          <div className="stat">
            <div className="stat-n">78%</div>
            <div className="stat-l">Avg top-match score</div>
          </div>
          <div className="stat">
            <div className="stat-n">Free</div>
            <div className="stat-l">Always for students</div>
          </div>
        </div>
      </section>

      {/* PROBLEMS SECTION */}
      <section className="section">
        <div className="wrap">
          <div className="s-label">The problem</div>
          <h2>
            Good students still apply
            <br />
            to the wrong schools.
          </h2>
          <p className="s-sub">
            Rankings tell you nothing about whether a school wants someone with
            your exact profile.
          </p>
          <div className="prob-grid">
            <div className="prob p1">
              <div className="prob-num">01 —</div>
              <span className="prob-icon">🎯</span>
              <h3>No sense of fit</h3>
              <p>
                Rankings don't show which schools would admit or fund someone
                with your exact GPA, IELTS, and background.
              </p>
            </div>
            <div className="prob p2">
              <div className="prob-num">02 —</div>
              <span className="prob-icon">🔍</span>
              <h3>Hidden scholarships</h3>
              <p>
                Institutional and departmental funding sits undiscovered — most
                students never find it.
              </p>
            </div>
            <div className="prob p3">
              <div className="prob-num">03 —</div>
              <span className="prob-icon">⏰</span>
              <h3>Missed deadlines</h3>
              <p>
                Every school runs its own calendar. One missed date can undo a
                year of otherwise excellent work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="section" id="how" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="s-label">How it works</div>
          <h2>
            Three inputs.
            <br />A funded shortlist.
          </h2>
          <div className="how-grid">
            <div className="step s1">
              <div className="step-n">01 —</div>
              <span className="step-icon">✍️</span>
              <h3>Enter your profile</h3>
              <p>
                GPA, test scores, major, budget — the signals admission offices
                actually weigh.
              </p>
            </div>
            <div className="step s2">
              <div className="step-n">02 —</div>
              <span className="step-icon">⚡</span>
              <h3>AI fits the data</h3>
              <p>
                Matched against real admission and funding patterns — not just
                prestige rankings.
              </p>
            </div>
            <div className="step s3">
              <div className="step-n">03 —</div>
              <span className="step-icon">🎓</span>
              <h3>Get your shortlist</h3>
              <p>
                Reach, target, safety schools — each with scholarships, match%,
                and deadlines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BENTO / FEATURES SECTION */}
      <section className="section" id="features" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="s-label">What you get</div>
          <h2>Everything in one place.</h2>
          <div className="bento">
            <div className="b b1">
              <div className="b-tag">Match engine</div>
              <h3>AI admission probability</h3>
              <p>
                Your profile scored against historical admission data,
                curriculum overlap, and faculty fit — an honest probability for
                each school.
              </p>
              <div className="mini-chart">
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
              </div>
              <div className="b-accent blue">↗ Match% shown per university</div>
            </div>
            <div className="b b2">
              <div className="b-tag">Scholarship finder</div>
              <h3>Hidden funding, surfaced</h3>
              <p>
                Institutional scholarships matched to your country, field, and
                need.
              </p>
              <div className="score-ring-wrap">
                <div className="score-ring">
                  <svg viewBox="0 0 66 66">
                    <circle cx="33" cy="33" r="25" />
                    <circle className="fill" cx="33" cy="33" r="25" />
                  </svg>
                  <div className="label">75%</div>
                </div>
                <div className="score-info">
                  <div className="score-name">Scholarship chance</div>
                  <div className="score-sub">
                    Full aid priority · Your profile
                  </div>
                </div>
              </div>
              <div className="b-accent gold">
                ↗ Full vs partial awards separated
              </div>
            </div>
            <div className="b b3">
              <div className="b-tag">Deadline tracker</div>
              <h3>Never miss a date</h3>
              <p>
                Personalized countdown for every school — reminders before
                things slip.
              </p>
              <div className="b-accent green" style={{ marginTop: "16px" }}>
                ↗ Calendar export
              </div>
            </div>
            <div className="b b4">
              <div className="b-tag">Coming soon</div>
              <h3>AI Essay Reviewer</h3>
              <p>Feedback on your Common App essays before you submit.</p>
              <div className="b-accent blue" style={{ marginTop: "16px" }}>
                ↗ Early access
              </div>
            </div>
            <div className="b b5">
              <div className="b-tag">Coming soon</div>
              <h3>IELTS Advisor</h3>
              <p>Personalized study plan to hit your target band score.</p>
              <div className="b-accent gold" style={{ marginTop: "16px" }}>
                ↗ Join waitlist
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="cta-wrap" id="start">
        <div className="wrap">
          <div className="cta-box">
            <div className="badge">Free · No signup to preview</div>
            <h2>
              Your shortlist is
              <br />
              three fields away.
            </h2>
            <p>
              Built by a student tired of guessing. Designed for students
              everywhere.
            </p>
            <a href={findUrl} className="btn-light">
              Start your match
              <svg viewBox="0 0 18 18" fill="none">
                <path
                  d="M3.5 9h11M10 4.5l4.5 4.5L10 13.5"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="wrap foot">
          <div className="logo">
            <div className="logo-mark">SB</div>ScholarBridge
          </div>
          <div className="foot-right">
            <span>Built in Tashkent</span>
            <span>© 2025 ScholarBridge AI</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
