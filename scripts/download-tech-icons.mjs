// Downloads all devicon SVGs used in techStack.ts to public/tech/ (one-time script)
import { mkdir, writeFile } from "node:fs/promises";
import { join, basename } from "node:path";

const BASE = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

// devicon relative paths (folder/file.svg) used across the site
const icons = [
  "nextjs/nextjs-original.svg",
  "react/react-original.svg",
  "typescript/typescript-original.svg",
  "javascript/javascript-original.svg",
  "tailwindcss/tailwindcss-original.svg",
  "html5/html5-original.svg",
  "css3/css3-original.svg",
  "framermotion/framermotion-original.svg",
  "nodejs/nodejs-original.svg",
  "express/express-original.svg",
  "fastapi/fastapi-original.svg",
  "json/json-original.svg",
  "socketio/socketio-original.svg",
  "mongodb/mongodb-original.svg",
  "mysql/mysql-original.svg",
  "postgresql/postgresql-original.svg",
  "redis/redis-original.svg",
  "prisma/prisma-original.svg",
  "mongoose/mongoose-original.svg",
  "vercel/vercel-original.svg",
  "docker/docker-original.svg",
  "githubactions/githubactions-original.svg",
  "nginx/nginx-original.svg",
  "amazonwebservices/amazonwebservices-original-wordmark.svg",
  "jest/jest-plain.svg",
  "postman/postman-original.svg",
  "threejs/threejs-original.svg",
  "chartjs/chartjs-original.svg",
  "axios/axios-plain.svg",
  "redux/redux-original.svg",
  "vscode/vscode-original.svg",
  "git/git-original.svg",
  "github/github-original.svg",
  "figma/figma-original.svg",
  "npm/npm-original-wordmark.svg",
  "openal/openal-original.svg",
  "notion/notion-original.svg",
  "slack/slack-original.svg",
];

const outDir = join(process.cwd(), "public", "tech");

const run = async () => {
  await mkdir(outDir, { recursive: true });
  let ok = 0;
  let fail = 0;

  for (const rel of icons) {
    const url = `${BASE}/${rel}`;
    const file = basename(rel);
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const svg = await res.text();
      await writeFile(join(outDir, file), svg, "utf8");
      ok++;
      console.log(`✓ ${file}`);
    } catch (err) {
      fail++;
      console.error(`✗ ${file} — ${err.message}`);
    }
  }

  console.log(`\nDone. ${ok} downloaded, ${fail} failed.`);
};

run();
