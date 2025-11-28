import { Weather as WeatherType, Geocoding } from "@/shared/types/types"
import { FC } from "react"
import { CircleGauge, MapPin, Sunrise, Sunset, Thermometer } from "lucide-react"
import { formatTime } from "@/features/weather/utils/time"

type Props = {
    weather: WeatherType
    geocoding: Geocoding | null
}

export const WeatherDetails: FC<Props> = ({ weather, geocoding }) =>
    <div className="h-full w-full text-white space-y-4 md:space-y-6">
        <div className="flex gap-3">
            <MapPin className="w-6 h-6 text-white" />
            <div className="flex item-center gap-2">
                <p>{weather.name}</p> {geocoding && <p className="hidden md:block">{geocoding.state} {geocoding.country}</p>}
                <Sunrise className="w-6 h-6" />{formatTime(weather.sys.sunrise, weather.timezone)}
                <Sunset className="w-6 h-6" />{formatTime(weather.sys.sunset, weather.timezone)}
            </div>
        </div>

        <div className="flex items-center justify-start gap-4 flex-wrap">
            <h1 className="md:text-[8vw] text-8xl w-full md:w-auto">{weather.main.temp.toFixed(1)}°C</h1>
            <div className="flex flex-row md:flex-col">
                <p className="text-lg m-2 border border-white/10 bg-white/5 text-center rounded-full px-3 py-1">{`H: ${weather.main.temp_max.toFixed(1)}°C`}</p>
                <p className="text-lg m-2 border border-white/10 bg-white/5 text-center rounded-full px-3 py-1">{`L: ${weather.main.temp_min.toFixed(1)}°C`}</p>
            </div>
        </div>
        <div className="flex items-center justify-start gap-4 text-lg">
            <h2 className="flex items-center gap-2"><Thermometer className="w-6 h-6" />{weather.main.feels_like.toFixed(1)}°C</h2>
            <h2 className="flex items-center gap-2"><CircleGauge className="w-6 h-6" />{weather.main.pressure} hPa</h2>
        </div>

        <h3 className="capitalize opacity-50 text-[7vw]">{weather.weather[0].description}</h3>
    </div>
