module.exports = function() {
    const gulp = require('gulp'),
        config = require('../gulp.config.js')(),
        webpack = require('webpack-stream'),
        webpackConfig = require('../webpack.config');

    return gulp.src(config.path.ENTRY)
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest(config.path.DEST));
};
