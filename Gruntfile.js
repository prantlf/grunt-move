'use strict';

var os = require('os'),
    path = require('path'),
    chalk = require('chalk');

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
        warnings: [
          'No files or directories specified.',
          'No files or directories found at ' +
              chalk.cyan('test/work/missing/old') + '.',
          'Moving files across devices has not been enabled.',
          'Moving failed.'
        ]
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

  grunt.registerTask('continue:clear-warnings',
      'Clears warnings remembered by grunt-continue.', function () {
        grunt.config.set('grunt-continue:warnings', []);
      });

  grunt.registerTask('continue:check-any-warnings',
      'Checks if any warnings were remembered by grunt-continue.', function () {
        var actual = grunt.config('grunt-continue:warnings') || [];
        grunt.verbose.writeln('Some warnings were expected.');
        if (actual.length) {
          actual.forEach(function (warning) {
            grunt.verbose.writeln('Actual warning: "' + warning + '".');
          });
          grunt.log.ok(actual.length +
              grunt.util.pluralize(actual.length, ' warning/ warnings') +
              ' were found.');
        } else {
          grunt.fail.warn('No warnings found.');
        }
      });

  grunt.registerMultiTask('continue:check-warnings',
      'Checks warnings remembered by grunt-continue.', function () {
        var expected = this.data.warnings,
            actual = grunt.config('grunt-continue:warnings') || [];
        if (!expected) {
          grunt.fail.warn('No expected warnings specified.');
        }
        grunt.verbose.writeln(expected.length +
            grunt.util.pluralize(expected.length, ' warning/ warnings') +
            ' were expected.');
        actual.forEach(function (warning) {
          grunt.verbose.writeln('Actual warning: "' + warning + '".');
          if (expected.indexOf(warning) < 0) {
            grunt.fail.warn('Unexpected warning: "' + warning + '".');
          }
        });
        expected.forEach(function (warning) {
          if (actual.indexOf(warning) < 0) {
            grunt.fail.warn('Warning not found: "' + warning + '".');
          }
        });
        grunt.log.ok(actual.length +
            grunt.util.pluralize(actual.length, ' warning/ warnings') +
            ' were expected and found.');
      });

  grunt.registerTask('default', coverage ?
    ['jshint', 'clean', 'instrument', 'copy',
     'move:empty', 'move:missing', 'move:rename', 'move:move_with_rename',
     'move:move_without_rename', 'move:move_more', 'move:move_with_wildcard',
     'move:move_with_wildcard_and_cwd', 'move:move_directory',
     'move:move_across_volumes', 'continue:on', 'move:failed_empty',
     'move:failed_missing', 'move:failed_invalid_destination',
     'move:failed_move_across_volumes', 'continue:off',
     'continue:check-warnings', 'nodeunit', 'storeCoverage', 'makeReport'] :
    ['jshint', 'clean:tests', 'copy',
     'move:empty', 'move:missing', 'move:rename', 'move:move_with_rename',
     'move:move_without_rename', 'move:move_more', 'move:move_with_wildcard',
     'move:move_with_wildcard_and_cwd', 'move:move_directory',
     'move:move_across_volumes', 'continue:on', 'move:failed_empty',
     'move:failed_missing', 'move:failed_invalid_destination',
     'move:failed_move_across_volumes', 'continue:off',
     'continue:check-warnings', 'nodeunit']);

};
