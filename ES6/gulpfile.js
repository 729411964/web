const gulp  =require('gulp'); //gulp
const babel = require('gulp-babel'); //gulp babel
const browserSync = require('browser-sync').create();
const less = require("gulp-less");
const browserify = require('gulp-browserify');

// 静态服务器
gulp.task('serve',['browserify','less','html'], function() {
    browserSync.init({
        browser: "google chrome",
        server: {
            baseDir: "./dev",
            directory: true,  // 读取目录下所有的文件夹与文件
            middleware: function (req, res, next) { //中间件
                console.log(req.method + req.url);
                next();
            }
        }
    },function () {
        console.log("服务器启动成功");
        //开启文件监听
        watchFiles();
    });

});
//ES6 转为ES5
gulp.task('babel', function () {
    return gulp.src('src/**/*.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('dev'));

});
//合并打包 ES6模块
gulp.task('browserify',['babel'],function () {
    return gulp.src('dev/**/*.js')
        .pipe(browserify({
            insertGlobals : true,
            debug : !gulp.env.production
        }))
        .pipe(gulp.dest('dev'));
})
//执行babel后，刷新浏览器
gulp.task('babel-watch',['browserify'],function () {
    browserSync.reload();
});

//less 编译
gulp.task('less',function () {
    return gulp.src('src/**/*.less')
        .pipe(less())
        .pipe(gulp.dest('dev'));
});
//编译less后，刷新浏览器
gulp.task('less-watch',['less'],function () {
    browserSync.reload();
});

//编译html
gulp.task('html',function () {
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('dev'));
});
//编译完html后，刷新浏览器
gulp.task('html-watch',['html'],function () {
    browserSync.reload();
});

//监听文件变化
var watchFiles = function () {
    //监听less
    gulp.watch(['src/**/*.less'], ['less-watch']);

    //监听js ES6 --> ES5
    gulp.watch(['src/**/*.js'], ['babel-watch']);

    //监听 html 变更
    gulp.watch(['src/**/*.html'], ['html-watch']);


};