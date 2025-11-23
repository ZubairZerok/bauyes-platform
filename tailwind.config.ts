import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#022c22", // Hardcoded Dark Green
                foreground: "#ffffff", // Hardcoded White
                // New Lime Green & Dark Forest Palette (camelCase to avoid Tailwind issues)
                bauyesLime: "#bef264", // Lime-300 - The energetic pop
                bauyesDark: "#022c22", // Emerald-950 - Deep forest background
                bauyesCard: "#064e3b", // Emerald-900 - Slightly lighter for cards
                // Legacy support (keeping for backward compatibility)
                bauyesGreen: "#10b981", // Old emerald-500
                voidBlack: "#022c22",
            },
            backgroundImage: {
                "jungle-glow": "radial-gradient(circle at center, #064e3b 0%, #022c22 100%)",
            },
            fontFamily: {
                sans: ["var(--font-inter)", "sans-serif"],
                display: ["var(--font-space-grotesk)", "sans-serif"],
                serif: ["var(--font-cinzel)", "serif"],
            },
            keyframes: {
                "fade-in-up": {
                    "0%": { opacity: "0", transform: "translateY(20px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                "pulse-glow": {
                    "0%, 100%": { opacity: "1", boxShadow: "0 0 20px rgba(190, 242, 100, 0.5)" },
                    "50%": { opacity: "0.8", boxShadow: "0 0 10px rgba(190, 242, 100, 0.2)" },
                },
                "lime-pulse": {
                    "0%, 100%": { opacity: "1" },
                    "50%": { opacity: "0.5" },
                },
            },
            animation: {
                "fade-in-up": "fade-in-up 0.5s ease-out forwards",
                "pulse-glow": "pulse-glow 2s infinite",
                "lime-pulse": "lime-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            },
        },
    },
    plugins: [],
};
export default config;
