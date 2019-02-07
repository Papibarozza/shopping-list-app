var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');


//Run 'gulp' and then browse to localhost:5000 to see the live reloads. 

gulp.task('sass', function() {
    const includePaths = ['./node_modules/nebula-css/', './assets/styles/scss/'];
   
    return gulp.src('./assets/styles/scss/*.scss')
        .pipe(sass({includePaths}).on('error', sass.logError)) 
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./public/stylesheets/'));
});

gulp.task('js', function() {
  gulp.src([
          'node_modules/jquery/dist/jquery.js',           
          './assets/js/*.js'
      ])       
      .pipe(concat('scripts.js'))
      .pipe(gulp.dest('./public/javascripts'));
});






gulp.task('watch', function() {
  gulp.watch('./assets/styles/scss/*.scss', gulp.parallel('sass'));
  gulp.watch('./assets/styles/scss/*/*.scss',gulp.parallel('sass'));
  gulp.watch('./assets/js/*.js',gulp.parallel('js'));
  gulp.watch(['./**/*.js', './**/*.html', './**/*.css','./**/*.ejs']).on("change",
  browserSync.reload);
});

gulp.task('gulp_nodemon', function () {
  nodemon({
  script: './bin/www'           //this is where my express server is
  , ext: 'js html css ejs'          //nodemon watches *.js, *.html and *.css files
  , env: { 'NODE_ENV': 'development' }
  });
  });
  
  gulp.task('sync', function(){
  browserSync.init({
  port: 3002,                      //this can be any port, it will show our app
  proxy: 'http://localhost:3000/', //this is the port where express server works
  ui: {port: 3003},                //UI, can be any port
  reloadDelay: 20,                //Important, otherwise syncing will not work
  notify: false
  });

  });
  


gulp.task('default',gulp.parallel('watch','sync'));

