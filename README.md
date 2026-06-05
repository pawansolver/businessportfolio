# Pawan Business Portfolio

A modern business portfolio website built with Next.js 15, React 19, TypeScript, and Tailwind CSS 4.

## Folder Structure

```
backend/                    # Express API server
├── routes/                 # API route definitions
├── controllers/            # Request handlers
├── models/                 # Mongoose schemas
├── config/                 # DB & env config
├── .env                    # Environment variables (not committed)
├── package.json
└── server.js
src/
├── app/                    # Next.js App Router pages
│   ├── about/
│   ├── contact/
│   ├── projects/
│   ├── services/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── layout/             # Header, Footer
│   ├── sections/           # Hero, About, Services, Projects, Contact
│   └── ui/                 # Reusable UI components
├── data/                   # Static content & config
├── lib/                    # Utility functions
└── types/                  # TypeScript type definitions
public/
└── images/                 # Static assets
```

## Getting Started

### Frontend

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Backend

```bash
cd backend
npm install
cp .env.example .env   # edit MONGODB_URI if needed
npm run dev
```

API runs at [http://localhost:5000](http://localhost:5000).

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Health check |
| `/api/contact` | POST | Submit contact form |
| `/api/contact` | GET | List all submissions |

## Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run start` — Start production server
- `npm run lint` — Run ESLint
