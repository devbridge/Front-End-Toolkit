const { series } = require('gulp');

module.exports = () => series(
    'image-optimization',
    'copy-favicons',
    'create-svg-sprite',
    'scss-linting',
    'compile-scss',
    'compile-scripts',
    'html-render',
);
