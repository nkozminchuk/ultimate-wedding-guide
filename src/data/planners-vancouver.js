// =============================================================================
// DATA / PLANNERS-VANCOUVER.JS — Vancouver & Sea-to-Sky wedding planners
// Field order: Style → Experience → Services → Specialty → Design
//   → Pricing → Deposit → Booking → Travel → Vendor Relationships
//   → Inclusivity → Note → Phone → Email → Instagram → Website
// =============================================================================

export const vancouverPlannerData = [
  { name: "The Bridal Bar Weddings", tier: "$/$$/$$$", fields: [
    { label: "Style", value: "All styles welcomed -- from rustic farm charm to glam luxury; approach varies by planner, matched to each couple's personality" },
    { label: "Experience", value: "15+ years · 3 full-time planners · award-winning floral designer on team" },
    { label: "Services", value: "Full planning · Partial planning · Day-of coordination (starting 90 days out) · E-Planner (virtual planning + day-of attendance) · Pop-Up Weddings (full ceremony included, guests just show up) · Destination weddings" },
    { label: "Specialty", value: "Multicultural weddings -- weaving multiple traditions and cultures into one celebration is a true strength; also elopements, intimate, large, and destination" },
    { label: "Design", value: "Yes -- award-winning Vancouver floral designer on the team" },
    { label: "Pricing", value: "From $1,500 depending on services requested" },
    { label: "Deposit", value: "$500 deposit + signed agreement to book; intake questionnaire completed; matched with best-fit planner; live planning software set up for constant updates" },
    { label: "Day-of Coordination", value: "Starts 90 days out -- significantly earlier than the industry standard of 30 days; fewer surprises and mistakes on the day" },
    { label: "Travel", value: "Worldwide -- nearly every continent; travel fees apply outside home base" },
    { label: "Vendor Relationships", value: "Trusted preferred vendor list; always open to working with couple's chosen vendors; note -- some venues have vendor blacklists so confirm venue approval before booking any vendor" },
    { label: "Inclusivity", value: "LGBTQIA2S+ friendly and celebratory -- all love welcomed" },
    { label: "Locations", value: "Vancouver + Summerland, BC (Okanagan)" },
    { label: "Phone", value: "604-830-2526" },
    { label: "Email", value: "hello@thebridalbar.ca" },
    { label: "Instagram", value: "@thebridalbarweddings" },
    { label: "Website", value: "thebridalbar.ca", link: "https://www.thebridalbar.ca" },
  ]},

  { name: "Brilliant Events", tier: "$$$", fields: [
    { label: "Style", value: "Bespoke, luxury wedding planning; deeply personal approach -- starts by learning your love story; warm, calm, and impeccably organized" },
    { label: "Founder", value: "Liz Tiedeman -- one of the most respected planners in the Sea-to-Sky corridor" },
    { label: "Experience", value: "Multi-year veteran; trusted by the Fairmont Chateau Whistler, SLCC, and top Sea-to-Sky vendors" },
    { label: "Services", value: "Full wedding planning and design · Day-of coordination · Elopements · Destination weddings (including international) · Multi-cultural and multi-faith weddings" },
    { label: "Specialties", value: "Double weddings · multi-faith and multi-cultural weddings (Hindu, Jewish, Sikh, and more) · destination weddings abroad" },
    { label: "Territory", value: "Whistler · Pemberton · Squamish · destinations beyond (including international)" },
    { label: "Pricing", value: "Custom quote -- contact for pricing; packages tailored to each couple" },
    { label: "Note", value: "Currently booking 2027+ -- book early. Liz is the most recommended planner in the Sea-to-Sky corridor by other vendors.", full: true },
    { label: "Email", value: "liz@brilliantevents.ca" },
    { label: "Instagram", value: "@brillianteventswhistler" },
    { label: "Website", value: "brilliantevents.ca", link: "https://brilliantevents.ca" },
  ]},

  { name: "Smitten Events", tier: "$$/$$$ ", fields: [
    { label: "Style", value: "Warm, detail-obsessed, project-management-driven planning; deeply personal approach -- focused on keeping couples present for every moment" },
    { label: "Services", value: "Full Wedding Planning (from $15,000) · Partial Wedding Planning (from $7,000) · Takeover Coordination (from $5,000 -- steps in at 6 months, full takeover at 6 weeks)" },
    { label: "Full Planning", value: "From $15,000 -- full start-to-finish planning, vendor sourcing, budget management, design, day-of execution" },
    { label: "Partial Planning", value: "From $7,000 -- monthly checklists, vendor recommendations, budget guidance + full day-of coverage" },
    { label: "Takeover Coordination", value: "From $5,000 -- digital planning guide from booking; planner steps in at 6 months; full takeover at 6 weeks (timeline, vendor correspondence, rehearsal, wedding day)" },
    { label: "Territory", value: "Vancouver + Okanagan confirmed; worldwide available" },
    { label: "Press", value: "Planned Jillian Harris + Justin Pasutto's wedding (as seen in People Magazine)" },
    { label: "Email", value: "info@smittenevents.ca" },
    { label: "Instagram", value: "@smitten_events" },
    { label: "Website", value: "smittenevents.ca/weddings", link: "https://www.smittenevents.ca/weddings" },
  ]},

  { name: "Wednesday Wedding Co.", tier: "$$/$$$", fields: [
    { label: "Style", value: "Award-winning creative boutique specializing in design-forward, unconventional weddings; combines professional planning with creative set design -- for the couple who wants their wedding to feel like art" },
    { label: "Founded", value: "2018 · Vancouver, BC · 15+ years hospitality and event expertise across the team" },
    { label: "Services", value: "Full planning + design + production · Event management (vendor takeover 4 to 6 weeks out) · Creative direction + styling" },
    { label: "Pricing", value: "Hybrid model -- flat rate + percentage of vendor costs (excluding venue, caterer, photographer/videographer, clothing, rings, and wedding party gifts); paid in 4 installments" },
    { label: "Decor Rentals", value: "Growing in-house inventory + strong relationships with top rental companies" },
    { label: "Territory", value: "Pacific Northwest primarily; travel available worldwide at additional cost" },
    { label: "Notable Venues", value: "Audain Art Museum (Whistler) · UBC Botanical Garden · Bodega Ridge (Galiano Island)" },
    { label: "Note", value: "Currently booking 2027 -- book early.", full: true },
    { label: "Email", value: "hello@wednesdayweddingco.com" },
    { label: "Instagram", value: "@wednesdayweddingco" },
    { label: "Website", value: "wednesdayweddingco.com", link: "https://www.wednesdayweddingco.com" },
  ]},

  { name: "Keepsake Events", tier: "$$", fields: [
    { label: "Style", value: "Warm, calm, and deeply personal planning; led by Mel -- known for listening with intention and injecting each couple's personality into every detail" },
    { label: "Team", value: "Melanie (Mel) -- lead planner · Agnes -- also speaks Cantonese and Mandarin" },
    { label: "Services", value: "Full wedding planning (from $10,000 + tax) · Wedding day management (from $3,250 + tax)" },
    { label: "Full Planning", value: "From $10,000 + tax -- full vendor sourcing, budget management, timelines, logistics, and day-of execution" },
    { label: "Wedding Day Management", value: "From $3,250 + tax -- steps in to tie up loose ends and carry plans through on the day" },
    { label: "Languages", value: "English (Mel and Agnes) · Cantonese and Mandarin (Agnes)" },
    { label: "Territory", value: "Vancouver and Whistler" },
    { label: "Process", value: "Inquiry → information package → free 30-min consultation → custom proposal → contract + deposit" },
    { label: "Email", value: "melanie@keepsakeevents.ca" },
    { label: "Instagram", value: "@keepsakeevents" },
    { label: "Website", value: "keepsakeevents.ca", link: "https://www.keepsakeevents.ca" },
  ]},

  { name: "Lux Affairs", tier: "$$/$$$ ", fields: [
    { label: "Style", value: "Award-winning, international event production firm; bespoke luxury events -- sophisticated, detail-obsessed, and full-service from vision to execution" },
    { label: "Services", value: "Full event production and design · Wedding planning · Event design and decor · Tent rental · Table and chair rental · LED bars and LED furniture rental · Custom LED neon signs · AV · Set design · 3D renderings and drafting" },
    { label: "Territory", value: "Vancouver, Greater Vancouver, international" },
    { label: "Pricing", value: "Custom quotes -- contact for pricing" },
    { label: "Location", value: "19329 Enterprise Way #108, Surrey, BC" },
    { label: "Phone", value: "604-813-7272" },
    { label: "Email", value: "info@luxaffairs.com" },
    { label: "Instagram", value: "@luxaffairs" },
    { label: "Website", value: "luxaffairs.com", link: "https://luxaffairs.com" },
  ]},

  { name: "Bliss Event Co.", tier: "$$/$$$", fields: [
    { label: "Style", value: "Collaborative, detail-driven, and deeply personal; inspired by the natural beauty of Whistler and the surrounding mountains -- refined celebrations that balance elevated design with a warm and welcoming atmosphere" },
    { label: "Services", value: "Complete planning · Partial planning · Partial planning + design · Intimate weddings · Destination elopements" },
    { label: "Specialty", value: "Bespoke weddings of all sizes -- from intimate alpine elopements to large-scale destination celebrations and multi-day wedding weekends; immersive events connected to the surrounding landscape" },
    { label: "Weddings Per Year", value: "Limited intake -- boutique studio intentionally takes on a small number of weddings per year to ensure every couple receives high-level care and creativity" },
    { label: "Pricing", value: "Full planning from $14,000+ · Coordination and partial planning vary by scope -- custom proposal provided after initial consultation" },
    { label: "Booking", value: "12–18 months recommended for full planning and larger wedding weekends, especially peak summer and winter dates; smaller weddings and floral-only may have more flexibility" },
    { label: "Territory", value: "Based in Whistler; primarily serves Whistler, Pemberton & Squamish; select destination weddings throughout BC and beyond" },
    { label: "Note", value: "Bliss Event Co. offers both wedding planning and full-service florals in-house -- planning and design teams work closely together, so every detail feels cohesive and intentionally curated.", full: true },
    { label: "Phone", value: "604-905-9948" },
    { label: "Email", value: "info@blissevent.ca" },
    { label: "Instagram", value: "@blisswhistler" },
    { label: "Website", value: "blissevent.ca", link: "https://www.blissevent.ca" },
  ]},
];

export const vancouverPlannerPending = [
  "Love & Confetti  loveandconfetti.ca (Sea-to-Sky)",
  "Whistler Elopements  whistlerelopements.com (Sea-to-Sky)",
  "Blue Violet Events  bluevioletevents.ca (Sea-to-Sky)",
  "Pocketful Productions  pocketfulproductions.com (Sea-to-Sky)",
  "Sea to Sky Celebrations  seatoskycelebrations.com (Sea-to-Sky)",
  "Kathryn Grayston Weddings (Sea-to-Sky)",
  "DreamGroup Productions  dreamgroup.ca",
  "Filosophi Events  filosophi.com",
  "Petite Pearl Events  petitepearlweddings.com",
  "Umbrella Events  umbrellaevents.ca",
  "Rebel Events  rebelevents.ca",
  "Sweetheart Events  sweetheartevents.ca",
  "Alicia Keats  aliciakeats.com",
];
