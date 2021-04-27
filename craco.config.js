/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

module.exports = {
  style: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
  webpack: {
    alias: {
      '~lib': path.resolve(__dirname, 'src/lib'),
      '~components': path.resolve(__dirname, 'src/components'),
      '~containers': path.resolve(__dirname, 'src/containers'),
    },
  },
}
