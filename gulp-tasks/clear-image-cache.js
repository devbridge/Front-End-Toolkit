const cache = require('gulp-cache');

const clearImageCache = cb => cache.clearAll(cb);

module.exports = clearImageCache;
