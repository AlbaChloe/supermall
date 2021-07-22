import { request } from "./request"


export function getDetail(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}


// class Person {
//   constructor(name, age) {
//     this.name = name;
//     this.age = age;
//   }
// }

// const p = new Person('Chloe', 19)

export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
  }
}


// 说明了在下一次直接const g之后会有下面的这些属性
// const g = new Goods()
// g.title;
// g.desc;
// g.newPrice;

// 判断一个对象为不为空:
// const obj = {

// }

// Object.keys(obj).length === 0


export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods
  }
}

export class GoodsParams {
  constructor(info, rule) {
    // 注：images可能没有值（某些商品有值，某些没有值）
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}

export function getRecommend() {
  return request({
    url: '/recommend'
  })
}