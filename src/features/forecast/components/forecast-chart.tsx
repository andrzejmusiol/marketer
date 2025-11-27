import { FC } from "react"
import { ForecastList } from "@/shared/types/types"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/shared/components/ui/chart"
import { AreaChart, CartesianGrid, XAxis, Area, LabelList } from "recharts"
import { chartDataFromatter } from "@/features/forecast/utils"
import { COLORS } from "@/shared/configs/colors"

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
        <ChartContainer config={chartConfig} className="h-full w-full">
            <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{ top: 50, bottom: 50 }}
            >
                <defs>
                    <linearGradient id="fillTemp" x1="0" y1="0" x2="0" y2="1">
                        <stop
                            offset="5%"
                            stopColor={COLORS.chart.gradient.start}
                            stopOpacity={0.8}
                        />
                        <stop
                            offset="95%"
                            stopColor={COLORS.chart.gradient.end}
                            stopOpacity={0.1}
                        />
                    </linearGradient>
                </defs>
                <CartesianGrid vertical={false} className="opacity-10" />

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
                    stroke={COLORS.chart.gradient.start}
                >
                    <LabelList
                        dataKey="temp"
                        position="top"
                        formatter={(value: number) => `${Math.round(value)}°`}
                        className="text-white/10"
                        style={{ fontSize: '48px' }}
                    />

                </Area>
            </AreaChart>
        </ChartContainer>
    )
}