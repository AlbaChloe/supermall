<template>
  <div class="params-info" v-if="Object.keys(paramsInfo).length !== 0">
    <!-- 尺码信息表格 -->
    <table
      v-for="(table, index) in paramsInfo.sizes"
      class="info-size"
      :key="index"
    >
      <tr v-for="(tr, indey) in table" :key="indey">
        <td v-for="(td, indez) in tr" :key="indez">{{ td }}</td>
      </tr>
    </table>

    <!-- 参数columns -->
    <table class="info-params">
      <tr v-for="(info, index) in paramsInfo.infos" :key="index">
        <td class="info-params-key">{{ info.key }}</td>
        <td class="params-value">{{ info.value }}</td>
      </tr>
    </table>

    <div class="info-img" v-if="paramsInfo.image.length !== 0">
      <img :src="paramsInfo.image" />
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailParamsInfo",
  props: {
    paramsInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {},
};
</script>

<style scoped>
.params-info {
  padding: 20px 15px;
  font-size: 14px;
  border-bottom: 1px solid #f2f5f8;
}

.params-info table {
  width: 100%;
  border-collapse: collapse;
}

.params-info table tr {
  height: 42px;
}

.params-info table tr td {
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
}

.info-params-key {
  /* 当value的数据量比较大的时候，会挤到key，所以给一个固定的宽度 */
  width: 95px;
}

.info-params {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.params-value {
  color: #eb4868;
}

.info-img img {
  width: 100%;
}
/* td {
  border-bottom: 1px solid #ccc;
}

.info-size {
  width: 100%;
  padding: 0 15px;
}

.info-size td {
  padding: 10px 0px;
}

.info-params {
  padding: 0 15px;
}

.info-params-key {
  height: 40px;
  width: 50px;
}

.params-value {
  height: 40px;
  color: var(--color-tint);
  padding-left: 15px;
} */
</style>