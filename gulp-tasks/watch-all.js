const gulp = require('gulp');

module.exports = function () {
	gulp.start(['check-deps', 'watch-scss', 'watch-svg']);
};
