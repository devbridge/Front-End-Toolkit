const gulp = require("gulp");
const connect = require('gulp-connect');

module.exports = function () {
    return connect.server({
        root: 'dist',
        port: '8000',
        livereload: true
    });
};
