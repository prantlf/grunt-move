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
    test.expect(1);
    test.ok(grunt.file.exists('test/work/rename/new'),
        'File is renamed in the same directory');
    test.done();
  },

  move_with_rename: function (test) {
    test.expect(1);
    test.ok(grunt.file.exists('test/work/move_with_rename/target/new'),
        'File is moved to other directory and renamed');
    test.done();
  },

  move_without_rename: function (test) {
    test.expect(1);
    test.ok(grunt.file.exists('test/work/move_without_rename/target/file'),
        'File is moved to other directory');
    test.done();
  },

  move_more: function (test) {
    test.expect(2);
    test.ok(grunt.file.exists('test/work/move_more/target/first'),
        'First file is moved to other directory');
    test.ok(grunt.file.exists('test/work/move_more/target/second'),
        'Second file is moved to other directory');
    test.done();
  },

  move_with_wildcard: function (test) {
    test.expect(2);
    test.ok(grunt.file.exists('test/work/move_with_wildcard/target/first'),
        'First file is moved to other directory');
    test.ok(grunt.file.exists('test/work/move_with_wildcard/target/second'),
        'Second file is moved to other directory');
    test.done();
  },

  move_with_wildcard_and_cwd: function (test) {
    test.expect(2);
    test.ok(grunt.file.exists('test/work/move_with_wildcard_and_cwd/target/first'),
        'First file is moved to other directory');
    test.ok(grunt.file.exists('test/work/move_with_wildcard_and_cwd/target/second'),
        'Second file is moved to other directory');
    test.done();
  },

  move_directory: function (test) {
    test.expect(1);
    test.ok(grunt.file.exists('test/work/move_directory/target/file'),
        'Directory is moved to other directory');
    test.done();
  },

  move_across_volumes: function (test) {
    test.expect(1);
    test.ok(grunt.file.exists(path.join(os.tmpdir(), 'grunt-move/file')),
        'File is moved across volumes');
    test.done();
  }

};
