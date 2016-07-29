module.exports = function () {
	var scsslint = require('gulp-scss-lint'),
		gulp = require('gulp'),
		gulpif = require('gulp-if'),
		argv = require('yargs').argv,
		config = require('../gulp.config.js')();

	return gulp.src(['./scss/**/*.scss', '!./scss/**/*_scsslint_tmp*.scss', '!./scss/vendor/**/*.scss', '!./scss/base/_svg-sprite-map.scss', '!./scss/base/_svg-sprite-template.scss'])
		.pipe(gulpif(!argv.nolint, scsslint()));
};


