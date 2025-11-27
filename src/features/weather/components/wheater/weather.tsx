import { Weather as WeatherType, Geocoding } from "@/shared/types/types"
import { FC } from "react"
import { imageUrlFactory } from "@/features/weather/utils/utils"

type Props = {
    weather: WeatherType
    geocoding?: Geocoding
}

export const Weather: FC<Props> = ({ weather, geocoding }) => {
    const iconUrl = imageUrlFactory(weather.weather[0].icon)

    return (
        <div className="flex flex-col items-center justify-center h-full w-full">
            <img src={iconUrl} alt={weather.weather[0].description} />
            <p>{weather.name}</p>
            {geocoding && <p>{geocoding.state} {geocoding.country}</p>}
            <h2 className="text-6xl font-bold">{weather.main.temp.toFixed(1)}°C</h2>
            <h3 className="text-2xl font-bold">Feels like: {weather.main.feels_like.toFixed(1)}°C</h3>
        </div>
    )
}