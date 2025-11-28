import { Search } from "@/features/weather/components/search"

export const InitialSearch = () =>
    <div className="p-10 flex flex-col items-center justify-center text-center h-screen">
        <h1 className="text-5xl font-light text-white text-center">Search for location</h1>
        <p className="text-lg text-white text-center mb-10 opacity-50">or choose from recent searches</p>
        <section className="w-1/2" aria-label="Search for city">
            <Search />
        </section>
    </div>