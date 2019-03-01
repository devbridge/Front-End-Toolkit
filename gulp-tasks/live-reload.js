const gulp = require('gulp');
const connect = require('gulp-connect');

const config = require('../gulp.config.js')();

module.exports = () => {
    gulp
        .src(
            config.html.src,
            config.paths.scss.src,
            config.paths.images.src,
            config.paths.sprite.src,
        )
        .pipe(connect.reload());
};
