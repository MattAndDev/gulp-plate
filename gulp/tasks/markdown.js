'use strict';

var gulp = require('gulp');
var config = require('../config').markdown;
var markdown = require('gulp-markdown');
var removeCode = require('gulp-remove-code');
var jeditor = require("gulp-json-editor");
var zip = require('gulp-zip');

gulp.task('markdown', function(){
  return gulp.src(config.src)
    .pipe(markdown())
    .pipe(gulp.dest(config.dest));
});