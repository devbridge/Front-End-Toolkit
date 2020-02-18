const { dest, src } = require('gulp');
const htmlRenderer = require('gulp-htmlrender');

const config = require('../gulp.config.js')();

const renderHtml = () => src(config.paths.html.src, { read: false })
    .pipe(htmlRenderer.render())
    .pipe(dest(config.paths.html.dist));

module.exports = renderHtml;
