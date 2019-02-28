module.exports = function (done) {
    const gulp = require('gulp');
    const runSequence = require('run-sequence').use(gulp);
    const plumber = require('gulp-plumber');
    const svg2png = require('gulp-svg2png');
    const config = require('../gulp.config.js')();
    const svgSprite = require('gulp-svg-sprite');

    gulp.task('svg-sprite', function () {
        return gulp.src(config.svg.sourceFolder + '*.svg')
            .pipe(plumber({
                errorHandler: function (err) {
                    console.log(err);
                    this.emit('end');
                }
            }))
            .pipe(svgSprite(config.svgConfig))
            .pipe(gulp.dest('./'));
    });

    gulp.task('png-sprite', function () {
        return gulp.src(config.svg.spriteFolder + '*.svg')
            .pipe(plumber({
                errorHandler: function () {
                    console.log(err);
                    this.emit('end');
                }
            }))
            .pipe(svg2png())
            .pipe(gulp.dest(config.svg.spriteFolder));
    });

    if (config.svg.pngFallback) {
        runSequence('svg-sprite', 'png-sprite', done);
    } else {
        runSequence('svg-sprite', done);
    }
};
