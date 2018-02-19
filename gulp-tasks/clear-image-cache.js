module.exports = function (done) {
	var cache = require('gulp-cache');
	return cache.clearAll(done);
};
