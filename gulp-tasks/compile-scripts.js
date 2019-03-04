const { dest, src } = require('gulp');
const webpack = require('webpack-stream');
const plumber = require('gulp-plumber');

const config = require('../gulp.config.js')();
const webpackConfig = require('../webpack.config');

const compileScripts = () => src(config.paths.scripts.entry)
    .pipe(plumber())
    .pipe(webpack(webpackConfig))
    .pipe(dest(config.paths.scripts.dist));

module.exports = compileScripts;
