# Marketer App

Front-end task for Marketer.com

## Tech stack

- React
- TypeScript
- Tanstack-query
- Axios
- Shadcn (design system/components library)

## Architecture

- [Bulletproof-react](https://github.com/alan2207/bulletproof-react)

## Commiting mathodology
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#specification)

## APIs
- Open Weather Map 2.5
    - [Current weather data API](https://openweathermap.org/current)
    - [Geocoding API](https://openweathermap.org/api/geocoding-api)
    - [Forecast API](https://openweathermap.org/forecast5)

## UI
 - Aurora backround change depends on weather type

## Trade-offs
- No routing - keeping it simple provides value here:
    - No routing library is installed — the app is a single-page app.
    - The Welcome screen is a state-based view — it appears when no weather data exists.
    - No URL/bookmarking needs — users don’t need to share or bookmark the welcome state.
    - Simplicity — avoids adding a dependency and complexity.