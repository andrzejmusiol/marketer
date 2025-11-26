import { Forecast, Geocoding } from "@/shared/types/types"
import { FC } from "react"

type Props = {
    forecastData: Forecast
    city?: Geocoding
}

export const Weather: FC<Props> = ({ forecastData, city }) => {
    const iconUrl = `https://openweathermap.org/img/wn/${forecastData.weather[0].icon}@2x.png`

    return (
        <div className="flex flex-col items-center justify-center h-full w-full">
            <img src={iconUrl} alt={forecastData.weather[0].description} />
            <p>{forecastData.name}</p>
            {city && <p>{city.state}, {city.country}</p>}
            <h2 className="text-6xl font-bold">{forecastData.main.temp.toFixed(0)}°C</h2>
            <h3 className="text-2xl font-bold">Feels like: {forecastData.main.feels_like.toFixed(0)}°C</h3>
        </div>
    )
}