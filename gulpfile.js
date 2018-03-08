var gulp = require('gulp'),
    config = require('./gulp.config.js')();

// Load all tasks from gulp-tasks folder

gulp.task("develop-safe", function () {
    return require("check-dependencies")({
        install: true,
        verbose: true
    }, function () {
        require('gulp-task-loader')();

        return gulp.start('develop');
    });
});

gulp.task("develop-plain", function () {
    require('gulp-task-loader')();

    return gulp.start('develop');
});

