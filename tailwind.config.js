const colors = require('tailwindcss/colors');

module.exports = {
   purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
      extend: {
        fontFamily: {
          roboto: ['Roboto', 'Sans'],
          lato: ['Lato', 'Sans']
        },
        gridTemplateColumns: {
          'NavBar': '200px minmax(500px, 1fr) 200px',
        }
      },
      textColor: {
        'lightgray': '#918d8a'
      },
      colors: {
      transparent: 'transparent',
      current: 'currentColor'
    }
    },
    variants: {
      extend: {},
    },
    plugins: [
      require('@tailwindcss/forms'), // import tailwind forms
   ],
  }