import { useState, useEffect } from 'react'

type Geolocation = {
    lat: number | null
    lon: number | null
    isLoading: boolean
    error: GeolocationPositionError | null
}

export const useGeolocation = () => {
    const [geolocation, setGeolocation] = useState<Geolocation>({
        lat: null,
        lon: null,
        isLoading: true,
        error: null,
    })

    useEffect(() => {
        if (!navigator.geolocation) {
            setGeolocation(prev => ({
                ...prev,
                isLoading: false,
                error: {
                    code: 0,
                    message: 'Geolocation is not supported by this browser',
                    PERMISSION_DENIED: 1,
                    POSITION_UNAVAILABLE: 2,
                    TIMEOUT: 3,
                } as GeolocationPositionError,
            }))
            return
        }

        const options: PositionOptions = {
            enableHighAccuracy: false,
            timeout: 10000,
            maximumAge: 300000,
        }

        let isMounted = true

        navigator.geolocation.getCurrentPosition(
            (position) => {
                if (!isMounted) return

                setGeolocation({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                    isLoading: false,
                    error: null,
                })
            },
            (error) => {
                if (!isMounted) return

                setGeolocation(prev => ({
                    ...prev,
                    isLoading: false,
                    error,
                }))
            },
            options
        )

        return () => {
            isMounted = false
        }
    }, [])

    return geolocation
}