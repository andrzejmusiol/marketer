
import { Weather } from "@/features/weather/components";
import { Forecast } from "@/features/forecast/components/forecast";
import { getAuroraColorStops } from "@/shared/configs/colors";
import Aurora from "@/shared/components/bits/aurora-background";

export const WeatherForecastPage = () =>
    <div className="h-screen w-screen flex flex-col overflow-hidden relative bg-primary">
        <div className="z-10 flex flex-col h-full overflow-y-auto">
            <div className="flex-shrink-0 md:flex-1 min-h-0">
                <Weather />
            </div>
            <div className="flex-shrink-0 md:flex-1 min-h-0">
                <Forecast />
            </div>
        </div>

        <Aurora
            colorStops={getAuroraColorStops()}
            blend={0.5}
            amplitude={1.0}
            speed={0.5}
        />

    </div>