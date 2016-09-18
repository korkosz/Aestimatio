module.exports = function (grunt) {
    grunt.initConfig({
        // run: {
        //     integration_server: {
        //         options: {
        //             wait: false
        //         },
        //         // cmd: "node", // but that's the default 
        //         args: [
        //             'server'
        //         ]
        //     }
        // },
        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    'client/dist/app.css': 'client/app/app.scss'
                }
            }
        },
        watch: {
            css: {
                files: ['client/**/*.scss'],
                tasks: ['sass'],
                options: {
                    livereload: true
                },
            },
            js: {
                files: ['client/**/*.js'],
                options: {
                    livereload: true
                }
            },
            html: {
                files: ['client/**/*.html'],
                options: {
                    livereload: true
                }
            }
        },
    });

    grunt.loadNpmTasks('grunt-run');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['watch']);
}