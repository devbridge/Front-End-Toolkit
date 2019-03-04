const { parallel } = require('gulp');

const watchScss = require('./watch-scss');
const watchScripts = require('./watch-scripts');
const watchSvg = require('./watch-svg');

module.exports = parallel(
    watchScss,
    watchScripts,
    watchSvg,
);
