import { CityWeather } from "@/features/forecast/components/wheater/city-weather";
import { SearchCombobox } from "@/features/forecast/components/search/search-combobox";
import { useState } from "react";
import { Geocoding } from "@/shared/types/types";
import { GeolocationWeather } from "@/features/forecast/components/wheater/geolocaton-weather";
import { RecentSearches } from "@/features/forecast/components/search/recent-searches";

const ForecastPage = () => {
    const [selectedCity, setSelectedCity] = useState<Geocoding | null>(null);

    const handleCitySelect = (city: Geocoding) => setSelectedCity(city)

    return <div className="h-screen w-screen">
        <nav className="flex items-center justify-between p-4">
            <h1 className="text-2xl font-bold">Weather App</h1>
            <SearchCombobox onCitySelect={handleCitySelect} />
        </nav>
        <main className="flex justify-center items-center">
            {selectedCity ? <CityWeather city={selectedCity} /> : <GeolocationWeather />}
        </main>
        <div className="flex items-center justify-center p-4">
            <RecentSearches handleSelect={handleCitySelect} />
        </div>
    </div>
}

export default ForecastPage;

