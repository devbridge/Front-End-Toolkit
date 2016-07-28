module.exports = function () {
	var gulp = require('gulp'),
		config = require('../gulp.config.js')();

	gulp.start(['check-deps', 'watch-scss', 'watch-svg']);
};

