import { Geocoding } from "@/shared/types/types"
import { FC } from "react"
import { useWeather } from "@/features/weather/hooks/use-weather"
import { Button } from "@/shared/components/ui/button"
import { Loading } from "@/shared/components/states/loading"

type Props = {
    geocoding: Geocoding
    handleSelect: (city: Geocoding) => void
}

export const RecentSearch: FC<Props> = ({ geocoding, handleSelect }) => {
    const { weather, isWeatherLoading, weatherError } = useWeather(geocoding?.lat || 0, geocoding?.lon || 0);

    if (!weather) { return null }
    if (isWeatherLoading) { return <Loading /> }
    if (weatherError) { return <div>Error: {weatherError.message}</div> }

    return (
        <Button className="w-full flex items-center justify-between hover:cursor-pointer hover:opacity-80 p-10" variant="secondary" onClick={() => handleSelect(geocoding)}>
            <div className="text-left">
                <div>
                    {geocoding.name}
                </div>
                <div>
                    {weather?.main.temp.toFixed(1)}°C
                </div>
            </div>
            <div className="text-right">
                <img className="w-16" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
            </div>
        </Button>
    )
}