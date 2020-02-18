const gulp = require('gulp');
const del = require('del');

const config = require('../gulp.config.js')();

const clean = () => del(config.paths.clean.src);

module.exports = clean;
