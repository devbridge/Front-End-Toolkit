const { dest, src, series } = require('gulp');
const plumber = require('gulp-plumber');
const raster = require('gulp-raster-update');
const rename = require('gulp-rename');
const svgSprite = require('gulp-svg-sprite');
const logger = require('gulplog');

const config = require('../gulp.config.js')();

const createSprite = () => src(config.paths.sprite.src)
    .pipe(plumber({
        errorHandler: (err) => {
            logger.error.log(err);
            this.emit('end');
        },
    }))
    .pipe(svgSprite(config.options.svgSprite))
    .pipe(dest(config.paths.root));

const createPngFallback = () => src(config.paths.sprite.src)
    .pipe(plumber({
        errorHandler: (err) => {
            logger.error.log(err);
            this.emit('end');
        },
    }))
    .pipe(raster())
    .pipe(rename({ extname: '.png' }))
    .pipe(dest(config.paths.sprite.dist));

const createSvgSprite = config.enable.pngFallback
    ? series(createSprite, createPngFallback) : series(createSprite);

module.exports = createSvgSprite;
