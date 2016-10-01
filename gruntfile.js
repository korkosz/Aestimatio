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
                        src: ['app/**/*.js', 'components/**/*.js'],
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
                    'client/dist/app.css': ['client/app/**/*.scss', 'client/components/**/*.scss', 'client/assets/**/*.scss']
                }
            }
        },
        watch: {
            css: {
                files: ['client/app/**/*.scss', 'client/components/**/*.scss', 'client/assets/**/*.scss'],
                tasks: ['sass'],
                options: {
                    livereload: true
                },
            },
            js: {
                files: ['client/app/**/*.js', 'client/components/**/*.js', 'client/assets/**/*.js'],
                tasks: ['babel', 'browserify', 'clean'],
                options: {
                    livereload: true
                }
            },
            html: {
                files: ['client/app/**/*.html', 'client/components/**/*.html', 'client/assets/**/*.html'],
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
