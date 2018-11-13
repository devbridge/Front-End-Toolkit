const path = require('path');
const webpack = require('webpack');
const config = require('./gulp.config.js')();
const SRC_DIR  = path.resolve(__dirname, "./"+config.src);
const DIST_DIR = path.resolve(__dirname, "./"+config.dist);
const ENV = process.env.npm_lifecycle_event;
const isProd = ENV && ENV.startsWith("build");

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: SRC_DIR+config.path.ENTRY,
  output: {
    path: DIST_DIR,
    filename: '[name].js',
    publicPath: "/"+config.dist
  },
  module: {
    rules: [{
      enforce: "pre",
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use:[{
        loader: "eslint-loader",
      }]
    },
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: [
        'babel-loader'
      ]
    }]
  },
  context: SRC_DIR,
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@': resolve(__dirname, './src/'),
      '@components': resolve(__dirname, './src/components/'),
    },
    modules: ["node_modules"],
  },
  devtool: '#eval-source-map',
  watch: true
}

if (isProd) {
  module.exports.devtool = '#source-map';
  module.exports.watch = false;
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
