const { AureliaPlugin } = require('aurelia-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');
const { resolve } = require('path');

module.exports = function (mode) {
  return {
    mode: mode || 'development',
    resolve: {
      extensions: ['.ts', '.js'],
      modules: [
        resolve(__dirname, 'src'),
        resolve(__dirname, 'node_modules')
      ]
    },
    entry: {
      // the 'aurelia-bootstrapper' entry point is responsible for resolving your app code
      app: ['aurelia-bootstrapper']
    },
    output: {
      filename: '[name].js',
      path: resolve(__dirname, 'dist')
    },
    watch: mode === 'development',
    devtool: mode === 'development' ? 'inline-source-map' : 'source-map',
    devServer: {
      contentBase: './dist'
    },
    module: {
      rules: [
        { test: /\.html$/i, loader: 'html-loader' },
        { test: /\.ts$/i, loader: 'ts-loader' }
      ]
    },
    plugins: [
      // the AureliaPlugin translates Aurelia's conventions to something Webpack understands
      // and must be included in order for Webpack to work
      new AureliaPlugin(),
      // define global object given by user or commond line
      new DefinePlugin({
        GLOBAL_ENV: JSON.stringify({
          production: mode === 'production'
        })
      }),
      new HtmlWebpackPlugin({
        template: 'index.ejs',
        hash: mode !== 'production' ? false : true,
        // predefine meta tag
        meta: {
          viewport: 'width=device-width, initial-scale=1'
        },
        metadata: {
          title: 'Aurelia Quick Start',
          dev: mode !== 'production'
        }
      })
    ]
  };
};
