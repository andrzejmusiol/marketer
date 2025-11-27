import { useQuery } from "@tanstack/react-query"
import { weather } from "@/features/weather/api/weather"

export const useWeather = (lat: number, lon: number) => {
    const {
        data,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['forecast', lat, lon],
        queryFn: () => weather(lat, lon),
        enabled: !!lat && !!lon,
    })

    return {
        weather: data,
        isWeatherLoading: isLoading,
        weatherError: error,
    }
}