/*
    Grunt installation:
    -------------------
    Requirements:
    NodeJs 0.12 or higher
    Download link: https://nodejs.org/download/
    -------------------

    Open command line and type:
    -------------------
    npm install -g grunt-cli
    npm install -g grunt-init

    Dependency Install:
    --------------------------
    npm install (from the same root directory as the `package.json` file

    Tasks:
    --------------------------
    grunt (compiles sass, sprites, forms list of documents required for styleguide)
    grunt sass (compiles sass once)
    grunt watch (you can also explicitly call the watch task)

    All commands are detailed by running the following:
    --------------------------
    grunt --help
*/

module.exports = function (grunt) {

    var timestamp = Date.now();

    // CONFIG ===================================/
    grunt.initConfig({

        // configure sass --> grunt sass
        sass: {
            options: {
                sourceMap: true,
                noCache: false,
                spawn: false
            },
            dist: {
                files: {
                    'content/styles/site-styles.css': 'scss/site-styles.scss'
                }
            }
        },

        // configure sprite --> grunt sprite
        sprite: {
            all: {
                src: 'scss/sprites/icons/*.png',
                dest: 'content/styles/images/icons.png',
                destCss: 'scss/core/_sprites.scss',
                imgPath: 'images/icons.png?=' + timestamp,
                'algorithm': 'binary-tree'
            },
            sprite_2x: {
                src: 'scss/sprites/icons@2x/*.png',
                dest: 'content/styles/images/icons@2x.png',
                destCss: 'scss/core/_sprites@2x.scss',
                imgPath: 'images/icons@2x.png?=' + timestamp,
                algorithm: 'binary-tree',
                cssVarMap: function (sprite) {
                    sprite.name = sprite.name + '-retina';
                }
            }
        },

        // configure folder_list --> grunt folder_list
        folder_list: {
            options: {
                files: true,
                folders: false
            },
            files: {
                src: ['styleguide/snippets/*'],
                dest: 'styleguide/scripts/snippets.txt'
            }
        },

        // configure file watching --> grunt watch
        watch: {
            options: {
                spawn: false
            },
            spriting: {
                files: ['scss/sprites/**/*.png'],
                tasks: ['sprite']
            },
            css: {
                files: 'scss/**/*.scss',
                tasks: ['sass:dist']
            },
            styleguide: {
                files: ['styleguide/snippets/*'],
                tasks: ['folder_list']
            }
        }
    });

    // DEPENDENT PLUGINS =========================/
    grunt.loadNpmTasks('grunt-spritesmith');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-folder-list');

    // TASKS =====================================/
    grunt.registerTask('default', ['sprite:all', 'sprite:sprite_2x', 'sass', 'folder_list']);
};