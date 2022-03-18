<template>
  <div class="side-menu">
    <a-menu :style="{ width: '200px', height: '100%' }"
            show-collapse-button
            :level-indent="30"
            :selected-keys="selectedKey"
            :auto-open-selected="true"
            breakpoint="xl"
            accordion
            v-model:collapsed="collapsed"
            @menu-item-click="menuItemClick"
            @sub-menu-click="subMenuClick"
            @collapse="setCollapse">
      <a-menu-item :key="menuData[0]['name']"
                   @click="jumpToUrl(menuData[0])">
        <template #icon><span :class="`iconfont ${menuData[0]['iconCls']}`"></span></template>
        {{ $t(`${menuData[0]['name']}`) }}
      </a-menu-item>
      <a-sub-menu v-for="item1 in menuData.slice(1)"
                  :key="item1.name">
        <template #icon><span :class="`iconfont ${item1.iconCls}`"></span></template>
        <template #title>{{ $t(`${item1.name}`) }}</template>
        <template #expand-icon-down>
          <icon-down v-show="item1.hasOwnProperty('children')"></icon-down>
        </template>
        <a-sub-menu v-for="item2 in item1.children"
                    :key="item2.name"
                    :title="$t(`${item2.name}`)">
          <a-menu-item v-for="item3 in item2.children"
                       :key="item3.name"
                       @click="jumpToUrl(item3)">{{ $t(`${item3.name}`) }}</a-menu-item>
        </a-sub-menu>
      </a-sub-menu>
    </a-menu>
  </div>
</template>
<script>
import { ref, watch } from 'vue'
import { IconDown } from '@arco-design/web-vue/es/icon'
import { useAppStore, useRoutesStore } from '@/store'
import { useRouter } from 'vue-router'

export default {
  components: {
    IconDown
  },
  setup() {
    const router = useRouter()
    const appStore = useAppStore()
    const routesStore = useRoutesStore()
    const menuData = ref([])
    menuData.value = routesStore.routes
    const collapsed = ref(false)
    watch(
      () => appStore.menuCollapse,
      (newVal) => {
        collapsed.value = newVal
      },
      {
        immediate: true
      }
    )
    const setCollapse = (val) => {
      appStore.updateSettings({ menuCollapse: val })
    }

    const selectedKey = ref([])
    let currentSelected = routesStore.flatRoutes.filter((item) => {
      return item.path === location.pathname
    })
    selectedKey.value = [currentSelected[0].name]
    const jumpToUrl = (data) => {
      selectedKey.value = [data.name]
      router.push({
        path: data.path
      })
    }
    let menuItemClick = (key) => {
      //点击叶子节点时触发
      // alert('测试')
    }
    let subMenuClick = () => {
      // 点击有子菜单的选项时触发
      // alert('测试')
    }
    return {
      menuItemClick,
      subMenuClick,
      setCollapse,
      jumpToUrl,
      selectedKey,
      collapsed,
      menuData
    }
  }
}
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