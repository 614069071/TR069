<template>
  <a-breadcrumb class="container-breadcrumb">
    <a-breadcrumb-item v-for="item in items"
                       :key="item">
      {{ $t(item) }}
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped lang="less">
.container-breadcrumb {
  width: 100%;
  padding-bottom: 16px;
  background: #f7f8fa;
  :deep(.arco-breadcrumb-item) {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #4e5969;
    line-height: 22px;
    &:last-child {
      font-size: 14px;
      font-weight: 600;
      color: #1d2129;
    }
  }
}
</style>
