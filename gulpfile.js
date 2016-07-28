var gulp = require('gulp'),
	config = require('./gulp/gulp.config.js')();
var path = {
	HTML: '/index.html',
	ALL: ['scripts/**/*.jsx', 'scripts/**/*.js'],
	MINIFIED_OUT: 'build.min.js',
	DEST_SRC: 'scripts',
	DEST_BUILD: 'scripts',
	DEST: 'dist'
};
gulp.task('check-deps', function () {
	require('check-dependencies')({
		install: true,
		verbose: false
	});
});

gulp.task('webpack', [], function() {
	var gulp = require('gulp');
	var uglify = require('gulp-uglify');
	var sourcemaps = require('gulp-sourcemaps');
	var webpackConfig = require("./webpack.config.js");
	var stream = require('webpack-stream');

	return gulp.src(path.ALL)
		.pipe(sourcemaps.init())
		.pipe(stream(webpackConfig))
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task('clear-image-cache', function (done) {
	var cache = require('gulp-cache');
	return cache.clearAll(done);
});

gulp.task('watch-webpack', function() {
	var gulp = require('gulp');
	var concat = require('gulp-concat');
	var uglify = require('gulp-uglify');
	var sourcemaps = require('gulp-sourcemaps');
	var gutil = require("gulp-util");
	var webpack = require("webpack");
	var WebpackDevServer = require("webpack-dev-server");
	var webpackConfig = require("./webpack.config.js");
	var stream = require('webpack-stream');

	// modify some webpack config options
	var myConfig = Object.create(webpackConfig);
	myConfig.devtool = "eval";
	myConfig.debug = true;

	// Start a webpack-dev-server
	new WebpackDevServer(webpack(myConfig), {
		publicPath: "/" + myConfig.output.publicPath,
		hot: true,
		stats: {
			colors: true
		}
	}).listen(8080, "localhost", function(err) {
		if (err) throw new gutil.PluginError("webpack-dev-server", err);
		gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
	});
	gulp.watch(path.ALL, ['webpack']);
});

gulp.task('optimize:images', function() {
	var imagemin = require('gulp-imagemin');
	var cache = require('gulp-cache');
	return gulp.src(config.optimize.images.src)
		.pipe(cache(imagemin(config.optimize.images.options)))
		.pipe(gulp.dest(config.optimize.images.dest));
});

gulp.task('optimize:images', function() {
	var imagemin = require('gulp-imagemin');
	var cache = require('gulp-cache');
	return gulp.src(config.optimize.images.src)
		.pipe(cache(imagemin(config.optimize.images.options)))
		.pipe(gulp.dest(config.optimize.images.dest));
});

gulp.task('watch-images-optimize', function() {
	gulp.watch(config.optimize.images.src, ['optimize:images']);
});

gulp.task('scss-linting', function() {
	var scsslint = require('gulp-scss-lint'),
		gulpif = require('gulp-if'),
		argv = require('yargs').argv;

	gulp.src(['./scss/**/*.scss', '!./scss/**/*_scsslint_tmp*.scss', '!./scss/vendor/**/*.scss', '!./scss/base/_svg-sprite-map.scss', '!./scss/base/_svg-sprite-template.scss'])
		.pipe(gulpif(!argv.nolint, scsslint()));
});


gulp.task('develop', ['check-deps', 'clear-image-cache', 'watch-scss', 'watch-svg', 'watch-webpack', 'watch-images-optimize']);

// Compile SASS
require('gulp-task-loader')('gulp/compile-scss');

// Create SVG sprite
require('gulp-task-loader')('gulp/create-svg-sprite');

// Watch
require('gulp-task-loader')('gulp/watch-tasks');