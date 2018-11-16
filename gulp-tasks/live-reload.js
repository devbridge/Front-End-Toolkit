const gulp = require('gulp');
const connect = require('gulp-connect');
const config = require('../gulp.config.js')();

module.exports = function () {
    gulp.src(
        config.html.src,
        config.scss.src,
        config.optimize.images.src,
        config.svg.sourceFolder + '**/*.svg'
    ).pipe(connect.reload());
};
