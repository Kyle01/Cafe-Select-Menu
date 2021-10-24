const colors = require('tailwindcss/colors')

module.exports = {
  purge: {
    context: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    enabled: true,
    options: {
        safelist: {
            standard: [
              'z-0',
              'z-10',
              'z-20',
              'z-30',
              'z-40',
              'z-50',
            ]
        }
    },
  },
  darkMode: false,
  theme: {
    fontFamily: {
      'sans': ['Bitter'],
      'header': ['Berolina'],
      'title': ['Boecklins']
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      darkGreen: {
        'light': '#A2B9A9',
        'medium': '#3C5343',
        'dark': '#092010'
      },
      paleTan: {
        'light': '#FFFFEE',
        'medium': '#D7D7BB',
        'dark': '#717155'
      },
      paleBlue: {
        'light': '#D5E8F1',
        'medium': '#6F828B',
        'dark': '#091C25'
      },
      teaGreen: {
        'light': '#F7FFD5',
        'medium': '#C4D2A2',
        'dark': '#5E6C3C'
      },
      midnightBlue: {
        'light': '#D6CDFF',
        'medium': '#7067B5',
        'dark': '#0A014F'
      },
    },
  },
  variants: {
    extend: {
        opacity: [
            "disabled"
        ],
        backgroundColor: [
            "disabled"
        ],
        cursor: [
            "disabled"
        ]
    }
  },
  plugins: [],
}
