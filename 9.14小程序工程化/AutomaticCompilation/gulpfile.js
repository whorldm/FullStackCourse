const {watch, src, dest, parallel} = require('gulp');
const less = require('gulp-less');
const rename = require('gulp-rename');
const through2 = require('through2');

const outputPath = __dirname + '/dist';

const copyFiles = () => {
    return src(['src/**/**.js', 'src/**/**.json', 'src/**/**.wxml', 'src/**/**.wxss'])
        .pipe(dest(outputPath));
};

const copyLess = () => {
    return src('src/**/**.less')
        .pipe(less())
        .pipe(through2.obj(function(file, _, cb) {
            if (file.isBuffer()) {
                const code = file.contents.toString();
                file.contents = Buffer.from(code.replace(/(\d+)px/g, function(allCode, number) {
                    return (+number) / 2 + 'rpx';
                }));
            }
            cb(null, file);
        }))
        .pipe(rename(file => {
            file.extname = '.wxss';
        }))
        .pipe(dest(outputPath));
}

module.exports.default = () => {
    watch('src/**/**', parallel(copyFiles, copyLess));
};