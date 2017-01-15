'use strict';

var os = require('os'),
    path = require('path');

module.exports = function (grunt) {

  var coverage = process.env.GRUNT_MOVE_COVERAGE,
      tmp = os.tmpdir();

  require('time-grunt')(grunt);

  grunt.initConfig({

    jshint: {
      all:     [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      }
    },

    copy: {
      tests: {
        expand: true,
        cwd: 'test/data',
        src: '**',
        dest: 'test/work/'
      }
    },

    move: {
      empty: {
        options: {
          ignoreMissing: true
        }
      },
      missing: {
        options: {
          ignoreMissing: true
        },
        src: 'test/work/missing/old',
        dest: 'test/work/missing/new'
      },
      rename: {
        src: 'test/work/rename/old',
        dest: 'test/work/rename/new'
      },
      move_with_rename: {
        src: 'test/work/move_with_rename/source/old',
        dest: 'test/work/move_with_rename/target/new'
      },
      move_without_rename: {
        src: 'test/work/move_without_rename/source/file',
        dest: 'test/work/move_without_rename/target/'
      },
      move_more: {
        src: ['test/work/move_more/source/first',
              'test/work/move_more/source/second'],
        dest: 'test/work/move_more/target/'
      },
      move_with_wildcard: {
        src: ['test/work/move_with_wildcard/source/*'],
        dest: 'test/work/move_with_wildcard/target/'
      },
      move_with_wildcard_and_cwd: {
        cwd: 'test/work/move_with_wildcard_and_cwd/source',
        expand: true,
        src: ['*'],
        dest: 'test/work/move_with_wildcard_and_cwd/target/'
      },
      move_directory: {
        src: 'test/work/move_directory/source',
        dest: 'test/work/move_directory/target'
      },
      move_across_volumes: {
        options: {
          moveAcrossVolumes: true
        },
        src: 'test/work/move_across_volumes/file',
        dest: path.join(tmp, 'grunt-move/file')
      }
    },

    nodeunit: {
      tests:   ['test/*_test.js'],
      options: {
        reporter: coverage ? 'lcov' : 'verbose',
        reporterOutput: coverage ? 'coverage/tests.lcov' : undefined
      }
    },

    clean: {
      options: {
        force: true
      },
      tests:    ['test/work', path.join(tmp, 'grunt-move')],
      coverage: ['coverage']
    },

    instrument: {
      files: 'tasks/*.js',
      options: {
        lazy: true,
        basePath: 'coverage/'
      }
    },

    storeCoverage: {
      options: {
        dir: 'coverage'
      }
    },

    makeReport: {
      src: 'coverage/coverage.json',
      options: {
        type: 'lcov',
        dir: 'coverage',
        print: 'detail'
      }
    },

    coveralls: {
      tests: {
        src: 'coverage/lcov.info'
      }
    }

  });

  grunt.loadTasks(coverage ? 'coverage/tasks' : 'tasks');

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-coveralls');
  grunt.loadNpmTasks('grunt-istanbul');

  grunt.registerTask('default', coverage ?
    ['jshint', 'clean', 'instrument', 'copy', 'move', 'nodeunit',
     'storeCoverage', 'makeReport'] :
    ['jshint', 'clean:tests', 'copy', 'move', 'nodeunit']);

};
