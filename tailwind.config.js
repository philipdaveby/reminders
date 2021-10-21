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
        },
          textColor: {
            'lightgray': '#918d8a',
            'textblue' : '#053156',
          },
          colors: {
          transparent: 'transparent',
          current: 'currentColor'
        },
        backgroundColor: {
          liblue: '#F4F4F4',
          liblue1: '#1291FF'
        }
      },
    },
    variants: {
      extend: {},
    },
    plugins: [
      require('@tailwindcss/forms'), // import tailwind forms
   ],
  }