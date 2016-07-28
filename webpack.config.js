var path = require('path'),
	webpack = require("webpack");

function fromRootDir(matchPath) {
	return new RegExp(process.cwd() + matchPath);
}

module.exports = {
	cache: true,
	debug: true,
	devServer: {
		contentBase: './static',
		hot: true,
		stats: {
			colors: true
		}
	},
	devtool: 'eval',
	entry: './scripts/main.js',
	output: {
		path: path.join(__dirname, "build"),
		filename: 'build.min.js'
	},
	resolve: {
		extensions: ['', '.js', '.json', '.coffee']
	}

};
