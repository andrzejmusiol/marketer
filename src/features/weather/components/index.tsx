import { WeatherDetails } from "@/features/weather/components/wheater-details";
import { useWeather } from "@/features/weather/hooks/use-weather";
import { useGeolocation } from "@/shared/hooks/use-geolocation";
import { Loading } from "@/shared/components/states/loading";
import { Error } from "@/shared/components/states/error";
import { Search } from "@/features/weather/components/search";
import { InitialSearch } from "@/features/weather/components/search/initial-search";
import { useGeocodingStore } from "@/shared/stores/geocoding";

export const Weather = () => {
    const { geocoding } = useGeocodingStore()
    const { lat, lon } = useGeolocation()
    const { weather, isWeatherLoading, weatherError } = useWeather(geocoding?.lat ? geocoding.lat : lat || 0, geocoding?.lon ? geocoding.lon : lon || 0);

    if (!weather) { return <InitialSearch /> }
    if (isWeatherLoading) { return <Loading /> }
    if (weatherError) { return <Error message={weatherError.message} /> }

    return <div className="p-10">
        <main className="grid grid-cols-1 md:grid-cols-3">
            <section className="col-span-2" aria-label="Weather details">
                <p className="sr-only">Weather details</p>
                <WeatherDetails weather={weather} geocoding={geocoding} />
            </section>
            <section className="col-span-1 mt-5 md:mt-0" aria-label="Search for city">
                <p className="sr-only">Search for city</p>
                <Search />
            </section>
        </main>
    </div>
}

