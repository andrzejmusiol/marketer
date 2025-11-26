import { FC } from "react"
import { useRecentSearches } from "@/features/forecast/hooks/user-recent-search"
import { Button } from "@/shared/components/ui/button"
import { Geocoding } from "@/shared/types/types"

type Props = {
    handleSelect: (city: Geocoding) => void
}

export const RecentSearches: FC<Props> = ({ handleSelect }) => {
    const { recentSearches, clearRecentSearches } = useRecentSearches()

    if (recentSearches.length === 0) {
        return null
    }

    return (
        <div className="flex items-center gap-2 p-2">
            <p className="text-xs font-medium">Recent Searches: </p>
            {recentSearches.map((city) => (
                <Button className="w-fit text-xs p-2 hover:cursor-pointer hover:opacity-80" variant="secondary" key={`${city.name}-${city.lat}-${city.lon}`} onClick={() => handleSelect(city)}>
                    <p>{city.name} | {city.state}</p>
                </Button>
            ))}
            <Button
                onClick={clearRecentSearches}
                variant="outline"
                className="text-xs p-2"
            >
                Clear
            </Button>
        </div>
    )
}