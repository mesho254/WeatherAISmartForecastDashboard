# WeatherAI Smart Forecast Dashboard

A full-stack React + Node.js implementation that integrates the WeatherAI API. The app consumes WeatherAI forecast data through a secure Express backend proxy, displays current conditions, AI weather summaries, daily forecasts, and API usage/quota details.

## Tech Stack

### Frontend
- React
- Vite
- Plain CSS
- Lucide React icons

### Backend
- Node.js
- Express.js
- Zod validation
- Helmet security headers
- CORS
- Express rate limiting
- In-memory cache with `node-cache`

### External API
- WeatherAI REST API
- Base URL: `https://api.weather-ai.co`

## Features

- Secure backend proxy so the WeatherAI API key is never exposed in the browser.
- Current weather by latitude and longitude.
- Multi-day forecast support.
- AI summaries with language selection.
- Metric and imperial units.
- Browser geolocation support.
- WeatherAI usage/quota display.
- Request validation and graceful error handling.
- Backend caching to reduce unnecessary API calls.
- Production-ready deployment structure for Render/Railway + Netlify/Vercel.

## Project Structure

```txt
weather-ai-starter/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ForecastTable.jsx
│   │   │   ├── RawResponse.jsx
│   │   │   ├── SearchPanel.jsx
│   │   │   ├── UsageCard.jsx
│   │   │   └── WeatherCards.jsx
│   │   ├── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── styles.css
│   │   └── utils.js
│   │
│   ├── .env.example
│   ├── index.html
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── config.js
│   │   ├── index.js
│   │   ├── routes.js
│   │   ├── validators.js
│   │   └── weatherAiClient.js
│   ├── .env.example
│   └── package.json
│
├── SRD.md
├── README.md
├── .gitignore
└── package.json
```

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/mesho254/WeatherAISmartForecastDashboard.git
cd weather-ai-starter
```

### 2. Install root dependencies

```bash
npm install
```

### 3. Install client and server dependencies

```bash
npm run install:all
```

### 4. Configure backend environment variables

Create `server/.env` from the sample file:

```bash
cp server/.env.example server/.env
```

Update the API key:

```env
PORT=5000
NODE_ENV=development
CLIENT_ORIGIN=http://localhost:5173
WEATHER_AI_BASE_URL=https://api.weather-ai.co
WEATHER_AI_API_KEY=wai_your_real_key_here
CACHE_TTL_SECONDS=300
```

### 5. Configure frontend environment variables

Create `client/.env` from the sample file:

```bash
cp client/.env.example client/.env
```

Keep this for local development:

```env
VITE_API_URL=http://localhost:5000
```

### 6. Run the app locally

From the root folder:

```bash
npm run dev
```

Frontend:

```txt
http://localhost:5173
```

Backend:

```txt
http://localhost:5000
```

## API Routes Exposed by Backend

The frontend does not call WeatherAI directly. It calls the local backend routes below:

| Method | Route | Description |
|---|---|---|
| GET | `/api/health` | Backend health check |
| GET | `/api/weather` | Current conditions + forecast |
| GET | `/api/current` | Current weather only |
| GET | `/api/daily` | Daily forecast breakdown |
| GET | `/api/hourly` | Hourly forecast breakdown |
| GET | `/api/geo-weather` | Weather using IP geo-detection |
| GET | `/api/usage` | WeatherAI quota and usage |

Example local request:

```bash
curl "http://localhost:5000/api/weather?lat=-1.2921&lon=36.8219&days=7&ai=true&units=metric&lang=en"
```

## Deployment

### Backend on Vercel

1. Push the project to GitHub.
2. Go to Vercel and create a new Web Service.
3. Select the repository.
4. Set root directory:

```txt
server
```

5. Set build command:

```bash
npm install
```

6. Set start command:

```bash
npm start
```

7. Add environment variables:

```env
NODE_ENV=production
PORT=10000
CLIENT_ORIGIN=https://your-frontend-domain.vercel.app
WEATHER_AI_BASE_URL=https://api.weather-ai.co
WEATHER_AI_API_KEY=wai_your_real_key_here
CACHE_TTL_SECONDS=300
```

8. Deploy and copy the backend URL.

### Frontend on Vercel

1. Create a new Vercel site from GitHub.
2. Set base directory:

```txt
client
```

3. Set build command:

```bash
npm run build
```

4. Set publish directory:

```txt
client/dist
```

5. Add environment variable:

```env
VITE_API_URL=https://your-vercel-backend-url.vercel.com
```

6. Deploy.

## Important Security Notes

- Never commit `server/.env`.
- Never place the WeatherAI API key inside React.
- Keep WeatherAI requests on the server side.
- Use CORS to restrict allowed frontend origins.
- Use rate limiting to reduce abuse.
- Use caching to reduce quota usage.

## Suggested GitHub Repository Description

```txt
A full-stack WeatherAI dashboard built with React, Vite, Node.js, and Express. It securely integrates WeatherAI APIs through a backend proxy and displays current weather, AI summaries, forecasts, and API quota usage.
```

## Submission Email Template

Subject: WeatherAI API Assignment Submission

Hello,

Thank you for the opportunity to complete this assignment.

I built a full-stack WeatherAI Smart Forecast Dashboard using React, Vite, Node.js, and Express. The application integrates the WeatherAI API through a secure backend proxy so the API key is not exposed on the frontend.

GitHub Repository: https://github.com/mesho254/WeatherAISmartForecastDashboard.git
Live Deployment: https://weather-ai-smart-forecast-dashboard-kappa.vercel.app/

The README includes setup instructions, environment variable configuration, local development steps, deployment notes, and architectural details.

Best regards,
Meshak Okelo
```
