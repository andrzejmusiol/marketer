import { Geocoding } from "@/shared/types/types"
import { FC } from "react"
import { useWeather } from "@/features/weather/hooks/use-weather"
import { Loading } from "@/shared/components/states/loading"
import SpotlightCard from "@/shared/components/SpotlightCard"

type Props = {
    geocoding: Geocoding
    onGeocodingSelect: (city: Geocoding) => void
}

export const RecentSearch: FC<Props> = ({ geocoding, onGeocodingSelect }) => {
    const { weather, isWeatherLoading, weatherError } = useWeather(geocoding?.lat || 0, geocoding?.lon || 0);

    if (!weather) { return null }
    if (isWeatherLoading) { return <Loading /> }
    if (weatherError) { return <div>Error: {weatherError.message}</div> }

    return (
        <SpotlightCard className="bg-dark-primary" spotlightColor="rgba(219, 187, 162, 0.2)">
            <div className="cursor-pointer" onClick={() => onGeocodingSelect(geocoding)}>
                <div className="text-left text-white">
                    <div className="flex items-center justify-between gap-2">
                        <img className="w-16" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
                        <p className="text-2xl text-white">{weather?.main.temp.toFixed(1)}°C</p>
                    </div>
                    <div>{geocoding.name}</div>
                    <div className="capitalize opacity-30">{weather.weather[0].description}</div>
                </div>

            </div>

        </SpotlightCard>

    )
}