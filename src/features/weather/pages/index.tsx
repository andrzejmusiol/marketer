import { GeocodingWeather } from "@/features/weather/components/wheater/geocoding-weather";
import { SearchCombobox } from "@/features/weather/components/search/search-combobox";
import { Geocoding } from "@/shared/types/types";
import { GeolocationWeather } from "@/features/weather/components/wheater/geolocaton-weather";
import { FC } from "react";

type Props = {
    selectedGeocoding: Geocoding | null
    handleGeocodingSelect: (geocoding: Geocoding) => void
}

const WeatherPage: FC<Props> = ({ selectedGeocoding, handleGeocodingSelect }) => {
    return (
        <>
            <nav className="flex items-center justify-between p-4 flex-shrink-0">
                <h1 className="text-2xl font-bold">Local Forecast</h1>
                <SearchCombobox onGeocodingSelect={handleGeocodingSelect} />
            </nav>
            <main className="flex justify-center items-center flex-1 min-h-0">
                {selectedGeocoding ? <GeocodingWeather geocoding={selectedGeocoding} /> : <GeolocationWeather />}
            </main>
        </>
    )
}

export default WeatherPage;

