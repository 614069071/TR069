<template>
  <a-layout class="layout">
    <a-layout-header>
      <BackstageHeader />
    </a-layout-header>
    <a-layout>
      <a-layout-sider breakpoint="xl" :width="200" collapsible :collapsed="isCollapse" @collapse="setCollapse" :hide-trigger="true">
        <Menu />
      </a-layout-sider>
      <a-layout-content>
        <div class="layout-content">
          <div class="layout-nav-wrapper">
            <!-- <Nav></Nav> -->
            <NavNew></NavNew>
          </div>
          <router-view></router-view>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import { computed } from "vue";
import BackstageHeader from "@/components/backstage-header/index.vue";
import Menu from "@/components/menu/index.vue";
// import Nav from "@/components/Nav/index.vue";
import NavNew from "@/components/NavNew/index.vue";
import { useAppStore } from "@/store";

export default {
  components: {
    BackstageHeader,
    Menu,
    // Nav,
    NavNew,
  },
  setup() {
    const appStore = useAppStore();
    const isCollapse = computed(() => {
      return appStore.menuCollapse;
    });
    const setCollapse = val => {
      appStore.updateSettings({ menuCollapse: val });
    };

    return {
      isCollapse,
      setCollapse,
    };
  },
};
</script>

<style lang="less" scoped>
.layout {
  width: 100%;
  height: 100%;
  :deep(.arco-layout) {
    .arco-layout-content {
      padding: 16px 20px;
      background: #f7f8fa;
      .layout-content {
        width: 100%;
        height: 100%;
        background: #fff;
      }
    }
  }
}
</style>
