module.exports = function () {
    const imagemin = require('gulp-imagemin');
    const cache = require('gulp-cache');
    const gulp = require('gulp');
    const config = require('../gulp.config.js')();
    const imageminPngquant = require('imagemin-pngquant');
    const imageminZopfli = require('imagemin-zopfli');
    const imageminMozjpeg = require('imagemin-mozjpeg'); //need to run 'brew install libpng'
    const imageminGiflossy = require('imagemin-giflossy');

    return gulp.src(config.optimize.images.src)
        .pipe(cache(imagemin([
            //png
            imageminPngquant({
                speed: 1,
                quality: 98 //lossy settings
            }),
            imageminZopfli({
                more: true
                // iterations: 50 // very slow but more effective
            }),
            //gif
            // imagemin.gifsicle({
            //     interlaced: true,
            //     optimizationLevel: 3
            // }),
            //gif very light lossy, use only one of gifsicle or Giflossy
            imageminGiflossy({
                optimizationLevel: 3,
                optimize: 3, //keep-empty: Preserve empty transparent frames
                lossy: 2
            }),
            //svg
            imagemin.svgo({
                plugins: [{
                    removeViewBox: false
                }]
            }),
            //jpg lossless
            imagemin.jpegtran({
                progressive: true
            }),
            //jpg very light lossy, use vs jpegtran
            imageminMozjpeg({
                quality: 90
            })
        ])))
        .pipe(gulp.dest(config.optimize.images.dest));
};
