module.exports = function() {
    var gulp = require('gulp'),
        config = require('../gulp.config.js')(),
        sass = require('gulp-sass'),
        sourcemaps = require('gulp-sourcemaps'),
        csso = require('gulp-csso'),
        autoprefixer = require('gulp-autoprefixer');

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
