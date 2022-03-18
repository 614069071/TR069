<template>
  <div class="config-container-wrapper">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "ConfigContainer",
  data() {
    return {};
  },
  created() {
    console.log("created");
  },
  mounted() {
    console.log("mounted");
  },
};
</script>

<style scoped lang="css">
.config-container-wrapper {
  width: 100%;
  padding: 0 20px 0 20px;
}
</style>
