# Satellite Imagery Map App

## Setup
1. Clone: `git clone <your-repo-url>`
2. Install: `npm install`
3. Run: `npm run dev`
4. Test: `npm run test`

## Map Library Choice
Chose react-leaflet for its React integration, WMS support, and lightweight nature. Alternatives like OpenLayers are more powerful but heavier for this task.

## Architecture Decisions
Modular components (Header, Sidebar, Map) with custom hooks for state. Separated concerns: UI in components, logic in hooks/utils.

## Performance Considerations
Used marker clustering for 1000s of points. Debounced map events. For polygons, virtualize rendering with Leaflet's layer groups.

## Testing Strategy
Playwright for E2E: Map loading, layer toggling, drawing. Focused on critical paths. With more time, add unit tests for hooks.

## Tradeoffs
Prioritized simplicity; skipped advanced animations for faster dev. Used localStorage over a DB for persistence.

## Production Readiness
Add error boundaries, CI/CD with GitHub Actions, monitoring with Sentry, and HTTPS.

## Time Spent
- Setup: 4 hours
- Map Integration: 8 hours
- UI/Bonuses: 10 hours
- Tests/Docs: 6 hours
- Total: 28 hours

## Demo Video
[Link to video]

## ER Diagram/Schema
Simple: Features stored as JSON in localStorage (id, type, coordinates).