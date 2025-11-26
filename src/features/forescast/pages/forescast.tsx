import { LocationWithTemperature } from "@/features/forescast/components/location-with-temperature";
import { SearchCombobox } from "@/features/forescast/components/search-combobox";
import { useState } from "react";
import { Geocoding } from "@/shared/types/types";

const ForescastPage = () => {
    const [selectedCity, setSelectedCity] = useState<Geocoding | null>(null);

    const handleCitySelect = (city: Geocoding) => setSelectedCity(city)

    return <div>
        <SearchCombobox onCitySelect={handleCitySelect} />
        <LocationWithTemperature city={selectedCity} />
    </div>
}

export default ForescastPage;

