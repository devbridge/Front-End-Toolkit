const gulp = require('gulp');
const rename = require('gulp-rename');

module.exports = function () {

    return gulp.src('./.pre-commit')
        .pipe(rename('pre-commit'))
        .pipe(gulp.dest('./.git/hooks'));
};
