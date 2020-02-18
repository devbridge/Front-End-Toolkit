const { series, watch } = require('gulp');

const config = require('../gulp.config.js')();

const compileScripts = require('./compile-scripts');
const liveReload = require('./live-reload');

const watchScripts = () => watch(
    config.paths.scripts.all,
    series(compileScripts, liveReload),
);

module.exports = watchScripts;
