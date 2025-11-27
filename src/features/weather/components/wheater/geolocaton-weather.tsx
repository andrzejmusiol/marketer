import { FC } from "react"
import { useWeather } from "@/features/weather/hooks/use-weather";
import { useGeolocation } from "@/features/weather/hooks/use-geolocation";
import { Loading } from "@/shared/components/states/loading";
import { Error } from "@/shared/components/states/error";
import { NoData } from "@/shared/components/states/no-data";
import { Weather } from "./weather";

export const GeolocationWeather: FC = () => {
    const { lat, lon } = useGeolocation()
    const { weather, isWeatherLoading, weatherError } = useWeather(lat || 0, lon || 0);

    if (!lat || !lon) { return <div>No location found - please turn on your location or select the city</div> }
    if (!weather?.name) { return <div>No city selected</div> }
    if (!weather) { return <NoData /> }
    if (isWeatherLoading) { return <Loading /> }
    if (weatherError) { return <Error message={weatherError.message} /> }

    return <Weather weather={weather} />
}