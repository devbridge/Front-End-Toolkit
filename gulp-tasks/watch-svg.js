module.exports = function () {
	var gulp = require('gulp'),
		config = require('../gulp.config.js')();

	return gulp.watch(config.svg.sourceFolder + '**/*.svg', ['create-svg-sprite']);
};
