'use strict';

var config    = require('../config').svgSprite;
var gulp      = require('gulp');
var svgstore  = require('gulp-svgstore');
var imagemin  = require('gulp-imagemin');
var path      = require('path');
var render    = require('gulp-compile-handlebars');
var fs        = require('fs');
var glob      = require('glob');
var del       = require('del');
var rename    = require('gulp-rename');

// Sprite metadata Helper
function getData() {
  let icons = {};
  icons.shapes = [];
  const files = glob.sync('./src/icons/*.svg');

  files.map((file) => {
    const contents = fs.readFileSync(file, 'utf8');
    const fileName = path.basename(file).split('.')[0];
    const width = contents.match(/width\=\"([A-Za-z0-9 _]*)\"/)[1];
    const height = contents.match(/height\=\"([A-Za-z0-9 _]*)\"/)[1];

    icons.shapes.push({
      name: fileName,
      width,
      height,
    });
  });

  return icons;
}

// Clean
gulp.task('sprite:clean', function(cb){
  del([config.dest + '/images/sprite.svg'], {dot: true}).then(paths => {
    cb();
  });
});

// Metadata
gulp.task('sprite:sass', ['sprite:clean'], function(){
  return gulp.src(config.sassTemplate)
    .pipe(render(getData(), config.renderOptions))
    .pipe(gulp.dest(config.sassDest));
});

// Sprite
gulp.task('sprite', ['sprite:sass'], function(){
  return gulp.src(config.src)
    .pipe(imagemin())
    .pipe(svgstore())
    .pipe(rename({
      basename: config.spriteImgName,
    }))
    .pipe(gulp.dest(config.dest));
});
