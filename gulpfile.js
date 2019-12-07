const {src,dest,watch} = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

function bs() {
  serveSass();
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  watch("./*.html").on('change', browserSync.reload);
  watch("./src/sass/**/*.sass", serveSass);
  watch("./src/js/*.ls").on('change', browserSync.reload);
};

function serveSass() {
    return src("./src/sass/*.sass")
        .pipe(sass())
        .pipe(dest("./dist/css"))
        .pipe(browserSync.stream());
};

exports.serv = bs;

var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
 
function cssMin () {
    src('src/**/*.css')
        pipe(cssmin())
        pipe(rename({suffix: '.min'}))
        pipe(gulp.dest('dist'));

};

exports.css_min = cssMin;