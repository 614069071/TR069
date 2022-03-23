<template>
<div class="user-layout-container">
  <div class="binner-pic">
  </div>
  <div class="right-content">
    <header>
      <div class="header-logo">
        <img src="/images/cdata_logo.png" alt="cdata_logo">
      </div>
      <Set-Language></Set-Language>
    </header>
    <main>
      <BackstageLogin></BackstageLogin>
    </main>
  </div>
</div>
</template>

<script>
import SetLanguage from '@/components/set-language/index.vue'
import BackstageLogin from '@/backstage/user/login/index.vue'

export default {
  data(){
    return {
      
    }
  },
  components: { SetLanguage, BackstageLogin }
}
</script>

<style lang="less" scoped>
.user-layout-container {
  min-width: 1280px;
  height: 100vh;
  min-height: 800px;
  display: flex;
  .binner-pic {
    width:50%;
    position: relative;
    background: url('@/assets/images/login_binner2.png') no-repeat;
    background-size: cover;
  }

  .right-content {
    width: 50%;
    header {
      height: 60px;
      padding: 0px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .header-logo {
        width: 120px;
        height: 32px;
        img {
          width: 100%;
          object-fit: cover;
        }
      }
    }
    main {
      height: calc(100vh - 60px);
    }
  }
}
</style>