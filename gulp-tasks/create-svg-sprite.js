module.exports = function () {
	var gulp = require('gulp'),
		plumber = require('gulp-plumber'),
		svg2png = require('gulp-svg2png'),
		config = require('../gulp.config.js')(),
		svgSprite = require('gulp-svg-sprite');

	gulp.task('svg-sprite', function () {
		gulp.src(config.svg.sourceFolder + '*.svg')
			.pipe(plumber({
				errorHandler: function (err) {
					console.log(err);
					this.emit('end');
				}
			}))
			.pipe(svgSprite(config.svgConfig))
			.pipe(gulp.dest('./'));
	});

	gulp.task('png-sprite', ['svg-sprite'], function () {
		gulp.src(config.svg.spriteFolder + '*.svg')
			.pipe(plumber({
				errorHandler: function () {
					console.log(err);
					this.emit('end');
				}
			}))
			.pipe(svg2png())
			.pipe(gulp.dest(config.svg.spriteFolder));
	});

	if (config.svg.pngFallback) {
		gulp.start('png-sprite')
	} else {
		gulp.start('svg-sprite')
	}
};



