import { GeocodingWeather } from "@/features/weather/components/wheater/geocoding-weather";
import { SearchCombobox } from "@/features/weather/components/search/search-combobox";
import { useState } from "react";
import { Geocoding } from "@/shared/types/types";
import { GeolocationWeather } from "@/features/weather/components/wheater/geolocaton-weather";
import { RecentSearches } from "@/features/weather/components/search/recent/recent-searches";

const WeatherPage = () => {
    const [selectedCity, setSelectedCity] = useState<Geocoding | null>(null);

    const handleGeocodingSelect = (geocoding: Geocoding) => setSelectedCity(geocoding)

    return (
        <div className="h-screen w-screen flex flex-col overflow-hidden">
            <nav className="flex items-center justify-between p-4 flex-shrink-0">
                <h1 className="text-2xl font-bold">Local Forecast</h1>
                <SearchCombobox onGeocodingSelect={handleGeocodingSelect} />
            </nav>
            <main className="flex justify-center items-center flex-1 min-h-0">
                {selectedCity ? <GeocodingWeather geocoding={selectedCity} /> : <GeolocationWeather />}
            </main>
            <div className="flex items-center justify-center p-4 flex-shrink-0">
                <RecentSearches handleSelect={handleGeocodingSelect} />
            </div>
        </div>
    )
}

export default WeatherPage;

