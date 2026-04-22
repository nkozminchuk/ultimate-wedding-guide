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
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 38, fontWeight: 400, color: "#2C4A3E", marginBottom: 12, lineHeight: 1.1 }}>
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

function GiftModal({ onClose }) {
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
            <p className="gift-modal-sub">The perfect gift for any engaged couple: full vendor directory, budget guide, checklist and more across Calgary, Canmore &amp; Banff.</p>
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

function LandingPage({ onBuy }) {
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
              border: `1px solid ${c.status === "In Progress" ? "#2C4A3E" : "#D4C5A9"}`,
              borderRadius: 4,
              padding: "16px 18px",
              background: c.status === "In Progress" ? "#E8F0ED" : "#FFFFFF",
            }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: "#2C4A3E", marginBottom: 3 }}>{c.city}</div>
              <div style={{ fontFamily: "'Jost', sans-serif", fontSize: 11, color: "#6B6B6B", letterSpacing: 1, marginBottom: 8 }}>{c.region}</div>
              <div style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: 10, letterSpacing: 2, textTransform: "uppercase",
                color: c.status === "In Progress" ? "#2C4A3E" : "#C4956A",
                background: c.status === "In Progress" ? "rgba(44,74,62,0.1)" : "rgba(196,149,106,0.1)",
                padding: "3px 10px", borderRadius: 20, marginBottom: 12, display: "block",
              }}>{c.status}</div>
              <button
                onClick={() => { setNotifyCity(c.city); setShowNotify(true); }}
                style={{
                  width: "100%",
                  fontFamily: "'Jost', sans-serif", fontSize: 10, letterSpacing: 2,
                  textTransform: "uppercase", color: "#2C4A3E",
                  background: "none", border: "1px solid #D4C5A9", borderRadius: 2,
                  padding: "7px 12px", cursor: "pointer", transition: "all 0.2s",
                }}
                onMouseOver={e => { e.currentTarget.style.borderColor = "#C4956A"; e.currentTarget.style.color = "#C4956A"; }}
                onMouseOut={e => { e.currentTarget.style.borderColor = "#D4C5A9"; e.currentTarget.style.color = "#2C4A3E"; }}
              >
                Notify Me
              </button>
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

export default function App() {
  const [region, setRegion] = useState(null);
  const [activeTab, setActiveTab] = useState("home");
  const [unlocked, setUnlocked] = useState(false);
  const [showPasswordGate, setShowPasswordGate] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showNotify, setShowNotify] = useState(false);
  const [notifyCity, setNotifyCity] = useState("");
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
          .region-card.coming .region-notify { pointer-events: auto; cursor: pointer; }
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
          {showNotify && <NotifyModal cityName={notifyCity} onClose={() => setShowNotify(false)} />}
          <div className="region-eyebrow">The Ultimate Wedding Guide</div>
          <h1 className="region-title">Your dream wedding<br /><span>starts here.</span></h1>
          <p className="region-sub">We have done the research, vetted the vendors, and organized everything — so you don't have to. Select your region and let's get planning.</p>
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
              <div className="region-desc">36 venues, 9 caterers, 7 florists, photographers, bakers, mobile bars and more, all vetted and ready.</div>
              <div className="region-cta">Explore the Guide →</div>
            </div>

            {/* COMING SOON */}
            {[
              { name: "Vancouver & Sea-to-Sky", cities: "Vancouver · Whistler · Squamish", desc: "From waterfront venues to mountain lodges, the ultimate guide to BC coastal weddings." },
              { name: "Okanagan", cities: "Kelowna · Penticton · Vernon", desc: "Vineyard ceremonies, orchard receptions, and stunning lake views. Wine country weddings done right." },
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
          <div style={{ marginTop: 32, position: "relative" }}>
            <button
              onClick={() => setActiveTab("budget")}
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
        {activeTab === "home" && <LandingPage onBuy={() => setActiveTab("budget")} />}

        {/* FREE CHECKLIST */}
        {activeTab === "checklist" && <ChecklistTab />}

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
                { title: "Calgary: On Our Radar", items: ["Hair & Makeup", "Suit Rentals", "Officiant Services", "Decor & Lighting Rentals", "Transportation", "Music: DJs & Live Bands", "Audio/Visual & Sound Production"] },
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
