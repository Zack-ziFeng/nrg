let gulp = require('gulp');
let sass = require('gulp-sass');
var babel = require("gulp-babel");    // 用于ES6转化ES5
var uglify = require('gulp-uglify'); // 用于压缩 JS

gulp.task('compileSass', function(){
	gulp.src(['./src/sass/*.scss'])
	.pipe(sass({outputStyle: 'compact'}))
	.pipe(gulp.dest('./src/css/'))
});

gulp.task('auto', function(){
	gulp.watch('./src/sass/*.scss', ['compileSass']);
});

var opt = {
  //mangle: {except: ['require' ,'exports' ,'module' ,'$']}//排除混淆关键字
  mangle:true, //是否修改变量名(混淆)（类型：Boolean，默认：true）
  compress: true,//类型：Boolean 默认：true 是否完全压缩
  preserveComments: 'all' //保留所有注释
}

gulp.task("toes5", function () {
  return gulp.src("./src/js/*.js")// ES6 源码存放的路径
    .pipe(babel()) 
    .pipe(gulp.dest("./src/js/js_es5/")); //转换成 ES5 存放的路径
});

gulp.task('jsmin', function () {
  gulp.src(['./src/js/js_es5/*.js', '!src/js/**/{test1,test2}.js'])
    .pipe(uglify(opt))
    .pipe(gulp.dest('./src/js/js_min/'));
});