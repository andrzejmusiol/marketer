import { API } from "@/shared/configs/api"
import { WeatherResponse } from "@/features/weather/api/types"

export const weather = async (lat: number, lon: number): Promise<WeatherResponse> => {
    const url = `data/2.5/weather?lat=${lat}&lon=${lon}&&appid=${import.meta.env.VITE_API_KEY}&units=metric&lang=en`
    return API.get<WeatherResponse>(url)
}
