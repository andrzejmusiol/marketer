import { useState } from "react";
import { Weather } from "@/features/weather/components";
import { Forecast } from "@/features/forecast/components/forecast";
import Aurora from "@/shared/components/Aurora";
import { getAuroraColorStops } from "@/shared/configs/colors";
import { Geocoding } from "@/shared/types/types";

export const WeatherForecastPage = () => {
    const [selectedGeocoding, setSelectedGeocoding] = useState<Geocoding | null>(null);

    const handleGeocodingSelect = (geocoding: Geocoding) => setSelectedGeocoding(geocoding)

    return (
        <div className="h-screen w-screen flex flex-col overflow-hidden relative bg-primary">
            <div className="z-10 flex flex-col h-full overflow-y-auto">
                <div className="flex-shrink-0 md:flex-1 min-h-0">
                    <Weather geocoding={selectedGeocoding} handleGeocodingSelect={handleGeocodingSelect} />
                </div>
                <div className="flex-shrink-0 md:flex-1 min-h-0">
                    <Forecast geocoding={selectedGeocoding} />
                </div>
            </div>
            <div className="absolute top-0 left-0 w-full h-full z-0">
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