<template>
  <div class="nav-wrapper">
    <a-breadcrumb v-if="child">
      <a-breadcrumb-item v-for="item in colles" :key="item">{{ $t(item) }}</a-breadcrumb-item>
      <a-breadcrumb-item style="cursor: pointer" @click.native="callback">{{ $t(last) }}</a-breadcrumb-item>
      <a-breadcrumb-item>{{ $t(child) }}</a-breadcrumb-item>
    </a-breadcrumb>

    <div v-else class="nav-title">{{ $t(title) }}</div>
  </div>
</template>

<script setup>
import { toRefs, computed } from "vue";
import { useNavigationStore } from "@/store";

const navStore = useNavigationStore();

const { parent, child, event } = toRefs(navStore);

const title = computed(() => {
  return parent.value[parent.value.length - 1];
});

const colles = computed(() => {
  return parent.value.slice(0, -1);
});

const last = computed(() => {
  return parent.value.slice(-1)[0];
});

const callback = () => {
  navStore.updateChild(null);
  event.value && event.value();
};
</script>

<style scoped lang="less">
.nav-wrapper {
  height: 76px;
  padding: 0px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .nav-title {
    font-size: 16px;
  }
}
</style>
