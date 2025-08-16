/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./src/**/*.{html,js}", './*.js'],
  theme: {
    extend: {
      colors: {
        love: {
          pink: '#FF6B8B',
          red: '#FF3366',
          purple: '#C955E8',
          blue: '#6A8FFF'
        }
      },
      fontFamily: {
        romantic: ['Dancing Script', 'cursive', 'sans-serif']
      }
    },
  },
  plugins: [],
}