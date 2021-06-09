/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

module.exports = {
  style: {
    sass: {
      loaderOptions: (sassLoaderOptions) => {
        return {
          ...sassLoaderOptions,
          sassOptions: {
            includePaths: ['node_modules/foundation-sites/scss'],
          },
        }
      },
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
