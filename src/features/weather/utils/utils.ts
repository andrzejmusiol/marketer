import { Geocoding } from "@/shared/types/types"

export const geocodingKeyFactory = (geocoding: Geocoding) => `${geocoding.name}-${geocoding.lat}-${geocoding.lon}`
export const imageUrlFactory = (icon: string) => `https://openweathermap.org/img/wn/${icon}@2x.png`