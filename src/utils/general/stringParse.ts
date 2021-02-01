/*
 * @Author: shuhongxie
 * @Date: 2021-02-01 22:00:53
 * @LastEditors: shuhongxie
 * @LastEditTime: 2021-02-01 22:03:53
 * @FilePath: /fat-ui/src/utils/general/stringParse.ts
 */

/**
 * @Description: 类型转换
 * @Author: shuhongxie
 * @param {number} value
 * @param {*} suffix
 */
export default function stringParse(value: number | string, suffix = 'px') {
  if (typeof value === 'number') {
    return `${value}${suffix}`
  }
  return value
}
