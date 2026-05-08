import { useState } from "react";

// ─── Design tokens ────────────────────────────────────────────────────────────
const C = {
  forest:    "#2C4A3E",
  sandstone: "#C4956A",
  gold:      "#8B6914",
  cream:     "#F7F3EC",
  parchment: "#EDE8DF",
  mint:      "#E8F0ED",
  text:      "#2A2A2A",
  sub:       "#6B6B6B",
  border:    "#D4C5A9",
  white:     "#FFFFFF",
};

// ─── Venue data — sourced from venues-vancouver.js ────────────────────────────
const VENUES = [
  // Vancouver — Luxury Hotels
  { name: "Fairmont Hotel Vancouver",      city: "Vancouver",          vibe: ["grand","elegant","classic"],         capacity: 1000, budget: "$$$",   catering: "in-house",  outdoor: false, note: "Iconic heritage hotel. Soaring ceilings, grand staircase, rooftop access for photos with skyline views." },
  { name: "Fairmont Pacific Rim",          city: "Vancouver",          vibe: ["grand","elegant","modern"],          capacity: 500,  budget: "$$$",   catering: "in-house",  outdoor: false, note: "Modern luxury waterfront hotel. Forbes Five Star service. Packages from $25,000–$70,000." },
  { name: "Fairmont Waterfront",           city: "Vancouver",          vibe: ["elegant","romantic","classic"],      capacity: 300,  budget: "$$$",   catering: "in-house",  outdoor: true,  note: "Terrace Herb Garden is one of the few outdoor ceremony spaces downtown with genuine harbour views." },
  { name: "Rosewood Hotel Georgia",        city: "Vancouver",          vibe: ["grand","elegant","classic"],         capacity: 300,  budget: "$$$",   catering: "in-house",  outdoor: false, note: "1927 heritage landmark. Spanish Ballroom with minstrel balcony — one of Vancouver's most distinctive spaces." },
  { name: "JW Marriott Parq Vancouver",    city: "Vancouver",          vibe: ["grand","modern","elegant"],          capacity: 1144, budget: "$$$",   catering: "in-house",  outdoor: true,  note: "Vancouver's largest hotel ballroom (15,604 sq ft). Rooftop Park Level garden with pond and city views." },
  { name: "The Westin Bayshore",           city: "Vancouver",          vibe: ["grand","elegant","classic"],         capacity: 1750, budget: "$$$",   catering: "in-house",  outdoor: true,  note: "Waterfront luxury near Coal Harbour Marina and Stanley Park. Garden and poolside outdoor spaces." },
  { name: "Pan Pacific Hotel Vancouver",   city: "Vancouver",          vibe: ["grand","elegant","modern"],          capacity: 500,  budget: "$$$",   catering: "in-house",  outdoor: false, note: "Luxury hotel at Canada Place with iconic views of the harbour, mountains, and North Shore." },
  // Vancouver — Historic & Character
  { name: "Cecil Green Park House (UBC)",  city: "Vancouver",          vibe: ["romantic","garden","elegant"],       capacity: 200,  budget: "$$",    catering: "exclusive", outdoor: true,  note: "UBC heritage mansion with private gardens, glass terrace, and sweeping views. Sage Catering exclusive." },
  { name: "Robert H. Lee Alumni Centre",   city: "Vancouver",          vibe: ["elegant","classic","modern"],        capacity: 280,  budget: "$$",    catering: "flexible",  outdoor: false, note: "Elegant UBC campus venue. 11+ preferred caterers. Low season July–August — better rates in summer." },
  { name: "Hycroft Manor",                 city: "Vancouver",          vibe: ["romantic","elegant","grand"],        capacity: 100,  budget: "$$$",   catering: "in-house",  outdoor: true,  note: "Historic heritage manor with rose garden, Juliet balcony, and grand terrace. Grand and one of a kind." },
  { name: "The Permanent",                 city: "Vancouver",          vibe: ["unique","elegant","classic"],        capacity: 268,  budget: "$$",    catering: "flexible",  outdoor: false, note: "Historic bank building turned elegant event venue. Venue holds the liquor license — no Special Event Permit needed." },
  { name: "Stanley Park Pavilion",         city: "Vancouver",          vibe: ["romantic","elegant","garden"],       capacity: 250,  budget: "$$",    catering: "in-house",  outdoor: true,  note: "1913 Swiss-chalet heritage in the heart of Stanley Park. Seamless indoor-outdoor flow with formal gardens." },
  // Vancouver — Outdoor & Garden
  { name: "VanDusen Botanical Garden",     city: "Vancouver",          vibe: ["garden","romantic","unique"],        capacity: 200,  budget: "$$",    catering: "flexible",  outdoor: true,  note: "55-acre botanical garden oasis. 7,500+ plant species. Ideal for nature-loving and eco-conscious couples." },
  { name: "UBC Botanical Garden",          city: "Vancouver",          vibe: ["garden","romantic","relaxed"],       capacity: 300,  budget: "$/$$",  catering: "flexible",  outdoor: true,  note: "Ocean-view settings, Japanese garden, and coastal forest glades. 40% off Oct–Apr on main spaces." },
  { name: "Dr. Sun Yat-Sen Classical Chinese Garden", city: "Vancouver", vibe: ["unique","romantic","intimate"],   capacity: 150,  budget: "$",     catering: "flexible",  outdoor: true,  note: "Authentic Ming Dynasty classical Chinese garden. One of the most serene ceremony settings in Vancouver." },
  // Vancouver — Unique & Modern
  { name: "Heritage Hall",                 city: "Vancouver",          vibe: ["unique","relaxed","classic"],        capacity: 200,  budget: "$",     catering: "flexible",  outdoor: false, note: "Elegant heritage building — a blank slate with character in central Vancouver. Very affordable." },
  { name: "Commodore Ballroom",            city: "Vancouver",          vibe: ["unique","grand","modern"],           capacity: 1100, budget: "$$$",   catering: "exclusive", outdoor: false, note: "Iconic Vancouver music venue — industrial, atmospheric, unforgettable. Best for non-traditional grand celebrations." },
  // Vancouver & North Vancouver — Waterfront
  { name: "The Pipe Shop",                 city: "North Vancouver",    vibe: ["unique","modern","industrial"],      capacity: 360,  budget: "$$",    catering: "exclusive", outdoor: false, note: "1940s industrial-chic heritage warehouse at The Shipyards. 7,900 sq ft open-concept blank canvas." },
  { name: "Pinnacle Hotel at the Pier",    city: "North Vancouver",    vibe: ["elegant","modern","waterfront"],     capacity: 350,  budget: "$$/$$$$",catering: "in-house", outdoor: true,  note: "Boutique waterfront hotel in the Shipyards District. Rooftop terrace ceremony with Burrard Inlet views." },
  { name: "Prospect Point",               city: "Vancouver",          vibe: ["unique","romantic","waterfront"],    capacity: 400,  budget: "$$",    catering: "in-house",  outdoor: true,  note: "Newly renovated at the tip of Stanley Park. Breathtaking Lions Gate Bridge and harbour views." },
  // Sea-to-Sky
  { name: "Fergie's Sunwolf",              city: "Squamish",           vibe: ["rustic","intimate","mountain"],      capacity: 175,  budget: "$/$$",  catering: "in-house",  outdoor: true,  note: "Riverside resort on 5.5 forested acres. Full weekend buyout with 12 cabins. 45 min from Vancouver or Whistler." },
  { name: "Furry Creek Golf Club",         city: "Squamish",           vibe: ["mountain","elegant","relaxed"],      capacity: 200,  budget: "$$",    catering: "in-house",  outdoor: true,  note: "Scenic ocean and mountain views from Howe Sound. No F&B minimum off-season — great value for fall/winter." },
  { name: "Nita Lake Lodge",               city: "Whistler",           vibe: ["mountain","elegant","romantic"],     capacity: 200,  budget: "$$$",   catering: "in-house",  outdoor: true,  note: "Michelin Key 2025 boutique lakeside resort. Professional wedding planner required. Stunning year-round." },
  { name: "Green Water Resort",            city: "Pemberton",          vibe: ["intimate","rustic","mountain"],      capacity: 20,   budget: "$/$$",  catering: "flexible",  outdoor: true,  note: "7-acre private oasis on the Lillooet River. Best for micro-weddings and elopements under 20 guests." },
  { name: "North Arm Farm",                city: "Pemberton",          vibe: ["rustic","intimate","garden"],        capacity: 100,  budget: "$/$$",  catering: "flexible",  outdoor: true,  note: "The Sea-to-Sky's beloved family farm. Authentic rustic mountain setting — a true farm wedding." },
  { name: "Sea to Sky Gondola",            city: "Squamish",           vibe: ["unique","mountain","iconic"],        capacity: 150,  budget: "$$",    catering: "in-house",  outdoor: true,  note: "Panoramic views of Howe Sound and Shannon Falls at 885m elevation. Gondola arrival is part of the magic." },
  { name: "Squamish Lil'wat Cultural Centre", city: "Whistler",        vibe: ["unique","mountain","elegant"],       capacity: 300,  budget: "$$/$$$$",catering: "in-house", outdoor: true,  note: "Award-winning Indigenous cultural centre. Great Hall with suspended canoes and traditional carvings. Deeply meaningful." },
  { name: "Audain Art Museum",             city: "Whistler",           vibe: ["unique","modern","elegant"],         capacity: 200,  budget: "$$/$$$$",catering: "flexible",  outdoor: true,  note: "Whistler's premier contemporary art museum. Stunning architecture surrounded by world-class art." },
];

// ─── Quiz steps ───────────────────────────────────────────────────────────────
const STEPS = [
  {
    id: "city",
    question: "Where are you getting married?",
    sub: "Or choose All to explore the full West Coast corridor.",
    type: "single",
    options: [
      { value: "all",           label: "Anywhere on the West Coast" },
      { value: "Vancouver",     label: "Vancouver" },
      { value: "North Vancouver", label: "North Vancouver" },
      { value: "Squamish",      label: "Squamish" },
      { value: "Whistler",      label: "Whistler" },
      { value: "Pemberton",     label: "Pemberton" },
    ],
  },
  {
    id: "guests",
    question: "How many guests are you expecting?",
    sub: "Include your full guest list, vendors, and bridal party.",
    type: "single",
    options: [
      { value: "micro",  label: "Under 30",  note: "Elopement / micro" },
      { value: "small",  label: "30–80",     note: "Intimate" },
      { value: "medium", label: "80–175",    note: "Classic" },
      { value: "large",  label: "175–350",   note: "Grand" },
      { value: "xlarge", label: "350+",      note: "Large-scale" },
    ],
  },
  {
    id: "vibe",
    question: "What's your wedding vibe?",
    sub: "Pick up to two that resonate most.",
    type: "multi",
    max: 2,
    options: [
      { value: "elegant",    label: "Elegant & Refined" },
      { value: "rustic",     label: "Rustic & Warm" },
      { value: "mountain",   label: "Mountain & Wild" },
      { value: "romantic",   label: "Romantic & Intimate" },
      { value: "grand",      label: "Grand & Statement-making" },
      { value: "unique",     label: "Unique & Unexpected" },
      { value: "garden",     label: "Garden & Outdoorsy" },
      { value: "modern",     label: "Modern & Minimal" },
      { value: "waterfront", label: "Waterfront & Scenic" },
    ],
  },
  {
    id: "budget",
    question: "What's your venue budget range?",
    sub: "Per person, venue + catering combined.",
    type: "single",
    options: [
      { value: "$",    label: "Under $100/person",  note: "$ range" },
      { value: "$$",   label: "$100–$200/person",   note: "$$ range" },
      { value: "$$$",  label: "$200–$300/person",   note: "$$$ range" },
      { value: "flex", label: "Budget is flexible", note: "Show everything" },
    ],
  },
  {
    id: "outdoor",
    question: "Is an outdoor ceremony important to you?",
    sub: "West Coast weather is stunning — and unpredictable.",
    type: "single",
    options: [
      { value: "yes",  label: "Yes — outdoor ceremony is a must" },
      { value: "nice", label: "Preferred, but not essential" },
      { value: "no",   label: "We'd prefer everything indoors" },
    ],
  },
];

const GUEST_MIN = { micro: 0, small: 30, medium: 80, large: 175, xlarge: 350 };
const GUEST_MAX = { micro: 30, small: 80, medium: 175, large: 350, xlarge: 9999 };

function scoreVenue(venue, answers) {
  let score = 0;

  // City match
  if (answers.city !== "all" && venue.city !== answers.city) return -1;

  // Capacity — hard filter if venue is too small
  const minGuests = GUEST_MIN[answers.guests] ?? 0;
  if (venue.capacity < minGuests) return -1;
  if (venue.capacity >= (GUEST_MAX[answers.guests] ?? 9999) * 0.7) score += 2;

  // Vibe
  const vibeMatches = (answers.vibe || []).filter(v => venue.vibe.includes(v)).length;
  score += vibeMatches * 3;

  // Budget
  if (answers.budget !== "flex") {
    const budgets = venue.budget.split("/");
    if (budgets.includes(answers.budget)) score += 2;
    else if (answers.budget === "$$$" && budgets.includes("$$")) score += 1;
    else if (answers.budget === "$" && !budgets.includes("$$$")) score += 1;
  } else {
    score += 1;
  }

  // Outdoor
  if (answers.outdoor === "yes" && !venue.outdoor) return -1;
  if (answers.outdoor === "yes" && venue.outdoor) score += 2;
  if (answers.outdoor === "nice" && venue.outdoor) score += 1;

  return score;
}

const COMPARE_FIELDS = [
  { key: "city",     label: "Location" },
  { key: "budget",   label: "Budget Range" },
  { key: "capacity", label: "Max Capacity", render: v => `${v} guests` },
  { key: "catering", label: "Catering",     render: v => ({ "in-house": "In-house", "flexible": "Bring your own", "preferred": "Preferred partner", "exclusive": "Exclusive partner" }[v] || v) },
  { key: "outdoor",  label: "Outdoor Option", render: v => v ? "Yes" : "Indoor only" },
  { key: "vibe",     label: "Vibe",         render: v => v.join(", ") },
  { key: "note",     label: "Planning Tip" },
];

// ─── Styles ───────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Jost:wght@300;400;500;600&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }

  .fmm-wrap { font-family: 'Jost', sans-serif; color: ${C.text}; background: ${C.cream}; min-height: 100vh; padding: 48px 24px 80px; }

  .fmm-header { text-align: center; margin-bottom: 48px; }
  .fmm-eyebrow { font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: ${C.sandstone}; margin-bottom: 16px; }
  .fmm-title { font-family: 'Cormorant Garamond', serif; font-size: 48px; font-weight: 400; color: ${C.forest}; line-height: 1.15; margin-bottom: 12px; }
  .fmm-title em { font-style: italic; color: ${C.sandstone}; }
  .fmm-subtitle { font-size: 15px; color: ${C.sub}; max-width: 480px; margin: 0 auto; line-height: 1.6; }

  .fmm-progress { max-width: 560px; margin: 0 auto 40px; }
  .fmm-progress-bar { height: 2px; background: ${C.border}; border-radius: 2px; overflow: hidden; margin-bottom: 8px; }
  .fmm-progress-fill { height: 100%; background: ${C.sandstone}; transition: width 0.4s ease; }
  .fmm-progress-label { font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; color: ${C.sub}; text-align: right; }

  .fmm-step { max-width: 560px; margin: 0 auto; animation: fadeUp 0.35s ease both; }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
  .fmm-question { font-family: 'Cormorant Garamond', serif; font-size: 30px; font-weight: 500; color: ${C.forest}; margin-bottom: 6px; line-height: 1.25; }
  .fmm-question-sub { font-size: 13px; color: ${C.sub}; margin-bottom: 28px; font-style: italic; }

  .fmm-options { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 32px; }
  .fmm-options.single-col { grid-template-columns: 1fr; }
  .fmm-option { border: 1.5px solid ${C.border}; border-radius: 4px; padding: 16px 18px; background: ${C.white}; cursor: pointer; transition: border-color 0.18s, background 0.18s, transform 0.15s; display: flex; align-items: center; text-align: left; }
  .fmm-option:hover { border-color: ${C.sandstone}; background: ${C.parchment}; transform: translateY(-1px); }
  .fmm-option.selected { border-color: ${C.forest}; background: ${C.mint}; }
  .fmm-option-label { font-size: 14px; font-weight: 500; color: ${C.forest}; line-height: 1.3; display: block; }
  .fmm-option-note { font-size: 11px; color: ${C.sub}; letter-spacing: 0.5px; margin-top: 2px; display: block; }

  .fmm-nav { display: flex; justify-content: space-between; align-items: center; gap: 12px; }
  .fmm-btn { font-family: 'Jost', sans-serif; font-size: 11px; font-weight: 500; letter-spacing: 2.5px; text-transform: uppercase; padding: 14px 32px; border: none; border-radius: 2px; cursor: pointer; transition: background 0.2s, opacity 0.2s; }
  .fmm-btn-primary { background: ${C.forest}; color: ${C.white}; }
  .fmm-btn-primary:hover { background: #1e342a; }
  .fmm-btn-primary:disabled { opacity: 0.4; cursor: not-allowed; }
  .fmm-btn-ghost { background: transparent; color: ${C.sub}; border: 1px solid ${C.border}; }
  .fmm-btn-ghost:hover { border-color: ${C.sandstone}; color: ${C.sandstone}; }

  .fmm-results { max-width: 900px; margin: 0 auto; animation: fadeUp 0.4s ease both; }
  .fmm-results-header { text-align: center; margin-bottom: 40px; }
  .fmm-results-title { font-family: 'Cormorant Garamond', serif; font-size: 40px; font-weight: 400; color: ${C.forest}; margin-bottom: 10px; }
  .fmm-results-title em { font-style: italic; color: ${C.sandstone}; }
  .fmm-results-sub { font-size: 14px; color: ${C.sub}; line-height: 1.6; }

  .fmm-matches { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px; margin-bottom: 48px; }
  .fmm-match-card { border: 1.5px solid ${C.border}; border-radius: 4px; background: ${C.white}; overflow: hidden; transition: box-shadow 0.2s, transform 0.2s; cursor: pointer; position: relative; }
  .fmm-match-card:hover { box-shadow: 0 6px 24px rgba(44,74,62,0.1); transform: translateY(-2px); }
  .fmm-match-card.selected-for-compare { border-color: ${C.forest}; box-shadow: 0 0 0 2px ${C.forest}; }
  .fmm-match-rank { position: absolute; top: 12px; left: 12px; background: ${C.sandstone}; color: ${C.white}; font-size: 10px; font-weight: 600; letter-spacing: 1px; padding: 3px 10px; border-radius: 20px; }
  .fmm-match-header { background: ${C.parchment}; padding: 40px 18px 16px; border-bottom: 1px solid ${C.border}; }
  .fmm-match-city { font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: ${C.sandstone}; margin-bottom: 4px; }
  .fmm-match-name { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 600; color: ${C.forest}; line-height: 1.2; }
  .fmm-match-tier { display: inline-block; margin-top: 8px; font-size: 11px; font-weight: 600; color: ${C.gold}; letter-spacing: 1px; background: rgba(139,105,20,0.1); padding: 3px 10px; border-radius: 20px; }
  .fmm-match-body { padding: 16px 18px; }
  .fmm-match-row { display: flex; justify-content: space-between; gap: 8px; padding: 6px 0; border-bottom: 1px solid ${C.parchment}; font-size: 13px; }
  .fmm-match-row:last-child { border-bottom: none; }
  .fmm-match-row-label { color: ${C.sub}; flex-shrink: 0; }
  .fmm-match-row-val { color: ${C.text}; font-weight: 500; text-align: right; }
  .fmm-match-note { font-size: 12px; color: ${C.sub}; font-style: italic; line-height: 1.5; margin-top: 12px; padding-top: 12px; border-top: 1px solid ${C.parchment}; }
  .fmm-compare-hint { font-size: 11px; color: ${C.sandstone}; letter-spacing: 0.5px; margin-top: 8px; text-align: center; }

  .fmm-compare-bar { position: sticky; bottom: 24px; background: ${C.forest}; color: ${C.white}; border-radius: 4px; padding: 14px 24px; display: flex; align-items: center; justify-content: space-between; gap: 16px; box-shadow: 0 8px 32px rgba(44,74,62,0.3); margin-bottom: 40px; animation: slideUp 0.3s ease both; }
  @keyframes slideUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
  .fmm-compare-bar-left { font-size: 13px; font-weight: 500; }
  .fmm-compare-bar-names { font-size: 11px; opacity: 0.7; margin-top: 2px; }
  .fmm-compare-actions { display: flex; gap: 10px; }
  .fmm-btn-compare { font-family: 'Jost', sans-serif; font-size: 11px; font-weight: 500; letter-spacing: 2px; text-transform: uppercase; padding: 10px 22px; border: none; border-radius: 2px; cursor: pointer; }
  .fmm-btn-compare-go { background: ${C.sandstone}; color: ${C.white}; transition: background 0.2s; }
  .fmm-btn-compare-go:hover { background: #b5844f; }
  .fmm-btn-compare-go:disabled { opacity: 0.4; cursor: not-allowed; }
  .fmm-btn-compare-clear { background: transparent; color: rgba(255,255,255,0.6); border: 1px solid rgba(255,255,255,0.25); }
  .fmm-btn-compare-clear:hover { color: ${C.white}; }

  .fmm-comparison { margin-top: 48px; animation: fadeUp 0.4s ease both; }
  .fmm-comparison-title { font-family: 'Cormorant Garamond', serif; font-size: 32px; font-weight: 500; color: ${C.forest}; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid ${C.border}; display: flex; align-items: center; justify-content: space-between; }
  .fmm-table-wrap { overflow-x: auto; border: 1px solid ${C.border}; border-radius: 4px; }
  table.fmm-table { width: 100%; border-collapse: collapse; font-size: 13px; }
  .fmm-table thead tr { background: ${C.parchment}; }
  .fmm-table th { padding: 14px 18px; text-align: left; border-bottom: 2px solid ${C.border}; border-right: 1px solid ${C.border}; min-width: 160px; }
  .fmm-table th:first-child { min-width: 130px; font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; color: ${C.sub}; font-weight: 500; background: ${C.cream}; }
  .fmm-table th.venue-col { font-family: 'Cormorant Garamond', serif; font-size: 18px; font-weight: 600; color: ${C.forest}; }
  .fmm-table th.venue-col .th-city { font-family: 'Jost', sans-serif; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: ${C.sandstone}; font-weight: 400; display: block; margin-bottom: 3px; }
  .fmm-table td { padding: 13px 18px; border-bottom: 1px solid ${C.parchment}; border-right: 1px solid ${C.parchment}; color: ${C.text}; vertical-align: top; line-height: 1.5; }
  .fmm-table td:first-child { font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase; color: ${C.sandstone}; font-weight: 500; background: ${C.cream}; white-space: nowrap; }
  .fmm-table tr:last-child td { border-bottom: none; }
  .fmm-table tr:hover td { background: ${C.parchment}; }
  .fmm-table tr:hover td:first-child { background: ${C.cream}; }
  .fmm-tag { display: inline-block; padding: 2px 9px; border-radius: 20px; font-size: 11px; font-weight: 600; letter-spacing: 0.5px; }
  .fmm-tag-yes { background: ${C.mint}; color: ${C.forest}; }
  .fmm-tag-no  { background: ${C.parchment}; color: ${C.sub}; }

  .fmm-retry { text-align: center; margin-top: 48px; padding-top: 40px; border-top: 1px solid ${C.border}; }
  .fmm-retry-text { font-size: 13px; color: ${C.sub}; margin-bottom: 16px; font-style: italic; }
  .fmm-no-results { text-align: center; padding: 60px 24px; background: ${C.parchment}; border-radius: 4px; border: 1px solid ${C.border}; }
  .fmm-no-results-title { font-family: 'Cormorant Garamond', serif; font-size: 28px; color: ${C.forest}; margin-bottom: 10px; }
  .fmm-no-results-sub { font-size: 14px; color: ${C.sub}; line-height: 1.6; }

  @media (max-width: 600px) {
    .fmm-title { font-size: 36px; }
    .fmm-options { grid-template-columns: 1fr; }
    .fmm-question { font-size: 24px; }
    .fmm-results-title { font-size: 30px; }
    .fmm-matches { grid-template-columns: 1fr; }
    .fmm-compare-bar { flex-direction: column; align-items: flex-start; }
  }
`;

export default function FindMyMatchVancouver() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [compareList, setCompareList] = useState([]);
  const [showComparison, setShowComparison] = useState(false);

  const current = STEPS[step];

  function handleSelect(val) {
    if (current.type === "single") {
      setAnswers(prev => ({ ...prev, [current.id]: val }));
    } else {
      setAnswers(prev => {
        const cur = prev[current.id] || [];
        if (cur.includes(val)) return { ...prev, [current.id]: cur.filter(v => v !== val) };
        if (cur.length >= (current.max || 99)) return prev;
        return { ...prev, [current.id]: [...cur, val] };
      });
    }
  }

  function isSelected(val) {
    if (current.type === "single") return answers[current.id] === val;
    return (answers[current.id] || []).includes(val);
  }

  function canAdvance() {
    if (current.type === "single") return !!answers[current.id];
    return (answers[current.id] || []).length > 0;
  }

  function next() {
    if (step < STEPS.length - 1) setStep(s => s + 1);
    else setShowResults(true);
  }
  function back() {
    if (showResults) { setShowResults(false); setStep(STEPS.length - 1); }
    else if (step > 0) setStep(s => s - 1);
  }
  function reset() {
    setStep(0); setAnswers({}); setShowResults(false);
    setCompareList([]); setShowComparison(false);
  }

  const scored = VENUES
    .map(v => ({ ...v, score: scoreVenue(v, answers) }))
    .filter(v => v.score >= 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8);

  function toggleCompare(name) {
    setCompareList(prev => {
      if (prev.includes(name)) return prev.filter(n => n !== name);
      if (prev.length >= 3) return prev;
      return [...prev, name];
    });
    setShowComparison(false);
  }

  const compareVenues = scored.filter(v => compareList.includes(v.name));

  return (
    <>
      <style>{css}</style>
      <div className="fmm-wrap">
        <div className="fmm-header">
          <div className="fmm-eyebrow">West Coast Edition</div>
          <h1 className="fmm-title">Find Your<br /><em>Perfect Venue</em></h1>
          <p className="fmm-subtitle">Answer 5 quick questions and we'll match you with the venues that fit your vision — then compare them side by side.</p>
        </div>

        {!showResults ? (
          <>
            <div className="fmm-progress">
              <div className="fmm-progress-bar">
                <div className="fmm-progress-fill" style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
              </div>
              <div className="fmm-progress-label">Question {step + 1} of {STEPS.length}</div>
            </div>

            <div className="fmm-step" key={step}>
              <div className="fmm-question">{current.question}</div>
              <div className="fmm-question-sub">{current.sub}</div>

              <div className={`fmm-options ${current.options.length <= 3 ? "single-col" : ""}`}>
                {current.options.map(opt => (
                  <button
                    key={opt.value}
                    className={`fmm-option ${isSelected(opt.value) ? "selected" : ""}`}
                    onClick={() => handleSelect(opt.value)}
                  >
                    <span>
                      <span className="fmm-option-label">{opt.label}</span>
                      {opt.note && <span className="fmm-option-note">{opt.note}</span>}
                    </span>
                  </button>
                ))}
              </div>

              <div className="fmm-nav">
                {step > 0
                  ? <button className="fmm-btn fmm-btn-ghost" onClick={back}>← Back</button>
                  : <span />
                }
                <button className="fmm-btn fmm-btn-primary" onClick={next} disabled={!canAdvance()}>
                  {step === STEPS.length - 1 ? "Find My Venues →" : "Next →"}
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="fmm-results">
            <div className="fmm-results-header">
              <div className="fmm-eyebrow">Your Matches</div>
              <h2 className="fmm-results-title">
                {scored.length > 0
                  ? <><em>{scored.length} venues</em> matched your vision</>
                  : "Let's broaden your search"}
              </h2>
              <p className="fmm-results-sub">
                {scored.length > 0
                  ? "Tap up to 3 venues to compare them side by side."
                  : "No venues matched all your criteria. Try adjusting your preferences."}
              </p>
            </div>

            {scored.length === 0 ? (
              <div className="fmm-no-results">
                <div className="fmm-no-results-title">No exact matches found</div>
                <p className="fmm-no-results-sub">Try relaxing your outdoor requirement, expanding your city selection, or adjusting your budget range.</p>
              </div>
            ) : (
              <div className="fmm-matches">
                {scored.map((venue, i) => (
                  <div
                    key={venue.name}
                    className={`fmm-match-card ${compareList.includes(venue.name) ? "selected-for-compare" : ""}`}
                    onClick={() => toggleCompare(venue.name)}
                  >
                    <div className="fmm-match-rank">#{i + 1} Match</div>
                    <div className="fmm-match-header">
                      <div className="fmm-match-city">{venue.city}</div>
                      <div className="fmm-match-name">{venue.name}</div>
                      <div className="fmm-match-tier">{venue.budget}</div>
                    </div>
                    <div className="fmm-match-body">
                      <div className="fmm-match-row">
                        <span className="fmm-match-row-label">Capacity</span>
                        <span className="fmm-match-row-val">Up to {venue.capacity}</span>
                      </div>
                      <div className="fmm-match-row">
                        <span className="fmm-match-row-label">Catering</span>
                        <span className="fmm-match-row-val">
                          {{ "in-house": "In-house", "flexible": "Bring your own", "preferred": "Preferred partner", "exclusive": "Exclusive" }[venue.catering] || venue.catering}
                        </span>
                      </div>
                      <div className="fmm-match-row">
                        <span className="fmm-match-row-label">Outdoor</span>
                        <span className="fmm-match-row-val">{venue.outdoor ? "✓ Available" : "Indoor only"}</span>
                      </div>
                      <div className="fmm-match-note">{venue.note}</div>
                      <div className="fmm-compare-hint">
                        {compareList.includes(venue.name) ? "✓ Added to compare" : "Tap to add to comparison"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {compareList.length > 0 && (
              <div className="fmm-compare-bar">
                <div className="fmm-compare-bar-left">
                  <div>{compareList.length} venue{compareList.length > 1 ? "s" : ""} selected {compareList.length < 2 ? "— select 1–2 more to compare" : ""}</div>
                  <div className="fmm-compare-bar-names">{compareList.join(" · ")}</div>
                </div>
                <div className="fmm-compare-actions">
                  <button className="fmm-btn-compare fmm-btn-compare-clear" onClick={() => setCompareList([])}>Clear</button>
                  <button
                    className="fmm-btn-compare fmm-btn-compare-go"
                    disabled={compareList.length < 2}
                    onClick={() => { setShowComparison(true); setTimeout(() => document.getElementById("fmm-comparison-van")?.scrollIntoView({ behavior: "smooth" }), 50); }}
                  >
                    Compare {compareList.length > 1 ? `${compareList.length} Venues →` : ""}
                  </button>
                </div>
              </div>
            )}

            {showComparison && compareVenues.length >= 2 && (
              <div className="fmm-comparison" id="fmm-comparison-van">
                <div className="fmm-comparison-title">
                  <span>Side-by-Side Comparison</span>
                  <button className="fmm-btn fmm-btn-ghost" style={{ fontSize: 11 }} onClick={() => setShowComparison(false)}>Close ✕</button>
                </div>
                <div className="fmm-table-wrap">
                  <table className="fmm-table">
                    <thead>
                      <tr>
                        <th></th>
                        {compareVenues.map(v => (
                          <th key={v.name} className="venue-col">
                            <span className="th-city">{v.city}</span>
                            {v.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {COMPARE_FIELDS.map(field => (
                        <tr key={field.key}>
                          <td>{field.label}</td>
                          {compareVenues.map(v => {
                            const raw = v[field.key];
                            const val = field.render ? field.render(raw) : raw;
                            if (field.key === "outdoor") {
                              return <td key={v.name}><span className={`fmm-tag ${raw ? "fmm-tag-yes" : "fmm-tag-no"}`}>{val}</span></td>;
                            }
                            return <td key={v.name}>{val}</td>;
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <div className="fmm-retry">
              <p className="fmm-retry-text">Want different results? Adjust your preferences and search again.</p>
              <button className="fmm-btn fmm-btn-ghost" onClick={back}>← Edit Answers</button>
              &nbsp;&nbsp;
              <button className="fmm-btn fmm-btn-primary" onClick={reset}>Start Over</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
