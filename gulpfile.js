const { src, dest, parallel, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCss = require('gulp-clean-css');
const concat = require('gulp-concat');
const pug = require('gulp-pug');
const browserSync = require('browser-sync').create();

const browserSyncJob = () => {
    browserSync.init({
        server: "build/"
    });

    watch('app/sass/*.scss', buildSass);
    watch('app/pages/*.pug', buildPug);
};

const buildSass = () => {
    console.log('Compline SASS to CSS');

    return src('app/sass/*.scss')
        .pipe(sass({ sourceMap: false }))
        .pipe(cleanCss())
        .pipe(concat('app.css'))
        .pipe(dest('build/'));
};

const buildPug = () => {
    console.log('Compline Pug to HTML');

    return src('app/pages/*.pug')
        .pipe(pug())
        .pipe(dest('build/'));
};

const addAssets = () => {
    return src('app/images/**')
            .pipe(dest('build/images/'));
};

const addFonts = () => {
    return src('app/fonts/**')
            .pipe(dest('build/fonts/'));
};

exports.server = browserSyncJob;
exports.build = parallel(buildSass, buildPug, addAssets, addFonts);
exports.development = series(buildPug, buildSass, addAssets, addFonts, browserSyncJob);