const gulp = require('gulp');

const config = require('../gulp.config.js')();

module.exports = () => gulp
    .src(config.paths.favicons.src)
    .pipe(gulp.dest(config.paths.favicons.dist));
