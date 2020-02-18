const { series } = require('gulp');

const compileScss = require('./compile-scss');
const compileScripts = require('./compile-scripts');
const copyFavicons = require('./copy-favicons');
const createSvgSprite = require('./create-svg-sprite');
const lintScss = require('./lint-scss');
const optimizeImages = require('./optimize-images');
const renderHtml = require('./render-html');

const prepareAssets = series(
    optimizeImages,
    copyFavicons,
    createSvgSprite,
    lintScss,
    compileScss,
    compileScripts,
    renderHtml,
);

module.exports = prepareAssets;
