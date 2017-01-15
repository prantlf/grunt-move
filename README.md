# grunt-move [![NPM version](https://badge.fury.io/js/grunt-move.png)](http://badge.fury.io/js/grunt-move) [![Build Status](https://travis-ci.org/prantlf/grunt-move.png)](https://travis-ci.org/prantlf/grunt-move) [![Coverage Status](https://coveralls.io/repos/prantlf/grunt-move/badge.svg)](https://coveralls.io/r/prantlf/grunt-move) [![Dependency Status](https://david-dm.org/prantlf/grunt-move.svg)](https://david-dm.org/prantlf/grunt-move) [![devDependency Status](https://david-dm.org/prantlf/grunt-move/dev-status.svg)](https://david-dm.org/prantlf/grunt-move#info=devDependencies) [![devDependency Status](https://david-dm.org/prantlf/grunt-move/peer-status.svg)](https://david-dm.org/prantlf/grunt-move#info=peerDependencies) [![Code Climate](https://codeclimate.com/github/prantlf/grunt-move/badges/gpa.svg)](https://codeclimate.com/github/prantlf/grunt-move) [![Codacy Badge](https://www.codacy.com/project/badge/f3896e8dfa5342b8add12d50390edfcd)](https://www.codacy.com/public/prantlf/grunt-move) [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

[![NPM Downloads](https://nodei.co/npm/grunt-move.png?downloads=true&stars=true)](https://www.npmjs.com/package/grunt-move)

> This module provides a grunt multi-task for moving and renaming files and directories.

## Installation

You need [node >= 0.10][node], [npm] and [grunt >= 0.4][Grunt] installed
and your project build managed by a [Gruntfile] with the necessary modules
listed in [package.json].  If you haven't used Grunt before, be sure to
check out the [Getting Started] guide, as it explains how to create a
Gruntfile as well as install and use Grunt plugins.  Once you're familiar
with that process, you may ensure native dependencies of this plugin and
install it:

1. Install pre-requisites: [Graphviz](http://www.graphviz.org/) and Java
   depending on your operating system

2. Install the Grunt task:

```shell
$ npm install grunt-move --save-dev
```

## Configuration

Add the `move` entry with the move task configuration to the
options of the `grunt.initConfig` method:

```js
grunt.initConfig({
  move: {
    test: {
      src: 'old',
      dest: 'new'
    }
  }
});
```

Then, load the plugin:

```javascript
grunt.loadNpmTasks('grunt-move');
```

## Build

Call the `move` task:

```shell
$ grunt move
```

or integrate it to your build sequence in `Gruntfile.js`:

```js
grunt.registerTask('default', ['move', ...]);
```

## Customizing

Default behaviour of the task can be tweaked by the task options; these
are the defaults:

```js
grunt.initConfig({
  move: {
    task: {
      options: {
        ignoreMissing: false,
        moveAcrossVolumes: false
      },
      src: ...,
      dest: ...
    }
  }
});

The configuration consists of `src` and `dest` property pairs.  The `src`
property has to point to an existing source path.  The `dest` property has
to point to the path, where the source file or directory should be moved.

If you do not end the `dest` path by the path separator (slash, for example),
the `dest` path will be considered as if it includes the target name and the
source file or directory will be moved and get this target complete path.

If you end the `dest` path by a path separator (slash, for example), the
source file or directory will be moved there retaining its name.

If you specify more source files or directories, or use wildcards, the target
path should be a directory - end by the path separator (slash, for example).

### Options

#### ignoreMissing
Type: `Boolean`
Default: `false`

If the `src` property does not point to any files, or if it is missing,
the task will make the Grunt run fail.  If you set the `ignoreMissing`
option to `true`, Grunt will continue executing other tasks.

#### moveAcrossVolumes
Type: `Boolean`
Default: `false`

If the `src` property points to a file or directory, which is located
on other volume (drive), that the `dest` path, the task will make the
Grunt run fail.  If you set the `moveAcrossVolumes` option to `true`,
the file or directory will be copied to the target path and when it
succeeds, the source will be deleted. Grunt will continue executing
other tasks then.

### More Usage Examples


```js
  move: {
    do_not_fail_if_missing: {
      options: {
        ignoreMissing: true
      },
      src: 'test/work/missing/old',
      dest: 'test/work/missing/new'
    }
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
      src: ['test/work/move_more_files/source/first',
            'test/work/move_more_files/source/second'],
      dest: 'test/work/move_more_files/target/'
    },
    move_with_wildcard: {
      src: ['test/work/move_files_with_wildcard/source/*'],
      dest: 'test/work/move_files_with_wildcard/target/'
    },
    move_across_volumes: {
      options: {
        moveAcrossVolumes: true
      },
      src: 'test/work/move_across_volumes/file',
      dest: '/tmp/grunt-move/file'
    }
  }
});

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding
style.  Add unit tests for any new or changed functionality. Lint and test
your code using Grunt.

## Release History

 * 2017-01-15   v0.0.1   Initial release

## License

Copyright (c) 2017 Ferdinand Prantl

Licensed under the MIT license.

[node]: http://nodejs.org
[npm]: http://npmjs.org
[package.json]: https://docs.npmjs.com/files/package.json
[Grunt]: https://gruntjs.com
[Gruntfile]: http://gruntjs.com/sample-gruntfile
[Getting Gtarted]: https://github.com/gruntjs/grunt/wiki/Getting-started
