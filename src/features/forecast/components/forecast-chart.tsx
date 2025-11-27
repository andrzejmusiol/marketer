import { FC } from "react"
import { ForecastList } from "@/shared/types/types"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/shared/components/ui/chart"
import { AreaChart, CartesianGrid, XAxis, Area, LabelList, LabelProps } from "recharts"
import { chartDataFromatter } from "@/features/forecast/utils"
import { COLORS } from "@/shared/configs/colors"
import { Title } from "@radix-ui/react-dialog"

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

    const renderLabel = (props: LabelProps) => {
        const { x, y, value, index } = props

        if (index === 0 || index === chartData.length - 1) {
            return null
        }

        return (
            <text
                x={x}
                y={y}
                fill="rgba(255, 255, 255, 0.5)"
                fontSize="48px"
                textAnchor="middle"
                dy={-20}
            >
                {`${Math.round(value as number)}°`}
            </text>
        )
    }

    return (
        <ChartContainer config={chartConfig} className="h-full w-full ">
            <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{ top: 100, bottom: 50 }}
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
                    tickFormatter={(value: string, index: number) => {
                        if (index === 0 || index === chartData.length - 1) {
                            return ''
                        }
                        return value
                    }}
                />
                <Area
                    dataKey="temp"
                    type="natural"
                    fill="url(#fillTemp)"
                    fillOpacity={0.4}
                    stroke={COLORS.chart.gradient.start}
                >
                    <LabelList dataKey="temp" content={renderLabel} />
                </Area>
            </AreaChart>
        </ChartContainer>
    )
}