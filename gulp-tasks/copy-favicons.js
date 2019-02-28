module.exports = function () {
    const gulp = require('gulp');
    const config = require('../gulp.config.js')();

	return gulp.src(config.path.FAVICONS_SRC)
		.pipe(gulp.dest(config.path.FAVICONS_DIST));
};
