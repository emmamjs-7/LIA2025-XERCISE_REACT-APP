/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            backgroundImage: {
                topo: "url('/public/bg.webp')",
                topolight: "url('/public/bg-light.webp')",
                topogrey: "url('/public/bg-grey.webp')",
                gradientlightgreen: 'linear-gradient(to right, #A3B6B4 75%, transparent 100%)',
                gradientdarkgreen: 'linear-gradient(to right, #526664 75%, transparent 100%)',
                gradientgrey: 'linear-gradient(to right, #64666A 75%, transparent 100%)'
            },
            colors: {
                black: '#1E2022',
                green: '#A3B6B4',
                darkgreen: '#526664',
                white: '#F0F2EF',
                grey: '#64666A',
                yellow: "#ffb300"
            }
        },
    },
    plugins: [],
};
