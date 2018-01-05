module.exports = function () {
	let htmlhint = require('gulp-htmlhint'),
		gulp = require('gulp'),
		config = require('../gulp.config.js')();

    return gulp.src(config.html.src)
        .pipe(htmlhint())
        .pipe(htmlhint.reporter())
};
