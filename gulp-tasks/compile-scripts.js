const { dest, src } = require('gulp');
const webpack = require('webpack-stream');
const plumber = require('gulp-plumber');

const config = require('../gulp.config.js')();
const webpackConfig = require('../webpack.config');

module.exports = () => src(config.paths.scripts.entry)
    .pipe(plumber())
    .pipe(webpack(webpackConfig))
    .pipe(dest(config.paths.scripts.dist));
