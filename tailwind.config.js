module.exports = {
  purge: {
    content: [
      './src/*.js',
      './src/*.jsx'
    ],
    options: {
      whitelist: ['bg-color-500']
    }
  },
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
}
