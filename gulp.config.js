const { argv } = require('yargs');

const ENV = process.env.npm_lifecycle_event;
const isProd = ENV && ENV.startsWith('build');

module.exports = () => {
    const DIST_DIR = 'dist';
    const ROOT_DIR = './';
    const SRC_DIR = argv.app || 'src';
    const TMP_DIR = 'tmp/';
    const ENVIRONMENT = argv.environment || 'dev';

    // ENABLE/DISABLE FEATURES

    const enable = {
        pngFallback: false,
    };

    // PATHS

    const clean = {
        src: `${ROOT_DIR}${DIST_DIR}/**`,
    };

    const env = {
        src: `config/${ENVIRONMENT}.js`,
    };

    const favicons = {
        dist: `${DIST_DIR}/content/favicons/`,
        src: `${SRC_DIR}/content/favicons/*`,
    };

    const html = {
        dist: DIST_DIR,
        src: [
            `./${SRC_DIR}/**/*.html`,
        ],
    };

    const images = {
        dist: `${DIST_DIR}/images/`,
        src: `${SRC_DIR}/content/images/**/*.{png,gif,jpg,svg}`,
    };

    const scss = {
        dist: `${DIST_DIR}/content/styles/`,
        src: [
            `./${SRC_DIR}/scss/**/*.scss`,
            `./${SRC_DIR}/components/**/*.scss`,
            `!./${SRC_DIR}/scss/**/*_scsslint_tmp*.scss`, // ignores temporary scss-lint files
        ],
    };

    const scssLint = {
        src: [
            ...scss.src,
            `!./${SRC_DIR}/scss/base/_svg-sprite-map.scss`,
            `!./${SRC_DIR}/scss/base/_svg-sprite.scss`,
            `!./${SRC_DIR}/scss/vendor/**/*.scss`,
        ],
    };

    const scripts = {
        all: [
            `${SRC_DIR}/components/**/*.js`,
            `${SRC_DIR}/scripts/**/*.js`,
        ],
        entry: `${SRC_DIR}/scripts/main.js`,
        dist: DIST_DIR,
        src: SRC_DIR,
    };

    const scriptsLint = {
        src: [
            `./${SRC_DIR}/**/*.js`,
        ],
    };

    const sprite = {
        dist: `${DIST_DIR}/content/styles/images/`,
        map: `${SRC_DIR}/scss/base/_svg-sprite-map.scss`,
        src: `${SRC_DIR}/scss/assets/icons/*.svg`,
        template: `${SRC_DIR}/scss/base/_svg-sprite-template.mustache`,
    };

    const paths = {
        clean,
        dist: DIST_DIR,
        env,
        favicons,
        html,
        images,
        root: ROOT_DIR,
        scss,
        scssLint,
        src: SRC_DIR,
        scripts,
        scriptsLint,
        sprite,
        tmp: TMP_DIR,
    };

    // OPTIONS

    /*
    * Reference: https://github.com/postcss/autoprefixer#options
    * Browsers are defined in package.json browserslist key.
    */
    const autoprefixer = {
        cascade: false,
    };

    /* Reference: https://github.com/ben-eb/gulp-csso#options */
    const csso = {};

    /* Reference: https://github.com/jihchi/imagemin-giflossy#options */
    const giflossy = {
        lossy: 2,
        optimizationLevel: 3,
        optimize: 3,
    };

    /* Reference: https://github.com/imagemin/imagemin-jpegtran#options */
    const jpegtran = {
        progressive: true,
    };

    /* Reference: https://github.com/avevlad/gulp-connect#api */
    const liveServer = {
        livereload: true,
        port: 8000,
        root: DIST_DIR,
    };

    /* Reference: https://github.com/imagemin/imagemin-mozjpeg#options */
    const mozjpeg = {
        quality: 90,
    };

    /* Reference: https://github.com/imagemin/imagemin-pngquant#options */
    const pngquant = {
        quality: [0.9, 0.9],
        speed: 1,
    };

    /* Reference: https://github.com/sass/node-sass#options */
    const sass = {
        includePaths: [TMP_DIR],
        noCache: false,
        outputStyle: 'expanded',
        sourceMap: true,
    };

    /* Reference: https://github.com/svg/svgo#what-it-can-do */
    const svgo = {
        plugins: [{
            removeViewBox: false,
        }],
    };

    /* Reference: https://github.com/jkphl/svg-sprite#configuration-basics */
    const svgSprite = {
        shape: {
            spacing: {
                padding: 4,
            },
        },
        variables: {
            version: Math.round(+new Date() / 1000),
        },
        mode: {
            css: {
                bust: false,
                dest: ROOT_DIR,
                render: {
                    scss: {
                        dest: sprite.map,
                        template: sprite.template,
                    },
                },
                sprite: `${sprite.dist}sprite.svg`,
            },
        },
    };

    /* Reference: https://github.com/imagemin/imagemin-zopfli#options */
    const zopfli = {
        // iterations: 50, // very slow but more effective
        more: true,
    };

    const options = {
        autoprefixer,
        csso,
        giflossy,
        jpegtran,
        liveServer,
        mozjpeg,
        pngquant,
        sass,
        svgo,
        svgSprite,
        zopfli,
    };

    return {
        enable,
        options,
        paths,
        environmentConfig: {
            source: `config/${ENVIRONMENT}.js`,
        },
    };
};
