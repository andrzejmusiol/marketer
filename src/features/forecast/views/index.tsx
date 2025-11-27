import { FC } from "react";
import { Error } from "@/shared/components/states/error";
import { Loading } from "@/shared/components/states/loading";
import { ForecastChart } from "@/features/forecast/components/forecast-chart";
import { useForecast } from "@/features/forecast/hooks/use-forecast";
import { Geocoding } from "@/shared/types/types";
import { useGeolocation } from "@/shared/api/use-geolocation";

type Props = {
    geocoding: Geocoding | null
}

export const ForecastView: FC<Props> = ({ geocoding }) => {
    const { lat, lon } = useGeolocation()
    const { forecast, isForecastLoading, forecastError } = useForecast(geocoding?.lat ? geocoding.lat : lat || 0, geocoding?.lon ? geocoding.lon : lon || 0);

    if (isForecastLoading) return <Loading />
    if (forecastError) return <Error message={forecastError.message} />
    if (!forecast) return null

    return <ForecastChart forecast={forecast} />
}
