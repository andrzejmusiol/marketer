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

    const seen = new Set<string>()
    const uniqueCities = data ? data.filter(city => {
        const key = `${city.name}-${city.state}-${city.country}`
        if (seen.has(key)) {
            return false
        }
        seen.add(key)
        return true
    }) : []

    return {
        cities: uniqueCities || [],
        isLoading,
        error,
    }
}