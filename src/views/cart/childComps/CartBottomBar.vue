<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
        :is-checked="isSelectAll"
        class="check-button"
        @click.native="checkClick"
      ></check-button>
      <span>全选</span>
    </div>

    <div class="price">合计：{{ totalPrice }}</div>

    <div class="calculate" @click="calcClick">去计算({{ checkLength }})</div>
  </div>
</template>

<script>
import CheckButton from "../../../components/content/checkButton/CheckButton.vue";
import { mapGetters } from "vuex";

export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      return (
        "￥" +
        this.cartList
          .filter((item) => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    checkLength() {
      return this.cartList.filter((item) => item.checked).length;
    },
    isSelectAll() {
      // 方法一
      // return !this.cartList.filter((item) => !item.checked).length;
      // 这里！filter中item.checked是为了找出有没有未被选中的商品
      // 如果有的话这个返回的数组就有length  然后全选按钮不能选中  所以再再length前面取反一次变为false
      // 但是要考虑没有信息时候的情况  那么就会返回一个undefined  取反则为true  所以要分个情况

      // 方法二
      if (this.cartList.length === 0) return false;
      return !this.cartList.find((item) => !item.checked);

      // 方法三
      // 还是要考虑没有数据时的情况
      // for (let item of this.cartList) {
      //   if (!item.checked) {
      //     return isChecked
      //   }
      // }
      // return true
    },
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) {
        // if 全部选中点击 则使全部商品不选中
        this.cartList.forEach((item) => (item.checked = false));
      } else {
        // 有部分或全部不选中时  点击按钮全部商品变为选中
        this.cartList.forEach((item) => (item.checked = true));
      }
    },
    calcClick() {
      if (!this.isSelectAll) {
        this.$toast.show("请选择购买的商品");
      }
    },
  },
};
</script>

<style scoped>
.bottom-bar {
  display: flex;
  position: relative;
  height: 40px;
  background-color: #eee;
  line-height: 40px;
  font-size: 14px;
}

.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
}

.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}

.price {
  margin-left: 20px;
  flex: 1;
}

.calculate {
  width: 90px;
  background: orangered;
  color: #fff;
  text-align: center;
}
</style>
