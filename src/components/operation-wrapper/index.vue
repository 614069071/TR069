<template>
  <div class="operation-wrapper">
    <div class="title">
      <span>{{ title }}</span>
    </div>
    <div class="form-content">
      <slot name="formContent"></slot>
    </div>
  </div>
</template>

<script>
import { toRefs } from "vue";
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    let contentProps = toRefs(props);
    let title = contentProps.title;
    return {
      title,
    };
  },
};
</script>

<style lang="less" scoped>
.operation-wrapper {
  // height: 100%;
  height: calc(100% - 76px);
  padding: 0px 20px;
  .title {
    padding: 20px 0px;
    font-size: 16px;
    line-height: 24px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #1d2129;
  }
  .form-content {
    height: calc(100% - 64px);
  }
}
</style>
