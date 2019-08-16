/* eslint-disable */
'use strict';

var gulp = require('gulp');
var order = require('gulp-order');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var del = require('del');
var ghPages = require('gh-pages');

gulp.task('js', function () {
  return gulp.src('source/js/modules/**/*.js')
    .pipe(order([
      '!main.js',
      '*.js'
    ]))
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(rename(function (path) {
      path.basename += '.min';
    }))
    .pipe(gulp.dest('build/js'));
});

gulp.task('copy', function () {
  return gulp.src([
    'source/css/**',
    'source/fonts/**/*.{woff,woff2}',
    'source/img/**',
    'source/photos/**',
    'source/favicon.ico',
    'source/index.html'
  ], {
    base: 'source'
  })
    .pipe(gulp.dest('build'));
});

gulp.task('clean', function () {
  return del('build');
});

gulp.task('build', gulp.series(
  'clean',
  'copy',
  'js'
));

gulp.task('deploy', function (cb) {
  ghPages.publish('build',cb);
});
