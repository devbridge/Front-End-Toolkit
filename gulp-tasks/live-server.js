const connect = require('gulp-connect');

const config = require('../gulp.config.js')();

const liveServer = () => connect.server(config.options.liveServer);

module.exports = liveServer;
