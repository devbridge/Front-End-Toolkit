module.exports = function (grunt) {

    var timestamp = Date.now();
    grunt.initConfig({
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
        sprite: {
            all: {
                src: 'scss/sprites/icons/*.png',
                dest: 'content/styles/images/icons.png',
                destCss: 'scss/core/_sprites.scss',
                imgPath: 'images/icons.png?=' + timestamp,
                algorithm: 'binary-tree'
            },
            sprite_2x: {
                src: 'scss/sprites/icons@2x/*.png',
                dest: 'content/styles/images/icons@2x.png',
                destCss: 'scss/core/_sprites@2x.scss',
                imgPath: 'images/icons@2x.png?=' + timestamp,
                algorithm: 'binary-tree',
                padding: 4,
                cssVarMap: function (sprite) {
                    sprite.name = sprite.name + '-retina';
                }
            }
        },
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
        watch: {
            options: {
                spawn: false
            },
            spriting: {
                files: ['scss/sprites/icons/*.png', 'scss/sprites/icons@2x/*.png'],
                tasks: ['sprite:all', 'sprite:sprite_2x']
            },
            css: {
                files: 'scss/**/*.scss',
                tasks: ['sass:dist']
            },
            styleguide: {
                files: ['styleguide/snippets/*'],
                tasks: ['folder_list']
            },
            grunt: {
                files: ['Gruntfile.js']
            }
        }
    });
    grunt.loadNpmTasks('grunt-spritesmith');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-folder-list');
    grunt.registerTask('default', ['sprite:all', 'sprite:sprite_2x', 'sass', 'folder_list']);
};