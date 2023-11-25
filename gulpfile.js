const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();

// Compile SASS
function compileSass() {
  return gulp.src('src/sass/**/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('src/'))
    .pipe(browserSync.stream()); // Injects CSS changes into the browser
}

// Watch for changes in SASS files
function watchSass() {
  gulp.watch('src/sass/**/*.sass', compileSass);
}

// Serve the project
function serve() {
  browserSync.init({
    server: './'
  });

  // Watch HTML and JavaScript files for changes
  gulp.watch('src/*.html').on('change', browserSync.reload);
  gulp.watch('src/js/**/*.js').on('change', browserSync.reload);
}

// Export tasks
exports.compileSass = compileSass;
exports.watchSass = watchSass;
exports.serve = serve;

// Define the default task
exports.default = gulp.series(compileSass, serve, watchSass);
