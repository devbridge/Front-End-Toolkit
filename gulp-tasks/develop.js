const { parallel, series } = require('gulp');

module.exports = () => series(
    'clean',
    'prepare-assets',
    'prepare-config',
    'clear-image-cache',
    parallel('watch-scss', 'watch-htmlrender', 'watch-scripts', 'watch-svg', 'watch-images-optimize'),
    'live-server',
);
