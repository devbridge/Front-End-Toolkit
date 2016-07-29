module.exports = function () {
	var gulp = require('gulp'),
		concat = require('gulp-concat'),
		uglify = require('gulp-uglify'),
		sourcemaps = require('gulp-sourcemaps'),
		gutil = require("gulp-util"),
		webpack = require("webpack"),
		WebpackDevServer = require("webpack-dev-server"),
		webpackConfig = require("../../webpack.config.js"),
		config = require('../../gulp.config.js')(),
		stream = require('webpack-stream');

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
	gulp.watch(config.path.ALL, ['webpack']);
};

