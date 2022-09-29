const gulp = require("gulp");
const { src, dest, watch, parallel, series } = require("gulp");
var rename = require("gulp-rename");

const concat = require('gulp-concat');
const terser = require('gulp-terser');

var globs = 
{
    html:"project/*.html",
    css:"project/style/**/*.css",
    img:'project/images/**/*',
    js:'project/js/**/*.js'
}


//----Html Task
const htmlmin = require("gulp-htmlmin");
function minifyHTML()
{
    return src(globs.html)
    .pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
    .pipe(dest("dist"))
}

//----- CSS Task
var cleanCss = require('gulp-clean-css');
function cssMinify()
{
    return src(globs.css)
    .pipe(concat("main.css"))
    .pipe(cleanCss())
    .pipe(dest("dist/style"))
}


//------- JS Task
function jsMinify() {
    //search for sourcemaps
      return src(globs.js,{sourcemaps:true}) //path includeing all js files in all folders
      
          //concate all js files in all.min.js
          .pipe(concat('main.js'))
          //use terser to minify js files
          .pipe(terser())
          //create source map file in the same directory
          .pipe(dest('dist/js',{sourcemaps:'.'}))
}


//---------- Minify images
const imagemin = require('gulp-imagemin');
function imgMinify() {
    return gulp.src(globs.img)
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
}

//---------- Browser Sync
var browserSync = require('browser-sync');
function serve (cb){
  browserSync({
    server: {
      baseDir: 'dist/'
    }
  });
  cb()
}

function reloadTask(done) {
  browserSync.reload()
  done()
}

//watch task
function watchTask() {
    watch(globs.html,series(minifyHTML, reloadTask))
    watch(globs.js,series(jsMinify, reloadTask))
    watch(globs.css, series(cssMinify,reloadTask));
    watch(globs.img, series(imgMinify,reloadTask));
}


exports.default = series( parallel(imgMinify, jsMinify, cssMinify, minifyHTML), serve , watchTask);