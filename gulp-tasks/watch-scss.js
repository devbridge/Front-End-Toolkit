const { series, watch } = require('gulp');

const config = require('../gulp.config.js')();

module.exports = () => watch(
    config.paths.scss.src,
    series('compile-scss', 'live-reload'),
);
