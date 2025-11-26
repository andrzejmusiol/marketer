import { FC } from "react"
import { useForecast } from "@/features/forecast/hooks/use-forecast";
import { useGeolocation } from "@/features/forecast/hooks/use-geolocation";
import { Loading } from "@/shared/components/states/loading";
import { Error } from "@/shared/components/states/error";
import { NoData } from "@/shared/components/states/no-data";
import { Weather } from "./weather";

export const GeolocationWeather: FC = () => {
    const { lat, lon } = useGeolocation()
    const { forecastData, forecastLoading, forecastError } = useForecast(lat || 0, lon || 0);

    if (!lat || !lon) { return <div>No location found - please turn on your location or select the city</div> }
    if (!forecastData?.name) { return <div>No city selected</div> }
    if (!forecastData) { return <NoData /> }
    if (forecastLoading) { return <Loading /> }
    if (forecastError) { return <Error message={forecastError.message} /> }

    return <Weather forecastData={forecastData} />
}