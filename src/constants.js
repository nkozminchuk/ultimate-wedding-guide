// =============================================================================
// CONSTANTS.JS — Shared design tokens, nav config, and section metadata
// =============================================================================

export const COLORS = {
  forest:    "#2C4A3E",
  gold:      "#8B6914",
  sandstone: "#C4956A",
  cream:     "#F7F3EC",
  parchment: "#EDE8DF",
  mint:      "#E8F0ED",
  text:      "#2A2A2A",
  sub:       "#6B6B6B",
  border:    "#D4C5A9",
  white:     "#FFFFFF",
};

// Add new tabs here. locked: true = requires guide password.
// To add Vancouver: { id: "vancouver-venues", label: "Vancouver Venues", locked: true }
export const tabs = [
  { id: "home",      label: "Home" },
  { id: "checklist", label: "Free Checklist" },
  { id: "why",       label: "Our Story" },
  { id: "budget",    label: "Budget Guide",   locked: true },
  { id: "tracker",   label: "Budget Tracker", locked: true },
  { id: "venues",    label: "Venues",         locked: true },
  { id: "catering",  label: "Catering",       locked: true },
  { id: "bar",       label: "Mobile Bar",     locked: true },
  { id: "photo",     label: "Photography",    locked: true },
  { id: "florists",  label: "Florists",       locked: true },
  { id: "cakes",     label: "Cakes",          locked: true },
  { id: "dresses",   label: "Wedding Dresses",  locked: true },
  { id: "hair",      label: "Hair & Makeup",    locked: true },
  { id: "rentals",   label: "Event Rentals",    locked: true },
  { id: "coming",    label: "On Our Radar",     locked: true },
];

// Controls the eyebrow, title, and lead paragraph at the top of each tab.
export const sectionMeta = {
  home:      { eyebrow: "Canadian Rockies Edition", title: "The Ultimate Wedding Guide", lead: "" },
  why:       { eyebrow: "Behind the Guide", title: "Our Story", lead: "", icon: "story" },
  checklist: { eyebrow: "Canadian Rockies Edition", title: "Wedding Planning Checklist", lead: "From the moment you get engaged to the moment you say \"I do\" — every task, every milestone, beautifully organized.", icon: "checklist" },
  budget:    { eyebrow: "Canadian Rockies Edition", title: "Budget Planning Guide", lead: "Every dream wedding is different — and so is every budget. Find the tier that fits your vision and explore vendors that align with your investment.", icon: "budget" },
  tracker:   { eyebrow: "Canadian Rockies Edition", title: "Budget Tracker", lead: "Track your wedding budget in real time. Your data is saved automatically between visits.", icon: "budget" },
  venues:    { eyebrow: "Calgary · Canmore · Banff", title: "Venues", lead: "From grand Calgary hotel ballrooms and rustic mountain barns to intimate Canmore spaces and iconic Banff resorts — the Canadian Rockies corridor offers some of the most breathtaking wedding venues in the world.", icon: "venues" },
  catering:  { eyebrow: "Calgary", title: "Catering", lead: "For venues without in-house catering, these Calgary caterers bring exceptional skill, flexibility, and style to your wedding table.", icon: "catering" },
  bar:       { eyebrow: "Calgary", title: "Mobile Bar Services", lead: "Alberta's liquor laws make mobile bar services unique. Here's everything you need to know — and the best services in the city.", icon: "bar" },
  photo:     { eyebrow: "Calgary", title: "Photography & Videography", lead: "Your photos and film are the memories you will revisit for the rest of your lives. Alberta's landscapes reward photographers who truly know light.", icon: "photo" },
  florists:  { eyebrow: "Calgary", title: "Florists", lead: "Florals set the tone for your entire wedding aesthetic. Calgary's florist community is exceptionally talented — and nearly all travel to Canmore and Banff.", icon: "florists" },
  cakes:     { eyebrow: "Calgary", title: "Cakes & Desserts", lead: "From elegant tiered cakes to whimsical dessert tables, Calgary's bakers are exceptionally talented. Whatever your vision and budget, there is a baker here for you.", icon: "cakes" },
  dresses:   { eyebrow: "Calgary", title: "Wedding Dresses", lead: "Finding your dress is one of the most magical moments of wedding planning. We recommend visiting each of these boutiques in person — no online browsing compares to trying on the real thing.", icon: "dresses" },
  hair:      { eyebrow: "Calgary", title: "Hair & Makeup", lead: "The right hair and makeup artist makes you feel like yourself — only more so. Calgary's bridal beauty artists are exceptionally talented, and most travel to Canmore and Banff.", icon: "hair" },
  rentals:   { eyebrow: "Calgary", title: "Event Rentals", lead: "From furniture and linens to tent packages and statement décor, these Calgary rental companies help bring your wedding vision to life — whether you're hosting downtown or up in the mountains.", icon: "venues" },
  coming:    { eyebrow: "Canadian Rockies Edition", title: "On Our Radar", lead: "We are constantly scouting, vetting, and adding to this guide. Consider this your insider preview of what's coming — and a reminder that the best vendors book fast.", icon: "coming" },
};
