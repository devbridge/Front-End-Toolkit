module.exports = function (done) {
	const cache = require('gulp-cache');
	return cache.clearAll(done);
};
