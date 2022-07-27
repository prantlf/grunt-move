'use strict';

var grunt = require('grunt'),
    os = require('os'),
    path = require('path');

exports.move = {
  empty: function (test) {
    test.expect(1);
    test.ok(true, 'No input produces no output');
    test.done();
  },

  missing: function (test) {
    test.expect(1);
    test.ok(!grunt.file.exists('test/work/missing/new'),
        'Missing file is ignored');
    test.done();
  },

  rename: function (test) {
    test.expect(2);
    test.ok(!grunt.file.exists('test/work/rename/old'),
        'No file with the old name exists');
    test.ok(grunt.file.exists('test/work/rename/new'),
        'File is renamed in the same directory');
    test.done();
  },

  move_with_rename: function (test) {
    test.expect(2);
    test.ok(!grunt.file.exists('test/work/move_with_rename/source/old'),
        'No file with the old name at the old location exists');
    test.ok(grunt.file.exists('test/work/move_with_rename/target/new'),
        'File is moved to other directory and renamed');
    test.done();
  },

  move_without_rename: function (test) {
    test.expect(2);
    test.ok(!grunt.file.exists('test/work/move_without_rename/source/file'),
        'No file at the old location exists');
    test.ok(grunt.file.exists('test/work/move_without_rename/target/file'),
        'File is moved to other directory');
    test.done();
  },

  move_more: function (test) {
    test.expect(4);
    test.ok(!grunt.file.exists('test/work/move_more/source/first'),
        'First file at the old location does not exist');
    test.ok(grunt.file.exists('test/work/move_more/target/first'),
        'First file is moved to other directory');
    test.ok(!grunt.file.exists('test/work/move_more/source/second'),
        'Second file at the old location does not exist');
    test.ok(grunt.file.exists('test/work/move_more/target/second'),
        'Second file is moved to other directory');
    test.done();
  },

  move_with_wildcard: function (test) {
    test.expect(4);
    test.ok(!grunt.file.exists('test/work/move_with_wildcard/source/first'),
        'First file at the old location does not exist');
    test.ok(!grunt.file.exists('test/work/move_with_wildcard/source/second'),
        'Second file at the old location does not exist');
    test.ok(grunt.file.exists('test/work/move_with_wildcard/target/first'),
        'First file is moved to other directory');
    test.ok(grunt.file.exists('test/work/move_with_wildcard/target/second'),
        'Second file is moved to other directory');
    test.done();
  },

  move_with_wildcard_and_cwd: function (test) {
    test.expect(4);
    test.ok(!grunt.file.exists('test/work/move_with_wildcard_and_cwd/source/first'),
        'First file at the old location does not exist');
    test.ok(!grunt.file.exists('test/work/move_with_wildcard_and_cwd/source/second'),
        'Second file at the old location does not exist');
    test.ok(grunt.file.exists('test/work/move_with_wildcard_and_cwd/target/first'),
        'First file is moved to other directory');
    test.ok(grunt.file.exists('test/work/move_with_wildcard_and_cwd/target/second'),
        'Second file is moved to other directory');
    test.done();
  },

  move_directory: function (test) {
    test.expect(2);
    test.ok(!grunt.file.exists('test/work/move_directory/source/file'),
        'No directory at the old location exists');
    test.ok(grunt.file.exists('test/work/move_directory/target/file'),
        'Directory is moved to other directory');
    test.done();
  },

  move_across_volumes: function (test) {
    test.expect(2);
    test.ok(!grunt.file.exists('test/work/move_across_volumes/file'),
        'No file at the old location exists');
    test.ok(grunt.file.exists(path.join(os.tmpdir(), 'grunt-move/file')),
        'File is moved across volumes');
    test.done();
  },

  rename_multiple: function (test) {
    test.expect(4);
    test.ok(!grunt.file.exists('test/work/rename_multiple/first'),
        'First file with the old name does not exist');
    test.ok(grunt.file.exists('test/work/rename_multiple/third'),
        'First file is renamed in the same directory');
    test.ok(!grunt.file.exists('test/work/rename_multiple/second'),
        'Second file with the old name does not exist');
    test.ok(grunt.file.exists('test/work/rename_multiple/fourth'),
        'Second file is renamed in the same directory');
    test.done();
  },

  move_multiple: function (test) {
    test.expect(8);
    test.ok(!grunt.file.exists('test/work/move_multiple/source1/first'),
        'First file at the old location does not exist');
    test.ok(!grunt.file.exists('test/work/move_multiple/source1/second'),
        'Second file at the old location does not exist');
    test.ok(grunt.file.exists('test/work/move_multiple/target1/first'),
        'First file is moved to other directory');
    test.ok(grunt.file.exists('test/work/move_multiple/target1/second'),
        'First file is moved to other directory');
    test.ok(!grunt.file.exists('test/work/move_multiple/source2/third'),
        'Third file at the old location does not exist');
    test.ok(!grunt.file.exists('test/work/move_multiple/source2/fourth'),
        'Fourth file at the old location does not exist');
    test.ok(grunt.file.exists('test/work/move_multiple/target2/third'),
        'Third file is moved to other directory');
    test.ok(grunt.file.exists('test/work/move_multiple/target2/fourth'),
        'Fourth file is moved to other directory');
    test.done();
  }
};
