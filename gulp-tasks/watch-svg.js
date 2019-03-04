const { series, watch } = require('gulp');

const config = require('../gulp.config.js')();

const createSvgSprite = require('./create-svg-sprite');
const liveReload = require('./live-reload');

const watchSvg = () => watch(
    config.paths.sprite.src,
    series(createSvgSprite, liveReload),
);

module.exports = watchSvg;
