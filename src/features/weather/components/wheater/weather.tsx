import { Weather as WeatherType, Geocoding } from "@/shared/types/types"
import { FC } from "react"
import { MapPin } from "lucide-react"

type Props = {
    weather: WeatherType
    geocoding?: Geocoding
}

export const Weather: FC<Props> = ({ weather, geocoding }) =>
    <div className="flex flex-col justify-center h-full w-full text-white space-y-6">
        <div className="flex items-center justify-startgap-2">
            <MapPin className="w-6 h-6 text-white font-light" />
            {weather.name} {geocoding && <p>{geocoding.state} {geocoding.country}</p>}
        </div>

        <div className="-space-y-6">
            <h2 className="text-[10vw]">{weather.main.temp.toFixed(1)}°C</h2>
            <h3 className="text-2xl">Feels like: {weather.main.feels_like.toFixed(1)}°C</h3>
        </div>

        <p className="capitalize opacity-50 text-[8vw]">{weather.weather[0].description}</p>

    </div>
