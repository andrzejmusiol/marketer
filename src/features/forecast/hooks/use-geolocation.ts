import { useState, useEffect } from 'react'

type Geolocation = {
    lat: number | null
    lon: number | null
    isLoading: boolean
    error: GeolocationPositionError | null
}

export const useGeolocation = () => {
    const [state, setState] = useState<Geolocation>({
        lat: null,
        lon: null,
        isLoading: true,
        error: null,
    })

    useEffect(() => {
        if (!navigator.geolocation) {
            setState(prev => ({
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
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 300000,
        }

        const watchId = navigator.geolocation.getCurrentPosition(
            (position) => {
                setState({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                    isLoading: false,
                    error: null,
                })
            },
            (error) => {
                setState(prev => ({
                    ...prev,
                    isLoading: false,
                    error,
                }))
            },
            options
        )

        return () => {
            if (watchId !== undefined) {
                navigator.geolocation.clearWatch(watchId)
            }
        }
    }, [])

    return state
}