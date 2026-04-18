// =============================================================================
// DATA / VENUES.JS — All venue data: Calgary, Canmore, Banff + churches
//
// STRUCTURE: venueData is an array of section objects:
//   { sub, location?, note?, vendors?, plain? }
// VENDOR FIELD ORDER: Style → Pricing → Capacity → Catering → Ceremony
//   → Parking → Services/Includes/Extras → Note → Vendor List
//   → Phone → Email → Instagram → Website
// TO ADD A NEW CITY: add a new section object with location: 'Vancouver' etc.
// =============================================================================

export const venueData = [
  {
    sub: "Hotel & Ballroom",
    vendors: [
      {
        name: "The Fairmont Palliser",
        tier: "$$$",
        fields: [
          { label: "Pricing", value: "$5,650–$27,800 venue + $125–$157+ per person catering" },
          { label: "Capacity", value: "Up to 450 guests" },
          { label: "Catering", value: "In-house" },
          { label: "Ceremony", value: "Indoor" },
          { label: "Parking", value: "Yes" },
          { label: "Vendor List", value: "Provided to booked couples" },
          { label: "Instagram", value: "@fairmontpalliser" },
          { label: "Website", value: "fairmont.com", link: "https://www.fairmont.com/en/hotels/calgary/fairmont-palliser/weddings.html" },
        ],
      },
      {
        name: "Hotel Arts",
        tier: "$$$",
        fields: [
          { label: "Pricing", value: "From $4,500 smaller groups; up to $90/person larger events" },
          { label: "Capacity", value: "50–1,000 guests" },
          { label: "Catering", value: "In-house; all-inclusive packages available" },
          { label: "Ceremony", value: "Indoor" },
          { label: "Parking", value: "Yes" },
          { label: "Website", value: "hotelarts.ca/weddings", link: "https://hotelarts.ca/weddings" },
        ],
      },
      {
        name: "Calgary Marriott Downtown",
        tier: "$$$",
        fields: [
          { label: "Pricing", value: "$150–$300 per guest (catering, drinks & venue)" },
          { label: "Capacity", value: "50–360 guests" },
          { label: "Catering", value: "In-house" },
          { label: "Ceremony", value: "Indoor" },
          { label: "Parking", value: "Yes" },
          { label: "Vendor List", value: "Jenny Jean Photography, Calyx Floral Design, SWIRL Custom Cakes", full: true },
          { label: "Instagram", value: "@calgarymarriott" },
          { label: "Website", value: "marriott.com", link: "https://www.marriott.com/en-us/hotels/yycdt-calgary-marriott-downtown-hotel/events/" },
        ],
      },
    ],
  },
  {
    sub: "Unique & Character Spaces",
    vendors: [
      {
        name: "The Bow Valley Ranche Restaurant",
        tier: "$/$$",
        fields: [
          { label: "Pricing", value: "$650–$26,000 per event; $150–$300 per guest" },
          { label: "Capacity", value: "Up to 150–175 guests" },
          { label: "Catering", value: "In-house" },
          { label: "Ceremony", value: "Outdoor lawn/garden, verandah & historic indoor rooms" },
          { label: "Parking", value: "Yes" },
          { label: "Note", value: "Heritage building inside Fish Creek Provincial Park", full: true },
          { label: "Instagram", value: "@bowvalleyrancherestaurant" },
          { label: "Website", value: "bvrrestaurant.com", link: "https://bvrrestaurant.com/weddings/" },
        ],
      },
      {
        name: "Spruce Meadows",
        tier: "$$",
        fields: [
          { label: "Pricing", value: "$6,500–$8,500 venue + catering; ceremony $1,500 additional" },
          { label: "Capacity", value: "120–150 guests across two main venues" },
          { label: "Catering", value: "In-house" },
          { label: "Ceremony", value: "Indoor and outdoor" },
          { label: "Parking", value: "Yes" },
          { label: "AV", value: "Encore for audiovisual services" },
          { label: "Instagram", value: "@spruce_meadows" },
          { label: "Website", value: "sprucemeadows.com", link: "https://www.sprucemeadows.com/index.jsp" },
        ],
      },
      {
        name: "Arts Commons",
        tier: "$/$$",
        fields: [
          { label: "Pricing", value: "$2,000–$4,500 smaller groups; $150–$300 per guest larger" },
          { label: "Capacity", value: "150 seated / 200 cocktail reception" },
          { label: "Catering", value: "On-site or outside caterers permitted" },
          { label: "Ceremony", value: "Indoor" },
          { label: "Parking", value: "Multiple parkades nearby" },
          { label: "Note", value: "Confirm vendors know downtown Calgary loading logistics", full: true },
          { label: "Instagram", value: "@thecommonsyyc" },
          { label: "Website", value: "thecommonscalgary.com", link: "https://thecommonscalgary.com/weddings" },
        ],
      },
      {
        name: "Fortuna's Row",
        tier: "$/$$",
        fields: [
          { label: "Pricing", value: "$5,000–$42,000 depending on room and guest count" },
          { label: "Capacity", value: "Up to 150 guests; SRO space seats 50 for seated dinner" },
          { label: "Catering", value: "In-house — unique Latin American cuisine" },
          { label: "Ceremony", value: "Indoor and outdoor" },
          { label: "Parking", value: "Pay parking nearby" },
          { label: "AV", value: "2 speakers ($250) + 1 TV ($75) — credited to minimum spend" },
          { label: "Note", value: "External wedding planner required; venue access from 12:00 PM", full: true },
          { label: "Instagram", value: "@fortunas.row" },
          { label: "Website", value: "fortunasrow.com", link: "https://fortunasrow.com/pages/weddings" },
        ],
      },
    ],
  },
  {
    sub: "Restaurant Venues (Teatro Group)",
    note: "Teatro Restaurant, Cucina Market Bistro, and Alforno Eau Claire are all part of the Teatro Group — find all three at @teatrogroupweddings",
    vendors: [
      {
        name: "Teatro Restaurant",
        tier: "$/$$",
        fields: [
          { label: "Pricing", value: "$1,500–$22,000 minimum spend" },
          { label: "Capacity", value: "Opera Room: 50 seated/100 cocktail; Main Room: 120 seated/200 cocktail" },
          { label: "Catering", value: "In-house only" },
          { label: "Ceremony", value: "Indoor, up to 120 guests" },
          { label: "Parking", value: "Accessible; no on-site parking" },
          { label: "Instagram", value: "@teatrorestaurant / @teatrogroupweddings" },
          { label: "Website", value: "teatro.ca/weddings", link: "https://teatro.ca/weddings/" },
        ],
      },
      {
        name: "Cucina Market Bistro",
        tier: "$",
        fields: [
          { label: "Pricing", value: "$1,500–$4,500 minimum spend" },
          { label: "Capacity", value: "50 seated / 75 cocktail" },
          { label: "Catering", value: "In-house only" },
          { label: "Ceremony", value: "Indoor, limited capacity" },
          { label: "Parking", value: "Yes, within building. Fully accessible." },
          { label: "Instagram", value: "@cucinamarketbistro / @teatrogroupweddings" },
          { label: "Website", value: "cucinamarketbistro.ca", link: "https://www.cucinamarketbistro.ca/weddings/" },
        ],
      },
      {
        name: "Alforno Eau Claire",
        tier: "$",
        fields: [
          { label: "Pricing", value: "$1,250–$9,000 minimum spend" },
          { label: "Capacity", value: "60 seated / 120 cocktail" },
          { label: "Catering", value: "In-house only" },
          { label: "Ceremony", value: "Indoor, up to 40 guests" },
          { label: "Parking", value: "Accessible; no on-site parking" },
          { label: "Instagram", value: "@alfornoyyc / @teatrogroupweddings" },
          { label: "Website", value: "alforno.ca - Private Events PDF", link: "https://alforno.ca/wp-content/uploads/2026/01/Alforno-Private-Events-2025.pdf" },
        ],
      },
      {
        name: "Rouge",
        tier: "$/$$",
        fields: [
          { label: "Pricing", value: "Minimum spend based on guest count; $500 booking fee for select spaces" },
          { label: "Capacity", value: "14–116 guests depending on space" },
          { label: "Catering", value: "In-house" },
          { label: "Ceremony", value: "Indoor and outdoor" },
          { label: "Parking", value: "Yes" },
          { label: "Instagram", value: "@rougerestaurant" },
          { label: "Website", value: "rougecalgary.com", link: "https://rougecalgary.com/weddings/" },
        ],
      },
    ],
  },
  {
    sub: "Rustic & Garden",
    vendors: [
      {
        name: "Willow Lane Barn",
        tier: "$$",
        fields: [
          { label: "Pricing", value: "$30,000–$42,000 average; $150–$300 per guest" },
          { label: "Capacity", value: "Up to 225 (includes vendors, guests & bridal party)" },
          { label: "Catering", value: "No restrictions — bring your own caterer" },
          { label: "Ceremony", value: "Indoor and outdoor (field or barn backdrop)" },
          { label: "Parking", value: "Yes" },
          { label: "Packages", value: '"Barn and Blooms" (includes florals) or DIY option' },
          { label: "Amenities", value: "Commercial kitchen, cocktail gazebo, loft space" },
          { label: "Instagram", value: "@willowlanebarn" },
          { label: "Website", value: "willowlanebarn.com", link: "https://www.willowlanebarn.com" },
        ],
      },
      {
        name: "Meadow Muse",
        tier: "$/$$",
        fields: [
          { label: "Pricing", value: "$2,500–$5,000 venue + $150–$300 per guest" },
          { label: "Capacity", value: "150 seated / 175 cocktail standing" },
          { label: "Catering", value: "Great Events Catering (preferred partner)" },
          { label: "Ceremony", value: "Indoor and outdoor" },
          { label: "Parking", value: "300 spots" },
          { label: "Instagram", value: "@meadowmuseyyc" },
          { label: "Website", value: "meadowmuse.ca", link: "https://meadowmuse.ca" },
        ],
      },
      {
        name: "Pine and Pond",
        tier: "$/$$",
        fields: [
          { label: "Pricing", value: "Venue packages from $5,000–$13,000" },
          { label: "Capacity", value: "No minimum; up to 200 guests" },
          { label: "Catering", value: "No in-house — recommended list provided; outside vendors welcome" },
          { label: "Ceremony", value: "Indoor and outdoor" },
          { label: "Parking", value: "Yes, accessible" },
          { label: "Instagram", value: "@pine.and.pond" },
          { label: "Website", value: "pineandpond.com", link: "https://www.pineandpond.com" },
        ],
      },
    ],
  },
  {
    sub: "Large Capacity",
    vendors: [
      {
        name: "SAIT",
        tier: "$/$$$",
        fields: [
          { label: "Pricing", value: "$150–$300 per guest" },
          { label: "Capacity", value: "Small gatherings to 1,000+ guests" },
          { label: "Catering", value: "Exclusive: Curated Catering by Hotel Arts" },
          { label: "Ceremony", value: "Indoor and outdoor" },
          { label: "Parking", value: "Yes, accessible" },
          { label: "AV", value: "In-house audio-visual and bar services" },
          { label: "Instagram", value: "@sait" },
          { label: "Website", value: "sait.ca/weddings", link: "https://www.sait.ca/about-sait/event-venues-and-catering/weddings" },
        ],
      },
      {
        name: "The Heritage Centre",
        tier: "$/$$$",
        fields: [
          { label: "Pricing", value: "See website; seasonal discounts available" },
          { label: "Capacity", value: "50–683 guests" },
          { label: "Catering", value: "Outside catering required" },
          { label: "Ceremony", value: "Indoor and outdoor" },
          { label: "Parking", value: "Yes, accessible" },
          { label: "Vendor List", value: "Comprehensive recommended vendor list on website" },
          { label: "Instagram", value: "@mvetheheritagecentre" },
          { label: "Website", value: "mvetheheritagecentre.com", link: "https://mvetheheritagecentre.com/pricing-promotions-alberta-venue/" },
        ],
      },
    ],
  },
  {
    sub: "Also Worth Exploring",
    plain: [
      { name: "The Baron", tier: "$", note: "Modern industrial hall, 130–150 guests, in-house catering, full AV included", url: "thebaroncalgary.ca", ig: "@thebaron.yyc" },
      { name: "52 North Venue", tier: "$$", note: "Indoor/outdoor, up to 200 guests, BYOB with Roadpop Event Co. bar, from $9,500", url: "52northvenue.ca", ig: "@52northvenue" },
      { name: "The Lake House", tier: "$$", note: "Well-known Calgary venue on the reservoir", url: "lakehousecalgary.com", ig: "@thelakehouseyyc" },
    ],
  },
  {
    sub: "Canmore Venues",
    location: "Canmore",
    vendors: [
      {
        name: "Cornerstone Weddings — The Gem & Mainspace",
        tier: "$/$$",
        fields: [
          { label: "Pricing", value: "Varies by season, day of week, and minimum spend — packages available including planning, florals, photography, dining, entertainment & transport. Enquire for details." },
          { label: "Capacity", value: "The Gem: up to 200 total (100 upper / 150 lower); Mainspace: up to 80; both customizable from as few as 15 guests" },
          { label: "Catering", value: "Preferred caterer list provided; outside catering permitted at The Gem with signed waiver (commercial kitchen fee may apply)" },
          { label: "Ceremony", value: "Indoor venues; The Collective team also plans outdoor, elopement, heli, and hiking weddings across the Rockies" },
          { label: "Parking", value: "Available at both locations; fully accessible with elevators and disabled parking at The Gem" },
          { label: "Extras", value: "Part of The Collective — in-house photography, videography, florals, decor, DJ, transportation, accommodation & coordination all available" },
          { label: "Vendor List", value: "Yes — planning guides and resources provided" },
          { label: "Instagram", value: "@thegem.ca / @mainspace_canmore / @wearethecollective.ca" },
          { label: "Website", value: "thegem.ca / mainspacecanmore.ca / wearethecollective.ca", link: "https://weddingswithcornerstone.com" },
        ],
      },
      {
        name: "Creekside Villa",
        tier: "$$",
        fields: [
          { label: "Pricing", value: "Low season from $13,860; peak season Saturday from $17,451 (includes service fees and GST)" },
          { label: "Capacity", value: "25–90 guests" },
          { label: "Catering", value: "In-house only; external certified bakeries permitted for wedding cakes and small desserts" },
          { label: "Ceremony", value: "Indoor and outdoor (low season); outdoor Ceremony Tent only in peak season" },
          { label: "Parking", value: "Large parking lot; accessible to outdoor ceremony tent and reception space" },
          { label: "Vendor List", value: "Provided after contract is signed" },
          { label: "Instagram", value: "@creeksidevillacanmore" },
          { label: "Website", value: "creeksidevilla.ca", link: "https://www.creeksidevilla.ca" },
        ],
      },
      {
        name: "The Sensory",
        tier: "$$",
        fields: [
          { label: "Style", value: "Event space and restaurant in the heart of Canmore — intimate and distinctive" },
          { label: "Instagram", value: "@thesensorycanmore" },
          { label: "Website", value: "thesensory.ca", link: "https://www.thesensory.ca/sensorysupperseries" },
        ],
      },
      {
        name: "Stewart Creek Golf & Country Club",
        tier: "$$",
        fields: [
          { label: "Style", value: "Stunning mountain golf club setting with a dramatic Rockies backdrop" },
          { label: "Website", value: "stewartcreekgolf.com", link: "https://stewartcreekgolf.com" },
        ],
      },
      {
        name: "A Bear and Bison Inn",
        tier: "$$",
        fields: [
          { label: "Style", value: "Intimate and charming inn — beautiful setting for small weddings and elopements in Canmore" },
          { label: "Instagram", value: "@bearandbisoninn" },
          { label: "Website", value: "abearandbisoninn.com", link: "https://abearandbisoninn.com" },
        ],
      },
    ],
  },
  {
    sub: "Banff Venues",
    location: "Banff",
    note: "Weddings in Banff National Park require a Parks Canada permit. Most venues have experience navigating this process and can guide you through it.",
    vendors: [
      {
        name: "The Kenrick Hotel & The Fat Ox",
        tier: "$/$$",
        fields: [
          { label: "Capacity", value: "The Arrowwood Room: up to 75 seated / 120 standing (no F&B minimum); The Fat Ox Restaurant: up to 90 seated / 120 standing" },
          { label: "Catering", value: "The Fat Ox restaurant exclusively caters The Arrowwood Room" },
          { label: "Ceremony", value: "Indoor and outdoor (weather permitting)" },
          { label: "Parking", value: "On-site above and underground parking" },
          { label: "Vendor List", value: "Available on request" },
          { label: "Email", value: "info@thekenrickhotel.com / info@fatoxbanff.ca" },
          { label: "Instagram", value: "@thekenrickhotel / @fatoxbanff" },
          { label: "Website", value: "thekenrickhotel.com", link: "https://thekenrickhotel.com/rooms/event-spaces/" },
        ],
      },
      {
        name: "The Gem Events Centre",
        tier: "$$",
        fields: [
          { label: "Style", value: "Stunning events centre in the heart of Banff — part of the Rocky Mountain Wedding Collective" },
          { label: "Email", value: "thegem@rmwc.ca" },
          { label: "Instagram", value: "@thegem.ca" },
          { label: "Website", value: "thegem.ca", link: "https://thegem.ca" },
        ],
      },
      {
        name: "Fairmont Banff Springs",
        tier: "$$$",
        fields: [
          { label: "Style", value: "Iconic castle hotel set against the Rockies — one of the most legendary wedding venues in Canada" },
          { label: "Email", value: "bshweddings@fairmont.com" },
          { label: "Instagram", value: "@fairmontbanff" },
          { label: "Website", value: "banff-springs-hotel.com", link: "https://www.banff-springs-hotel.com/gather/weddings/" },
        ],
      },
      {
        name: "The Rimrock Resort Hotel",
        tier: "$$$",
        fields: [
          { label: "Style", value: "Luxurious mountain resort perched above Banff with breathtaking valley views" },
          { label: "Email", value: "info@rimrockresort.com" },
          { label: "Instagram", value: "@rimrockbanff" },
          { label: "Website", value: "emblemscollection.com/rimrock-banff", link: "https://www.emblemscollection.com/rimrock-banff/weddings/" },
        ],
      },
      {
        name: "Buffalo Mountain Lodge",
        tier: "$$$",
        fields: [
          { label: "Style", value: "Rustic luxury lodge nestled in the forest above Banff — warm, intimate, and distinctly mountain" },
          { label: "Email", value: "info@crmr.com" },
          { label: "Instagram", value: "@crmresorts" },
          { label: "Website", value: "crmr.com/buffalo-mountain", link: "https://crmr.com/resorts/buffalo-mountain/weddings/" },
        ],
      },
      {
        name: "Banff Caribou Lodge & Spa",
        tier: "$$",
        fields: [
          { label: "Style", value: "Classic Banff lodge with a warm, welcoming atmosphere — great for mid-size celebrations" },
          { label: "Email", value: "events@banfflodgingco.com" },
          { label: "Website", value: "banffcariboulodge.com", link: "https://banffcariboulodge.com/meetings/" },
        ],
      },
      {
        name: "The Maple Leaf Grill",
        tier: "$/$$",
        fields: [
          { label: "Style", value: "Beloved Banff restaurant — part of the Banff Hospitality Collective, known for steak and seafood" },
          { label: "Instagram", value: "@banffhospitalitycollective" },
          { label: "Website", value: "banffcollective.com", link: "https://www.banffcollective.com/restaurant/maple-leaf-steak-seafood" },
        ],
      },
      {
        name: "Banff Gondola — Sky Bistro",
        tier: "$$",
        fields: [
          { label: "Style", value: "Truly one-of-a-kind — ceremony and reception at the summit of Sulphur Mountain with 360-degree Rockies views" },
          { label: "Email", value: "admin@gondolabanff.com" },
          { label: "Website", value: "gondolabanff.com", link: "https://gondolabanff.com/The-Banff-Gondola-Sky-Bistro.html" },
        ],
      },
      {
        name: "The Fenlands Banff Recreation Centre",
        tier: "$",
        fields: [
          { label: "Style", value: "Affordable and flexible venue option in Banff — great for larger guest counts on a tighter budget" },
          { label: "Email", value: "rentals@banff.ca" },
          { label: "Website", value: "banff.ca/weddings", link: "https://banff.ca/666/Weddings" },
        ],
      },
    ],
  },
];

// ── CHURCHES & CHAPELS ───────────────────────────────────────────────────────
export const churchData = [
  {
    name: "Knox United Church",
    desc: "A stunning downtown landmark with soaring ceilings, a magnificent pipe organ, and beautiful stained glass windows. With a capacity of 654 guests, it's one of Calgary's grandest ceremony settings.",
    url: "kxcalgary.com",
    link: "https://www.kxcalgary.com",
  },
  {
    name: "St. Martin's Church",
    desc: "Tucked inside Heritage Park, this charming country church offers a timeless rustic setting that feels worlds away from the city. Perfect for couples who want a traditional ceremony with character and history.",
    url: "stmartinschurch.ca",
    link: "https://stmartinschurch.ca",
  },
  {
    name: "Hillhurst United Church",
    desc: "A warm and welcoming church in the heart of Hillhurst, proudly affirming and open to all couples regardless of background or identity. A beautiful choice for inclusive celebrations.",
    url: "hillhurstunited.com",
    link: "https://hillhurstunited.com",
  },
  {
    name: "Cathedral Church of the Redeemer",
    desc: "A breathtaking downtown cathedral steps from Olympic Plaza. Offers the intimate Lady Chapel for smaller ceremonies or the grand main Cathedral for larger gatherings — two beautiful options under one roof.",
    url: "anglicancathedralcalgary.ca",
    link: "https://www.anglicancathedralcalgary.ca",
  },
  {
    name: "Robert McClure United Church",
    desc: "An inclusive and welcoming congregation that opens its doors to couples of all genders, faiths, and backgrounds. A meaningful space for couples seeking a spiritual ceremony without boundaries.",
    url: "robertmcclurechurch.org",
    link: "https://robertmcclurechurch.org",
  },
  {
    name: "Commons Church",
    desc: "A modern and vibrant church community with a warm, contemporary feel. Ideal for couples who want the meaning of a church ceremony with a fresh, welcoming atmosphere.",
    url: "commons.church",
    link: "https://www.commons.church",
  },
  {
    name: "The Chapel Company",
    desc: "A beautiful standalone chapel nestled in Water Valley, approximately 45 minutes from Calgary. Bright, intimate, and utterly charming — worth the drive for something truly unique.",
    url: "thechapelcompany.com",
    link: "https://www.thechapelcompany.com",
  },
];
