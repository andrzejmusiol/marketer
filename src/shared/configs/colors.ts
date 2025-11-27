const ORANGE = "#E59E69"
const GRAY = "#636363"
const BLACK = "#0C1518"

export const COLORS = {
    aurora: {
        start: ORANGE,
        middle: GRAY,
        end: BLACK,
    },

    chart: {
        gradient: {
            start: ORANGE,
            end: BLACK,
        },
    },
} as const

export const getAuroraColorStops = () => [
    COLORS.aurora.start,
    COLORS.aurora.middle,
    COLORS.aurora.end,
]

