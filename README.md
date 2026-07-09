<div align="center">

<!-- Animated typing header -->
<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=32&pause=1000&color=6C63FF&center=true&vCenter=true&width=600&lines=Hey%2C+I'm+SAKHA+%F0%9F%91%8B;Your+Personal+AI+Assistant;Chat+%7C+Voice+%7C+Calendar+%7C+Search" alt="Typing SVG" />

<br/>

![Made with Love](https://img.shields.io/badge/Made%20with-%E2%9D%A4%EF%B8%8F-red?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-Vite-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Firebase](https://img.shields.io/badge/Firebase-Auth-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Status](https://img.shields.io/badge/Status-Live-brightgreen?style=for-the-badge)

<br/>

### 🚀 **SAKHA** — An AI-powered personal assistant that chats, listens, searches the web, and manages your calendar — all in one place.

[🔗 Live Demo](https://sakha-assistant.vercel.app) &nbsp;•&nbsp; [🖥️ Backend API](https://sakha-backend-pjoo.onrender.com) &nbsp;•&nbsp; [📂 Source Code](https://github.com/rajvardhan-here/sakha-assistant)

<img src="https://capsule-render.vercel.app/api?type=waving&color=6C63FF&height=100&section=footer" />

</div>

---

## 📖 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture Overview](#-architecture-overview)
- [Live Demo](#-live-demo)
- [Screenshots](#-screenshots)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Folder Structure](#-folder-structure)
- [Roadmap](#-roadmap)
- [Known Limitations](#-known-limitations)
- [Security](#-security)
- [Credits](#-credits)
- [License](#-license)
- [Contact](#-contact)

---

## 💡 About the Project

**SAKHA** (सखा — meaning *"friend"* in Hindi) is a full-stack, voice-enabled AI assistant built to feel like a helpful companion rather than just another chatbot. It combines conversational AI, real-time web search, Google Calendar integration, and voice interaction into a single seamless web app.

The project was built end-to-end — from authentication and backend APIs to a polished, responsive frontend — and deployed live using free-tier cloud infrastructure (Render + Vercel).

---

## ✨ Features

- 💬 **Conversational AI Chat** — Natural, context-aware conversations powered by an LLM
- 🔎 **Live Web Search** — Fetches real-time information from the web with clickable source links
- 🎙️ **Voice Interaction** — Talk to SAKHA using your microphone
- 📅 **Google Calendar Integration** — Connects your calendar for reminders and event management
- 🔐 **Secure Google Authentication** — Firebase-powered Google Sign-In
- ⏰ **Reminders & Tasks** — Set and track reminders directly through chat
- 🌐 **Fully Deployed** — Live backend on Render and live frontend on Vercel
- 📱 **Responsive UI** — Works smoothly across desktop and mobile

---

## 🛠️ Tech Stack

<div align="center">

| Layer | Technology |
|---|---|
| **Frontend** | ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white) |
| **Backend** | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white) ![Express](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white) |
| **Authentication** | ![Firebase](https://img.shields.io/badge/Firebase%20Auth-FFCA28?style=flat&logo=firebase&logoColor=black) ![Google OAuth](https://img.shields.io/badge/Google%20OAuth-4285F4?style=flat&logo=google&logoColor=white) |
| **AI / LLM** | ![Groq](https://img.shields.io/badge/Groq-Llama%203.1-orange?style=flat) |
| **Integrations** | Google Calendar API, Web Search API |
| **Hosting (Backend)** | ![Render](https://img.shields.io/badge/Render-46E3B7?style=flat&logo=render&logoColor=white) |
| **Hosting (Frontend)** | ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white) |
| **Version Control** | ![Git](https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white) |

</div>

---

## 🏗️ Architecture Overview

```
┌──────────────────┐        HTTPS         ┌──────────────────┐
│   Frontend        │ ───────────────────▶ │   Backend          │
│  React + Vite      │ ◀─────────────────── │  Node.js + Express  │
│  (Vercel)           │      JSON API         │  (Render)             │
└──────────────────┘                       └──────────────────┘
         │                                            │
         │ Google Sign-In                    │ Groq LLM API
         ▼                                            ▼
┌──────────────────┐                       ┌──────────────────┐
│ Firebase Auth      │                       │ Web Search /         │
│ Google Calendar    │                       │ Calendar APIs        │
└──────────────────┘                       └──────────────────┘
```

---

## 🌍 Live Demo

| Service | Link |
|---|---|
| 🖥️ Frontend (App) | [sakha-assistant.vercel.app](https://sakha-assistant.vercel.app) |
| ⚙️ Backend (API health check) | [sakha-backend-pjoo.onrender.com](https://sakha-backend-pjoo.onrender.com) |

> ⚠️ **Note:** The backend is hosted on Render's free tier, so it may take **~50 seconds** to wake up if it has been inactive.

> ⚠️ **Note:** This app currently shows a Google *"unverified app"* warning during login since it is still pending Google's official verification process. Click **Advanced → Go to SAKHA (unsafe)** to proceed — the app is safe, this is a standard Google review formality for new OAuth apps.

---

## 🖼️ Screenshots

<div align="center">
<i>Add your app screenshots here — e.g. chat screen, voice mode, calendar sync</i>

```
![Chat Screen](./screenshots/chat.png)
![Voice Mode](./screenshots/voice.png)
```

</div>

---

## ⚡ Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm
- A Firebase project (for Auth)
- A Groq API key
- A Google Cloud project (for OAuth + Calendar API)

### 1. Clone the repository

```bash
git clone https://github.com/rajvardhan-here/sakha-assistant.git
cd sakha-assistant
```

### 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env   # fill in your own credentials
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env   # fill in your own credentials
npm run dev
```

The frontend will run on `http://localhost:5173` and the backend on `http://localhost:5000` (or as configured).

---

## 🔑 Environment Variables

> 🔒 **Never commit your real `.env` file.** Only `.env.example` (with placeholder values) should be tracked in Git.

**Backend (`backend/.env`)**

```env
PORT=5000
GROQ_API_KEY=your_groq_api_key
FIREBASE_ADMIN_CREDENTIALS=your_firebase_admin_json_or_base64
FRONTEND_URL=https://your-frontend-url.vercel.app
```

**Frontend (`frontend/.env`)**

```env
VITE_API_URL=https://your-backend-url.onrender.com/api
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

---

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

---

## 🗺️ Roadmap

- [ ] Submit app for Google OAuth verification (public launch)
- [ ] Implement refresh-token flow for persistent Calendar access beyond 1 hour
- [ ] Re-enable and stabilize wake-word voice activation
- [ ] Add dark/light theme toggle
- [ ] Add unit and integration tests
- [ ] Upgrade hosting tier to remove backend cold-start delay

---

## ⚠️ Known Limitations

- Google Calendar access token is valid for ~1 hour per session (Google's own security limit); reconnect by logging out and back in.
- The app currently displays Google's "unverified app" screen until formal verification is complete.
- Free-tier backend hosting may cause a short delay (~50s) on the first request after inactivity.

---

## 🔐 Security

- Sensitive credentials (Firebase Admin keys, API keys) are managed via environment variables and **are not committed to this repository**.
- Only `.env.example` files with placeholder values are tracked in version control.
- If you fork this project, generate your own Firebase, Groq, and Google Cloud credentials — never reuse credentials from this README or commit history.

---

## 🙌 Credits

**Project by:** [Rajvardhan](https://github.com/rajvardhan-here)

Built as a solo full-stack project — covering backend API design, authentication, third-party integrations, and frontend development, with deployment on Render and Vercel.

---

## 📜 License

This project is licensed under the **MIT License** — feel free to use, modify, and build upon it with attribution.

---

## 📬 Contact

<div align="center">

[![GitHub](https://img.shields.io/badge/GitHub-rajvardhan--here-181717?style=for-the-badge&logo=github)](https://github.com/rajvardhan-here)

⭐ **If you found this project interesting, consider giving it a star!** ⭐

<img src="https://capsule-render.vercel.app/api?type=waving&color=6C63FF&height=80&section=footer" />

</div>