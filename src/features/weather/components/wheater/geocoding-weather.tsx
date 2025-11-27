import { FC, memo } from "react"
import { Geocoding } from "@/shared/types/types";
import { useWeather } from "@/features/weather/hooks/use-weather";
import { Loading } from "@/shared/components/states/loading";
import { Error } from "@/shared/components/states/error";
import { NoData } from "@/shared/components/states/no-data";
import { Weather } from "@/features/weather/components/wheater/weather";

type Props = {
    geocoding: Geocoding | null
}

export const GeocodingWeather: FC<Props> = memo(({ geocoding }) => {
    const { weather, isWeatherLoading, weatherError } = useWeather(geocoding?.lat || 0, geocoding?.lon || 0);

    if (!geocoding) { return <div>No city selected</div> }
    if (!weather) { return <NoData /> }
    if (isWeatherLoading) { return <Loading /> }
    if (weatherError) { return <Error message={weatherError.message} /> }

    return <Weather weather={weather} geocoding={geocoding} />
})