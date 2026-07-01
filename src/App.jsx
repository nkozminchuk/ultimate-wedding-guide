// =============================================================================
// APP.JSX — The Ultimate Wedding Guide
// All vendor data lives in src/data/. All CSS lives in src/styles.js.
// All shared constants (COLORS, tabs, sectionMeta) live in src/constants.js.
//
// TO ADD A NEW CITY (e.g. Vancouver):
//   1. Create src/data/vancouver-venues.js etc.
//   2. Import below in the DATA IMPORTS section
//   3. Add new tab IDs to tabs[] in constants.js
//   4. Add sectionMeta entries in constants.js
//   5. Add tab rendering blocks in the UNLOCKED CONTENT section below
//
// TO DEPLOY: Edit this file in GitHub → commit → Netlify auto-rebuilds (2–3 min)
// =============================================================================

import { useState } from "react";

// ── STYLES & CONSTANTS ───────────────────────────────────────────────────────
import { styles } from "./styles";
import { COLORS, tabs, sectionMeta } from "./constants";

// ── DATA IMPORTS ─────────────────────────────────────────────────────────────
import { checklistData } from "./data/checklist";
import { venueData, churchData } from "./data/venues";
import { cateringData } from "./data/catering";
import { barData, barPending } from "./data/bar";
import { photoData, photoPending } from "./data/photo";
import { floristData, floristPending } from "./data/florists";
import { cakeData, cakePending } from "./data/cakes";
import { dressData } from "./data/dresses";
import { hairMakeupData, hairMakeupPending } from "./data/hairandmakeup";
import { rentalData } from "./data/rentals";
import { vancouverVenueData } from "./data/venues-vancouver";
import { vancouverCateringData } from "./data/catering-vancouver";
import { vancouverBarData, vancouverBarPending } from "./data/bar-vancouver";
import { vancouverPhotoData, vancouverPhotoPending } from "./data/photo-vancouver";
import { vancouverFloristData, vancouverFloristPending, vancouverFloristPreservation } from "./data/florists-vancouver";
import { vancouverCakeData, vancouverCakePending } from "./data/cakes-vancouver";
import { vancouverDressData } from "./data/dresses-vancouver";
import { vancouverHairMakeupData, vancouverHairMakeupPending } from "./data/hair-vancouver";
import { vancouverRentalData } from "./data/rentals-vancouver";
import { vancouverPlannerData, vancouverPlannerPending } from "./data/planners-vancouver";
import FindMyMatchVancouver from "./FindMyMatchVancouver";
import FindMyMatch from "./FindMyMatch";
// =============================================================================
// COMPONENTS & APP
// =============================================================================
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
          <li>Peak wedding season runs June through September, so popular venues book 12–18 months in advance.</li>
          <li>Several venues have preferred vendor lists. Ask for these once you book.</li>
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
          <div className="pending-title">{pendingLabel || "On our radar: details coming soon"}</div>
          <div className="pending-list">
            {pending.map((p, i) => <span key={i} className="pending-tag">{p}</span>)}
          </div>
        </div>
      )}
    </div>
  );
}

function ChecklistGate({ onUnlock }) {
  const [form, setForm] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
          inquiry_type: "checklist_access",
          message: "Requested access to the free wedding planning checklist.",
        }),
      });
      if (res.ok) {
        onUnlock();
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
    <div style={{
      maxWidth: 480,
      margin: "0 auto",
      padding: "48px 0 24px",
      textAlign: "center",
    }}>
      <div style={{ width: 40, height: 1, background: "#C4956A", margin: "0 auto 28px" }} />
      <div style={{ fontFamily: "'Jost', sans-serif", fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#C4956A", marginBottom: 12 }}>
        Free Access
      </div>
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 38, fontWeight: 400, color: "#2A1F1A", marginBottom: 12, lineHeight: 1.1 }}>
        Get the Free Checklist
      </h2>
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontStyle: "italic", color: "#6B6B6B", lineHeight: 1.6, marginBottom: 36 }}>
        Enter your name and email to access our 60-task wedding planning checklist, completely free with no purchase required.
      </p>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16, textAlign: "left" }}>
        <div className="form-group">
          <label className="form-label">Your Name</label>
          <input className="form-input" type="text" placeholder="Your name" required
            value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        </div>
        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input className="form-input" type="email" placeholder="your@email.com" required
            value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          <p style={{ fontSize: 11, color: "#6B6B6B", marginTop: 6, fontStyle: "italic" }}>
            We'll occasionally share planning tips and new guide updates. No spam, ever.
          </p>
        </div>
        {error && <p style={{ fontSize: 13, color: "#c0392b", fontStyle: "italic" }}>{error}</p>}
        <button type="submit" className="form-btn" disabled={loading} style={{ alignSelf: "stretch", textAlign: "center" }}>
          {loading ? "One moment..." : "Access the Free Checklist →"}
        </button>
      </form>
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 15, fontStyle: "italic", color: "#6B6B6B", marginTop: 20, lineHeight: 1.6 }}>
        Already have the full guide?{" "}
        <span style={{ color: "#C4956A", cursor: "pointer", textDecoration: "underline", textUnderlineOffset: 3 }}
          onClick={onUnlock}>
          Skip ahead →
        </span>
      </p>
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
        ✦ Your budget data is saved automatically to this device. For access across multiple devices, stay tuned: cloud sync is coming.
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
          <li><strong>$</strong>: Under $15,000 total wedding budget. Elopements, micro-weddings, and intimate gatherings.</li>
          <li><strong>$$</strong>: $15,000–$50,000. Full wedding with complete vendor team, 50–120 guests.</li>
          <li><strong>$$$</strong>: $50,000+. Grand celebrations with premium vendors and 100+ guests.</li>
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
// ── VANCOUVER BUDGET GUIDE ────────────────────────────────────────────────────
// Add this function to App.jsx right after the BudgetGuide() function closes (after line 539)

function VancouverBudgetGuide() {
  const packages = [
    {
      cls: "pkg-$", tier: "$", name: "The Intimate West Coast Wedding", range: "$15,000 - $30,000",
      items: [
        "Venue: Heritage Hall ($700-$3,440), Dr. Sun Yat-Sen Classical Chinese Garden (from $1,050), UBC Botanical Garden (from $1,600), or Fergie's Sunwolf (from $4,200)",
        "Catering: The Yoga Chef, The Rooted Table, or Farawayland Weddings",
        "Photography: Farawayland Weddings (from $1,395), Pear Tree Photography (elopements from $1,750), or DEMIN Photography (from $1,499)",
        "Florals: The Bloomerie (from $275), Garden Party Flowers (no minimum), or Senka Florist (from $185)",
        "Bar: Liquid Assets Professional Bartending or Roaming Spirits (from $750)",
        "Hair & Makeup: MJ Power Makeup (from $490) or AMORE by BEA (from $550)",
        "Best for: Elopements and intimate gatherings under 40 guests",
      ],
    },
    {
      cls: "pkg-$$", tier: "$$", name: "The Classic West Coast Wedding", range: "$30,000 - $80,000",
      items: [
        "Venue: The Permanent ($4,000-$9,000), Stanley Park Pavilion, Pipe Shop ($4,850-$6,150), Pinnacle Hotel at the Pier, VanDusen Botanical Garden, or Furry Creek Golf Club (from $7,999)",
        "Catering: Savoury City Catering, Cocktails & Canapes, Edge Catering, Supper Club YVR (from $90/person), or Left Coast Catering",
        "Photography: Isle and Oak Photography (from $3,200), Beautiful Life Studios (from $3,200), Pear Tree Photography (from $3,800), or Leah Kathryn Photography ($4,000-$6,000)",
        "Florals: Celsia Floral a la carte (from $260), Leis de Buds (from $1,000), Aura Rosa Florals (from $1,000 a la carte), or The Wild Bunch",
        "Bar: Liquid Assets, Sip Social, Roaming Spirits, or Free Pour Brothers",
        "Hair & Makeup: Faye Smith Agency, Bridal Hair Vancouver (from $1,500), Ally Lynn Makeup and Hair (from $895), or Beauty En Route (from $550)",
        "Best for: Full weddings of 50-150 guests with a complete vendor team",
      ],
    },
    {
      cls: "pkg-$$$", tier: "$$$", name: "The West Coast Dream", range: "$80,000+",
      items: [
        "Venue: Fairmont Hotel Vancouver ($150-$300+/person), Fairmont Pacific Rim (from $25,000), JW Marriott Parq Vancouver, The Westin Bayshore, Rosewood Hotel Georgia, or Commodore Ballroom ($17,000 venue + $50,000 F&B)",
        "Catering: Truffles Fine Foods, Savoury Chef Foods, Edge Catering, or Avela Catering and Events",
        "Photography: The Apartment Photography (from $9,900), Tomasz Wagner Photo & Films (from $9,000), or Isle and Oak Photography (from $6,000)",
        "Florals: Celsia Floral Bespoke (from $6,500) or Leis de Buds",
        "Bar: Full hotel bar service at all luxury venues",
        "Hair & Makeup: Faye Smith Agency",
        "Best for: Grand celebrations of 100+ guests with premium vendors and a luxury experience",
      ],
    },
    {
      cls: "pkg-$", tier: "$", name: "The Sea-to-Sky Elopement", range: "$10,000 - $25,000",
      items: [
        "Venue: Fergie's Sunwolf (from $4,200 low season), UBC Botanical Garden Nitobe Garden, or Green Water Resort",
        "Catering: Fergie's in-house catering (at Sunwolf), The Collective Kitchen, or Left Coast Catering",
        "Photography: Farawayland Weddings (from $1,395), Pear Tree Photography (elopements from $1,750), Leah Kathryn Photography (Whistler-based), or DEMIN Photography (from $1,499)",
        "Florals: Senka Florist (from $185, Whistler-based), Aura Rosa Florals (Squamish-based, from $250 Party Packs), or Flowers & Jules",
        "Bar: Liquid Assets or Roaming Spirits",
        "Hair & Makeup: MJ Power Makeup (Whistler travel $150) or Beauty En Route (Whistler coverage)",
        "Best for: Couples who want to escape the city for a mountain or riverside celebration",
      ],
    },
  ];

  return (
    <div>
      <div className="info-box" style={{ marginBottom: 32 }}>
        <div className="info-box-title">How Budget Tiers Work</div>
        <ul>
          <li><strong>$</strong>: Under $30,000 total wedding budget. Elopements, micro-weddings, and intimate gatherings.</li>
          <li><strong>$$</strong>: $30,000-$80,000. Full wedding with complete vendor team, 50-150 guests.</li>
          <li><strong>$$$</strong>: $80,000+. Grand celebrations with premium vendors and 100+ guests.</li>
          <li>Many vendors span two tiers (e.g. $/$$) meaning they serve both budget ranges.</li>
          <li>All prices are approximate and in CAD. Contact vendors directly for current pricing.</li>
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

// ── APP ─────────────────────────────────────────────────────────────────────

// ── NOTIFY MODAL ─────────────────────────────────────────────────────────────
function NotifyModal({ cityName, onClose }) {
  const [form, setForm] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

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
          inquiry_type: "city_notify",
          message: `Please notify me when the ${cityName} edition launches.`,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
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
      <div className="gift-modal" style={{ position: "relative", maxWidth: 440 }}>
        <button className="gift-modal-close" onClick={onClose}>×</button>
        {submitted ? (
          <div style={{ textAlign: "center", padding: "12px 0" }}>
            <div style={{ width: 40, height: 1, background: "#C4956A", margin: "0 auto 24px" }} />
            <h2 className="gift-modal-title">You're on the list!</h2>
            <p className="gift-modal-sub">
              We'll reach out the moment the <strong>{cityName}</strong> edition goes live.
            </p>
            <button className="form-btn" style={{ width: "100%" }} onClick={onClose}>Done</button>
          </div>
        ) : (
          <>
            <div className="gift-modal-eyebrow">Coming Soon</div>
            <h2 className="gift-modal-title">{cityName} Edition</h2>
            <p className="gift-modal-sub">
              Leave your details and we'll notify you the moment this edition launches.
            </p>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div className="form-group">
                <label className="form-label">Your Name</label>
                <input className="form-input" type="text" placeholder="Your name" required
                  value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input className="form-input" type="email" placeholder="your@email.com" required
                  value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              </div>
              {error && <p style={{ fontSize: 13, color: "#c0392b", fontStyle: "italic" }}>{error}</p>}
              <button type="submit" className="form-btn" disabled={loading}>
                {loading ? "Sending..." : "Notify Me When Live"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function GiftModal({ onClose, region }) {
  const [step, setStep] = useState(1);
  const [giftForm, setGiftForm] = useState({ recipientName: "", recipientEmail: "", senderName: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
            <p className="gift-modal-sub">{region === "vancouver"
  ? "The perfect gift for any engaged couple: full vendor directory, budget guide, checklist and more across Vancouver, Squamish & Whistler."
  : "The perfect gift for any engaged couple: full vendor directory, budget guide, checklist and more across Calgary, Canmore & Banff."
}</p>
            <div style={{ textAlign: "center", padding: "24px 0", borderTop: `1px solid ${COLORS.border}`, borderBottom: `1px solid ${COLORS.border}`, margin: "0 0 24px" }}>
              <div style={{ display: "inline-block", background: COLORS.sandstone, color: COLORS.white, fontFamily: "'Jost', sans-serif", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", padding: "4px 14px", borderRadius: 20, marginBottom: 12 }}>
                Launch Price · Limited Time
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
              Continue · $29
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
                  {loading ? "Sending..." : "Send Gift · $29"}
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

function LandingPage({ onBuy, setRegion }) {
  const [form, setForm] = useState({ name: "", email: "", type: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showGift, setShowGift] = useState(false);
  const [showNotify, setShowNotify] = useState(false);
  const [notifyCity, setNotifyCity] = useState("");

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
        We've done the research, vetted the vendors, and organized everything so you can put down the laptop, stop the endless Googling, and actually enjoy being engaged. The Ultimate Wedding Guide, Canadian Rockies Edition, gives you everything you need to plan your dream wedding in Calgary, Canmore, or Banff, all in one beautiful place.
      </p>

      <button className="landing-buy-btn" onClick={onBuy}>
        Buy the Guide · $29
      </button>
      <p className="landing-buy-note">CAD · One-time purchase · Lifetime access</p>

      <div style={{ marginBottom: 16 }}>
        <div className="landing-eyebrow" style={{ marginBottom: 8 }}>What's Inside the Guide</div>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontStyle: "italic", color: COLORS.sub, lineHeight: 1.6 }}>
          Everything you need to plan your Rocky Mountain wedding, researched, vetted, and organized for you.
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
      {showNotify && <NotifyModal cityName={notifyCity} onClose={() => setShowNotify(false)} />}
      <div className="gift-section">
        <div className="gift-eyebrow">Know Someone Getting Married?</div>
        <h2 className="gift-title">Give the Gift of<br /><em>a Dream Wedding</em></h2>
        <p className="gift-desc">The perfect gift for any engaged couple. Help them plan the most important day of their lives without the stress.</p>
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
          The Ultimate Wedding Guide is growing. New city editions are in the works, each one as carefully curated as the one you're reading now.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12, marginBottom: 28 }}>
          {[
            { city: "Vancouver & Sea-to-Sky", region: "British Columbia", status: "Available Now", link: true },
            { city: "Okanagan", region: "British Columbia", status: "In Progress" },
            { city: "Toronto", region: "Ontario", status: "Planned" },
            { city: "Muskoka", region: "Ontario", status: "Planned" },
            { city: "Montreal", region: "Quebec", status: "Planned" },
            { city: "Niagara-on-the-Lake", region: "Ontario", status: "Planned" },
            { city: "Halifax", region: "Nova Scotia", status: "Planned" },
          ].map((c, i) => (
            <div key={i} style={{
              border: `1px solid ${c.status === "In Progress" ? "#2A1F1A" : COLORS.border}`,
              borderRadius: 4,
              padding: "16px 18px",
              background: c.status === "In Progress" ? "#F5EDF0" : "#FFFFFF",
            }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: "#2A1F1A", marginBottom: 3 }}>{c.city}</div>
              <div style={{ fontFamily: "'Jost', sans-serif", fontSize: 11, color: "#6B6B6B", letterSpacing: 1, marginBottom: 8 }}>{c.region}</div>
              <div style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: 10, letterSpacing: 2, textTransform: "uppercase",
                color: c.status === "In Progress" ? "#2A1F1A" : "#C4956A",
                background: c.status === "In Progress" ? "rgba(184,127,160,0.1)" : "rgba(196,149,106,0.1)",
                padding: "3px 10px", borderRadius: 20, marginBottom: 12, display: "block",
              }}>{c.status}</div>
              {c.link ? (
  <button
    onClick={() => { setRegion("vancouver"); }}
    style={{
      width: "100%",
      fontFamily: "'Jost', sans-serif", fontSize: 10, letterSpacing: 2,
      textTransform: "uppercase", color: "#FFFFFF",
      background: "#2A1F1A", border: "1px solid #2A1F1A", borderRadius: 2,
      padding: "7px 12px", cursor: "pointer", transition: "all 0.2s",
    }}
    onMouseOver={e => { e.currentTarget.style.background = "#C4956A"; e.currentTarget.style.borderColor = "#C4956A"; }}
    onMouseOut={e => { e.currentTarget.style.background = "#2A1F1A"; e.currentTarget.style.borderColor = "#2A1F1A"; }}
  >
    View Guide →
  </button>
) : (
  <button
    onClick={() => { setNotifyCity(c.city); setShowNotify(true); }}
    style={{
      width: "100%",
      fontFamily: "'Jost', sans-serif", fontSize: 10, letterSpacing: 2,
      textTransform: "uppercase", color: "#2A1F1A",
      background: "none", border: `1px solid ${COLORS.border}`, borderRadius: 2,
      padding: "7px 12px", cursor: "pointer", transition: "all 0.2s",
    }}
    onMouseOver={e => { e.currentTarget.style.borderColor = "#C4956A"; e.currentTarget.style.color = "#C4956A"; }}
    onMouseOut={e => { e.currentTarget.style.borderColor = COLORS.border; e.currentTarget.style.color = "#2A1F1A"; }}
  >
    Notify Me
  </button>
)}
            </div>
          ))}
        </div>
        <p style={{ fontSize: 13, color: "#6B6B6B", fontStyle: "italic" }}>
          Click any city above to be notified the moment that edition launches.
        </p>
      </div>

      <div className="landing-divider" />
      <h2 className="contact-title">Get in Touch</h2>
      <p className="contact-sub">Whether you are interested in purchasing the guide, want to be added as a vendor, or simply have a question, we would love to hear from you.</p>

      {submitted ? (
        <div className="form-success">
          ✦ Thank you! Your message has been received. We will be in touch shortly.
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

function VancouverLandingPage({ onBuy, setRegion }) {
  const [form, setForm] = useState({ name: "", email: "", type: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showGift, setShowGift] = useState(false);
  const [showNotify, setShowNotify] = useState(false);
  const [notifyCity, setNotifyCity] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("https://formspree.io/f/mykbkojw", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, inquiry_type: form.type, message: form.message }),
      });
      if (res.ok) { setSubmitted(true); } else { setError("Something went wrong. Please try again."); }
    } catch (err) {
      setError("Something went wrong. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }

  const features = [
    { iconKey: "venues", title: "22+ Verified Venues", desc: "From grand Vancouver hotel ballrooms and waterfront spaces to Sea-to-Sky mountain lodges and botanical gardens." },
    { iconKey: "checklist", title: "60-Task Checklist", desc: "Every milestone from engagement to wedding day, beautifully organized." },
    { iconKey: "budget", title: "Budget Planning Guide", desc: "Sample packages from intimate elopements to grand West Coast celebrations." },
    { iconKey: "photo", title: "Photography & More", desc: "Vetted photographers, florists, caterers, bakers, mobile bars, and more." },
    { iconKey: "florists", title: "Sea-to-Sky Coverage", desc: "Nearly every vendor covers Vancouver, Squamish, Whistler, and Pemberton." },
    { iconKey: "cakes", title: "Regularly Updated", desc: "New vendors and sections added as we grow the West Coast Edition." },
  ];

  return (
    <div className="landing">
      <div className="landing-eyebrow">West Coast Edition</div>
      <h1 className="landing-title">Your wedding should feel<br /><em>exciting. Not overwhelming.</em></h1>
      <p className="landing-body">
        We have done the research, vetted the vendors, and organized everything so you can put down the laptop, stop the endless Googling, and actually enjoy being engaged. The Ultimate Wedding Guide, West Coast Edition, gives you everything you need to plan your dream wedding in Vancouver, Squamish, Whistler, or Pemberton.
      </p>

      <button className="landing-buy-btn" onClick={onBuy}>
        Buy the Guide - $29
      </button>
      <p className="landing-buy-note">CAD - One-time purchase - Lifetime access</p>

      <div style={{ marginBottom: 16 }}>
        <div className="landing-eyebrow" style={{ marginBottom: 8 }}>What's Inside the Guide</div>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontStyle: "italic", color: COLORS.sub, lineHeight: 1.6 }}>
          Everything you need to plan your West Coast wedding, researched, vetted, and organized for you.
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

{showGift && <GiftModal onClose={() => setShowGift(false)} region="vancouver" />}      {showNotify && <NotifyModal cityName={notifyCity} onClose={() => setShowNotify(false)} />}
      <div className="gift-section">
        <div className="gift-eyebrow">Know Someone Getting Married?</div>
        <h2 className="gift-title">Give the Gift of<br /><em>a Dream Wedding</em></h2>
        <p className="gift-desc">The perfect gift for any engaged couple. Help them plan the most important day of their lives without the stress.</p>
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

      <div style={{ marginBottom: 56 }}>
        <div className="landing-eyebrow" style={{ marginBottom: 12 }}>Expanding Across Canada</div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 38, fontWeight: 400, color: COLORS.forest, marginBottom: 12, lineHeight: 1.1 }}>
          More Editions <em style={{ fontStyle: "italic", color: COLORS.sandstone }}>Coming Soon</em>
        </h2>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontStyle: "italic", color: COLORS.sub, marginBottom: 32, lineHeight: 1.6, maxWidth: 500 }}>
          The Ultimate Wedding Guide is growing. New city editions are in the works, each one as carefully curated as the one you are reading now.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12, marginBottom: 28 }}>
          {[
            { city: "Canadian Rockies", region: "Alberta", status: "Available Now", link: true },
            { city: "Okanagan", region: "British Columbia", status: "In Progress" },
            { city: "Toronto", region: "Ontario", status: "Planned" },
            { city: "Muskoka", region: "Ontario", status: "Planned" },
            { city: "Montreal", region: "Quebec", status: "Planned" },
            { city: "Niagara-on-the-Lake", region: "Ontario", status: "Planned" },
            { city: "Halifax", region: "Nova Scotia", status: "Planned" },
          ].map((c, i) => (
            <div key={i} style={{
              border: `1px solid ${c.status === "Available Now" ? "#2A1F1A" : COLORS.border}`,
              borderRadius: 4, padding: "16px 18px",
              background: c.status === "Available Now" ? "#F5EDF0" : "#FFFFFF",
            }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: "#2A1F1A", marginBottom: 3 }}>{c.city}</div>
              <div style={{ fontFamily: "'Jost', sans-serif", fontSize: 11, color: "#6B6B6B", letterSpacing: 1, marginBottom: 8 }}>{c.region}</div>
              <div style={{
                fontFamily: "'Jost', sans-serif", fontSize: 10, letterSpacing: 2, textTransform: "uppercase",
                color: c.status === "Available Now" ? "#2A1F1A" : "#C4956A",
                background: c.status === "Available Now" ? "rgba(184,127,160,0.1)" : "rgba(196,149,106,0.1)",
                padding: "3px 10px", borderRadius: 20, marginBottom: 12, display: "block",
              }}>{c.status}</div>
              {c.link ? (
  <button
    onClick={() => { setRegion("rockies"); }}
    style={{
      width: "100%", fontFamily: "'Jost', sans-serif", fontSize: 10, letterSpacing: 2,
      textTransform: "uppercase", color: "#FFFFFF", background: "#2A1F1A",
      border: "1px solid #2A1F1A", borderRadius: 2, padding: "7px 12px", cursor: "pointer",
    }}
    onMouseOver={e => { e.currentTarget.style.background = "#C4956A"; e.currentTarget.style.borderColor = "#C4956A"; }}
    onMouseOut={e => { e.currentTarget.style.background = "#2A1F1A"; e.currentTarget.style.borderColor = "#2A1F1A"; }}
  >
    View Guide →
  </button>
) : c.status !== "Available Now" && (
                <button
                  onClick={() => { setNotifyCity(c.city); setShowNotify(true); }}
                  style={{
                    width: "100%", fontFamily: "'Jost', sans-serif", fontSize: 10, letterSpacing: 2,
                    textTransform: "uppercase", color: "#2A1F1A", background: "none",
                    border: `1px solid ${COLORS.border}`, borderRadius: 2, padding: "7px 12px", cursor: "pointer",
                  }}
                  onMouseOver={e => { e.currentTarget.style.borderColor = "#C4956A"; e.currentTarget.style.color = "#C4956A"; }}
                  onMouseOut={e => { e.currentTarget.style.borderColor = COLORS.border; e.currentTarget.style.color = "#2A1F1A"; }}
                >
                  Notify Me
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="landing-divider" />
      <h2 className="contact-title">Get in Touch</h2>
      <p className="contact-sub">Whether you are interested in purchasing the guide, want to be added as a vendor, or simply have a question, we would love to hear from you.</p>

      {submitted ? (
        <div className="contact-success">
          <div className="success-icon">+</div>
          <p className="success-msg">Thank you! We will be in touch shortly.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label className="form-label">Your Name</label>
            <input className="form-input" type="text" placeholder="Your name" required
              value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input className="form-input" type="email" placeholder="your@email.com" required
              value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">What can we help you with?</label>
            <select className="form-input" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} required>
              <option value="">Select an option</option>
              <option value="purchase">I want to purchase the guide</option>
              <option value="vendor">I want to be added as a vendor</option>
              <option value="gift">I want to gift the guide</option>
              <option value="other">Something else</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Message</label>
            <textarea className="form-textarea" placeholder="Tell us a little more..." required
              value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
          </div>
          {error && <p style={{ fontSize: 13, color: "#c0392b", fontStyle: "italic" }}>{error}</p>}
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
      <p className="lock-sub">Purchase once and get lifetime access to all vendor categories across Calgary, Canmore, and Banff, plus free updates as we grow.</p>
      <div className="lock-features">
        {["36 Venues across Calgary, Canmore & Banff", "9 Caterers", "7 Florists", "8 Bakers & Desserts", "5 Photographers", "4 Mobile Bar Services", "Wedding Dress Boutiques", "Budget Planning Guide", "60-Task Planning Checklist"].map((f, i) => (
          <span key={i} className="lock-feature-tag">{f}</span>
        ))}
      </div>
      <div style={{ textAlign: "center", margin: "32px 0 8px" }}>
        <div style={{ display: "inline-block", background: COLORS.sandstone, color: COLORS.white, fontFamily: "'Jost', sans-serif", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", padding: "4px 14px", borderRadius: 20, marginBottom: 16 }}>
          Launch Price · Limited Time
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
        <button className="lock-btn" onClick={() => setShowForm(true)}>Purchase the Guide · $29</button>
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
            {purchasing ? "Redirecting to checkout..." : "Continue to Payment · $29"}
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
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/.netlify/functions/validate-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: input.trim() }),
      });
      const data = await res.json();
      if (data.valid) {
        onSuccess();
      } else {
        setError(true);
        setInput("");
        setTimeout(() => setError(false), 3000);
      }
    } catch (err) {
      setError(true);
      setInput("");
      setTimeout(() => setError(false), 3000);
    }
    setLoading(false);
  }

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(42,31,26,0.96)",
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
          <button type="submit" disabled={loading} style={{
            background: COLORS.forest, color: COLORS.cream,
            fontFamily: "'Jost', sans-serif", fontSize: 11,
            fontWeight: 500, letterSpacing: 3, textTransform: "uppercase",
            padding: "16px 32px", border: "none", borderRadius: 2,
            cursor: "pointer", transition: "background 0.2s"
          }}>
            {loading ? "Checking..." : "Unlock Guide"}
          </button>
        </form>
        <p style={{ marginTop: 24, fontSize: 12, color: COLORS.sub, lineHeight: 1.6 }}>
          Don't have a password yet?{" "}
         <span style={{ color: COLORS.sandstone, textDecoration: "underline", cursor: "pointer", textUnderlineOffset: 3 }}
  onClick={async () => {
    try {
      const res = await fetch("/.netlify/functions/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ region: "rockies" }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (err) {
      console.error("Checkout error:", err);
    }
  }}>
  Purchase the guide
</span>
          {" "}to receive instant access.
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
  if (name === "hair") return <svg {...props}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/><path d="M12 11c0 2-1.5 3-1.5 5"/><path d="M13.5 16c0-2-1.5-3-1.5-5"/></svg>;
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
  { id: "hair", label: "Hair & Makeup", icon: "hair" },
  { id: "rentals", label: "Event Rentals", icon: "venues" },
  { id: "match",   label: "Find My Match", icon: "venues" },
  { id: "coming", label: "On Our Radar", icon: "coming" },
];

const vancouverGuideItems = [
  { id: "van-budget",   label: "Budget Guide",     icon: "budget" },
  { id: "van-tracker",  label: "Budget Tracker",   icon: "budget" },
  { id: "van-venues",   label: "Venues",           icon: "venues" },
  { id: "van-catering", label: "Catering",         icon: "catering" },
  { id: "van-bar",      label: "Mobile Bar",       icon: "bar" },
  { id: "van-photo",    label: "Photography",      icon: "photo" },
  { id: "van-florists", label: "Florists",         icon: "florists" },
  { id: "van-cakes",    label: "Cakes & Desserts", icon: "cakes" },
  { id: "van-dresses",  label: "Wedding Dresses",  icon: "dresses" },
  { id: "van-hair",     label: "Hair & Makeup",    icon: "hair" },
  { id: "van-rentals",  label: "Event Rentals",    icon: "venues" },
  { id: "van-planners", label: "Wedding Planners", icon: "coming" },
  { id: "van-match", label: "Find My Match", icon: "venues" },
  { id: "van-coming",   label: "On Our Radar",     icon: "coming" },
];

function ChecklistTab() {
  const [unlocked, setUnlocked] = useState(false);
  return (
    <div className="content">
      <div className="section-eyebrow">{sectionMeta.checklist.eyebrow}</div>
      <h1 className="section-title" style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <Icon name="checklist" color={COLORS.sandstone} size={36} />
        {sectionMeta.checklist.title}
      </h1>
      {!unlocked ? (
        <ChecklistGate onUnlock={() => setUnlocked(true)} />
      ) : (
        <>
          <p className="section-lead">{sectionMeta.checklist.lead}</p>
          <Checklist />
        </>
      )}
    </div>
  );
}

// =============================================================================
// SMITTEN EVENTS Q&A COMPONENT
// Paste this entire block into App.jsx ABOVE line 1450 (before export default function App)
// Replace TEAM_PHOTO and DUO_PHOTO with actual hosted image URLs
// =============================================================================

const TEAM_PHOTO = "/smitten2.jpg";
const DUO_PHOTO = "/smitten1.jpg";

const smittenQA = [
  {
    section: "About Smitten Events",
    items: [
      {
        q: "What makes Smitten Events' approach to wedding planning unique?",
        a: "Smitten Events is a boutique wedding and event planning firm based in Vancouver. Since 2013 we have planned hundreds of experience-rich events rooted in thoughtful hospitality, intentional design, and seamless execution throughout Vancouver, the Sea-to-Sky region, the Okanagan, and beyond. What makes our approach unique is the balance between thoughtful logistics and meaningful storytelling. We believe events should feel like a true reflection of the host — not a one-size-fits-all formula. We approach every planning decision — from venue flow to design details and guest experience — with intention, so the celebration feels cohesive, effortless, and deeply personal.",
      },
      {
        q: "You plan weddings across Vancouver, the Sea-to-Sky, and the Okanagan — three very different regions. How does your planning approach change depending on where the wedding is?",
        a: "Every location offers a different event experience, so our planning approach shifts based on the location and what a celebration requires. In Vancouver, weddings tend to be more urban and fast-paced, with a strong focus on timelines, vendor coordination, and navigating busy venues. In the Sea-to-Sky region, planning often centres on guest experience, with factors like transportation, accommodation, and mountain weather playing a significant role. In the Okanagan, weddings often feel like destination weekends — planning usually extends beyond the wedding day itself to include welcome events, winery experiences, and guest coordination across multiple days. No matter the location, our goal is always to create an event experience that feels seamless, personal, and enjoyable for everyone involved.",
      },
      {
        q: "What drew you to wedding planning, and what keeps you passionate about it after all these years?",
        a: "Wedding planning combines the elements we love most in events: design, logistics, hospitality, storytelling, and creating meaningful experiences. What continues to inspire us is how wedding celebrations bring together family, culture, and community in such a powerful way. A wedding is one of the only times in your life where you get to gather all your loved ones together — and that's a big deal. No matter how many weddings we plan, there is something incredibly rewarding about watching a couple feel fully present on such a momentous day.",
      },
    ],
  },
  {
    section: "Vancouver & Sea-to-Sky",
    items: [
      {
        q: "What makes Vancouver such a special place to get married?",
        a: "Vancouver offers couples an incredible mix of natural beauty, world-class hospitality, and sophisticated event spaces. Within a single wedding weekend, couples can host waterfront events, mountain-view ceremonies, and elegant receptions in the heart of the city. What couples need to know is that top Vancouver venues and vendors book far in advance, particularly during peak wedding season. The city also requires thoughtful planning around traffic, accessibility, and weather — even summer weddings need a strong rain plan and a timeline built with flexibility in mind.",
      },
      {
        q: "The Sea-to-Sky corridor has exploded in popularity for weddings. What do you love most about working in that region?",
        a: "What we love about Sea-to-Sky weddings is how immersive they feel. Weddings naturally become full experiences and encourage guests to slow down, stay for the weekend, and truly connect with the environment. What surprises couples most is how logistics-driven Sea-to-Sky weddings can be behind the scenes. Vendor travel, accommodation availability, shuttle timing, weather shifts, and remote venue access all require careful coordination. In order for a celebration to feel relaxed and effortless for guests, incredibly detailed planning is required behind the scenes.",
      },
      {
        q: "Many Sea-to-Sky venues require couples to work with planners from an approved list. What advice do you have for couples navigating those requirements?",
        a: "Working with a planner who understands a venue — along with their layout, policies, vendor access, and event flow — can make a big difference to a seamless planning experience. Our advice is to look at venue-recommended planners and vendors as an advantage. Vendors with strong venue familiarity can anticipate challenges early, streamline communication, and create a much smoother event overall.",
      },
      {
        q: "What is the biggest logistical challenge unique to Sea-to-Sky weddings that couples often don't anticipate?",
        a: "Transportation and timing are usually the biggest surprises. Travel between venues, hotels, and mountain towns almost always takes longer than guests expect, especially during peak weekends in the winter or summer months. For weddings in Whistler, Squamish, or Pemberton, transportation planning becomes a major part of the guest experience. Shuttle schedules, vendor load-ins, parking limitations, and weather conditions all need to be carefully managed to keep events flowing smoothly.",
      },
    ],
  },
  {
    section: "Okanagan",
    items: [
      {
        q: "The Okanagan is having a real moment as a wedding destination. What makes it so special?",
        a: "The Okanagan offers couples a destination wedding atmosphere while still feeling accessible for guests traveling within BC or Canada. The combination of vineyards, lake views, and relaxed luxury creates a setting that naturally lends itself to multi-day celebrations. The Okanagan is well suited to couples who prioritize guest experience and want their wedding to feel immersive and welcoming.",
      },
      {
        q: "What should couples know before booking a vineyard or winery as their venue?",
        a: "Winery weddings are stunning, but they often come with unique operational considerations. Many venues have strict rules around guest capacity, event timing, transportation, and outdoor setup requirements. Couples also need to be aware of weather and guest comfort — summer heat in the Okanagan can be intense, particularly during outdoor ceremonies and cocktail hours. Shade structures, hydration stations, transportation planning, and realistic timelines make a significant difference in how guests experience the celebration.",
      },
      {
        q: "How does the Okanagan vendor landscape compare to Vancouver?",
        a: "There are some great vendors in the Okanagan, but the vendor pool is smaller than Vancouver's and availability becomes limited during peak season. Couples should prioritize booking their planner, venue, photographer, rental company, and transportation team as early as possible. Most Vancouver vendors will travel to the Okanagan for weddings, but keep in mind that additional travel and accommodation fees will apply.",
      },
    ],
  },
  {
    section: "Planning Wisdom",
    items: [
      {
        q: "What is the single biggest mistake couples make when planning a West Coast wedding?",
        a: "One of the biggest mistakes couples make is prioritizing aesthetics before thinking through the logistics of the overall wedding experience. Design is an important part of creating a beautiful celebration, but what guests remember most is how the wedding felt. Realistic timelines, weather contingencies, and an experienced vendor team all play a huge role in creating a seamless event. The weddings that feel the most relaxed and effortless are almost always the ones where logistics were considered just as carefully as the visual details from the very beginning.",
      },
      {
        q: "When should couples book their wedding planner relative to other vendors?",
        a: "Ideally, couples should hire their wedding planner near the beginning of the process — often before booking most major vendors. A planner helps guide foundational decisions that impact every part of a wedding, including venue selection, budget allocation, vendor recommendations, and guest experience. Bringing a planner in early creates a much more cohesive planning experience and often helps couples avoid costly or stressful decisions later.",
      },
      {
        q: "What is the most underrated vendor category that couples consistently forget about until it's too late?",
        a: "Rentals are often one of the most underestimated elements of wedding planning, especially for tented or blank-space venues. Many couples do not realize how much cost and planning goes into creating a fully functional event space beyond tables and chairs. Lighting, lounge furniture, tabletop items, generators, flooring, catering tents, and washrooms all play a major role in both the guest experience and the overall design.",
      },
      {
        q: "Full planning vs. day-of coordination — how do couples know which one is right for them?",
        a: "One of the biggest misconceptions in the wedding industry is the idea of 'day-of coordination.' In reality, there is no such thing as coordinating a wedding by stepping in on the wedding day alone. Proper coordination requires months of preparation, timeline creation, vendor communication, logistics management, and final oversight leading up to the event. For couples deciding between full planning and coordination support, the real question is how much guidance they want throughout the planning process. Full planning is ideal for couples who want comprehensive support from start to finish. Wedding coordination is best suited to couples who want to manage most of the planning themselves but still need a professional to take over logistics and execution in the final weeks.",
      },
      {
        q: "What does a truly stress-free wedding day look like from a planner's perspective?",
        a: "A truly stress-free wedding day is one where the couple never has to think about logistics, timelines, or problem-solving. They are fully immersed in the celebration and can spend meaningful time with their guests. Behind the scenes, this level of ease comes from months of preparation, detailed production timelines, and constant coordination with vendors throughout the day. Our team monitors timing, directs setup, oversees transitions, and problem-solves quietly to ensure that every moving piece stays aligned without the couple needing to step in.",
      },
      {
        q: "What is one piece of advice you wish every couple knew before they started planning?",
        a: "Many couples underestimate how directly tied their overall budget is to the number of guests attending. Catering, rentals, florals, stationery, staffing, and venue requirements all scale with guest count — often much faster than expected. Sometimes simplifying a guest list can completely transform an experience. A more intentional guest count often creates room in the budget for the elements couples care most about, while also allowing the celebration to feel more personal, relaxed, and connected. The most memorable weddings are not necessarily the largest or most elaborate. They are the ones that feel thoughtful, welcoming, and genuinely reflective of the couple hosting them.",
      },
    ],
  },
];

function SmittenQA() {
const [openIndex, setOpenIndex] = useState(null);
  
  return (
    <div className="content" style={{ maxWidth: 960 }}>

      {/* HEADER */}
      <div className="section-eyebrow">Expert Q&A</div>
      <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 42, fontWeight: 400, color: COLORS.forest, lineHeight: 1.1, marginBottom: 8 }}>
        Planning Wisdom from<br /><em style={{ color: COLORS.sandstone }}>Smitten Events</em>
      </h1>
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontStyle: "italic", color: COLORS.sub, lineHeight: 1.7, maxWidth: 580, marginBottom: 40 }}>
        Since 2013, Smitten Events has planned hundreds of weddings across Vancouver, the Sea-to-Sky corridor, and the Okanagan. We asked them everything — and they answered.
      </p>

      {/* TEAM PHOTO */}
      <div style={{ borderRadius: 6, overflow: "hidden", marginBottom: 40, position: "relative" }}>
        <img src={TEAM_PHOTO} alt="Smitten Events Team" style={{ width: "100%", height: 420, objectFit: "cover", objectPosition: "center top", display: "block" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, rgba(42,31,26,0.85) 0%, transparent 100%)", padding: "32px 28px 24px" }}>
          <div style={{ fontFamily: "'Jost', sans-serif", fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: "rgba(247,243,236,0.7)", marginBottom: 4 }}>Vancouver · Sea-to-Sky · Okanagan</div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 600, color: "#F7F3EC" }}>The Smitten Events Team</div>
        </div>
      </div>

      {/* PULL QUOTE */}
      <div style={{
        background: COLORS.parchment,
        borderLeft: `3px solid ${COLORS.sandstone}`,
        borderRadius: "0 4px 4px 0",
        padding: "28px 32px",
        marginBottom: 48,
      }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontStyle: "italic", fontWeight: 400, color: COLORS.forest, lineHeight: 1.6, margin: 0, marginBottom: 12 }}>
          "The most memorable weddings are not necessarily the largest or most elaborate. They are the ones that feel thoughtful, welcoming, and genuinely reflective of the couple hosting them."
        </p>
        <div style={{ fontFamily: "'Jost', sans-serif", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: COLORS.sandstone }}>Smitten Events</div>
      </div>

      {/* Q&A SECTIONS */}
      {smittenQA.map((section, si) => (
        <div key={si} style={{ marginBottom: 48 }}>
          <div style={{ fontFamily: "'Jost', sans-serif", fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: COLORS.sandstone, marginBottom: 20, paddingBottom: 12, borderBottom: `1px solid ${COLORS.border}` }}>
            {section.section}
          </div>
          {section.items.map((item, qi) => {
            const key = `${si}-${qi}`;
            const isOpen = openIndex === key;
            return (
              <div key={qi} style={{ borderBottom: `1px solid ${COLORS.border}`, marginBottom: 0 }}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : key)}
                  style={{
                    width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer",
                    padding: "18px 0", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16,
                  }}
                >
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 600, color: COLORS.forest, lineHeight: 1.4, flex: 1 }}>
                    {item.q}
                  </span>
                  <span style={{ fontFamily: "'Jost', sans-serif", fontSize: 18, color: COLORS.sandstone, flexShrink: 0, marginTop: 2, transition: "transform 0.2s", transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}>+</span>
                </button>
                {isOpen && (
                  <div style={{ paddingBottom: 20, paddingRight: 32 }}>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, color: COLORS.text, lineHeight: 1.75, margin: 0 }}>
                      {item.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}

      {/* DUO PHOTO + CTA */}
      <div style={{ borderRadius: 6, overflow: "hidden", marginTop: 16, marginBottom: 40, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
        <img src={DUO_PHOTO} alt="Smitten Events Founders" style={{ width: "100%", height: 360, objectFit: "cover", objectPosition: "center", display: "block" }} />
        <div style={{ background: COLORS.forest, padding: "40px 36px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ fontFamily: "'Jost', sans-serif", fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: "rgba(247,243,236,0.6)", marginBottom: 12 }}>Based in Vancouver</div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 400, color: "#F7F3EC", lineHeight: 1.3, marginBottom: 16 }}>
            Ready to start planning your West Coast wedding?
          </div>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 15, fontStyle: "italic", color: "rgba(247,243,236,0.75)", lineHeight: 1.6, marginBottom: 28 }}>
            Smitten Events offers full planning and coordination services across Vancouver, Sea-to-Sky, and the Okanagan.
          </p>
          <a href="https://www.smittenevents.ca" target="_blank" rel="noopener noreferrer" style={{
            display: "inline-block", fontFamily: "'Jost', sans-serif", fontSize: 10, letterSpacing: 2,
            textTransform: "uppercase", color: COLORS.forest, background: COLORS.sandstone,
            border: "none", borderRadius: 2, padding: "12px 20px", cursor: "pointer", textDecoration: "none",
            alignSelf: "flex-start",
          }}>
            Visit Smitten Events →
          </a>
        </div>
      </div>

      {/* INSTAGRAM HANDLE */}
      <div style={{ textAlign: "center", padding: "24px 0", borderTop: `1px solid ${COLORS.border}` }}>
        <div style={{ fontFamily: "'Jost', sans-serif", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: COLORS.sub, marginBottom: 6 }}>Follow Along</div>
        <a href="https://www.instagram.com/smittenevents" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: COLORS.sandstone, textDecoration: "none" }}>@smittenevents</a>
      </div>
{/* PHOTO CREDIT */}
<div style={{ textAlign: "center", padding: "16px 0", borderTop: `1px solid ${COLORS.border}`, marginTop: 0 }}>
  <div style={{ fontFamily: "'Jost', sans-serif", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: COLORS.sub }}>
    Photography by{" "}
    <a href="https://christinepienaarphotography.com" target="_blank" rel="noopener noreferrer" style={{ color: COLORS.sandstone, textDecoration: "underline", textUnderlineOffset: 3 }}>
      Christine Pienaar Photography
    </a>
    {" · "}
    <a href="https://www.instagram.com/cpienaarphoto" target="_blank" rel="noopener noreferrer" style={{ color: COLORS.sandstone, textDecoration: "underline", textUnderlineOffset: 3 }}>
      @cpienaarphoto
    </a>
  </div>
</div>
    </div>
  );
}
const BLUSH_COCO_HERO = "/blush-coco-hero.jpg"; // Upload SFDESIGN-350.jpg to /public as this filename
 
const blushAndCocoQA = [
  {
    section: "About Blush & Coco Brides",
    items: [
      {
        q: "Tell us a little about Blush & Coco Brides — how did you get started, and what makes your approach unique?",
        a: "I actually got started through dance. I was always that friend doing everyone else's hair and makeup, putting on lashes, and helping everyone get ready. I've always loved makeup, beauty, and making people feel confident. I never really thought doing makeup could be a full-time career, but once I got into weddings and my business grew, I realized this was exactly what I wanted to do. What makes my approach unique is that I truly want everyone to feel like themselves. I'm not trying to change anyone's beauty — I simply want to enhance what is already there. There's a quote by Emily Dickinson that says, 'Beauty is not caused. It is.' I love that because it's exactly how I feel. Our job is simply to help bring out the beauty that's already there and help our brides feel like the very best version of themselves.",
      },
    ],
  },
  {
    section: "Booking & Planning",
    items: [
      {
        q: "How far in advance should brides book their hair and makeup artist?",
        a: "We're typically booking about a year in advance, so if you have your heart set on a specific date or artist, I'd definitely recommend booking around a year ahead. We do have a large team, so we can sometimes accommodate last-minute bookings, but our busiest Saturdays from May through October fill up very quickly — especially June, July, August, and September.",
      },
      {
        q: "Do you recommend a bridal hair and makeup trial, and why?",
        a: "Absolutely. Trials are so important because they give us a chance to figure out exactly what our bride loves and her preferences — and maybe what she doesn't love as much. We can experiment with different looks, colours, hairstyles, and products, and it allows us to go into the wedding day with a clear plan. There are no surprises because everyone knows exactly what we are creating, and that makes the whole morning feel so much more relaxed.",
      },
    ],
  },
  {
    section: "The Wedding Day",
    items: [
      {
        q: "What's your process like on the wedding day? What can a bride expect when working with Blush & Coco?",
        a: "Our process is actually pretty simple — we bring the salon to you. Our goal is for everyone to feel comfortable, relaxed, and completely taken care of. You get to sit back, enjoy the morning, and we handle the rest. Before we begin, we do a consultation with each person to make sure we are on the same page. Asking the right questions helps us create exactly the look our clients are hoping for. You can expect a lot of attention to detail from us. We truly believe the look is all in the details. We strive for perfection, and at the end of the day, we just want our brides to feel amazing. If our brides are happy, we're happy.",
      },
      {
        q: "What is the biggest bridal beauty mistake you see, and how can brides avoid it?",
        a: "I think one of the biggest mistakes is trying to choose a look that doesn't really feel like you. Sometimes brides feel pressure to follow trends or try something completely different from what they normally wear — whether that's much heavier makeup or a hairstyle they would never usually choose. Trends are fun, but I always encourage brides to choose what makes them feel the most confident and comfortable. This is usually something we discover during the trial.",
      },
    ],
  },
  {
    section: "Trends & Advice",
    items: [
      {
        q: "What bridal beauty trends are you loving right now?",
        a: "We're seeing a lot of brides choosing softer, more effortless hairstyles — wearing their hair down with a beautiful blowout or loose curls instead of feeling like everything has to be perfectly pinned into place. For makeup, we're loving fresh, glowy skin, soft radiant makeup, and of course blush. Everyone seems to be a blush girl these days! We are also loving glossy lips.",
      },
      {
        q: "What's one piece of advice you wish every bride knew before her wedding day?",
        a: "Choose vendors you trust, and then let them take care of you. The best wedding mornings are when a bride can truly relax, be present, and enjoy getting ready with the people she loves. Of course there are always a few nerves, but there really is no need to stress. Everything always comes together, and your vendor team is there to make sure you're taken care of every step of the way. Your wedding day goes by so quickly, so try to soak it all in, enjoy every moment, and know that it's all going to be okay. It's such a special day, and you deserve to experience it rather than worry about it.",
      },
    ],
  },
];
 
function BlushAndCocoQA() {
  const [openIndex, setOpenIndex] = useState(null);
 
  return (
    <div className="content" style={{ maxWidth: 960 }}>
 
      {/* HEADER */}
      <div className="section-eyebrow">Bridal Beauty Q&A</div>
      <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 42, fontWeight: 400, color: COLORS.forest, lineHeight: 1.1, marginBottom: 8 }}>
        Beauty Wisdom from<br /><em style={{ color: COLORS.sandstone }}>Blush & Coco Brides</em>
      </h1>
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontStyle: "italic", color: COLORS.sub, lineHeight: 1.7, maxWidth: 580, marginBottom: 40 }}>
        Calgary-based bridal hair and makeup artist Jenah Mackinaw has been making brides feel like the most beautiful version of themselves for years. We asked her everything — and she answered.
      </p>
 
      {/* HERO PHOTO */}
      <div style={{ borderRadius: 6, overflow: "hidden", marginBottom: 40, position: "relative" }}>
        <img src={BLUSH_COCO_HERO} alt="Blush and Coco Brides" style={{ width: "100%", height: 650, objectFit: "cover", objectPosition: "center 20%", display: "block" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, rgba(44,74,62,0.85) 0%, transparent 100%)", padding: "32px 28px 24px" }}>
          <div style={{ fontFamily: "'Jost', sans-serif", fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: "rgba(247,243,236,0.7)", marginBottom: 4 }}>Calgary, Alberta</div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 600, color: "#F7F3EC" }}>Blush & Coco Brides</div>
        </div>
      </div>
 
      {/* PULL QUOTE */}
      <div style={{
        background: COLORS.parchment,
        borderLeft: `3px solid ${COLORS.sandstone}`,
        borderRadius: "0 4px 4px 0",
        padding: "28px 32px",
        marginBottom: 48,
      }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontStyle: "italic", fontWeight: 400, color: COLORS.forest, lineHeight: 1.6, margin: 0, marginBottom: 12 }}>
          "Beauty is not caused. It is. Our job is simply to help bring out the beauty that's already there."
        </p>
        <div style={{ fontFamily: "'Jost', sans-serif", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: COLORS.sandstone }}>Jenah Mackinaw · Blush & Coco Brides</div>
      </div>
 
      {/* Q&A SECTIONS */}
      {blushAndCocoQA.map((section, si) => (
        <div key={si} style={{ marginBottom: 48 }}>
          <div style={{ fontFamily: "'Jost', sans-serif", fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: COLORS.sandstone, marginBottom: 20, paddingBottom: 12, borderBottom: `1px solid ${COLORS.border}` }}>
            {section.section}
          </div>
          {section.items.map((item, qi) => {
            const key = `${si}-${qi}`;
            const isOpen = openIndex === key;
            return (
              <div key={qi} style={{ borderBottom: `1px solid ${COLORS.border}`, marginBottom: 0 }}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : key)}
                  style={{
                    width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer",
                    padding: "18px 0", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16,
                  }}
                >
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 600, color: COLORS.forest, lineHeight: 1.4, flex: 1 }}>
                    {item.q}
                  </span>
                  <span style={{ fontFamily: "'Jost', sans-serif", fontSize: 18, color: COLORS.sandstone, flexShrink: 0, marginTop: 2, transition: "transform 0.2s", transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}>+</span>
                </button>
                {isOpen && (
                  <div style={{ paddingBottom: 20, paddingRight: 32 }}>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, color: COLORS.text, lineHeight: 1.75, margin: 0 }}>
                      {item.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
 
      {/* CTA BLOCK */}
      <div style={{ borderRadius: 6, overflow: "hidden", marginTop: 16, marginBottom: 40, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
        <img src={BLUSH_COCO_HERO} alt="Blush and Coco Brides" style={{ width: "100%", height: 320, objectFit: "cover", objectPosition: "center top", display: "block" }} />
        <div style={{ background: COLORS.forest, padding: "40px 36px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ fontFamily: "'Jost', sans-serif", fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: "rgba(247,243,236,0.6)", marginBottom: 12 }}>Based in Calgary, Alberta</div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 400, color: "#F7F3EC", lineHeight: 1.3, marginBottom: 16 }}>
            Ready to feel like the most beautiful version of yourself?
          </div>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 15, fontStyle: "italic", color: "rgba(247,243,236,0.75)", lineHeight: 1.6, marginBottom: 28 }}>
            Blush & Coco Brides offers bridal hair and makeup services for Calgary weddings and beyond.
          </p>
          <a href="https://www.instagram.com/blushandcocobrides" target="_blank" rel="noopener noreferrer" style={{
            display: "inline-block", fontFamily: "'Jost', sans-serif", fontSize: 10, letterSpacing: 2,
            textTransform: "uppercase", color: COLORS.forest, background: COLORS.sandstone,
            border: "none", borderRadius: 2, padding: "12px 20px", cursor: "pointer", textDecoration: "none",
            alignSelf: "flex-start",
          }}>
            Follow on Instagram →
          </a>
        </div>
      </div>
 
      {/* INSTAGRAM HANDLE */}
      <div style={{ textAlign: "center", padding: "24px 0", borderTop: `1px solid ${COLORS.border}` }}>
        <div style={{ fontFamily: "'Jost', sans-serif", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: COLORS.sub, marginBottom: 6 }}>Follow Along</div>
        <a href="https://www.instagram.com/blushandcocobrides" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: COLORS.sandstone, textDecoration: "none" }}>@blushandcocobrides</a>
      </div>
 
      {/* PHOTO CREDIT — update once confirmed with Jenah */}
      <div style={{ textAlign: "center", padding: "16px 0", borderTop: `1px solid ${COLORS.border}`, marginTop: 0 }}>
        <div style={{ fontFamily: "'Jost', sans-serif", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: COLORS.sub }}>
          Photography by [Photographer Name — confirm with Jenah]
        </div>
      </div>
 
    </div>
  );
}
export default function App() {
  const [region, setRegion] = useState(null);
  const [activeTab, setActiveTab] = useState("home");
  const [unlocked, setUnlocked] = useState(false);
  const [showPasswordGate, setShowPasswordGate] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showNotify, setShowNotify] = useState(false);
  const [notifyCity, setNotifyCity] = useState("");
  const [loading, setLoading] = useState(false);
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
          .region-bg-photo {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
            display: block;
            z-index: 0;
          }
           .region-bg-overlay {
           position: absolute;
           inset: 0;
           background: linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.65) 100%);
           z-index: 1;
          }
          .region-wrap::before {
            content: '';
            position: absolute;
            inset: 0;
            background:
              radial-gradient(ellipse at 20% 20%, rgba(196,149,106,0.12) 0%, transparent 55%),
              radial-gradient(ellipse at 80% 80%, rgba(139,105,20,0.08) 0%, transparent 50%);
            z-index: 2;
          }
          .region-eyebrow {
            font-family: 'Jost', sans-serif;
            font-size: 11px;
            letter-spacing: 4px;
            text-transform: uppercase;
            color: ${COLORS.sandstone};
            margin-bottom: 20px;
            position: relative;
            z-index: 3;
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
            z-index: 3;
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
            z-index: 3;
          }
          .region-divider {
            width: 48px;
            height: 1px;
            background: ${COLORS.sandstone};
            margin: 0 auto 56px;
            opacity: 0.5;
            position: relative;
            z-index: 3;
          }
          .region-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 20px;
            width: 100%;
            max-width: 900px;
            position: relative;
            z-index: 3;
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
          .region-card.coming .region-notify { pointer-events: auto; cursor: pointer; position: relative; z-index: 10; }
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
            display: block;
            width: 100%;
            margin-top: 16px;
            font-family: 'Jost', sans-serif;
            font-size: 11px;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: ${COLORS.cream};
            border: 1px solid rgba(247,243,236,0.5);
            padding: 12px 16px;
            border-radius: 2px;
            cursor: pointer;
            transition: all 0.2s;
            background: rgba(255,255,255,0.1);
            text-align: center;
          }
          .region-notify:hover { background: rgba(255,255,255,0.2); border-color: rgba(247,243,236,0.8); color: ${COLORS.white}; }
          .region-footer {
            margin-top: 56px;
            font-family: 'Jost', sans-serif;
            font-size: 11px;
            letter-spacing: 2px;
            color: rgba(247,243,236,0.25);
            position: relative;
            z-index: 3;
          }
          @media (max-width: 640px) {
            .region-wrap { padding: 48px 16px; }
            .region-title { font-size: 36px; }
            .region-sub { font-size: 17px; margin-bottom: 40px; }
            .region-grid { grid-template-columns: 1fr; gap: 14px; }
            .region-card { padding: 24px 20px; }
            .region-name { font-size: 24px; }
            .region-desc { font-size: 14px; }
            .region-footer { font-size: 10px; text-align: center; }
          }
        `}</style>
        <div className="region-wrap">
          <img src="/hero-photo.jpg" alt="Canadian Rockies wedding" className="region-bg-photo" />
          <div className="region-bg-overlay" />
          {showNotify && <NotifyModal cityName={notifyCity} onClose={() => setShowNotify(false)} />}
          <div className="region-eyebrow">The Ultimate Wedding Guide</div>
          <h1 className="region-title">Your dream wedding<br /><span>starts here.</span></h1>
          <p className="region-sub">We have done the research, vetted the vendors, and organized everything — so you don't have to. Select your region and let's get planning.</p>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 12, letterSpacing: 2, color: COLORS.sandstone, marginBottom: 8, position: "relative", zIndex: 3 }}>
            FROM <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 600, letterSpacing: 0 }}>$29</span> CAD · One-time purchase · Lifetime access
          </p>
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
              <div className="region-desc">Everything you need to plan your Rocky Mountain wedding. Dozens of vetted vendors across every category, detailed, organized, and ready for you. Just sit back, relax, and enjoy the planning.</div>
              <div className="region-cta">Explore the Guide →</div>
            </div>
<div className="region-card available" onClick={() => setRegion("vancouver")}>              
  <div className="region-badge available">Available Now</div>
  <div style={{ marginBottom: 16 }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C4956A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                  <circle cx="12" cy="9" r="2.5"/>
                </svg>
              </div>
              <div className="region-name">Vancouver & Sea-to-Sky</div>
              <div className="region-cities">Vancouver · Squamish · Whistler · Pemberton</div>
              <div className="region-desc">From waterfront ceremonies and botanical gardens to mountain lodge escapes — everything you need to plan your perfect West Coast wedding.</div>
              <div className="region-cta">Explore the Guide →</div>
            </div>
            {/* OKANAGAN — IN PROGRESS */}
<div className="region-card coming" style={{ borderColor: "rgba(196,149,106,0.5)", background: "rgba(196,149,106,0.05)" }}>
  <div className="region-badge" style={{ background: "rgba(196,149,106,0.15)", color: "#C4956A", border: "1px solid rgba(196,149,106,0.3)" }}>In Progress</div>
  <div style={{ marginBottom: 16 }}>
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(196,149,106,0.6)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
      <circle cx="12" cy="9" r="2.5"/>
    </svg>
  </div>
  <div className="region-name">Okanagan</div>
  <div className="region-cities">Kelowna · Penticton · Vernon</div>
  <div className="region-desc">Vineyard ceremonies, orchard receptions, and stunning lake views. Wine country weddings done right.</div>
  <button className="region-notify" onClick={e => { e.stopPropagation(); setNotifyCity("Okanagan"); setShowNotify(true); }}>Notify Me When Live</button>
</div>
            {/* COMING SOON */}
            {[
              { name: "Toronto & Surroundings", cities: "Toronto · Muskoka · Niagara", desc: "Grand ballrooms, intimate restaurants, and lakeside escapes across Ontario's best wedding destinations." },
              { name: "Montreal", cities: "Montreal · Quebec City", desc: "Old world charm meets modern sophistication across francophone Canada's most romantic wedding destinations." },
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
                <button className="region-notify" onClick={e => { e.stopPropagation(); setNotifyCity(r.name); setShowNotify(true); }}>
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
function handleVanTabClick(tab) {
    if (tab.locked && !unlocked) {
      setShowPasswordGate(true);
    } else {
      setActiveTab(tab.id);
    }
    setShowMobileMenu(false);
  }

  if (region === "vancouver") {
    const vanTabs = vancouverGuideItems.map(i => ({ id: i.id, label: i.label, locked: true }));
    const isVanLocked = vanTabs.find(t => t.id === activeTab)?.locked;
    const vanMeta = sectionMeta[activeTab] || sectionMeta["van-venues"];

    return (
      <>
        <style>{styles}</style>
        {showPasswordGate && (
          <div style={{
            position: "fixed", inset: 0, background: "rgba(42,31,26,0.96)",
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
                Enter your guide password to access the full West Coast Edition.
              </p>
              <form onSubmit={async e => {
                e.preventDefault();
                const val = e.target.querySelector("input").value.trim();
                setLoading(true);
                try {
                  const res = await fetch("/.netlify/functions/validate-code", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ code: val }),
                  });
                  const data = await res.json();
                  if (data.valid) {
                    setUnlocked(true);
                    setShowPasswordGate(false);
                    setActiveTab("van-venues");
                  } else {
                    e.target.querySelector("input").value = "";
                    e.target.querySelector("input").style.borderColor = "#c0392b";
                    setTimeout(() => { e.target.querySelector("input").style.borderColor = COLORS.border; }, 3000);
                  }
                } catch {
                  e.target.querySelector("input").value = "";
                  e.target.querySelector("input").style.borderColor = "#c0392b";
                  setTimeout(() => { e.target.querySelector("input").style.borderColor = COLORS.border; }, 3000);
                }
                setLoading(false);
              }} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <input
                  type="password"
                  placeholder="Enter password"
                  autoFocus
                  style={{
                    fontFamily: "'Jost', sans-serif", fontSize: 15,
                    padding: "14px 18px", border: `1px solid ${COLORS.border}`,
                    borderRadius: 3, outline: "none", textAlign: "center",
                    letterSpacing: 4, color: COLORS.text, width: "100%",
                    transition: "border-color 0.2s"
                  }}
                />
                <button type="submit" disabled={loading} style={{
                  background: COLORS.forest, color: COLORS.cream,
                  fontFamily: "'Jost', sans-serif", fontSize: 11,
                  fontWeight: 500, letterSpacing: 3, textTransform: "uppercase",
                  padding: "16px 32px", border: "none", borderRadius: 2,
                  cursor: "pointer"
                }}>
                  {loading ? "Checking..." : "Unlock Guide"}
                </button>
              </form>
              <p style={{ marginTop: 24, fontSize: 12, color: COLORS.sub, lineHeight: 1.6 }}>
                Don't have a password yet?{" "}
             <span style={{ color: COLORS.sandstone, textDecoration: "underline", cursor: "pointer", textUnderlineOffset: 3 }}
  onClick={async () => {
    setShowPasswordGate(false);
    try {
      const res = await fetch("/.netlify/functions/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ region: "vancouver" }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (err) {
      console.error("Checkout error:", err);
    }
  }}>
  Purchase the guide
</span>
                {" "}to receive instant access.
              </p>
            </div>
          </div>
        )}

        <div className="guide-wrap">
          {/* VANCOUVER COVER */}
          <div className="cover">
            <img src="/hero-vancouver.jpg" alt="West Coast wedding" className="cover-bg-photo" />
            <div className="cover-bg-overlay" />
            <div className="cover-title">The Ultimate<br /><span>Wedding Guide</span></div>
            <div className="cover-divider" />
            <div className="cover-cities">West Coast Edition</div>
            <div className="cover-subtitle" style={{ marginTop: 12, fontSize: 14, letterSpacing: 3 }}>Vancouver  ·  Squamish  ·  Whistler  ·  Pemberton</div>
            <div className="cover-subtitle" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}>Your complete guide to planning a West Coast wedding</div>
            <div style={{ marginTop: 32, position: "relative", zIndex: 3 }}>
              <button
                onClick={async () => { try { const res = await fetch("/.netlify/functions/create-checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ region: "vancouver" }) }); const data = await res.json(); if (data.url) window.location.href = data.url; } catch(err) { console.error(err); } }}
                style={{
                  background: COLORS.sandstone, color: COLORS.forest,
                  fontFamily: "'Jost', sans-serif", fontSize: 11, fontWeight: 600,
                  letterSpacing: 3, textTransform: "uppercase",
                  padding: "14px 36px", border: "none", borderRadius: 2,
                  cursor: "pointer", transition: "background 0.2s",
                }}
                onMouseOver={e => e.currentTarget.style.background = "#d4a870"}
                onMouseOut={e => e.currentTarget.style.background = COLORS.sandstone}
              >
                Buy the Guide · $29
              </button>
              <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 11, letterSpacing: 1, color: "rgba(247,243,236,0.5)", marginTop: 10 }}>
                CAD · One-time purchase · Lifetime access
              </p>
            </div>
          </div>

          {/* VANCOUVER NAV */}
          <nav className="nav" style={{ position: "relative" }}>
            {/* DESKTOP */}
            <div className="nav-desktop">
              <div className="nav-item">
  <button className="nav-btn" onClick={() => { setRegion(null); setUnlocked(false); setActiveTab("home"); }} style={{ opacity: 0.5, fontSize: 10, letterSpacing: 2 }}>← All Editions</button>
</div>
            <div className="nav-item">
  <button className={`nav-btn ${activeTab === "van-home" ? "active" : ""}`} onClick={() => setActiveTab("van-home")}>Home</button>
</div>
<div className="nav-item">
  <button className={`nav-btn ${activeTab === "why" ? "active" : ""}`} onClick={() => setActiveTab("why")}>Our Story</button>
</div>
<div className="nav-item">
  <button className={`nav-btn ${activeTab === "checklist" ? "active" : ""}`} onClick={() => setActiveTab("checklist")}>Free Checklist</button>
</div>
              <div className="nav-item">
  <button className={`nav-btn ${activeTab === "ask-a-planner" ? "active" : ""}`} onClick={() => setActiveTab("ask-a-planner")}>Expert Q&A</button>
</div>
<div className="nav-item">
  <button className={`nav-btn ${activeTab === "bridal-beauty-qa" ? "active" : ""}`} onClick={() => setActiveTab("bridal-beauty-qa")}>Bridal Beauty</button>
</div>
<div className="nav-item">
  <button className={`nav-btn ${vancouverGuideItems.map(i => i.id).includes(activeTab) ? "active" : ""}`}>
    The Guide <span className="nav-arrow">▼</span>
  </button>
                <div className="dropdown">
                  {vancouverGuideItems.map(item => (
                    <button key={item.id} className={`dropdown-item ${activeTab === item.id ? "active" : ""}`}
                      onClick={() => handleVanTabClick({ id: item.id, locked: true })}>
                      <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <Icon name={item.icon} color={activeTab === item.id ? COLORS.forest : COLORS.sandstone} size={15} />
                        {item.label}
                      </span>
                      {!unlocked && <span className="lock-dot" />}
                    </button>
                  ))}
                </div>
              </div>
              <button className="nav-gift-btn" onClick={async () => { try { const res = await fetch("/.netlify/functions/create-checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ region: "vancouver" }) }); const data = await res.json(); if (data.url) window.location.href = data.url; } catch(err) { console.error(err); } }}>
                Buy the Guide
              </button>
              {unlocked && (
                <button className="nav-lock-btn" onClick={() => { setUnlocked(false); setActiveTab("van-home"); }}>Lock</button>
              )}
            </div>

            {/* MOBILE */}
            <div className="nav-mobile" style={{ width: "100%", alignItems: "center", justifyContent: "space-between" }}>
              <button className="nav-btn" style={{ padding: "16px 8px" }} onClick={() => { setActiveTab("van-home"); setShowMobileMenu(false); }}>Home</button>
<button className="nav-btn" style={{ padding: "16px 8px", opacity: 0.6, fontSize: 12 }} onClick={() => { setRegion(null); setUnlocked(false); setActiveTab("home"); setShowMobileMenu(false); }}>← All Editions</button>              <button className={`hamburger-btn ${showMobileMenu ? "open" : ""}`} onClick={() => setShowMobileMenu(!showMobileMenu)}>
              THE GUIDE
              </button>
            </div>
            {showMobileMenu && (
              <div className="mobile-menu">
                <button className="mobile-menu-item" style={{ opacity: 0.5, fontSize: 10 }} onClick={() => { setRegion(null); setUnlocked(false); setActiveTab("home"); setShowMobileMenu(false); }}>← All Editions</button>
                <div className="mobile-menu-divider" />
                <button className="mobile-menu-item" onClick={() => { setActiveTab("why"); setShowMobileMenu(false); }}>Our Story</button>
               <button className="mobile-menu-item" onClick={() => { setActiveTab("checklist"); setShowMobileMenu(false); }}>Free Checklist</button>
                <button className="mobile-menu-item" onClick={() => { setActiveTab("ask-a-planner"); setShowMobileMenu(false); }}>Expert Q&A</button>
                <button className="mobile-menu-item" onClick={() => { setActiveTab("bridal-beauty-qa"); setShowMobileMenu(false); }}>Bridal Beauty</button>
               <div className="mobile-menu-divider" />
                <div className="mobile-menu-section">The Guide</div>
                {vancouverGuideItems.map(item => (
                  <button key={item.id} className={`mobile-menu-item ${activeTab === item.id ? "active" : ""}`}
                    onClick={() => handleVanTabClick({ id: item.id, locked: true })}
                    style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <Icon name={item.icon} color="rgba(196,149,106,0.7)" size={14} />
                    {item.label} {!unlocked && "·"}
                  </button>
                ))}
                {unlocked && (
                  <>
                    <div className="mobile-menu-divider" />
                    <button className="mobile-menu-item" style={{ opacity: 0.4 }} onClick={() => { setUnlocked(false); setActiveTab("van-home"); setShowMobileMenu(false); }}>Lock Guide</button>
                  </>
                )}
              </div>
            )}
          </nav>

  {/* VANCOUVER HOME */}
          {(activeTab === "van-home" || activeTab === "home") && (
            <VancouverLandingPage onBuy={async () => { try { const res = await fetch("/.netlify/functions/create-checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ region: "vancouver" }) }); const data = await res.json(); if (data.url) window.location.href = data.url; } catch(err) { console.error(err); } }} setRegion={setRegion} />
          )}
{/* BUDGET GUIDE */}
{activeTab === "van-budget" && (
  <VancouverBudgetGuide />
)}

{activeTab === "van-tracker" && (
  <BudgetTracker />
)}
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
        Last summer, my close friend got married. She and her husband were so excited, and they deserved every bit of that excitement. But almost immediately, the planning process started to chip away at it. Every week brought a new curveball. Vendors were hard to find, harder to compare, and nearly impossible to vet without spending hours online. Their planner wasn't providing the relief they had hoped for. Arguments became a daily occurrence. The joy of being engaged was getting buried under the weight of logistics.
      </p>
      <p style={{ fontSize: 16, lineHeight: 1.8, color: COLORS.text, marginBottom: 24 }}>
        I watched two people who love each other deeply get worn down by a process that should have felt exciting. And I kept thinking: someone should fix this. Someone should do the research, compile the vendors, organize the information, and hand it to couples so they can just breathe and enjoy being engaged.
      </p>
      <p style={{ fontSize: 16, lineHeight: 1.8, color: COLORS.text, marginBottom: 24 }}>So I did.</p>
      <p style={{ fontSize: 16, lineHeight: 1.8, color: COLORS.text, marginBottom: 24 }}>
        The Ultimate Wedding Guide, West Coast Edition, is built for couples who want to feel relief, excitement, and ease when they think about their wedding. Not dread. It is for the bride who opens her laptop to research venues and immediately feels overwhelmed. It is for the couple who just wants someone to tell them where to start. We have done the Googling, made the calls, vetted the vendors, and organized everything into one beautiful resource so you can close the laptop, pour a glass of wine, and actually enjoy this season of your life.
      </p>
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontStyle: "italic", color: COLORS.forest, lineHeight: 1.7, marginBottom: 4 }}>
        Congratulations on your engagement. All the best,
      </p>
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontStyle: "italic", color: COLORS.forest, marginBottom: 40 }}>
        Nadia
      </p>
      <div style={{ background: COLORS.forest, borderRadius: 4, padding: "32px 36px", marginBottom: 40 }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontStyle: "italic", color: COLORS.cream, lineHeight: 1.7, marginBottom: 20 }}>
          "You deserve to feel excited about every single part of planning your wedding. That feeling is exactly what this guide was made to give you."
        </p>
        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 12, letterSpacing: 3, color: COLORS.sandstone, textTransform: "uppercase" }}>
          — The Ultimate Wedding Guide
        </p>
      </div>
    </div>
  </div>
)}

{/* FREE CHECKLIST */}
{activeTab === "checklist" && <ChecklistTab />}
          {activeTab === "ask-a-planner" && <SmittenQA />}
          {activeTab === "bridal-beauty-qa" && <BlushAndCocoQA />}
          {/* VANCOUVER LOCKED */}
          {isVanLocked && !unlocked && (
            <LockScreen onUnlock={() => setShowPasswordGate(true)} />
          )}

          {/* VANCOUVER UNLOCKED CONTENT */}
          {isVanLocked && unlocked && (
            <div style={{ position: "relative" }}>
              {vanMeta?.bgPhoto && (
                <>
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `url(${vanMeta.bgPhoto})`,
                    backgroundSize: vanMeta?.bgPhotoSize || "cover",
                    backgroundPosition: "center",
                    backgroundAttachment: "fixed",
                    zIndex: 0,
                  }} />
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(248,244,240,0.55)",
                    zIndex: 1,
                  }} />
                  {vanMeta?.bgPhotoCredit && (
                    <div style={{
                      position: "absolute",
                      bottom: 12,
                      left: 16,
                      zIndex: 10,
                      fontFamily: "'Jost', sans-serif",
                      fontSize: 10,
                      letterSpacing: 1,
                      color: "rgba(42,31,26,0.5)",
                      pointerEvents: "none",
                    }}>
                      {vanMeta.bgPhotoCredit}
                    </div>
                  )}
                </>
              )}
            <div className="content" style={{ position: "relative", zIndex: 2 }}>
              <div className="section-eyebrow">{vanMeta?.eyebrow}</div>
              <h1 className="section-title" style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <Icon name={vanMeta?.icon} color={COLORS.sandstone} size={36} />
                {vanMeta?.title}
              </h1>
              {vanMeta?.lead && <p className="section-lead">{vanMeta.lead}</p>}

              {activeTab === "van-venues" && (
                <>
                  <VenueSection sections={vancouverVenueData} />
                </>
              )}

              {activeTab === "van-catering" && (
                <SimpleVendors
                  vendors={vancouverCateringData}
                  infoTitle="Good to Know"
                  infoItems={[
                    "Always confirm whether full service includes setup, serving staff, and cleanup.",
                    "Check if the caterer holds a traveling liquor license  — if so, you may not need a Special Event Permit.",
                    "For blank-canvas venues like Heritage Hall, Pipe Shop, and UBC Botanical Garden, outside catering is required.",
                    "Sea-to-Sky caterers often have mobile kitchens  — confirm if your remote venue has kitchen facilities.",
                  ]}
                />
              )}

              {activeTab === "van-bar" && (
                <>
                  <div className="info-box">
                    <div className="info-box-title">BC Alcohol Licensing: What You Need to Know</div>
                    <ul>
                      <li>In BC, serving alcohol at a private event requires a Special Event Permit (SEP) from the BC Liquor and Cannabis Regulation Branch  — unless your venue or caterer holds their own license.</li>
                      <li>Only the host of the event (the couple) can apply for the SEP  — vendors cannot apply on your behalf.</li>
                      <li>If your venue is a licensed space (hotel, restaurant, or licensed event space), you generally do not need an SEP.</li>
                      <li>If your caterer holds a traveling liquor license (e.g. Cocktails & Canapes, Edge Catering), they can serve alcohol under their own license  — no SEP needed.</li>
                      <li>Apply at lcrb.gov.bc.ca  — at least 30 days before your event, earlier in peak summer season.</li>
                    </ul>
                  </div>
                  <div className="vendor-grid" style={{ marginTop: 24 }}>
                    {vancouverBarData.map((v, i) => <VendorCard key={i} vendor={v} />)}
                  </div>
                  {vancouverBarPending.length > 0 && (
                    <div className="pending">
                      <div className="pending-title">On our radar: additional mobile bar services</div>
                      <div className="pending-list">
                        {vancouverBarPending.map((p, i) => <span key={i} className="pending-tag">{p}</span>)}
                      </div>
                    </div>
                  )}
                </>
              )}

              {activeTab === "van-photo" && (
                <SimpleVendors
                  vendors={vancouverPhotoData}
                  pending={vancouverPhotoPending}
                  pendingLabel="On our radar: additional photographers & videographers"
                  infoTitle="Questions to Ask Every Photographer"
                  infoItems={[
                    "Do you have experience shooting in BC's varied lighting conditions  — bright summer days, golden mountain light, moody winter interiors?",
                    "Do you travel the Sea-to-Sky corridor, and are travel fees included?",
                    "How long until our photos and videos are delivered?",
                    "Do you include a second shooter, or is that an add-on?",
                    "Can we see a full wedding gallery, not just highlight images?",
                  ]}
                />
              )}

              {activeTab === "van-florists" && (
                <>
                  <SimpleVendors
                    vendors={vancouverFloristData}
                    pending={vancouverFloristPending}
                    pendingLabel="On our radar: additional florists"
                    infoTitle="Planning Tips for Wedding Florals"
                    infoItems={[
                      "Book your florist 6-12 months in advance for peak season (June-September).",
                      "For micro-weddings and elopements, look for florists offering a la carte menus with no minimums.",
                      "Ask about locally grown BC blooms  — several florists prioritize seasonal and local sourcing.",
                      "Always confirm travel fees if your venue is in the Sea-to-Sky corridor.",
                    ]}
                  />
                  {vancouverFloristPreservation && vancouverFloristPreservation.length > 0 && (
                    <div className="info-box" style={{ marginTop: 32 }}>
                      <div className="info-box-title">Bouquet Preservation</div>
                      <ul>
                        {vancouverFloristPreservation.map((v, i) => (
                          <li key={i}><strong>{v.name}</strong>  — {v.note} <a href={v.link} target="_blank" rel="noopener noreferrer" style={{ color: COLORS.sandstone }}>{v.url}</a> · {v.ig}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )}

              {activeTab === "van-cakes" && (
                <SimpleVendors
                  vendors={vancouverCakeData}
                  pending={vancouverCakePending}
                  pendingLabel="On our radar: additional bakers"
                  infoTitle="Planning Tips for Wedding Cakes"
                  infoItems={[
                    "Book your cake 2-6 months in advance; some bakers accommodate shorter timelines.",
                    "Always confirm delivery policies  — especially for Sea-to-Sky venues.",
                    "Ask about dietary accommodations early so your baker can plan accordingly.",
                    "Consider a smaller display cake paired with sheet cakes  — a popular and cost-effective option.",
                  ]}
                />
              )}

              {activeTab === "van-dresses" && (
                <div>
                  <div className="info-box">
                    <div className="info-box-title">A Note on Wedding Dress Shopping</div>
                    <ul>
                      <li>Always book an appointment. Vancouver's top boutiques are by appointment only.</li>
                      <li>Allow 4-6 months for made-to-order gowns, plus extra time for alterations.</li>
                      <li>Bring one or two trusted people whose opinion you value, not a crowd.</li>
                      <li>Keep an open mind. The dress you fall in love with may surprise you.</li>
                    </ul>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 32 }}>
                    {vancouverDressData.map((b, i) => (
                      <div key={i} style={{ border: `1px solid ${COLORS.border}`, borderRadius: 4, overflow: "hidden", background: COLORS.white }}>
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

              {activeTab === "van-hair" && (
                <SimpleVendors
                  vendors={vancouverHairMakeupData}
                  pending={vancouverHairMakeupPending}
                  pendingLabel="On our radar: additional hair & makeup artists"
                  infoTitle="Tips for Booking Your Bridal Beauty Team"
                  infoItems={[
                    "Book 6-18 months in advance for peak season (Juneâ“September)  — the best artists fill up fast.",
                    "A trial session is highly recommended even if not required.",
                    "Confirm travel fees upfront if your wedding is in the Sea-to-Sky corridor.",
                    "Ask whether your artist brings a team for larger bridal parties and confirm the timeline.",
                    "Check that products are long-wear and suitable for your skin type  — especially important for outdoor ceremonies.",
                  ]}
                />
              )}

              {activeTab === "van-rentals" && (
                <div>
                  <div className="info-box">
                    <div className="info-box-title">A Note on Event Rentals</div>
                    <ul>
                      <li>Book rentals 3-6 months in advance for peak season, especially for tents and large furniture.</li>
                      <li>Confirm delivery, setup, and pickup fees upfront  — these vary widely.</li>
                      <li>For blank-canvas venues (Pipe Shop, Heritage Hall, UBC Botanical Garden), you'll need to bring in almost everything. Factor this into your budget early.</li>
                      <li>Sea-to-Sky venues: confirm whether the rental company travels to Squamish, Whistler, or Pemberton and what the travel surcharge is.</li>
                    </ul>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 32 }}>
                    {vancouverRentalData.map((b, i) => (
                      <div key={i} style={{ border: `1px solid ${COLORS.border}`, borderRadius: 4, overflow: "hidden", background: COLORS.white }}>
                        <div style={{ background: COLORS.parchment, padding: "20px 24px", borderBottom: `1px solid ${COLORS.border}` }}>
                          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 600, color: COLORS.forest, marginBottom: 4 }}>{b.name}</div>
                          {b.note && <div style={{ fontFamily: "'Jost', sans-serif", fontSize: 12, color: COLORS.sub, marginTop: 4, fontStyle: "italic" }}>{b.note}</div>}
                        </div>
                        <div style={{ padding: "16px 24px", display: "flex", flexDirection: "column", gap: 10 }}>
                          {b.phone && (
                            <div>
                              <div style={{ fontFamily: "'Jost', sans-serif", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: COLORS.sandstone, marginBottom: 3 }}>Phone</div>
                              <div style={{ fontSize: 14, color: COLORS.text }}>{b.phone}</div>
                            </div>
                          )}
                          {b.email && (
                            <div>
                              <div style={{ fontFamily: "'Jost', sans-serif", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: COLORS.sandstone, marginBottom: 3 }}>Email</div>
                              <a href={`mailto:${b.email}`} style={{ fontSize: 14, color: COLORS.forest, textDecoration: "underline", textUnderlineOffset: 3 }}>{b.email}</a>
                            </div>
                          )}
                          {b.ig && (
                            <div>
                              <div style={{ fontFamily: "'Jost', sans-serif", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: COLORS.sandstone, marginBottom: 3 }}>Instagram</div>
                              <a href={b.igLink} target="_blank" rel="noopener noreferrer" style={{ fontSize: 14, color: COLORS.forest, textDecoration: "underline", textUnderlineOffset: 3 }}>{b.ig}</a>
                            </div>
                          )}
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
{activeTab === "van-planners" && (
  <SimpleVendors
    vendors={vancouverPlannerData}
    pending={vancouverPlannerPending}
    pendingLabel="On our radar: additional wedding planners"
    infoTitle="Tips for Hiring a Wedding Planner"
    infoItems={[
      "Book your planner first -- before your venue, caterer, or any other vendor. A good planner will help you find and negotiate with everyone else.",
      "The best planners in Vancouver and the Sea-to-Sky book 1 to 2 years in advance. Don't wait.",
      "Always confirm whether your venue requires a planner from their approved list.",
      "Day-of coordination is not the same as full planning -- make sure you understand what is and isn't included in your package.",
      "Ask how many weddings they take on per year and whether you will work directly with the lead planner or be handed off to a junior coordinator.",
    ]}
  />
)}
              {activeTab === "van-match" && <FindMyMatchVancouver />}
              {activeTab === "van-coming" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                  {[
                    { title: "Vancouver: Coming Next", items: ["Wedding Planners", "Hair & Makeup (additional artists)", "Photography (additional photographers)", "Florists (additional florists)", "Cakes & Desserts (additional bakers)", "Mobile Bar (additional services)"] },
                    { title: "Sea-to-Sky: Coming Next", items: ["Venues (Nita Lake Lodge, Green Water Resort, Squamish Gondola, SLCC, Audain Museum)", "Hair & Makeup", "Wedding Dresses"] },
                    { title: "BC Licensing & Legalities", items: ["Special Event Permit (SEP) full guide", "BC Marriage Licence information", "Outdoor ceremony regulations", "Banff National Park permits (for couples crossing into Alberta)"] },
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
                      <li>Have a vendor recommendation? We love hearing from couples. Your experience makes this guide better for everyone.</li>
                    </ul>
                  </div>
                </div>
              )}

            </div>
            </div>
          )}

          {/* VANCOUVER FOOTER */}
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
              <div style={{ width: 1, height: 32, background: "rgba(196,149,106,0.3)" }} />
              <a href="https://ca.pinterest.com/ultimateweddingguideca" target="_blank" rel="noopener noreferrer" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, textDecoration: "none" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C4956A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.65 7.86 6.39 9.29-.09-.78-.17-1.98.04-2.83.18-.77 1.22-5.17 1.22-5.17s-.31-.62-.31-1.54c0-1.45.84-2.53 1.88-2.53.89 0 1.32.67 1.32 1.47 0 .89-.57 2.24-.86 3.48-.25 1.04.51 1.88 1.53 1.88 1.83 0 3.24-1.93 3.24-4.72 0-2.47-1.77-4.19-4.31-4.19-2.93 0-4.65 2.2-4.65 4.47 0 .88.34 1.83.76 2.35.08.1.09.19.07.29-.08.32-.25 1.04-.28 1.18-.04.19-.14.23-.32.14-1.25-.58-2.03-2.42-2.03-3.89 0-3.15 2.29-6.05 6.61-6.05 3.47 0 6.16 2.47 6.16 5.77 0 3.45-2.17 6.22-5.19 6.22-1.01 0-1.97-.53-2.3-1.15l-.62 2.33c-.23.87-.84 1.96-1.25 2.62.94.29 1.94.45 2.97.45 5.52 0 10-4.48 10-10S17.52 2 12 2z"/>
                </svg>
                <span style={{ fontFamily: "'Jost', sans-serif", fontSize: 10, letterSpacing: 2, color: "#C4956A", textTransform: "uppercase" }}>Pinterest</span>
              </a>
            </div>
            <div className="footer-copy">
              © {new Date().getFullYear()} The Ultimate Wedding Guide, West Coast Edition. All rights reserved.
            </div>
          </footer>
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
          <img src="/hero-photo.jpg" alt="Canadian Rockies wedding" className="cover-bg-photo" />
          <div className="cover-bg-overlay" />
          <div className="cover-title">The Ultimate<br /><span>Wedding Guide</span></div>
          <div className="cover-divider" />
          <div className="cover-cities">Canadian Rockies Edition</div>
          <div className="cover-subtitle" style={{marginTop: 12, fontSize: 14, letterSpacing: 3}}>Calgary  ·  Canmore  ·  Banff</div>
          <div className="cover-subtitle" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}>Your complete guide to planning a Rocky Mountain wedding</div>
          <div style={{ marginTop: 32, position: "relative", zIndex: 3 }}>
            <button
              onClick={async () => { try { const res = await fetch("/.netlify/functions/create-checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ region: "rockies" }) }); const data = await res.json(); if (data.url) window.location.href = data.url; } catch(err) { console.error(err); } }}
              style={{
                background: COLORS.sandstone,
                color: COLORS.forest,
                fontFamily: "'Jost', sans-serif",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: 3,
                textTransform: "uppercase",
                padding: "14px 36px",
                border: "none",
                borderRadius: 2,
                cursor: "pointer",
                transition: "background 0.2s",
              }}
              onMouseOver={e => e.currentTarget.style.background = "#d4a870"}
              onMouseOut={e => e.currentTarget.style.background = COLORS.sandstone}
            >
              Buy the Guide · $29
            </button>
            <p style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: 11,
              letterSpacing: 1,
              color: "rgba(247,243,236,0.5)",
              marginTop: 10,
            }}>CAD · One-time purchase · Lifetime access</p>
          </div>
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
  <button className={`nav-btn ${activeTab === "ask-a-planner" ? "active" : ""}`} onClick={() => setActiveTab("ask-a-planner")}>Expert Q&A</button>
</div>
            <div className="nav-item">
  <button className={`nav-btn ${activeTab === "bridal-beauty-qa" ? "active" : ""}`} onClick={() => setActiveTab("bridal-beauty-qa")}>Bridal Beauty</button>
</div>
            <div className="nav-item">
              <button className={`nav-btn ${vancouverGuideItems.map(i=>i.id).includes(activeTab) ? "active" : ""}`}>
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
           <button className="nav-btn" style={{ padding: "16px 8px", opacity: 0.6, fontSize: 12 }} onClick={() => { setRegion(null); setShowMobileMenu(false); }}>← All Editions</button>
            <button className={`hamburger-btn ${showMobileMenu ? "open" : ""}`} onClick={() => setShowMobileMenu(!showMobileMenu)}>
            THE GUIDE
            </button>
          </div>

          {/* MOBILE DROPDOWN MENU */}
          {showMobileMenu && (
            <div className="mobile-menu">
              <button className="mobile-menu-item" style={{ opacity: 0.5, fontSize: 10 }} onClick={() => { setRegion(null); setShowMobileMenu(false); }}>← All Editions</button>
              <div className="mobile-menu-divider" />
              <button className="mobile-menu-item" onClick={() => { setActiveTab("why"); setShowMobileMenu(false); }}>Our Story</button>
              <button className="mobile-menu-item" onClick={() => { setActiveTab("checklist"); setShowMobileMenu(false); }}>Free Checklist</button>
              <button className="mobile-menu-item" onClick={() => { setActiveTab("ask-a-planner"); setShowMobileMenu(false); }}>Expert Q&A</button>
              <button className="mobile-menu-item" onClick={() => { setActiveTab("bridal-beauty-qa"); setShowMobileMenu(false); }}>Bridal Beauty</button>
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
                Last summer, my close friend got married. She and her husband were so excited, and they deserved every bit of that excitement. But almost immediately, the planning process started to chip away at it. Every week brought a new curveball. Vendors were hard to find, harder to compare, and nearly impossible to vet without spending hours online. Their planner wasn't providing the relief they had hoped for. Arguments became a daily occurrence. The joy of being engaged was getting buried under the weight of logistics.
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: COLORS.text, marginBottom: 24 }}>
                I watched two people who love each other deeply get worn down by a process that should have felt exciting. And I kept thinking: someone should fix this. Someone should do the research, compile the vendors, organize the information, and hand it to couples so they can just breathe and enjoy being engaged.
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: COLORS.text, marginBottom: 24 }}>
                So I did.
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: COLORS.text, marginBottom: 24 }}>
                The Ultimate Wedding Guide, Canadian Rockies Edition, is built for couples who want to feel relief, excitement, and ease when they think about their wedding. Not dread. It is for the bride who opens her laptop to research venues and immediately feels overwhelmed. It is for the couple who just wants someone to tell them where to start. We have done the Googling, made the calls, vetted the vendors, and organized everything into one beautiful resource so you can close the laptop, pour a glass of wine, and actually enjoy this season of your life.
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
        {activeTab === "home" && <LandingPage onBuy={async () => { try { const res = await fetch("/.netlify/functions/create-checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ region: "rockies" }) }); const data = await res.json(); if (data.url) window.location.href = data.url; } catch(err) { console.error(err); } }} setRegion={setRegion} />}

        {/* FREE CHECKLIST */}
        {activeTab === "checklist" && <ChecklistTab />}
        {activeTab === "ask-a-planner" && <SmittenQA />}
        {activeTab === "bridal-beauty-qa" && <BlushAndCocoQA />}
        {/* LOCKED */}
        {isLocked && !unlocked && <LockScreen onUnlock={() => setShowPasswordGate(true)} />}

        {/* UNLOCKED CONTENT */}
        {isLocked && unlocked && (
          <div style={{ position: "relative" }}>
            {meta.bgPhoto && (
              <>
                <div style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `url(${meta.bgPhoto})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundAttachment: "fixed",
                  zIndex: 0,
                }} />
                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(248,244,240,0.55)",
                  zIndex: 1,
                }} />
                {meta.bgPhotoCredit && (
                  <div style={{
                    position: "absolute",
                    bottom: 12,
                    left: 16,
                    zIndex: 10,
                    fontFamily: "'Jost', sans-serif",
                    fontSize: 10,
                    letterSpacing: 1,
                    color: "rgba(42,31,26,0.5)",
                    pointerEvents: "none",
                  }}>
                    {meta.bgPhotoCredit}
                  </div>
                )}
              </>
            )}
          <div className="content" style={{ position: "relative", zIndex: 2 }}>
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
                  color: COLORS.forest,
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
                  For couples planning a religious or spiritual ceremony, Calgary and surrounding area offer a range of beautiful churches and chapels, from grand downtown cathedrals to intimate country chapels.
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
                <div className="info-box-title">Alberta Liquor Licensing: What You Need to Know</div>
                <ul>
                  <li>Couples need a Special Event Licence from AGLC for private events, just $25 at aglc.ca.</li>
                  <li>Most mobile bars cannot supply alcohol under AGLC rules, but staff are ProServe certified to serve it.</li>
                  <li>You can supply your own alcohol, or many services will purchase and deliver it on your behalf.</li>
                  <li>Some venues (like 52 North) require a specific bar service. Always confirm with your venue first.</li>
                </ul>
              </div>
              <div className="vendor-grid" style={{ marginTop: 24 }}>
                {barData.map((v, i) => <VendorCard key={i} vendor={v} />)}
              </div>
              <div className="pending">
                <div className="pending-title">On our radar: additional mobile bar services</div>
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
              pendingLabel="On our radar: additional photographers &amp; videographers"
              infoTitle="Questions to Ask Every Photographer"
              infoItems={[
                "Do you have a permit to shoot inside Banff National Park? Not all photographers do.",
                "Are travel fees included for Canmore and Banff locations?",
                "How long until our photos and videos are delivered?",
                "Do you include a second shooter?",
                "Can we see a full wedding gallery, not just highlight images?",
              ]}
            />
          )}

            {activeTab === "florists" && (
            <SimpleVendors
              vendors={floristData}
              pending={floristPending}
              pendingLabel="On our radar: additional florists"
              infoTitle="Planning Tips for Wedding Florals"
              infoItems={[
                "Book your florist 6–12 months in advance for peak season (June–September).",
                "For micro-weddings and elopements, look for florists offering à la carte menus with no minimums.",
                "Ask about locally grown Alberta blooms, available seasonally and a beautiful regional touch.",
                "Always confirm travel fees for Canmore and Banff before signing a contract.",
              ]}
            />
          )}

            {activeTab === "cakes" && (
            <SimpleVendors
              vendors={cakeData}
              pending={cakePending}
              pendingLabel="On our radar: additional bakers"
              infoTitle="Planning Tips for Wedding Cakes"
              infoItems={[
                "Book your cake 3–6 months in advance; some bakers accommodate shorter timelines.",
                "Check delivery policies carefully, as some bakers do not deliver to mountain venues in winter.",
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
                  <li>Always book an appointment. Calgary's top boutiques are by appointment only.</li>
                  <li>Allow 4–6 months for made-to-order gowns, plus extra time for alterations.</li>
                  <li>Bring one or two trusted people whose opinion you value, not a crowd.</li>
                  <li>Keep an open mind. The dress you fall in love with may surprise you.</li>
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
  {b.email && (
    <div>
      <div style={{ fontFamily: "'Jost', sans-serif", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: COLORS.sandstone, marginBottom: 3 }}>Email</div>
      <div style={{ fontSize: 14, color: COLORS.text }}>{b.email}</div>
    </div>
  )}
  <div>
    <div style={{ fontFamily: "'Jost', sans-serif", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: COLORS.sandstone, marginBottom: 3 }}>Instagram</div>
    <a href={b.igLink} target="_blank" rel="noopener noreferrer" style={{ fontSize: 14, color: COLORS.forest, textDecoration: "underline", textUnderlineOffset: 3 }}>{b.ig}</a>
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

            {activeTab === "hair" && (
            <SimpleVendors
              vendors={hairMakeupData}
              pending={hairMakeupPending}
              pendingLabel="On our radar: additional hair &amp; makeup artists"
              infoTitle="Tips for Booking Your Bridal Beauty Team"
              infoItems={[
                "Book 8–12 months in advance for peak season (June–September), as the best artists fill up fast.",
                "A trial session is highly recommended even if not required. It's your chance to perfect the look before the big day.",
                "Confirm travel fees upfront if your wedding is in Canmore or Banff.",
                "Ask whether your artist brings a team for larger bridal parties, and confirm the timeline allows enough time per person.",
                "Check that your artist uses long-wear products suited to your skin type, especially important for outdoor mountain ceremonies.",
              ]}
            />
          )}
          {activeTab === "rentals" && (
            <div>
              <div className="info-box">
                <div className="info-box-title">A Note on Event Rentals</div>
                <ul>
                  <li>Book rentals 3–6 months in advance for peak season (June–September), especially for tents and large furniture pieces.</li>
                  <li>Confirm delivery, setup, and pickup fees upfront — these vary widely and can add up quickly.</li>
                  <li>Some rental companies work from preferred vendor lists at certain venues, so check with your venue before booking.</li>
                  <li>For mountain weddings in Canmore or Banff, always confirm whether the company travels outside Calgary and what the travel surcharge is.</li>
                </ul>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 32 }}>
                {rentalData.map((b, i) => (
                  <div key={i} style={{
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: 4,
                    overflow: "hidden",
                    background: COLORS.white,
                    transition: "box-shadow 0.2s",
                  }}>
                    <div style={{ background: COLORS.parchment, padding: "20px 24px", borderBottom: `1px solid ${COLORS.border}` }}>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 600, color: COLORS.forest, marginBottom: 4 }}>{b.name}</div>
                      {b.note && <div style={{ fontFamily: "'Jost', sans-serif", fontSize: 12, color: COLORS.sub, marginTop: 4, fontStyle: "italic" }}>{b.note}</div>}
                    </div>
                    <div style={{ padding: "16px 24px", display: "flex", flexDirection: "column", gap: 10 }}>
                      {b.phone && (
                        <div>
                          <div style={{ fontFamily: "'Jost', sans-serif", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: COLORS.sandstone, marginBottom: 3 }}>Phone</div>
                          <div style={{ fontSize: 14, color: COLORS.text }}>{b.phone}</div>
                        </div>
                      )}
                      {b.email && (
                        <div>
                          <div style={{ fontFamily: "'Jost', sans-serif", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: COLORS.sandstone, marginBottom: 3 }}>Email</div>
                          <a href={`mailto:${b.email}`} style={{ fontSize: 14, color: COLORS.forest, textDecoration: "underline", textUnderlineOffset: 3 }}>{b.email}</a>
                        </div>
                      )}
                      {b.ig && (
                        <div>
                          <div style={{ fontFamily: "'Jost', sans-serif", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: COLORS.sandstone, marginBottom: 3 }}>Instagram</div>
                          <a href={b.igLink} target="_blank" rel="noopener noreferrer" style={{ fontSize: 14, color: COLORS.forest, textDecoration: "underline", textUnderlineOffset: 3 }}>{b.ig}</a>
                        </div>
                      )}
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
            {activeTab === "match" && <FindMyMatch />}
            {activeTab === "coming" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {[
                { title: "Calgary: On Our Radar", items: ["Suit Rentals", "Officiant Services", "Transportation", "Music: DJs & Live Bands", "Audio/Visual & Sound Production"] },
                { title: "Canmore & Banff: Coming Next", items: ["Venues", "Catering", "Photography", "Florals", "Cakes & Desserts", "Hair & Makeup", "Music", "Transportation", "Guest Experience & Tourism", "Accommodations"] },
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
                  <li>Have a vendor recommendation? We love hearing from couples. Your experience makes this guide better for everyone.</li>
                </ul>
              </div>
            </div>
          )}
        </div>
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
            © {new Date().getFullYear()} The Ultimate Wedding Guide, Canadian Rockies Edition. All rights reserved.
          </div>
        </footer>

      </div>
    </>
  );


}
