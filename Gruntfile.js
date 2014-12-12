'use strict';

module.exports = function (grunt) {

  // Load all Grunt tasks.
  require('load-grunt-tasks')(grunt);

  // Grunt configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    clean: ['dist'],

    watch: {
      scripts: {
        files: [
          'Gruntfile.js',
          'src/**/*.js',
          'tests/specs/**/*.js',
          '!.grunt'
        ],
        tasks: ['jshint', 'jasmine']
      }
    },

    uglify: {
      all: {
        files: {
          'dist/jquery.checkboxes-<%= pkg.version %>.min.js': ['src/jquery.checkboxes.js']
        },
        options: {
          banner: '/*! checkboxes.js v<%= pkg.version %> | ' +
            '(c) 2013, <%= grunt.template.today("yyyy") %> Rubens Mariuzzo | ' +
            'http://github.com/rmariuzzo/checkboxes.js/LICENSE */',
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
          jshintrc: true
        }
      }
    },

    jasmine: {
      all: {
        src: 'src/**/*.js',
        options: {
          specs: 'tests/specs/*_spec.js',
          vendor: [
            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/jasmine-jquery/lib/jasmine-jquery.js'
          ]
        }
      }
    }

  });

  grunt.registerTask('default', ['jshint', 'watch']);
  grunt.registerTask('build', ['clean', 'jshint', 'jasmine', 'uglify']);
  grunt.registerTask('test', ['jasmine']);
  grunt.registerTask('travis', ['jshint', 'jasmine']);

};
