// =============================================================================
// STYLES.JS — All global CSS for The Ultimate Wedding Guide
// Sections: Fonts & Reset · Cover · Nav · Dropdown · Mobile Menu · Footer ·
//           Content · Info Box · Budget · Vendor Cards · Checklist ·
//           Coming Soon · Landing Page · Contact Form · Gift Section ·
//           Gift Modal · Lock Screen · Responsive
// =============================================================================

import { COLORS } from "./constants";

export const styles = `
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
    margin-bottom: 32px;
  }
  .landing-buy-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: ${COLORS.forest};
    color: ${COLORS.cream};
    font-family: 'Jost', sans-serif;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    padding: 16px 36px;
    border: none;
    border-radius: 2px;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s;
    margin-bottom: 10px;
  }
  .landing-buy-btn:hover {
    background: #1e3329;
    transform: translateY(-1px);
  }
  .landing-buy-note {
    font-family: 'Jost', sans-serif;
    font-size: 11px;
    letter-spacing: 1px;
    color: ${COLORS.sub};
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
