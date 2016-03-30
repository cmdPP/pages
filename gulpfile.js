var gulp = require('gulp'),
  gLP = require('gulp-load-plugins'),
  del = require('del');
  
var plugins = gLP({
  rename: {
    'gulp-minify-css': 'minifyCSS'
  }
});

gulp.task('clean', function() { return del('css'); });
gulp.task('build', ['clean'], function() {
  return gulp.src('sass/**/*.scss')
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass())
    .pipe(plugins.minifyCSS())
    .pipe(plugins.concat('style.min.css'))
    .pipe(plugins.sourcemaps.write('./'))
    .pipe(gulp.dest('css'));
});
