import { API } from "@/shared/configs/api"
import { HourlyForecastResponse } from "./types"

export const forecast = async (lat: number, lon: number): Promise<HourlyForecastResponse> => {
    const url = `data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_API_KEY}&units=metric&lang=en`
    return API.get<HourlyForecastResponse>(url)
}
