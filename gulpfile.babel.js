import gulp from 'gulp';
import gLP from 'gulp-load-plugins';
import del from 'del';

var plugins = gLP({
  rename: {
    'gulp-ng-html2js': 'html2js',
    'gulp-minify-css': 'minifyCSS'
  }
});

gulp.task('clean:css', () => del('dist/css'));

gulp.task('clean:maps', () => del('dist/maps'));

gulp.task('build', ['clean:css', 'clean:maps'], () => {
  return gulp.src('sass/**/*.scss')
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass())
    // .pipe(cachebust.resources())
    .pipe(plugins.minifyCSS())
    .pipe(plugins.concat('style.min.css'))
    .pipe(plugins.sourcemaps.write('./'))
    .pipe(gulp.dest('css'));
});

// gulp.task('build:partials', () => {
//   return gulp.src('src/partials/**/*.html')
//     .pipe(plugins.html2js({
//       moduleName: 'cmdppPartials',
//       prefix: '/partials/'
//     }))
//     .pipe(plugins.concat('partials.js'))
//     .pipe(gulp.dest('dist/partials'));
// });

// gulp.task('clean:js', () => del('dist/js'));
// 
// gulp.task('build:js',['clean:js'], () => {
//   return browserify('src/js/app.js', { debug: true })
//     .transform(babel, { presets: ['es2015'] })
//     .bundle()
//     .pipe(source('bundle.js'))
//     .pipe(buffer())
//     .pipe(plugins.sourcemaps.init({ loadMaps: true }))
//     .pipe(plugins.uglify())
//     .on('error', plugins.util.log)
//     .pipe(plugins.sourcemaps.write('./'))
//     .pipe(gulp.dest('dist/js'));
// });
// 
// gulp.task('clean:index', () => del('dist/index.html'));
// 
// gulp.task('build:index', ['clean:index'], () => gulp.src('src/index.html').pipe(gulp.dest('dist')));
// 
// gulp.task('clean', () => del('dist'));
// 
// gulp.task('build', ['clean', 'build:css', 'build:js', 'build:index']);
// 
// gulp.task('webserver', ['build'], () => {
//   return gulp.src('.')
//     .pipe(plugins.webserver({
//       livereload: false,
//       directoryListing: true,
//       open: "http://localhost:8000/dist/index.html"
//     }));
// });
