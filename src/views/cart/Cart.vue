<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ cartLength }})</div>
    </nav-bar>

    <scroll class="content" :probeType="3" ref="scroll">
      <!-- 商品列表 -->
      <cart-list></cart-list>
    </scroll>

    <!-- 底部汇总 -->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar.vue";
import CartList from "./childComps/CartList.vue";
import Scroll from "../../components/common/scroll/Scroll.vue";
import CartBottomBar from "./childComps/CartBottomBar.vue";

import { mapGetters } from "vuex";

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    Scroll,
    CartBottomBar,
  },
  computed: {
    // 两种语法
    // 1. 直接后面跟一个数组  将getters中的方法映射过来
    ...mapGetters(["cartLength"]),

    // 2。 后面跟一个对象  key为自定义名称  value为getters中定义的东西
    // ...mapGetters({
    //   length: 'cartLength',
    //   list: 'cartList'
    // })
  },
  activated() {
    this.$refs.scroll.refresh();
  },
};
</script>

<style scoped>
.nav-bar {
  position: relative;
  background-color: var(--color-tint);
  color: #fff;
  z-index: 9;
}

.cart {
  height: 100vh;
}

.content {
  height: calc(100% - 44px - 49px - 40px);
  overflow: hidden;
}
</style>