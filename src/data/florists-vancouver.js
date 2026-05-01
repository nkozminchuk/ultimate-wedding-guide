// =============================================================================
// DATA / FLORISTS-VANCOUVER.JS — Vancouver & Sea-to-Sky florists
// Field order: Style → Services → Pricing → Minimum → Consultations
//   → Booking → Delivery → Travel → Note → Email → Instagram → Website
// =============================================================================

export const vancouverFloristData = [
  { name: "Celsia Floral", tier: "$/$$/$$$", fields: [
    { label: "Style", value: "Full range — from awe-inspiring installations to understated bouquets; bespoke or à la carte" },
    { label: "Services", value: "Bespoke full service (on-site design team, custom proposal) · À La Carte (self-select from online shop, pick-up or delivery for additional fee)" },
    { label: "Pricing — Bespoke", value: "From $6,500 minimum" },
    { label: "Pricing — À La Carte", value: "Signature bridal bouquet from $260; pick-up at Mount Pleasant warehouse" },
    { label: "Consultations", value: "Yes — custom design proposal for Bespoke clients" },
    { label: "Note", value: "Bespoke is recommended for ceremony arches, floral backdrops, and larger-scale installations. À La Carte is ideal for couples working with a more conservative budget.", full: true },
    { label: "Email", value: "hello@celsiaflorist.com" },
    { label: "Instagram", value: "@celsiafloral" },
    { label: "Website", value: "celsiafloral.com/weddingshop", link: "https://www.celsiafloral.com/weddingshop" },
  ]},

  { name: "Garden Party Flowers", tier: "$/$$", fields: [
    { label: "Style", value: "Lush and romantic; refined, airy, natural silhouette that prioritizes the flower's form; adaptable to modern and classic aesthetics" },
    { label: "Services", value: "Full service (bouquets, centrepieces, ceremony arches, large-scale installations) · À La Carte option for smaller orders without installation" },
    { label: "Pricing", value: "No overall minimum; bridal bouquets from $275" },
    { label: "Consultations", value: "Yes — free consultations available" },
    { label: "Booking Lead Time", value: "3+ months recommended, especially June–September" },
    { label: "Travel", value: "Yes — Squamish, Whistler, and Pemberton regularly" },
    { label: "Email", value: "info@gardenpartyflowers.ca" },
    { label: "Instagram", value: "@gardenpartyflowers" },
    { label: "Website", value: "gardenpartyflowers.ca", link: "https://gardenpartyflowers.ca" },
  ]},

  { name: "The Bloomerie", tier: "$", fields: [
    { label: "Style", value: "Classic" },
    { label: "Services", value: "Full service — bouquets, centrepieces, ceremony arch, installations" },
    { label: "Pricing", value: "From $275 (bouquet and boutonniere)" },
    { label: "Consultations", value: "Yes — free 30-min Zoom + free AI-generated floral model" },
    { label: "Booking Lead Time", value: "2 weeks minimum" },
    { label: "Travel", value: "Yes — Sea-to-Sky" },
    { label: "Email", value: "thebloomerieflorist@gmail.com" },
    { label: "Instagram", value: "@thebloomerieflorist" },
    { label: "Website", value: "thebloomerie.ca/weddings", link: "https://thebloomerie.ca/weddings/" },
  ]},

  { name: "Leis de Buds", tier: "$$", fields: [
    { label: "Style", value: "Full service — bouquets to large-scale installations; transparent pricing on website" },
    { label: "Services", value: "Full service — bouquets, centrepieces, ceremony arches, installations" },
    { label: "Pricing", value: "$1,000 minimum for weddings" },
    { label: "Consultations", value: "After completing 2025 Wedding Questionnaire; 10-min call (free) or full Design Studio consultation ($50, 1–1.5 hrs)" },
    { label: "Booking Lead Time", value: "As early as possible; books quickly for spring and summer" },
    { label: "Exclusivity", value: "Require to be the only professional florist at weddings they service" },
    { label: "Travel", value: "Yes — Whistler and the islands" },
    { label: "Email", value: "info@leisdebuds.com" },
    { label: "Instagram", value: "@leisdebuds" },
    { label: "Website", value: "leisdebuds.com/events", link: "https://leisdebuds.com/pages/events" },
  ]},

  { name: "Senka Florist", tier: "$/$$", fields: [
    { label: "Style", value: "Romantic, organic, and nature-inspired; elegant and lush with intention — fresh and effortless" },
    { label: "Services", value: "Full service and à la carte — bouquets, personals, centrepieces, ceremony flowers, arch and décor rentals, installations, reception florals" },
    { label: "Pricing", value: "No strict minimum; bridal bouquets from $185+" },
    { label: "Consultations", value: "Yes — complimentary by email, phone, or in person" },
    { label: "Booking Lead Time", value: "6–12 months recommended for peak season; shorter timelines welcome" },
    { label: "Delivery", value: "Yes — delivers to venues; on-site setup available" },
    { label: "Travel", value: "Regularly services Squamish, Whistler, Pemberton, and surrounding areas; travel and delivery fees vary by location and scope" },
    { label: "Note", value: "Whistler-based — one of the most accessible florists in the Sea-to-Sky with no strict minimum spend. Arch and décor rentals included in their services.", full: true },
    { label: "Email", value: "info@senkaflorist.com" },
    { label: "Instagram", value: "@senka_florist" },
    { label: "Website", value: "senkaflorist.com", link: "https://www.senkaflorist.com" },
  ]},
];

export const vancouverFloristPending = [
  "The Flower Library  flowerlibrary.ca  @the_flowerlibrary",
  "Botany & Bloom  botanybloom.ca  @botanyandbloom",
  "Blossom and Vine  blossomandvinefloralco.com  @blossomandvinefloralco",
  "The Flower Factory  flowerfactory.ca  @flowerfactory",
  "Studio Full Bloom  studiofullbloom.com  @studiofullbloom",
  "The Wild Bunch  thewildbunch.ca  @the_wildbunch",
  "Floba Design  flobadesign.ca  @flobadesign",
  "Oak & Willow Floral Design  oakandwillowflorist.com  @oakandwillowflorist",
  "Flowers & Jules  flowersandjules.com (Sea-to-Sky)",
  "Ninebark Floral Design  ninebarkdesign.com (Sea-to-Sky)",
  "Bliss Event  blissevent.ca  @blisswhistler (Sea-to-Sky — also wedding planner)",
];

// ── BOUQUET PRESERVATION ──────────────────────────────────────────────────────
// Feature as a planning tip callout at the bottom of the Florists section
export const vancouverFloristPreservation = [
  {
    name: "Dear Flora",
    note: "Want to keep your bouquet forever? Ask about preservation services — Dear Flora specializes in turning wedding bouquets into lasting keepsakes.",
    url: "dearflora.ca",
    link: "https://www.dearflora.ca",
    ig: "@dear__flora",
    email: "hello@dearflora.ca",
  },
];
