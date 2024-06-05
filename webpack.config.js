const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const config = {
  mode: process.argv.includes('--production') ? 'production' : 'development',
  entry: {
    'immediate-loading': './src/assets/scripts/immediate-loading.js',
    home: './src/assets/scripts/home.js',
    index: './src/assets/scripts/index-app.js',
    news: './src/assets/scripts/news.js',
    contacts: './src/assets/scripts/contacts.js',
    location: './src/assets/scripts/location.js',
    common: './src/assets/scripts/common.js',
  },
  output: {
    filename: '[name].bundle.js',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks(chunk) {
            // exclude `my-excluded-chunk`
            return chunk.name !== 'immediate-loading' && chunk.name !== 'menu3d' && chunk.name !== 'common';
          },
        },
      },
    },
  },
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true,
      uglifyOptions: {
        compress: {
          drop_console: process.argv.includes('--production'),
        },
      },
    }),
  ],
};

module.exports = config;
