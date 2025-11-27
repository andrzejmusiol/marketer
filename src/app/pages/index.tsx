import { ForecastPage } from "@/features/forecast/pages";
import WeatherPage from "@/features/weather/pages";
import { Geocoding } from "@/shared/types/types";
import { useState } from "react";

export const WeatherForecastPage = () => {
    const [selectedGeocoding, setSelectedGeocoding] = useState<Geocoding | null>(null);

    const handleGeocodingSelect = (geocoding: Geocoding) => setSelectedGeocoding(geocoding)

    return (
        <div className="h-screen w-screen flex flex-col overflow-hidden">
            <WeatherPage selectedGeocoding={selectedGeocoding} handleGeocodingSelect={handleGeocodingSelect} />
            <ForecastPage geocoding={selectedGeocoding} />
        </div>
    )
}