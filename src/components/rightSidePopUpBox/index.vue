<template>
  <transition name="slide-fade">
    <div class="wrapper-right" v-show="showRightBox">
      <div class="headers">
        <div class="icon-close"
            @click="closePop">
          <icon-close :style="{fontSize:'12px'}" />
        </div>
        <div class="title">{{rightBoxTitle}}</div>
      </div>
      <div class="contentMian">
        <slot name="rightSidePopUpWindow"></slot>
      </div>
      <div class="footers">
        <a-button @click="reset">重置</a-button>
        <a-button @click="confirm" type="primary">确定</a-button>
      </div>
    </div>
  </transition>
</template>
<script>
import { toRefs } from 'vue'
import { IconClose } from '@arco-design/web-vue/es/icon';
export default {
  components: { IconClose },
  props: {
    rightBoxTitle: {
      type: String,
      default: ''
    },
    showRightBox: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    const contentProps = toRefs(props)
    const showRightBox = contentProps.showRightBox
    let rightBoxTitle = contentProps.rightBoxTitle
    const closePop = () => {
      context.emit('closePops', false)
    }
    const reset = () => {
      context.emit('reset')
    }
    const confirm = () => {
      context.emit('confirm')
    }
    return {
      rightBoxTitle,
      closePop,
      reset,
      confirm,
      showRightBox
    }
  }
}
</script>

<style lang="less" scoped>
.slide-fade-enter-active {
  animation: slide-fade-in 1s;
}
@keyframes slide-fade-in {
  0% {
    transform: translateX(350px);
  }
}
.slide-fade-leave-active {
  transition: all 1s;
}
 .slide-fade-leave-to {
  transform: translateX(350px);
  opacity: 0;
}
.wrapper-right {
  z-index: 1000;
  transition: 1s ease;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.1);
  height: calc(100% + 16px);
  width: 307px;
  position: absolute;
  right: -20px;
  top: 0px;
  background-color: #fff;
}

.headers {
  margin-top: 16px;
  margin-bottom: 20px;
  padding-left: 20px;
  .icon-close {
    display: flex;
    justify-content: right;
    cursor: pointer;
    color: #4E5969;
    margin-right: 14px;
  }
  .title {
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #1D2129;
    line-height: 24px;
  }
}
.contentMian {
  padding-left: 20px;
}
:deep(.footers) {
  width: 100%;
  position: absolute;
  bottom: 0;
  .arco-btn {
    height: 36px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    line-height: 22px;
    border-radius: 0px;
    width: 50%;
    &:nth-of-type(1) {
      background: #FFFFFF;
      box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.1);
      color: #165DFF;
    }
    &:nth-of-type(2) {
      background: #165DFF;
      color: #fff;
    }
  }
}
</style>