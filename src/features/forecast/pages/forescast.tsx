import { LocationWithTemperature } from "@/features/forecast/components/wheater/location-with-temperature";
import { SearchCombobox } from "@/features/forecast/components/search/search-combobox";
import { useState } from "react";
import { Geocoding } from "@/shared/types/types";

const ForecastPage = () => {
    const [selectedCity, setSelectedCity] = useState<Geocoding | null>(null);

    const handleCitySelect = (city: Geocoding) => setSelectedCity(city)

    return <div>
        <SearchCombobox onCitySelect={handleCitySelect} />
        <LocationWithTemperature city={selectedCity} />
    </div>
}

export default ForecastPage;

