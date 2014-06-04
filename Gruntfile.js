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
                    'src/**.js'
                ],
                tasks: ['jshint']
            }
        },

        uglify: {
            options: {
                banner: '/*! checkboxes.js v<%= pkg.version %> | ' +
                        '(c) 2013, <%= grunt.template.today("yyyy") %> Rubens Mariuzzo | ' +
                        'http://github.com/rmariuzzo/checkboxes.js/LICENSE */',
            },
            build: {
                src: 'src/jquery.checkboxes.js',
                dest: 'dist/jquery.checkboxes-<%= pkg.version %>.min.js'
            }
        },

        jshint: {
            all: {
                src: [
                    'Gruntfile.js',
                    'src/**.js'
                ],
                options: {
                    jshintrc: true
                }
            }
        }

    });

    grunt.registerTask('default', ['uglify']);

};