import { useQuery } from "@tanstack/react-query"
import { Geocoding } from "@/shared/types/types"
import { geocoding } from "@/features/weather/api/geocoding"
import { useMemo } from "react"

export const useGeocoding = (query: string, enabled: boolean = true) => {
    const {
        data,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['geocoding', query],
        queryFn: () => geocoding(query),
        enabled: enabled && query.length >= 2,
    })

    const uniqueGeocodingSet = new Set<string>()
    const geocodingList = useMemo(() => data ? data.filter((geocoding: Geocoding) => {
        const key = `${geocoding.name}-${geocoding.state}-${geocoding.country}`
        if (uniqueGeocodingSet.has(key)) return false
        uniqueGeocodingSet.add(key)
        return true
    }) : [], [data])

    return {
        geocoding: geocodingList || [],
        isLoading,
        error,
    }
}