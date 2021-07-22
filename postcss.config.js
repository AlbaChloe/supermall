// module.exports = {
//   plugins: {
//     autoprefixer: {},
//     "postcss-px-to-viewport": {
//       viewportWidth: 375,
//       viewportHeight: 667,
//       unitPrecision: 5,
//       viewportUnit: 'vw',
//       selectorBlackList: ['ignore', 'tab-bar', 'tab-bar-item'],
//       minPixelValue: 1,
//       mediaQuery: false
//     }
//   }
// }

// 需要适配时npm install postcss-px-to-viewport --save -dev
// 1. 在js中使用正则： /正则相关规则/
// 2. exclude中存放的元素必须是正则表达式
// 3. 按照排除的文件写对应的正则：
// 正则的规则：
// 1> ^: 表示匹配的内容必须以什么内容开头  eg： ^abc（以abc开头）
// 2> $: 表示匹配的内容必须以什么内容结尾  eg: abc$（以abc结尾）