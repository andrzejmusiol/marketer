import { FC, memo } from "react"
import { useForescast } from "@/features/forescast/hooks/use-forescast";

type Props = {
    city: string | null
}

export const LocationWithTemperature: FC<Props> = memo(({ city }) => {
    const { forescastData, forescastLoading, forescastError } = useForescast(city);

    if (!forescastData) { return <div>No data</div> }
    if (forescastLoading) { return <div>Loading...</div> }
    if (forescastError) { return <div>Error: {forescastError.message}</div> }

    return (
        <div>
            <p>{forescastData.name}</p>
            <h2>{forescastData.main.temp}°C</h2>
        </div>
    )
})