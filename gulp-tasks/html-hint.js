const { src } = require('gulp');
const htmlHint = require('gulp-htmlhint');

const config = require('../gulp.config.js')();

module.exports = () => src(config.paths.html.src).pipe(htmlHint()).pipe(htmlHint.reporter());
