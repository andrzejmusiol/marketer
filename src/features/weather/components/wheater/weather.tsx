import { Weather as WeatherType, Geocoding } from "@/shared/types/types"
import { FC } from "react"
import { MapPin } from "lucide-react"
import { WeatherDetail } from "./weather-detail"

type Props = {
    weather: WeatherType
    geocoding: Geocoding | null
}

export const Weather: FC<Props> = ({ weather, geocoding }) =>
    <div className="flex flex-col justify-center h-full w-full text-white">
        <div className="flex items-center justify-start gap-3">
            <MapPin className="w-6 h-6 text-white font-light" />
            <div className="flex gap-2">
                <p>{weather.name}</p> {geocoding && <p>{geocoding.state} {geocoding.country}</p>}
            </div>

        </div>

        <div className="flex items-center justify-start gap-4">
            <h2 className="text-[10vw]">{weather.main.temp.toFixed(1)}°C</h2>

            <div>
                <WeatherDetail detail={`H: ${weather.main.temp_max.toFixed(1)}°C`} />
                <WeatherDetail detail={`L: ${weather.main.temp_min.toFixed(1)}°C`} />
            </div>
        </div>
        <h3 className="text-2xl">Feels like: {weather.main.feels_like.toFixed(1)}°C</h3>

        <p className="capitalize opacity-50 text-[7vw]">{weather.weather[0].description}</p>
    </div>
