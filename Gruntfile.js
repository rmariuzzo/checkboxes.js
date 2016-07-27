'use strict';

module.exports = (grunt) => {

    // Load all Grunt tasks.
    require('load-grunt-tasks')(grunt);

    // Grunt configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        clean: {
            all: ['dist'],
            build: ['dist/jquery.checkboxes-<%= pkg.version %>.js']
        },

        watch: {
            scripts: {
                files: [
                    'Gruntfile.js',
                    'src/**/*.js',
                    'tests/specs/**/*.js',
                    'tests/helpers.js',
                    '!.grunt'
                ],
                tasks: ['jshint', 'babel', 'jasmine']
            }
        },

        uglify: {
            all: {
                files: {
                    'dist/jquery.checkboxes-<%= pkg.version %>.min.js': ['dist/jquery.checkboxes-<%= pkg.version %>.js']
                },
                options: {
                    banner: '/*! checkboxes.js v<%= pkg.version %> | ' +
                    '(c) 2013 - <%= grunt.template.today("yyyy") %> Rubens Mariuzzo | ' +
                    'http://github.com/rmariuzzo/checkboxes.js/LICENSE */'
                }
            }
        },

        jshint: {
            all: {
                src: [
                    'Gruntfile.js',
                    'src/**/*.js',
                    'tests/spec/**/*.js'
                ],
                options: {
                    jshintrc: '<%= baseDir %>.jshintrc',
                    reporterOutput: ''
                }
            }
        },

        jasmine: {
            all: {
                src: 'dist/jquery.checkboxes-<%= pkg.version %>.js',
                options: {
                    specs: 'tests/specs/*_spec.js',
                    vendor: [
                        'bower_components/jquery/dist/jquery.min.js',
                        'bower_components/jasmine-jquery/lib/jasmine-jquery.js'
                    ],
                    helpers: [
                        'tests/helpers.js'
                    ]
                }
            }
        },

        babel: {
            options: {
                sourceMap: false,
                presets: ['es2015']
            },
            dist: {
                files: {
                    'dist/jquery.checkboxes-<%= pkg.version %>.js': 'src/jquery.checkboxes.js'
                }
            }
        }

    });

    grunt.registerTask('default', ['jshint', 'watch']);
    grunt.registerTask('build', ['clean:all', 'jshint', 'babel', 'jasmine', 'uglify', 'clean:build']);
    grunt.registerTask('test', ['babel', 'jasmine']);
    grunt.registerTask('travis', ['jshint', 'jasmine']);

};
