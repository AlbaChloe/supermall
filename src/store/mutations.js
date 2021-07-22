import {
  ADD_COUNTER,
  ADD_TO_CART,
} from './mutation-types'




export default {
  // mutations 唯一的目的就是修改state中的状态
  // 因为vue devtool可以跟踪每一次mutation的修改，但是如果mutations中一个方法分几种情况，到时候跟踪的数据就分辨不出来是做了哪部操作了，所以mutations中的每个方法尽可能完成的事件比较单一一点所以这些方法放到actions中
  // addCart(state, payload) {
  // payload新添加的商品
  // 方法一： for循环
  // let oldProduct = null;
  // for (let item of state.cartList) {
  // // payload传进来的商品iid与之前的商品iid重复时：
  //   if (item.iid === payload.iid) {
  //     oldProduct = item;
  //   }
  // }

  // 方法二： indexOf
  // let index = state.cartList.indexOf(payload)

  // 方法三： 数组的find函数
  // 查找之前数组中是否有该商品
  //  let oldProduct = state.cartList.find(item => item.iid === payload.iid
  //  )


  // 2. 判断oldProduct是否有值
  // 对应方法一
  // if(oldProduct) {
  //    oldProduct.count += 1
  // } else {
  //   payload.count = 1
  //   state.cartList.push(payload)
  // }

  // 对应方法二
  // payload传进来的商品重复时：
  // if(index !== -1) {
  //    let oldProduct = state.cartList[index]
  //    oldProduct.count += 1
  // }  // 不重复时： 
  // else {
  //   payload.count = 1
  //   state.cartList.push(payload)
  // }

  // 对应方法三
  // if (oldProduct) {
  //   oldProduct.count += 1
  // } else {
  //   payload.count = 1
  //   state.cartList.push(payload)
  // }
  [ADD_COUNTER](state, payload) {
    payload.count++
  },
  [ADD_TO_CART](state, payload) {
    payload.checked = true
    state.cartList.push(payload)
  }
}