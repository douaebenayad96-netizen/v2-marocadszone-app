/** @type {import('tailwindcss').Config} */
import tailwindcssPlugin from 'tailwindcss/plugin';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "lemon-milk": ['Lemon Milk Font', 'sans-serif'],
        "poppins": ['Poppins', 'sans-serif'],
        "DM-Sans": ['DM Sans', 'sans-serif'],
      },
      colors: {
        "primary-white": '#FFFFFF',
        "primary-orange": '#F36F24',
        "primary-orange-dark": '#db6420',
        "primary-orange-light": '#f79a66',
        "primary-gray": {
          200: '#EBEBEB',
          500: '#2D2D2D',
          800: '#222222',
        },
        "primary-blue-sky": '#aca7a4',
        "primary-blue": '#373737',
        "primary-blue-all": {
          100: '#c4dafa',
          200: '#F36F24',
          500: '#4d82bc',
          800: '#F36F24',
          900: '#373737',
        },
      },
      boxShadow: {
        "orange-bottom": '0px 5px 25px rgba(243, 111, 36, 0.08)',
        "orange-bottom-right": '0px 5px 20px rgba(243, 111, 36, 0.15), 5px 5px 20px rgba(243, 111, 36, 0.15)',
        "blue-bottom": '0px 5px 25px rgba(4, 59, 92, 0.08)',
        "blue-bottom-right": '0px 5px 20px rgba(4, 59, 92, 0.15), 5px 5px 20px rgba(4, 59, 92, 0.15)',
        "card-sm": "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
        "card-shadow-border": "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
      },
      backgroundImage: {
        "half-circle": "url('/src/assets/img/right-bottom.png')",
      },
    },
  },
  plugins: [
    tailwindcssPlugin,
  ],
}

