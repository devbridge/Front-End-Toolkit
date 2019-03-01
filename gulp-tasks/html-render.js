const { dest, src } = require('gulp');
const htmlRender = require('gulp-htmlrender');

const config = require('../gulp.config.js')();

module.exports = () => src(config.paths.html.src, { read: false })
    .pipe(htmlRender.render())
    .pipe(dest(config.paths.html.dist));
