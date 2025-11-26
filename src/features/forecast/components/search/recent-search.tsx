import { Geocoding } from "@/shared/types/types"
import { FC } from "react"
import { useForecast } from "@/features/forecast/hooks/use-forecast"
import { Button } from "@/shared/components/ui/button"
import { Loading } from "@/shared/components/states/loading"

type Props = {
    city: Geocoding
    handleSelect: (city: Geocoding) => void
}

export const RecentSearch: FC<Props> = ({ city, handleSelect }) => {
    const { forecastData, forecastLoading, forecastError } = useForecast(city?.lat || 0, city?.lon || 0);

    if (!forecastData) { return null }
    if (forecastLoading) { return <Loading /> }
    if (forecastError) { return <div>Error: {forecastError.message}</div> }

    return (
        <Button className="w-full flex items-center justify-between hover:cursor-pointer hover:opacity-80 p-10" variant="secondary" onClick={() => handleSelect(city)}>
            <div className="text-left">
                <div>
                    {city.name}
                </div>
                <div>
                    {forecastData?.main.temp}°C
                </div>
            </div>
            <div className="text-right">
                <img className="w-16" src={`https://openweathermap.org/img/wn/${forecastData.weather[0].icon}@2x.png`} alt={forecastData.weather[0].description} />
            </div>
        </Button>
    )
}