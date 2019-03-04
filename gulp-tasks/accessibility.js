const access = require('gulp-accessibility');
const { dest, src } = require('gulp');
const logger = require('gulplog');

const config = require('../gulp.config.js')();

const accessibility = () => src(config.paths.accessibility.src)
    .pipe(access(config.options.accessSniff))
    .on('error', logger.error)
    .pipe(access.report(config.options.accessSniffReport))
    .pipe(dest(config.paths.accessibility.dist));

module.exports = accessibility;
