module.exports = function(grunt) {

    // Load all Grunt tasks.
    require('load-grunt-tasks')(grunt);

    // Grunt configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= pkg.version %> | <%= pkg.author %> | <%= grunt.template.today("yyyy-mm-dd") %> | <%= pkg.license %> */\n'
            },
            build: {
                src: 'src/jquery.checkboxes.js',
                dest: 'dist/jquery.checkboxes-<%= pkg.version %>.min.js'
            }
        }

    });

    grunt.registerTask('default', ['uglify']);

};