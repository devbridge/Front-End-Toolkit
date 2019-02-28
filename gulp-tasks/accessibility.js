module.exports = function () {
    const access = require('gulp-accessibility');
    const gulp = require('gulp');
    const config = require('../gulp.config.js')();

    return gulp.src(config.html.src)
        .pipe(access({
            force: true,
            reportLevels: {
                notice: false,
                warning: false,
                error: true
            },
            browser: false,
            accessibilityLevel: 'WCAG2A'
        }))
        .on('error', console.log)
        .pipe(access.report({reportType: 'txt'}))
        .pipe(gulp.dest('reports/txt'));
};
