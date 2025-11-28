import { create } from 'zustand'
import { Geocoding } from '@/shared/types/types'

type GeocodingStore = {
    geocoding: Geocoding | null
    setGeocoding: (geocoding: Geocoding) => void
}

export const useGeocodingStore = create<GeocodingStore>((set) => ({
    geocoding: null,
    setGeocoding: (geocoding) => set({ geocoding }),
}))