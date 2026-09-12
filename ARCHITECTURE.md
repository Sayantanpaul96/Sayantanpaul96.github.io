# Portfolio Website Architecture

This document describes the architecture of the Sayantan Paul portfolio website, built with React, TypeScript, Vite, and deployed to GitHub Pages.

## Architecture Diagram

You can view and edit this diagram directly in Excalidraw:
[View/Edit Diagram](https://excalidraw.com/#json=bZfkF46hJaudkyFFqmq6I,LFHXkd9_xAl_mjEhF37x9w)

### Diagram Data (Copy to Excalidraw)
```json
[{"type":"cameraUpdate","width":1600,"height":1200,"x":0,"y":0},{"type":"rectangle","id":"ui_layer","x":200,"y":100,"width":1200,"height":250,"backgroundColor":"#a5d8ff","fillStyle":"solid","strokeColor":"#4a9eed","strokeWidth":2,"label":{"text":"User Interface Layer\n(What users see and interact with)\n- React Components (Hero, About, Projects, Contact, etc.)\n- Tailwind CSS Styling\n- MUI Components\n- Framer Motion Animations\n- Lenis Smooth Scrolling","fontSize":16}},{"type":"rectangle","id":"logic_layer","x":200,"y":400,"width":1200,"height":200,"backgroundColor":"#b2f2bb","fillStyle":"solid","strokeColor":"#22c55e","strokeWidth":2,"label":{"text":"Application Logic Layer\n(State management and business logic)\n- React Context API (ThemeContext, TransitionContext)\n- Custom Hooks (useReveal, useScrollTransition)\n- Constants & Data (src/constants/)\n- Utility Functions (src/utils/)","fontSize":16}},{"type":"rectangle","id":"build_layer","x":200,"y":650,"width":500,"height":150,"backgroundColor":"#fff3bf","fillStyle":"solid","strokeColor":"#f59e0b","strokeWidth":2,"label":{"text":"Build & Development Tools Layer\n- Vite (Dev server & bundler)\n- TypeScript (Type checking)\n- ESLint (Code linting)\n- Yarn (Package management)","fontSize":16}},{"type":"rectangle","id":"deploy_layer","x":750,"y":650,"width":500,"height":150,"backgroundColor":"#d0bfff","fillStyle":"solid","strokeColor":"#8b5cf6","strokeWidth":2,"label":{"text":"Deployment Layer\n- GitHub Actions CI/CD\n- gh-pages branch\n- GitHub Pages Hosting\n- yarn deploy → build + publish","fontSize":16}},{"type":"rectangle","id":"assets_layer","x":200,"y":850,"width":1200,"height":150,"backgroundColor":"#ffd8a8","fillStyle":"solid","strokeColor":"#f59e0b","strokeWidth":2,"label":{"text":"Assets Layer\n- Public Assets (favicon.svg, images/)\n- Imported Assets (SVGs, etc. in src/assets/)\n- Used by UI and Build Process","fontSize":16}},{"type":"arrow","id":"arrow1","x":800,"y":350,"width":0,"height":50,"points":[[0,0],[0,50]],"strokeColor":"#1e1e1e","strokeWidth":2,"endArrowhead":"arrow","startBinding":{"elementId":"ui_layer","fixedPoint":[0.5,1]},"endBinding":{"elementId":"logic_layer","fixedPoint":[0.5,0]}},{"type":"arrow","id":"arrow2","x":800,"y":600,"width":0,"height":50,"points":[[0,0],[0,50]],"strokeColor":"#1e1e1e","strokeWidth":2,"endArrowhead":"arrow","startBinding":{"elementId":"logic_layer","fixedPoint":[0.5,1]},"endBinding":{"elementId":"build_layer","fixedPoint":[0.5,0]}},{"type":"arrow","id":"arrow3","x":450,"y":800,"width":100,"height":0,"points":[[0,0],[100,0]],"strokeColor":"#1e1e1e","strokeWidth":2,"endArrowhead":"arrow","startBinding":{"elementId":"assets_layer","fixedPoint":[0,0.5]},"endBinding":{"elementId":"build_layer","fixedPoint":[1,0.5]}},{"type":"arrow","id":"arrow4","x":450,"y":800,"width":100,"height":0,"points":[[0,0],[100,0]],"strokeColor":"#1e1e1e","strokeWidth":2,"endArrowhead":"arrow","startBinding":{"elementId":"assets_layer","fixedPoint":[0,0.5]},"endBinding":{"elementId":"ui_layer","fixedPoint":[1,0.5]}},{"type":"arrow","id":"arrow5","x":1000,"y":800,"width":100,"height":0,"points":[[0,0],[100,0]],"strokeColor":"#1e1e1e","strokeWidth":2,"endArrowhead":"arrow","startBinding":{"elementId":"build_layer","fixedPoint":[1,0.5]},"endBinding":{"elementId":"deploy_layer","fixedPoint":[0,0.5]}},{"type":"arrow","id":"arrow6","x":1250,"y":725,"width":0,"height":75,"points":[[0,0],[0,75]],"strokeColor":"#1e1e1e","strokeWidth":2,"endArrowhead":"arrow","startBinding":{"elementId":"deploy_layer","fixedPoint":[1,0.5]},"endBinding":{"elementId":"deploy_layer","fixedPoint":[1,0.5]}}]
```

## Architecture Overview

### 1. User Interface Layer (Blue)
- What users see and interact with in the browser
- Built with React 19 components
- Styled with Tailwind CSS v4
- Enhanced with MUI components, Framer Motion animations, and Lenis smooth scrolling

### 2. Application Logic Layer (Green)
- State management and business logic
- React Context API for theme and transition states
- Custom hooks for scroll-based animations and navigation
- Centralized constants and data in `src/constants/`
- Utility functions in `src/utils/`

### 3. Build & Development Tools Layer (Yellow)
- Vite 8: Development server and production bundler
- TypeScript 5.9: Static type checking (strict mode)
- ESLint: Code linting following project conventions
- Yarn 4: Package management (Berry/Plug'n'Play)

### 4. Deployment Layer (Purple)
- GitHub Actions: Automated CI/CD workflow
- `gh-pages` branch: Contains the built distribution
- GitHub Pages: Hosting service for the live site
- Deployment command: `yarn deploy` (builds + publishes to gh-pages branch)

### 5. Assets Layer (Orange)
- Static assets served from `public/` directory
- Imported assets bundled from `src/assets/`
- Used by both the UI layer and build process

## Data Flows

1. **User ↔ UI Layer**: Interactions trigger events in React components
2. **UI Layer → Application Logic**: User actions update state via context/hooks
3. **Application Logic → Build Layer**: Source code is processed during `yarn build`
4. **Assets Layer → Build Layer**: Assets are copied/optimized during build
5. **Build Layer → Deployment Layer**: Built `dist/` folder deployed to GitHub Pages
6. **Deployment Layer → Users**: Live site served via GitHub Pages

---
*Diagram generated with Excalidraw • Architecture documented for maintenance and onboarding*