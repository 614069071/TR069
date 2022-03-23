<template>
  <div class="header-nav">
    <div class="header-left">
      <img src="/images/cdata_logo.png" alt="cdata_logo">
    </div>
    <div class="header-right">
      <SetLanguage/>
      <a-dropdown trigger="hover" @select="select">
        <a-avatar :size="32">
        <img
          alt="avatar"
          src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
        />
        </a-avatar>
        <template #content>
          <a-doption value="signout">{{ $t('global.signOut') }}</a-doption>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script>
import SetLanguage from '@/components/set-language/index.vue'
import { useRouter } from 'vue-router'
import { logout } from '@/services/api/login.js'
import { Modal } from '@arco-design/web-vue'

export default {
  components: {
    SetLanguage
  },
  setup() {
    const router = useRouter()
    const select = (value) => {
      if (value === 'signout') {
        Modal.warning({
          title: '提示',
          content: '此操作将注销登录,是否继续?',
          hideCancel: false,
          onOk: async () => {
            logout().then(res => {
              if (res.data) {
                router.replace('/backstageLogin')
              }
            })
          }
        })
      }
    }

    return {
      select
    }
  }
}
</script>

<style lang="less" scoped>
.header-nav {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .header-left {
    width: 120px;
    height: 32px;
    margin-left: 20px;
    img {
      width: 100%;
      object-fit: cover;
    }
  }
  .header-right {
    display: flex;
    align-items: center;
    margin-right: 16px;
    .arco-avatar {
      margin-left: 16px;
    }
  }
}
</style>