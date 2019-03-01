const connect = require('gulp-connect');

const config = require('../gulp.config.js')();

module.exports = () => connect.server(config.options.liveServer);
