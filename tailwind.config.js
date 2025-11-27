/** @type {import('tailwindcss').Config} */
import { COLORS } from "./src/shared/configs/colors"

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'bg-dark-primary': COLORS.background.primary,
            },
            fontFamily: {
                sans: ['Poppins', 'sans-serif'],
            },
        },
    },
}
