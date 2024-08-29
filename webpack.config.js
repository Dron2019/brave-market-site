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
    documents: './src/assets/scripts/documents.js',
    about: './src/assets/scripts/about.js',
    location: './src/assets/scripts/location.js',
    'interactive-map': './src/assets/scripts/interactive-map.js',
    common: './src/assets/scripts/common.js',
    'for-tenants': './src/assets/scripts/for-tenants.js',
  },
  output: {
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.mjs$/,
        include: /node_modules\/(@studio-freight\/lenis)/,
        type: 'javascript/auto',
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks(chunk) {
            // exclude `my-excluded-chunk`
            return (
              chunk.name !== 'immediate-loading' &&
              chunk.name !== 'menu3d' &&
              chunk.name !== 'common'
            );
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
