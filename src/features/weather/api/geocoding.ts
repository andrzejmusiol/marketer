import { GeocodingResponse } from "@/features/weather/api/types"
import { API } from "@/shared/configs/api"

export const geocoding = async (query: string): Promise<GeocodingResponse[]> => {
    const url = `/geo/1.0/direct?q=${query}&limit=5&appid=${import.meta.env.VITE_API_KEY}`
    return API.get<GeocodingResponse[]>(url)
}