var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');

gulp.task('minify-css', function() {
  return gulp.src('styles/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('dest'));
});

gulp.task('uglify', function() {
  return gulp.src('js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dest'));
});

gulp.task('default', ['uglify', 'minify-css'], function(logLevel, message) {
  //console.log('[' + logLevel + ']' + ' ' + message);
});
