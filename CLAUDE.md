# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
This is Nico McGill's personal portfolio website built with React and TypeScript. The site showcases skills, projects, and contact information with interactive 3D elements and particle effects.

## Development Commands
- **Start development server**: `npm start` or `yarn start`
- **Build for production**: `npm run build` or `yarn build`
- **Run tests**: `npm test` or `yarn test`
- **Build Docker container**: `docker build -t portfolio .`
- **Run Docker container**: `docker run -p 3000:3000 portfolio`

## Architecture
The application follows a component-based React architecture:

- **App.tsx**: Root component that renders Header, Main, and Footer
- **Main.tsx**: Container for all main sections (Hero, About, Project, Contact) with particle background
- **Components structure**: Each component has its own folder with `.tsx` file and `styles.ts` file using styled-components
- **Global styles**: Centralized theming with CSS custom properties for colors and light/dark mode support

## Key Technologies
- React 18 with TypeScript
- Styled Components for CSS-in-JS styling
- React Three Fiber & Drei for 3D graphics (ThreeScene component)
- React TSParticles for background particle effects
- React Animate on Scroll for animations
- Formspree for contact form handling
- React Router for navigation

## Styling System
- Uses CSS custom properties for theming (`--pink`, `--black`, `--green`, etc.)
- Light/dark mode support via `.light` class toggle on root element
- Responsive design with mobile-first approach
- Styled Components co-located with each component

## Asset Management
- Static assets stored in `src/assets/` including icons, images, resume PDF, and 3D models
- Public assets in `public/Images/` for favicon and profile images

## Form Handling
Contact form uses Formspree integration with validation and toast notifications via react-toastify.

## 3D Graphics
Hero section includes ThreeScene component using React Three Fiber for interactive 3D text rendering with GLTF model support.