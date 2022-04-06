<template>
  <div class="side-menu">
    <a-menu
      :style="{ width: '200px', height: '100%' }"
      show-collapse-button
      :level-indent="15"
      :selected-keys="selectedKey"
      :auto-open-selected="true"
      breakpoint="xl"
      accordion
      v-model:collapsed="collapsed"
      @menu-item-click="menuItemClick"
      @sub-menu-click="subMenuClick"
      @collapse="setCollapse"
    >
      <MenuItem v-for="menuItem in menuData" :key="menuItem.path" :item="menuItem"></MenuItem>
    </a-menu>
  </div>
</template>
<script>
import { ref, watch } from "vue";
import { IconDown } from "@arco-design/web-vue/es/icon";
import { useAppStore, useRoutesStore } from "@/store";
import { useRouter } from "vue-router";
import MenuItem from "./menu-item/index.vue";

export default {
  components: {
    IconDown,
    MenuItem,
  },
  setup() {
    const router = useRouter();
    const appStore = useAppStore();
    const routesStore = useRoutesStore();
    const menuData = ref([]);
    menuData.value = routesStore.routes;
    const collapsed = ref(false);
    watch(
      () => appStore.menuCollapse,
      newVal => {
        collapsed.value = newVal;
      },
      {
        immediate: true,
      }
    );
    watch(
      () => appStore.selectedMenuKey,
      newVal => {
        selectedKey.value = [newVal];
      }
    );
    const setCollapse = val => {
      appStore.updateSettings({ menuCollapse: val });
    };

    const selectedKey = ref([]);
    let currentSelected = routesStore.flatRoutes.filter(item => {
      return location.pathname.indexOf(item.path) > -1;
    });
    selectedKey.value = [currentSelected[0].name];
    const jumpToUrl = data => {
      selectedKey.value = [data.name];
      router.push({
        path: data.path,
      });
    };
    let menuItemClick = key => {
      //点击叶子节点时触发
      // alert("测试");
    };
    let subMenuClick = () => {
      // 点击有子菜单的选项时触发
      // alert("测试");
    };
    return {
      menuItemClick,
      subMenuClick,
      setCollapse,
      jumpToUrl,
      selectedKey,
      collapsed,
      menuData,
    };
  },
};
</script>
<style lang="less" scoped>
.side-menu {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background-color: var(--color-neutral-2);
  :deep(.arco-menu) {
    .arco-menu-item {
      .arco-menu-title {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        color: #4e5969;
      }
      .arco-menu-indent {
        &:nth-of-type(2) {
          display: none !important;
        }
      }
    }
    .arco-menu-item.arco-menu-selected {
      background: #165dff;
      border-radius: 8px;
      .arco-menu-item-inner {
        color: #fff !important;
      }
    }
  }
}
</style>
