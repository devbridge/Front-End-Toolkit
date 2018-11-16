module.exports = function () {
	const imagemin = require('gulp-imagemin');
    const cache = require('gulp-cache');
    const gulp = require('gulp');
    const config = require('../gulp.config.js')();

	return gulp.src(config.optimize.images.src)
		.pipe(cache(imagemin([
			imagemin.optipng({optimizationLevel: 7})
		])))
		.pipe(gulp.dest(config.optimize.images.dest));
};
