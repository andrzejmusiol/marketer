import { FC } from "react"
import { HourlyForecast } from "@/shared/types/types"

type Props = {
    forecast: HourlyForecast
}

export const ForecastChart: FC<Props> = ({ forecast }) => {
    console.warn({ forecast })
    return (
        <div>
            <h1>Forecast Chart</h1>
        </div>
    )
}