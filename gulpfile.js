// https://github.com/unlight/gulp-cssimport
var gulp = require('gulp');
var cssimport = require("gulp-cssimport");
var concat = require('gulp-concat');
var pump = require('pump');
var gulpSequence = require('gulp-sequence').use(gulp)
var del = require('del');
var changed = require('gulp-changed');
var zip = require('gulp-zip');


var globalConfig = {
  scss_src: './src/scss', // your dev stylesheet directory. No trailing slash
  scripts_src: './src/scripts'
};

// Process CSS
gulp.task('styles', function() {
  return gulp.src(globalConfig.scss_src + '/**/*.*')
    .pipe(cssimport())
    .pipe(gulp.dest('./dist/assets/'));
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
    .pipe(gulp.dest('./dist/assets/'));
});

//clean task
gulp.task('clean', function() {
  return del([
    "./dist/**/*",
  ]);
});


//copy files
gulp.task('sync_files', function() {
  return gulp.src([
      "src/**/*",
      "!src/scripts/**/*",
      "!src/scss/**/*",
      "!src/scripts/",
      "!src/scss/"
    ])
    .pipe(changed("./dist/"))
    .pipe(gulp.dest('./dist/'));
});


// Watch files
gulp.task('watch', function() {
  gulp.watch(globalConfig.scss_src + '/**/*.*', ['styles']);
  gulp.watch(globalConfig.scripts_src + '/scripts/**/*.js', ['scripts']);
  gulp.watch([
    "src/**/*",
    "!src/scripts/**/*",
    "!src/scss/**/*",
    "!src/scripts/",
    "!src/scss/"
  ], ["sync_files"]);
});


//build 
gulp.task('build', gulpSequence('clean', 'sync_files', 'styles', 'scripts'));

// Default task
gulp.task('default', gulpSequence('build', 'watch'));


gulp.task("zip_build", function() {
  return gulp.src('./dist/**/*')
    .pipe(zip('konversion-theme.zip'))
    .pipe(gulp.dest('./dist'))
});

gulp.task('zip', gulpSequence('build', 'zip_build'));