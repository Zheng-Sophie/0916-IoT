# AIOT-DA Course: Do In Class 1 (DIC-1)
> **Personal Dashboard & Real-Time Clock Web Application**

**Date:** September 16, 2026  
**Repository:** [https://github.com/Zheng-Sophie/0916-IoT.git](https://github.com/Zheng-Sophie/0916-IoT.git)  
**🌐 Live Demo:** [https://zheng-sophie.github.io/0916-IoT/](https://zheng-sophie.github.io/0916-IoT/)  
**Author:** Zheng-Sophie  

---

## 📌 Project Overview
This repository contains the project codebase for **Do In Class 1 (DIC-1)** of the **AIOT-DA** course. The project delivers a personal landing dashboard featuring real-time data synchronization, dynamic greetings tailored to the user's environment, local state persistence, and glassmorphic UI aesthetics across Dark and Light themes.

---

## ✨ Features & Functionality

1. **Live Digital & Analog Clock Tickers**
   - High-precision digital time readout showing hours, minutes, and ticking seconds.
   - Smooth SVG/CSS analog clock with rotating hour, minute, and second hands.
   - Live date display with day of the week, full date, and detected time zone (`GMT+8`).
   - Interactive **12-Hour / 24-Hour** format toggle.

2. **Dynamic Time-of-Day Greetings**
   - Automatically adapts the greeting (*Good Morning*, *Good Afternoon*, *Good Evening*, *Good Night*) based on current local system time.

3. **Personal Profile & Customization**
   - Editable user name with an interactive modal dialog and `localStorage` memory.
   - Editable headline tagline, status badges (*"Available for projects"*), and avatar image switcher.

4. **World Clocks Panel**
   - Displays live local times and days for key global time zones:
     - 🇯🇵 Tokyo (Asia/Tokyo)
     - 🇬🇧 London (Europe/London)
     - 🇺🇸 New York (America/New_York)
     - 🇺🇸 San Francisco (America/Los_Angeles)
     - 🇦🇺 Sydney (Australia/Sydney)

5. **Glassmorphism Aesthetics & Theme Toggle**
   - Modern HSL color design system featuring frosted glass cards (`backdrop-filter: blur(24px)`).
   - Animated ambient background glow mesh (`@keyframes float`).
   - One-click **Dark / Light Theme** toggle with stored state preference.

---

## 📁 Repository Structure

```
c:\Users\user\Desktop\L2\
├── index.html                  # Main HTML5 layout & semantic elements
├── styles.css                  # Design system, glassmorphism UI & animations
├── app.js                      # Real-time clock ticker & profile controller logic
├── README.md                   # Project documentation & summary
└── .agents/
    └── skills/                 # Installed agent skills
        ├── grill-me/
        └── productivity/
```

---

## 🚀 How to Run Locally

### Option 1: Python Local HTTP Server
Run the following command in the project directory:
```bash
python -m http.server 8000
```
Then open your browser and navigate to:
```
http://localhost:8000/index.html
```

### Option 2: Direct File Open
Open `index.html` directly in any standard modern browser (Chrome, Edge, Firefox, Safari).

---

## 🛠️ Git Repository Status
- **Origin Remote:** `https://github.com/Zheng-Sophie/0916-IoT.git`
- **Main Branch:** `main`
- Initial commit created with project source code and configuration.
