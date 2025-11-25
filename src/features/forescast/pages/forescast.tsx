import { useForescast } from "@/features/forescast/hooks/use-forescast";

const ForescastPage = () => {
    const { forescastData, forescastLoading, forescastError } = useForescast('Warsaw');

    if (forescastLoading) {
        return <div>Loading...</div>
    }

    if (forescastError) {
        return <div>Error: {forescastError.message}</div>
    }

    return <div>
        <h1>{forescastData?.name}</h1>
        <p>Temperature: {forescastData?.main.temp}°C</p>
        <p>Description: {forescastData?.weather[0].description}</p>

    </div>
}

export default ForescastPage;

