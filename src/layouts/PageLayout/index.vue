<template>
   <a-layout class="layout">
      <a-layout-header>
        <Header/>
      </a-layout-header>
      <a-layout>
        <a-layout-sider 
          breakpoint="xl" 
          :width="200" 
          collapsible 
          :collapsed="isCollapse" 
          @collapse="setCollapse"
          :hide-trigger="true">
          <Menu/>
        </a-layout-sider>
        <a-layout-content>
          <div class="layout-content">
            <router-view></router-view>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
</template>

<script>
import { computed } from 'vue'
import Header from '@/components/header/index.vue'
import Menu from '@/components/menu/index.vue'
import { useAppStore } from '@/store'

export default {
  components: {
    Header,
    Menu
  },
  setup() {
    const appStore = useAppStore()
    const isCollapse = computed(() => {
      return appStore.menuCollapse
    })
    const setCollapse = (val) => {
      appStore.updateSettings({ menuCollapse: val })
    }

    return {
      isCollapse,
      setCollapse
    }
  }
}
</script>

<style lang="less" scoped>
.layout {
  width: 100%;
  height: 100%;
  :deep(.arco-layout) {
    .arco-layout-content {
      padding: 16px 20px;
      background: #F7F8FA;
      .layout-content {
        width: 100%;
        height: 100%;
        background: #fff;
      }
    }
  }
}
</style>