import { ForecastChart } from "../components/forecast-chart";
import { useForecast } from "../hooks/use-forecast";

export const ForecastPage = () => {
    const { forecast, isForecastLoading, forecastError } = useForecast(51.9384, 15.505);

    if (isForecastLoading) {
        return <div>Loading...</div>
    }

    if (forecastError) {
        return <div>Error: {forecastError.message}</div>
    }

    if (!forecast) {
        return <div>No forecast found</div>
    }


    return <ForecastChart forecast={forecast} />
}
