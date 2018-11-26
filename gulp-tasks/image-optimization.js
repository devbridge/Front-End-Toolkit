module.exports = function () {
    const imagemin = require('gulp-imagemin'),
        cache = require('gulp-cache'),
        gulp = require('gulp'),
        imageminPngquant = require('imagemin-pngquant'),
        imageminZopfli = require('imagemin-zopfli'),
        imageminMozjpeg = require('imagemin-mozjpeg'), //need to run 'brew install libpng'
        imageminGiflossy = require('imagemin-giflossy'),
        config = require('../gulp.config.js')();

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
