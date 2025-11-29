import { Search } from "@/features/weather/components/search"
import { useRecentSearches } from "@/features/weather/hooks/use-recent-search"

export const InitialSearch = () => {
    const { recentSearches } = useRecentSearches()

    return (
        <div className="p-10 flex flex-col items-center justify-center text-center h-screen">
            <h1 className="text-5xl font-light text-white text-center">Search for location</h1>
            {!!recentSearches.length && <p className="text-lg text-white text-center opacity-50">or choose from recent searches</p>}
            <section className="w-full md:w-1/2 mt-10" aria-label="Search for city">
                <Search />
            </section>
        </div>
    )
}
