'use strict';

var os = require('os'),
    path = require('path'),
    chalk = require('chalk');

module.exports = function (grunt) {

  var coverage = process.env.GRUNT_MOVE_COVERAGE,
      tmp = os.tmpdir(),
      succeedingTasks = [
        'move:empty', 'move:missing', 'move:rename', 'move:move_with_rename',
        'move:move_without_rename', 'move:move_more',
        'move:move_with_wildcard', 'move:move_with_wildcard_and_cwd',
        'move:move_directory', 'move:move_across_volumes'
      ],
      failingTasks = [
        'move:failed_empty', 'move:failed_missing',
        'move:failed_invalid_destination'
      ],
      failingWarnings = [
        'No files or directories specified.',
        'No files or directories found at ' +
          chalk.cyan('test/work/missing/old') + '.',
        'Moving failed.'
      ],
      tasks;

  if (!process.env.TRAVIS) {
    failingTasks.push('move:failed_move_across_volumes');
    failingWarnings.push('Moving files across devices has not been enabled.');
  }

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
      },
      failed_empty: {
      },
      failed_missing: {
        src: 'test/work/missing/old',
        dest: 'test/work/missing/new'
      },
      failed_invalid_destination: {
        src: 'test/work/failed_invalid_destination/file',
        dest: 'test/work/failed_invalid_destination/:*?\\//file',
      },
      failed_move_across_volumes: {
        src: 'test/work/failed_move_across_volumes/file',
        dest: path.join(tmp, 'grunt-move/file')
      }
    },

    'continue:check-warnings': {
      test: {
        warnings: failingWarnings
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

  grunt.loadNpmTasks('grunt-continue');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-coveralls');
  grunt.loadNpmTasks('grunt-istanbul');

  tasks = ['copy'].concat(succeedingTasks)
                  .concat(['continue:on'])
                  .concat(failingTasks)
                  .concat(['continue:off', 'continue:check-warnings',
                           'nodeunit']);
  if (coverage) {
    tasks = ['clean', 'instrument'].concat(tasks)
                                   .concat(['storeCoverage', 'makeReport']);
  } else {
    tasks = ['clean:tests'].concat(tasks);
  }
  tasks = ['jshint'].concat(tasks);

  grunt.registerTask('default', tasks);

};
