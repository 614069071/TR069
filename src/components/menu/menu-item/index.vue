<template>
  <a-menu-item v-if="!item.children.length" :key="item.name" @click="jumpToUrl(item)">
    <template #icon><span :class="`iconfont ${item['iconCls']}`"></span></template>
    {{ $t(`${item["name"]}`) }}
  </a-menu-item>
  <a-sub-menu v-if="item.children.length" :key="item.name">
    <template #icon><span :class="`iconfont ${item.iconCls}`"></span></template>
    <template #title>{{ $t(`${item.name}`) }}</template>
    <template #expand-icon-down>
      <icon-down v-show="item.hasOwnProperty('children')"></icon-down>
    </template>
    <menu-item v-for="child in item.children" :key="child.path" :item="child" />
  </a-sub-menu>
</template>

<script setup>
import MenuItem from "./index.vue";
import { defineProps } from "vue";
import { IconDown } from "@arco-design/web-vue/es/icon";
import { useAppStore } from "@/store";
import { useRouter } from "vue-router";
const props = defineProps({
  item: Object,
  parentPath: String,
});

const router = useRouter();
const appStore = useAppStore();

const jumpToUrl = data => {
  appStore.updateSettings({ selectedMenuKey: data.name });
  router.push({
    path: data.path,
  });
};
</script>
