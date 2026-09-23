export const SITE = {
  name: "NIPC Services",
  fullName: "NIPC SERVICES (Natural Insects Pest Control)",
  owner: "Veerpal",
  ownerTitle: "Owner & Managing Director",
  shortTagline: "Safe • Effective • Reliable",
  slogan: "Safe Environment, Healthy Life",
  priorityTagline: "Your Safety, Our Priority!",
  phone: "9639232701",
  phoneDisplay: "+91 96392 32701",
  phoneHref: "tel:+919639232701",
  whatsappNumber: "919639232701",
  whatsappHref:
    "https://wa.me/919639232701?text=Hi%20Veerpal%20ji%20(NIPC%20SERVICES),%20I%20want%20to%20book%20Pest%20Control%20Service%20and%20avail%20the%20Special%20Offer.",
  email: "nipc570@gmail.com",
  gstin: "09FNWPP6204H1ZC",
  offices: [
    {
      city: "Rudrapur (U.S. Nagar)",
      address: "Ward No.01, Teen Pani Dam, Fulsunga, Rudrapur, Uttarakhand",
    },
    {
      city: "Pilibhit (Uttar Pradesh)",
      address:
        "Village-Jatpura, Barat Bojh, Near By Electric Pole No.-2, Jahanabad, Pilibhit, Uttar Pradesh - 262001",
    },
    {
      city: "Delhi NCR Hub",
      address: "Doorstep service available across Delhi, Noida, Ghaziabad & nearby areas",
    },
  ],
  serviceAreas: [
    "Rudrapur",
    "Pilibhit",
    "Bareilly",
    "Khatima",
    "Haldwani",
    "Delhi NCR",
    "Noida",
    "Ghaziabad",
  ],
  hours: [
    { day: "Monday – Saturday", time: "8:00 AM – 9:00 PM" },
    { day: "Sunday", time: "8:00 AM – 7:00 PM" },
    { day: "Emergency Pest Helpline", time: "24/7 Available (9639232701)" },
  ],
  license: "Govt. Registered GSTIN: 09FNWPP6204H1ZC",
  rating: 4.9,
  reviewsCount: 3850,
  yearsInBusiness: 12,
  homesProtected: 52000,
  currency: "₹",
};

export const NAV_LINKS = [
  { label: "About", href: "/#about" },
  { label: "Live Work", href: "/#live-work" },
  { label: "Services", href: "/#services" },
  { label: "Why Natural Insects Pest Control", href: "/#why-us" },
  { label: "Products", href: "/#products" },
  { label: "Offers", href: "/#offers" },
  { label: "Reviews", href: "/#reviews" },
  { label: "Contact", href: "/#contact" },
];

export type Service = {
  slug: string;
  name: string;
  short: string;
  description: string;
  longDescription: string;
  image: string;
  icon: string;
  priceFrom: number;
  duration: string;
  features: string[];
  pests: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "cockroach-control",
    name: "Cockroach Control (Herbal Gel)",
    short: "100% Odorless herbal gel bait. Nest destruction in 72 hours.",
    description:
      "Advanced herbal gel application inside kitchen cabinets, sinks, switchboards and refrigerators. Zero bad smell, no need to empty kitchen utensils. Safe for kids and pets.",
    longDescription:
      "NIPC Services specializes in odorless herbal cockroach gel and micro-residual crack & crevice treatment. Cockroaches consume the high-attractant bait, return to the colony and eliminate the entire nest via domino cascade. Includes written warranty.",
    image: "/images/real-pest-technician-kitchen.jpg",
    icon: "shield",
    priceFrom: 699,
    duration: "45–60 mins",
    features: [
      "100% Odorless Herbal Gel",
      "No kitchen emptying needed",
      "Child & pet safe formulation",
      "Written Service Warranty",
    ],
    pests: ["German Cockroaches", "American Roaches", "Brown-banded Roaches"],
  },
  {
    slug: "termite-control",
    name: "Termite (Deemak) Treatment",
    short: "Drill-Fill-Seal chemical barrier with 7-year renewable warranty.",
    description:
      "Subterranean and drywood deemak elimination using Govt. approved termiticide. We drill 45° holes along skirting, inject heavy-duty solution under pressure and seal seamlessly.",
    longDescription:
      "Termites silently eat expensive wardrobes, door frames and modular wood. NIPC certified exterminators use high-pressure Drill-Fill-Seal technology to stop the queen and colony with an assured 7-year written warranty card.",
    image:
      "https://images.pexels.com/photos/18021337/pexels-photo-18021337.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    icon: "termite",
    priceFrom: 1899,
    duration: "2–4 hours",
    features: [
      "Drill-Fill-Seal Technology",
      "Pre & Post Construction",
      "Up to 7 Years Warranty",
      "Free Site Inspection",
    ],
    pests: ["Subterranean Termites", "Drywood Deemak", "Wood Borers"],
  },
  {
    slug: "lizard-control",
    name: "Lizard (Chhipkali) Control",
    short: "Repellent perimeter spray & entry barrier stops lizards permanently.",
    description:
      "Specialized odorless herbal repelling treatment around false ceilings, tube lights, windows and wall corners that drives away lizards and prevents re-entry.",
    longDescription:
      "Lizards contaminate food and cause hygiene phobias. NIPC Services deploys herbal repellent formulations along perimeter entry routes and wall-ceiling joints that completely clear residential and commercial properties.",
    image: "/images/real-pest-technician-hallway.jpg",
    icon: "shield",
    priceFrom: 799,
    duration: "45 mins",
    features: [
      "Non-toxic herbal repellent",
      "False-ceiling & window sealing",
      "Instant knockdown",
      "Guaranteed re-service",
    ],
    pests: ["House Geckos", "Wall Lizards", "Garden Lizards"],
  },
  {
    slug: "flies-control",
    name: "Flies Control & Fogging",
    short: "Cold thermal misting and fly attractant traps for kitchens & halls.",
    description:
      "Fast knockdown misting for houseflies, fruit flies and drain gnats. Ideal for restaurants, banquets, cinema halls and homes.",
    longDescription:
      "House flies transmit over 60 dangerous pathogens. NIPC Services applies biological drain foam, bio-enzymatic surface treatments and UV fly glue-trap machines that maintain audit-ready cleanliness.",
    image: "/images/real-pest-technician-commercial.jpg",
    icon: "mosquito",
    priceFrom: 749,
    duration: "45 mins",
    features: [
      "Rapid aerosol knockdown",
      "Drain breeding disinfection",
      "Restaurant & banquet ready",
      "FSSAI compliant",
    ],
    pests: ["House Flies", "Fruit Flies", "Drain Gnats", "Blowflies"],
  },
  {
    slug: "mosquito-control",
    name: "Mosquito & Fogging Service",
    short: "Thermal fogging + biological larvicide breeding kill.",
    description:
      "Protects homes, gardens, society compounds and commercial halls from dengue, malaria and chikungunya mosquitoes with WHO-approved pyrethroids.",
    longDescription:
      "Our mosquito team utilizes pulse-jet thermal foggers and cold ULV misting machines for bushes, basement parking, open drains, and lawn perimeters to break the mosquito breeding cycle.",
    image:
      "https://images.pexels.com/photos/5499416/pexels-photo-5499416.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    icon: "mosquito",
    priceFrom: 849,
    duration: "45 mins",
    features: [
      "Thermal fogging + ULV mist",
      "Larvicide breeding kill",
      "Dengue & malaria vector kill",
      "Villas & society packages",
    ],
    pests: ["Aedes Dengue Mosquito", "Anopheles", "Culex"],
  },
  {
    slug: "rodent-control",
    name: "Rodent & Rat Control (Gap Arrest)",
    short: "Heavy glue pads, tamper-proof bait stations & gap arrest sealing.",
    description:
      "Eliminates rats and mice permanently. Heavy-duty peanut glue boards, bromadiolone bait boxes, and steel wool gap arrest protect wires and pantry food.",
    longDescription:
      "Rodents chew electrical wires and spoil food grains. NIPC Services maps runway routes, places locked bait stations in safe corners, and seals wall holes (Gap Arrest) so rodents never re-enter.",
    image:
      "https://images.pexels.com/photos/4098778/pexels-photo-4098778.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    icon: "rodent",
    priceFrom: 899,
    duration: "60 mins",
    features: [
      "Tamper-proof bait boxes",
      "Gap arrest hole sealing",
      "Heavy rat glue boards",
      "Safe around pets & kids",
    ],
    pests: ["Roof Rats", "Norway Rats", "House Mice", "Bandicoots"],
  },
];

export type ProductSeed = {
  name: string;
  slug: string;
  category: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  imageUrl: string;
  badge?: string;
  rating: number;
  reviewsCount: number;
  stock: number;
};

export const PRODUCT_SEEDS: ProductSeed[] = [
  {
    name: "NIPC MaxForce Cockroach Herbal Gel (35g Tube)",
    slug: "nipc-cockroach-herbal-gel",
    category: "Baits",
    description: "Original odorless herbal gel bait. Eliminates entire cockroach nest via domino cascade within 72 hours. Safe for kitchen cabinets.",
    price: 349,
    compareAtPrice: 499,
    imageUrl: "/images/real-pest-technician-kitchen.jpg",
    badge: "Best Seller",
    rating: 4.9,
    reviewsCount: 1420,
    stock: 250,
  },
  {
    name: "NIPC Termite Termicide Concentrate (1 Litre)",
    slug: "nipc-termite-concentrate",
    category: "Chemicals",
    description: "Govt. approved non-repellent active solution for woodwork and soil barriers. Dilutes into 50L ready spray.",
    price: 899,
    compareAtPrice: 1299,
    imageUrl:
      "https://images.pexels.com/photos/18021337/pexels-photo-18021337.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    badge: "Pro Grade",
    rating: 4.8,
    reviewsCount: 610,
    stock: 120,
  },
  {
    name: "NIPC Super-Strong Rat & Mouse Glue Traps (Pack of 5)",
    slug: "nipc-rat-glue-traps-5pack",
    category: "Traps",
    description: "Heavy-duty peanut-scented non-toxic glue boards. Traps large rats and mice without poison hazards.",
    price: 299,
    compareAtPrice: 450,
    imageUrl:
      "https://images.pexels.com/photos/4098778/pexels-photo-4098778.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    rating: 4.7,
    reviewsCount: 890,
    stock: 350,
  },
  {
    name: "NIPC Herbal Lizard Repellent Spray (500ml)",
    slug: "nipc-lizard-repellent-spray",
    category: "Sprays",
    description: "Natural herbal formula that repels wall lizards and house geckos from tube lights and false ceilings.",
    price: 399,
    compareAtPrice: 550,
    imageUrl: "/images/real-pest-technician-hallway.jpg",
    badge: "Herbal Safe",
    rating: 4.8,
    reviewsCount: 480,
    stock: 160,
  },
  {
    name: "NIPC Commercial UV Fly Catcher Machine (30W LED)",
    slug: "nipc-uv-fly-catcher-machine",
    category: "Machines",
    description: "Zero noise, aesthetic stainless glue-pad fly machine for restaurants, grocery shops and bakeries. Covers 600 sq ft.",
    price: 2499,
    compareAtPrice: 3499,
    imageUrl: "/images/real-pest-technician-commercial.jpg",
    badge: "FSSAI Grade",
    rating: 4.9,
    reviewsCount: 215,
    stock: 45,
  },
  {
    name: "NIPC Mosquito Fogging Chemical (Concentrated 500ml)",
    slug: "nipc-mosquito-fog-concentrate",
    category: "Outdoor",
    description: "For portable or thermal foggers. Powerful knockdown for residential gardens, basements and open plots.",
    price: 649,
    compareAtPrice: 899,
    imageUrl:
      "https://images.pexels.com/photos/5499416/pexels-photo-5499416.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    rating: 4.6,
    reviewsCount: 310,
    stock: 95,
  },
];

export type BlogSeed = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  category: string;
  author: string;
  readMinutes: number;
  publishedAt: string;
};

export const BLOG_SEEDS: BlogSeed[] = [
  {
    title: "How to Spot Deemak (Termites) in Wooden Wardrobes Before Severe Damage",
    slug: "how-to-spot-termites-wardrobes",
    excerpt: "Hollow sounds, mud tunnels, discarded wings — learn the red flags to protect luxury furniture in Indian homes.",
    content: `Subterranean termites (Deemak) thrive in warm humid conditions. In high-rise apartments and bungalows alike, termites usually enter through expansion joints or damp bathroom plumbing walls.

**1. Mud lines along skirting boards & door frames.** Termites build mud shelters to retain moisture while feeding on cellulose. Check behind wardrobes, under beds, and around wooden door frames.

**2. Papery hollow sounding wood.** Gently tap wood with your knuckle or a coin. A papery hollow sound indicates internal structural hollows.

**3. Mud inside electrical switchboards.** Termites frequently travel through concealed PVC conduits behind switchboards.

**4. Swarmer wings around night lamps.** Translucent wings discarded in monsoon seasons indicate an active swarm mating in the vicinity.

**Treatment Solution:** DIY sprays only drive termites deeper into the walls. NIPC Services employs high-pressure Drill-Fill-Seal chemical barrier injection that wipes out the queen and colony with an assured 7-year warranty. Contact Veerpal ji directly at 9639232701.`,
    imageUrl:
      "https://images.pexels.com/photos/18021337/pexels-photo-18021337.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    category: "Termites",
    author: "Veerpal (Owner, NIPC Services)",
    readMinutes: 5,
    publishedAt: "2026-08-25",
  },
  {
    title: "Why Normal Hit/Baygon Fails Against German Kitchen Cockroaches",
    slug: "why-spray-fails-against-german-cockroaches",
    excerpt: "Generic aerosol sprays kill only visible foragers while scattering the eggs. Here is how herbal gel bait works.",
    content: `Almost every customer who calls NIPC asks: "Bhaiya humne Hit spray use kiya tha, fir bhi cockroaches aur badh gaye?"

**The Science of Cockroach Nesting:**
German cockroaches carry an egg case called an Ootheca holding 30 to 48 nymphs. When you spray toxic aerosol, the mother cockroach drops the egg case and runs deeper into cabinet hinges or refrigerator motor coils.

**Why NIPC Herbal Gel Bait Works:**
1. Cockroaches consume our high-attractant food bait without dying instantly.
2. They return to their nesting colony behind tiles and switchboards.
3. Other roaches feed on their droppings and dead bodies (Cannibalism cascade).
4. The entire colony gets wiped out in 3 to 5 days without any foul chemical smell! Call Veerpal at 9639232701 for direct booking.`,
    imageUrl: "/images/real-pest-technician-kitchen.jpg",
    category: "Cockroaches",
    author: "Veerpal (NIPC Services)",
    readMinutes: 4,
    publishedAt: "2026-08-14",
  },
  {
    title: "Commercial Kitchen Pest Control: Meeting FSSAI Hygiene Standards",
    slug: "commercial-kitchen-pest-hygiene-fssai",
    excerpt: "Drain cleaning, grease trap spraying and gap arrest for hotels, restaurants and banquet halls.",
    content: `Commercial kitchens face strict FSSAI audits. Cockroaches in flour storage or flies near food counters can halt restaurant operations.

**NIPC Protocol for Restaurants:**
- High-pressure drain spraying with brass tank equipment
- Odorless herbal gel behind stainless steel counters
- Gap Arrest sealing around pipe penetrations
- Monthly audit certification with GST invoice (09FNWPP6204H1ZC)

Call Veerpal at 9639232701 for same-day commercial site audit.`,
    imageUrl: "/images/real-pest-technician-commercial.jpg",
    category: "Commercial",
    author: "Veerpal (Managing Director)",
    readMinutes: 5,
    publishedAt: "2026-08-05",
  },
];

export type Testimonial = {
  name: string;
  location: string;
  service: string;
  quote: string;
  rating: number;
  dateStr?: string;
  avatarBg?: string;
  verified?: boolean;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Vikram Sharma",
    location: "Rudrapur, U.S. Nagar",
    service: "Cockroach Herbal Gel",
    quote:
      "Veerpal ji ne team ko bhejkar kitchen me odorless herbal gel lagwaya bina bartan hatwaye. 3-4 din me sare cockroaches khatam ho gaye! 9639232701 par call kiya aur 2 ghante me technician aa gaya tha. Shandaar service!",
    rating: 5,
    dateStr: "Yesterday",
    avatarBg: "#0e7c6b",
    verified: true,
  },
  {
    name: "Pooja Malhotra",
    location: "Pilibhit, Uttar Pradesh",
    service: "Termite (Deemak) Treatment",
    quote:
      "9639232701 par Veerpal ji se baat hui almari me deemak lagne par. Unke technicians ne safai se drilling ki, termiticide inject kiya aur 7 saal ki written warranty card diya. Best service in Pilibhit!",
    rating: 5,
    dateStr: "3 days ago",
    avatarBg: "#164e87",
    verified: true,
  },
  {
    name: "Amitabh Verma",
    location: "Hotel & Restaurant Manager, Rudrapur",
    service: "Commercial Kitchen Spraying",
    quote:
      "Commercial restaurant kitchen me drain spraying aur gap arrest NIPC Services se karwaya. Proper GST invoice (09FNWPP6204H1ZC) mila aur FSSAI inspection clear ho gaya. Veerpal ji is very reliable.",
    rating: 5,
    dateStr: "1 week ago",
    avatarBg: "#c98a1b",
    verified: true,
  },
  {
    name: "Dr. R. K. Gupta",
    location: "Bareilly Road, Rudrapur",
    service: "Lizard & Mosquito Control",
    quote:
      "Ghar aur clinic dono jagah chhipkali aur machhar ka spray karwaya. 100% odorless tha jisse family ko koi pareshani nahi hui. Veerpal ji ka number 9639232701 saved hai mere pass permanent.",
    rating: 5,
    dateStr: "2 weeks ago",
    avatarBg: "#0d5060",
    verified: true,
  },
  {
    name: "Sunita Aggarwal",
    location: "Jahanabad, Pilibhit",
    service: "Kitchen Cockroach Treatment",
    quote:
      "Bohot acchi service hai! Herbal gel se cockroaches nest samet gayab ho gaye. Price bhi market se kaafi reasonable hai aur Veerpal bhaiya ne warranty card bhi diya.",
    rating: 5,
    dateStr: "3 weeks ago",
    avatarBg: "#8b2fc9",
    verified: true,
  },
  {
    name: "Manish Rawat",
    location: "Khatima / Haldwani",
    service: "Termite Drill-Fill-Seal",
    quote:
      "New house me wooden work karwate time pre-treatment karwaya. 7-year written warranty mili. WhatsApp 9639232701 par turant reply mil gaya tha. Highly recommended NIPC Services!",
    rating: 5,
    dateStr: "1 month ago",
    avatarBg: "#2ea84f",
    verified: true,
  },
];

export const OFFERS = [
  {
    code: "NIPC25",
    title: "Flat 25% Off + Free Kitchen Sanitization",
    description:
      "Special discount on Cockroach, Lizard & Full Home pest control packages booked this week with Veerpal ji.",
    fine: "Applicable on online / WhatsApp booking on 9639232701. Mention coupon code NIPC25.",
    highlight: true,
  },
  {
    code: "DEEMAK500",
    title: "₹500 Instant Discount on Termite Service",
    description:
      "Get ₹500 off on complete wardrobe & wall Drill-Fill-Seal termite control with 7-year written warranty card.",
    fine: "Valid on min order value ₹2,500. Includes free site inspection by Veerpal.",
    highlight: false,
  },
  {
    code: "COMBO30",
    title: "Cockroach + Lizard Combo: 30% Off",
    description:
      "Combine two treatments together and save big with dual natural protection and free follow-up service.",
    fine: "Valid for all residential homes, flats & commercial spaces.",
    highlight: false,
  },
];
