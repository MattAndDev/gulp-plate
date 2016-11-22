'use strict';

// var gulp          = require('gulp');
// var svgSprite     = require('gulp-svg-sprite');
// var del           = require('del');
// var config        = require('../config').svgSprite;
// var plumber       = require('gulp-plumber');
// var handleErrors  = require('../util/handleErrors');


// var spriteTemplate = config.type === 'symbol' ? config.templateSymbol : config.templateCss;

// var spriteOptions = {
//   mode: {
//     [config.type]: {
//       layout: 'horizontal',
//       sprite: config.spriteImgName,
//       dest: '.',
//       render: {
//         scss: {
//           template: spriteTemplate,
//           dest: config.sassDest
//         }
//       }
//     }
//   },
//   variables: config.templateVars
// };

// // Clean
// gulp.task('sprite:clean', function(cb){
//   del([config.dest + '/images/sprite*.svg'], {dot: true}).then(paths => {
//     cb();
//   });
// });

// gulp.task('sprite', ['sprite:clean'], function (cb) {
//   return gulp.src(config.glob, {cwd: config.src})
//     .pipe(plumber())
//     .pipe(svgSprite(spriteOptions))
//     .on('error', handleErrors)
//     .pipe(gulp.dest(config.dest));
// });

// gulp.task('sprite', function (cb) {
//   return gulp.src(config.glob, {cwd: config.src})
//     .pipe(plumber())
//     .pipe(svgSprite(spriteOptions))
//     .on('error', handleErrors)
//     .pipe(gulp.dest(config.dest));
// });

var data = [];

var gulp = require('gulp');
var svgstore = require('gulp-svgstore');
var imagemin      = require('gulp-imagemin');
var path = require('path');
var gutil = require('gulp-util');
var through2 = require('through2');
var cheerio = require('cheerio');
var flatmap = require('gulp-flatmap');
var path            = require('path');
var merge = require('merge-stream');
var render = require('gulp-compile-handlebars');
var fs = require('fs');
var glob = require('glob');

function getData() {
  const icons = [];

  glob('./src/icons/*.svg', (er, files) => {
    files.map((file) => {

      const contents = fs.readFileSync(file, 'utf8');
      const fileName = path.basename(file);
      const width = contents.match(/width\=\"([A-Za-z0-9 _]*)\"/)[1];
      const height = contents.match(/height\=\"([A-Za-z0-9 _]*)\"/)[1];

      icons.push({
        name: fileName,
        width,
        height,
      });
    });
  });

  setTimeout(()=>{
    return icons;
  }, 300);
}

gulp.task('svgstore', function(){
  getData();
});

// gulp.task('svgstore:data', function () {
//   var str = gulp.src('./src/icons/*.svg')
//     .pipe(flatmap(function(stream, file){
//       var contents = file.contents.toString('utf8');
//       var fileName = file.relative.split('.')[0];
//       var width = contents.match(/width\=\"([A-Za-z0-9 _]*)\"/)[1]
//       var height = contents.match(/height\=\"([A-Za-z0-9 _]*)\"/)[1]

//       data.push({
//         name: fileName,
//         width,
//         height,
//       });
//       return stream;
//     }));

//     return merge(str);
// });



// gulp.task('svgstore', function() {
//   return gulp.src('./src/icons/*.svg')
//     .pipe(imagemin()) // Optimize
//     .pipe(svgstore())
//     .pipe(through2.obj(function (file, encoding, cb) {
//         var $ = cheerio.load(file.contents.toString(), {xmlMode: true});
//         var data = $('svg > symbol').map(function () {
//             return {
//                 name: $(this).attr('id'),
//                 viewBox: $(this).attr('viewBox')
//             };
//         }).get();
//         var jsonFile = new gutil.File({
//             path: 'metadata.json',
//             contents: new Buffer(JSON.stringify(data))
//         });
//         this.push(jsonFile);
//         this.push(file);
//         cb();
//     }))
//     .pipe(gulp.dest('test-dist'));
// });