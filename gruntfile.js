module.exports = function (grunt) {
    grunt.initConfig({
        babel: {
            options: {
                sourceMap: true
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'client/',
                        src: ['**/*.js'],
                        dest: 'client/dist/'
                    }
                ]
            }
        },
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

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['babel', 'watch']);
};