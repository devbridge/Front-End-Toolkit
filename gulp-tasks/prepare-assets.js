module.exports = function (done) {
    var runSequence = require('run-sequence');

    return runSequence('image-optimization',
        'create-svg-sprite',
        'scss-linting',
        'compile-scss',
        'html-render',
        done);
};
