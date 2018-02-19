module.exports = function () {
	var gulp = require('gulp');
	gulp.start(['check-deps', 'watch-scss', 'watch-svg']);
};
