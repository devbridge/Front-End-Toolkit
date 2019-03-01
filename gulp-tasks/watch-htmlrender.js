const { series, watch } = require('gulp');

const config = require('../gulp.config.js')();

module.exports = () => watch(
    config.html.src,
    series('html-render', 'live-reload'),
);
