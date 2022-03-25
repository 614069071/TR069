<template>
  <a-button @click="callback" :type="type" :shape="shape" :status="status" :size="size" :long="long" :loading="loading" :disabled="disabled"><slot></slot></a-button>
</template>

<script setup>
import { toRefs } from "vue";
import { useNavigationStore } from "@/store";

const _props = defineProps(["onClick", "type", "shape", "status", "size", "long", "loading", "disabled"]);
const navStore = useNavigationStore();
const { onClick, type, shape, status, size, long, loading, disabled } = toRefs(_props);
const callback = () => {
  const result = onClick.value && onClick.value();

  if (typeof result === "function") {
    navStore.updateChild(result.name);
    navStore.updateEvent(result);
  } else {
    navStore.updateChild(result);
  }
};
</script>

<style scoped lang="less"></style>
