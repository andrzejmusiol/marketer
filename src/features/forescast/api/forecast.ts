import { API } from "@/shared/configs/api"
import { WeatherResponse } from "./types"

export const forescast = async (city: string): Promise<WeatherResponse> => {
    const url = `/weather?q=${city}&appid=${import.meta.env.VITE_API_KEY}&units=metric&lang=en`
    return API.get<WeatherResponse>(url)
}
