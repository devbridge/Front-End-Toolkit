module.exports = function () {
	var gulp = require('gulp'),
		uglify = require('gulp-uglify'),
		sourcemaps = require('gulp-sourcemaps'),
		webpackConfig = require("../webpack.config.js"),
		config = require('../gulp.config.js')(),
		stream = require('webpack-stream');

	return gulp.src(config.path.ALL)
		.pipe(sourcemaps.init())
		.pipe(stream(webpackConfig))
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(config.path.DEST_BUILD));
};



