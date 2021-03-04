/*
 * @Author: shuhongxie
 * @Date: 2021-03-04 14:43:36
 * @LastEditors: shuhongxie
 * @LastEditTime: 2021-03-04 21:52:29
 * @FilePath: /fat-ui/src/gulpfile.js
 */
'use strict'
const path = require('path')
const { series, src, dest } = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const cssmin = require('gulp-cssmin')
const ts = require('gulp-typescript')
const babel = require('gulp-babel')
// const tsProject = ts.createProject('./utils/tsconfig.json')

function compile() {
  return src('./style/*.scss')
    .pipe(sass.sync())
    .pipe(
      autoprefixer({
        overrideBrowserslist: ['ie > 9', 'last 2 versions'],
        cascade: false
      })
    )
    .pipe(cssmin())
    .pipe(dest(path.resolve(__dirname, '../lib/style')))
}

function copyfont() {
  return src('./style/font/*')
    .pipe(cssmin())
    .pipe(dest(path.resolve(__dirname, '../lib/style/font')))
}

function complieTs() {
  return (
    src(['./utils/general/*.ts'])
      // .pipe(tsProject())
      .pipe(ts())
      .js.pipe(dest(path.resolve(__dirname, '../lib/utils')))
  )
}

exports.build = series(compile, copyfont)
