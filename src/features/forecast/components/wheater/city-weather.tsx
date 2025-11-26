import { FC, memo } from "react"
import { Geocoding } from "@/shared/types/types";
import { useForecast } from "@/features/forecast/hooks/use-forecast";
import { Loading } from "@/shared/components/states/loading";
import { Error } from "@/shared/components/states/error";
import { NoData } from "@/shared/components/states/no-data";

type Props = {
    city: Geocoding | null
}

export const CityWeather: FC<Props> = memo(({ city }) => {
    const { forecastData, forecastLoading, forecastError } = useForecast(city?.lat || 0, city?.lon || 0);

    if (!city) { return <div>No city selected</div> }
    if (!forecastData) { return <NoData /> }
    if (forecastLoading) { return <Loading /> }
    if (forecastError) { return <Error message={forecastError.message} /> }

    const iconUrl = `https://openweathermap.org/img/wn/${forecastData.weather[0].icon}@2x.png`

    return (
        <div className="flex flex-col items-center justify-center h-full w-full">
            <img src={iconUrl} alt={forecastData.weather[0].description} />
            <p>{forecastData.name}</p>
            <p>{city.state}, {city.country}</p>
            <h2 className="text-6xl font-bold">{forecastData.main.temp}°C</h2>
            <h3 className="text-2xl font-bold">{forecastData.main.feels_like}°C</h3>
        </div>
    )
})