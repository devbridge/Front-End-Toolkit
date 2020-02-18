const { series } = require('gulp');

const clearImageCache = require('./clear-image-cache');
const prepareAssets = require('./prepare-assets');
const prepareConfig = require('./prepare-config');

const production = series(
    prepareAssets,
    prepareConfig,
    clearImageCache,
);

module.exports = production;
