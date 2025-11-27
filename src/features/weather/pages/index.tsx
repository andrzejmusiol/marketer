import { FC } from "react";
import { GeocodingWeather } from "@/features/weather/components/wheater/geocoding-weather";
import { SearchCombobox } from "@/features/weather/components/search/search-combobox";
import { Geocoding } from "@/shared/types/types";
import { GeolocationWeather } from "@/features/weather/components/wheater/geolocaton-weather";
import { RecentSearches } from "@/features/weather/components/search/recent/recent-searches";


type Props = {
    selectedGeocoding: Geocoding | null
    handleGeocodingSelect: (geocoding: Geocoding) => void
}

const WeatherPage: FC<Props> = ({ selectedGeocoding, handleGeocodingSelect }) =>
    <div className="p-10">
        <nav className="flex items-center justify-end p-4 flex-shrink-0">
            <SearchCombobox onGeocodingSelect={handleGeocodingSelect} />
        </nav>
        <main className="grid grid-cols-1 md:grid-cols-3 justify-center items-center flex-1 min-h-0">
            <div className="col-span-2">
                {selectedGeocoding ? <GeocodingWeather geocoding={selectedGeocoding} /> : <GeolocationWeather />}
            </div>
            <div className="col-span-1">
                <RecentSearches onGeocodingSelect={handleGeocodingSelect} />
            </div>
        </main>
    </div>


export default WeatherPage;

