import { Error } from "@/shared/components/states/error";
import { Loading } from "@/shared/components/states/loading";
import { NoData } from "@/shared/components/states/no-data";
import { ForecastChart } from "@/features/forecast/components/forecast-chart";
import { useForecast } from "@/features/forecast/hooks/use-forecast";

export const ForecastPage = () => {
    const { forecast, isForecastLoading, forecastError } = useForecast(51.9384, 15.505);

    if (isForecastLoading) return <Loading />

    if (forecastError) return <Error message={forecastError.message} />

    if (!forecast) return <NoData />

    return <ForecastChart forecast={forecast} />
}
