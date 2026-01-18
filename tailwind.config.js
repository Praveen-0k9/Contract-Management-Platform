/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Mapping our CSS variables to Tailwind extended theme if needed,
                // but since we used direct class names (bg-white, text-indigo-600),
                // we mainly need the defaults.
            }
        },
    },
    plugins: [],
}
