import { useState } from "react";

const COLORS = {
  forest: "#2C4A3E",
  gold: "#8B6914",
  sandstone: "#C4956A",
  cream: "#F7F3EC",
  parchment: "#EDE8DF",
  text: "#2A2A2A",
  sub: "#6B6B6B",
  border: "#D4C5A9",
  mint: "#E8F0ED",
  white: "#FFFFFF",
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=Jost:wght@300;400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Jost', sans-serif;
    background: ${COLORS.cream};
    color: ${COLORS.text};
  }

  .guide-wrap {
    max-width: 900px;
    margin: 0 auto;
    background: ${COLORS.white};
    min-height: 100vh;
  }

  /* COVER */
  .cover {
    background: ${COLORS.forest};
    padding: 80px 60px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .cover::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 30% 20%, rgba(196,149,106,0.15) 0%, transparent 60%),
                radial-gradient(ellipse at 70% 80%, rgba(139,105,20,0.1) 0%, transparent 50%);
  }
  .cover-ornament {
    font-family: 'Cormorant Garamond', serif;
    font-size: 13px;
    letter-spacing: 6px;
    color: ${COLORS.sandstone};
    text-transform: uppercase;
    margin-bottom: 32px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
  }
  .cover-ornament::before, .cover-ornament::after {
    content: '';
    height: 1px;
    width: 60px;
    background: ${COLORS.sandstone};
    opacity: 0.6;
  }
  .cover-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 72px;
    font-weight: 300;
    color: ${COLORS.cream};
    line-height: 1.05;
    letter-spacing: -1px;
    position: relative;
    margin-bottom: 8px;
  }
  .cover-title span {
    color: ${COLORS.sandstone};
    font-style: italic;
  }
  .cover-subtitle {
    font-family: 'Cormorant Garamond', serif;
    font-size: 18px;
    font-weight: 300;
    font-style: italic;
    color: rgba(247,243,236,0.7);
    margin-top: 20px;
    letter-spacing: 1px;
    position: relative;
  }
  .cover-divider {
    width: 100%;
    height: 1px;
    background: linear-gradient(to right, transparent, ${COLORS.sandstone}, transparent);
    margin: 28px 0;
    position: relative;
    opacity: 0.6;
  }
  .cover-cities {
    font-family: 'Jost', sans-serif;
    font-size: 12px;
    letter-spacing: 5px;
    color: ${COLORS.sandstone};
    text-transform: uppercase;
    position: relative;
  }

  /* NAV */
  .nav {
    background: ${COLORS.forest};
    padding: 0 40px;
    display: flex;
    align-items: center;
    gap: 0;
    border-top: 1px solid rgba(255,255,255,0.08);
    position: relative;
    z-index: 100;
  }
  .nav-item {
    position: relative;
  }
  .nav-btn {
    padding: 16px 20px;
    font-family: 'Jost', sans-serif;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: rgba(247,243,236,0.55);
    background: none;
    border: none;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    white-space: nowrap;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .nav-btn:hover { color: ${COLORS.sandstone}; }
  .nav-btn.active {
    color: ${COLORS.sandstone};
    border-bottom-color: ${COLORS.sandstone};
  }
  .nav-btn .nav-arrow {
    font-size: 8px;
    transition: transform 0.2s;
    opacity: 0.6;
  }
  .nav-item:hover .nav-arrow { transform: rotate(180deg); }
  .nav-gift-btn {
    margin-left: auto;
    padding: 8px 20px;
    font-family: 'Jost', sans-serif;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: ${COLORS.forest};
    background: ${COLORS.sandstone};
    border: none;
    border-radius: 2px;
    cursor: pointer;
    transition: background 0.2s;
    white-space: nowrap;
  }
  .nav-gift-btn:hover { background: #d4a870; }
  .nav-lock-btn {
    padding: 8px 14px;
    font-family: 'Jost', sans-serif;
    font-size: 9px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: rgba(247,243,236,0.3);
    background: none;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 2px;
    cursor: pointer;
    margin-left: 8px;
    transition: all 0.2s;
  }
  .nav-lock-btn:hover { color: rgba(247,243,236,0.6); }

  /* DROPDOWN */
  .dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    background: ${COLORS.white};
    border: 1px solid ${COLORS.border};
    border-top: 3px solid ${COLORS.sandstone};
    border-radius: 0 0 4px 4px;
    min-width: 220px;
    box-shadow: 0 8px 32px rgba(44,74,62,0.12);
    opacity: 0;
    visibility: hidden;
    transform: translateY(-8px);
    transition: all 0.2s;
    z-index: 200;
  }
  .nav-item:hover .dropdown {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
  .dropdown-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 11px 18px;
    font-family: 'Jost', sans-serif;
    font-size: 11px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: ${COLORS.text};
    cursor: pointer;
    transition: all 0.15s;
    border: none;
    background: none;
    width: 100%;
    text-align: left;
    border-bottom: 1px solid ${COLORS.border};
  }
  .dropdown-item:last-child { border-bottom: none; }
  .dropdown-item:hover {
    background: ${COLORS.parchment};
    color: ${COLORS.forest};
    padding-left: 22px;
  }
  .dropdown-item.active {
    color: ${COLORS.forest};
    font-weight: 600;
    background: ${COLORS.mint};
  }
  .dropdown-item .lock-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${COLORS.sandstone};
    opacity: 0.5;
    flex-shrink: 0;
  }
  .dropdown-divider {
    height: 1px;
    background: ${COLORS.border};
    margin: 4px 0;
  }

  @media (max-width: 640px) {
    .nav { padding: 0 16px; }
    .nav-btn { padding: 14px 12px; font-size: 10px; letter-spacing: 2px; }
    .dropdown { min-width: 180px; }
    .nav-desktop { display: none; }
    .nav-mobile { display: flex; }
  }
  @media (min-width: 641px) {
    .nav-desktop { display: flex; align-items: center; flex: 1; }
    .nav-mobile { display: none; }
  }

  /* HAMBURGER */
  .hamburger-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 16px 4px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-left: auto;
  }
  .hamburger-btn span {
    display: block;
    width: 22px;
    height: 1.5px;
    background: rgba(247,243,236,0.7);
    transition: all 0.2s;
  }
  .hamburger-btn.open span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
  .hamburger-btn.open span:nth-child(2) { opacity: 0; }
  .hamburger-btn.open span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }

  .mobile-menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: ${COLORS.forest};
    border-top: 1px solid rgba(255,255,255,0.08);
    box-shadow: 0 8px 32px rgba(0,0,0,0.2);
    z-index: 300;
    padding: 8px 0 16px;
  }
  .mobile-menu-item {
    display: block;
    width: 100%;
    padding: 14px 24px;
    font-family: 'Jost', sans-serif;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: rgba(247,243,236,0.6);
    background: none;
    border: none;
    text-align: left;
    cursor: pointer;
    transition: all 0.15s;
  }
  .mobile-menu-item:hover { color: ${COLORS.sandstone}; padding-left: 28px; }
  .mobile-menu-item.active { color: ${COLORS.sandstone}; }
  .mobile-menu-item.gift {
    color: ${COLORS.forest};
    background: ${COLORS.sandstone};
    margin: 8px 16px 4px;
    width: calc(100% - 32px);
    border-radius: 2px;
    text-align: center;
    padding: 14px 24px;
    font-weight: 600;
  }
  .mobile-menu-item.gift:hover { background: #d4a870; padding-left: 24px; }
  .mobile-menu-divider {
    height: 1px;
    background: rgba(255,255,255,0.08);
    margin: 8px 16px;
  }
  .mobile-menu-section {
    padding: 8px 24px 4px;
    font-family: 'Jost', sans-serif;
    font-size: 9px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: ${COLORS.sandstone};
    opacity: 0.7;
  }

  /* FOOTER */
  .site-footer {
    background: ${COLORS.forest};
    padding: 48px 60px;
    text-align: center;
    border-top: 3px solid ${COLORS.sandstone};
    position: relative;
    overflow: hidden;
  }
  .site-footer::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 50% 100%, rgba(196,149,106,0.1) 0%, transparent 60%);
  }
  .footer-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 32px;
    font-weight: 400;
    font-style: italic;
    color: ${COLORS.cream};
    margin-bottom: 8px;
    position: relative;
  }
  .footer-divider {
    width: 40px;
    height: 1px;
    background: ${COLORS.sandstone};
    margin: 16px auto;
    position: relative;
  }
  .footer-label {
    font-family: 'Jost', sans-serif;
    font-size: 10px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: ${COLORS.sandstone};
    margin-bottom: 8px;
    position: relative;
  }
  .footer-email {
    font-family: 'Cormorant Garamond', serif;
    font-size: 20px;
    color: ${COLORS.cream};
    text-decoration: none;
    border-bottom: 1px solid rgba(196,149,106,0.4);
    padding-bottom: 2px;
    transition: border-color 0.2s;
    position: relative;
  }
  .footer-email:hover {
    border-color: ${COLORS.sandstone};
  }
  .footer-copy {
    font-family: 'Jost', sans-serif;
    font-size: 11px;
    color: rgba(247,243,236,0.3);
    margin-top: 32px;
    letter-spacing: 1px;
    position: relative;
  }

  @media (max-width: 640px) {
    .site-footer { padding: 40px 24px; }
  }

  /* CONTENT */
  .content {
    padding: 60px 60px 80px;
  }

  /* SECTION HEADER */
  .section-eyebrow {
    font-family: 'Jost', sans-serif;
    font-size: 11px;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: ${COLORS.sandstone};
    margin-bottom: 12px;
  }
  .section-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 48px;
    font-weight: 400;
    color: ${COLORS.forest};
    line-height: 1.1;
    margin-bottom: 20px;
  }
  .section-lead {
    font-family: 'Cormorant Garamond', serif;
    font-size: 20px;
    font-weight: 400;
    font-style: italic;
    color: ${COLORS.sub};
    line-height: 1.6;
    margin-bottom: 40px;
    padding-bottom: 40px;
    border-bottom: 1px solid ${COLORS.border};
  }

  /* INFO BOX */
  .info-box {
    background: ${COLORS.mint};
    border-left: 3px solid ${COLORS.forest};
    padding: 24px 28px;
    margin: 32px 0;
    border-radius: 0 4px 4px 0;
  }
  .info-box-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 16px;
    font-weight: 600;
    color: ${COLORS.forest};
    margin-bottom: 12px;
    letter-spacing: 0.5px;
  }
  .info-box ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .info-box li {
    font-size: 14px;
    color: ${COLORS.text};
    padding-left: 16px;
    position: relative;
    line-height: 1.5;
  }
  .info-box li::before {
    content: '✦';
    position: absolute;
    left: 0;
    color: ${COLORS.sandstone};
    font-size: 9px;
    top: 3px;
  }

  /* BUDGET PACKAGES */
  .packages {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin: 32px 0;
  }
  .package {
    border: 1px solid ${COLORS.border};
    border-radius: 4px;
    overflow: hidden;
  }
  .package-header {
    padding: 20px 28px;
    display: flex;
    align-items: baseline;
    gap: 16px;
    border-bottom: 1px solid ${COLORS.border};
  }
  .pkg-$ .package-header { background: #F7F3EC; }
  .pkg-$$ .package-header { background: #EEF5F1; }
  .pkg-$$$ .package-header { background: #F0EDE4; }
  .package-tier {
    font-family: 'Cormorant Garamond', serif;
    font-size: 28px;
    font-weight: 600;
    color: ${COLORS.gold};
  }
  .package-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px;
    font-weight: 500;
    color: ${COLORS.forest};
  }
  .package-range {
    margin-left: auto;
    font-family: 'Jost', sans-serif;
    font-size: 12px;
    color: ${COLORS.sandstone};
    letter-spacing: 1px;
    font-style: italic;
  }
  .package-body {
    padding: 20px 28px;
    background: white;
  }
  .package-body ul {
    list-style: none;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px 24px;
  }
  .package-body li {
    font-size: 13.5px;
    color: ${COLORS.text};
    padding-left: 14px;
    position: relative;
    line-height: 1.5;
  }
  .package-body li::before {
    content: '—';
    position: absolute;
    left: 0;
    color: ${COLORS.sandstone};
  }

  /* SUBSECTION */
  .subsection-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 28px;
    font-weight: 500;
    color: ${COLORS.gold};
    margin: 48px 0 24px;
    padding-bottom: 12px;
    border-bottom: 1px solid ${COLORS.border};
  }

  /* VENDOR CARD */
  .vendor-grid {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 40px;
  }
  .vendor-card {
    border: 1px solid ${COLORS.border};
    border-radius: 4px;
    overflow: hidden;
    transition: box-shadow 0.2s;
  }
  .vendor-card:hover {
    box-shadow: 0 4px 20px rgba(44,74,62,0.08);
  }
  .vendor-card-header {
    padding: 16px 22px 14px;
    background: ${COLORS.parchment};
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    user-select: none;
  }
  .vendor-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px;
    font-weight: 600;
    color: ${COLORS.forest};
  }
  .vendor-right {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .vendor-tier {
    font-family: 'Jost', sans-serif;
    font-size: 13px;
    font-weight: 600;
    color: ${COLORS.gold};
    letter-spacing: 1px;
    background: rgba(139,105,20,0.1);
    padding: 3px 10px;
    border-radius: 20px;
  }
  .vendor-toggle {
    font-size: 18px;
    color: ${COLORS.sandstone};
    transition: transform 0.2s;
    line-height: 1;
  }
  .vendor-toggle.open { transform: rotate(180deg); }
  .vendor-body {
    padding: 18px 22px;
    background: white;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px 32px;
    border-top: 1px solid ${COLORS.border};
  }
  .vendor-field {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .vendor-field.full { grid-column: 1 / -1; }
  .field-label {
    font-family: 'Jost', sans-serif;
    font-size: 10px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: ${COLORS.sandstone};
    font-weight: 500;
  }
  .field-value {
    font-size: 14px;
    color: ${COLORS.text};
    line-height: 1.5;
  }
  .field-value a {
    color: ${COLORS.forest};
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  /* PENDING LIST */
  .pending {
    background: ${COLORS.parchment};
    border-radius: 4px;
    padding: 20px 24px;
    margin-top: 8px;
  }
  .pending-title {
    font-family: 'Jost', sans-serif;
    font-size: 11px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: ${COLORS.sub};
    margin-bottom: 12px;
  }
  .pending-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .pending-tag {
    font-size: 13px;
    color: ${COLORS.sub};
    background: rgba(0,0,0,0.04);
    padding: 4px 12px;
    border-radius: 20px;
    border: 1px solid ${COLORS.border};
  }

  /* CHECKLIST */
  .checklist-intro {
    font-family: 'Cormorant Garamond', serif;
    font-size: 19px;
    font-style: italic;
    color: ${COLORS.sub};
    margin-bottom: 40px;
    line-height: 1.6;
  }
  .checklist-phase {
    margin-bottom: 36px;
  }
  .phase-header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 16px;
  }
  .phase-badge {
    background: ${COLORS.forest};
    color: ${COLORS.cream};
    font-family: 'Jost', sans-serif;
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 6px 14px;
    border-radius: 2px;
    white-space: nowrap;
  }
  .phase-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 26px;
    font-weight: 500;
    color: ${COLORS.forest};
  }
  .phase-progress {
    margin-left: auto;
    font-size: 13px;
    color: ${COLORS.sandstone};
    font-family: 'Jost', sans-serif;
  }
  .check-items {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }
  .check-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 10px 14px;
    border-radius: 4px;
    border: 1px solid transparent;
    cursor: pointer;
    transition: all 0.15s;
    background: white;
    border-color: ${COLORS.border};
  }
  .check-item:hover { border-color: ${COLORS.sandstone}; }
  .check-item.done {
    background: ${COLORS.mint};
    border-color: ${COLORS.forest};
    opacity: 0.75;
  }
  .check-box {
    width: 18px;
    height: 18px;
    min-width: 18px;
    border: 2px solid ${COLORS.border};
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1px;
    transition: all 0.15s;
  }
  .check-item.done .check-box {
    background: ${COLORS.forest};
    border-color: ${COLORS.forest};
  }
  .check-mark {
    color: white;
    font-size: 11px;
    font-weight: 700;
  }
  .check-text {
    font-size: 13.5px;
    line-height: 1.4;
    color: ${COLORS.text};
  }
  .check-item.done .check-text {
    text-decoration: line-through;
    color: ${COLORS.sub};
  }
  .progress-bar-wrap {
    background: ${COLORS.parchment};
    border-radius: 2px;
    height: 4px;
    margin-bottom: 40px;
    overflow: hidden;
  }
  .progress-bar {
    height: 100%;
    background: linear-gradient(to right, ${COLORS.forest}, ${COLORS.sandstone});
    border-radius: 2px;
    transition: width 0.4s ease;
  }
  .progress-label {
    font-family: 'Jost', sans-serif;
    font-size: 12px;
    color: ${COLORS.sub};
    letter-spacing: 1px;
    margin-bottom: 8px;
    display: flex;
    justify-content: space-between;
  }

  /* COMING SOON */
  .coming-soon {
    text-align: center;
    padding: 60px 40px;
    background: ${COLORS.parchment};
    border-radius: 4px;
    border: 1px solid ${COLORS.border};
  }
  .coming-soon-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 36px;
    font-weight: 400;
    font-style: italic;
    color: ${COLORS.forest};
    margin-bottom: 16px;
  }
  .coming-soon-sub {
    font-size: 14px;
    color: ${COLORS.sub};
    line-height: 1.6;
    margin-bottom: 24px;
  }
  .coming-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;
  }
  .coming-tag {
    font-size: 12px;
    color: ${COLORS.forest};
    background: white;
    padding: 6px 14px;
    border-radius: 20px;
    border: 1px solid ${COLORS.border};
    font-family: 'Jost', sans-serif;
    letter-spacing: 0.5px;
  }

  /* LANDING PAGE */
  .landing {
    padding: 72px 60px 80px;
  }
  .landing-eyebrow {
    font-family: 'Jost', sans-serif;
    font-size: 11px;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: ${COLORS.sandstone};
    margin-bottom: 16px;
  }
  .landing-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 52px;
    font-weight: 400;
    color: ${COLORS.forest};
    line-height: 1.1;
    margin-bottom: 24px;
  }
  .landing-title em {
    font-style: italic;
    color: ${COLORS.sandstone};
  }
  .landing-body {
    font-family: 'Cormorant Garamond', serif;
    font-size: 20px;
    font-weight: 400;
    line-height: 1.75;
    color: ${COLORS.sub};
    max-width: 600px;
    margin-bottom: 48px;
  }
  .section-lead {
    font-family: 'Cormorant Garamond', serif;
    font-size: 19px;
    font-weight: 400;
    line-height: 1.6;
    color: ${COLORS.sub};
    margin-bottom: 40px;
    padding-bottom: 40px;
    border-bottom: 1px solid ${COLORS.border};
  }
  .landing-features {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 56px;
  }
  .feature-card {
    padding: 20px 22px;
    border: 1px solid ${COLORS.border};
    border-radius: 4px;
    background: ${COLORS.parchment};
  }
  .feature-icon {
    font-family: 'Cormorant Garamond', serif;
    font-size: 13px;
    font-weight: 400;
    letter-spacing: 2px;
    color: ${COLORS.sandstone};
    margin-bottom: 10px;
  }
  .feature-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 18px;
    font-weight: 600;
    color: ${COLORS.forest};
    margin-bottom: 4px;
  }
  .feature-desc {
    font-size: 13px;
    color: ${COLORS.sub};
    line-height: 1.5;
  }
  .landing-divider {
    height: 1px;
    background: linear-gradient(to right, ${COLORS.border}, transparent);
    margin: 56px 0;
  }
  .contact-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 36px;
    font-weight: 400;
    color: ${COLORS.forest};
    margin-bottom: 8px;
  }
  .contact-sub {
    font-size: 14px;
    color: ${COLORS.sub};
    margin-bottom: 32px;
    line-height: 1.6;
  }
  .contact-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 560px;
  }
  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .form-label {
    font-family: 'Jost', sans-serif;
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: ${COLORS.sandstone};
    font-weight: 500;
  }
  .form-input, .form-select, .form-textarea {
    font-family: 'Jost', sans-serif;
    font-size: 14px;
    color: ${COLORS.text};
    background: ${COLORS.white};
    border: 1px solid ${COLORS.border};
    border-radius: 3px;
    padding: 12px 14px;
    outline: none;
    transition: border-color 0.2s;
    width: 100%;
  }
  .form-input:focus, .form-select:focus, .form-textarea:focus {
    border-color: ${COLORS.sandstone};
  }
  .form-textarea {
    resize: vertical;
    min-height: 120px;
  }
  .form-select {
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23C4956A' stroke-width='1.5' fill='none'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 14px center;
    padding-right: 36px;
    cursor: pointer;
  }
  .form-btn {
    align-self: flex-start;
    background: ${COLORS.forest};
    color: ${COLORS.cream};
    font-family: 'Jost', sans-serif;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 3px;
    text-transform: uppercase;
    padding: 16px 36px;
    border: none;
    border-radius: 2px;
    cursor: pointer;
    transition: background 0.2s, transform 0.1s;
  }
  .form-btn:hover { background: #1e342a; }
  .form-btn:active { transform: scale(0.98); }
  .form-success {
    padding: 20px 24px;
    background: ${COLORS.mint};
    border: 1px solid ${COLORS.forest};
    border-radius: 4px;
    font-family: 'Cormorant Garamond', serif;
    font-size: 18px;
    color: ${COLORS.forest};
  }
  .free-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: ${COLORS.mint};
    border: 1px solid ${COLORS.forest};
    color: ${COLORS.forest};
    font-family: 'Jost', sans-serif;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 5px 12px;
    border-radius: 20px;
    margin-bottom: 20px;
  }

  /* GIFT SECTION */
  .gift-section {
    margin: 56px 0;
    padding: 48px;
    background: ${COLORS.forest};
    border-radius: 4px;
    position: relative;
    overflow: hidden;
  }
  .gift-section::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 80% 20%, rgba(196,149,106,0.15) 0%, transparent 60%);
  }
  .gift-eyebrow {
    font-family: 'Jost', sans-serif;
    font-size: 11px;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: ${COLORS.sandstone};
    margin-bottom: 12px;
    position: relative;
  }
  .gift-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 38px;
    font-weight: 400;
    color: ${COLORS.cream};
    line-height: 1.1;
    margin-bottom: 16px;
    position: relative;
  }
  .gift-title em {
    font-style: italic;
    color: ${COLORS.sandstone};
  }
  .gift-desc {
    font-family: 'Cormorant Garamond', serif;
    font-size: 18px;
    font-weight: 300;
    font-style: italic;
    color: rgba(247,243,236,0.7);
    margin-bottom: 32px;
    line-height: 1.6;
    max-width: 480px;
    position: relative;
  }
  .gift-recipients {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 32px;
    position: relative;
  }
  .gift-tag {
    font-family: 'Jost', sans-serif;
    font-size: 12px;
    color: ${COLORS.sandstone};
    border: 1px solid rgba(196,149,106,0.4);
    padding: 6px 14px;
    border-radius: 20px;
    letter-spacing: 0.5px;
  }
  .gift-buttons {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    position: relative;
  }
  .gift-btn-primary {
    background: ${COLORS.sandstone};
    color: ${COLORS.forest};
    font-family: 'Jost', sans-serif;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 3px;
    text-transform: uppercase;
    padding: 16px 32px;
    border: none;
    border-radius: 2px;
    cursor: pointer;
    transition: background 0.2s;
  }
  .gift-btn-primary:hover { background: #d4a870; }
  .gift-btn-secondary {
    background: transparent;
    color: ${COLORS.cream};
    font-family: 'Jost', sans-serif;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 3px;
    text-transform: uppercase;
    padding: 16px 32px;
    border: 1px solid rgba(247,243,236,0.3);
    border-radius: 2px;
    cursor: pointer;
    transition: all 0.2s;
  }
  .gift-btn-secondary:hover { border-color: rgba(247,243,236,0.7); }

  /* GIFT MODAL */
  .gift-modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(44,74,62,0.92);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
    padding: 24px;
  }
  .gift-modal {
    background: ${COLORS.white};
    border-radius: 4px;
    padding: 48px;
    max-width: 520px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
  }
  .gift-modal-eyebrow {
    font-family: 'Jost', sans-serif;
    font-size: 11px;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: ${COLORS.sandstone};
    margin-bottom: 12px;
  }
  .gift-modal-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 34px;
    font-weight: 400;
    color: ${COLORS.forest};
    margin-bottom: 8px;
    line-height: 1.1;
  }
  .gift-modal-sub {
    font-family: 'Cormorant Garamond', serif;
    font-size: 17px;
    font-style: italic;
    color: ${COLORS.sub};
    margin-bottom: 32px;
    line-height: 1.6;
  }
  .gift-tier-select {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 24px;
  }
  .gift-tier-option {
    border: 2px solid ${COLORS.border};
    border-radius: 4px;
    padding: 16px;
    cursor: pointer;
    transition: all 0.15s;
    text-align: center;
  }
  .gift-tier-option:hover { border-color: ${COLORS.sandstone}; }
  .gift-tier-option.selected { border-color: ${COLORS.forest}; background: ${COLORS.mint}; }
  .gift-tier-price {
    font-family: 'Cormorant Garamond', serif;
    font-size: 28px;
    font-weight: 600;
    color: ${COLORS.forest};
    margin-bottom: 4px;
  }
  .gift-tier-name {
    font-family: 'Jost', sans-serif;
    font-size: 10px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: ${COLORS.sandstone};
    margin-bottom: 6px;
  }
  .gift-tier-desc {
    font-size: 12px;
    color: ${COLORS.sub};
    line-height: 1.4;
  }
  .gift-modal-close {
    position: absolute;
    top: 16px;
    right: 20px;
    background: none;
    border: none;
    font-size: 24px;
    color: ${COLORS.sub};
    cursor: pointer;
    line-height: 1;
  }
  .gift-success {
    text-align: center;
    padding: 20px 0;
  }
  .gift-success-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 32px;
    font-weight: 400;
    color: ${COLORS.forest};
    margin-bottom: 12px;
  }
  .gift-success-sub {
    font-family: 'Cormorant Garamond', serif;
    font-size: 17px;
    font-style: italic;
    color: ${COLORS.sub};
    line-height: 1.6;
    margin-bottom: 24px;
  }
  .gift-card-preview {
    background: ${COLORS.forest};
    border-radius: 4px;
    padding: 32px;
    margin: 24px 0;
    text-align: center;
  }
  .gift-card-to {
    font-family: 'Jost', sans-serif;
    font-size: 10px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: ${COLORS.sandstone};
    margin-bottom: 8px;
  }
  .gift-card-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 28px;
    color: ${COLORS.cream};
    margin-bottom: 16px;
  }
  .gift-card-message {
    font-family: 'Cormorant Garamond', serif;
    font-size: 16px;
    font-style: italic;
    color: rgba(247,243,236,0.7);
    line-height: 1.6;
    margin-bottom: 20px;
  }
  .gift-card-divider {
    height: 1px;
    background: rgba(196,149,106,0.3);
    margin: 16px 0;
  }
  .gift-card-password {
    font-family: 'Jost', sans-serif;
    font-size: 11px;
    letter-spacing: 3px;
    color: ${COLORS.sandstone};
    margin-bottom: 4px;
  }
  .gift-card-password-value {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px;
    color: ${COLORS.cream};
    letter-spacing: 4px;
  }

  .lock-screen {
    text-align: center;
    padding: 80px 40px;
  }
  .lock-icon {
    font-size: 40px;
    margin-bottom: 24px;
  }
  .lock-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 40px;
    font-weight: 400;
    color: ${COLORS.forest};
    margin-bottom: 16px;
  }
  .lock-sub {
    font-family: 'Cormorant Garamond', serif;
    font-size: 18px;
    font-style: italic;
    color: ${COLORS.sub};
    max-width: 420px;
    margin: 0 auto 36px;
    line-height: 1.6;
  }
  .lock-features {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
    margin-bottom: 40px;
  }
  .lock-feature-tag {
    font-size: 13px;
    color: ${COLORS.forest};
    background: ${COLORS.parchment};
    border: 1px solid ${COLORS.border};
    padding: 6px 16px;
    border-radius: 20px;
    font-family: 'Jost', sans-serif;
  }
  .lock-tiers {
    display: flex;
    gap: 16px;
    justify-content: center;
    margin-bottom: 40px;
    flex-wrap: wrap;
  }
  .lock-tier {
    border: 1px solid ${COLORS.border};
    border-radius: 4px;
    padding: 20px 28px;
    background: ${COLORS.white};
    min-width: 180px;
    text-align: center;
  }
  .lock-tier-price {
    font-family: 'Cormorant Garamond', serif;
    font-size: 36px;
    font-weight: 600;
    color: ${COLORS.forest};
    margin-bottom: 4px;
  }
  .lock-tier-name {
    font-family: 'Jost', sans-serif;
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: ${COLORS.sandstone};
    margin-bottom: 12px;
  }
  .lock-tier-desc {
    font-size: 13px;
    color: ${COLORS.sub};
    line-height: 1.5;
  }
  .lock-btn {
    display: inline-block;
    background: ${COLORS.forest};
    color: ${COLORS.cream};
    font-family: 'Jost', sans-serif;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 3px;
    text-transform: uppercase;
    padding: 18px 48px;
    border: none;
    border-radius: 2px;
    cursor: pointer;
    transition: background 0.2s;
    text-decoration: none;
  }
  .lock-btn:hover { background: #1e342a; }
  .lock-note {
    margin-top: 16px;
    font-size: 13px;
    color: ${COLORS.sub};
    font-style: italic;
  }

  @media (max-width: 640px) {
    .landing { padding: 40px 24px 60px; }
    .landing-title { font-size: 38px; }
    .landing-features { grid-template-columns: 1fr; }
    .form-row { grid-template-columns: 1fr; }
    .content { padding: 40px 24px 60px; }
    .cover { padding: 60px 24px; }
    .cover-title { font-size: 48px; }
    .package-body ul { grid-template-columns: 1fr; }
    .vendor-body { grid-template-columns: 1fr; }
    .check-items { grid-template-columns: 1fr; }
    .nav { padding: 0 16px; }
    .lock-tiers { flex-direction: column; align-items: center; }
  }
`;

// ── DATA ────────────────────────────────────────────────────────────────────

const checklistData = [
  {
    phase: "12+ Months Before",
    badge: "Start Here",
    items: [
      "Set your overall wedding budget",
      "Choose your wedding date",
      "Decide on guest list size",
      "Agree on overall vision and style",
      "Research and book your venue",
      "Book your photographer",
      "Book your videographer",
      "Start researching wedding planners (if desired)",
      "Announce your engagement",
      "Create a wedding website",
    ],
  },
  {
    phase: "9–12 Months Before",
    badge: "Building the Team",
    items: [
      "Book your caterer",
      "Book your florist",
      "Start wedding dress shopping",
      "Book your officiant",
      "Book your band or DJ",
      "Book your audio/visual & sound team",
      "Book your hair & makeup artists",
      "Send save the dates",
      "Book accommodation room blocks for guests",
      "Start planning your honeymoon",
    ],
  },
  {
    phase: "6–9 Months Before",
    badge: "Details",
    items: [
      "Order your wedding dress",
      "Book suits and groomswear",
      "Design and order invitations",
      "Book transportation (limo, shuttle etc.)",
      "Book wedding cake or dessert table",
      "Book mobile bar service",
      "Plan your rehearsal dinner",
      "Register for gifts",
      "Apply for Banff National Park permit (if applicable)",
      "Obtain AGLC Special Event Licence (if applicable)",
    ],
  },
  {
    phase: "3–6 Months Before",
    badge: "Getting Real",
    items: [
      "Send formal invitations",
      "Schedule dress fittings",
      "Plan ceremony music and readings",
      "Finalize menu with caterer",
      "Book florist consultation and finalize design",
      "Schedule cake tasting",
      "Plan rehearsal schedule",
      "Arrange travel for out-of-town guests",
      "Book hair and makeup trial",
      "Choose wedding party gifts",
    ],
  },
  {
    phase: "1–3 Months Before",
    badge: "Final Stretch",
    items: [
      "Follow up on RSVPs",
      "Confirm all vendor bookings",
      "Finalize seating chart",
      "Final dress fitting",
      "Create wedding day timeline",
      "Confirm ceremony details with officiant",
      "Break in your wedding shoes",
      "Pick up marriage licence",
      "Prepare vendor payments and tips",
      "Write your vows",
    ],
  },
  {
    phase: "Week Of",
    badge: "Almost There!",
    items: [
      "Confirm all vendors one final time",
      "Deliver decor and items to venue",
      "Attend rehearsal dinner",
      "Delegate day-of tasks to wedding party",
      "Prepare emergency kit (safety pins, pain relief, etc.)",
      "Give rings to best person for safekeeping",
      "Get a good sleep the night before",
      "Eat breakfast on your wedding day",
      "Take a deep breath — you've got this!",
      "Enjoy every single moment",
    ],
  },
];

const venueData = [
  {
    sub: "Hotel & Ballroom",
    vendors: [
      {
        name: "The Fairmont Palliser",
        tier: "$$$",
        fields: [
          { label: "Pricing", value: "$5,650–$27,800 venue + $125–$157+ per person catering" },
          { label: "Capacity", value: "Up to 450 guests" },
          { label: "Catering", value: "In-house" },
          { label: "Ceremony", value: "Indoor" },
          { label: "Parking", value: "Yes" },
          { label: "Vendor List", value: "Provided to booked couples" },
          { label: "Instagram", value: "@fairmontpalliser" },
          { label: "Website", value: "fairmont.com", link: "https://www.fairmont.com/en/hotels/calgary/fairmont-palliser/weddings.html" },
        ],
      },
      {
        name: "Hotel Arts",
        tier: "$$$",
        fields: [
          { label: "Pricing", value: "From $4,500 smaller groups; up to $90/person larger events" },
          { label: "Capacity", value: "50–1,000 guests" },
          { label: "Catering", value: "In-house; all-inclusive packages available" },
          { label: "Ceremony", value: "Indoor" },
          { label: "Parking", value: "Yes" },
          { label: "Website", value: "hotelarts.ca/weddings", link: "https://hotelarts.ca/weddings" },
        ],
      },
      {
        name: "Calgary Marriott Downtown",
        tier: "$$$",
        fields: [
          { label: "Pricing", value: "$150–$300 per guest (catering, drinks & venue)" },
          { label: "Capacity", value: "50–360 guests" },
          { label: "Catering", value: "In-house" },
          { label: "Ceremony", value: "Indoor" },
          { label: "Parking", value: "Yes" },
          { label: "Vendor List", value: "Jenny Jean Photography, Calyx Floral Design, SWIRL Custom Cakes", full: true },
          { label: "Instagram", value: "@calgarymarriott" },
          { label: "Website", value: "marriott.com", link: "https://www.marriott.com/en-us/hotels/yycdt-calgary-marriott-downtown-hotel/events/" },
        ],
      },
    ],
  },
  {
    sub: "Unique & Character Spaces",
    vendors: [
      {
        name: "The Bow Valley Ranche Restaurant",
        tier: "$/$$",
        fields: [
          { label: "Pricing", value: "$650–$26,000 per event; $150–$300 per guest" },
          { label: "Capacity", value: "Up to 150–175 guests" },
          { label: "Catering", value: "In-house" },
          { label: "Ceremony", value: "Outdoor lawn/garden, verandah & historic indoor rooms" },
          { label: "Parking", value: "Yes" },
          { label: "Note", value: "Heritage building inside Fish Creek Provincial Park", full: true },
          { label: "Instagram", value: "@bowvalleyrancherestaurant" },
          { label: "Website", value: "bvrrestaurant.com", link: "https://bvrrestaurant.com/weddings/" },
        ],
      },
      {
        name: "Spruce Meadows",
        tier: "$$",
        fields: [
          { label: "Pricing", value: "$6,500–$8,500 venue + catering; ceremony $1,500 additional" },
          { label: "Capacity", value: "120–150 guests across two main venues" },
          { label: "Catering", value: "In-house" },
          { label: "Ceremony", value: "Indoor and outdoor" },
          { label: "Parking", value: "Yes" },
          { label: "AV", value: "Encore for audiovisual services" },
          { label: "Instagram", value: "@spruce_meadows" },
          { label: "Website", value: "sprucemeadows.com", link: "https://www.sprucemeadows.com/index.jsp" },
        ],
      },
      {
        name: "Arts Commons",
        tier: "$/$$",
        fields: [
          { label: "Pricing", value: "$2,000–$4,500 smaller groups; $150–$300 per guest larger" },
          { label: "Capacity", value: "150 seated / 200 cocktail reception" },
          { label: "Catering", value: "On-site or outside caterers permitted" },
          { label: "Ceremony", value: "Indoor" },
          { label: "Parking", value: "Multiple parkades nearby" },
          { label: "Note", value: "Confirm vendors know downtown Calgary loading logistics", full: true },
          { label: "Instagram", value: "@thecommonsyyc" },
          { label: "Website", value: "thecommonscalgary.com", link: "https://thecommonscalgary.com/weddings" },
        ],
      },
      {
        name: "Fortuna's Row",
        tier: "$/$$",
        fields: [
          { label: "Pricing", value: "$5,000–$42,000 depending on room and guest count" },
          { label: "Capacity", value: "Up to 150 guests; SRO space seats 50 for seated dinner" },
          { label: "Catering", value: "In-house — unique Latin American cuisine" },
          { label: "Ceremony", value: "Indoor and outdoor" },
          { label: "Parking", value: "Pay parking nearby" },
          { label: "AV", value: "2 speakers ($250) + 1 TV ($75) — credited to minimum spend" },
          { label: "Note", value: "External wedding planner required; venue access from 12:00 PM", full: true },
          { label: "Instagram", value: "@fortunas.row" },
          { label: "Website", value: "fortunasrow.com", link: "https://fortunasrow.com/pages/weddings" },
        ],
      },
    ],
  },
  {
    sub: "Restaurant Venues (Teatro Group)",
    note: "Teatro Restaurant, Cucina Market Bistro, and Alforno Eau Claire are all part of the Teatro Group — find all three at @teatrogroupweddings",
    vendors: [
      {
        name: "Teatro Restaurant",
        tier: "$/$$",
        fields: [
          { label: "Pricing", value: "$1,500–$22,000 minimum spend" },
          { label: "Capacity", value: "Opera Room: 50 seated/100 cocktail; Main Room: 120 seated/200 cocktail" },
          { label: "Catering", value: "In-house only" },
          { label: "Ceremony", value: "Indoor, up to 120 guests" },
          { label: "Parking", value: "Accessible; no on-site parking" },
          { label: "Instagram", value: "@teatrorestaurant / @teatrogroupweddings" },
          { label: "Website", value: "teatro.ca/weddings", link: "https://teatro.ca/weddings/" },
        ],
      },
      {
        name: "Cucina Market Bistro",
        tier: "$",
        fields: [
          { label: "Pricing", value: "$1,500–$4,500 minimum spend" },
          { label: "Capacity", value: "50 seated / 75 cocktail" },
          { label: "Catering", value: "In-house only" },
          { label: "Ceremony", value: "Indoor, limited capacity" },
          { label: "Parking", value: "Yes, within building. Fully accessible." },
          { label: "Instagram", value: "@cucinamarketbistro / @teatrogroupweddings" },
          { label: "Website", value: "cucinamarketbistro.ca", link: "https://www.cucinamarketbistro.ca/weddings/" },
        ],
      },
      {
        name: "Alforno Eau Claire",
        tier: "$",
        fields: [
          { label: "Pricing", value: "$1,250–$9,000 minimum spend" },
          { label: "Capacity", value: "60 seated / 120 cocktail" },
          { label: "Catering", value: "In-house only" },
          { label: "Ceremony", value: "Indoor, up to 40 guests" },
          { label: "Parking", value: "Accessible; no on-site parking" },
          { label: "Instagram", value: "@alfornoyyc / @teatrogroupweddings" },
          { label: "Website", value: "alforno.ca - Private Events PDF", link: "https://alforno.ca/wp-content/uploads/2026/01/Alforno-Private-Events-2025.pdf" },
        ],
      },
      {
        name: "Rouge",
        tier: "$/$$",
        fields: [
          { label: "Pricing", value: "Minimum spend based on guest count; $500 booking fee for select spaces" },
          { label: "Capacity", value: "14–116 guests depending on space" },
          { label: "Catering", value: "In-house" },
          { label: "Ceremony", value: "Indoor and outdoor" },
          { label: "Parking", value: "Yes" },
          { label: "Instagram", value: "@rougerestaurant" },
          { label: "Website", value: "rougecalgary.com", link: "https://rougecalgary.com/weddings/" },
        ],
      },
    ],
  },
  {
    sub: "Rustic & Garden",
    vendors: [
      {
        name: "Willow Lane Barn",
        tier: "$$",
        fields: [
          { label: "Pricing", value: "$30,000–$42,000 average; $150–$300 per guest" },
          { label: "Capacity", value: "Up to 225 (includes vendors, guests & bridal party)" },
          { label: "Catering", value: "No restrictions — bring your own caterer" },
          { label: "Ceremony", value: "Indoor and outdoor (field or barn backdrop)" },
          { label: "Parking", value: "Yes" },
          { label: "Packages", value: '"Barn and Blooms" (includes florals) or DIY option' },
          { label: "Amenities", value: "Commercial kitchen, cocktail gazebo, loft space" },
          { label: "Instagram", value: "@willowlanebarn" },
          { label: "Website", value: "willowlanebarn.com", link: "https://www.willowlanebarn.com" },
        ],
      },
      {
        name: "Meadow Muse",
        tier: "$/$$",
        fields: [
          { label: "Pricing", value: "$2,500–$5,000 venue + $150–$300 per guest" },
          { label: "Capacity", value: "150 seated / 175 cocktail standing" },
          { label: "Catering", value: "Great Events Catering (preferred partner)" },
          { label: "Ceremony", value: "Indoor and outdoor" },
          { label: "Parking", value: "300 spots" },
          { label: "Instagram", value: "@meadowmuseyyc" },
          { label: "Website", value: "meadowmuse.ca", link: "https://meadowmuse.ca" },
        ],
      },
      {
        name: "Pine and Pond",
        tier: "$/$$",
        fields: [
          { label: "Pricing", value: "Venue packages from $5,000–$13,000" },
          { label: "Capacity", value: "No minimum; up to 200 guests" },
          { label: "Catering", value: "No in-house — recommended list provided; outside vendors welcome" },
          { label: "Ceremony", value: "Indoor and outdoor" },
          { label: "Parking", value: "Yes, accessible" },
          { label: "Instagram", value: "@pine.and.pond" },
          { label: "Website", value: "pineandpond.com", link: "https://www.pineandpond.com" },
        ],
      },
    ],
  },
  {
    sub: "Large Capacity",
    vendors: [
      {
        name: "SAIT",
        tier: "$/$$$",
        fields: [
          { label: "Pricing", value: "$150–$300 per guest" },
          { label: "Capacity", value: "Small gatherings to 1,000+ guests" },
          { label: "Catering", value: "Exclusive: Curated Catering by Hotel Arts" },
          { label: "Ceremony", value: "Indoor and outdoor" },
          { label: "Parking", value: "Yes, accessible" },
          { label: "AV", value: "In-house audio-visual and bar services" },
          { label: "Instagram", value: "@sait" },
          { label: "Website", value: "sait.ca/weddings", link: "https://www.sait.ca/about-sait/event-venues-and-catering/weddings" },
        ],
      },
      {
        name: "The Heritage Centre",
        tier: "$/$$$",
        fields: [
          { label: "Pricing", value: "See website; seasonal discounts available" },
          { label: "Capacity", value: "50–683 guests" },
          { label: "Catering", value: "Outside catering required" },
          { label: "Ceremony", value: "Indoor and outdoor" },
          { label: "Parking", value: "Yes, accessible" },
          { label: "Vendor List", value: "Comprehensive recommended vendor list on website" },
          { label: "Instagram", value: "@mvetheheritagecentre" },
          { label: "Website", value: "mvetheheritagecentre.com", link: "https://mvetheheritagecentre.com/pricing-promotions-alberta-venue/" },
        ],
      },
    ],
  },
  {
    sub: "Also Worth Exploring",
    plain: [
      { name: "The Baron", tier: "$", note: "Modern industrial hall, 130–150 guests, in-house catering, full AV included", url: "thebaroncalgary.ca", ig: "@thebaron.yyc" },
      { name: "52 North Venue", tier: "$$", note: "Indoor/outdoor, up to 200 guests, BYOB with Roadpop Event Co. bar, from $9,500", url: "52northvenue.ca", ig: "@52northvenue" },
      { name: "The Lake House", tier: "$$", note: "Well-known Calgary venue on the reservoir", url: "lakehousecalgary.com", ig: "@thelakehouseyyc" },
    ],
  },
  {
    sub: "Canmore Venues",
    location: "Canmore",
    vendors: [
      {
        name: "Cornerstone Weddings — The Gem & Mainspace",
        tier: "$/$$",
        fields: [
          { label: "Pricing", value: "Varies by season, day of week, and minimum spend — packages available including planning, florals, photography, dining, entertainment & transport. Enquire for details." },
          { label: "Capacity", value: "The Gem: up to 200 total (100 upper / 150 lower); Mainspace: up to 80; both customizable from as few as 15 guests" },
          { label: "Catering", value: "Preferred caterer list provided; outside catering permitted at The Gem with signed waiver (commercial kitchen fee may apply)" },
          { label: "Ceremony", value: "Indoor venues; The Collective team also plans outdoor, elopement, heli, and hiking weddings across the Rockies" },
          { label: "Parking", value: "Available at both locations; fully accessible with elevators and disabled parking at The Gem" },
          { label: "Extras", value: "Part of The Collective — in-house photography, videography, florals, decor, DJ, transportation, accommodation & coordination all available" },
          { label: "Vendor List", value: "Yes — planning guides and resources provided" },
          { label: "Instagram", value: "@thegem.ca / @mainspace_canmore / @wearethecollective.ca" },
          { label: "Website", value: "thegem.ca / mainspacecanmore.ca / wearethecollective.ca", link: "https://weddingswithcornerstone.com" },
        ],
      },
      {
        name: "Creekside Villa",
        tier: "$$",
        fields: [
          { label: "Pricing", value: "Low season from $13,860; peak season Saturday from $17,451 (includes service fees and GST)" },
          { label: "Capacity", value: "25–90 guests" },
          { label: "Catering", value: "In-house only; external certified bakeries permitted for wedding cakes and small desserts" },
          { label: "Ceremony", value: "Indoor and outdoor (low season); outdoor Ceremony Tent only in peak season" },
          { label: "Parking", value: "Large parking lot; accessible to outdoor ceremony tent and reception space" },
          { label: "Vendor List", value: "Provided after contract is signed" },
          { label: "Instagram", value: "@creeksidevillacanmore" },
          { label: "Website", value: "creeksidevilla.ca", link: "https://www.creeksidevilla.ca" },
        ],
      },
      {
        name: "The Sensory",
        tier: "$$",
        fields: [
          { label: "Style", value: "Event space and restaurant in the heart of Canmore — intimate and distinctive" },
          { label: "Instagram", value: "@thesensorycanmore" },
          { label: "Website", value: "thesensory.ca", link: "https://www.thesensory.ca/sensorysupperseries" },
        ],
      },
      {
        name: "Stewart Creek Golf & Country Club",
        tier: "$$",
        fields: [
          { label: "Style", value: "Stunning mountain golf club setting with a dramatic Rockies backdrop" },
          { label: "Website", value: "stewartcreekgolf.com", link: "https://stewartcreekgolf.com" },
        ],
      },
      {
        name: "A Bear and Bison Inn",
        tier: "$$",
        fields: [
          { label: "Style", value: "Intimate and charming inn — beautiful setting for small weddings and elopements in Canmore" },
          { label: "Instagram", value: "@bearandbisoninn" },
          { label: "Website", value: "abearandbisoninn.com", link: "https://abearandbisoninn.com" },
        ],
      },
    ],
  },
  {
    sub: "Banff Venues",
    location: "Banff",
    note: "Weddings in Banff National Park require a Parks Canada permit. Most venues have experience navigating this process and can guide you through it.",
    vendors: [
      {
        name: "The Kenrick Hotel & The Fat Ox",
        tier: "$/$$",
        fields: [
          { label: "Capacity", value: "The Arrowwood Room: up to 75 seated / 120 standing (no F&B minimum); The Fat Ox Restaurant: up to 90 seated / 120 standing" },
          { label: "Catering", value: "The Fat Ox restaurant exclusively caters The Arrowwood Room" },
          { label: "Ceremony", value: "Indoor and outdoor (weather permitting)" },
          { label: "Parking", value: "On-site above and underground parking" },
          { label: "Vendor List", value: "Available on request" },
          { label: "Email", value: "info@thekenrickhotel.com / info@fatoxbanff.ca" },
          { label: "Instagram", value: "@thekenrickhotel / @fatoxbanff" },
          { label: "Website", value: "thekenrickhotel.com", link: "https://thekenrickhotel.com/rooms/event-spaces/" },
        ],
      },
      {
        name: "The Gem Events Centre",
        tier: "$$",
        fields: [
          { label: "Style", value: "Stunning events centre in the heart of Banff — part of the Rocky Mountain Wedding Collective" },
          { label: "Email", value: "thegem@rmwc.ca" },
          { label: "Instagram", value: "@thegem.ca" },
          { label: "Website", value: "thegem.ca", link: "https://thegem.ca" },
        ],
      },
      {
        name: "Fairmont Banff Springs",
        tier: "$$$",
        fields: [
          { label: "Style", value: "Iconic castle hotel set against the Rockies — one of the most legendary wedding venues in Canada" },
          { label: "Email", value: "bshweddings@fairmont.com" },
          { label: "Instagram", value: "@fairmontbanff" },
          { label: "Website", value: "banff-springs-hotel.com", link: "https://www.banff-springs-hotel.com/gather/weddings/" },
        ],
      },
      {
        name: "The Rimrock Resort Hotel",
        tier: "$$$",
        fields: [
          { label: "Style", value: "Luxurious mountain resort perched above Banff with breathtaking valley views" },
          { label: "Email", value: "info@rimrockresort.com" },
          { label: "Instagram", value: "@rimrockbanff" },
          { label: "Website", value: "emblemscollection.com/rimrock-banff", link: "https://www.emblemscollection.com/rimrock-banff/weddings/" },
        ],
      },
      {
        name: "Buffalo Mountain Lodge",
        tier: "$$$",
        fields: [
          { label: "Style", value: "Rustic luxury lodge nestled in the forest above Banff — warm, intimate, and distinctly mountain" },
          { label: "Email", value: "info@crmr.com" },
          { label: "Instagram", value: "@crmresorts" },
          { label: "Website", value: "crmr.com/buffalo-mountain", link: "https://crmr.com/resorts/buffalo-mountain/weddings/" },
        ],
      },
      {
        name: "Banff Caribou Lodge & Spa",
        tier: "$$",
        fields: [
          { label: "Style", value: "Classic Banff lodge with a warm, welcoming atmosphere — great for mid-size celebrations" },
          { label: "Email", value: "events@banfflodgingco.com" },
          { label: "Website", value: "banffcariboulodge.com", link: "https://banffcariboulodge.com/meetings/" },
        ],
      },
      {
        name: "The Maple Leaf Grill",
        tier: "$/$$",
        fields: [
          { label: "Style", value: "Beloved Banff restaurant — part of the Banff Hospitality Collective, known for steak and seafood" },
          { label: "Instagram", value: "@banffhospitalitycollective" },
          { label: "Website", value: "banffcollective.com", link: "https://www.banffcollective.com/restaurant/maple-leaf-steak-seafood" },
        ],
      },
      {
        name: "Banff Gondola — Sky Bistro",
        tier: "$$",
        fields: [
          { label: "Style", value: "Truly one-of-a-kind — ceremony and reception at the summit of Sulphur Mountain with 360-degree Rockies views" },
          { label: "Email", value: "admin@gondolabanff.com" },
          { label: "Website", value: "gondolabanff.com", link: "https://gondolabanff.com/The-Banff-Gondola-Sky-Bistro.html" },
        ],
      },
      {
        name: "The Fenlands Banff Recreation Centre",
        tier: "$",
        fields: [
          { label: "Style", value: "Affordable and flexible venue option in Banff — great for larger guest counts on a tighter budget" },
          { label: "Email", value: "rentals@banff.ca" },
          { label: "Website", value: "banff.ca/weddings", link: "https://banff.ca/666/Weddings" },
        ],
      },
    ],
  },
];

const churchData = [
  {
    name: "Knox United Church",
    desc: "A stunning downtown landmark with soaring ceilings, a magnificent pipe organ, and beautiful stained glass windows. With a capacity of 654 guests, it's one of Calgary's grandest ceremony settings.",
    url: "kxcalgary.com",
    link: "https://www.kxcalgary.com",
  },
  {
    name: "St. Martin's Church",
    desc: "Tucked inside Heritage Park, this charming country church offers a timeless rustic setting that feels worlds away from the city. Perfect for couples who want a traditional ceremony with character and history.",
    url: "stmartinschurch.ca",
    link: "https://stmartinschurch.ca",
  },
  {
    name: "Hillhurst United Church",
    desc: "A warm and welcoming church in the heart of Hillhurst, proudly affirming and open to all couples regardless of background or identity. A beautiful choice for inclusive celebrations.",
    url: "hillhurstunited.com",
    link: "https://hillhurstunited.com",
  },
  {
    name: "Cathedral Church of the Redeemer",
    desc: "A breathtaking downtown cathedral steps from Olympic Plaza. Offers the intimate Lady Chapel for smaller ceremonies or the grand main Cathedral for larger gatherings — two beautiful options under one roof.",
    url: "anglicancathedralcalgary.ca",
    link: "https://www.anglicancathedralcalgary.ca",
  },
  {
    name: "Robert McClure United Church",
    desc: "An inclusive and welcoming congregation that opens its doors to couples of all genders, faiths, and backgrounds. A meaningful space for couples seeking a spiritual ceremony without boundaries.",
    url: "robertmcclurechurch.org",
    link: "https://robertmcclurechurch.org",
  },
  {
    name: "Commons Church",
    desc: "A modern and vibrant church community with a warm, contemporary feel. Ideal for couples who want the meaning of a church ceremony with a fresh, welcoming atmosphere.",
    url: "commons.church",
    link: "https://www.commons.church",
  },
  {
    name: "The Chapel Company",
    desc: "A beautiful standalone chapel nestled in Water Valley, approximately 45 minutes from Calgary. Bright, intimate, and utterly charming — worth the drive for something truly unique.",
    url: "thechapelcompany.com",
    link: "https://www.thechapelcompany.com",
  },
];

const cateringData = [
  { name: "Curated Catering by Hotel Arts", tier: "$$$", fields: [
    { label: "Style", value: "Exclusive caterer at SAIT — gourmet multi-course menus, bold flavours, artful presentation" },
    { label: "Phone", value: "403-210-5774" },
    { label: "Website", value: "curatedcatering.ca", link: "https://www.sait.ca/about-sait/campus/dining-on-campus/curated-catering" },
  ]},
  { name: "Alpine Catering", tier: "$/$$", fields: [
    { label: "Style", value: "Buffet and sit-down service; hot & cold food, hors d&apos;oeuvres" },
    { label: "Extras", value: "China, cutlery, wine glasses, linen serviettes, chair covers available" },
    { label: "Note", value: "Bartender service available on request" },
    { label: "Phone", value: "403-279-6664" },
    { label: "Instagram", value: "@alpinecatering" },
    { label: "Website", value: "alpinecatering.ca", link: "https://www.alpinecatering.ca/" },
  ]},
  { name: "HT Catering & Meats", tier: "$/$$", fields: [
    { label: "Style", value: "Customizable packages, wide menu selection, professional serving team on-site" },
    { label: "Includes", value: "Signage, cutlery, and plates in all wedding packages" },
    { label: "Phone", value: "403-963-2107" },
    { label: "Instagram", value: "@htcatering_meats" },
    { label: "Website", value: "htcatering.ca", link: "https://www.htcatering.ca/" },
  ]},
  { name: "Rocky Mountain BBQ", tier: "$", fields: [
    { label: "Style", value: "Fresh on-site BBQ — mobile, fully self-sustainable units" },
    { label: "Includes", value: "Serving tables, own power and water — completely self-contained" },
    { label: "Best For", value: "Outdoor and rustic venue weddings, casual celebrations" },
    { label: "Phone", value: "403-651-9926" },
    { label: "Instagram", value: "@rockymountainbbqcatering" },
    { label: "Website", value: "rockymountainbbq.ca", link: "https://rockymountainbbq.ca/" },
  ]},
  { name: "Visionary Catering", tier: "$$", fields: [
    { label: "Style", value: "Flexible custom menus, advanced culinary skill, fresh locally sourced ingredients" },
    { label: "Phone", value: "403-264-7447" },
    { label: "Website", value: "visionarycatering.com", link: "https://www.visionarycatering.com/" },
  ]},
  { name: "Urbane Culinary", tier: "$$", fields: [
    { label: "Style", value: "Elevated hospitality — tailored menu planning, delivery, and full service" },
    { label: "Phone", value: "403-561-6478" },
    { label: "Email", value: "catering@urbaneculinary.ca" },
    { label: "Instagram", value: "@urbaneculinary" },
    { label: "Website", value: "urbaneculinary.ca", link: "https://urbaneculinary.ca" },
  ]},
  { name: "Devour Catering", tier: "$$/$$$ ", fields: [
    { label: "Style", value: "Full-service catering; can also serve as full wedding planner" },
    { label: "Extras", value: "Complimentary consultation; custom seasonal menus" },
    { label: "Phone", value: "403-242-0046" },
    { label: "Email", value: "devour@devourcatering.com" },
    { label: "Instagram", value: "@devourcateringyyc" },
    { label: "Website", value: "devourcatering.com", link: "https://devourcatering.com/events/weddings/" },
  ]},
  { name: "Black Salt Catering", tier: "$$", fields: [
    { label: "Style", value: "Customized creative menus; full-service, stress-free execution" },
    { label: "Phone", value: "587-353-3100" },
    { label: "Email", value: "info@blacksaltbistro.ca" },
    { label: "Instagram", value: "@blacksalt.calgary" },
    { label: "Website", value: "blacksaltbistro.ca", link: "https://blacksaltbistro.ca" },
  ]},
  { name: "Food Works Craft Catering", tier: "$$/$$$ ", fields: [
    { label: "Experience", value: "200+ weddings; serves Calgary, Central Alberta, and Western Canada" },
    { label: "Extras", value: "Complimentary tasting, full staffing, ProServe bar, vendor introductions" },
    { label: "Phone", value: "403-804-7775" },
    { label: "Instagram", value: "@foodworksyyc" },
    { label: "Website", value: "food-works.ca", link: "https://www.food-works.ca" },
  ]},
];

const barData = [
  { name: "Black Tie & Bourbon Events", tier: "$/$$", fields: [
    { label: "Setup", value: "Two mobile bars available; staffing-only option also offered" },
    { label: "Pricing", value: "Customized packages to accommodate all budgets" },
    { label: "Alcohol", value: "Can supply alcohol OR work with client-supplied alcohol" },
    { label: "Cocktails", value: "Wide variety of signature cocktails available" },
    { label: "Mocktails", value: "Yes — wide variety of mocktails and dirty sodas available" },
    { label: "Guest Count", value: "No minimum or maximum — 500+ bartenders on roster" },
    { label: "AGLC", value: "Can handle the liquor licence or guide couples through the process themselves" },
    { label: "Licensed & Insured", value: "Yes" },
    { label: "Instagram", value: "@blacktieandbourbonevents" },
  ]},
  { name: "In the Mix Bartending", tier: "$/$$", fields: [
    { label: "Setup", value: "Full bar setup, equipment, glassware, mix & garnish provided" },
    { label: "Alcohol", value: "Can supply alcohol OR work with client-supplied alcohol" },
    { label: "Cocktails", value: "Custom signature cocktail menus available" },
    { label: "Mocktails", value: "Yes — full mocktail menus available" },
    { label: "Guest Count", value: "No minimum or maximum — all event sizes welcome" },
    { label: "AGLC", value: "Handles licensing when supplying alcohol; client responsible if supplying own" },
    { label: "Website", value: "inthemixcalgary.com", link: "https://www.inthemixcalgary.com" },
  ]},
  { name: "The Prosecco Cart Inc.", tier: "$/$$", fields: [
    { label: "Setup", value: "Full mobile bar setup including dedicated bartenders" },
    { label: "Pricing", value: "Custom per event; minimum two-hour booking" },
    { label: "Alcohol", value: "Client supplies own — team can help place the order" },
    { label: "Cocktails", value: "Yes — signature cocktail creation available" },
    { label: "Mocktails", value: "Yes — non-alcoholic menus available" },
    { label: "Guest Count", value: "No minimum or maximum" },
    { label: "AGLC", value: "Couple or venue is responsible for the liquor licence" },
    { label: "Licensed & Insured", value: "Yes" },
    { label: "Instagram", value: "@theproseccocart" },
    { label: "Website", value: "proseccocart.ca", link: "https://www.proseccocart.ca" },
  ]},
  { name: "Suds & Sodas Mobile Bar", tier: "$", fields: [
    { label: "Pricing", value: "From $825 portable / $1,265 truck / $1,565 Piaggio Ape bar" },
    { label: "Setup", value: "Full setup except alcohol — portable station, beverage truck, or Piaggio Ape bar" },
    { label: "Alcohol", value: "Client supplies own (Suds & Sodas can purchase on your behalf)" },
    { label: "Mocktails", value: "Yes — known for their mocktail menus" },
    { label: "Guest Count", value: "20–2,000 guests" },
    { label: "AGLC", value: "Client/venue responsible — easy online application at aglc.ca" },
    { label: "Insurance", value: "$5M general liability, WCB coverage, City of Calgary business licence" },
    { label: "Instagram", value: "@sudsandsodas" },
    { label: "Website", value: "sudsandsodas.com", link: "https://www.sudsandsodas.com" },
  ]},
];

const barPending = ["The Wildflower Wandering Bar  thewildflower.ca", "True Spirits Mobile Bar  truespiritsmobilebar.com", "Olive and Twist Mobile Bar  oliveandtwistmobilebar.com", "Sugar Water  sugarwater.bar"];

const photoData = [
  { name: "Light Delight Photography", tier: "$", fields: [
    { label: "Services", value: "Photography; highlight video reel for select weddings" },
    { label: "Pricing", value: "Elopements from $900" },
    { label: "Coverage", value: "2-hour elopements to multi-day weddings" },
    { label: "Turnaround", value: "3–8 weeks" },
    { label: "Travel", value: "Calgary, Canmore & Banff" },
    { label: "Banff Permit", value: "Yes ✓" },
    { label: "Experience", value: "14+ years" },
    { label: "Instagram", value: "@lightdelightphotography" },
    { label: "Website", value: "lightdelightphotography.ca", link: "https://www.lightdelightphotography.ca" },
  ]},
  { name: "Lindsay Fontaine", tier: "$/$$", fields: [
    { label: "Services", value: "Photo, video, or hybrid; film photography option available" },
    { label: "Pricing", value: "Photo or video from $3,500; hybrid from $5,750" },
    { label: "Coverage", value: "10 hours standard; customizable" },
    { label: "Turnaround", value: "Photos 3 months; Video 6 months" },
    { label: "Style", value: "Vibrant, true-to-life; balanced posed and candid" },
    { label: "Travel", value: "All of Alberta complimentary" },
    { label: "Experience", value: "Since 2017" },
    { label: "Instagram", value: "@fontaine_photo_film" },
    { label: "Website", value: "lindsayfontaine.com", link: "https://lindsayfontaine.com/" },
  ]},
  { name: "TK Shotz Productions", tier: "$/$$", fields: [
    { label: "Services", value: "Photo, video, film, Super8 & photo booths" },
    { label: "Pricing", value: "Premier package $4,948" },
    { label: "Coverage", value: "10–12 hours; 2 shooters included in all packages" },
    { label: "Turnaround", value: "30–45 days" },
    { label: "Travel", value: "Calgary, Canmore & Banff — no travel fees" },
    { label: "Experience", value: "Since 2007" },
    { label: "Instagram", value: "@tkshotz" },
    { label: "Website", value: "tkshotz.com", link: "https://www.tkshotz.com" },
  ]},
  { name: "Rose and Range Photography", tier: "$$", fields: [
    { label: "Services", value: "Photography & videography — digital and film" },
    { label: "Pricing", value: "From $4,900" },
    { label: "Coverage", value: "8 hours to unlimited for Saturday weddings" },
    { label: "Turnaround", value: "8 weeks" },
    { label: "Style", value: "Candid, elegant, and romantic" },
    { label: "Travel", value: "Mountains and beyond" },
    { label: "Instagram", value: "@roseandrangephoto" },
    { label: "Website", value: "roseandrangephotography.ca", link: "http://www.roseandrangephotography.ca/" },
  ]},
  { name: "Erika Lagy Photography", tier: "$$/$$$ ", fields: [
    { label: "Services", value: "Photography only — film & digital combined" },
    { label: "Pricing", value: "From $5,000; most couples invest $6,500–$7,000" },
    { label: "Coverage", value: "8–12 hours; 2nd photographer for 10 & 12-hour packages" },
    { label: "Turnaround", value: "8–12 weeks" },
    { label: "Style", value: "Documentary and editorial — timeless and artistic" },
    { label: "Travel", value: "Canmore & Banff included" },
    { label: "Experience", value: "10+ years" },
    { label: "Instagram", value: "@erikalagyphoto" },
    { label: "Website", value: "erikalagyphotography.com", link: "https://erikalagyphotography.com" },
  ]},
];

const photoPending = ["Jenny Jean Photography @jennyjeanphotography", "Greco Photo Co. @grecophotoco", "Nicole Sarah Photography @nicolesarahwedding", "Gabe McClintock Photography @gabemcclintock", "Alexandra Weddings @_alexandra_weddings", "Fly Free Photo & Film @flyfreeweddings", "Meghan Fenton @meghanfentonphoto"];

const floristData = [
  { name: "Small Flower", tier: "$", fields: [
    { label: "Style", value: "English Country Garden — lush, whimsical; locally grown Alberta blooms" },
    { label: "Services", value: "Full service; à la carte menu available" },
    { label: "Pricing", value: "À la carte from under $2,500; full service custom quoted" },
    { label: "Travel", value: "Calgary, Canmore, Banff & surrounding mountain venues" },
    { label: "Booking", value: "3+ months recommended" },
    { label: "Instagram", value: "@smallflowerfloralstudio" },
    { label: "Website", value: "smallflower.ca", link: "https://www.smallflower.ca" },
  ]},
  { name: "Creative Edge Flowers", tier: "$", fields: [
    { label: "Style", value: "Modern to classic — adaptable to any aesthetic" },
    { label: "Services", value: "Full service including large installations" },
    { label: "Pricing", value: "No minimum spend" },
    { label: "Consultations", value: "Free phone/email; in-person $75 deposit (credited at booking)" },
    { label: "Travel", value: "Calgary, Canmore, Banff & further" },
    { label: "Booking", value: "Flexible — can accommodate last-minute elopements" },
    { label: "Instagram", value: "@creativeedgeflowersyyc" },
    { label: "Website", value: "creativeedgeflowers.com", link: "https://www.creativeedgeflowers.com" },
  ]},
  { name: "Flower Chix", tier: "$/$$", fields: [
    { label: "Style", value: "All styles — lush/romantic, minimalist, wildflower, modern, classic" },
    { label: "Services", value: "Full service including delivery and on-site setup" },
    { label: "Travel", value: "Calgary, Canmore & Banff — delivery fee applies" },
    { label: "Booking", value: "Earlier is better; can sometimes accommodate short notice" },
    { label: "Instagram", value: "@flowerchixyyc" },
    { label: "Website", value: "flowerchix.com", link: "https://www.flowerchix.com" },
  ]},
  { name: "Calyx Floral Design", tier: "$/$$", fields: [
    { label: "Style", value: "Flower-forward, lush and romantic; large-scale installations a specialty" },
    { label: "Services", value: "Full service — bouquets, centrepieces, ceremony, reception, installations" },
    { label: "Pricing", value: "No minimum spend" },
    { label: "Travel", value: "Calgary, Canmore & Banff — experienced at mountain venues" },
    { label: "Note", value: "Preferred florist at Calgary Marriott Downtown" },
    { label: "Instagram", value: "@calyxfloraldesign" },
    { label: "Website", value: "calyxfloraldesign.ca", link: "https://calyxfloraldesign.ca" },
  ]},
  { name: "The Romantiks", tier: "$/$$", fields: [
    { label: "Style", value: "Lush, organic, romantic — unique designs for each couple" },
    { label: "Services", value: "Full service including custom installations" },
    { label: "Pricing", value: "$2,500 minimum during peak season (May–November)" },
    { label: "Travel", value: "Canmore, Banff, Lake Louise & beyond" },
    { label: "Booking", value: "6+ months recommended" },
    { label: "Instagram", value: "@the.romantiks" },
    { label: "Website", value: "theromantiks.com", link: "https://www.theromantiks.com" },
  ]},
  { name: "Jarman Flower Shop", tier: "$/$$", fields: [
    { label: "Style", value: "Modern, design-driven, refined — no two weddings the same" },
    { label: "Services", value: "Full service including large-scale installations" },
    { label: "Pricing", value: "No minimum in Calgary; $2,500 minimum for Canmore/Banff" },
    { label: "Travel", value: "Calgary, Canmore & Banff" },
    { label: "Booking", value: "3–6 months recommended" },
    { label: "Instagram", value: "@jarmanshop" },
    { label: "Website", value: "jarmanshop.com", link: "https://jarmanshop.com" },
  ]},
  { name: "Among the Wildflwrs", tier: "$$/$$$ ", fields: [
    { label: "Style", value: "Refined garden-inspired — lush romantic textures, organic editorial feel" },
    { label: "Services", value: "Full service; selective à la carte bookings" },
    { label: "Pricing", value: "From $3,500–$5,000; most couples invest $5,000–$8,000+" },
    { label: "Consultations", value: "Complimentary consultations offered" },
    { label: "Travel", value: "Calgary, Canmore, Banff & surrounding areas" },
    { label: "Booking", value: "6–12+ months recommended for peak season" },
    { label: "Instagram", value: "@amongthewldflwrs" },
    { label: "Website", value: "amongthewldflwrs.com", link: "https://www.amongthewldflwrs.com" },
  ]},
];

const floristPending = ["Flower Aura by Natasha", "Kensington Florist", "Adventure Floral", "Pine for Cedar", "Le Bouquet Floral", "Flower Artistry", "Black Earth Floral", "Flowers by Janie", "Flower Culture YYC", "La Maison Flower Studio", "Callia Florals", "Blue Lakes Floral Design"];

const cakeData = [
  { name: "SWIRL Custom Cakes", tier: "$/$$", fields: [
    { label: "Specialty", value: "Wedding cakes, edible image cookies, boxed macarons, custom chocolate place cards" },
    { label: "Design", value: "Fully customizable — all styles and finishes" },
    { label: "Tastings", value: "To-go packs (under 60 servings); in-person tastings (60+ servings)" },
    { label: "Pricing", value: "From $150" },
    { label: "Delivery", value: "Included for 3-tier+; pickup or delivery for 1–2 tier" },
    { label: "Travel", value: "All mountain parks including Canmore & Banff" },
    { label: "Lead Time", value: "3 months recommended; 1 week for elopements" },
    { label: "Instagram", value: "@swirl_cakes" },
    { label: "Website", value: "swirlcakes.ca", link: "https://swirlcakes.ca" },
  ]},
  { name: "Sweetnd Custom Cakes", tier: "$/$$", fields: [
    { label: "Specialty", value: "Custom cakes of all types including wedding cakes" },
    { label: "Design", value: "Buttercream, fondant, naked cakes, floral cakes — all styles" },
    { label: "Tastings", value: "Available to booked clients only; fee may apply depending on cake size" },
    { label: "Pricing", value: "Single-tier 6-inch from $150" },
    { label: "Delivery", value: "Available for 2-tier+; no delivery for single-tier" },
    { label: "Travel", value: "Yes — Canmore and Banff" },
    { label: "Lead Time", value: "2–4 weeks smaller; 2–4 months large multi-tier" },
    { label: "Capacity", value: "Only 1–2 large wedding cakes per weekend — book early!" },
    { label: "Instagram", value: "@sweetndcc" },
    { label: "Website", value: "sweetnd.ca", link: "https://www.sweetnd.ca" },
  ]},
  { name: "Cakes by Jen YYC", tier: "$", fields: [
    { label: "Specialty", value: "Custom vintage-style wedding cakes & cupcakes — buttercream only" },
    { label: "Tastings", value: "Tasting boxes $16.50 — 6 cupcakes in your choice of flavours" },
    { label: "Pricing", value: "No minimum; single-tier 6-inch from $90" },
    { label: "Delivery", value: "$0.75/km Calgary; $0.85/km outside; pickup in East Chestermere" },
    { label: "Travel", value: "Calgary, Canmore & Banff" },
    { label: "Lead Time", value: "2–3 months peak season" },
    { label: "Instagram", value: "@cakesbyjenyyc" },
  ]},
  { name: "RN Treats", tier: "$", fields: [
    { label: "Specialty", value: "Custom cakes and dessert tables" },
    { label: "Design", value: "Buttercream, fondant, semi-naked, floral designs, textured finishes" },
    { label: "Tastings", value: "Tasting boxes available" },
    { label: "Pricing", value: "From approximately $60 for smaller custom cakes" },
    { label: "Delivery", value: "Yes — delivery and venue setup included" },
    { label: "Travel", value: "Canmore & Banff — delivery fees may vary" },
    { label: "Lead Time", value: "3–4 weeks minimum; earlier for peak season" },
    { label: "Instagram", value: "@rntreatsyyc" },
  ]},
  { name: "Sweet Relief Pastries", tier: "$", fields: [
    { label: "Specialty", value: "Cakes, cookies, and treats for weddings" },
    { label: "Design", value: "Simple buttercream — no fondant or sugar flowers" },
    { label: "Tastings", value: "Cake tasting boxes available online" },
    { label: "Pricing", value: "Single tier from $60; 2-tier from $175; 3-tier from $315" },
    { label: "Travel", value: "Calgary only — does not deliver to mountains" },
    { label: "Lead Time", value: "2+ weeks minimum" },
    { label: "Instagram", value: "@sweetreliefpastries" },
    { label: "Website", value: "sweetreliefpastries.com", link: "https://www.sweetreliefpastries.com" },
  ]},
  { name: "Pretty Sweet Bakeshop", tier: "$/$$", fields: [
    { label: "Specialty", value: "Wedding cakes, donuts, cupcakes & dessert tables" },
    { label: "Design", value: "Buttercream only — fresh flowers, sugar flowers, or painted finishes" },
    { label: "Tastings", value: "Online tasting kit available for pickup" },
    { label: "Delivery", value: "Calgary year-round; Canmore & Banff summer only (not Oct–Mar)" },
    { label: "Lead Time", value: "6–9 months recommended" },
    { label: "Instagram", value: "@prettysweetyyc" },
  ]},
  { name: "Cakes by AbimSugar", tier: "$/$$", fields: [
    { label: "Specialty", value: "Custom centrepiece cakes designed uniquely for each couple" },
    { label: "Design", value: "Buttercream, fondant, semi-naked/naked, floral-inspired finishes" },
    { label: "Tastings", value: "By appointment — tailored to preferred flavours" },
    { label: "Pricing", value: "$8–$10 per serving; most couples invest $800–$2,500+" },
    { label: "Delivery", value: "Yes — delivery and on-site setup" },
    { label: "Travel", value: "Canmore & Banff — travel quoted based on location" },
    { label: "Lead Time", value: "4–8 weeks; earlier for peak season" },
    { label: "Instagram", value: "@cakes.bysugarrush" },
  ]},
  { name: "Magnolia Couture Cakery", tier: "$$/$$$ ", fields: [
    { label: "Specialty", value: "Luxury wedding cakes and curated dessert experiences" },
    { label: "Design", value: "Refined buttercream, fondant, semi-naked, sugar/edible paper florals, minimalist" },
    { label: "Tastings", value: "Curated sampler boxes + complimentary virtual or in-person consultation" },
    { label: "Pricing", value: "From $500+" },
    { label: "Delivery", value: "Professional delivery and on-site setup" },
    { label: "Travel", value: "Canmore & Banff — fees based on distance" },
    { label: "Lead Time", value: "3–6 months; peak dates book early" },
    { label: "Instagram", value: "@magnoliacakery.ca" },
    { label: "Website", value: "magnoliacakery.ca", link: "https://www.magnoliacakery.ca" },
  ]},
];

const cakePending = ["The Cake Trail", "Butter Love Sugar", "Bake My Day", "The Cake Nook", "Kinni Cakery", "Chartier", "Afsheed Cakes and Sweets", "Kakes and Kanvas", "Black Dog Bakery", "Modern Bake", "Cakeworks", "The Engineers Bakery", "Willow Cake and Bake", "Sugar Shimmer", "Sweet Cakes by Vernz", "Yvonne's Delightful Cakes"];

// ── COMPONENTS ──────────────────────────────────────────────────────────────

function VendorCard({ vendor }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="vendor-card">
      <div className="vendor-card-header" onClick={() => setOpen(!open)}>
        <span className="vendor-name">{vendor.name}</span>
        <div className="vendor-right">
          <span className="vendor-tier">{vendor.tier}</span>
          <span className={`vendor-toggle ${open ? "open" : ""}`}>⌄</span>
        </div>
      </div>
      {open && (
        <div className="vendor-body">
          {vendor.fields.map((f, i) => (
            <div key={i} className={`vendor-field ${f.full ? "full" : ""}`}>
              <span className="field-label">{f.label}</span>
              <span className="field-value">
                {f.link ? <a href={f.link} target="_blank" rel="noopener noreferrer">{f.value}</a> : f.value}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function VenueSection({ sections }) {
  return (
    <div>
      <div className="info-box">
        <div className="info-box-title">Booking Tips</div>
        <ul>
          <li>Peak wedding season runs June through September — popular venues book 12–18 months in advance.</li>
          <li>Several venues have preferred vendor lists — ask for these once you book.</li>
          <li>Restaurant venues often have a minimum spend rather than a flat rental fee.</li>
        </ul>
      </div>
      {sections.map((sec, si) => (
        <div key={si}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <div className="subsection-title" style={{ marginBottom: 0 }}>{sec.sub}</div>
            {sec.location && (
              <span style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: 10, letterSpacing: 2,
                textTransform: "uppercase",
                color: COLORS.white,
                background: COLORS.forest,
                padding: "3px 10px",
                borderRadius: 20,
                marginBottom: 4,
              }}>{sec.location}</span>
            )}
          </div>
          {sec.note && <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 16, color: COLORS.sub, marginBottom: 20, lineHeight: 1.6, marginTop: 8 }}>{sec.note}</p>}
          {sec.vendors && (
            <div className="vendor-grid">
              {sec.vendors.map((v, vi) => <VendorCard key={vi} vendor={v} />)}
            </div>
          )}
          {sec.plain && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {sec.plain.map((p, pi) => (
                <div key={pi} style={{ padding: "16px 20px", border: `1px solid ${COLORS.border}`, borderRadius: 4, background: COLORS.parchment }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: COLORS.forest }}>{p.name}</span>
                    <span className="vendor-tier">{p.tier}</span>
                  </div>
                  <p style={{ fontSize: 14, color: COLORS.sub, marginBottom: 6 }}>{p.note}</p>
                  <p style={{ fontSize: 13, color: COLORS.sub }}>{p.url}{p.ig ? `  ·  ${p.ig}` : ""}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function SimpleVendors({ vendors, pending, pendingLabel, infoTitle, infoItems }) {
  return (
    <div>
      {infoItems && (
        <div className="info-box">
          <div className="info-box-title">{infoTitle}</div>
          <ul>{infoItems.map((it, i) => <li key={i}>{it}</li>)}</ul>
        </div>
      )}
      <div className="vendor-grid" style={{ marginTop: 24 }}>
        {vendors.map((v, i) => <VendorCard key={i} vendor={v} />)}
      </div>
      {pending && pending.length > 0 && (
        <div className="pending">
          <div className="pending-title">{pendingLabel || "On our radar — details coming soon"}</div>
          <div className="pending-list">
            {pending.map((p, i) => <span key={i} className="pending-tag">{p}</span>)}
          </div>
        </div>
      )}
    </div>
  );
}

function Checklist() {
  const total = checklistData.reduce((a, p) => a + p.items.length, 0);
  const [checked, setChecked] = useState({});
  const doneCount = Object.values(checked).filter(Boolean).length;
  const pct = Math.round((doneCount / total) * 100);

  function toggle(phase, idx) {
    const key = `${phase}-${idx}`;
    setChecked(prev => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <div>
      <p className="checklist-intro">Use this checklist to stay on track from the moment you get engaged to the moment you say "I do." Click each item to mark it complete.</p>
      <div className="progress-label">
        <span>Overall Progress</span>
        <span>{doneCount} of {total} tasks complete</span>
      </div>
      <div className="progress-bar-wrap">
        <div className="progress-bar" style={{ width: `${pct}%` }} />
      </div>
      {checklistData.map((phase, pi) => {
        const phaseDone = phase.items.filter((_, ii) => checked[`${pi}-${ii}`]).length;
        return (
          <div key={pi} className="checklist-phase">
            <div className="phase-header">
              <span className="phase-badge">{phase.badge}</span>
              <span className="phase-title">{phase.phase}</span>
              <span className="phase-progress">{phaseDone}/{phase.items.length}</span>
            </div>
            <div className="check-items">
              {phase.items.map((item, ii) => {
                const key = `${pi}-${ii}`;
                const done = !!checked[key];
                return (
                  <div key={ii} className={`check-item ${done ? "done" : ""}`} onClick={() => toggle(pi, ii)}>
                    <div className="check-box">
                      {done && <span className="check-mark">✓</span>}
                    </div>
                    <span className="check-text">{item}</span>
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

function BudgetTracker() {
  const STORAGE_KEY = "uwg_budget_tracker";
  const DEFAULT_CATEGORIES = [
    { id: 1, category: "Venue", vendor: "", estimated: "", actual: "", status: "Researching", notes: "" },
    { id: 2, category: "Catering", vendor: "", estimated: "", actual: "", status: "Researching", notes: "" },
    { id: 3, category: "Photography", vendor: "", estimated: "", actual: "", status: "Researching", notes: "" },
    { id: 4, category: "Videography", vendor: "", estimated: "", actual: "", status: "Researching", notes: "" },
    { id: 5, category: "Florals", vendor: "", estimated: "", actual: "", status: "Researching", notes: "" },
    { id: 6, category: "Wedding Cake", vendor: "", estimated: "", actual: "", status: "Researching", notes: "" },
    { id: 7, category: "Mobile Bar", vendor: "", estimated: "", actual: "", status: "Researching", notes: "" },
    { id: 8, category: "Hair & Makeup", vendor: "", estimated: "", actual: "", status: "Researching", notes: "" },
    { id: 9, category: "Wedding Dress", vendor: "", estimated: "", actual: "", status: "Researching", notes: "" },
    { id: 10, category: "Suit / Attire", vendor: "", estimated: "", actual: "", status: "Researching", notes: "" },
    { id: 11, category: "Officiant", vendor: "", estimated: "", actual: "", status: "Researching", notes: "" },
    { id: 12, category: "Music / DJ", vendor: "", estimated: "", actual: "", status: "Researching", notes: "" },
    { id: 13, category: "Transportation", vendor: "", estimated: "", actual: "", status: "Researching", notes: "" },
    { id: 14, category: "Invitations", vendor: "", estimated: "", actual: "", status: "Researching", notes: "" },
    { id: 15, category: "Rings", vendor: "", estimated: "", actual: "", status: "Researching", notes: "" },
    { id: 16, category: "Honeymoon", vendor: "", estimated: "", actual: "", status: "Researching", notes: "" },
    { id: 17, category: "Miscellaneous", vendor: "", estimated: "", actual: "", status: "Researching", notes: "" },
  ];

  const loadData = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch(e) {}
    return { totalBudget: "", rows: DEFAULT_CATEGORIES };
  };

  const [data, setData] = useState(loadData);
  const [newCategory, setNewCategory] = useState("");
  const [saved, setSaved] = useState(false);

  const save = (updated) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch(e) {}
  };

  const updateBudget = (val) => {
    const updated = { ...data, totalBudget: val };
    setData(updated);
    save(updated);
  };

  const updateRow = (id, field, val) => {
    const rows = data.rows.map(r => r.id === id ? { ...r, [field]: val } : r);
    const updated = { ...data, rows };
    setData(updated);
    save(updated);
  };

  const addRow = () => {
    if (!newCategory.trim()) return;
    const newRow = { id: Date.now(), category: newCategory.trim(), vendor: "", estimated: "", actual: "", status: "Researching", notes: "" };
    const rows = [...data.rows, newRow];
    const updated = { ...data, rows };
    setData(updated);
    save(updated);
    setNewCategory("");
  };

  const deleteRow = (id) => {
    const rows = data.rows.filter(r => r.id !== id);
    const updated = { ...data, rows };
    setData(updated);
    save(updated);
  };

  const resetAll = () => {
    if (window.confirm("Reset all tracker data? This cannot be undone.")) {
      const updated = { totalBudget: "", rows: DEFAULT_CATEGORIES };
      setData(updated);
      save(updated);
    }
  };

  const totalBudget = parseFloat(data.totalBudget) || 0;
  const totalEstimated = data.rows.reduce((sum, r) => sum + (parseFloat(r.estimated) || 0), 0);
  const totalActual = data.rows.reduce((sum, r) => sum + (parseFloat(r.actual) || 0), 0);
  const remaining = totalBudget - totalActual;
  const progress = totalBudget > 0 ? Math.min((totalActual / totalBudget) * 100, 100) : 0;
  const estimatedProgress = totalBudget > 0 ? Math.min((totalEstimated / totalBudget) * 100, 100) : 0;
  const fmt = (n) => n ? `$${n.toLocaleString('en-CA', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}` : "—";
  const statusColors = { "Researching": COLORS.sub, "Quoted": "#8B6914", "Booked": COLORS.forest, "Paid": "#2a7a2a", "Cancelled": "#c0392b" };

  return (
    <div>
      {/* SUMMARY CARDS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16, marginBottom: 32 }}>
        {[
          { label: "Total Budget", value: totalBudget ? fmt(totalBudget) : "Set below", highlight: true },
          { label: "Total Estimated", value: fmt(totalEstimated), sub: `${estimatedProgress.toFixed(0)}% of budget` },
          { label: "Total Spent", value: fmt(totalActual), sub: `${progress.toFixed(0)}% of budget` },
          { label: "Remaining", value: totalBudget ? fmt(remaining) : "—", sub: remaining < 0 ? "Over budget" : "Left to spend", alert: remaining < 0 },
        ].map((card, i) => (
          <div key={i} style={{
            background: card.highlight ? COLORS.forest : COLORS.parchment,
            border: `1px solid ${card.alert ? "#c0392b" : COLORS.border}`,
            borderRadius: 4, padding: "20px 18px",
          }}>
            <div style={{ fontFamily: "'Jost', sans-serif", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: card.highlight ? COLORS.sandstone : COLORS.sub, marginBottom: 8 }}>{card.label}</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 600, color: card.highlight ? COLORS.cream : card.alert ? "#c0392b" : COLORS.forest, lineHeight: 1 }}>{card.value}</div>
            {card.sub && <div style={{ fontFamily: "'Jost', sans-serif", fontSize: 11, color: card.alert ? "#c0392b" : COLORS.sub, marginTop: 4 }}>{card.sub}</div>}
          </div>
        ))}
      </div>

      {/* BUDGET INPUT */}
      <div style={{ background: COLORS.parchment, border: `1px solid ${COLORS.border}`, borderRadius: 4, padding: "20px 24px", marginBottom: 24, display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        <label style={{ fontFamily: "'Jost', sans-serif", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: COLORS.sub }}>Total Wedding Budget (CAD)</label>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, minWidth: 200 }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, color: COLORS.forest }}>$</span>
          <input
            type="number"
            placeholder="e.g. 35000"
            value={data.totalBudget}
            onChange={e => updateBudget(e.target.value)}
            style={{ flex: 1, fontFamily: "'Cormorant Garamond', serif", fontSize: 22, border: "none", borderBottom: `1px solid ${COLORS.border}`, background: "transparent", outline: "none", color: COLORS.forest, padding: "4px 0" }}
          />
        </div>
        {saved && <span style={{ fontFamily: "'Jost', sans-serif", fontSize: 11, color: COLORS.forest, letterSpacing: 1 }}>✓ Saved</span>}
      </div>

      {/* PROGRESS BAR */}
      {totalBudget > 0 && (
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontFamily: "'Jost', sans-serif", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: COLORS.sub }}>Budget Used</span>
            <span style={{ fontFamily: "'Jost', sans-serif", fontSize: 10, letterSpacing: 1, color: COLORS.sub }}>{fmt(totalActual)} of {fmt(totalBudget)}</span>
          </div>
          <div style={{ height: 6, background: COLORS.border, borderRadius: 3, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${estimatedProgress}%`, background: COLORS.border, borderRadius: 3, position: "relative" }}>
              <div style={{ position: "absolute", inset: 0, width: `${totalEstimated > 0 ? (totalActual / totalEstimated) * 100 : 0}%`, background: COLORS.forest, borderRadius: 3, transition: "width 0.4s" }} />
            </div>
          </div>
          <div style={{ display: "flex", gap: 20, marginTop: 8 }}>
            <span style={{ fontFamily: "'Jost', sans-serif", fontSize: 10, color: COLORS.forest }}>● Spent</span>
            <span style={{ fontFamily: "'Jost', sans-serif", fontSize: 10, color: COLORS.border }}>● Estimated</span>
          </div>
        </div>
      )}

      {/* TABLE */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: `2px solid ${COLORS.border}` }}>
              {["Category", "Vendor", "Estimated", "Actual", "Status", "Notes", ""].map((h, i) => (
                <th key={i} style={{ fontFamily: "'Jost', sans-serif", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: COLORS.sub, padding: "10px 12px", textAlign: "left", whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, i) => (
              <tr key={row.id} style={{ borderBottom: `1px solid ${COLORS.border}`, background: i % 2 === 0 ? COLORS.white : COLORS.parchment }}>
                <td style={{ padding: "10px 12px", fontFamily: "'Cormorant Garamond', serif", fontSize: 16, fontWeight: 500, color: COLORS.forest, whiteSpace: "nowrap" }}>{row.category}</td>
                <td style={{ padding: "6px 12px" }}>
                  <input value={row.vendor} onChange={e => updateRow(row.id, "vendor", e.target.value)} placeholder="Vendor name" style={{ width: "100%", minWidth: 120, border: "none", borderBottom: `1px solid ${COLORS.border}`, background: "transparent", fontFamily: "'Jost', sans-serif", fontSize: 12, color: COLORS.text, outline: "none", padding: "4px 0" }} />
                </td>
                <td style={{ padding: "6px 12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <span style={{ color: COLORS.sub, fontSize: 12 }}>$</span>
                    <input type="number" value={row.estimated} onChange={e => updateRow(row.id, "estimated", e.target.value)} placeholder="0" style={{ width: 80, border: "none", borderBottom: `1px solid ${COLORS.border}`, background: "transparent", fontFamily: "'Jost', sans-serif", fontSize: 12, color: COLORS.text, outline: "none", padding: "4px 0" }} />
                  </div>
                </td>
                <td style={{ padding: "6px 12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <span style={{ color: COLORS.sub, fontSize: 12 }}>$</span>
                    <input type="number" value={row.actual} onChange={e => updateRow(row.id, "actual", e.target.value)} placeholder="0" style={{ width: 80, border: "none", borderBottom: `1px solid ${COLORS.border}`, background: "transparent", fontFamily: "'Jost', sans-serif", fontSize: 12, color: COLORS.text, outline: "none", padding: "4px 0" }} />
                  </div>
                </td>
                <td style={{ padding: "6px 12px" }}>
                  <select value={row.status} onChange={e => updateRow(row.id, "status", e.target.value)} style={{ border: "none", borderBottom: `1px solid ${COLORS.border}`, background: "transparent", fontFamily: "'Jost', sans-serif", fontSize: 11, color: statusColors[row.status] || COLORS.sub, outline: "none", padding: "4px 0", cursor: "pointer" }}>
                    {["Researching", "Quoted", "Booked", "Paid", "Cancelled"].map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
                <td style={{ padding: "6px 12px" }}>
                  <input value={row.notes} onChange={e => updateRow(row.id, "notes", e.target.value)} placeholder="Add a note..." style={{ width: "100%", minWidth: 120, border: "none", borderBottom: `1px solid ${COLORS.border}`, background: "transparent", fontFamily: "'Jost', sans-serif", fontSize: 12, color: COLORS.text, outline: "none", padding: "4px 0" }} />
                </td>
                <td style={{ padding: "6px 8px", textAlign: "center" }}>
                  <button onClick={() => deleteRow(row.id)} style={{ background: "none", border: "none", cursor: "pointer", color: COLORS.sub, fontSize: 16, opacity: 0.4, transition: "opacity 0.2s" }} onMouseOver={e => e.target.style.opacity = 1} onMouseOut={e => e.target.style.opacity = 0.4}>×</button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr style={{ borderTop: `2px solid ${COLORS.border}`, background: COLORS.mint }}>
              <td style={{ padding: "12px", fontFamily: "'Jost', sans-serif", fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: COLORS.forest, fontWeight: 600 }}>Total</td>
              <td />
              <td style={{ padding: "12px", fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 600, color: COLORS.forest }}>{fmt(totalEstimated)}</td>
              <td style={{ padding: "12px", fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 600, color: COLORS.forest }}>{fmt(totalActual)}</td>
              <td colSpan={3} />
            </tr>
          </tfoot>
        </table>
      </div>

      {/* ADD ROW */}
      <div style={{ display: "flex", gap: 12, marginTop: 20, alignItems: "center", flexWrap: "wrap" }}>
        <input
          value={newCategory}
          onChange={e => setNewCategory(e.target.value)}
          onKeyDown={e => e.key === "Enter" && addRow()}
          placeholder="Add a custom category..."
          style={{ flex: 1, minWidth: 200, fontFamily: "'Jost', sans-serif", fontSize: 13, border: `1px solid ${COLORS.border}`, borderRadius: 2, padding: "10px 14px", outline: "none", background: COLORS.white, color: COLORS.text }}
        />
        <button onClick={addRow} style={{ fontFamily: "'Jost', sans-serif", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", background: COLORS.forest, color: COLORS.cream, border: "none", borderRadius: 2, padding: "10px 24px", cursor: "pointer" }}>
          Add Row
        </button>
        <button onClick={resetAll} style={{ fontFamily: "'Jost', sans-serif", fontSize: 11, letterSpacing: 1, background: "none", color: COLORS.sub, border: `1px solid ${COLORS.border}`, borderRadius: 2, padding: "10px 20px", cursor: "pointer" }}>
          Reset
        </button>
      </div>

      <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 11, color: COLORS.sub, marginTop: 16, fontStyle: "italic" }}>
        ✦ Your budget data is saved automatically to this device. For access across multiple devices, stay tuned — cloud sync is coming.
      </p>
    </div>
  );
}

function BudgetGuide() {
  const packages = [
    {
      cls: "pkg-$", tier: "$", name: "The Intimate Rocky Mountain Wedding", range: "$8,000 – $15,000",
      items: ["Venue: 52 North, Arts Commons, Cucina Market Bistro, or Alforno Eau Claire", "Catering: Rocky Mountain BBQ or Alpine Catering", "Photography: Light Delight Photography (from $900)", "Florals: Small Flower à la carte or Creative Edge Flowers", "Cake: Cakes by Jen YYC or Sweet Relief Pastries", "Bar: Suds & Sodas portable station (from $825)", "Best for: Elopements & intimate gatherings under 40 guests"],
    },
    {
      cls: "pkg-$$", tier: "$$", name: "The Classic Rocky Mountain Wedding", range: "$15,000 – $50,000",
      items: ["Venue: Spruce Meadows, Willow Lane Barn, Pine and Pond, or Meadow Muse", "Catering: Visionary Catering, Urbane Culinary, or Devour Catering", "Photography: Lindsay Fontaine or Rose and Range Photography", "Florals: Calyx Floral Design, The Romantiks, or Jarman Flower Shop", "Cake: SWIRL Custom Cakes or Sweetnd Custom Cakes", "Bar: In the Mix Bartending or Olive and Twist Mobile Bar", "Best for: Weddings of 50–120 guests with a full vendor team"],
    },
    {
      cls: "pkg-$$$", tier: "$$$", name: "The Rocky Mountain Dream", range: "$50,000+",
      items: ["Venue: The Fairmont Palliser, Hotel Arts, or Calgary Marriott Downtown", "Catering: Curated Catering by Hotel Arts or Food Works Craft Catering", "Photography: Erika Lagy Photography (film + digital)", "Florals: Among the Wildflwrs or Calyx Floral Design (large installations)", "Cake: Magnolia Couture Cakery", "Bar: Black Tie & Bourbon or True Spirits Mobile Bar", "Best for: Grand celebrations of 100+ guests with a premium experience"],
    },
  ];
  return (
    <div>
      <div className="info-box" style={{ marginBottom: 32 }}>
        <div className="info-box-title">How Budget Tiers Work</div>
        <ul>
          <li><strong>$</strong> — Under $15,000 total wedding budget. Elopements, micro-weddings, and intimate gatherings.</li>
          <li><strong>$$</strong> — $15,000–$50,000. Full wedding with complete vendor team, 50–120 guests.</li>
          <li><strong>$$$</strong> — $50,000+. Grand celebrations with premium vendors and 100+ guests.</li>
          <li>Many vendors span two tiers (e.g. $/$$) meaning they serve both budget ranges.</li>
        </ul>
      </div>
      <div className="packages">
        {packages.map((pkg, i) => (
          <div key={i} className={`package ${pkg.cls}`}>
            <div className="package-header">
              <span className="package-tier">{pkg.tier}</span>
              <span className="package-name">{pkg.name}</span>
              <span className="package-range">{pkg.range}</span>
            </div>
            <div className="package-body">
              <ul>{pkg.items.map((it, ii) => <li key={ii}>{it}</li>)}</ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const tabs = [
  { id: "home", label: "Home" },
  { id: "checklist", label: "Free Checklist" },
  { id: "why", label: "Our Story" },
  { id: "budget", label: "Budget Guide", locked: true },
  { id: "tracker", label: "Budget Tracker", locked: true },
  { id: "venues", label: "Venues", locked: true },
  { id: "catering", label: "Catering", locked: true },
  { id: "bar", label: "Mobile Bar", locked: true },
  { id: "photo", label: "Photography", locked: true },
  { id: "florists", label: "Florists", locked: true },
  { id: "cakes", label: "Cakes", locked: true },
  { id: "dresses", label: "Wedding Dresses", locked: true },
  { id: "coming", label: "On Our Radar", locked: true },
];

const sectionMeta = {
  home: { eyebrow: "Canadian Rockies Edition", title: "The Ultimate Wedding Guide", lead: "" },
  why: { eyebrow: "Behind the Guide", title: "Our Story", lead: "", icon: "story" },
  checklist: { eyebrow: "Canadian Rockies Edition", title: "Wedding Planning Checklist", lead: "From the moment you get engaged to the moment you say \"I do\" — every task, every milestone, beautifully organized.", icon: "checklist" },
  budget: { eyebrow: "Canadian Rockies Edition", title: "Budget Planning Guide", lead: "Every dream wedding is different — and so is every budget. Find the tier that fits your vision and explore vendors that align with your investment.", icon: "budget" },
  tracker: { eyebrow: "Canadian Rockies Edition", title: "Budget Tracker", lead: "Track your wedding budget in real time. Your data is saved automatically between visits.", icon: "budget" },
  venues: { eyebrow: "Calgary · Canmore · Banff", title: "Venues", lead: "From grand Calgary hotel ballrooms and rustic mountain barns to intimate Canmore spaces and iconic Banff resorts — the Canadian Rockies corridor offers some of the most breathtaking wedding venues in the world.", icon: "venues" },
  catering: { eyebrow: "Calgary", title: "Catering", lead: "For venues without in-house catering, these Calgary caterers bring exceptional skill, flexibility, and style to your wedding table.", icon: "catering" },
  bar: { eyebrow: "Calgary", title: "Mobile Bar Services", lead: "Alberta's liquor laws make mobile bar services unique. Here's everything you need to know — and the best services in the city.", icon: "bar" },
  photo: { eyebrow: "Calgary", title: "Photography & Videography", lead: "Your photos and film are the memories you will revisit for the rest of your lives. Alberta's landscapes reward photographers who truly know light.", icon: "photo" },
  florists: { eyebrow: "Calgary", title: "Florists", lead: "Florals set the tone for your entire wedding aesthetic. Calgary's florist community is exceptionally talented — and nearly all travel to Canmore and Banff.", icon: "florists" },
  cakes: { eyebrow: "Calgary", title: "Cakes & Desserts", lead: "From elegant tiered cakes to whimsical dessert tables, Calgary's bakers are exceptionally talented. Whatever your vision and budget, there is a baker here for you.", icon: "cakes" },
  dresses: { eyebrow: "Calgary", title: "Wedding Dresses", lead: "Finding your dress is one of the most magical moments of wedding planning. We recommend visiting each of these boutiques in person — no online browsing compares to trying on the real thing.", icon: "dresses" },
  coming: { eyebrow: "Canadian Rockies Edition", title: "On Our Radar", lead: "We are constantly scouting, vetting, and adding to this guide. Consider this your insider preview of what's coming — and a reminder that the best vendors book fast.", icon: "coming" },
};

const dressData = [
  { name: "Blush & Raven", ig: "@blushandravenyyc", url: "blushandraven.com", link: "https://www.blushandraven.com" },
  { name: "The Bridal Boutique", ig: "@thebridalboutiqueyyc", url: "thebridalboutique.ca", link: "https://www.thebridalboutique.ca" },
  { name: "LOVENOTE", ig: "@lovenotebride", url: "lovenotebride.com", link: "https://lovenotebride.com" },
  { name: "The Bridal Centre", ig: "@thebridalcentre", url: "bridalcentre.com", link: "https://bridalcentre.com" },
];

// ── APP ─────────────────────────────────────────────────────────────────────
function GiftModal({ onClose }) {
  const [step, setStep] = useState(1);
  const [tier, setTier] = useState("essential");
  const [giftForm, setGiftForm] = useState({ recipientName: "", recipientEmail: "", senderName: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const tiers = {
    complete: { price: "$29", name: "The Ultimate Wedding Guide", desc: "Full vendor directory, budget guide, checklist & more. Regular price $49 — launch special." },
  };

  async function handleGiftSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/.netlify/functions/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          isGift: true,
          recipientName: giftForm.recipientName,
          recipientEmail: giftForm.recipientEmail,
          senderName: giftForm.senderName,
          message: giftForm.message,
          email: giftForm.recipientEmail,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="gift-modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="gift-modal" style={{ position: "relative" }}>
        <button className="gift-modal-close" onClick={onClose}>×</button>

        {step === 1 && (
          <>
            <div className="gift-modal-eyebrow">Give the Gift of Planning</div>
            <h2 className="gift-modal-title">Gift the Guide</h2>
            <p className="gift-modal-sub">The perfect gift for any engaged couple — full vendor directory, budget guide, checklist and more across Calgary, Canmore & Banff.</p>
            <div style={{ textAlign: "center", padding: "24px 0", borderTop: `1px solid ${COLORS.border}`, borderBottom: `1px solid ${COLORS.border}`, margin: "0 0 24px" }}>
              <div style={{ display: "inline-block", background: COLORS.sandstone, color: COLORS.white, fontFamily: "'Jost', sans-serif", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", padding: "4px 14px", borderRadius: 20, marginBottom: 12 }}>
                Launch Price — Limited Time
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 48, fontWeight: 600, color: COLORS.forest, lineHeight: 1 }}>$29</div>
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: COLORS.sub, textDecoration: "line-through" }}>$49</div>
                  <div style={{ fontFamily: "'Jost', sans-serif", fontSize: 10, letterSpacing: 1, color: COLORS.sub }}>Regular price</div>
                </div>
              </div>
              <div style={{ fontFamily: "'Jost', sans-serif", fontSize: 11, letterSpacing: 1, color: COLORS.sub, marginTop: 8 }}>CAD · One-time purchase · Lifetime access</div>
            </div>
            <button className="form-btn" style={{ width: "100%", textAlign: "center" }} onClick={() => setStep(2)}>
              Continue — $29
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <div className="gift-modal-eyebrow">Personalize Your Gift</div>
            <h2 className="gift-modal-title">Add a Personal Touch</h2>
            <p className="gift-modal-sub">We will send a beautiful gift notification to the lucky couple on your behalf.</p>
            <form onSubmit={handleGiftSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Recipient's Name</label>
                  <input className="form-input" type="text" placeholder="Their name" required value={giftForm.recipientName} onChange={e => setGiftForm({...giftForm, recipientName: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Recipient's Email</label>
                  <input className="form-input" type="email" placeholder="their@email.com" required value={giftForm.recipientEmail} onChange={e => setGiftForm({...giftForm, recipientEmail: e.target.value})} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Your Name</label>
                <input className="form-input" type="text" placeholder="Your name" required value={giftForm.senderName} onChange={e => setGiftForm({...giftForm, senderName: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Personal Message (optional)</label>
                <textarea className="form-textarea" placeholder="Write a little note to the happy couple..." style={{ minHeight: 80 }} value={giftForm.message} onChange={e => setGiftForm({...giftForm, message: e.target.value})} />
              </div>
              {error && <p style={{ fontSize: 13, color: "#c0392b", fontStyle: "italic" }}>{error}</p>}
              <div style={{ display: "flex", gap: 12 }}>
                <button type="button" className="gift-btn-secondary" style={{ color: COLORS.sub, borderColor: COLORS.border }} onClick={() => setStep(1)}>Back</button>
                <button type="submit" className="form-btn" style={{ flex: 1, textAlign: "center" }} disabled={loading}>
                  {loading ? "Sending..." : "Send Gift — $29"}
                </button>
              </div>
            </form>
          </>
        )}

        {step === 3 && (
          <div className="gift-success">
            <div style={{ width: 40, height: 1, background: COLORS.sandstone, margin: "0 auto 24px" }} />
            <h2 className="gift-success-title">Gift Sent!</h2>
            <p className="gift-success-sub">Your gift has been received. We will be in touch shortly to process payment and deliver access to {giftForm.recipientName}.</p>
            <div className="gift-card-preview">
              <div className="gift-card-to">A gift for</div>
              <div className="gift-card-name">{giftForm.recipientName}</div>
              {giftForm.message && <div className="gift-card-message">"{giftForm.message}"</div>}
              <div className="gift-card-divider" />
              <div className="gift-card-password">With love from</div>
              <div className="gift-card-password-value">{giftForm.senderName}</div>
            </div>
            <button className="form-btn" style={{ width: "100%" }} onClick={onClose}>Done</button>
          </div>
        )}
      </div>
    </div>
  );
}

function LandingPage() {
  const [form, setForm] = useState({ name: "", email: "", type: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showGift, setShowGift] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("https://formspree.io/f/mykbkojw", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          inquiry_type: form.type,
          message: form.message,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError("Something went wrong. Please try again or reach out directly.");
      }
    } catch (err) {
      setError("Something went wrong. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  const features = [
    { iconKey: "venues", title: "36 Verified Venues", desc: "From grand Banff resorts and iconic Calgary ballrooms to intimate Canmore spaces and rustic mountain barns." },
    { iconKey: "checklist", title: "60-Task Checklist", desc: "Every milestone from engagement to wedding day, beautifully organized." },
    { iconKey: "budget", title: "Budget Planning Guide", desc: "Sample packages from intimate elopements to dream celebrations." },
    { iconKey: "photo", title: "Photography & More", desc: "Vetted photographers, florists, caterers, bakers, and more." },
    { iconKey: "florists", title: "All Travel to the Mountains", desc: "Nearly every vendor covers Calgary, Canmore, and Banff." },
    { iconKey: "cakes", title: "Regularly Updated", desc: "New vendors and sections added as we grow the guide." },
  ];

  return (
    <div className="landing">
      <div className="landing-eyebrow">Canadian Rockies Edition</div>
      <h1 className="landing-title">Your wedding should feel<br /><em>exciting. Not overwhelming.</em></h1>
      <p className="landing-body">
        We've done the research, vetted the vendors, and organized everything — so you can put down the laptop, stop the endless Googling, and actually enjoy being engaged. The Ultimate Wedding Guide — Canadian Rockies Edition gives you everything you need to plan your dream wedding in Calgary, Canmore, or Banff, all in one beautiful place.
      </p>

      <div style={{ marginBottom: 16 }}>
        <div className="landing-eyebrow" style={{ marginBottom: 8 }}>What's Inside the Guide</div>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontStyle: "italic", color: COLORS.sub, lineHeight: 1.6 }}>
          Everything you need to plan your Rocky Mountain wedding — researched, vetted, and organized for you.
        </p>
      </div>
      <div className="landing-features">
        {features.map((f, i) => (
          <div key={i} className="feature-card">
            <div className="feature-icon" style={{ marginBottom: 12 }}>
              <Icon name={f.iconKey} color={COLORS.sandstone} size={28} />
            </div>
            <div className="feature-title">{f.title}</div>
            <div className="feature-desc">{f.desc}</div>
          </div>
        ))}
      </div>

      <div className="landing-divider" />

      {/* GIFT SECTION */}
      {showGift && <GiftModal onClose={() => setShowGift(false)} />}
      <div className="gift-section">
        <div className="gift-eyebrow">Know Someone Getting Married?</div>
        <h2 className="gift-title">Give the Gift of<br /><em>a Dream Wedding</em></h2>
        <p className="gift-desc">The perfect gift for any engaged couple — help them plan the most important day of their lives without the stress.</p>
        <div className="gift-recipients">
          {["For the Bride-to-Be", "From the Maid of Honour", "A Gift from Mom", "From the In-Laws", "Bridal Shower Gift", "Engagement Gift"].map((r, i) => (
            <span key={i} className="gift-tag">{r}</span>
          ))}
        </div>
        <div className="gift-buttons">
          <button className="gift-btn-primary" onClick={() => setShowGift(true)}>Gift the Guide</button>
        </div>
      </div>

      <div className="landing-divider" />

      {/* COMING SOON CITIES */}
      <div style={{ marginBottom: 56 }}>
        <div className="landing-eyebrow" style={{ marginBottom: 12 }}>Expanding Across Canada</div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 38, fontWeight: 400, color: COLORS.forest, marginBottom: 12, lineHeight: 1.1 }}>
          More Editions <em style={{ fontStyle: "italic", color: COLORS.sandstone }}>Coming Soon</em>
        </h2>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontStyle: "italic", color: COLORS.sub, marginBottom: 32, lineHeight: 1.6, maxWidth: 500 }}>
          The Ultimate Wedding Guide is growing. New city editions are in the works — each one as carefully curated as the one you're reading now.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12, marginBottom: 28 }}>
          {[
            { city: "Vancouver", region: "British Columbia", status: "In Progress" },
            { city: "Whistler", region: "British Columbia", status: "In Progress" },
            { city: "Okanagan", region: "British Columbia", status: "Planned" },
            { city: "Toronto", region: "Ontario", status: "Planned" },
            { city: "Muskoka", region: "Ontario", status: "Planned" },
            { city: "Montreal", region: "Quebec", status: "Planned" },
            { city: "Niagara-on-the-Lake", region: "Ontario", status: "Planned" },
            { city: "Halifax", region: "Nova Scotia", status: "Planned" },
          ].map((c, i) => (
            <div key={i} style={{
              border: `1px solid ${COLORS.border}`,
              borderRadius: 4,
              padding: "16px 18px",
              background: c.status === "In Progress" ? COLORS.mint : COLORS.white,
              borderColor: c.status === "In Progress" ? COLORS.forest : COLORS.border,
            }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: COLORS.forest, marginBottom: 3 }}>{c.city}</div>
              <div style={{ fontFamily: "'Jost', sans-serif", fontSize: 11, color: COLORS.sub, letterSpacing: 1, marginBottom: 8 }}>{c.region}</div>
              <div style={{
                display: "inline-block",
                fontFamily: "'Jost', sans-serif",
                fontSize: 10,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: c.status === "In Progress" ? COLORS.forest : COLORS.sandstone,
                background: c.status === "In Progress" ? "rgba(44,74,62,0.1)" : "rgba(196,149,106,0.1)",
                padding: "3px 10px",
                borderRadius: 20,
              }}>{c.status}</div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 13, color: COLORS.sub, fontStyle: "italic" }}>
          Want to be notified when your city launches? Send us a message below and we will add you to the list.
        </p>
      </div>

      <div className="landing-divider" />
      <h2 className="contact-title">Get in Touch</h2>
      <p className="contact-sub">Whether you are interested in purchasing the guide, want to be added as a vendor, or simply have a question — we would love to hear from you.</p>

      {submitted ? (
        <div className="form-success">
          ✦ Thank you — your message has been received. We will be in touch shortly.
        </div>
      ) : (
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Name</label>
              <input className="form-input" type="text" placeholder="Your name" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input className="form-input" type="email" placeholder="your@email.com" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">I am inquiring about</label>
            <select className="form-select" required value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
              <option value="">Select an option</option>
              <option value="purchase">Purchase the guide</option>
              <option value="vendor">Add or update a vendor listing</option>
              <option value="updates">Notify me of updates</option>
              <option value="city">Notify me when my city launches</option>
              <option value="general">General inquiry</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Message</label>
            <textarea className="form-textarea" placeholder="Tell us a little more..." required value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
          </div>
          {error && (
            <p style={{ fontSize: 13, color: "#c0392b", fontStyle: "italic" }}>{error}</p>
          )}
          <button type="submit" className="form-btn" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      )}
    </div>
  );
}

function LockScreen({ onUnlock }) {
  const [purchasing, setPurchasing] = useState(false);
  const [purchaseError, setPurchaseError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", email: "" });

  async function handlePurchase(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;
    setPurchasing(true);
    setPurchaseError("");
    try {
      const res = await fetch("/.netlify/functions/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, isGift: false }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setPurchaseError("Something went wrong. Please try again.");
      }
    } catch (err) {
      setPurchaseError("Something went wrong. Please check your connection.");
    } finally {
      setPurchasing(false);
    }
  }

  return (
    <div className="lock-screen">
      <div style={{ width: 40, height: 1, background: COLORS.sandstone, margin: "0 auto 28px" }} />
      <h2 className="lock-title">Unlock the Full Guide</h2>
      <p className="lock-sub">Purchase once and get lifetime access to all vendor categories across Calgary, Canmore, and Banff — plus free updates as we grow.</p>
      <div className="lock-features">
        {["36 Venues across Calgary, Canmore & Banff", "9 Caterers", "7 Florists", "8 Bakers & Desserts", "5 Photographers", "4 Mobile Bar Services", "Wedding Dress Boutiques", "Budget Planning Guide", "60-Task Planning Checklist"].map((f, i) => (
          <span key={i} className="lock-feature-tag">{f}</span>
        ))}
      </div>
      <div style={{ textAlign: "center", margin: "32px 0 8px" }}>
        <div style={{ display: "inline-block", background: COLORS.sandstone, color: COLORS.white, fontFamily: "'Jost', sans-serif", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", padding: "4px 14px", borderRadius: 20, marginBottom: 16 }}>
          Launch Price — Limited Time
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 8 }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 52, fontWeight: 600, color: COLORS.forest, lineHeight: 1 }}>$29</div>
          <div style={{ textAlign: "left" }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: COLORS.sub, textDecoration: "line-through" }}>$49</div>
            <div style={{ fontFamily: "'Jost', sans-serif", fontSize: 10, letterSpacing: 1, color: COLORS.sub }}>Regular price</div>
          </div>
        </div>
        <div style={{ fontFamily: "'Jost', sans-serif", fontSize: 11, letterSpacing: 1, color: COLORS.sub }}>CAD · One-time purchase · Lifetime access</div>
      </div>

      {!showForm ? (
        <button className="lock-btn" onClick={() => setShowForm(true)}>Purchase the Guide — $29</button>
      ) : (
        <form onSubmit={handlePurchase} style={{ width: "100%", maxWidth: 360, margin: "0 auto", display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="form-group">
            <label className="form-label">Your Name</label>
            <input className="form-input" type="text" placeholder="Your name" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
          </div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input className="form-input" type="email" placeholder="your@email.com" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
            <p style={{ fontSize: 11, color: COLORS.sub, marginTop: 4, fontStyle: "italic" }}>Your unique access code will be sent here after purchase.</p>
          </div>
          {purchaseError && <p style={{ fontSize: 13, color: "#c0392b", fontStyle: "italic" }}>{purchaseError}</p>}
          <button type="submit" className="lock-btn" disabled={purchasing} style={{ marginTop: 8 }}>
            {purchasing ? "Redirecting to checkout..." : "Continue to Payment — $29"}
          </button>
          <button type="button" onClick={() => setShowForm(false)} style={{ background: "none", border: "none", fontFamily: "'Jost', sans-serif", fontSize: 11, color: COLORS.sub, cursor: "pointer", letterSpacing: 1 }}>Cancel</button>
        </form>
      )}

      <p className="lock-note">Already purchased? Enter your access code in the nav bar.</p>
    </div>
  );
}

function PasswordGate({ onSuccess }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const GUIDE_PASSWORD = "rockies2025";

  function handleSubmit(e) {
    e.preventDefault();
    if (input.trim().toLowerCase() === GUIDE_PASSWORD) {
      onSuccess();
    } else {
      setError(true);
      setInput("");
      setTimeout(() => setError(false), 3000);
    }
  }

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(44,74,62,0.96)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 1000, padding: 24
    }}>
      <div style={{
        background: COLORS.white, borderRadius: 4, padding: "56px 48px",
        maxWidth: 440, width: "100%", textAlign: "center"
      }}>
        <div style={{ width: 40, height: 1, background: COLORS.sandstone, margin: "0 auto 28px" }} />
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 400, color: COLORS.forest, marginBottom: 12 }}>
          Welcome Back
        </h2>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontStyle: "italic", color: COLORS.sub, marginBottom: 36, lineHeight: 1.6 }}>
          Enter your guide password to access the full Canadian Rockies Edition.
        </p>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <input
            type="password"
            placeholder="Enter password"
            value={input}
            onChange={e => setInput(e.target.value)}
            autoFocus
            style={{
              fontFamily: "'Jost', sans-serif", fontSize: 15,
              padding: "14px 18px", border: `1px solid ${error ? "#c0392b" : COLORS.border}`,
              borderRadius: 3, outline: "none", textAlign: "center",
              letterSpacing: 4, color: COLORS.text, width: "100%",
              transition: "border-color 0.2s"
            }}
          />
          {error && (
            <p style={{ fontSize: 13, color: "#c0392b", fontStyle: "italic", margin: 0 }}>
              Incorrect password. Please try again.
            </p>
          )}
          <button type="submit" style={{
            background: COLORS.forest, color: COLORS.cream,
            fontFamily: "'Jost', sans-serif", fontSize: 11,
            fontWeight: 500, letterSpacing: 3, textTransform: "uppercase",
            padding: "16px 32px", border: "none", borderRadius: 2,
            cursor: "pointer", transition: "background 0.2s"
          }}>
            Unlock Guide
          </button>
        </form>
        <p style={{ marginTop: 24, fontSize: 12, color: COLORS.sub, lineHeight: 1.6 }}>
          Don't have a password yet?{" "}
          <span style={{ color: COLORS.sandstone, textDecoration: "underline", cursor: "pointer", textUnderlineOffset: 3 }}
            onClick={() => document.querySelector('.guide-wrap') && window.scrollTo(0,0)}>
            Purchase the guide
          </span>{" "}to receive instant access.
        </p>
      </div>
    </div>
  );
}

// ── SVG ICONS ────────────────────────────────────────────────────────────────
function Icon({ name, color, size }) {
  size = size || 20;
  const props = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: "1.2", strokeLinecap: "round", strokeLinejoin: "round" };
  if (name === "budget") return <svg {...props}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
  if (name === "venues") return <svg {...props}><path d="M3 22V9l9-7 9 7v13"/><path d="M9 22V16h6v6"/><path d="M3 9h18"/></svg>;
  if (name === "catering") return <svg {...props}><path d="M3 17h18"/><path d="M3 17c0-4 2-7 9-7s9 3 9 7"/><path d="M12 10V6"/><circle cx="12" cy="5" r="1"/></svg>;
  if (name === "bar") return <svg {...props}><path d="M8 22h8"/><path d="M12 11v11"/><path d="M5 3l2 8h10l2-8z"/><path d="M5 3h14"/></svg>;
  if (name === "photo") return <svg {...props}><rect x="2" y="6" width="20" height="14" rx="2"/><circle cx="12" cy="13" r="3.5"/><path d="M8 6l2-3h4l2 3"/></svg>;
  if (name === "florists") return <svg {...props}><path d="M12 22V12"/><circle cx="12" cy="8" r="3"/><path d="M9 8c0-3-2-5-5-5 0 3 2 5 5 5"/><path d="M15 8c0-3 2-5 5-5 0 3-2 5-5 5"/><path d="M9 8c0 3-2 5-5 5 0-3 2-5 5-5"/><path d="M15 8c0 3 2 5 5 5 0-3-2-5-5-5"/></svg>;
  if (name === "cakes") return <svg {...props}><path d="M2 19h20v2H2z"/><path d="M4 19v-6h16v6"/><path d="M6 13v-4h12v4"/><path d="M8 9V7h8v2"/><path d="M12 7V4"/><path d="M10 4c0-1.1.9-2 2-2s2 .9 2 2"/></svg>;
  if (name === "dresses") return <svg {...props}><path d="M12 2l-4 6h8l-4-6z"/><path d="M8 8l-5 14h18L16 8"/><path d="M8 8h8"/></svg>;
  if (name === "coming") return <svg {...props}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>;
  if (name === "checklist") return <svg {...props}><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>;
  if (name === "story") return <svg {...props}><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>;
  return null;
}

const guideItems = [
  { id: "budget", label: "Budget Guide", icon: "budget" },
  { id: "tracker", label: "Budget Tracker", icon: "budget" },
  { id: "venues", label: "Venues", icon: "venues" },
  { id: "catering", label: "Catering", icon: "catering" },
  { id: "bar", label: "Mobile Bar", icon: "bar" },
  { id: "photo", label: "Photography", icon: "photo" },
  { id: "florists", label: "Florists", icon: "florists" },
  { id: "cakes", label: "Cakes & Desserts", icon: "cakes" },
  { id: "dresses", label: "Wedding Dresses", icon: "dresses" },
  { id: "coming", label: "On Our Radar", icon: "coming" },
];

export default function App() {
  const [region, setRegion] = useState(null);
  const [activeTab, setActiveTab] = useState("home");
  const [unlocked, setUnlocked] = useState(false);
  const [showPasswordGate, setShowPasswordGate] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const meta = sectionMeta[activeTab] || sectionMeta["home"];
  const isLocked = tabs.find(t => t.id === activeTab)?.locked;

  function handleTabClick(tab) {
    if (tab.locked && !unlocked) {
      setShowPasswordGate(true);
    } else {
      setActiveTab(tab.id);
    }
    setShowMobileMenu(false);
  }

  function handleUnlock() {
    setUnlocked(true);
    setShowPasswordGate(false);
  }

  // ── REGION SELECTOR ─────────────────────────────────────────
  if (!region) {
    return (
      <>
        <style>{styles}</style>
        <style>{`
          .region-wrap {
            min-height: 100vh;
            background: ${COLORS.forest};
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 48px 24px;
            position: relative;
            overflow: hidden;
          }
          .region-wrap::before {
            content: '';
            position: absolute;
            inset: 0;
            background:
              radial-gradient(ellipse at 20% 20%, rgba(196,149,106,0.12) 0%, transparent 55%),
              radial-gradient(ellipse at 80% 80%, rgba(139,105,20,0.08) 0%, transparent 50%);
          }
          .region-eyebrow {
            font-family: 'Jost', sans-serif;
            font-size: 11px;
            letter-spacing: 4px;
            text-transform: uppercase;
            color: ${COLORS.sandstone};
            margin-bottom: 20px;
            position: relative;
          }
          .region-title {
            font-family: 'Cormorant Garamond', serif;
            font-size: 56px;
            font-weight: 400;
            color: ${COLORS.cream};
            text-align: center;
            line-height: 1.05;
            margin-bottom: 8px;
            position: relative;
          }
          .region-title span { color: ${COLORS.sandstone}; font-style: italic; }
          .region-sub {
            font-family: 'Cormorant Garamond', serif;
            font-size: 20px;
            font-style: italic;
            color: rgba(247,243,236,0.65);
            text-align: center;
            margin-bottom: 56px;
            max-width: 520px;
            line-height: 1.6;
            position: relative;
          }
          .region-divider {
            width: 48px;
            height: 1px;
            background: ${COLORS.sandstone};
            margin: 0 auto 56px;
            opacity: 0.5;
            position: relative;
          }
          .region-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 20px;
            width: 100%;
            max-width: 900px;
            position: relative;
          }
          .region-card {
            background: rgba(247,243,236,0.05);
            border: 1px solid rgba(196,149,106,0.25);
            border-radius: 4px;
            padding: 36px 32px;
            cursor: pointer;
            transition: all 0.25s;
            position: relative;
            overflow: hidden;
          }
          .region-card::before {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg, rgba(196,149,106,0.08) 0%, transparent 60%);
            opacity: 0;
            transition: opacity 0.25s;
          }
          .region-card:hover { border-color: ${COLORS.sandstone}; transform: translateY(-3px); box-shadow: 0 12px 40px rgba(0,0,0,0.2); }
          .region-card:hover::before { opacity: 1; }
          .region-card.available { border-color: rgba(196,149,106,0.5); background: rgba(196,149,106,0.08); }
          .region-card.coming { opacity: 0.75; cursor: default; }
          .region-card.coming:hover { transform: none; box-shadow: none; border-color: rgba(196,149,106,0.25); }
          .region-badge {
            display: inline-block;
            font-family: 'Jost', sans-serif;
            font-size: 9px;
            letter-spacing: 3px;
            text-transform: uppercase;
            padding: 4px 12px;
            border-radius: 20px;
            margin-bottom: 20px;
          }
          .region-badge.available { background: ${COLORS.sandstone}; color: ${COLORS.forest}; }
          .region-badge.coming { background: rgba(247,243,236,0.1); color: rgba(247,243,236,0.5); border: 1px solid rgba(247,243,236,0.15); }
          .region-name {
            font-family: 'Cormorant Garamond', serif;
            font-size: 30px;
            font-weight: 500;
            color: ${COLORS.cream};
            margin-bottom: 6px;
            line-height: 1.1;
          }
          .region-cities {
            font-family: 'Jost', sans-serif;
            font-size: 11px;
            letter-spacing: 1.5px;
            color: ${COLORS.sandstone};
            margin-bottom: 16px;
          }
          .region-desc {
            font-family: 'Cormorant Garamond', serif;
            font-size: 16px;
            font-style: italic;
            color: rgba(247,243,236,0.55);
            line-height: 1.6;
            margin-bottom: 20px;
          }
          .region-cta {
            font-family: 'Jost', sans-serif;
            font-size: 11px;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: ${COLORS.sandstone};
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .region-notify {
            display: inline-block;
            margin-top: 12px;
            font-family: 'Jost', sans-serif;
            font-size: 10px;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: rgba(247,243,236,0.4);
            border: 1px solid rgba(247,243,236,0.15);
            padding: 6px 16px;
            border-radius: 2px;
            cursor: pointer;
            transition: all 0.2s;
            background: none;
          }
          .region-notify:hover { color: rgba(247,243,236,0.7); border-color: rgba(247,243,236,0.3); }
          .region-footer {
            margin-top: 56px;
            font-family: 'Jost', sans-serif;
            font-size: 11px;
            letter-spacing: 2px;
            color: rgba(247,243,236,0.25);
            position: relative;
          }
          @media (max-width: 640px) {
            .region-title { font-size: 38px; }
            .region-grid { grid-template-columns: 1fr; }
          }
        `}</style>
        <div className="region-wrap">
          <div className="region-eyebrow">The Ultimate Wedding Guide</div>
          <h1 className="region-title">Your dream wedding<br /><span>starts here.</span></h1>
          <p className="region-sub">We have done the research, vetted the vendors, and organized everything — select your region and let's get planning.</p>
          <div className="region-divider" />

          <div className="region-grid">
            {/* AVAILABLE */}
            <div className="region-card available" onClick={() => setRegion("rockies")}>
              <div className="region-badge available">Available Now</div>
              <div style={{ marginBottom: 16 }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C4956A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                  <circle cx="12" cy="9" r="2.5"/>
                </svg>
              </div>
              <div className="region-name">Canadian Rockies</div>
              <div className="region-cities">Calgary · Canmore · Banff</div>
              <div className="region-desc">36 venues, 9 caterers, 7 florists, photographers, bakers, mobile bars and more — all vetted and ready.</div>
              <div className="region-cta">Explore the Guide →</div>
            </div>

            {/* COMING SOON */}
            {[
              { name: "Vancouver & Sea-to-Sky", cities: "Vancouver · Whistler · Squamish", desc: "From waterfront venues to mountain lodges — the ultimate guide to BC coastal weddings." },
              { name: "Okanagan", cities: "Kelowna · Penticton · Vernon", desc: "Vineyard ceremonies, orchard receptions, and stunning lake views — wine country weddings done right." },
              { name: "Toronto & Surroundings", cities: "Toronto · Muskoka · Niagara", desc: "Grand ballrooms, intimate restaurants, and lakeside escapes across Ontario's best wedding destinations." },
              { name: "Montreal", cities: "Montreal · Quebec City", desc: "Old world charm meets modern sophistication — francophone Canada's most romantic wedding destinations." },
              { name: "Ottawa", cities: "Ottawa · Gatineau", desc: "Canada's capital offers stunning heritage venues, beautiful gardens, and an intimate wedding scene." },
            ].map((r, i) => (
              <div key={i} className="region-card coming">
                <div className="region-badge coming">Coming Soon</div>
                <div style={{ marginBottom: 16 }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(196,149,106,0.4)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                    <circle cx="12" cy="9" r="2.5"/>
                  </svg>
                </div>
                <div className="region-name">{r.name}</div>
                <div className="region-cities">{r.cities}</div>
                <div className="region-desc">{r.desc}</div>
                <button className="region-notify" onClick={e => { e.stopPropagation(); setRegion("rockies"); setTimeout(() => { document.querySelector('.contact-form select')?.focus(); }, 500); }}>
                  Notify Me When Live
                </button>
              </div>
            ))}
          </div>

          <div className="region-footer">© {new Date().getFullYear()} The Ultimate Wedding Guide · info@ultimateweddingguide.ca</div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>
      {showPasswordGate && <PasswordGate onSuccess={handleUnlock} />}
      <div className="guide-wrap">
        {/* COVER */}
        <div className="cover">
          <div className="cover-title">The Ultimate<br /><span>Wedding Guide</span></div>
          <div className="cover-divider" />
          <div className="cover-cities">Canadian Rockies Edition</div>
          <div className="cover-subtitle" style={{marginTop: 12, fontSize: 14, letterSpacing: 3}}>Calgary  ·  Canmore  ·  Banff</div>
          <div className="cover-subtitle">Your complete planning resource for an unforgettable Rocky Mountain wedding</div>
        </div>

        {/* NAV */}
        <nav className="nav" style={{ position: "relative" }}>

          {/* DESKTOP NAV */}
          <div className="nav-desktop">
            <div className="nav-item">
              <button className="nav-btn" onClick={() => setRegion(null)} style={{ opacity: 0.5, fontSize: 10, letterSpacing: 2 }}>← All Editions</button>
            </div>
            <div className="nav-item">
              <button className={`nav-btn ${activeTab === "home" ? "active" : ""}`} onClick={() => setActiveTab("home")}>Home</button>
            </div>
            <div className="nav-item">
              <button className={`nav-btn ${activeTab === "why" ? "active" : ""}`} onClick={() => setActiveTab("why")}>Our Story</button>
            </div>
            <div className="nav-item">
              <button className={`nav-btn ${activeTab === "checklist" ? "active" : ""}`} onClick={() => setActiveTab("checklist")}>Free Checklist</button>
            </div>
            <div className="nav-item">
              <button className={`nav-btn ${guideItems.map(i=>i.id).includes(activeTab) ? "active" : ""}`}>
                The Guide <span className="nav-arrow">▼</span>
              </button>
              <div className="dropdown">
                {guideItems.map(item => (
                  <button key={item.id} className={`dropdown-item ${activeTab === item.id ? "active" : ""}`}
                    onClick={() => { const tab = tabs.find(t => t.id === item.id); handleTabClick(tab); }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Icon name={item.icon} color={activeTab === item.id ? COLORS.forest : COLORS.sandstone} size={15} />
                      {item.label}
                    </span>
                    {!unlocked && <span className="lock-dot" />}
                  </button>
                ))}
              </div>
            </div>
            <button className="nav-gift-btn" onClick={() => { setActiveTab("home"); setTimeout(() => document.querySelector(".gift-section")?.scrollIntoView({ behavior: "smooth" }), 100); }}>
              Gift the Guide
            </button>
            {unlocked && (
              <button className="nav-lock-btn" onClick={() => { setUnlocked(false); setActiveTab("home"); }}>Lock</button>
            )}
          </div>

          {/* MOBILE NAV */}
          <div className="nav-mobile" style={{ width: "100%", alignItems: "center", justifyContent: "space-between" }}>
            <button className={`nav-btn ${activeTab === "home" ? "active" : ""}`} style={{ padding: "16px 8px" }} onClick={() => { setActiveTab("home"); setShowMobileMenu(false); }}>Home</button>
            <button className="nav-gift-btn" style={{ margin: "0 8px" }} onClick={() => { setActiveTab("home"); setShowMobileMenu(false); setTimeout(() => document.querySelector(".gift-section")?.scrollIntoView({ behavior: "smooth" }), 100); }}>
              Gift the Guide
            </button>
            <button className={`hamburger-btn ${showMobileMenu ? "open" : ""}`} onClick={() => setShowMobileMenu(!showMobileMenu)}>
              <span /><span /><span />
            </button>
          </div>

          {/* MOBILE DROPDOWN MENU */}
          {showMobileMenu && (
            <div className="mobile-menu">
              <button className="mobile-menu-item" style={{ opacity: 0.5, fontSize: 10 }} onClick={() => { setRegion(null); setShowMobileMenu(false); }}>← All Editions</button>
              <div className="mobile-menu-divider" />
              <button className="mobile-menu-item" onClick={() => { setActiveTab("why"); setShowMobileMenu(false); }}>Our Story</button>
              <button className="mobile-menu-item" onClick={() => { setActiveTab("checklist"); setShowMobileMenu(false); }}>Free Checklist</button>
              <div className="mobile-menu-divider" />
              <div className="mobile-menu-section">The Guide</div>
              {guideItems.map(item => (
                <button key={item.id} className={`mobile-menu-item ${activeTab === item.id ? "active" : ""}`}
                  onClick={() => { const tab = tabs.find(t => t.id === item.id); handleTabClick(tab); }}
                  style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <Icon name={item.icon} color="rgba(196,149,106,0.7)" size={14} />
                  {item.label} {!unlocked && "·"}
                </button>
              ))}
              {unlocked && (
                <>
                  <div className="mobile-menu-divider" />
                  <button className="mobile-menu-item" style={{ opacity: 0.4 }} onClick={() => { setUnlocked(false); setActiveTab("home"); setShowMobileMenu(false); }}>Lock Guide</button>
                </>
              )}
            </div>
          )}
        </nav>

        {/* OUR STORY */}
        {activeTab === "why" && (
          <div className="content">
            <div className="section-eyebrow">Behind the Guide</div>
            <h1 className="section-title" style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <Icon name="story" color={COLORS.sandstone} size={36} />
              Our Story
            </h1>
            <div style={{ maxWidth: 620 }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 400, fontStyle: "italic", color: COLORS.forest, lineHeight: 1.6, marginBottom: 32 }}>
                "Planning a wedding should be one of the most joyful experiences of your life. I created this guide because I watched someone I love go through the opposite."
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: COLORS.text, marginBottom: 24 }}>
                Last summer, my close friend got married. She and her husband were so excited — and they deserved every bit of that excitement. But almost immediately, the planning process started to chip away at it. Every week brought a new curveball. Vendors were hard to find, harder to compare, and nearly impossible to vet without spending hours online. Their planner wasn't providing the relief they had hoped for. Arguments became a daily occurrence. The joy of being engaged was getting buried under the weight of logistics.
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: COLORS.text, marginBottom: 24 }}>
                I watched two people who love each other deeply get worn down by a process that should have felt exciting. And I kept thinking — someone should fix this. Someone should do the research, compile the vendors, organize the information, and hand it to couples so they can just breathe and enjoy being engaged.
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: COLORS.text, marginBottom: 24 }}>
                So I did.
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: COLORS.text, marginBottom: 24 }}>
                The Ultimate Wedding Guide — Canadian Rockies Edition is built for couples who want to feel relief, excitement, and ease when they think about their wedding — not dread. It is for the bride who opens her laptop to research venues and immediately feels overwhelmed. It is for the couple who just wants someone to tell them where to start. We have done the Googling, made the calls, vetted the vendors, and organized everything into one beautiful resource — so you can close the laptop, pour a glass of wine, and actually enjoy this season of your life.
              </p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontStyle: "italic", color: COLORS.forest, lineHeight: 1.7, marginBottom: 4 }}>
                Congratulations on your engagement. All the best,
              </p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontStyle: "italic", color: COLORS.forest, marginBottom: 40 }}>
                Nadia
              </p>
              <div style={{
                background: COLORS.forest,
                borderRadius: 4,
                padding: "32px 36px",
                marginBottom: 40,
              }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontStyle: "italic", color: COLORS.cream, lineHeight: 1.7, marginBottom: 20 }}>
                  "You deserve to feel excited about every single part of planning your wedding. That feeling is exactly what this guide was made to give you."
                </p>
                <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 12, letterSpacing: 3, color: COLORS.sandstone, textTransform: "uppercase" }}>
                  — The Ultimate Wedding Guide
                </p>
              </div>
              <div style={{ borderTop: `1px solid ${COLORS.border}`, paddingTop: 32 }}>
                <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: COLORS.sandstone, marginBottom: 12 }}>
                  Ready to start?
                </p>
                <button
                  className="form-btn"
                  onClick={() => setActiveTab("checklist")}
                  style={{ marginRight: 16, marginBottom: 32 }}
                >
                  Try the Free Checklist
                </button>
              </div>
            </div>
          </div>
        )}

        {/* HOME */}
        {activeTab === "home" && <LandingPage />}

        {/* FREE CHECKLIST */}
        {activeTab === "checklist" && (
          <div className="content">
            <div className="section-eyebrow">{sectionMeta.checklist.eyebrow}</div>
            <h1 className="section-title" style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <Icon name="checklist" color={COLORS.sandstone} size={36} />
              {sectionMeta.checklist.title}
            </h1>
            <p className="section-lead">{sectionMeta.checklist.lead}</p>
            <Checklist />
          </div>
        )}

        {/* LOCKED */}
        {isLocked && !unlocked && <LockScreen onUnlock={() => setShowPasswordGate(true)} />}

        {/* UNLOCKED CONTENT */}
        {isLocked && unlocked && (
          <div className="content">
            <div className="section-eyebrow">{meta.eyebrow}</div>
            <h1 className="section-title" style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <Icon name={meta.icon} color={COLORS.sandstone} size={36} />
              {meta.title}
            </h1>
            {meta.lead && <p className="section-lead">{meta.lead}</p>}
            {activeTab === "budget" && <BudgetGuide />}
            {activeTab === "tracker" && <BudgetTracker />}
            {activeTab === "venues" && (
            <>
              <VenueSection sections={venueData} />
              <div style={{ marginTop: 48 }}>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 28, fontWeight: 500,
                  color: COLORS.gold,
                  paddingBottom: 12,
                  borderBottom: `1px solid ${COLORS.border}`,
                  marginBottom: 16,
                }}>
                  Churches & Chapels
                </div>
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 17, fontStyle: "italic",
                  color: COLORS.sub, marginBottom: 28, lineHeight: 1.6
                }}>
                  For couples planning a religious or spiritual ceremony, Calgary and surrounding area offer a range of beautiful churches and chapels — from grand downtown cathedrals to intimate country chapels.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {churchData.map((c, i) => (
                    <div key={i} style={{
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: 4,
                      overflow: "hidden",
                      background: COLORS.white,
                    }}>
                      <div style={{
                        background: COLORS.parchment,
                        padding: "14px 22px",
                        borderBottom: `1px solid ${COLORS.border}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: 8,
                      }}>
                        <span style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: 22, fontWeight: 600,
                          color: COLORS.forest,
                        }}>{c.name}</span>
                        <a href={c.link} target="_blank" rel="noopener noreferrer" style={{
                          fontFamily: "'Jost', sans-serif",
                          fontSize: 11, letterSpacing: 1,
                          color: COLORS.sandstone,
                          textDecoration: "underline",
                          textUnderlineOffset: 3,
                        }}>{c.url}</a>
                      </div>
                      <div style={{ padding: "14px 22px" }}>
                        <p style={{ fontSize: 14, color: COLORS.text, lineHeight: 1.6 }}>{c.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

            {activeTab === "catering" && (
            <SimpleVendors
              vendors={cateringData}
              infoTitle="Good to Know"
              infoItems={[
                "Always confirm whether full service includes setup, serving staff, and cleanup.",
                "Check if the caterer is licensed to serve alcohol or if you need a separate bar service.",
                "For 52 North, Pine and Pond, and The Heritage Centre, outside catering is required.",
              ]}
            />
          )}

            {activeTab === "bar" && (
            <>
              <div className="info-box">
                <div className="info-box-title">Alberta Liquor Licensing — What You Need to Know</div>
                <ul>
                  <li>Couples need a Special Event Licence from AGLC for private events — just $25 at aglc.ca.</li>
                  <li>Most mobile bars cannot supply alcohol under AGLC rules, but staff are ProServe certified to serve it.</li>
                  <li>You can supply your own alcohol, or many services will purchase and deliver it on your behalf.</li>
                  <li>Some venues (like 52 North) require a specific bar service — always confirm with your venue first.</li>
                </ul>
              </div>
              <div className="vendor-grid" style={{ marginTop: 24 }}>
                {barData.map((v, i) => <VendorCard key={i} vendor={v} />)}
              </div>
              <div className="pending">
                <div className="pending-title">On our radar — additional mobile bar services</div>
                <div className="pending-list">
                  {barPending.map((p, i) => <span key={i} className="pending-tag">{p}</span>)}
                </div>
              </div>
            </>
          )}

            {activeTab === "photo" && (
            <SimpleVendors
              vendors={photoData}
              pending={photoPending}
              pendingLabel="On our radar — additional photographers & videographers"
              infoTitle="Questions to Ask Every Photographer"
              infoItems={[
                "Do you have a permit to shoot inside Banff National Park? Not all photographers do.",
                "Are travel fees included for Canmore and Banff locations?",
                "How long until our photos and videos are delivered?",
                "Do you include a second shooter?",
                "Can we see a full wedding gallery — not just highlight images?",
              ]}
            />
          )}

            {activeTab === "florists" && (
            <SimpleVendors
              vendors={floristData}
              pending={floristPending}
              pendingLabel="On our radar — additional florists"
              infoTitle="Planning Tips for Wedding Florals"
              infoItems={[
                "Book your florist 6–12 months in advance for peak season (June–September).",
                "For micro-weddings and elopements, look for florists offering à la carte menus with no minimums.",
                "Ask about locally grown Alberta blooms — available seasonally and a beautiful regional touch.",
                "Always confirm travel fees for Canmore and Banff before signing a contract.",
              ]}
            />
          )}

            {activeTab === "cakes" && (
            <SimpleVendors
              vendors={cakeData}
              pending={cakePending}
              pendingLabel="On our radar — additional bakers"
              infoTitle="Planning Tips for Wedding Cakes"
              infoItems={[
                "Book your cake 3–6 months in advance; some bakers accommodate shorter timelines.",
                "Check delivery policies carefully — some bakers do not deliver to mountain venues in winter.",
                "Many bakers offer online tasting boxes you can order and try at home before committing.",
                "Consider a dessert table as a beautiful complement or alternative to a traditional tiered cake.",
              ]}
            />
          )}

            {activeTab === "dresses" && (
            <div>
              <div className="info-box">
                <div className="info-box-title">A Note on Wedding Dress Shopping</div>
                <ul>
                  <li>Always book an appointment — Calgary's top boutiques are by appointment only.</li>
                  <li>Allow 4–6 months for made-to-order gowns, plus extra time for alterations.</li>
                  <li>Bring one or two trusted people whose opinion you value — not a crowd.</li>
                  <li>Keep an open mind — the dress you fall in love with may surprise you.</li>
                </ul>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 32 }}>
                {dressData.map((b, i) => (
                  <div key={i} style={{
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: 4,
                    overflow: "hidden",
                    background: COLORS.white,
                    transition: "box-shadow 0.2s",
                  }}>
                    <div style={{ background: COLORS.parchment, padding: "20px 24px", borderBottom: `1px solid ${COLORS.border}` }}>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 600, color: COLORS.forest, marginBottom: 4 }}>{b.name}</div>
                    </div>
                    <div style={{ padding: "16px 24px", display: "flex", flexDirection: "column", gap: 10 }}>
                      <div>
                        <div style={{ fontFamily: "'Jost', sans-serif", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: COLORS.sandstone, marginBottom: 3 }}>Instagram</div>
                        <div style={{ fontSize: 14, color: COLORS.text }}>{b.ig}</div>
                      </div>
                      <div>
                        <div style={{ fontFamily: "'Jost', sans-serif", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: COLORS.sandstone, marginBottom: 3 }}>Website</div>
                        <a href={b.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: 14, color: COLORS.forest, textDecoration: "underline", textUnderlineOffset: 3 }}>{b.url}</a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

            {activeTab === "coming" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {[
                { title: "Calgary — On Our Radar", items: ["Hair & Makeup", "Suit Rentals", "Officiant Services", "Decor & Lighting Rentals", "Transportation", "Music — DJs & Live Bands", "Audio/Visual & Sound Production"] },
                { title: "Canmore & Banff — Coming Next", items: ["Venues", "Catering", "Photography", "Florals", "Cakes & Desserts", "Hair & Makeup", "Music", "Transportation", "Guest Experience & Tourism", "Accommodations"] },
                { title: "Permits & Legalities", items: ["Banff National Park Wedding Permits", "AGLC Liquor Licensing", "Marriage Licences in Alberta", "Outdoor Ceremony Regulations"] },
              ].map((section, i) => (
                <div key={i} className="coming-soon">
                  <div className="coming-soon-title">{section.title}</div>
                  <div className="coming-list">
                    {section.items.map((it, ii) => <span key={ii} className="coming-tag">{it}</span>)}
                  </div>
                </div>
              ))}
              <div className="info-box">
                <div className="info-box-title">Stay in the Loop</div>
                <ul>
                  <li>This guide is updated regularly as new vendors are vetted and new sections are added.</li>
                  <li>Purchased this guide and want to be notified of updates? Reach out and we will keep you posted.</li>
                  <li>Have a vendor recommendation? We love hearing from couples — your experience makes this guide better for everyone.</li>
                </ul>
              </div>
            </div>
          )}
        </div>
        )}

        {/* FOOTER */}
        <footer className="site-footer">
          <div className="footer-title">Let's Chat!</div>
          <div className="footer-divider" />
          <div className="footer-label">Contact us via email</div>
          <a href="mailto:info@ultimateweddingguide.ca" className="footer-email">
            info@ultimateweddingguide.ca
          </a>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, marginTop: 20, position: "relative" }}>
            <a href="https://www.instagram.com/ultimateweddingguideca" target="_blank" rel="noopener noreferrer" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, textDecoration: "none" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C4956A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="1" fill="#C4956A" stroke="none"/>
              </svg>
              <span style={{ fontFamily: "'Jost', sans-serif", fontSize: 10, letterSpacing: 2, color: "#C4956A", textTransform: "uppercase" }}>Instagram</span>
            </a>
            <div style={{ width: 1, height: 32, background: "rgba(196,149,106,0.3)", position: "relative" }} />
            <a href="https://ca.pinterest.com/ultimateweddingguideca" target="_blank" rel="noopener noreferrer" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, textDecoration: "none" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C4956A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.65 7.86 6.39 9.29-.09-.78-.17-1.98.04-2.83.18-.77 1.22-5.17 1.22-5.17s-.31-.62-.31-1.54c0-1.45.84-2.53 1.88-2.53.89 0 1.32.67 1.32 1.47 0 .89-.57 2.24-.86 3.48-.25 1.04.51 1.88 1.53 1.88 1.83 0 3.24-1.93 3.24-4.72 0-2.47-1.77-4.19-4.31-4.19-2.93 0-4.65 2.2-4.65 4.47 0 .88.34 1.83.76 2.35.08.1.09.19.07.29-.08.32-.25 1.04-.28 1.18-.04.19-.14.23-.32.14-1.25-.58-2.03-2.42-2.03-3.89 0-3.15 2.29-6.05 6.61-6.05 3.47 0 6.16 2.47 6.16 5.77 0 3.45-2.17 6.22-5.19 6.22-1.01 0-1.97-.53-2.3-1.15l-.62 2.33c-.23.87-.84 1.96-1.25 2.62.94.29 1.94.45 2.97.45 5.52 0 10-4.48 10-10S17.52 2 12 2z"/>
              </svg>
              <span style={{ fontFamily: "'Jost', sans-serif", fontSize: 10, letterSpacing: 2, color: "#C4956A", textTransform: "uppercase" }}>Pinterest</span>
            </a>
          </div>
          <div className="footer-copy">
            © {new Date().getFullYear()} The Ultimate Wedding Guide — Canadian Rockies Edition. All rights reserved.
          </div>
        </footer>

      </div>
    </>
  );
}
