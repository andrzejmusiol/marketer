import { useRecentSearches } from "@/features/weather/hooks/use-recent-search"
import { Button } from "@/shared/components/ui/button"
import { geocodingKeyFactory } from "@/features/weather/utils/factories"
import { RecentSearch } from "@/features/weather/components/search/recent-searches/recent-search"
import { useGeocodingStore } from "@/shared/stores/geocoding"


export const RecentSearches = () => {
    const { setGeocoding } = useGeocodingStore()
    const { recentSearches, clearRecentSearches } = useRecentSearches()

    if (!recentSearches.length) return null

    return (
        <div className="w-full">
            <div className="flex items-center justify-between my-2">
                <p className="text-xs text-white">Recent searched:</p>
                <Button onClick={clearRecentSearches} variant="ghost" className="text-xs py-0.5 text-white hover:bg-transparent hover:text-white/50 cursor-pointer">
                    Clear
                </Button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                {recentSearches.map((geocoding) => (
                    <RecentSearch key={geocodingKeyFactory(geocoding)} geocoding={geocoding} onGeocodingSelect={setGeocoding} />
                ))}
            </div>

        </div>
    )
}