// Content aligned with the supplied English and Vietnamese CVs.
export const profile = {
  "name": "Trịnh Văn Duy",
  "role": "Senior Game Developer",
  "summary": "Senior Game Developer with 6+ years of experience specializing in Cocos Creator, Unity and HTML5/Instant Games. I architect scalable client-side systems, automate playable-ad production and optimize rendering and memory performance for mobile and web games. I also lead technical work and guide products from concept to launch.",
  "intro": "Senior Game Developer with 6+ years of experience in Cocos Creator, Unity and HTML5/Instant Games. I build scalable game systems, automate playable-ad production and optimize mobile and web performance.",
  "years": "6+",
  "phone": "0369549798",
  "phoneDisplay": "0369 549 798",
  "email": "duytv0812@gmail.com",
  "location": "Hanoi, Vietnam",
  "linkedin": "https://www.linkedin.com/in/duytv98/",
  "github": "https://github.com/Duytv081298",
  "education": {
    "period": "2016 - 2020",
    "school": "FPT – Greenwich Vietnam",
    "degree": "Information Technology",
    "classification": "Classification: Excellent"
  },
  "award": {
    "year": "2024",
    "title": "Employee of the Year 2024",
    "company": "PIXON"
  },
  "experience": [
    {
      "id": "pixon",
      "period": "2024 – Present",
      "company": "PIXON",
      "role": "Game Developer",
      "tech": [
        "Cocos Creator",
        "Unity (Luna)",
        "AppLovin",
        "Unity Ads",
        "Meta",
        "Mintegral",
        "Node.js"
      ],
      "highlights": [
        "Architected high-converting playable ads with Cocos Creator and Unity (Luna), meeting 2–5 MB size budgets across AppLovin, Unity Ads, Meta and Mintegral.",
        "Built internal automation tools for playable-ad build and packaging pipelines, reducing manual deployment time by 70%.",
        "Optimized rendering, texture compression and asset loading to maintain smooth 60 FPS performance on low-end mobile devices."
      ]
    },
    {
      "id": "game-zoka",
      "period": "2023 - 2024",
      "company": "GAME ZOKA",
      "role": "Game Developer",
      "tech": [
        "Cocos Creator",
        "TypeScript",
        "WebSocket",
        "PlayFab"
      ],
      "highlights": [
        "Led R&D, technical feasibility evaluations and prototype development for new casual and hyper-casual game concepts.",
        "Architected real-time multiplayer card-game clients with Cocos Creator and TypeScript, including WebSocket synchronization, state management and responsive UI animations.",
        "Integrated PlayFab for player authentication, cloud data persistence and real-time global leaderboards."
      ]
    },
    {
      "id": "sonat-studio",
      "period": "2021 - 2022",
      "company": "SONAT STUDIO",
      "role": "Game Developer",
      "tech": [
        "Unity (C#)",
        "PixiJS",
        "CreateJS",
        "Facebook Instant Games"
      ],
      "highlights": [
        "Developed and shipped casual puzzle games in Unity (C#), with modular gameplay, level editors and monetization SDKs.",
        "Built and maintained cross-platform Facebook Instant Games and lightweight HTML5 playable ads with PixiJS and CreateJS.",
        "Refactored legacy UI and gameplay modules to reduce memory usage and crash rates on Android and iOS."
      ]
    },
    {
      "id": "fpt-software",
      "period": "2019 - 2020",
      "company": "FPT SOFTWARE",
      "role": "Fresher JavaScript",
      "tech": [
        "Angular",
        "JavaScript",
        "HTML5",
        "CSS3",
        "RESTful APIs",
        "Git"
      ],
      "highlights": [
        "Developed responsive front-end web applications with Angular, JavaScript, HTML5 and CSS3 in an Agile/Scrum environment.",
        "Built reusable UI components and integrated RESTful APIs, establishing a foundation in clean code and Git version control."
      ]
    }
  ],
  "skillGroups": [
    {
      "title": "Game Engines & Frameworks",
      "items": [
        "Cocos Creator (2.x / 3.x)",
        "Cocos2d-x",
        "Unity (C#)",
        "PixiJS",
        "CreateJS"
      ]
    },
    {
      "title": "Programming Languages",
      "items": [
        "TypeScript",
        "JavaScript (ES6+)",
        "C#",
        "HTML5",
        "CSS3"
      ]
    },
    {
      "title": "Architecture & Optimization",
      "items": [
        "Draw Call & Memory Optimization",
        "Asset Bundle Management",
        "Object Pooling",
        "Design Patterns (Singleton, Observer, State, MVC)",
        "Playable Ads Compression (Luna Playable)"
      ]
    },
    {
      "title": "Backend, Services & Tools",
      "items": [
        "PlayFab",
        "Firebase",
        "WebSocket / RESTful APIs",
        "Git",
        "Node.js (Build & Automation Tooling)",
        "CI/CD"
      ]
    }
  ]
} as const;

export const cvFiles = {
  en: { filename: "TRINH-VAN-DUY_EN.pdf", label: "English" },
  vi: { filename: "TRINH-VAN-DUY_VN.pdf", label: "Tiếng Việt" },
} as const;
