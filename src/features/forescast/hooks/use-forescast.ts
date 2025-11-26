import { useQuery } from "@tanstack/react-query"
import { forescast } from "@/features/forescast/api/forecast"

export const useForescast = (lat: number, lon: number) => {
    const {
        data: forescastData,
        isLoading: forescastLoading,
        error: forescastError,
    } = useQuery({
        queryKey: ['forescast', lat, lon],
        queryFn: () => {
            return forescast(lat, lon)
        },
        enabled: !!lat && !!lon,
    })

    return {
        forescastData,
        forescastLoading,
        forescastError,
    }
}