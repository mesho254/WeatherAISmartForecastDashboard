# Software Requirements Document: WeatherAI Smart Forecast Dashboard

## 1. Project Overview

The WeatherAI Smart Forecast Dashboard is a full-stack web application that integrates with the WeatherAI API to display real-time weather conditions, multi-day forecasts, AI-generated weather summaries, and API usage/quota data.

The goal is to demonstrate clean API consumption, secure backend architecture, clear frontend presentation, and practical handling of external API limits.

## 2. Objectives

- Integrate WeatherAI REST endpoints into a functional project.
- Keep the WeatherAI API key secure on the backend.
- Provide a clean user interface for weather search and forecast display.
- Support current conditions, daily forecast, AI summaries, and usage analytics.
- Show production awareness through validation, rate limiting, error handling, caching, and deployment documentation.

## 3. Scope

### In Scope

- React frontend dashboard.
- Node.js/Express backend proxy.
- Weather search by latitude and longitude.
- Preset location selection.
- Browser geolocation support.
- WeatherAI `/v1/weather` integration.
- WeatherAI `/v1/usage` integration.
- Backend request validation.
- Backend rate limiting.
- Backend in-memory caching.
- README and deployment documentation.

### Out of Scope

- User authentication.
- Persistent database storage.
- Paid WeatherAI Pro-only features such as webhooks and extended 14-day forecast routes.
- SMS/USSD functionality.
- Tree image analysis functionality.

## 4. Users

### Primary User

A reviewer or engineering team member evaluating the WeatherAI API integration.

### Secondary User

A general user who wants to view weather forecasts and AI-generated weather summaries.

## 5. Functional Requirements

### FR-001: Search Weather by Coordinates

The system shall allow a user to enter latitude and longitude and fetch weather data for that location.

### FR-002: Select Preset Locations

The system shall provide preset locations such as Nairobi, Bomet, Mombasa, London, and New York.

### FR-003: Browser Geolocation

The system shall allow the user to fetch weather data based on browser-detected coordinates.

### FR-004: Forecast Days

The system shall allow the user to select the number of forecast days.

### FR-005: Units

The system shall support metric and imperial units.

### FR-006: AI Summary Toggle

The system shall allow the user to enable or disable AI weather summaries.

### FR-007: Language Selection

The system shall allow the user to request AI summaries in English or Swahili.

### FR-008: Usage and Quota

The system shall display WeatherAI usage/quota information when available.

### FR-009: Raw API Response

The system shall provide a collapsible raw response view for transparency and debugging.

## 6. Non-Functional Requirements

### NFR-001: Security

The WeatherAI API key must only exist on the backend environment and must never be exposed to the frontend.

### NFR-002: Performance

The backend should cache repeat WeatherAI requests for a configurable TTL to reduce duplicate calls and protect API quota.

### NFR-003: Reliability

The backend should return clear error messages for validation errors, authentication errors, quota errors, and server failures.

### NFR-004: Maintainability

The codebase should be split into clear modules: config, validators, external API client, routes, frontend API layer, and frontend UI components.

### NFR-005: Deployment Readiness

The system should support frontend deployment on Netlify/Vercel and backend deployment on Render/Railway.

## 7. Architecture

```txt
User Browser
    |
    | React UI request
    v
Express Backend Proxy
    |
    | Authorization: Bearer wai_<api_key>
    v
WeatherAI API
```

### Why This Architecture

- Protects the API key.
- Allows backend validation before external API calls.
- Enables caching and rate limiting.
- Keeps the frontend simple and focused on presentation.
- Makes the integration easier to scale later.

## 8. External API Integration

### WeatherAI Endpoints Used

- `GET /v1/weather`
- `GET /v1/current`
- `GET /v1/daily`
- `GET /v1/hourly`
- `GET /v1/weather-geo`
- `GET /v1/usage`

### Authentication

Every WeatherAI request requires a bearer token:

```txt
Authorization: Bearer wai_<your_api_key>
```

## 9. Error Handling

The backend handles:

- `400` validation errors.
- `401` missing or invalid WeatherAI API key.
- `403` plan restrictions.
- `429` quota exceeded.
- `500` unexpected backend errors.
- WeatherAI upstream errors.

## 10. Scaling Considerations

- Cache identical weather requests for a short period.
- Keep API calls server-side.
- Add Redis later if multiple backend instances are used.
- Add database storage if forecast history is required.
- Add background jobs for webhook or scheduled forecast alerts.
- Add monitoring for quota usage and external API latency.

## 11. Testing Plan

### Manual Tests

1. Start backend and frontend locally.
2. Open the frontend.
3. Fetch default Nairobi weather.
4. Change latitude and longitude.
5. Toggle AI summary off.
6. Change units from metric to imperial.
7. Change language from English to Swahili.
8. Click browser geolocation.
9. Confirm raw API response is displayed.
10. Confirm backend blocks invalid latitude or longitude.

### Example Backend Test URL

```txt
http://localhost:5000/api/weather?lat=-1.2921&lon=36.8219&days=7&ai=true&units=metric&lang=en
```

## 12. Future Improvements

- Add city-name search using a geocoding provider.
- Add charts for hourly temperature changes.
- Add saved favorite locations.
- Add weather alert notifications.
- Add WeatherAI webhook support for Pro accounts.
- Add tree analysis workflow using WeatherAI forestry endpoints.
- Add authentication and user-specific dashboards.
