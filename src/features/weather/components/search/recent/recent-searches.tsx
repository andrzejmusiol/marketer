import { FC } from "react"
import { useRecentSearches } from "@/features/weather/hooks/user-recent-search"
import { Button } from "@/shared/components/ui/button"
import { Geocoding } from "@/shared/types/types"
import { geocodingKeyFactory } from "@/features/weather/utils/utils"
import { RecentSearch } from "@/features/weather/components/search/recent/recent-search"

type Props = {
    onGeocodingSelect: (geocoding: Geocoding) => void
}

export const RecentSearches: FC<Props> = ({ onGeocodingSelect }) => {
    const { recentSearches, clearRecentSearches } = useRecentSearches()

    if (!recentSearches.length) return null

    return (
        <div className="w-full">
            <div className="flex items-center justify-between my-2">
                <p className="text-xs text-white">Recent searched:</p>
                <Button onClick={clearRecentSearches} variant="ghost" className="text-xs py-0.5 text-white">
                    Clear
                </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {recentSearches.map((geocoding) => (
                    <RecentSearch key={geocodingKeyFactory(geocoding)} geocoding={geocoding} onGeocodingSelect={onGeocodingSelect} />
                ))}
            </div>

        </div>
    )
}