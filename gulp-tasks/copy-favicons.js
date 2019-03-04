const { dest, src } = require('gulp');

const config = require('../gulp.config.js')();

const copyFavicons = () => src(config.paths.favicons.src)
    .pipe(dest(config.paths.favicons.dist));

module.exports = copyFavicons;
