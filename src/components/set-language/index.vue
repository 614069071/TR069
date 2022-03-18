<template>
  <div class="set-language-container">
    <a-dropdown trigger="hover" @select="setLanguage" content-class="language-options">
      <div class="language-select">
        <span>{{currentLang}}</span>
        <icon-down :style="{fontSize:'14px',color: '#1D2129'}" />
      </div>
      <template #content class="test">
        <a-doption value="zh-CN" :class="{'language-selected': isSelectedCn}">简体中文</a-doption>
        <a-doption value="en-US" :class="{'language-selected': isSelectedEn}">English</a-doption>
      </template>
    </a-dropdown>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { IconDown } from '@arco-design/web-vue/es/icon';
import useLocale from '@/hooks/locale.js'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  components: { IconDown },
  setup() {
    const { t } = useI18n()
    const currentLang = ref('')
    const isSelectedCn = ref(true)
    const isSelectedEn = ref(false)
    const { changeLocale, currentLocale } = useLocale()
    currentLang.value = currentLocale.value === 'zh-CN' ? t('language.chinese') : t('language.english')
    isSelectedCn.value = currentLocale.value === 'zh-CN' ? true : false
    isSelectedEn.value = currentLocale.value === 'zh-CN' ? false : true
    const setLanguage = (value) => {
      if (value === 'zh-CN') {
        currentLang.value = t('language.chinese')
        isSelectedCn.value = true
        isSelectedEn.value = false
      } else {
        currentLang.value = t('language.english')
        isSelectedCn.value = false
        isSelectedEn.value = true
      }
      changeLocale(value)
    }
    return {
      currentLang,
      isSelectedCn,
      isSelectedEn,
      setLanguage
    }
  }
})
</script>

<style lang="less" scoped>
.set-language-container {
  .language-select {
    line-height: 22px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-size: 14px;
    opacity: 0.9;
    color: #1D2129;
  }
  .arco-dropdown-open {
    .arco-icon-down {
      transform: rotate(180deg);
    }
  }
}
</style>