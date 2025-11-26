import { FC, memo } from "react"
import { Geocoding } from "@/shared/types/types";
import { useForecast } from "@/features/forecast/hooks/use-forecast";
import { Loading } from "@/shared/components/states/loading";
import { Error } from "@/shared/components/states/error";
import { NoData } from "@/shared/components/states/no-data";
import { Weather } from "@/features/forecast/components/wheater/weather";

type Props = {
    city: Geocoding | null
}

export const CityWeather: FC<Props> = memo(({ city }) => {
    const { forecastData, forecastLoading, forecastError } = useForecast(city?.lat || 0, city?.lon || 0);

    if (!city) { return <div>No city selected</div> }
    if (!forecastData) { return <NoData /> }
    if (forecastLoading) { return <Loading /> }
    if (forecastError) { return <Error message={forecastError.message} /> }

    return <Weather forecastData={forecastData} city={city} />
})