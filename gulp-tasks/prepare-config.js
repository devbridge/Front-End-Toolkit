module.exports = function () {
    const gulp = require('gulp'),
        config = require('../gulp.config.js')(),
        rename = require('gulp-rename');

    return gulp.src(config.environmentConfig.source)
        .pipe(rename('env.js'))
        .pipe(gulp.dest(config.path.DEST));
};
