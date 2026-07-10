/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#eff8ff",
        foreground: "#0f172a",
        card: "#f8fbff",
        'card-foreground': "#0f172a",
        primary: "#38bdf8",
        'primary-foreground': "#ffffff",
        secondary: "#dbeafe",
        'secondary-foreground': "#0f172a",
        muted: "#e0f2fe",
        'muted-foreground': "#475569",
        border: "#bfdbfe",
        destructive: "#fb7185",
      },
      boxShadow: {
        glass: '0 20px 60px rgba(56, 189, 248, 0.14), 0 1px 2px rgba(15, 23, 42, 0.06)',
      },
      backgroundImage: {
        'blue-glow': 'radial-gradient(circle at top left, rgba(56,189,248,0.18), transparent 25%), radial-gradient(circle at bottom right, rgba(59,130,246,0.12), transparent 20%)',
      },
      borderRadius: {
        xl: "12px",
      }
    },
  },
  plugins: [],
};