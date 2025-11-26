import { FC } from "react"
import { useRecentSearches } from "@/features/forecast/hooks/user-recent-search"
import { Button } from "@/shared/components/ui/button"
import { Geocoding } from "@/shared/types/types"
import { generateCityKey } from "@/features/forecast/utils/utils"
import { RecentSearch } from "@/features/forecast/components/search/recent-search"

type Props = {
    handleSelect: (city: Geocoding) => void
}

export const RecentSearches: FC<Props> = ({ handleSelect }) => {
    const { recentSearches, clearRecentSearches } = useRecentSearches()

    return (
        <div className="w-full">
            <div className="flex items-center justify-between">
                <p className="text-xs font-medium">Recent searches:</p>
                <Button onClick={clearRecentSearches} variant="ghost" className="text-xs py-0.5">
                    Clear searches
                </Button>
            </div>
            {recentSearches.length > 0 && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {recentSearches.map((city) => (
                    <RecentSearch key={generateCityKey(city)} city={city} handleSelect={handleSelect} />
                ))}
            </div>
            }

        </div>
    )
}