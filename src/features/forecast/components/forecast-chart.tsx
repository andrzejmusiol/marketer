import { FC, useLayoutEffect, useMemo, useState } from "react"
import { ForecastList } from "@/shared/types/types"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/shared/components/ui/chart"
import { AreaChart, CartesianGrid, XAxis, Area, LabelList } from "recharts"
import { chartDataFromatter } from "@/features/forecast/utils/charts"
import { COLORS } from "@/shared/configs/colors"

type Props = {
    forecast: ForecastList
}

export const ForecastChart: FC<Props> = ({ forecast }) => {
    const [width, setWidth] = useState(0)
    const isMobile = width < 768

    useLayoutEffect(() => {
        setWidth(window.innerWidth)
    }, [])

    const chartData = useMemo(() => forecast.slice(0, isMobile ? 4 : 10).map((item) => ({
        time: chartDataFromatter(item.dt),
        temp: item.main.temp,
    })), [forecast])

    const chartConfig = {
        temp: {
            label: "Temperature",
        },
    } satisfies ChartConfig

    return (
        <ChartContainer config={chartConfig} className="h-full w-full ">
            <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{ top: 100, bottom: 10, left: 40, right: 40 }}
            >
                <defs>
                    <linearGradient id="fillTemp" x1="0" y1="0" x2="0" y2="1">
                        <stop
                            offset="5%"
                            stopColor={COLORS.chart.gradient.start}
                            stopOpacity={0.8}
                        />
                        <stop
                            offset="90%"
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
                    activeDot={{ r: 6 }}
                >
                    <LabelList
                        dataKey="temp"
                        fontSize={isMobile ? "24px" : "36px"}
                        fontWeight={300}
                        fontFamily="Poppins"
                        fill="rgba(255, 255, 255, 0.5)"
                        formatter={(value: number) => `${Math.round(value)}°`}
                        position="top"
                        offset={25}
                    />
                </Area>
            </AreaChart>
        </ChartContainer>
    )
}