<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <div class="info-desc clear-fix">
      <div class="start"></div>
      <div class="desc">{{ detailInfo.desc }}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{ detailInfo.detailImage[0].key }}</div>
    <div class="info-list">
      <img
        v-for="(item, index) in detailInfo.detailImage[0].list"
        :key="index"
        :src="item"
        @load="imgLoad"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailGoodsInfo",
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      counter: 0,
      imagesLength: 0,
    };
  },
  methods: {
    // 尝试方法一：
    // imgLoad() {
    //   this.$bus.$emit("detailImgLoad");
    // },
    // 尝试方法二：
    imgLoad() {
      // 判断，所有的图片都加载完了，那么进行一次回调就可以了
      if (++this.counter === this.imagesLength) {
        this.$emit("imageLoad");
      }
      // this.$emit("imageLoad");
    },
  },
  watch: {
    detailInfo() {
      // 目的是为了只获取一次获取图片的个数
      this.imagesLength = this.detailInfo.detailImage[0].list.length;
    },
  },
  // 详情页点进去滚不动bug解决方法一：
  // created() {
  //   // 自动刷新页面函数
  //   function refresh() {
  //     let url = location.href;
  //     let once = url.split("#");
  //     if (once[1] != 1) {
  //       url += "#1";
  //       self.location.replace(url);
  //       window.location.reload();
  //     }
  //     console.log(url);
  //     // url = url.slice(0, url.length - 2);
  //     // console.log(url);
  //   }
  //   setTimeout(() => {
  //     refresh();
  //   }, 0);
  // },
};
</script>

<style scoped>
.goods-info {
  position: relative;
  padding: 20px 0;
}

.info-desc {
  width: 100%;
  padding: 10px;
}

.info-key {
  font-size: 18px;
  font-weight: 600;
  padding: 10px;
  margin-bottom: 10px;
}

.info-list img {
  width: 100%;
}
</style>