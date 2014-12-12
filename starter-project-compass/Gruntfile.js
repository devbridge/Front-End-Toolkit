module.exports = function (grunt) {
    grunt.initConfig({
            folder_list: {
                options: {
                    // Default options, you dont need these they are just to highlight the options available.
                    files: true,
                    folders: false
                },
                files: {
                    src: ['styleguide/snippets/*'],
                    dest: 'styleguide/scripts/snippets.txt'
                }
            },
        watch:{
                files: ['styleguide/snippets/*'],
                tasks: ['folder_list']
        }
    });
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-folder-list');
    grunt.registerTask('default', ['folder_list']);
};