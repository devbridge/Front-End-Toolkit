const { src } = require('gulp');
const connect = require('gulp-connect');

const config = require('../gulp.config.js')();

const liveReload = () => src(
    config.paths.html.src,
    config.paths.scss.src,
    config.paths.images.src,
    config.paths.sprite.src,
).pipe(connect.reload());

module.exports = liveReload;
