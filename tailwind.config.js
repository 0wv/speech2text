const colors = require('tailwindcss/colors')

const production = !process.env.ROLLUP_WATCH

module.exports = {
  purge: {
    content: [
      './src/**/*.svelte'
    ],
    enabled: production
  },
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    colors: {
      gray: colors.trueGray,
      lime: colors.lime
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
