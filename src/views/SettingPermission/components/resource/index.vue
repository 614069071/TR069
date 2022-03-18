<template>
  <RightSide :rightBoxTitle="'可访问资源'"
             @closePops="closePops"
             @reset="reset"
             @confirm="confirm"
             :showRightBox="showRightBox">
    <template v-slot:rightSidePopUpWindow>
      <div class="current-name">
        <span>权限集名称</span>
      </div>
      <a-input :style="{width:'240px'}"
               :model-value="currentName"
               disabled />
      <keep-alive>
        <a-tree :checkable="true"
                v-model:checked-keys="checkedKeys"
                v-model:expanded-keys="test"
                :check-strictly="checkStrictly"
                :data="menuData"
                @check="checkNode"
                checked-strategy="child"
                :fieldNames="{
          key: 'menuId',
          title: 'menuName',
          children: 'children'
        }"
                height="300">
          <template #title="record">{{ $t(`${record.menuName}`) }}</template>
        </a-tree>
      </keep-alive>
    </template>
  </RightSide>
</template>

<script>
import { ref, watch } from 'vue'
import RightSide from '@/components/rightSidePopUpBox/index.vue'
import { useAppStore } from '@/store'
import {
  initAllMenu,
  getSelectPerssions,
  resetPermissions
} from '@/services/api/system-settings'
import { useI18n } from 'vue-i18n'

export default {
  components: {
    RightSide
  },
  setup() {
    const { t } = useI18n()
    const appStore = useAppStore()
    const showRightBox = ref(false)
    const menuData = ref([])
    const defaultSelectedData = ref([])
    const currentName = ref('')
    const checkedKeys = ref([])
    const checkStrictly = ref(false)
    const permissionId = ref('')
    const test = ref([])

    const closePops = (value) => {
      appStore.updateShowRightBox(value)
      appStore.updatePermissionsRow({})
      setTimeout(() => {
        checkedKeys.value = []
      }, 800)
    }

    const findExpandKey = (data) => {
      let expandList = []
      // 将获取到的要勾选的数据，进行遍历，查找他们的父节点
    }

    const initMenu = () => {
      initAllMenu().then((res) => {
        menuData.value = res.data
        setTimeout(() => {
          checkedKeys.value = defaultSelectedData.value
        }, 0)
      })
    }

    watch(
      () => appStore.showRightBox,
      (newVal) => {
        showRightBox.value = newVal
      },
      {
        immediate: true
      }
    )
    watch(
      () => appStore.permissionsRow,
      (newVal) => {
        if (JSON.stringify(newVal) !== '{}') {
          permissionId.value = newVal.permissionId
          getSelectPerssions(newVal.permissionId).then((res) => {
            defaultSelectedData.value = res?.data
            initMenu()
          })
        }
        currentName.value = newVal.permissionName
      },
      {
        deep: true
      }
    )

    const checkNode = (value) => {
      checkedKeys.value = []
      checkedKeys.value = value
    }

    const reset = () => {
      checkedKeys.value = []
    }

    const confirm = () => {
      let params = `pid=${permissionId.value}`
      checkedKeys.value.forEach((key) => {
        params += '&mids=' + key
      })
      resetPermissions(params).then((res) => {})
    }

    return {
      showRightBox,
      closePops,
      menuData,
      currentName,
      checkedKeys,
      checkStrictly,
      defaultSelectedData,
      test,
      checkNode,
      reset,
      confirm
    }
  }
}
</script>

<style lang="less" scoped>
.wrapper-right {
  .contentMian {
    .current-name {
      span {
        &:nth-of-type(1) {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #4e5969;
          line-height: 22px;
        }
      }
    }
  }
}
</style>