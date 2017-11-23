const gulp  =require('gulp'); //gulp
const babel = require('gulp-babel'); //gulp babel


gulp.task('default', function () {
        gulp.src('src/app.js')
            .pipe(babel({
                presets: ['env']
            }))
            .pipe(gulp.dest('dist'))
    }
);