const { series, watch } = require('gulp');

const config = require('../gulp.config.js')();

module.exports = () => watch(
    config.paths.images.src,
    series('image-optimization', 'live-reload'),
);
