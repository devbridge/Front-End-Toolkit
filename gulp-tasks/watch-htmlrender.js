const { series, watch } = require('gulp');

const config = require('../gulp.config.js')();

const renderHtml = require('./render-html');
const liveReload = require('./live-reload');

const watchHtmlRender = () => watch(
    config.paths.html.src,
    series(renderHtml, liveReload),
);

module.exports = watchHtmlRender;
