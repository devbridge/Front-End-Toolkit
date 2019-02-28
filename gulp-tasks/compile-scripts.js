module.exports = function() {
    const gulp = require('gulp');
    const config = require('../gulp.config.js')();
    const webpack = require('webpack-stream');
    const webpackConfig = require('../webpack.config');
    const plumber = require('gulp-plumber');

    return gulp.src(config.path.ENTRY)
        .pipe(plumber())
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest(config.path.DEST));
};
