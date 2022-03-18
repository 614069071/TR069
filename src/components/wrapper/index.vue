<template>
  <div class="content-wrapper">
    <BreadCrumb :items="breadList"
                v-show="showBreadCrumb"></BreadCrumb>
    <div class="wrapper-header"
         v-show="!showBreadCrumb">
      <div class="wrapper-title">{{title}}</div>
      <div class="button-group">
        <slot name="operation"></slot>
      </div>
    </div>
    <div class="wrapper-main"
         :class="{'subpage-content-height': showBreadCrumb}">
      <slot name="contentMain"></slot>
    </div>
  </div>
</template>

<script>
import BreadCrumb from '@/components/breadcrumb/index.vue'
import { toRefs } from 'vue'
export default {
  components: {
    BreadCrumb
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    breadList: {
      type: Array,
      default() {
        return []
      }
    },
    showBreadCrumb: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    let contentProps = toRefs(props)
    let title = contentProps.title
    let breadList = contentProps.breadList
    let showBreadCrumb = contentProps.showBreadCrumb
    return {
      title,
      breadList,
      showBreadCrumb
    }
  }
}
</script>

<style lang="less" scoped>
.content-wrapper {
  width: 100%;
  height: 100%;
  .wrapper-header {
    height: 76px;
    padding: 0px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .wrapper-title {
      font-size: 16px;
      line-height: 24px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #1d2129;
    }
    :deep(.button-group) {
      .arco-btn {
        height: 32px;
        line-height: 32px;
        margin-left: 12px;
        background: rgba(22, 93, 255, 0.1);
        border-radius: 4px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        color: #165dff;
      }
    }
  }
  .wrapper-main {
    position: relative;
    height: calc(100% - 76px);
    padding: 0px 20px;
    position: relative;
  }
  .subpage-content-height {
    height: calc(100% - 40px);
  }
}
</style>