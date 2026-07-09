<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:6C63FF,100:00C6FF&height=220&section=header&text=SAKHA&fontSize=70&fontColor=ffffff&animation=fadeIn&fontAlignY=35&desc=Your%20Personal%20AI%20Assistant&descAlignY=55&descSize=20" width="100%"/>

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=24&pause=1200&color=6C63FF&center=true&vCenter=true&width=650&lines=Talk+to+it.+Ask+it.+Ask+it+to+remember.;Voice-enabled+%7C+Real-time+Search+%7C+Smart+Calendar;Built+solo%2C+shipped+to+production+%F0%9F%9A%80" alt="Typing SVG" />

<br/>

![Made with Love](https://img.shields.io/badge/Made%20with-%E2%9D%A4%EF%B8%8F-red?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Live%20in%20Production-brightgreen?style=for-the-badge)
![Solo Project](https://img.shields.io/badge/Built%20By-Solo%20Developer-6C63FF?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

<br/><br/>

[**🔗 Try the Live App**](https://sakha-assistant.vercel.app) &nbsp;|&nbsp; [**⚙️ Backend API**](https://sakha-backend-pjoo.onrender.com) &nbsp;|&nbsp; [**📂 View Source**](https://github.com/rajvardhan-here/sakha-assistant) &nbsp;|&nbsp; [**👤 About Me**](#-about-the-developer)

</div>

<br/>

<div align="center">
<img src="https://skillicons.dev/icons?i=react,vite,nodejs,express,firebase,js,html,css,git,github,vercel,render&theme=dark" />
</div>

<br/>

---

## 👋 What is SAKHA?

**SAKHA** (सखा — Hindi for *"friend"*) is a full-stack, voice-enabled AI assistant that I designed, built, and shipped to production **end-to-end, solo** — from database and auth architecture to real-time voice UX and cloud deployment.

It's not a tutorial clone. It's a production system with real users, real OAuth flows, real API cost/rate constraints, and real infrastructure decisions — the kind of problem-solving that reflects how I actually build software.

> 💬 *Think of it as a lightweight, personal version of Google Assistant — you can talk to it, ask it to search the web, and have it manage your calendar, all wrapped in a clean web app.*

<br/>

## 🏆 Why This Project Stands Out

<table>
<tr>
<td width="50%">

**🎯 Full-Stack Ownership**
Designed and built every layer myself — frontend, backend, auth, third-party integrations, and deployment pipeline.

**🔐 Real-World Auth & Security**
Implemented Firebase + Google OAuth 2.0 with scoped permissions (Calendar API access), and audited the repo for leaked secrets before going live.

</td>
<td width="50%">

**🌐 Production Deployment**
Live, publicly accessible app — backend on Render, frontend on Vercel — with environment-based configuration and CORS handling across domains.

**🧠 AI Integration**
Integrated an LLM (Groq / Llama 3.1) for natural conversation, with a custom intent-routing layer that decides when to chat, search the web, or hit the calendar API.

</td>
</tr>
</table>

<br/>

## ✨ Features

| Feature | Description |
|---|---|
| 💬 **Conversational AI Chat** | Context-aware, natural conversations powered by an LLM (Groq / Llama 3.1) |
| 🔎 **Live Web Search** | Real-time answers pulled from the web, with clickable source links returned in-chat |
| 🎙️ **Voice Interaction** | Full voice input/output — talk to SAKHA like a real assistant |
| 📅 **Google Calendar Sync** | OAuth-secured calendar integration for reminders and event management |
| 🔐 **Secure Authentication** | Firebase-powered Google Sign-In with scoped permissions |
| ⏰ **Smart Reminders** | Set and track tasks/reminders conversationally |
| 📱 **Responsive Design** | Fully functional across desktop and mobile |
| ☁️ **Cloud-Native Deployment** | CI-style auto-deploys via GitHub → Render + Vercel |

<br/>

## 🛠️ Tech Stack

<div align="center">

| Layer | Technology |
|---|---|
| **Frontend** | ![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white) |
| **Backend** | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white) ![Express](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white) |
| **Authentication** | ![Firebase](https://img.shields.io/badge/Firebase%20Auth-FFCA28?style=flat-square&logo=firebase&logoColor=black) ![Google OAuth](https://img.shields.io/badge/Google%20OAuth-4285F4?style=flat-square&logo=google&logoColor=white) |
| **AI / LLM** | ![Groq](https://img.shields.io/badge/Groq-Llama%203.1-orange?style=flat-square) |
| **Integrations** | Google Calendar API · Web Search API |
| **Hosting** | ![Render](https://img.shields.io/badge/Render-46E3B7?style=flat-square&logo=render&logoColor=white) ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white) |
| **Tooling** | ![Git](https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white) |

</div>

<br/>

## 🏗️ Architecture

```
┌─────────────────────┐        HTTPS / REST        ┌──────────────────────┐
│      Frontend         │ ─────────────────────────▶ │       Backend           │
│   React + Vite (SPA)   │ ◀───────────────────────── │  Node.js + Express API   │
│   hosted on Vercel      │        JSON responses        │   hosted on Render         │
└─────────────────────┘                             └──────────────────────┘
          │                                                      │
          │ Google Sign-In (OAuth)                    │ Groq LLM API
          ▼                                                      ▼
┌─────────────────────┐                             ┌──────────────────────┐
│   Firebase Auth        │                             │  Web Search + Google    │
│   Google Calendar API   │                             │  Calendar integrations   │
└─────────────────────┘                             └──────────────────────┘
```

**Key engineering decisions:**
- Separated frontend/backend into independently deployable services for scalability
- Used an **intent classifier** in the backend to route each chat message to the correct handler (plain chat vs. search vs. calendar action)
- Environment-variable-driven config so the same codebase runs identically in local, staging, and production

<br/>

## 🧩 Challenges Solved

A few real problems I ran into while building and shipping this — the kind of debugging/architecture work that doesn't show up in a feature list:

- **Cross-origin auth in production** — Configured `FRONTEND_URL`, Firebase authorized domains, and Google Cloud OAuth origins together so login works seamlessly across the Vercel + Render split.
- **Token persistence** — Diagnosed why Calendar access kept dropping (in-memory token lost on refresh) and fixed it with persistent client-side token storage.
- **Search results without dead ends** — Redesigned the search-response pipeline so the AI always surfaces a real source link instead of just describing how to search.
- **Secret hygiene** — Audited the entire Git history for accidentally tracked credentials/service account files before making the repo public.

<br/>

## 🌍 Live Demo

| Service | Link |
|---|---|
| 🖥️ Web App | [sakha-assistant.vercel.app](https://sakha-assistant.vercel.app) |
| ⚙️ API Health Check | [sakha-backend-pjoo.onrender.com](https://sakha-backend-pjoo.onrender.com) |

> ⚠️ Hosted on free-tier infra — the backend may take ~50s to wake up after inactivity, and Google's OAuth "unverified app" screen appears until formal verification is complete (click **Advanced → Go to SAKHA**).

<br/>

## 🖼️ Screenshots

<div align="center">
<i>Add screenshots or a short demo GIF here — this is the single highest-impact addition you can make for anyone (HR included) skimming the repo.</i>

```md
![Chat Screen](./screenshots/chat.png)
![Voice Mode](./screenshots/voice.png)
![Calendar Sync](./screenshots/calendar.png)
```

</div>

<br/>

## ⚡ Getting Started

### Prerequisites
- Node.js v18+
- npm
- A Firebase project (Auth)
- A Groq API key
- A Google Cloud project (OAuth + Calendar API)

### Setup

```bash
# 1. Clone
git clone https://github.com/rajvardhan-here/sakha-assistant.git
cd sakha-assistant

# 2. Backend
cd backend
npm install
cp .env.example .env   # add your own credentials
npm run dev

# 3. Frontend (in a new terminal)
cd frontend
npm install
cp .env.example .env   # add your own credentials
npm run dev
```

Frontend runs on `http://localhost:5173`, backend on `http://localhost:5000`.

<br/>

## 🔑 Environment Variables

> 🔒 Real `.env` files are **never** committed — only `.env.example` templates are tracked in Git.

**`backend/.env`**
```env
PORT=5000
GROQ_API_KEY=your_groq_api_key
FIREBASE_ADMIN_CREDENTIALS=your_firebase_admin_json_or_base64
FRONTEND_URL=https://your-frontend-url.vercel.app
```

**`frontend/.env`**
```env
VITE_API_URL=https://your-backend-url.onrender.com/api
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

<br/>

## 📁 Folder Structure

```
sakha-assistant/
├── backend/
│   ├── controllers/
│   │   └── chatController.js
│   ├── routes/
│   ├── config/
│   ├── .env.example
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── googleToken.js
│   │   └── firebase.js
│   ├── .env.example
│   └── vite.config.js
└── README.md
```

<br/>

## 🗺️ Roadmap

- [ ] Submit for Google OAuth verification (remove "unverified app" screen)
- [ ] Implement OAuth refresh-token flow for persistent Calendar access
- [ ] Stabilize wake-word voice activation
- [ ] Add automated tests (unit + integration)
- [ ] Add dark/light theme toggle
- [ ] Move backend to a paid tier to remove cold-start delay

<br/>

## 🔐 Security

- All credentials are managed via environment variables — never committed to the repo
- `.env.example` templates only; real secrets stay local/on the hosting platform
- Repo has been audited for accidentally tracked service account files or credentials
- If you fork this project, generate your **own** Firebase, Groq, and Google Cloud credentials

<br/>

## 👤 About the Developer

**Rajvardhan** — Full-stack developer who built SAKHA as an independent, production-grade project to explore AI integration, OAuth security, voice interfaces, and real cloud deployment.

**Skills demonstrated in this project:**
`React` `Node.js/Express` `REST API Design` `OAuth 2.0 / Firebase Auth` `LLM Integration` `Third-Party API Integration` `Cloud Deployment (Render/Vercel)` `Environment & Secrets Management` `Debugging & Production Troubleshooting`

<div align="center">

[![GitHub](https://img.shields.io/badge/GitHub-rajvardhan--here-181717?style=for-the-badge&logo=github)](https://github.com/rajvardhan-here)
[![Portfolio](https://img.shields.io/badge/Portfolio-Add%20Link-6C63FF?style=for-the-badge&logo=vercel&logoColor=white)](#)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Add%20Link-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](#)
[![Email](https://img.shields.io/badge/Email-Add%20Address-D14836?style=for-the-badge&logo=gmail&logoColor=white)](#)

</div>

<br/>

## 📜 License

Licensed under the **MIT License** — free to use, modify, and build on with attribution.

<br/>

<div align="center">

⭐ **If this project is interesting to you, a star would mean a lot!** ⭐

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:00C6FF,100:6C63FF&height=120&section=footer" width="100%"/>

</div>