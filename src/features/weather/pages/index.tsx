import { FC } from "react";
import { Geocoding } from "@/shared/types/types";
import { Weather } from "@/features/weather/components/wheater/weather";
import { useWeather } from "@/features/weather/hooks/use-weather";
import { useGeolocation } from "@/shared/api/use-geolocation";
import { Loading } from "@/shared/components/states/loading";
import { Error } from "@/shared/components/states/error";
import { Search } from "../components/search";

type Props = {
    geocoding: Geocoding | null
    handleGeocodingSelect: (geocoding: Geocoding) => void
}

const WeatherPage: FC<Props> = ({ geocoding, handleGeocodingSelect }) => {
    const { lat, lon } = useGeolocation()
    const { weather, isWeatherLoading, weatherError } = useWeather(geocoding?.lat ? geocoding.lat : lat || 0, geocoding?.lon ? geocoding.lon : lon || 0);

    if (!weather) {
        return <div className="p-10 flex flex-col items-center justify-center text-center h-full">
            <h1 className="text-4xl font-light text-white text-center">Search for a location</h1>
            <p className="text-lg text-white text-center mb-10 opacity-50">or choose from recent searches</p>
            <main className="w-1/2">
                <Search handleGeocodingSelect={handleGeocodingSelect} />
            </main>
        </div>
    }
    if (isWeatherLoading) { return <Loading /> }
    if (weatherError) { return <Error message={weatherError.message} /> }

    return <div className="p-10">
        <main className="grid grid-cols-1 md:grid-cols-3 justify-center items-center flex-1 min-h-0">
            <div className="col-span-2">
                <Weather weather={weather} geocoding={geocoding} />
            </div>
            <div className="col-span-1 h-full space-y-2">
                <Search handleGeocodingSelect={handleGeocodingSelect} />

            </div>
        </main>
    </div>
}


export default WeatherPage;

