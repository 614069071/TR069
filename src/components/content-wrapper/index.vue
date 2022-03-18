<template>
  <div class="content-wrapper">
    <div class="content-add"
         v-if="showAdd">
      <div class="content-title">
        {{title}}
        <!-- <slot name="newOrModifiedTitle"></slot> -->
      </div>
      <slot name="newOrModified"></slot>

    </div>
    <div v-else>
      <div class="wrapper-header">
        <div class="wrapper-title">{{title}}</div>
        <div class="button-group">
          <slot name="operation"></slot>
        </div>
      </div>
      <div class="wrapper-main">
        <slot name="contentMain"></slot>
      </div>
      <div class="">
        <slot name="rightSidePopUpWindow"></slot>
      </div>
    </div>

  </div>
</template>

<script>
import { toRefs } from 'vue'
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    showAdd: {
      type: Boolean,
      default: false
    },
    addList: {
      type: Array,
      default: []
    }
  },
  setup(props) {
    let contentProps = toRefs(props)
    let title = contentProps.title
    let showAdd = contentProps.showAdd
    return {
      title,
      showAdd
    }
  }
}
</script>

<style lang="less" scoped>
.content-wrapper {
  width: 100%;
  height: 100%;
  .content-title {
    width: 100%;
    height: 30px;
    margin-bottom: 10px;
    background: #f7f8fa;
  }
  .wrapper-header {
    height: 76px;
    padding: 0px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .wrapper-title {
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #1d2129;
    }
    :deep(.button-group) {
      .arco-btn {
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
    padding: 0px 16px;
    position: relative;
  }
}
</style>