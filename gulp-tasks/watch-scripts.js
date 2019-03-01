const { series, watch } = require('gulp');

const config = require('../gulp.config.js')();

module.exports = () => watch(
    config.paths.scripts.all,
    series('compile-js', 'live-reload'),
);
