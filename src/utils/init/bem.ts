/*
 * @Author: shuhongxie
 * @Date: 2020-11-19 17:36:43
 * @Last Modified by: shuhongxie
 * @Last Modified time: 2020-11-20 17:30:17
 */

/**
 * bem helper
 * b() // 'button'
 * b('text') // 'button__text'
 * b({ disabled }) // 'button button--disabled'
 * b('text', { disabled }) // 'button__text button__text--disabled'
 * b(['disabled', 'primary']) // 'button button--disabled button--primary'
 */

// 初始化type
type bemObj = Array<string> | Record<any, string> | string

// 初始化类名
export const initClass = (compClass: string): string => {
  return `fat-${compClass}`
}

// 初始化类名 + 子区域名 如: button__子区域名
export const initClassTextChild = (compClass: string, child: string): string => {
  return `${initClass(compClass)}__${child}`
}

// 初始化特性 如: button__text--disabled
export const initIdent = (child: string, ident: Record<any, string>): string => {
  let str = ''
  for (const key in ident) {
    str += `${child}--${key} `
  }
  return str
}

// 初始化无子区域时的class
export const initClassArrayOjbect = (name: string, child?: bemObj): string => {
  let str = ''
  if (Object.prototype.toString.call(child) === '[object Array]') {
    for (const i of child as Array<string>) {
      str += `${name}--${i}`
    }
  } else {
    for (const i in child as Record<string, any>) {
      str += `${name}--${i}`
    }
  }
  return str
}

// 有类名 有区域名时初始化
export const addTextWithIdent = (child: string, ident: Record<any, string>): string => `${child} ${initIdent(child, ident)}`

// 初始化类名格式
export default function initBem(name: string) {
  return function(childName?: bemObj, ident?: Record<any, string>): any {
    // 字符串
    if (typeof childName === 'string') {
      // 如果有携带其他标识物
      if (ident) {
        return `${initClass(name)} ${addTextWithIdent(initClassTextChild(name, childName), ident)}`
      } else {
        return initClassTextChild(name, childName)
      }
      // 数组
    } else if (Object.prototype.toString.call(childName) === '[object Array]') {
      return `${initClass(name)} ${initClassArrayOjbect(initClass(name), childName)}`
      // 对象
    } else if (Object.prototype.toString.call(childName) === '[object Object]') {
      return `${initClass(name)} ${initClassArrayOjbect(initClass(name), childName)}`
    } else {
      return initClass(name)
    }
  }
}
