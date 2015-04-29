var gulp = require('gulp');

// Compile SASS
require('gulp-task-loader')('gulp/compile-scss');

// Create SVG sprite
require('gulp-task-loader')('gulp/create-svg-sprite');

// Optimize assets
require('gulp-task-loader')('gulp/optimize-assets');

// Watch
require('gulp-task-loader')('gulp/watch-tasks');