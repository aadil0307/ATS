export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  category: string;
  year: string;
  summary: string;
  metrics: [string, string][];
  tags: string[];
  services: string[];
  challenge: string;
  outcome: string;
  website?: string;
};

export const CASES: CaseStudy[] = [
  {
    slug: "msinterio-website",
    title: "MSInterio",
    client: "MSInterio Interior Design",
    category: "Web & App Development",
    year: "2024",
    summary:
      "A turnkey interior design firm serving Mumbai, Thane and Pune needed a professional web presence to showcase their residential and commercial projects, modular kitchen work, and 3D-rendered design visualizations.",
    metrics: [
      ["56", "clients served"],
      ["23", "projects delivered"],
      ["Mumbai", "Thane · Pune"],
    ],
    tags: ["HTML5", "CSS3", "JavaScript"],
    services: ["Web & App Development", "UI/UX Design"],
    challenge:
      "MSInterio handled every stage of a project — conceptualization, 3D visualization, onsite supervision, material selection and final installation — but had no way to show prospective clients that end-to-end portfolio online or capture inbound inquiries reliably.",
    outcome:
      "Shipped a fast, fully responsive website that walks visitors through their capabilities and project gallery, with clear service descriptions and a contact path so leads reach the studio directly.",
    website: "https://msinterio.co",
  },
  {
    slug: "sweezen-foundation",
    title: "Sweezen Foundation",
    client: "Sweezen Foundation NGO",
    category: "Web & App Development",
    year: "2024",
    summary:
      "A digital presence for a non-profit foundation, built to give the organization a credible public home for its mission, activities, and a path for supporters to get in touch.",
    metrics: [
      ["Web", "public presence"],
      ["Responsive", "across devices"],
      ["SEO", "indexed"],
    ],
    tags: ["JavaScript", "HTML5", "CSS3"],
    services: ["Web & App Development", "UI/UX Design"],
    challenge:
      "The foundation had no dedicated web presence to communicate its mission, surface its activities, or give supporters and beneficiaries a reliable way to reach them.",
    outcome:
      "Delivered a clean, responsive website that establishes the foundation's public identity and provides a direct contact channel for inquiries and support.",
    website: "https://sweezenfoundation.org",
  },
  {
    slug: "matchunseen",
    title: "MatchUnseen",
    client: "Personal Project",
    category: "Web & App Development",
    year: "2024",
    summary:
      "A blind dating web app that matches people on shared values and interests rather than looks — with JWT auth, mobile OTP verification, an integrated chatbot, and real-time one-on-one messaging.",
    metrics: [
      ["Socket.IO", "real-time chat"],
      ["JWT + OTP", "verified profiles"],
      ["1:1", "matched chat"],
    ],
    tags: ["ReactJS", "Node.js", "MongoDB"],
    services: ["Web & App Development", "API & Integrations"],
    challenge:
      "Traditional dating apps lean on superficial judgments, which shuts out users who are shy or socially anxious. The brief was to build a values-first matching experience that still felt live and immediate.",
    outcome:
      "Built a full-stack app on React + Node/Express with MongoDB, JWT login and mobile OTP profile verification, an embedded chatbot for common queries, and Socket.IO real-time messaging with read receipts, online status, timestamps and emoji.",
    website: "https://github.com/aadil0307/MatchUnseen",
  },
  {
    slug: "tradebridge",
    title: "TradeBridge",
    client: "Personal Project",
    category: "Mobile Application",
    year: "2024",
    summary:
      "A hyperlocal e-commerce Android app bridging the digital gap for street vendors — customers discover nearby vendors by category on a map, and vendors manage listings, galleries and reviews.",
    metrics: [
      ["2", "customer + vendor apps"],
      ["OTP", "auth on both sides"],
      ["200 m", "fav proximity alert"],
    ],
    tags: ["Java", "Firebase", "Google Maps"],
    services: ["Mobile Application", "API & Integrations"],
    challenge:
      "Street vendors are largely invisible to internet commerce. The app had to connect customers with nearby vendors by category on a map while giving vendors easy listing tools and privacy control over their GPS.",
    outcome:
      "Shipped a two-module Android app (Java + XML) on Firebase with Google Maps: customers sign up with OTP, browse vendors on a map, favorite them for proximity notifications, and rate and review; vendors toggle GPS, manage products and pricing, and run a photo gallery.",
    website: "https://github.com/aadil0307/TradeBridge",
  },
  {
    slug: "teachlink",
    title: "TeachLink",
    client: "Personal Project",
    category: "Mobile Application",
    year: "2024",
    summary:
      "A Flutter class-management app for educators and institutions — course and class management, student/teacher profiles, attendance tracking, assignments and grades, with announcements.",
    metrics: [
      ["Flutter", "cross-platform"],
      ["Provider", "state management"],
      ["3", "platforms (iOS/Android/Web)"],
    ],
    tags: ["Flutter", "Dart", "MongoDB"],
    services: ["Mobile Application", "Web & App Development"],
    challenge:
      "Schools and tutors juggle course rosters, attendance, assignments and announcements across disconnected tools. The brief was a single cross-platform app to streamline classroom operations.",
    outcome:
      "Built a Flutter + MongoDB app with Firebase auth and Provider state management, covering course/class management, profiles, automated attendance, assignment and grade management, and a notifications/announcements system — running on Android, iOS and Web.",
    website: "https://github.com/aadil0307/TeachLink",
  },
  {
    slug: "steppup-pedometer-bmi",
    title: "StepUP Pedometer & BMI",
    client: "Personal Project",
    category: "Mobile Application",
    year: "2024",
    summary:
      "An Android pedometer and BMI tracker that uses the phone's built-in accelerometer to log steps, distance, calories and BMI against a daily goal — with past activity plotted on a graph.",
    metrics: [
      ["Accelerometer", "sensor-driven steps"],
      ["BMI", "tracking on device"],
      ["Graph", "activity history"],
    ],
    tags: ["Java", "Android", "Firebase"],
    services: ["Mobile Application", "Web & App Development"],
    challenge:
      "Most step trackers need a wearable or paid app. The goal was an accessible, on-device pedometer that also surfaced meaningful health metrics (distance, calories, BMI) to push back against sedentary habits.",
    outcome:
      "Delivered an Android app in Java + XML backed by Firebase that counts steps and distance from the accelerometer, computes calories and BMI, sets daily goals, and charts historical activity so users can see their trend over time.",
    website: "https://github.com/aadil0307/StepUP-Pedometer-BMI",
  },
  {
    slug: "seasure",
    title: "SeaSure Pro",
    client: "Personal Project",
    category: "Mobile Application",
    year: "2024",
    summary:
      "A production-ready React Native app for Indian coastal fishermen — interactive maritime map with GPS/EEZ boundaries and 400+ landing centres, marine weather, AI fish recognition, trip planning, a digital logbook, and one-tap SOS.",
    metrics: [
      ["6", "Indian languages"],
      ["400+", "landing centres mapped"],
      ["AI", "fish recognition"],
    ],
    tags: ["React Native", "Expo", "Firebase"],
    services: ["Mobile Application", "AI & Automation", "API & Integrations"],
    challenge:
      "Coastal fishermen risk crossing maritime boundaries and bad weather, and need real-time, low-connectivity-safe data. The app had to combine maps, weather, AI vision and emergency tools in one offline-tolerant experience.",
    outcome:
      "Built a React Native + Expo + TypeScript app on Firebase with Google Maps, OpenWeather and INCOIS data: GPS map with EEZ alerts and boundary warnings, marine weather with AI fishing recommendations, camera-based fish recognition, smart trip planner, cloud-synced logbook, and one-tap SOS to the Coast Guard — localized across 6 languages.",
    website: "https://github.com/aadil0307/SeaSure",
  },
  {
    slug: "ticketh",
    title: "TickETH",
    client: "Personal Project",
    category: "Web & App Development",
    year: "2024",
    summary:
      "A Web3 ticketing monorepo for NFT ticket minting, event discovery, controlled secondary resale, and event-day QR check-in — with SIWE wallet auth, an admin dashboard, and Solidity contracts on Polygon.",
    metrics: [
      ["Polygon", "NFT tickets"],
      ["Web + Mobile", "monorepo"],
      ["SIWE", "wallet auth"],
    ],
    tags: ["Solidity", "NestJS", "Next.js"],
    services: ["Web & App Development", "API & Integrations", "Security & Audits"],
    challenge:
      "Ticketing is rife with fraud and scalping. The brief was a trustless system — NFT tickets on-chain, controlled resale, and verifiable event-day check-in — without a central authority owning inventory.",
    outcome:
      "Delivered a monorepo: NestJS + Supabase backend with BullMQ/Redis and ethers v6, Next.js 16 web app with thirdweb, an Expo/React Native QR scanner for volunteer check-in, and Solidity 0.8.24 contracts (Hardhat + OpenZeppelin) on Polygon Amoy — with admin moderation, audit logging, rate limiting and RBAC.",
    website: "https://github.com/aadil0307/TickETH",
  },
];