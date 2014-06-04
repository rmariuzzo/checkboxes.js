module.exports = function(grunt) {

    // Load all Grunt tasks.
    require('load-grunt-tasks')(grunt);

    // Grunt configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        watch: {
            scripts: {
                files: ['src/**.js'],
                tasks: ['jshint']
            }
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= pkg.version %> | <%= pkg.author %> | <%= grunt.template.today("yyyy-mm-dd") %> | <%= pkg.license %> */\n'
            },
            build: {
                src: 'src/jquery.checkboxes.js',
                dest: 'dist/jquery.checkboxes-<%= pkg.version %>.min.js'
            }
        },

        jshint: {
            all: [
                'src/**.js'
            ]
        }

    });

    grunt.registerTask('default', ['uglify']);

};