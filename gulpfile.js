var gulp = require('gulp');
var concat = require('gulp-concat');

var uglify = require('gulp-uglify');//JavaScript компрессор
var minifyCss = require('gulp-minify-css');
var csso = require('gulp-csso');//CSS минификатор
var htmlmin = require('gulp-htmlmin');

var complexity = require('gulp-complexity');//проверка на качество кода основанная на алгоритмах Halstead и Cyclomatic
var fixmyjs = require("gulp-fixmyjs");//Исправляет мелкие ошибки в коде
var csslint = require('gulp-csslint');
var htmlhint = require("gulp-htmlhint");//HTML валидатор

var autoprefixer = require('gulp-autoprefixer');
var autopolyfiller = require('gulp-autopolyfiller');//подбирает все необходимые полифилы для JavaScript
var babel = require('gulp-babel');//конвертирует ES6/ES7 в ES5
var csscomb = require('gulp-csscomb');//облагораживает структуру CSS

var less = require('gulp-less');
var stylus = require('gulp-stylus');
var jade = require('gulp-jade');

var notify = require("gulp-notify");//выводит ошибки при сборке Gulp в виде системных сообщений

var imagemin = require('gulp-imagemin');
var responsive = require('gulp-responsive');//генерирует адаптивные изображения под требуемые разрешения 





gulp.task('response', function () {
  return gulp.src('src/*.{png,jpg}')
    .pipe(responsive({
      'background-*.jpg': {
        width: 700,
        quality: 50
      },
      'cover.png': {
        width: '50%',
        // convert to jpeg format 
        format: 'jpeg',
        rename: 'cover.jpg'
      },
      // produce multiple images from one source 
      'logo.png': [
        {
          width: 200
        },{
          width: 200 * 2,
          rename: 'logo@2x.png'
        }
      ]
    }))
    .pipe(gulp.dest('dist'));
});

 
 Создание переменных конфигурации

var config = {
  jade: ['jade/*.jade'],
  less:['styles/*.less'],
  stylus:['styles/*.styl'],
  scripts:['script/*.js'],
  img:['images/*.{png,jpg}']
};

//
//Задачи для HTML
//
gulp.task('html', function(){
  return gulp.src('jade/*.jade')
    .pipe(jade())
    .pipe(htmlhint())
    .pipe(htmlmin())
    .pipe(gulp.dest('dist/html/*.html'));  
});


//
// Задачи для стилей
//
gulp.task('less', function () {
  return gulp.src('styles/*.less')
    .pipe(less())
    .pipe(gulp.dest('dist/css/*'));
});


gulp.task('lessCss', function() {
  return gulp.src(config.less)
    .pipe(concat('styles/all.less'))
    .pipe(less())
    .pipe(csslint())
    .pipe(csscomb())
    .pipe(autoprefixer())
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/css/style.css'));
});

gulp.task('stylusCss', function() {
  return gulp.src(config.stylus)
    .pipe(concat('styles/all.styl'))
    .pipe(stylus())
    .pipe(csslint())
    .pipe(csscomb())
    .pipe(autoprefixer())
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/css/style.css'));
});


//
// Задачи для скриптов
//
gulp.task('scripts', function() {
  return gulp.src(config.scripts)
    .pipe(concat('scripts/all.js'))
    .pipe(complexity())
    .pipe(fixmyjs())
    .pipe(autopolyfiller())
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts/script.js'));
});


//
// Задачи для изображений
//
gulp.task('images', function() {
  return gulp.src(config.img)
    .pipe(cache(imagemin()))
    .pipe(gulp.dist('dist/images/*.{png,jpeg}'));
});


//
// Задачи для очистки
//
//gulp.task('clean', function() {
//  return gulp.src(['dist/styles', 'dist/scripts', 'dist/images'], {read: false})
//    .pipe(clean());
//});

//
// Задачи сборки
//

//gulp.task('build', function(){
//  //...
//});



//
// Задача watch
//
gulp.task ('watch', function(){
  gulp.watch(config.less, ['lessCss']);
  gulp.watch(config.stylus, ['stylusCss']);
  gulp.watch(config.scripts, ['scripts']);
  gulp.watch(config.html, ['html']);
});

//
// Задача по умолчанию
//
gulp.task('default', ['scripts', 'lessCss', 'stylusCss', 'html', 'watch']);