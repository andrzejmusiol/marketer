import { FC, memo } from "react"

import { Geocoding } from "@/shared/types/types";
import { useForecast } from "@/features/forecast/hooks/use-forecast";

type Props = {
    city: Geocoding | null
}

export const LocationWithTemperature: FC<Props> = memo(({ city }) => {
    const { forecastData, forecastLoading, forecastError } = useForecast(city?.lat || 0, city?.lon || 0);

    if (!city) { return <div>No city selected</div> }
    if (!forecastData) { return <div>No data</div> }
    if (forecastLoading) { return <div>Loading...</div> }
    if (forecastError) { return <div>Error: {forecastError.message}</div> }

    return (
        <div>
            <img src={`https://openweathermap.org/img/wn/${forecastData.weather[0].icon}.png`} alt={forecastData.weather[0].description} />
            <p>{forecastData.name}</p>
            <p>{city.state}, {city.country}</p>
            <h2>{forecastData.main.temp}°C | {forecastData.main.feels_like}°C</h2>
        </div>
    )
})