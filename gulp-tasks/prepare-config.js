module.exports = function () {
    const gulp = require('gulp');
    const config = require('../gulp.config.js')();
    const rename = require('gulp-rename');

    return gulp.src(config.environmentConfig.source)
        .pipe(rename('env.js'))
        .pipe(gulp.dest(config.path.DEST));
};
