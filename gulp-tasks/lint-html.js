const { src } = require('gulp');
const lint = require('gulp-htmlhint');

const config = require('../gulp.config.js')();

const lintHtml = () => src(config.paths.html.src).pipe(lint()).pipe(lint.reporter());

module.exports = lintHtml;
