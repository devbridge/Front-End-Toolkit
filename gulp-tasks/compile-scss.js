module.exports = function() {
    const gulp = require('gulp');
    const config = require('../gulp.config.js')();
    const sass = require('gulp-sass');
    const sourcemaps = require('gulp-sourcemaps');
    const csso = require('gulp-csso');
    const autoprefixer = require('gulp-autoprefixer');

    function swallowError(error) {
        // If you want details of the error in the console
        console.log('\x1b[36m', error.toString(), '\x1b[0m');
        this.emit('end');
    }

    return gulp.src(config.scss.src)
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded',
            sourceMap: true,
            noCache: false,
            includePaths: [].concat(config.tmp)
        }))
        .on('error', swallowError)
        .pipe(csso())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.scss.cssFolder));
};
