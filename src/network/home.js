import { request } from "./request"


export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

export function getHomeGoods(type, page) {
  return request({
    url: "/home/data",
    params: {
      type,
      page
    }
  })

}


// 函数调用 -> 压入函数栈（保存函数调用过程中所有变量）
// 函数调用结束 -> 弹出函数栈（释放函数所有的变量）
// function test() {
//   const names = ['Chloe', 'aaa']

// }

// test()

// let totalNums = []
// const nums = [20, 11, 222]

// totalNums.push(...nums1)