module.exports = function () {
	var gulp = require('gulp'),
		config = require('../gulp.config.js')();

	return gulp.watch(config.svg.sourceFolder + '**/*.svg', function () {
		// Create SVG sprite
		require('gulp-task-loader')('gulp/create-svg-sprite');
		gulp.start('create-svg-sprite');
	});

};

