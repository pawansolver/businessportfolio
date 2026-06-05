export interface TechItem {
  name: string;
  category: string;
  icon: string; // URL to SVG icon
  color: string; // brand accent color for glow
}

export const techStack: TechItem[] = [
  // ── Frontend ──────────────────────────────────────────────────────────────
  {
    name: "Next.js",
    category: "Frontend",
    icon: "/tech/nextjs-original.svg",
    color: "#ffffff",
  },
  {
    name: "React",
    category: "Frontend",
    icon: "/tech/react-original.svg",
    color: "#61DAFB",
  },
  {
    name: "TypeScript",
    category: "Frontend",
    icon: "/tech/typescript-original.svg",
    color: "#3178C6",
  },
  {
    name: "JavaScript",
    category: "Frontend",
    icon: "/tech/javascript-original.svg",
    color: "#F7DF1E",
  },
  {
    name: "Tailwind CSS",
    category: "Frontend",
    icon: "/tech/tailwindcss-original.svg",
    color: "#06B6D4",
  },
  {
    name: "HTML5",
    category: "Frontend",
    icon: "/tech/html5-original.svg",
    color: "#E34F26",
  },
  {
    name: "CSS3",
    category: "Frontend",
    icon: "/tech/css3-original.svg",
    color: "#1572B6",
  },
  {
    name: "Framer Motion",
    category: "Frontend",
    icon: "/tech/framermotion-original.svg",
    color: "#0055FF",
  },

  // ── Backend ───────────────────────────────────────────────────────────────
  {
    name: "Node.js",
    category: "Backend",
    icon: "/tech/nodejs-original.svg",
    color: "#339933",
  },
  {
    name: "Express.js",
    category: "Backend",
    icon: "/tech/express-original.svg",
    color: "#ffffff",
  },
  {
    name: "REST API",
    category: "Backend",
    icon: "/tech/fastapi-original.svg",
    color: "#009688",
  },
  {
    name: "JWT Auth",
    category: "Backend",
    icon: "/tech/json-original.svg",
    color: "#F7DF1E",
  },
  {
    name: "Socket.io",
    category: "Backend",
    icon: "/tech/socketio-original.svg",
    color: "#ffffff",
  },

  // ── Database ──────────────────────────────────────────────────────────────
  {
    name: "MongoDB",
    category: "Database",
    icon: "/tech/mongodb-original.svg",
    color: "#47A248",
  },
  {
    name: "MySQL",
    category: "Database",
    icon: "/tech/mysql-original.svg",
    color: "#4479A1",
  },
  {
    name: "PostgreSQL",
    category: "Database",
    icon: "/tech/postgresql-original.svg",
    color: "#336791",
  },
  {
    name: "Redis",
    category: "Database",
    icon: "/tech/redis-original.svg",
    color: "#DC382D",
  },
  {
    name: "Prisma",
    category: "Database",
    icon: "/tech/prisma-original.svg",
    color: "#2D3748",
  },
  {
    name: "Mongoose",
    category: "Database",
    icon: "/tech/mongoose-original.svg",
    color: "#880000",
  },

  // ── Deployment & DevOps ───────────────────────────────────────────────────
  {
    name: "Vercel",
    category: "Deployment",
    icon: "/tech/vercel-original.svg",
    color: "#ffffff",
  },
  {
    name: "Docker",
    category: "Deployment",
    icon: "/tech/docker-original.svg",
    color: "#2496ED",
  },
  {
    name: "GitHub Actions",
    category: "Deployment",
    icon: "/tech/githubactions-original.svg",
    color: "#2088FF",
  },
  {
    name: "Nginx",
    category: "Deployment",
    icon: "/tech/nginx-original.svg",
    color: "#009639",
  },
  {
    name: "AWS",
    category: "Deployment",
    icon: "/tech/amazonwebservices-original-wordmark.svg",
    color: "#FF9900",
  },

  // ── Testing ───────────────────────────────────────────────────────────────
  {
    name: "Jest",
    category: "Testing",
    icon: "/tech/jest-plain.svg",
    color: "#C21325",
  },
  {
    name: "Postman",
    category: "Testing",
    icon: "/tech/postman-original.svg",
    color: "#FF6C37",
  },

  // ── Libraries & Frameworks ────────────────────────────────────────────────
  {
    name: "Shadcn UI",
    category: "Libraries",
    icon: "/tech/react-original.svg",
    color: "#ffffff",
  },
  {
    name: "Three.js",
    category: "Libraries",
    icon: "/tech/threejs-original.svg",
    color: "#ffffff",
  },
  {
    name: "Chart.js",
    category: "Libraries",
    icon: "/tech/chartjs-original.svg",
    color: "#FF6384",
  },
  {
    name: "Axios",
    category: "Libraries",
    icon: "/tech/axios-plain.svg",
    color: "#5A29E4",
  },
  {
    name: "Zod",
    category: "Libraries",
    icon: "/tech/typescript-original.svg",
    color: "#3E67B1",
  },
  {
    name: "Redux",
    category: "Libraries",
    icon: "/tech/redux-original.svg",
    color: "#764ABC",
  },

  // ── IDE & Tools ───────────────────────────────────────────────────────────
  {
    name: "VS Code",
    category: "IDE & Tools",
    icon: "/tech/vscode-original.svg",
    color: "#007ACC",
  },
  {
    name: "Git",
    category: "IDE & Tools",
    icon: "/tech/git-original.svg",
    color: "#F05032",
  },
  {
    name: "GitHub",
    category: "IDE & Tools",
    icon: "/tech/github-original.svg",
    color: "#ffffff",
  },
  {
    name: "Figma",
    category: "IDE & Tools",
    icon: "/tech/figma-original.svg",
    color: "#F24E1E",
  },
  {
    name: "npm",
    category: "IDE & Tools",
    icon: "/tech/npm-original-wordmark.svg",
    color: "#CB3837",
  },

  // ── AI & Productivity ─────────────────────────────────────────────────────
  {
    name: "ChatGPT",
    category: "AI & Apps",
    icon: "/tech/openal-original.svg",
    color: "#10a37f",
  },
  {
    name: "GitHub Copilot",
    category: "AI & Apps",
    icon: "/tech/github-original.svg",
    color: "#ffffff",
  },
  {
    name: "Vercel AI SDK",
    category: "AI & Apps",
    icon: "/tech/vercel-original.svg",
    color: "#ffffff",
  },
  {
    name: "Notion",
    category: "AI & Apps",
    icon: "/tech/notion-original.svg",
    color: "#ffffff",
  },
  {
    name: "Slack",
    category: "AI & Apps",
    icon: "/tech/slack-original.svg",
    color: "#4A154B",
  },
];

export const techCategories = [
  "Frontend",
  "Backend",
  "Database",
  "Deployment",
  "Testing",
  "Libraries",
  "IDE & Tools",
  "AI & Apps",
] as const;

export type TechCategory = (typeof techCategories)[number];
