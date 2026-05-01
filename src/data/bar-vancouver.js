// =============================================================================
// DATA / BAR-VANCOUVER.JS — Vancouver & Sea-to-Sky mobile bar services
// Field order: Setup → Pricing → Alcohol → SEP → Cocktails → Mocktails
//   → Guest Count → Licensed & Insured → Travel → Note
//   → Phone → Email → Instagram → Website
//
// IMPORTANT: BC uses a Special Event Permit (SEP) system — different from
// Alberta's AGLC. See the SEP explainer at the top of this tab.
// =============================================================================

export const vancouverBarData = [
  { name: "Liquid Assets Professional Bartending", tier: "$/$$", fields: [
    { label: "Setup", value: "Portable bar + bar kit provided; glassware, mix, and alcohol are host's responsibility — they will create a shopping list with quantities" },
    { label: "Pricing", value: "Per staff hour + gratuity + fees for ice, garnishes, and portable bar rental" },
    { label: "Alcohol", value: "Client supplies own alcohol" },
    { label: "SEP", value: "Client responsible for Special Event Permit — Liquid Assets can help guide the process. Note: it is illegal for anyone except the host of the event to obtain the SEP." },
    { label: "Cocktails", value: "Signature cocktail creation available on request; focus on classic cocktails" },
    { label: "Mocktails", value: "Yes" },
    { label: "Guest Count", value: "Minimum 10 guests · can handle several thousand; approx. 1 bartender per 40 guests" },
    { label: "Licensed & Insured", value: "Yes" },
    { label: "Email", value: "scott@liquidassetsbartending.com" },
    { label: "Instagram", value: "@liquid_assets_hospitality" },
    { label: "Website", value: "liquidassetsbartending.com", link: "https://liquidassetsbartending.com" },
  ]},

  { name: "Roaming Spirits", tier: "$/$$", fields: [
    { label: "Setup", value: "Two mobile bars; full setup included — non-alcoholic drinks, mixers, garnishes, plastic cups, ice, and all equipment" },
    { label: "Pricing", value: "Packages from ~$750–$2,500 depending on guest count and needs; staffing-only options available from a few hundred dollars" },
    { label: "Alcohol", value: "Client supplies own alcohol" },
    { label: "SEP", value: "Client's responsibility as host and alcohol supplier" },
    { label: "Cocktails", value: "Yes — custom cocktail menu available" },
    { label: "Mocktails", value: "Yes" },
    { label: "Guest Count", value: "No minimum or maximum — events from 6 to 350+ guests" },
    { label: "Licensed & Insured", value: "Yes" },
    { label: "Email", value: "brianna@roaming-spirits.com" },
    { label: "Instagram", value: "@roamingspiritsmobilebar" },
    { label: "Website", value: "roaming-spirits.com", link: "https://www.roaming-spirits.com" },
  ]},
];

export const vancouverBarPending = [
  "Tipsy Pony Mobile Bar  tipsypony.ca  @tipsypony.ca",
  "Bad Horse Mobile Bars  badhorsemobilebars.ca  @badhorsemobilebars",
  "Free Pour Brothers  freepourbrothers.com  @freepourbrothers",
  "Sip Social  sipsocialco.com/vancouver  @sipsocialco",
];
