module.exports = function () {
	var sassLint = require('gulp-sass-lint'),
		gulp = require('gulp'),
		gulpif = require('gulp-if'),
		argv = require('yargs').argv,
		config = require('../gulp.config.js')();

	return gulp.src(config.scss.lint)
		.pipe(gulpif(!argv.nolint, sassLint()))
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError());
};
