// =============================================================================
// DATA / CAKES.JS — Wedding cake & dessert vendors (Calgary)
// Field order: Specialty → Design → Tastings → Pricing → Delivery → Travel → Lead Time → Instagram → Website
// =============================================================================

export const cakeData = [
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

export const cakePending = ["The Cake Trail", "Butter Love Sugar", "Bake My Day", "The Cake Nook", "Kinni Cakery", "Chartier", "Afsheed Cakes and Sweets", "Kakes and Kanvas", "Black Dog Bakery", "Modern Bake", "Cakeworks", "The Engineers Bakery", "Willow Cake and Bake", "Sugar Shimmer", "Sweet Cakes by Vernz", "Yvonne's Delightful Cakes"];
