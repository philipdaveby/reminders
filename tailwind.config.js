require('tailwindcss/colors');

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
            'textdarkblue' : '#01121C',
          },
          colors: {
          transparent: 'transparent',
          current: 'currentColor'
        },
        backgroundColor: {
          liblue: '#F4F4F4',
          liblue1: '#1291FF',
          li: '#F3EFF2'
        },
        maxWidth: {
          '1/4': '25%',
          '1/2': '50%',
          '3/4': '75%',
          'xxs': '16rem'
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