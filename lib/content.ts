export const tickerItems = [
  "Wingit - Real-time presentation engine",
  "SDN OpenAPI - Compliance data API tooling",
  "Horcrux - Context portability for AI workflows",
  "Loudness Lab - Acoustic analysis + utilities",
  "Drone Talents - Drone operator marketplace",
  "Lern2CWD - Coding practice app",
  "Vitamax Health - Habit support and vitamin adherence"
];

export const coverFacts = [
  { label: "Core Story", value: "Building world-changing software in downtown Miami" },
  { label: "Team Model", value: "The four most valuable people in Miami" },
  { label: "Build Thesis", value: "Instrumentation first. Ship yesterday. Build a product someone will pay for." }
];

export const products = [
  {
    title: "Wingit",
    category: "Flagship Product",
    href: "https://wingit.dev",
    blurb:
      "Real-time presentation generation from spoken narrative. Capture transcript plus audio, generate slides, and export a clean artifact your team can share immediately.",
    tags: ["Real-time generation", "Voice + transcript", "Presentation quality", "Ship-ready velocity"],
    features: [
      "Built for live demos and async storytelling",
      "Instrumentation-ready for growth loops",
      "Proof of low-latency execution quality"
    ]
  },
  {
    title: "SDN OpenAPI",
    category: "Developer API",
    href: "https://sdn-openapi.netlify.app/",
    blurb: "Open API tooling around OFAC SDN datasets for compliance-centric products.",
    tags: ["Compliance", "API", "Infrastructure"]
  },
  {
    title: "Horcrux",
    category: "R&D Product",
    href: "https://horcrux.inc",
    blurb: "Context layer for saving, restoring, and sharing AI workflow context across tools.",
    tags: ["Agents", "Context", "Developer Tools"]
  },
  {
    title: "Loudness Lab",
    category: "Utility Suite",
    href: "https://loudness-app.netlify.app",
    blurb: "Practical audio analysis and workflow tools for acoustic measurement and loudness leveling.",
    tags: ["Audio", "Python", "Signal Processing"]
  },
  {
    title: "Drone Talents",
    category: "Marketplace",
    href: "https://dronetalents.com/",
    blurb: "Marketplace platform connecting businesses with licensed drone operators.",
    tags: ["Marketplace", "Operations", "Gig Economy"]
  },
  {
    title: "Lern2CWD",
    category: "Education App",
    href: "#",
    blurb: "Practice app for learning data structures and solving coding interview problems, with spaced repetition and interactive challenges.",
    tags: ["EdTech", "Practice"]
  },
  {
    title: "Vitamax Health",
    category: "Prototype",
    href: "#",
    blurb: "Health-focused prototype for habit support and vitamin adherence.",
    tags: ["HealthTech", "Behavior Design"]
  },
  {
    title: "Arcology",
    category: "R&D",
    href: "#",
    blurb: "Python-powered audio transcription and segmentation pipeline for AI consensus and analysis workflows.",
    tags: ["Audio", "AI", "Python"]
  }
];

export const team = [
  {
    name: "Robert Melrose",
    role: "Chief Technology & Systems Architecture (CTSA), Co-Founder",
    bio:
      "Senior full-stack software engineer and primary technical lead. Owns overall system architecture, technical strategy, and core IP direction.",
    href: "https://www.linkedin.com/in/themelroser/"
  },
  {
    name: "Gabriel Robayo",
    role: "Director of Finance & Strategy (DFS), Co-Founder",
    bio:
      "Operations and finance counterpart: financial modeling, budget/runway planning, pricing, revenue strategy, and partnerships.",
    href: "https://www.linkedin.com/in/gabriel-robayo-9629877/"
  },
  {
    name: "Sebastien Dolce",
    role: "Director of Front-End Engineering (DFE), Co-Founder",
    bio:
      "Software engineer focused on front-end implementation. Owns user-facing buildout, CMS/theming, templating, and the marketing/content layer.",
    href: "https://www.linkedin.com/in/sebastien-dolce/"
  },
  {
    name: "Tatiana Riquelme",
    role: "Medical + Media Consultant",
    bio:
      "FNP at Mount Sinai Medical Center. Provides clinical-domain oversight and helps shape clear, compliant, and credible patient/public messaging.",
    href: "https://www.linkedin.com/in/tatiana-riquelmefnp/"
  }
];

export const wingitFeatures = [
  {
    title: "AI Integration",
    body: "Generate structured slides from live speech in real time, with AI shaping flow, visuals, and pacing as you present."
  },
  {
    title: "Teleprompter",
    body: "If you get stuck, prompt mode helps guide your next points so you can keep momentum without breaking your delivery."
  },
  {
    title: "Speaker Notes",
    body: "Paste your plan and Wingit can align the presentation around your notes so the narrative and visuals stay in sync."
  },
  {
    title: "Theme Engine",
    body: "Use polished visual themes and switch styles quickly so every presentation looks intentional and on-brand."
  }
];

export const wingitSteps = [
  {
    step: "1",
    title: "Present",
    points: ["Give it a title", "Add suggestions for what you want it to look like", "Add any notes or plans you have", "Or nothing at all"]
  },
  {
    step: "2",
    title: "As you speak",
    points: ["Wingit transcribes", "What you say becomes what they see", "Make points, bullets are added", "Shift topics, new slides"]
  },
  {
    step: "3",
    title: "Share",
    points: ["Send a link", "Send a QR code", "Everyone sees your presentation and what you are saying"]
  }
];

export const roadmap = [
  {
    title: "Business / Revenue Model",
    items: [
      "Pre-revenue (in development)",
      "SaaS subscriptions: Solo / Pro / Team",
      "Usage-based add-ons: generation minutes, exports, voice/transcription, premium templates",
      "Enterprise licensing: SSO, security, admin controls, custom branding, integrations"
    ]
  },
  {
    title: "Unit Economics (Modeled)",
    items: [
      "MRR: $0 (pre-revenue)",
      "LTV proxy: ~$128 = $25 x 0.85 gross margin x 6-month lifespan",
      "CAC target: ~$40 based on a 3:1 LTV:CAC benchmark",
      "Annual churn assumption: ~60% from an 8% monthly churn model",
      "Initial TAM estimate: ~$300M (1,000,000 users x $300 ACV)"
    ]
  },
  {
    title: "Go-To-Market Sequence",
    items: [
      "Bottom-up adoption: creators and presenters first (free to paid)",
      "Content-led distribution: short demos showing talk-to-deck speed",
      "Partnerships: coworking spaces, meetup organizers, pitch nights, accelerators, speaker coaches",
      "B2B wedge: sales enablement and internal training teams after stability milestones"
    ]
  }
];

export const financialSnapshot = [
  "Current status: pre-revenue, validating retention and pricing",
  "LTV model: ~$128 from $25 price x 85% margin x 6-month lifespan",
  "CAC target: ~$40 to stay near a 3:1 LTV:CAC benchmark",
  "Initial TAM model: ~$300M for prosumer presentation workflows"
];

export const notes = [
  "Editorial presentation, not startup wallpaper",
  "Six visible volume spines with the active issue on top",
  "More black, bone, and steel with controlled Miami heat",
  "Readable rotated text with Roman numerals and section names",
  "Every page reads like the front issue in a collectible series"
];

export const contactLinks = [
  { label: "rob@devs.miami", href: "mailto:rob@devs.miami" },
  { label: "info@devs.miami", href: "mailto:info@devs.miami" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/devs-miami/" }
];
