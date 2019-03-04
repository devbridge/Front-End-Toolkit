const { parallel, series } = require('gulp');

const clean = require('./clean');
const clearImageCache = require('./clear-image-cache');
const liveServer = require('./live-server');
const prepareAssets = require('./prepare-assets');
const prepareConfig = require('./prepare-config');
const watchScripts = require('./watch-scripts');
const watchScss = require('./watch-scss');
const watchSvg = require('./watch-svg');
const watchHtmlRenderer = require('./watch-htmlrender');
const watchImagesOptimization = require('./watch-images-optimization');

module.exports = series(
    clean,
    prepareAssets,
    prepareConfig,
    clearImageCache,
    parallel(watchScss, watchHtmlRenderer, watchScripts, watchSvg, watchImagesOptimization),
    liveServer,
);
