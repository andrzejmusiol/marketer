import { CityWeather } from "@/features/forecast/components/wheater/city-weather";
import { SearchCombobox } from "@/features/forecast/components/search/search-combobox";
import { useState } from "react";
import { Geocoding } from "@/shared/types/types";
import { GeolocationWeather } from "../components/wheater/geolocaton-weather";

const ForecastPage = () => {
    const [selectedCity, setSelectedCity] = useState<Geocoding | null>(null);

    const handleCitySelect = (city: Geocoding) => setSelectedCity(city)

    return <div>
        <SearchCombobox onCitySelect={handleCitySelect} />
        {selectedCity ? <CityWeather city={selectedCity} /> : <GeolocationWeather />}
    </div>
}

export default ForecastPage;

