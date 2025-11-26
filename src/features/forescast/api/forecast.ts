import { API } from "@/shared/configs/api"
import { ForecastResponse } from "@/features/forescast/api/types"

export const forescast = async (city: string): Promise<ForecastResponse> => {
    const url = `/weather?q=${city}&appid=${import.meta.env.VITE_API_KEY}&units=metric&lang=en`
    return API.get<ForecastResponse>(url)
}
