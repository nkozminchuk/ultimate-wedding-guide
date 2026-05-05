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

export const tabs = [
  { id: "home",      label: "Home" },
  { id: "checklist", label: "Free Checklist" },
  { id: "why",       label: "Our Story" },
  { id: "budget",    label: "Budget Guide",     locked: true },
  { id: "tracker",   label: "Budget Tracker",   locked: true },
  { id: "venues",    label: "Venues",           locked: true },
  { id: "catering",  label: "Catering",         locked: true },
  { id: "bar",       label: "Mobile Bar",       locked: true },
  { id: "photo",     label: "Photography",      locked: true },
  { id: "florists",  label: "Florists",         locked: true },
  { id: "cakes",     label: "Cakes",            locked: true },
  { id: "dresses",   label: "Wedding Dresses",  locked: true },
  { id: "hair",      label: "Hair & Makeup",    locked: true },
  { id: "rentals",   label: "Event Rentals",    locked: true },
  { id: "coming",    label: "On Our Radar",     locked: true },
];

export const sectionMeta = {
  home:      { eyebrow: "Canadian Rockies Edition", title: "The Ultimate Wedding Guide", lead: "" },
  why:       { eyebrow: "Behind the Guide", title: "Our Story", lead: "", icon: "story" },
  checklist: { eyebrow: "Canadian Rockies Edition", title: "Wedding Planning Checklist", lead: "From the moment you get engaged to the moment you say \"I do\" -- every task, every milestone, beautifully organized.", icon: "checklist" },
  budget:    { eyebrow: "Canadian Rockies Edition", title: "Budget Planning Guide", lead: "Every dream wedding is different -- and so is every budget. Find the tier that fits your vision and explore vendors that align with your investment.", icon: "budget" },
  tracker:   { eyebrow: "Canadian Rockies Edition", title: "Budget Tracker", lead: "Track your wedding budget in real time. Your data is saved automatically between visits.", icon: "budget" },
  venues:    { eyebrow: "Calgary - Canmore - Banff", title: "Venues", lead: "From grand Calgary hotel ballrooms and rustic mountain barns to intimate Canmore spaces and iconic Banff resorts -- the Canadian Rockies corridor offers some of the most breathtaking wedding venues in the world.", icon: "venues" },
  catering:  { eyebrow: "Calgary", title: "Catering", lead: "For venues without in-house catering, these Calgary caterers bring exceptional skill, flexibility, and style to your wedding table.", icon: "catering" },
  bar:       { eyebrow: "Calgary", title: "Mobile Bar Services", lead: "Alberta's liquor laws make mobile bar services unique. Here's everything you need to know -- and the best services in the city.", icon: "bar" },
  photo:     { eyebrow: "Calgary", title: "Photography & Videography", lead: "Your photos and film are the memories you will revisit for the rest of your lives. Alberta's landscapes reward photographers who truly know light.", icon: "photo" },
  florists:  { eyebrow: "Calgary", title: "Florists", lead: "Florals set the tone for your entire wedding aesthetic. Calgary's florist community is exceptionally talented -- and nearly all travel to Canmore and Banff.", icon: "florists" },
  cakes:     { eyebrow: "Calgary", title: "Cakes & Desserts", lead: "From elegant tiered cakes to whimsical dessert tables, Calgary's bakers are exceptionally talented. Whatever your vision and budget, there is a baker here for you.", icon: "cakes" },
  dresses:   { eyebrow: "Calgary", title: "Wedding Dresses", lead: "Finding your dress is one of the most magical moments of wedding planning. We recommend visiting each of these boutiques in person -- no online browsing compares to trying on the real thing.", icon: "dresses" },
  hair:      { eyebrow: "Calgary", title: "Hair & Makeup", lead: "The right hair and makeup artist makes you feel like yourself -- only more so. Calgary's bridal beauty artists are exceptionally talented, and most travel to Canmore and Banff.", icon: "hair" },
  rentals:   { eyebrow: "Calgary", title: "Event Rentals", lead: "From furniture and linens to tent packages and statement decor, these Calgary rental companies help bring your wedding vision to life -- whether you're hosting downtown or up in the mountains.", icon: "venues" },
  coming:    { eyebrow: "Canadian Rockies Edition", title: "On Our Radar", lead: "We are constantly scouting, vetting, and adding to this guide. Consider this your insider preview of what's coming -- and a reminder that the best vendors book fast.", icon: "coming" },

  "van-venues":   { eyebrow: "Vancouver - Squamish - Whistler - Pemberton", title: "Venues", lead: "From grand Vancouver hotel ballrooms and waterfront spaces to intimate heritage venues, botanical gardens, and Sea-to-Sky mountain escapes -- the West Coast offers some of Canada's most breathtaking wedding settings.", icon: "venues" },
  "van-catering": { eyebrow: "Vancouver & Sea-to-Sky", title: "Catering", lead: "Vancouver's catering scene is world-class. These vetted teams bring exceptional skill, creativity, and West Coast flavour to your wedding table.", icon: "catering" },
  "van-bar":      { eyebrow: "Vancouver & Sea-to-Sky", title: "Mobile Bar Services", lead: "BC's Special Event Permit (SEP) system governs alcohol at private events. Here's everything you need to know -- and the best mobile bar services in the region.", icon: "bar" },
  "van-photo":    { eyebrow: "Vancouver & Sea-to-Sky", title: "Photography & Videography", lead: "BC's landscapes -- ocean, forest, mountain -- reward photographers who truly know light. These are the best in the region.", icon: "photo" },
  "van-florists": { eyebrow: "Vancouver & Sea-to-Sky", title: "Florists", lead: "From lush romantic arrangements to organic, nature-inspired designs, Vancouver's florist community is exceptionally talented -- and many travel the Sea-to-Sky corridor.", icon: "florists" },
  "van-cakes":    { eyebrow: "Vancouver & Sea-to-Sky", title: "Cakes & Desserts", lead: "From modern minimalist tiered cakes to whimsical structural creations, Vancouver's bakers bring exceptional craft to your wedding table.", icon: "cakes" },
  "van-dresses":  { eyebrow: "Vancouver", title: "Wedding Dresses", lead: "Finding your dress is one of the most magical moments of wedding planning. Vancouver's bridal boutiques offer something for every style.", icon: "dresses" },
  "van-hair":     { eyebrow: "Vancouver & Sea-to-Sky", title: "Hair & Makeup", lead: "The right artist makes you feel like yourself -- only more so. Vancouver's bridal beauty team is world-class, and most travel the Sea-to-Sky corridor.", icon: "hair" },
  "van-rentals":  { eyebrow: "Vancouver & Sea-to-Sky", title: "Event Rentals", lead: "From furniture and linens to custom builds and statement decor, these companies help bring your West Coast wedding vision to life.", icon: "venues" },
  "van-planners": { eyebrow: "Vancouver & Sea-to-Sky", title: "Wedding Planners", lead: "The right planner makes everything easier -- and in Vancouver's competitive wedding market, the best ones book years in advance. Here are the West Coast's finest.", icon: "coming" },
  "van-coming":   { eyebrow: "West Coast Edition", title: "On Our Radar", lead: "We are constantly scouting, vetting, and adding to this guide. Here's what's coming next for the West Coast Edition.", icon: "coming" },
};
