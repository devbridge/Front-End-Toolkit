var gulp = require('gulp'),
	config = require('./gulp.config.js')();

// Load all tasks from gulp-tasks folder
require('gulp-task-loader')();

gulp.task("check-deps", function () {
	return require("check-dependencies")({
		install: true,
		verbose: false
	});
});