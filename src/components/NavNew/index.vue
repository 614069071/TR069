<template>
  <div class="nav-wrapper" v-show="title !== 'home.home'">
    <a-breadcrumb v-if="breadList.length" class="nav-bread-wrapper">
      <a-breadcrumb-item v-for="(item, index) in breadList" :key="index" @click="clickBread(item.path)" :class="{ canClick: item.path }">{{ $t(item.name) }}</a-breadcrumb-item>
    </a-breadcrumb>

    <div v-else class="nav-title">{{ $t(title) }}</div>
  </div>
</template>

<script setup>
import { toRefs, computed } from "vue";
import { useNavigationStore } from "@/store";
import { useRouter } from "vue-router";

const navStore = useNavigationStore();
const router = useRouter();

const { parent, breadList } = toRefs(navStore);

const clickBread = path => {
  path && router.push(path);
};

const title = computed(() => {
  return parent.value[parent.value.length - 1];
});
</script>

<style scoped lang="less">
.nav-wrapper {
  :deep(.arco-breadcrumb) {
    .canClick {
      cursor: pointer !important;
    }
  }

  .nav-title {
    height: 76px;
    padding: 0px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    font-weight: 600;
  }
  .nav-bread-wrapper {
    width: 100%;
    padding-bottom: 16px;
    background: #f7f8fa;
    :deep(.arco-breadcrumb-item) {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      color: #4e5969;
      line-height: 22px;
      &:last-child {
        font-weight: 600;
        color: #1d2129;
      }
    }
  }
}
</style>
