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
        sage: {
          DEFAULT: '#5C7A5C',
          light: '#7A9B7A',
        },
        cream: {
          DEFAULT: '#F2EDE3',
          light: '#FAF7F0',
        },
      },
      fontFamily: {
        script: ['"Pinyon Script"', 'cursive'],
        sans: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
