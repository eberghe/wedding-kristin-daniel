/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#2E3D52',
          light: '#3d5068',
        },
        'blue-accent': '#697C9F',
        'blue-muted': '#6E6C83',
        cream: {
          DEFAULT: '#EFEEF5',
          light: '#F8F8FC',
        },
      },
      fontFamily: {
        script: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
