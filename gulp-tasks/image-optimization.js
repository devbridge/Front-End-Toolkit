module.exports = function () {
	var imagemin = require('gulp-imagemin'),
		cache = require('gulp-cache'),
		gulp = require('gulp'),
		config = require('../gulp.config.js')();

	return gulp.src(config.optimize.images.src)
		.pipe(cache(imagemin([
			imagemin.optipng({optimizationLevel: 7})
		])))
		.pipe(gulp.dest(config.optimize.images.dest));
};
