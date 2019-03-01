const path = require('path');

const config = require('../gulp.config.js')();

const alias = {
    '@': path.resolve(config.paths.scripts.src),
    '@components': path.resolve(`${config.paths.scripts.src}/components`),
};

module.exports = alias;
