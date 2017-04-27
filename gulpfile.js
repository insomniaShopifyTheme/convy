// https://github.com/unlight/gulp-cssimport
var gulp = require('gulp');
var cssimport = require("gulp-cssimport");
var concat = require('gulp-concat');
var pump = require('pump');
var gulpSequence = require('gulp-sequence').use(gulp)

var globalConfig = {
  scss_src: './src/scss', // your dev stylesheet directory. No trailing slash
  scripts_src: './src/scripts'
};

// Process CSS
gulp.task('styles', function() {
  return gulp.src(globalConfig.scss_src + '/**/*.*')
    .pipe(cssimport())
    .pipe(gulp.dest('assets/'));
})

gulp.task('scripts', function() {
  return gulp.src([
      globalConfig.scripts_src + '/lib/jquery.selectric.js',
      globalConfig.scripts_src + '/setup.js',
      globalConfig.scripts_src + '/theme/currency.js',
      globalConfig.scripts_src + '/theme/sections.js',
      globalConfig.scripts_src + '/theme/variants.js',
      globalConfig.scripts_src + '/customers.js',
      globalConfig.scripts_src + '/map.js',
      globalConfig.scripts_src + '/product-card.js',
      globalConfig.scripts_src + '/drawers.js',
      globalConfig.scripts_src + '/modal.js',
      globalConfig.scripts_src + '/swatches.js',
      globalConfig.scripts_src + '/mobile-nav.js',
      globalConfig.scripts_src + '/header-section.js',
      globalConfig.scripts_src + '/slideshow-section.js',
      globalConfig.scripts_src + '/slider-section.js',
      globalConfig.scripts_src + '/product-template.js',
      globalConfig.scripts_src + '/collection-template.js',
      globalConfig.scripts_src + '/contact-template.js',
      globalConfig.scripts_src + '/featured-product-section.js',
      globalConfig.scripts_src + '/admin.js',
      globalConfig.scripts_src + '/init.js',
    ])
    .pipe(concat('theme.js.liquid'))
    .pipe(gulp.dest('./build/assets/'));
});


// Watch files
gulp.task('watch', function() {
  gulp.watch(globalConfig.scss_src + '/**/*.*', ['styles']);
  gulp.watch(globalConfig.scripts_src + '/scripts/**/*.js', ['scripts']);
});


//build 
gulp.task('build', gulpSequence('styles', 'scripts'));

// Default task
gulp.task('default', ['watch']);