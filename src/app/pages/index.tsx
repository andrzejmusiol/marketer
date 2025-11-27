import { ForecastPage } from "@/features/forecast/pages";
import WeatherPage from "@/features/weather/pages";
import Aurora from "@/shared/components/Aurora";
import { getAuroraColorStops } from "@/shared/configs/colors";
import { Geocoding } from "@/shared/types/types";
import { useState } from "react";

export const WeatherForecastPage = () => {
    const [selectedGeocoding, setSelectedGeocoding] = useState<Geocoding | null>(null);

    const handleGeocodingSelect = (geocoding: Geocoding) => setSelectedGeocoding(geocoding)

    return (
        <div className="h-screen w-screen flex flex-col overflow-hidden relative bg-[#0C1518]">
            <div className="z-10">
                <WeatherPage selectedGeocoding={selectedGeocoding} handleGeocodingSelect={handleGeocodingSelect} />
                <ForecastPage geocoding={selectedGeocoding} />
            </div>
            <div className="absolute top-0 left-0 w-full h-full -z-0">
                <Aurora
                    colorStops={getAuroraColorStops()}
                    blend={0.5}
                    amplitude={1.0}
                    speed={0.5}
                />
            </div>
        </div>
    )
}