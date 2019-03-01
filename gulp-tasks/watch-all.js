const { parallel } = require('gulp');

module.exports = () => parallel(
    'watch-scss',
    'watch-scripts',
    'watch-svg',
);
