# grunt-move

[![Latest version](https://img.shields.io/npm/v/grunt-move)
 ![Dependency status](https://img.shields.io/librariesio/release/npm/grunt-move)
](https://www.npmjs.com/package/grunt-move)
[![Coverage](https://codecov.io/gh/prantlf/grunt-move/branch/master/graph/badge.svg)](https://codecov.io/gh/prantlf/grunt-move)

This module provides a grunt multi-task for moving and renaming files and directories.

## Installation

You need [node >= 10][node], [npm] and [grunt >= 1][Grunt] installed
and your project build managed by a [Gruntfile] with the necessary modules
listed in [package.json].  If you haven't used Grunt before, be sure to
check out the [Getting Started] guide, as it explains how to create a
Gruntfile as well as install and use Grunt plugins.

Install the Grunt task:

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
```

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
          src: ['test/work/move_more/source1/first',
                'test/work/move_more/source1/second'],
          dest: 'test/work/move_more/target1/'
        },
        {
          src: 'test/work/move_more/source2/*',
          dest: 'test/work/move_more/target2/'
        }
      ]
    }
  }
});
```

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding
style.  Add unit tests for any new or changed functionality. Lint and test
your code using Grunt.

## License

Copyright (c) 2017-2022 Ferdinand Prantl

Licensed under the MIT license.

[node]: http://nodejs.org
[npm]: http://npmjs.org
[package.json]: https://docs.npmjs.com/files/package.json
[Grunt]: https://gruntjs.com
[Gruntfile]: http://gruntjs.com/sample-gruntfile
[Getting Gtarted]: https://github.com/gruntjs/grunt/wiki/Getting-started
