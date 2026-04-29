# Scaler Persona Chat — AI Chatbot

A persona-based AI chatbot that lets you have real conversations with three Scaler/InterviewBit personalities: **Anshuman Singh**, **Abhimanyu Saxena**, and **Kshitij Mishra**.

Built as a prompt engineering assignment for Scaler Academy.

![Scaler Persona Chat](https://img.shields.io/badge/Scaler-Persona%20Chat-6C5CE7?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite)

## 🚀 Live Demo

**[View Live App →](https://your-deployed-url.vercel.app)**

*(Replace with your actual deployed URL)*

---

## ✨ Features

- **Three Distinct Personas** — Each with deeply researched system prompts
- **Persona Switcher** — Switch between Anshuman, Abhimanyu, and Kshitij with conversation reset
- **Suggestion Chips** — Quick-start questions per persona
- **Typing Indicator** — Animated dots while waiting for AI response
- **Error Handling** — User-friendly messages with retry functionality
- **Responsive Design** — Works on mobile, tablet, and desktop
- **Dark Theme** — Premium glassmorphism UI with micro-animations
- **Prompt Engineering** — Few-shot examples, chain-of-thought, output formatting, and constraints

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19 + Vite |
| Styling | Vanilla CSS (Dark Glassmorphism) |
| API | OpenRouter (OpenAI-compatible) |
| Font | Inter (Google Fonts) |
| Deployment | Vercel / Netlify |

## 📦 Setup Instructions

### Prerequisites
- Node.js 18+ installed
- An [OpenRouter](https://openrouter.ai) API key

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/Persona-Based-AI-Chatbott.git
cd Persona-Based-AI-Chatbott
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
```bash
cp .env.example .env
```
Edit `.env` and add your OpenRouter API key:
```
VITE_OPENROUTER_API_KEY=sk-or-v1-your-actual-key-here
```

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 5. Build for production
```bash
npm run build
```

## 📁 Project Structure

```
├── public/
│   ├── anshuman.png       # Persona avatar
│   ├── abhimanyu.png      # Persona avatar
│   └── kshitij.png        # Persona avatar
├── src/
│   ├── data/
│   │   └── personas.js    # Persona configs + system prompts
│   ├── services/
│   │   └── api.js         # OpenRouter API integration
│   ├── App.jsx            # Main chat application
│   ├── index.css          # Global styles
│   └── main.jsx           # Entry point
├── .env.example           # Environment variable template
├── prompts.md             # System prompts documentation
├── reflection.md          # 300-500 word reflection
├── index.html             # HTML entry
└── README.md              # This file
```

## 🔑 Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_OPENROUTER_API_KEY` | Your OpenRouter API key ([get one here](https://openrouter.ai/keys)) |

> ⚠️ **Never commit your `.env` file.** The `.gitignore` already excludes it.

## 📝 Documentation

- **[prompts.md](./prompts.md)** — All three system prompts with inline annotations
- **[reflection.md](./reflection.md)** — 300-500 word reflection on learnings

## 🎨 Design Highlights

- **Glassmorphism** — Frosted-glass panels with backdrop blur
- **Dynamic Accent Colors** — Each persona has a unique color scheme
- **Micro-Animations** — Floating avatars, message slide-ins, typing bounce
- **Mobile-First** — Fully responsive with touch-optimized persona switcher

## 📄 License

This project is for educational purposes as part of Scaler Academy's Prompt Engineering assignment.
