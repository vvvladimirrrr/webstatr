const gulp = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('hello', function(done){
	console.log('Привет мир');
	done();
});

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  gulp.watch("./*.html").on('change', browserSync.reload);
});

var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
 
gulp.task('css-min', function (done) {
    gulp.src('src/**/*.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist'));
        done();
});