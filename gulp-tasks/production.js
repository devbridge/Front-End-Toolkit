const { series } = require('gulp');

module.exports = () => series(
    'check-deps',
    'prepare-assets',
    'prepare-config',
    'clear-image-cache',
);
