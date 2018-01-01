module.exports = function() {
    var gulp = require('gulp'),
        config = require('../gulp.config.js')(),
        plumber = require('gulp-plumber'),
        sass = require('gulp-sass'),
        bourbon = require('bourbon').includePaths,
        sourcemaps = require('gulp-sourcemaps'),
        neat = require('node-neat').includePaths,
        csso = require('gulp-csso'),
        autoprefixer = require('gulp-autoprefixer');

    var options = {
        includePaths: neat,
        outputStyle: 'nested', // 'compressed'
        sourceComments: false
    };

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
            includePaths: [].concat(neat, bourbon, config.tmp)
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


