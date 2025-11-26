import { useQuery } from "@tanstack/react-query"
import { forescast } from "@/features/forescast/api/forecast"

export const useForescast = (city: string | null) => {
    const {
        data: forescastData,
        isLoading: forescastLoading,
        error: forescastError,
    } = useQuery({
        queryKey: ['forescast', city],
        queryFn: () => {
            return forescast(city)
        },
        enabled: !!city,
    })

    return {
        forescastData,
        forescastLoading,
        forescastError,
    }
}