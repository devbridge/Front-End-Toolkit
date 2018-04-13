const gulp = require('gulp'),
    connect = require('gulp-connect'),
    config = require('../gulp.config.js')();

module.exports = function () {
    gulp.src(
        config.html.src,
        config.scss.src,
        config.optimize.images.src,
        config.svg.sourceFolder + '**/*.svg'
    ).pipe(connect.reload());
};
