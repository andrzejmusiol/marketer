import { useForescast } from "@/features/forescast/hooks/use-forescast";
import { LocationWithTemperature } from "@/features/forescast/components/location-with-temperature";
import { useCity } from "@/features/forescast/hooks/use-city";

const ForescastPage = () => {
    const { forescastData, forescastLoading, forescastError } = useForescast('Warsaw');
    const { cities, isLoading, error } = useCity('War');

    console.warn(cities);

    if (forescastLoading) {
        return <div>Loading...</div>
    }

    if (forescastError) {
        return <div>Error: {forescastError.message}</div>
    }

    if (!forescastData) { return <div>No data</div> }

    return <div>
        <LocationWithTemperature temp={forescastData.main.temp} locationName={forescastData.name} />
    </div>
}

export default ForescastPage;

