import { FC } from "react"
import { useForecast } from "@/features/forecast/hooks/use-forecast";
import { useGeolocation } from "@/features/forecast/hooks/use-geolocation";

export const GeolocationWeather: FC = () => {
    const { lat, lon } = useGeolocation()
    const { forecastData, forecastLoading, forecastError } = useForecast(lat || 0, lon || 0);

    if (!lat || !lon) { return <div>No location found - please turn on your location or select the city</div> }
    if (!forecastData?.name) { return <div>No city selected</div> }
    if (!forecastData) { return <div>No data</div> }
    if (forecastLoading) { return <div>Loading...</div> }
    if (forecastError) { return <div>Error: {forecastError.message}</div> }

    return (
        <div>
            <h1>Your location</h1>
            <img src={`https://openweathermap.org/img/wn/${forecastData.weather[0].icon}.png`} alt={forecastData.weather[0].description} />
            <p>{forecastData.name}</p>
            <h2>{forecastData.main.temp}°C | {forecastData.main.feels_like}°C</h2>
        </div>
    )
}