var gulp = require('gulp');

var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concatCSS = require('gulp-concat-css');
var concat = require('gulp-concat');
var smushit = require('gulp-smushit');
var jasmine = require('gulp-jasmine-phantom');
var bump = require('gulp-bump');
var exec = require('child_process').exec;

gulp.task('minify-css', function() {
  return gulp.src('styles/app.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('dest'));
});

gulp.task('uglify', function() {
  return gulp.src('js/app.js')
    .pipe(uglify())
    .pipe(gulp.dest('dest'));
});

gulp.task('jshint', function() {
  return gulp.src('js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('sass', function(){
  return gulp.src('sass/*.scss')
    .pipe(sass()) // Using gulp-sass
    .pipe(gulp.dest('styles'))
});

gulp.task('concatCSS', function () {
  return gulp.src('styles/*.css')
    .pipe(concatCSS("styles/app.css"))
    .pipe(gulp.dest('.'));
});

gulp.task('concatJS', function() {
  return gulp.src('js/*.js')
    .pipe(concat('app.js'))
    .pipe(gulp.dest('js'));
});

gulp.task('smushit', function () {
  return gulp.src('img/*.{jpg,png}')
    .pipe(smushit())
    .pipe(gulp.dest('dest/img'));
});

gulp.task('jasmine', function () {
  return gulp.src('spec/app/appSpec.js')
    .pipe(jasmine());
});

gulp.task('deploy', ['exec'], function(){
  gulp.src(['./package.json', './index.html'])
  .pipe(bump())
  .pipe(gulp.dest('.'))
});

// gulp.task('exec', function() {
//   exec('git add .');
//   exec('git commit -m "Another commit."');
// });

gulp.task('task1', function (cb) {
  exec('git add .', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('task2', function (cb) {
  exec('git commit -m "Another commit."', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});



gulp.task('default', ['uglify', 'minify-css'], function(logLevel, message) {
  //console.log('[' + logLevel + ']' + ' ' + message);
});
