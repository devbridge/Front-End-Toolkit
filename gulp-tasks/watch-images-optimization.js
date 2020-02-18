const { series, watch } = require('gulp');

const config = require('../gulp.config.js')();

const optimizeImages = require('./optimize-images');
const liveReload = require('./live-reload');

const watchImages = () => watch(
    config.paths.images.src,
    series(optimizeImages, liveReload),
);

module.exports = watchImages;
