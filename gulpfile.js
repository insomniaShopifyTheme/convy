// https://github.com/unlight/gulp-cssimport
var gulp = require('gulp');
var cssimport = require("gulp-cssimport");
var concat = require('gulp-concat');

var globalConfig = {
  src: 'scss' // your dev stylesheet directory. No trailing slash
};

// Process CSS
gulp.task('styles', function(){
  return gulp.src(globalConfig.src + '/**/*.*')
    .pipe(cssimport())
    .pipe(gulp.dest('assets/'));
})

gulp.task('scripts', function() {
  return gulp.src([
      './scripts/setup.js',
      './scripts/theme/currency.js',
      './scripts/theme/sections.js',
      './scripts/theme/variants.js',
      './scripts/customers.js',
      './scripts/map.js',
      './scripts/drawers.js',
      './scripts/mobile-nav.js',
      './scripts/slideshow-section.js',
      './scripts/slider-section.js',
      './scripts/product-template.js',
      './scripts/init.js',
    ])
    .pipe(concat('theme.js.liquid'))
    .pipe(gulp.dest('./assets/'));
});

// Watch files
gulp.task('watch', function () {
  gulp.watch(globalConfig.src + '/**/*.*', ['styles']);
  gulp.watch('./scripts/**/*.js', ['scripts']);
});

// Default task
gulp.task('default', ['watch']);