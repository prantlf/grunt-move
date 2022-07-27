'use strict';

var os = require('os'),
    path = require('path'),
    colorette = require('colorette');

module.exports = function (grunt) {
  var tmp = os.tmpdir(),
      succeedingTasks = [
        'move:empty', 'move:missing', 'move:rename',
        'move:move_with_rename', 'move:move_without_rename',
        'move:move_more', 'move:move_with_wildcard',
        'move:move_with_wildcard_and_cwd', 'move:move_directory',
        'move:move_across_volumes', 'move:rename_multiple',
        'move:move_multiple'
      ],
      failingTasks = [
        'move:failed_empty', 'move:failed_missing',
        'move:failed_invalid_destination'
      ],
      failingWarnings = [
        'No files or directories specified.',
        'No files or directories found at ' +
        colorette.cyan('test/work/missing/old') + '.',
        'Error: Unable to create directory "test/work/failed_invalid_destination/blocked" (Error code: EEXIST).'
      ],
      tasks;

  if (false) {
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
      rename_multiple: {
        files: [
          {
            src: 'test/work/rename_multiple/first',
            dest: 'test/work/rename_multiple/third'
          },
          {
            src: 'test/work/rename_multiple/second',
            dest: 'test/work/rename_multiple/fourth'
          }
        ]
      },
      move_multiple: {
        files: [
          {
            src: ['test/work/move_multiple/source1/first',
                  'test/work/move_multiple/source1/second'],
            dest: 'test/work/move_multiple/target1/'
          },
          {
            src: 'test/work/move_multiple/source2/*',
            dest: 'test/work/move_multiple/target2/'
          }
        ]
      },
      failed_empty: {
      },
      failed_missing: {
        src: 'test/work/missing/old',
        dest: 'test/work/missing/new'
      },
      failed_invalid_destination: {
        src: 'test/work/failed_invalid_destination/file',
        dest: 'test/work/failed_invalid_destination/blocked/file',
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
      tests: ['test/*_test.js']
    },

    clean: {
      options: { force: true },
      tests: ['test/work', path.join(tmp, 'grunt-move')]
    }
  });

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-continue-ext');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-coveralls');
  grunt.loadNpmTasks('grunt-istanbul');

  tasks = ['jshint', 'clean', 'copy']
    .concat(succeedingTasks)
    .concat(['continue:on'])
    .concat(failingTasks)
    .concat(['continue:off', 'continue:check-warnings', 'nodeunit']);

  grunt.registerTask('default', tasks);
};
