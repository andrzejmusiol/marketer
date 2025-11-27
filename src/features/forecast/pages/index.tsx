import { Error } from "@/shared/components/states/error";
import { Loading } from "@/shared/components/states/loading";
import { ForecastChart } from "@/features/forecast/components/forecast-chart";
import { useForecast } from "@/features/forecast/hooks/use-forecast";
import { Geocoding } from "@/shared/types/types";
import { FC } from "react";

type Props = {
    geocoding: Geocoding | null
}

export const ForecastPage: FC<Props> = ({ geocoding }) => {
    const { forecast, isForecastLoading, forecastError } = useForecast(geocoding?.lat || 0, geocoding?.lon || 0);

    if (isForecastLoading) return <Loading />
    if (forecastError) return <Error message={forecastError.message} />
    if (!forecast) return null

    return <ForecastChart forecast={forecast} />
}
