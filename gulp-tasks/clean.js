const gulp = require('gulp');
const del = require('del');

const config = require('../gulp.config.js')();

module.exports = () => del(config.paths.dest);
