AOI Creation Map Application

A single-page interactive web mapping application built for the Frontend Engineer Internship Assignment — Flowbit Private Limited.

This project converts the provided Figma UI into a functional React + Leaflet-based mapping tool with WMS layers, drawing tools, geocoding, marker clustering, and persistence.

Tech Stack
Feature	Technology
Framework	React + TypeScript
Build Tool	Vite
Styling	Tailwind CSS
Map Library	Leaflet + react-leaflet
Testing	Playwright
State Management	Local + React Hooks
API Source	WMS NRW DOF Layer
Features

Render and toggle the official WMS satellite imagery
 Geocoding search (Nominatim)
Drawing support (points, polygons)
 Persistent features saved to localStorage
 Marker Clustering for improved performance
 Responsive UI matching Figma

 Install & Run
git clone https://github.com/Muskansharma-1102/my-map-app.git
cd my-map-app

npm install
npm run dev


No environment variables required.
 Map Library Choice

I selected Leaflet + react-leaflet because:

Criteria	Reason
Lightweight	Best for 2D GIS layers and WMS
Easy Plugin Support	Works well with draw tools, geocoder, clustering
Open Data & Plugin Ecosystem	Ideal for AOI workflows
Future scalability	Supports vector tiles and custom CRS
Alternatives Considered
Library	Why Not Selected
MapLibre	Best for vector tile workflows, but unnecessary for WMS-only requirement
OpenLayers	Very powerful but heavier, steeper learning curve
Mapbox / react-map-gl	Requires API keys & proprietary dependencies
🧩 Architecture & Project Structure
📦 src
 ┣ 📂 components
 ┃ ┣ Map.tsx         <-- Mapping logic (WMS, Draw tools, Geocoder)
 ┃ ┗ Sidebar.tsx     <-- UI to toggle layers & manage AOIs
 ┣ 📂 hooks
 ┃ ┗ useLocalStorage.ts
 ┣ 📂 utils
 ┃ ┣ mapConfig.ts
 ┃ ┗ storage.ts
 ┣ 📂 tests
 ┃ ┗ map.spec.ts     <-- Playwright tests
 ┗ types.ts


Why this structure?

Separation of logic (map plugins, UI, utilities)

Easy scalability for additional map layers or shapes

⚡ Performance Considerations
Problem	Solution Implemented
Rendering thousands of points	Marker clustering
Re-rendering on state update	Memoized rendering + controlled event listeners
Heavy WMS layer	Cached tile layer internally (Leaflet default cache)
Future polygon complexity	GeoJSON-based storage + possible simplification

Future enhancement options:

Virtualized layers

Web workers for GeoJSON parsing

Tile-based vector rendering

 Testing Strategy
What was tested:
Test Type	Example
Rendering Test	Map loads and WMS layer visible
Interaction Test	User can draw AOI and polygon stored
Persistence	Reload restores stored AOIs

Playwright example:

npx playwright test

What I would test with more time

Accessibility testing (keyboard for drawing tools)

Unit tests for geometry filters

Snapshot testing for UI components

Tradeoffs Made
Tradeoff	Reason
Used client-side storage instead of DB	Assignment requires no backend
Clustered markers only for points	Polygons clustering would require turf.js
Kept UI simple vs fully dynamic layer catalog	Focused on assignment core goals
Production Readiness Plan
Upgrade	Benefit
CI/CD with Vercel + GitHub actions	Automated deploy & testing
ESlint + Prettier strict mode	Code consistency across team
Offline caching for map tiles	Faster load & resilience
Role-based sessions	Save AOIs per user
Time Breakdown
Task	Time
Map research and library evaluation	1 hr
Project setup (React + Vite + Tailwind)	30 min
WMS integration + zoom behaviors	1 hr
Drawing tools and persistence	2 hrs
Geocoding and clustering	1 hr
UI styling to match Figma	2 hrs
Testing	1 hr
Attached with submission

📁 ER / Feature Schema (Client-side)
Feature {
 id: string
 type: "point" | "polygon"
 coordinates: GeoJSON
 timestamp: number
}
