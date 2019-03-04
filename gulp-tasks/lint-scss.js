const { src } = require('gulp');
const gulpIf = require('gulp-if');
const sassLint = require('gulp-sass-lint');
const { argv } = require('yargs');

const config = require('../gulp.config.js')();

const lintScss = () => src(config.paths.scssLint.src)
    .pipe(gulpIf(!argv.nolint, sassLint()))
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());

module.exports = lintScss;
