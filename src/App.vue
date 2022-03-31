<template>
  <a-config-provider :locale="locale">
    <router-view></router-view>
  </a-config-provider>
</template>

<script>
import { computed } from "vue";
import enUS from "@arco-design/web-vue/es/locale/lang/en-us";
import zhCN from "@arco-design/web-vue/es/locale/lang/zh-cn";
import useLocale from "@/hooks/locale";
export default {
  setup() {
    const { currentLocale } = useLocale();
    const locale = computed(() => {
      switch (currentLocale.value) {
        case "zh-CN":
          return zhCN;
        case "en-US":
          return enUS;
        default:
          return zhCN;
      }
    });
    return {
      locale,
    };
  },
};
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
