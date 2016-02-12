//load the gulp module to the project
var gulp=require('gulp');
var gutil=require('gulp-util');
var debug = require('gulp-debug');
var inject = require ('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var tsc = require('gulp-typescript');
var tscProject = tsc.createProject('tsconfig.json');
var connect = require('gulp-connect');
var open =require('gulp-open');

//example task
gulp.task('default',function(){
    gutil.log("example started...")
});

// Declare file sources
var TypeScriptSources = [
    './Scripts/**/*.ts',
    './typings/**/*.ts'];

var HTMLSources = ['./**/*.html'];
var CSSSources = ['./Content/**/*.css'];

// This task Transpiles TypeScript to JavaScript
gulp.task('transpile', function () {
    gutil.log("transpiling...");

    var tsResult = gulp.src(TypeScriptSources)
        .pipe(sourcemaps.init())
        .pipe(tsc(tscProject))
        .on('error', gutil.log);

    tsResult.dts.pipe(gulp.dest('./Scripts/'));
    return tsResult.js
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./Scripts/'))
        .on('error', gutil.log)
        .pipe(connect.reload()); 
});


//This task reloads the brower when any changes occur to html pages
gulp.task("html", function(){
    gutil.log("html changed...");
    gulp.src(HTMLSources)
    .pipe(connect.reload());
});

//this task reloads the brower when any changes occur to css files
gulp.task('css', function(){
   gutil.log("css files changed...");
   gulp.src(CSSSources)
   .pipe(connect.reload()); 
});


// This task creates a local server and turns on livereload functionality
gulp.task("connect", function () {
    connect.server({
        root: './',
        livereload: true
    });
});


// This task watches .ts .js and .html files for any changes
gulp.task("watch", function () {
    gulp.watch(TypeScriptSources, ['transpile']);
    gulp.watch(HTMLSources, ['html']);
    gulp.watch(CSSSources, ['css']);
});

// This task opens Chrome within the local connect server
gulp.task('open', function () {
    gulp.src('./index.html')
        .pipe(open({uri: 'http://localhost:8080', app: 'Chrome'}));
});


gulp.task("default",["transpile", "html", "css", "connect", "watch", "open"]);