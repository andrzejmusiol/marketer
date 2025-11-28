export const ORANGE = "#E59E69"
export const GRAY = "#636363"
export const BLACK = "#0C1518"
export const DARK = "#0C1518"

export const COLORS = {
    background: {
        primary: DARK,
    },
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

