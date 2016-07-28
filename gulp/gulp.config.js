module.exports = function () {
	var config = {
		scss: {
			src: [
				'./scss/**/*.scss',
				'!scss/**/*_scsslint_tmp*.scss' //ignores temporary scss-lint files
			],
			cssFolder: 'content/styles/'
		},
		svg: {
			sourceFolder: 'scss/assets/icons/',
			spriteFolder: 'content/styles/images/',
			scssMapFolder: 'scss/base/',
			pngFallback: false
		},
		optimize: {
			css: {},
			js: {},
			images: {
				src: 'content/images/originals/**/*.{png,gif,jpg,svg}',
				dest: 'content/images/',
				options: {                       // Target options
					optimizationLevel: 7,
					svgoPlugins: [{removeViewBox: false}],
					progessive: true,
					interlaced: true
				},
			}
		}
	};

	return config;
};



