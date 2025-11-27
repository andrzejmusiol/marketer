import { FC } from "react"
import { ForecastList } from "@/shared/types/types"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/shared/components/ui/chart"
import { AreaChart, CartesianGrid, XAxis, Area } from "recharts"
import { chartDataFromatter } from "@/features/forecast/utils"

type Props = {
    forecast: ForecastList
}

export const ForecastChart: FC<Props> = ({ forecast }) => {

    const chartData = forecast.map((item) => ({
        time: chartDataFromatter(item.dt),
        temp: item.main.temp,
    }))

    const chartConfig = {
        temp: {
            label: "Temperature",
        },
    } satisfies ChartConfig

    return (
        <ChartContainer config={chartConfig}>
            <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{
                    left: 12,
                    right: 12,
                }}
            >
                <defs>
                    <linearGradient id="fillTemp" x1="0" y1="0" x2="0" y2="1">
                        <stop
                            offset="5%"
                            stopColor="#292929"
                            stopOpacity={0.8}
                        />
                        <stop
                            offset="95%"
                            stopColor="#292929"
                            stopOpacity={0.1}
                        />
                    </linearGradient>
                </defs>
                <CartesianGrid vertical={false} />

                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="line" />}
                />
                <XAxis
                    dataKey="time"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}

                />
                <Area
                    dataKey="temp"
                    type="natural"
                    fill="url(#fillTemp)"
                    fillOpacity={0.4}
                    stroke="none"
                />
            </AreaChart>
        </ChartContainer>
    )
}