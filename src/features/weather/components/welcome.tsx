import { Geocoding } from "@/shared/types/types"
import { Search } from "@/features/weather/components/search"
import { FC } from "react"

type Props = {
    handleGeocodingSelect: (geocoding: Geocoding) => void
}

export const Welcome: FC<Props> = ({ handleGeocodingSelect }) =>
    <div className="p-10 flex flex-col items-center justify-center text-center h-full">
        <h1 className="text-4xl font-light text-white text-center">Search for location</h1>
        <p className="text-lg text-white text-center mb-10 opacity-50">or choose from recent searches</p>
        <main className="w-1/2">
            <Search handleGeocodingSelect={handleGeocodingSelect} />
        </main>
    </div>