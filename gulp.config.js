const argv = require("yargs").argv;

const ENV = process.env.npm_lifecycle_event;
const isProd = ENV && ENV.startsWith("build");

module.exports = function () {
    const app = argv.app || "src";
    const environment = argv.environment || "dev";

    const distFolder = "dist";


    const tmp = "tmp/";
    const svg = {
        sourceFolder: `${app}/scss/assets/icons/`,
        spriteFolder: `${distFolder}/content/styles/images/`,
        scssMapFolder: `${app}/scss/base/`,
        scssTemplateFolder: `${app}/scss/base/`,
        pngFallback: true
    };
    const config = {
        tmp,
        root: "./",
        packages: [
            "./package.json"
        ],
        custom: {
            foldersToLint: ["src"]
        },
        path: {
            HTML: "/index.html",
            ALL: [`${app}/src/main.js`],
            MINIFIED_OUT: "build.min.js",
            DEST_SRC: "scripts",
            DEST_BUILD: "scripts",
            DEST: distFolder
        },
        environmentConfig: {
            source: `config/${environment}.js`
        },
        svg: {
            sourceFolder: svg.sourceFolder,
            spriteFolder: svg.spriteFolder,
            scssMapFolder: svg.scssMapFolder,
            pngFallback: svg.pngFallback
        },
        html: {
            src: [
                `./${app}/**/*.html`
            ],
            dest: 'public'
        },
        scss: {
            src: [
                `./${app}/scss/**/*.scss`,
                `./${app}/components/**/*.scss`,
                `!./${app}/scss/**/*_scsslint_tmp*.scss` //ignores temporary scss-lint files
            ],
            lint: [
                `./${app}/scss/**/*.scss`,
                `!./${app}/scss/base/_svg-sprite-map.scss`,
                `!./${app}/scss/base/_svg-sprite.scss`,
                `!./${app}/scss/**/*_scsslint_tmp*.scss`,
                `!./${app}/scss/vendor/**/*.scss`,
                `!./${app}/scss/base/_svg-sprite-map.scss`
            ],
            cssFolder: `${distFolder}/content/styles/`
        }
        ,
        optimize: {
            css: {},
            js: {},
            images: {
                src: `${app}/content/images/**/*.{png,gif,jpg,svg}`,
                dest: `${distFolder}/images/`,
                options: {                       // Target options
                    optimizationLevel: 7,
                    svgoPlugins: [{removeViewBox: false}],
                    progessive: true,
                    interlaced: true
                }
            }
        },
        svgConfig: {
            shape: {
                spacing: {
                    padding: 4
                }
            },
            variables: {
                version: Math.round(+new Date() / 1000)
            },
            mode: {
                css: {
                    bust: false,
                    dest: "./",
                    // layout: "vertical", "horizontal", "diagonal"
                    sprite: svg.spriteFolder + "sprite.svg",
                    render: {
                        scss: {
                            dest: svg.scssMapFolder + "_svg-sprite-map.scss",
                            template: svg.scssTemplateFolder + "_svg-sprite-template.mustache"
                        }
                    }
                }
            }
        }
    };

    return config;
};
