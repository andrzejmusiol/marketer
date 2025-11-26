import { API } from "@/shared/configs/api"
import { ForecastResponse } from "@/features/forescast/api/types"

export const forescast = async (city: string | null): Promise<ForecastResponse> => {
    if (!city) {
        throw new Error("City is required")
    }
    const url = `data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_API_KEY}&units=metric&lang=en`
    return API.get<ForecastResponse>(url)
}
