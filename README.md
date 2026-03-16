# nicomcgill.com

Personal portfolio site for Nico McGill — Software Engineer & Risk Analyst.

**Live:** [nicomcgill.com](http://nicomcgill.com)

## Stack

- **React 18** + TypeScript
- **Styled Components** — CSS-in-JS with a dark design system
- **Intersection Observer** — lightweight scroll reveal (no animation library)

## Features

- Split-letter hover animation on hero name
- Experience timeline with scroll-triggered reveals
- Project cards with green glow hover effect
- Dot-grid CSS background with ambient green radial glow
- Responsive, mobile-first layout

## Getting started

```bash
npm install
npm start        # dev server → localhost:3000
npm run build    # production build
```

## Structure

```
src/
├── components/
│   ├── Hero/          # Landing section with animated name
│   ├── Experience/    # Work history timeline
│   ├── Project/       # Project cards grid
│   ├── Contact/       # Contact section
│   ├── Header/        # Fixed nav
│   └── Footer/
├── hooks/
│   └── useReveal.ts   # Intersection Observer scroll hook
└── styles/
    └── global.ts      # Design tokens + global CSS
```
