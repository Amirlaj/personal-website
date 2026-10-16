export const profile = {
  name: "Amir Lajevardi",
  portrait: "/amir-alpine.png",
  role: "Computer science student & developer",
  email: "amir.lajevardi84@gmail.com",
  linkedin: "https://www.linkedin.com/in/amirlajevardi/",
  github: "https://github.com/Amirlaj",
  university: "City St George’s, University of London",
  degree: "BSc Computer Science",
  years: "Sep 2024 – Jun 2027",
  academicProgress: "On track to achieve a first-class degree.",
  location: "London, United Kingdom",
  resume: "/Amir-Lajevardi-CV.pdf",
};

export const projects = [
  {
    id: "compiler",
    type: "Compiler construction",
    title: "LPL26 Compiler",
    dates: "Mar 2026 – Apr 2026",
    description:
      "A compiler from LPL26 to SSM assembly, with a recursive-descent parser, an abstract syntax tree and runtime memory-safety checks. Validated with 60 JUnit parameterised tests.",
    tags: ["Java", "Parsing", "Code generation", "JUnit"],
    repository: "https://github.com/Amirlaj/LPL26-Compiler",
  },
  {
    id: "pharmacy",
    type: "Team project",
    title: "InfoPharma Ordering System · IPOS-SA",
    dates: "Mar 2026 – Apr 2026",
    description:
      "Spring Boot backend modules with JWT authentication, role-based access and a SQL schema for orders, invoices, payments and audit logging. Wrote 86 JUnit/Mockito tests and led peer review.",
    tags: ["Java", "Spring Boot", "SQL", "JWT", "Mockito"],
    repository: "https://github.com/IPOS-system/subsystem-SA",
  },
  {
    id: "crypto",
    type: "iOS development",
    title: "iOS Cryptocurrency App",
    dates: "Mar 2025 – Jun 2026",
    description:
      "A live cryptocurrency tracker with animated charts, REST API updates through Combine and Core Data persistence. Built with SwiftUI and MVVM, then tested on TestFlight.",
    tags: ["Swift", "SwiftUI", "Combine", "Core Data", "MVVM"],
    repository: "https://github.com/Amirlaj/SwiftfulCrypto",
  },
  {
    id: "networks",
    type: "Socket programming",
    title: "Computer Networks",
    dates: "Feb 2025 – Apr 2025",
    description:
      "Client–server programs using TCP and UDP sockets, with reliable request–response handling and error handling.",
    tags: ["TCP", "UDP", "Sockets"],
    repository: "https://github.com/Amirlaj/Networks-",
  },
  {
    id: "game",
    type: "Game development",
    title: "2D Java Game",
    dates: "Feb 2025 – Apr 2025",
    description:
      "A physics-based game with single-player and local two-player modes, shooting, jetpack power-ups and automatic level progression. Includes menus, pause controls and background audio.",
    tags: ["Java", "JBox2D", "Swing"],
    repository: "https://github.com/Amirlaj/JBOX2D-engine-game",
  },
];

export const skills = ["Java", "Swift", "SQL", "Spring Boot", "SwiftUI", "Combine", "Core Data", "JUnit", "Mockito", "Git & GitHub", "TestFlight"];

export const experience = [
  {
    id: "internship",
    title: "Software Engineering Intern",
    dates: "Aug 2026 – Sep 2026",
    location: "Remote",
    description:
      "Developed a mesh contraction algorithm that turns complex 3D meshes into simplified skeleton graphs. Refined the geometry-processing pipeline to improve extraction accuracy and computational efficiency.",
  },
  {
    id: "hackathon",
    title: "ETHGlobal · Hackathon Prize Winner",
    dates: "July",
    location: "Lisbon, Portugal",
    description:
      "Assembled and led the team behind RWA Outlets, a liquidity platform for tokenised real-world assets. Built Node.js and Express APIs with MongoDB for redemption requests, vault positions, trades and notifications. Won 3rd place in the Uniswap Foundation’s Best Uniswap API Integration category.",
  },
  {
    id: "tutoring",
    title: "Personal Tutor · Mathematics & Computer Science",
    dates: "Sep 2024 – Oct 2025",
    location: "London, UK",
    description:
      "Tutored GCSE and A-level students in exam preparation and problem-solving, covering topics including differentiation, probability, algebra and vectors.",
  },
];
