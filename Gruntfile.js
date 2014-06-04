module.exports = function(grunt) {

    // Load all Grunt tasks.
    require('load-grunt-tasks')(grunt);

    // Grunt configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        watch: {
            scripts: {
                files: [
                    'Gruntfile.js',
                    'src/**.js',
                    'tests/spec/**.js'
                ],
                tasks: ['jshint', 'jasmine']
            }
        },

        uglify: {
            build: {
                src: 'src/jquery.checkboxes.js',
                dest: 'dist/jquery.checkboxes-<%= pkg.version %>.min.js'
            },
            options: {
                banner: '/*! checkboxes.js v<%= pkg.version %> | ' +
                        '(c) 2013, <%= grunt.template.today("yyyy") %> Rubens Mariuzzo | ' +
                        'http://github.com/rmariuzzo/checkboxes.js/LICENSE */',
            }
        },

        jshint: {
            src: [
                'Gruntfile.js',
                'src/**.js',
                'tests/spec/**.js'
            ],
            options: {
                jshintrc: true
            }
        },

        jasmine: {
            src: 'src/**.js',
            options: {
                specs: 'tests/spec/*_spec.js',
                vendor: [
                    'bower_components/jquery/dist/jquery.min.js'
                ]
            }
        }

    });

    grunt.registerTask('default', ['jshint', 'watch']);

};