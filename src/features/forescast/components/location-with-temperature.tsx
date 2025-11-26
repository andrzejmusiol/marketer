import { FC, memo } from "react"
import { useForescast } from "@/features/forescast/hooks/use-forescast";
import { Geocoding } from "@/shared/types/types";

type Props = {
    city: Geocoding | null
}

export const LocationWithTemperature: FC<Props> = memo(({ city }) => {
    const { forescastData, forescastLoading, forescastError } = useForescast(city?.lat || 0, city?.lon || 0);

    if (!city) { return <div>No city selected</div> }
    if (!forescastData) { return <div>No data</div> }
    if (forescastLoading) { return <div>Loading...</div> }
    if (forescastError) { return <div>Error: {forescastError.message}</div> }

    return (
        <div>
            <p>{forescastData.name}</p>
            <p>{city.state}, {city.country}</p>
            <h2>{forescastData.main.temp}°C</h2>
        </div>
    )
})