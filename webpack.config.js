const path = require('path');
const webpack = require('webpack');

const config = require('./gulp.config.js')();
const alias = require('./webpack-config/alias');
const rules = require('./webpack-config/rules');

const SRC_DIR = path.resolve(__dirname, `./${config.paths.scripts.src}`);
const DIST_DIR = path.resolve(__dirname, `./${config.paths.scripts.dist}`);
const ENV = process.env.npm_lifecycle_event;
const isProd = ENV && ENV.startsWith('build');

module.exports = {
    entry: path.resolve(__dirname, config.paths.scripts.entry),
    output: {
        path: DIST_DIR,
        filename: '[name].js',
        publicPath: `/${config.paths.dist}`,
    },
    module: {
        rules,
    },
    context: SRC_DIR,
    resolve: {
        extensions: ['.js', '.json'],
        alias,
        modules: ['node_modules'],
    },
    devtool: '#eval-source-map',
    mode: isProd ? 'production' : 'development',
};

if (isProd) {
    module.exports.devtool = '#source-map';
    module.exports.watch = false;
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false,
            },
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
        }),
    ]);
}
