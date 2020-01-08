const {src,dest,watch,series} = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const minify = require('gulp-minify');
const htmlmin = require('gulp-htmlmin');

function bs() {
  serveSass();
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  watch("./*.html").on('change', browserSync.reload);
  watch("./src/sass/**/*.sass", serveSass);
  watch("./src/sass/**/*.scss", serveSass);
  watch("./src/js/*.js").on('change', browserSync.reload);
};

function serveSass() {
    return src("./src/sass/**/*.sass","./src/sass/**/*.scss")
        .pipe(sass())
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(dest("./dist/css"))
        .pipe(browserSync.stream());
};

function bulidCSS(done) {
  src("src/**/**/.css")
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(dest('dist/css'))
  done();
}

function bulidJS(done) {
  src(['js/**.js','!js/**.min.js'])
    .pipe(minify({ext:{
            min:'.js'
          }
        }))
    .pipe(dest('dist/js'))
  src('js/**.min.js').pipe(dest('dist/js'))
  done();
}

function html(done) {
  src('**.html')
    .pipe(htmlmin({collapseWhitespace: true }))
    .pipe(dest('dist/'));
  done();
}

exports.serv = bs;
exports.bulid = series(bulidCSS,bulidJS,html);
