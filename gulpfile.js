const{
    src/*poisk filow*/
    ,dest/*mesto otprawki*/
    ,watch/*obserwator*/
    ,parallel/*soedeniart neskolko funktiy w odnu komandu*/
    ,series/*posledowatelnost6 wypolneniya taskow*/
} = require('gulp');


const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
// const autoprefixer = require('gulp-autoprefixer').default; /*nie rabotayet */
const clean = require('gulp-clean');


function scripts(){
    return src([
        'app/js/main.js'
    ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream())
}

function styles(){
    return src('app/scss/style.scss')
        .pipe(concat('style.min.css'))
        .pipe(scss({outputStyle: 'compressed'}))
        // .pipe(autoprefixer({ overrideBrowserslist: ['last 5 version']})) /*nie rabotayet */
        .pipe(dest('app/css'))
        .pipe(browserSync.stream())
}

function watching(){
    watch(['app/scss/style.scss'], styles)
    watch(['app/js/main.js'], scripts)
    watch(['app/*.html']).on('change', browserSync.reload);
}

function browsersync(){
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
}

function cleanDist(){
    return src('dist')
    .pipe(clean())
}

function building(){
    return src([
        'app/css/style.min.css',
        'app/js/main.min.js',
        'app/**/*.html'
    ], {base : 'app'})
    .pipe(dest('dist'))
}

exports.styles = styles;
exports.scripts = scripts;
exports.watching = watching;
exports.browsersync = browsersync;

exports.build = series(cleanDist, building)/*gulp build */
exports.default = parallel(styles, scripts, watching, browsersync);/*gulp*/
