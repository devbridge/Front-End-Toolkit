'use strict';

module.exports = function (grunt) {

    grunt.initConfig({
        sass: {
            options: {
                sourceMap: true,
                noCache: false,
                spawn: false
            },
            dist: {
                files: {
                    'content/styles/styleguide.css': 'scss/styleguide.scss'
                }
            }
        },
        folder_list: {
            options: {
                files: true,
                folders: false
            },
            files: {
                src: ['snippets/*.html'],
                dest: 'scripts/snippets.json'
            }
        },
        watch: {
            styleguide: {
                files: ['snippets/*'],
                tasks: ['folder_list']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-folder-list');

    grunt.registerTask('default', [
        'sass',
        'folder_list'
    ]);
};
