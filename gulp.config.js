module.exports = function () {
	var svg = {
		sourceFolder: 'scss/assets/icons/',
		spriteFolder: 'content/styles/images/',
		scssMapFolder: 'scss/base/',
		pngFallback: false
	};
	var config = {
			path: {
				HTML: '/index.html',
				ALL: ['scripts/**/*.jsx', 'scripts/**/*.js'],
				MINIFIED_OUT: 'build.min.js',
				DEST_SRC: 'scripts',
				DEST_BUILD: 'scripts',
				DEST: 'dist'
			},
			svg: {
				sourceFolder: svg.sourceFolder,
				spriteFolder: svg.spriteFolder,
				scssMapFolder: svg.scssMapFolder,
				pngFallback: svg.pngFallback
			},
			scss: {
				src: [
					'./scss/**/*.scss',
					'!scss/**/*_scsslint_tmp*.scss' //ignores temporary scss-lint files
				],
				cssFolder: 'content/styles/'
			}
			,
			optimize: {
				css: {}
				,
				js: {}
				,
				images: {
					src: 'content/images/originals/**/*.{png,gif,jpg,svg}',
					dest: 'content/images/',
					options: {                       // Target options
						optimizationLevel: 7,
						svgoPlugins: [{removeViewBox: false}],
						progessive: true,
						interlaced: true
					}
				}
			}
			,
			svgConfig: {
				shape: {
					spacing: {
						padding: 0
					}
				}
				,
				mode: {
					css: {
						bust: false,
						dest: './',
						// layout: 'vertical', 'horizontal', 'diagonal'
						sprite: svg.spriteFolder + 'sprite.svg',
						render: {
							scss: {
								dest: svg.scssMapFolder + '_svg-sprite-map.scss',
								template: svg.scssMapFolder + '_svg-sprite-template.scss'
							}
						}
					}
				}
			}
			,
		}
		;

	return config;
};



