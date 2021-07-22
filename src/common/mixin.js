import { debounce } from "./utils";
import BackTop from "../components/content/backTop/BackTop.vue"

export const itemListenerMixin = {
  mounted() {
    let newRefresh = debounce(this.scroll.refresh, 100)
    this.itemImgListener = () => {
      newRefresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImgListener)
  }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backClick() {
      // 500为规定500ms内滚回到相应的x，y坐标
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
  }
}