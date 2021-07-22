<template>
  <div id="detail">
    <!-- 导航栏 -->
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav" />
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probeType="3">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imgLoad" />
      <detail-params-info
        :params-info="paramsInfo"
        ref="params"
      ></detail-params-info>
      <detail-comment-info
        :comment-info="commentInfo"
        ref="comments"
      ></detail-comment-info>
      <goods-list :goods="recommends" ref="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>

    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <!-- <toast :message="message" :show="show"></toast> -->
  </div>
</template>


<script>
// 组件的引用
import DetailNavBar from "./DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailParamsInfo from "./childComps/DetailParamsInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import GoodsList from "../../components/content/goods/GoodsList.vue";
import DetailBottomBar from "./childComps/DetailBottomBar.vue";
import BackTop from "../../components/content/backTop/BackTop.vue";

// 常用函数的引用
import { debounce } from "../../common/utils";

//工具组件的引用
import Scroll from "../../components/common/scroll/Scroll.vue";
// import Toast from "../../components/common/toast/Toast.vue";

// 数据的引用
import {
  getDetail,
  Goods,
  Shop,
  GoodsParams,
  getRecommend,
} from "../../network/detail";

// 方法/信息的映射
import { mapActions } from "vuex";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    BackTop,
    // Toast,
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramsInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0, // navBar当前index
      isShowBackTop: false, // 返回按钮显示与否
      // message: "", // Toast中显示的message
      // show: false, // Toast显示与否
    };
  },
  created() {
    // 1. 保存传入的iid
    this.iid = this.$route.params.iid;

    // 2. 根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      // 1. 获取顶部的图片轮播数据
      const data = res.result;
      console.log(res);
      this.topImages = data.itemInfo.topImages;

      // 2. 获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 3. 创建店铺信息对象
      this.shop = new Shop(data.shopInfo);

      // 4. 获取商品详细信息
      this.detailInfo = data.detailInfo;

      // 5. 获取商品参数信息
      this.paramsInfo = new GoodsParams(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 6. 取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }

      // this.$nextTick(() => {
      //   // 值不对的原因： 图片没有加载完成
      //   // 根据最新的数据，对应的DOM是已经被渲染出来
      //   // 但是图片依然是没有加载完（目前获取到offsetTop不包含其中的图片）
      //   // offsetTop值不对的时候，都是因为图片的问题
      //   this.themeTopYs = [];
      //   this.themeTopYs.push(0);
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.comments.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.recommends.$el.offsetTop);
      //   console.log(this.themeTopYs);
      // });
    });

    // 3, 请求详情页推荐数据
    getRecommend().then((res) => {
      this.recommends = res.data.list;
    });

    // 4. 给getThemeTopY赋值(对给this.themTopYs赋值的操作进行防抖)
    // 这里是根据详情页的tabControl跳转对应位置，因为是组件，所以用$el获取offsetTop值，然后再在图片书信完之后调用，利用防抖优化只调用一次
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comments.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommends.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);
    }, 100);
  },
  methods: {
    // 监听详情的图片加载完成
    imgLoad() {
      this.$refs.scroll.refresh();
      this.getThemeTopY();
    },

    // 这里是点击tabControl跳转到对应的位置的监听事件
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 500);
    },

    // 这里是监听滚动到对应位置时tabControl变化  |  监听滚动
    contentScroll(position) {
      // 1. 获取y值
      const positionY = -position.y;

      // 2. positionY和主题中的值进行对比
      // 假设这里themeTopYs = [0, 1000, 2000, 3000]
      // positionY 在0 - 1000 之间，index = 0
      // positionY 在1000 - 2000 之间，index = 1
      // positionY 在2000 - 3000 之间，index = 2
      // positionY 在超过 3000 时，index = 3
      // for (let i in this.themeTopYs) {
      //   // ps: 这里直接得到的 i 是个str  所以 i + 1 为 i1 不可行
      //   if (
      //     positionY > this.themeTopYs[i] &&
      //     positionY < this.themeTopYs[i + 1]
      //   ) {
      //   }
      // }

      let length = this.themeTopYs.length;
      for (let i = 0; i < length - 1; i++) {
        // 方法一：分两种情况
        // if (
        //   this.currentIndex !== i &&
        //   ((i < length - 1 &&
        //     positionY >= this.themeTopYs[i] &&
        //     positionY < this.themeTopYs[i + 1]) ||
        //     (i === length - 1 && positionY >= this.themeTopYs[i]))
        // ) {
        //   this.currentIndex = i;
        //   this.$refs.nav.currentIndex = this.currentIndex;
        // }

        // 方法二： 手动添加一个很大的值  eg: themeTopYs = [0, 1000, 2000, 3000, Number.Max_Value] 见136   可以只分一种情况 此时遍历的时候要将length - 1 见174
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }

      // 3. 是否显示回到顶部
      this.isShowBackTop = -position.y > 1000;
    },

    // 点击backTop返回顶部事件
    backClick() {
      // 500为规定500ms内滚回到相应的x，y坐标
      this.$refs.scroll.scrollTo(0, 0, 500);
    },

    // 点击加入购物车监听事件
    addToCart() {
      // 1. 获取购物车需要展示的商品信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      // 2. 将商品添加到购物车（1.返回Promise 2. mapActions）
      // this.$store.commit("addCart", product);
      // 方法一：
      // this.$store.dispatch("addCart", product).then((res) => {
      //   console.log(res);
      // });

      // 方法二： 利用映射actions的方法
      this.addCart(product).then((res) => {
        // this.show = true;
        // this.message = res;

        // setTimeout(() => {
        //   this.show = false;
        //   this.message = "";
        // }, 1500);

        // 利用封装的toast
        this.$toast.show(res);
      });
    },
    // 映射actions里的方法  就可以直接调用actions里面的函数了  对应上面addToCart的方法二
    ...mapActions(["addCart"]),
  },
  mounted() {
    // detail详情页加载完图片刷新scrollHeight
    this.$bus.$on("detailImgLoad", () => {
      this.$refs.scroll.refresh();
    });
    // bug修改之尝试一：
    // const refresh = this.debounce(this.$refs.scroll.refresh, 500);
    // this.$bus.$on("detailImgLoad", () => {
    //   refresh();
    // });
    // bug修改之尝试二：
    // this.$nextTick(() => {
    //   this.$refs.scroll.refresh();
    // });
    // bug修改之尝试三：
    // setTimeout(() => {
    //   this.$refs.scroll.refresh();
    // }, 500);
  },
};

// function myrefresh() {
//   window.location.reload();
// }

// myrefresh();
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 11;
  background-color: #fff;
  height: 100vh;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  height: calc(100% - 44px - 58px);
  background-color: #fff;
}
</style>