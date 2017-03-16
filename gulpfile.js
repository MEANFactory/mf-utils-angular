/**
 * Created by MEAN Factory on 6/17/16.
 */

/*jshint node: true*/
'use strict';

var $           = require('gulp-load-plugins')({ lazy: true }),
    args        = require('yargs').argv,
    config      = require('./gulp.config'),
    del         = require('del'),
    gulp        = require('gulp'),
    merge       = require('merge-stream'),
    path        = require('path'),
    pump        = require('pump');

var port        = process.env.PORT || config.defaultPort;

gulp.task('help', $.taskListing);
gulp.task('default', ['help']);

gulp.task('validate-js', function(){
    log('Analyzing source...');
    return gulp
        .src(config.files.js.all)
        .pipe($.if(args.verbose, $.print()))
        .pipe($.jscs())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
        .pipe($.jshint.reporter('fail'));
});
gulp.task('validate-js-watch', function(){
    gulp.watch(config.files.js.all, ['validate-js']);
});

gulp.task('clean', function(){
    clean(config.folders.dist);
});

gulp.task('compile-js', function(done){
    pump([
        gulp.src(config.files.js.mine),
        $.concat(config.solutionName + '.js'),
        gulp.dest(config.folders.dist)
    ], done);
});

gulp.task('compile-js-min', function(done){
    pump([
        gulp.src(config.files.js.mine),
        $.concat(config.solutionName + '.min.js'),
        $.uglify(),
        gulp.dest(config.folders.dist)
    ], done);
});

gulp.task('compile', ['clean', 'compile-js', 'compile-js-min']);

/**
 * Bump the version
 * --type=pre will bump the prerelease version *.*.*-x
 * --type=patch or no flag will bump the patch version *.*.x
 * --type=minor will bump the minor version *.x.*
 * --type=major will bump the major version x.*.*
 * --version=1.2.3 will bump to a specific version and ignore other flags
 */
gulp.task('bump', function() {
    var msg = 'Bumping versions';
    var type = args.type;
    var version = args.version;
    var options = {};
    if (version) {
        options.version = version;
        msg += ' to ' + version;
    } else {
        options.type = type;
        msg += ' for a ' + type;
    }
    log(msg);

    return gulp
        .src(config.packages)
        .pipe($.print())
        .pipe($.bump(options))
        .pipe(gulp.dest(config.folders.root));
});

// -----------------------------------

function changeEvent(event){
    var srcPattern = new RegExp('/.*(?=/' + config.source + ')/');
    log('File ' + event.path.replace(srcPattern, '') + ' ' + event.type);
}

function clean(path){
    log('Cleaning: ' + $.util.colors.blue(path));
    return del(path);
}

function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}
