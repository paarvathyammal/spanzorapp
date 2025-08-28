# Spanzor — Full Stack (Frontend + Backend)

- **Frontend**: React (CRA) with hero, navbar, influencer categories, packages, and contact form (Formspree + reCAPTCHA v3 + Google Maps Autocomplete + Google Sign-In prefill).
- **Backend**: Express server with endpoints to verify reCAPTCHA and Google ID tokens.

## Frontend (Vercel)
```
cd frontend
yarn install
yarn build
```
Vercel will detect `frontend/package.json` and deploy the static build. `vercel.json` at the repo root routes to `/frontend/build`.

## Backend (Render/Heroku)
```
cd backend
npm install
npm start
```
Heroku: uses `Procfile` at repo root (`web: node backend/server.js`).

## Env
- Frontend: `.env.local` (already filled).
- Backend: `backend/.env` (already filled).