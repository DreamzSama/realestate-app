/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        container: {
            padding: {
                DEFAULT: "1rem",
                lg: "2rem",
            },
            screens: {
                sm: '480px',
                md: '768px',
                lg: '976px',
                xl: '1440px',
            },
        },
        fontFamily: {
            primary: "Poppins",
        },
        extend: {
            colors: {
                accent: "#F38210",
                bgGray: "#F5F5F5",
            },
        },
    },
    plugins: [],
};
