# 🍏 BigBasket Redesign MVP — Team KREED

## Overview
This project is a fresh take on the BigBasket online grocery platform, built by first-year students at KIIT. Our goal: **make grocery shopping smoother, smarter, and more accessible for everyone**.  
We focused on real user pain points—especially accessibility, easier search, and cleaner navigation—based on our own research and the live BigBasket site!

---

## 🚀 What Makes Our MVP Different
- **Accessibility controls:** Font size toggle, high-contrast switch, and a new voice search—all visible right from the homepage!
- **No more confusing categories:** Categories are front and center—no dropdown needed.
- **Cleaner homepage:** Less banner clutter, more product focus.
- **Quick city info:** City coverage displayed cleanly, not as a “wall of text.”
- **Mobile-first & responsive:** Works and looks good everywhere.

---

## 🧑‍🏫 Why We Built These Features
During the hackathon, our team ran through the BigBasket user experience and noticed:
- No easy way for elderly/vision-impaired users to shop
- Too many hidden menus (like categories dropdown)
- Homepage difficult to scan—lots of banners
- City list hard to read  
So, we built features that would help real people (like our parents and friends!) have an easier time online shopping.

---

## 🛠️ How It Works

### Frontend (React 18 + TypeScript)
- Visually accessible controls (font size, contrast, mic icon)
- Product discovery and shopping cart flows
- Smart, modern layouts with Tailwind CSS
- Mobile-first (feels good to use on phone or laptop)

### Backend (Express.js + PostgreSQL on Neon)
- Fast, simple REST APIs for products, categories, and cities
- In-memory and seeded data — no setup hassle
- City-serving data cleaned up and grouped

### Features
- **Browse by category** (immediate, no dropdown)
- **Smart basket** (suggestions & quick add)
- **Persistent cart** (add/remove/see running total)
- **Accessibility bar:** Font size, contrast, voice input (demo functionality)
- **Simple city grid** (no long text list)
- **Responsive UI** — smooth on desktop and mobile

---

## 💡 Architecture at a Glance

- **React (Frontend):** Quick, reactive UI, hooks for cart and accessibility state
- **Zustand:** Manages cart & accessibility settings, always persists!
- **Radix UI + shadcn/ui:** Clean, accessible interface basics
- **Express (Backend):** Simple REST API, TypeScript everywhere
- **Neon DB + Drizzle ORM:** Lightweight, secure data for categories/products/cities

---

---

## 🌟 Tech in Use
- React 18, Vite, TypeScript, Tailwind, Zustand, shadcn/ui  
- Express.js, NeonDB, Drizzle ORM  
- Replit for fast, collaborative dev

---

## 📢 Our Hackathon Experience
We learned a LOT about planning, splitting up work, using AI tools (Replit AI, ChatGPT, Figma), and how details like accessibility really matter.  
We’re proud that our MVP is original, user-centric, and demo-ready for everyone!

---

## 🤝 Thanks!
- Mentors & organizers for support
- The BigBasket platform for inspiration

---  
_Ready for demo and feedback!_

---
