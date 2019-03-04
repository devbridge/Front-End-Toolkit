const gulp = require('gulp');
const logger = require('gulplog');
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

const config = require('../gulp.config.js')();

const compileScss = () => {
    function swallowError(error) {
        // If you want details of the error in the console
        logger.warn('\x1b[36m', error.toString(), '\x1b[0m');
        this.emit('end');
    }

    return gulp
        .src(config.paths.scss.src)
        .pipe(sourcemaps.init())
        .pipe(sass(config.options.sass))
        .on('error', swallowError)
        .pipe(csso(config.options.csso))
        .pipe(autoprefixer(config.options.autoprefixer))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.paths.scss.dist));
};

module.exports = compileScss;
