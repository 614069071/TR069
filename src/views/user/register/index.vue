<template>
<div class="register-container">
  <Regist @toBindEmail="toBindEmail" v-show="!showBindEmail"></Regist>
  <Bind-email v-show="showBindEmail"></Bind-email>
</div>
</template>

<script>
import Regist from './components/regist.vue'
import BindEmail from './components/bind-email.vue'
export default {
  components: {
    Regist,
    BindEmail
  },
  data() {
    return {
      showBindEmail: false
    }
  },
  methods: {
    toBindEmail() {
      this.showBindEmail = true
    }
  }
}
</script>

<style lang="less" scoped>
.register-container {
  height: 100%;
  display: flex;
  justify-content: center;
 
}
</style>