let gulp = require('gulp');
let sass = require('gulp-sass');
let uglify = require('gulp-uglify');

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

gulp.task('jsmin', function () {
  gulp.src(['./src/js/*.js', '!src/js/**/{test1,test2}.js'])
    .pipe(uglify(opt))
    .pipe(gulp.dest('./src/js2/'));
});