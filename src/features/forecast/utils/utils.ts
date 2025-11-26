import { Geocoding } from "@/shared/types/types"

export const generateCityKey = (city: Geocoding) => `${city.name}-${city.lat}-${city.lon}`