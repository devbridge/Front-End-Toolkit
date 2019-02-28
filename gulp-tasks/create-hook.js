module.exports = function () {
    const gulp = require('gulp');
    const rename = require('gulp-rename');

    return gulp.src('./.pre-commit')
        .pipe(rename('pre-commit'))
        .pipe(gulp.dest('./.git/hooks'));
};
