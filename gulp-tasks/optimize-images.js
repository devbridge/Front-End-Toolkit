const { dest, src } = require('gulp');
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const imageminGiflossy = require('imagemin-giflossy');
const imageminMozjpeg = require('imagemin-mozjpeg'); // Need to run 'brew install libpng'
const imageminPngquant = require('imagemin-pngquant');
const imageminZopfli = require('imagemin-zopfli');

const config = require('../gulp.config.js')();

const optimizeImages = () => src(config.paths.images.src)
    .pipe(cache(imagemin([
        /*
        * PNG
        * Reference: https://github.com/imagemin/imagemin-pngquant
        */
        imageminPngquant(config.options.pngquant),

        /*
        * Reference: https://github.com/imagemin/imagemin-zopfli
        */
        imageminZopfli(config.options.zopfli),

        /*
        * GIF
        * Reference: https://github.com/jihchi/imagemin-giflossy
        */
        imageminGiflossy(config.options.giflossy),

        /*
        * SVG
        * Reference: https://github.com/imagemin/imagemin-svgo
        */
        imagemin.svgo(config.options.svgo),

        /*
        * JPEG
        * Reference: https://github.com/imagemin/imagemin-jpegtran
        */
        imagemin.jpegtran(config.options.jpegtran),

        /*
        * Reference: https://github.com/imagemin/imagemin-mozjpeg
        */
        imageminMozjpeg(config.options.mozjpeg),
    ], {
        name: 'images',
    })))
    .pipe(dest(config.paths.images.dist));

module.exports = optimizeImages;
