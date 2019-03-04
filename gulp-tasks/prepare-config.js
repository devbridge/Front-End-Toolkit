const { dest, src } = require('gulp');
const rename = require('gulp-rename');

const config = require('../gulp.config.js')();

const prepareConfig = () => src(config.paths.env.src)
    .pipe(rename('env.js'))
    .pipe(dest(config.paths.dist));

module.exports = prepareConfig;
