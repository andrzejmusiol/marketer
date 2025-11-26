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

    const iconUrl = `https://openweathermap.org/img/wn/${forecastData.weather[0].icon}@4x.png`

    return (
        <div className={"bg-cover bg-no-repeat bg-center p-4"} style={{ backgroundImage: `url(${iconUrl})` }}>
            <div className="flex flex-col items-center justify-center h-full w-full">
                <p>{forecastData.name}</p>
                <p>{city.state}, {city.country}</p>
                <h2>{forecastData.main.temp}°C | {forecastData.main.feels_like}°C</h2>
            </div>
        </div>
    )
})