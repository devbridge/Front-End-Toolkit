module.exports = function () {
	var gulp = require('gulp'),
		config = require('../gulp.config.js')();

	gulp.watch(config.scss.src, ['compile-scss', 'scss-linting']);
};
