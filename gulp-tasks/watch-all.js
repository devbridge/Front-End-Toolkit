module.exports = function () {
    const gulp = require('gulp');

    gulp.start([
        'check-deps',
        'watch-scss',
        'watch-scripts',
        'watch-svg'
    ]);
};
