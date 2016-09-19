module.exports = function (grunt) {
    grunt.initConfig({
        clean: 'client/dist/app',
        babel: {
            options: {
                sourceMap: true
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'client/',
                        src: ['app/**/*.js'],
                        dest: 'client/dist/'
                    }
                ]
            }
        },
        browserify: {
            dist: {
                files: {
                    'client/dist/bundle.js': 'client/dist/app/index.js'
                }
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
                files: ['client/app/**/*.scss'],
                tasks: ['sass'],
                options: {
                    livereload: true
                },
            },
            js: {
                files: ['client/app/**/*.js'],
                tasks: ['babel', 'browserify', 'clean'],
                options: {
                    livereload: true
                }
            },
            html: {
                files: ['client/app/**/*.html'],
                options: {
                    livereload: true
                }
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['babel', 'browserify', 'clean', 'watch']);
};