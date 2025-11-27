import { useState, useEffect, useCallback } from 'react'
import { Geocoding } from '@/shared/types/types'
import { geocodingKeyFactory } from '@/features/weather/utils/utils'
import { MAX_RECENT_SEARCHES, STORAGE_KEY } from '@/features/weather/utils/constants'

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

    const addRecentSearch = useCallback((geocoding: Geocoding) => {
        setRecentSearches(prev => {
            const geocodingKey = geocodingKeyFactory(geocoding)

            const filtered = prev.filter(
                geo => geocodingKeyFactory(geo) !== geocodingKey
            )

            const recentSearches = [geocoding, ...filtered].slice(0, MAX_RECENT_SEARCHES)

            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(recentSearches))
            } catch (error) {
                console.error('Failed to save recent searches:', error)
            }

            return recentSearches
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