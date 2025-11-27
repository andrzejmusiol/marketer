import { FC } from "react";
import { SearchCombobox } from "@/features/weather/components/search/search-combobox";
import { Geocoding } from "@/shared/types/types";
import { RecentSearches } from "@/features/weather/components/search/recent/recent-searches";
import { Weather } from "@/features/weather/components/wheater/weather";
import { useWeather } from "@/features/weather/hooks/use-weather";
import { useGeolocation } from "@/shared/api/use-geolocation";
import { NoData } from "@/shared/components/states/no-data";
import { Loading } from "@/shared/components/states/loading";
import { Error } from "@/shared/components/states/error";

type Props = {
    geocoding: Geocoding | null
    handleGeocodingSelect: (geocoding: Geocoding) => void
}

const WeatherPage: FC<Props> = ({ geocoding, handleGeocodingSelect }) => {
    const { lat, lon } = useGeolocation()
    const { weather, isWeatherLoading, weatherError } = useWeather(geocoding?.lat ? geocoding.lat : lat || 0, geocoding?.lon ? geocoding.lon : lon || 0);

    if (!weather) { return <NoData /> }
    if (isWeatherLoading) { return <Loading /> }
    if (weatherError) { return <Error message={weatherError.message} /> }

    return <div className="p-10">
        <main className="grid grid-cols-1 md:grid-cols-3 justify-center items-center flex-1 min-h-0">
            <div className="col-span-2">
                <Weather weather={weather} geocoding={geocoding} />
            </div>
            <div className="col-span-1 h-full space-y-2">
                <SearchCombobox onGeocodingSelect={handleGeocodingSelect} />
                <RecentSearches onGeocodingSelect={handleGeocodingSelect} />
            </div>
        </main>
    </div>
}


export default WeatherPage;

