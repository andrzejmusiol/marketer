import { useState, useEffect, useCallback } from 'react'
import { Geocoding } from '@/shared/types/types'
import { generateCityKey } from '@/features/forecast/utils/utils'
import { MAX_RECENT_SEARCHES, STORAGE_KEY } from '@/features/forecast/utils/constants'

export const useRecentSearches = () => {
    const [recentSearches, setRecentSearches] = useState<Geocoding[]>([])

    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY)
            if (stored) {
                const parsed = JSON.parse(stored) as Geocoding[]
                setRecentSearches(parsed)
            }
        } catch (error) {
            console.error('Failed to load recent searches:', error)
            localStorage.removeItem(STORAGE_KEY)
        }
    }, [])

    const addRecentSearch = useCallback((city: Geocoding) => {
        setRecentSearches(prev => {
            const cityKey = generateCityKey(city)

            const filtered = prev.filter(
                city => `${city.name}-${city.lat}-${city.lon}` !== cityKey
            )

            const updated = [city, ...filtered].slice(0, MAX_RECENT_SEARCHES)

            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
            } catch (error) {
                console.error('Failed to save recent searches:', error)
            }

            return updated
        })
    }, [])

    const clearRecentSearches = useCallback(() => {
        setRecentSearches([])
        try {
            localStorage.removeItem(STORAGE_KEY)
        } catch (error) {
            console.error('Failed to clear recent searches:', error)
        }
    }, [])

    return {
        recentSearches,
        addRecentSearch,
        clearRecentSearches,
    }
}