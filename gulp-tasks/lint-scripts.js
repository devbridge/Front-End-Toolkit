const { src } = require('gulp');
const eslint = require('gulp-eslint');

const config = require('../gulp.config.js')();

module.exports = () => src(config.paths.scriptsLint.src)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
