module.exports = function () {
    const gulp = require('gulp');
    const eslint = require('gulp-eslint');
    const config = require('../gulp.config.js')();
    const _ = require('lodash');

    return gulp.src(_.map(config.custom.foldersToLint, (folder) => `${folder}/**/*.js`))
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
};
