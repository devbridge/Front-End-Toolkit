const { dest, src, series } = require('gulp');
const plumber = require('gulp-plumber');
const raster = require('gulp-raster-update');
const rename = require('gulp-rename');
const svgSprite = require('gulp-svg-sprite');
const logger = require('gulplog');

const config = require('../gulp.config.js')();

const createSvgSprite = cb => src(config.paths.sprite.src)
    .pipe(plumber({
        errorHandler: (err) => {
            logger.error.log(err);
            this.emit('end');
        },
    }))
    .pipe(svgSprite(config.options.svgSprite))
    .pipe(dest(config.paths.root));

const createPngSprite = cb => src(config.paths.sprite.src)
    .pipe(plumber({
        errorHandler: (err) => {
            logger.error.log(err);
            this.emit('end');
        },
    }))
    .pipe(raster())
    .pipe(rename({ extname: '.png' }))
    .pipe(dest(config.paths.sprite.dist));

if (config.enable.pngFallback) {
    module.exports = series(createSvgSprite, createPngSprite);
} else {
    module.exports = series(createSvgSprite);
}
