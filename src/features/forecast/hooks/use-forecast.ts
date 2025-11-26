import { useQuery } from "@tanstack/react-query"
import { forecast } from "@/features/forecast/api/forecast"

export const useForecast = (lat: number, lon: number) => {
    const {
        data: forecastData,
        isLoading: forecastLoading,
        error: forecastError,
    } = useQuery({
        queryKey: ['forecast', lat, lon],
        queryFn: () => {
            return forecast(lat, lon)
        },
        enabled: !!lat && !!lon,
    })

    return {
        forecastData,
        forecastLoading,
        forecastError,
    }
}