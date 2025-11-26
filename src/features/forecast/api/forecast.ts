import { API } from "@/shared/configs/api"
import { ForecastResponse } from "@/features/forecast/api/types"

export const forecast = async (lat: number, lon: number): Promise<ForecastResponse> => {
    const url = `data/2.5/weather?lat=${lat}&lon=${lon}&&appid=${import.meta.env.VITE_API_KEY}&units=metric&lang=en`
    return API.get<ForecastResponse>(url)
}
