const { series, watch } = require('gulp');

const config = require('../gulp.config.js')();

module.exports = () => watch(
    config.paths.sprite.src,
    series('create-svg-sprite', 'live-reload'),
);
