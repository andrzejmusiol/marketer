import { Error } from "@/shared/components/states/error";
import { Loading } from "@/shared/components/states/loading";
import { ForecastChart } from "@/features/forecast/components/forecast-chart";
import { useForecast } from "@/features/forecast/hooks/use-forecast";
import { useGeolocation } from "@/shared/api/use-geolocation";
import { useGeocodingStore } from "@/shared/stores/geocoding";

export const Forecast = () => {
    const { geocoding } = useGeocodingStore()
    const { lat, lon } = useGeolocation()
    const { forecast, isForecastLoading, forecastError } = useForecast(geocoding?.lat ? geocoding.lat : lat || 0, geocoding?.lon ? geocoding.lon : lon || 0);

    if (isForecastLoading) return <Loading />
    if (forecastError) return <Error message={forecastError.message} />
    if (!forecast) return null

    return <ForecastChart forecast={forecast} />
}
