module.exports = function (done) {
    const runSequence = require('run-sequence');

    return runSequence('image-optimization',
        'copy-favicons',
        'create-svg-sprite',
        'scss-linting',
        'compile-scss',
        'compile-scripts',
        'html-render',
        done);
};
