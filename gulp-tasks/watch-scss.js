const { series, watch } = require('gulp');

const config = require('../gulp.config.js')();

const compileScss = require('./compile-scss');
const liveReload = require('./live-reload');

const watchScss = () => watch(
    config.paths.scss.src,
    series(compileScss, liveReload),
);

module.exports = watchScss;
