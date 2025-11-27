import { useQuery } from "@tanstack/react-query"
import { forecast } from "@/features/forecast/api/forecast"

export const useForecast = (lat: number, lon: number) => {
    const {
        data,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['hourly-forecast', lat, lon],
        queryFn: () => forecast(lat, lon),
        enabled: !!lat && !!lon,
    })

    return {
        forecast: data,
        isForecastLoading: isLoading,
        forecastError: error,
    }
}