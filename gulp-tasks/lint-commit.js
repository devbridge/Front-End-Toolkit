const gulp = require('gulp');
const eslint = require('gulp-eslint');
const config = require('../gulp.config.js')();
const _ = require('lodash');
const through = require('through2');
const sassLint = require('gulp-sass-lint');
const gulpif = require('gulp-if');
const es = require('event-stream');
const vinyl = require('vinyl-fs');

function replaceStreamWith() {
    let pass = through.obj();
    return es.duplex(pass, vinyl.src.apply(vinyl.src, arguments));
}

function makeEmptyStream() {
    return through.obj((a, b, cb) => cb(null));
}

function lintCode(srcJs, srcSass) {
    return gulp.src(srcJs)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
        .pipe(gulpif(!_.isEmpty(srcSass), replaceStreamWith(config.scss.lint), makeEmptyStream()))
        .pipe(sassLint())
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError());
}

function eslintCommit() {
    const execSync = require('child_process').execSync;
    const stdout = execSync('git diff --cached --name-only').toString()
        + '\n'
        + execSync('git diff --name-only').toString();

    const resArray = stdout.split('\n');

    const commitJsFiles = resArray
        .filter((line) => line.endsWith('.js'))
        .filter((line) => {
            return _.reduce(config.custom.foldersToLint, (res, curr) => res || line.startsWith(curr), false);
        });

    const commitScssFiles = _(resArray).filter((line) => line.endsWith('.scss')).value();

    if (commitJsFiles.length > 0 || commitScssFiles.length > 0) {
        return lintCode(commitJsFiles, commitScssFiles);
    }
}

module.exports = function () {
    return eslintCommit();
};
