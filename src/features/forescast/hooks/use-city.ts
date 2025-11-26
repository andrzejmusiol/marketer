import { useQuery } from "@tanstack/react-query"
import { city } from "@/features/forescast/api/city"

export const useCity = (query: string, enabled: boolean = true) => {
    const {
        data,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['city', query],
        queryFn: () => city(query),
        enabled: enabled && query.length >= 2,
    })

    return {
        cities: data || [],
        isLoading,
        error,
    }
}