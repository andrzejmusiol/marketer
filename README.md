# Marketer App

Front-end task for Marketer.com

## Tech stack

- React
- TypeScript
- Tanstack-query
- Axios
- Shadcn (design system/components library)
- Zustand
- Vitest

## Architecture

- [Bulletproof-react](https://github.com/alan2207/bulletproof-react)

## Commiting mathodology
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#specification)
- Disable squashing for commits history preview

## APIs
- Open Weather Map 2.5
    - [Current weather data API](https://openweathermap.org/current)
    - [Geocoding API](https://openweathermap.org/api/geocoding-api)
    - [Forecast API](https://openweathermap.org/forecast5)

## Trade-offs
- No routing - keeping it simple provides value here:
    - No routing library is installed — the app is a single-page app.
    - The initial search -> detailed weather is a state-based view — it appears when no weather data exists.
    - No URL/bookmarking needs — users don’t need to share or bookmark the welcome state.
    - Simplicity — avoids adding a dependency and complexity.

## Performance
- No CPU and Network throttling - LCP 0.34s, CLS 0.01
- CPU 4x slowdown / Network Fast 4G - LCP 2.44s, CLS 0.01
- CPU 4x slowdown / Network Slow 4G - LCP 6.81s, CLS 0.01

## CI (to main)
- Install -> linting -> type check -> tests -> build

## Host
- AWS - [Live preview](https://dotw0a86zbfzf.cloudfront.net/)
    - S3 Bucket for static build
    - CloudFront for HTTPS domain

## Issues
- When using user's browser geolocation on MacOS, sometimes it's getting temporary 
CoreLocationProvider: CoreLocation framework reported a kCLErrorLocationUnknown failure - this is a MacOS system caused location error, so probably would be good to improve it to grab user's location using IP fallback