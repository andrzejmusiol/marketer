import { FC, memo } from "react"

type Props = {
    temp: number
    locationName: string
}

export const LocationWithTemperature: FC<Props> = memo(({ temp, locationName }) => {
    return (
        <div>
            <p>{locationName}</p>
            <h2>{temp}°C</h2>
        </div>
    )
})