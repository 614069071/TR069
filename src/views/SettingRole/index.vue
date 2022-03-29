<template>
  <div class="layout-page-view-wrapper">
    <div class="layout-page-view-controls">
      <NavButton type="primary"
                 size="large"
                 :onClick="createPermission"
                 v-show="!showBreadCrumb">添加角色</NavButton>
    </div>
    <CreatePermission v-show="showBreadCrumb"
                      :titles="titles"
                      :formData="form"
                      @cancelAdd="hideBreadCrumb"></CreatePermission>
    <Table v-show="!showBreadCrumb"
           @showBread="showDetail"
           ref="tableData"></Table>
    <RightSide v-show="drawerVisible"
               :showpow="drawerVisible"
               @closePops='handleCancelDrawer()'>
      <template v-slot:rightSidePopUpWindow>
        <div>
          <p>角色名称</p>
          <a-input v-model="form.value1"
                   placeholder="please enter..." />
        </div>
        <div>
          <p>权限集</p>
          <a-input v-model="form.value1"
                   placeholder="please enter..." />
        </div>

      </template>
    </RightSide>
  </div>
</template>

<script>
// import { putUser, postUser } from '@/services/api/system-settings'
import Table from './components/table/index.vue'
import Wrapper from '@/components/wrapper/index.vue'
import CreatePermission from './components/add-perssions/index.vue'
import RightSide from '@/components/rightSidePopUpBox/index.vue'
import { useNavigationStore } from '@/store'
import { ref, watch } from 'vue'
export default {
  components: {
    Wrapper,
    Table,
    CreatePermission,
    RightSide
  },
  setup(props, context) {
    let showBreadCrumb = ref(false)
    let drawerVisible = ref(false)
    const breadList = ref([])
    let titles = ref('')
    const tableData = ref(null)
    let form = ref({})
    const navigationStore = useNavigationStore()
    const createPermission = (data) => {
      showBreadCrumb.value = true
      form.value = {
        description: '',
        permissions: [],
        platformId: '',
        roleName: '',
        roleNameZh: '',
        selectedPermissions: []
      }
      titles.value = '添加角色'
      return titles.value
      if (data == '添加角色') {
        form.value = {
          description: '',
          permissions: [],
          platformId: '',
          roleName: '',
          roleNameZh: '',
          selectedPermissions: []
        }
        titles.value = '添加角色'
      } else {
        data.selectedPermissions = []
        data.permissions.forEach((item) => {
          data.selectedPermissions.push(item.permissionId)
        })
        form.value = data
        for (let val in data) {
          if (data[val]) {
            form._value[val] = data[val]
          } else {
            form._value[val] = ''
          }
        }
        titles.value = '修改'
      }
    }
    const showDetail = (data, type) => {
      for (let val in data) {
        if (data[val]) {
          form._value[val] = data[val]
        } else {
          form._value[val] = ''
        }
      }
      if (!type) {
        titles.value = '修改'
        showBreadCrumb.value = true
        navigationTo(function informationTask() {})
      } else {
        titles.value = '详情'
        showBreadCrumb.value = true
        navigationTo(function commonDetail() {})
      }
    }
    const hideBreadCrumb = (data) => {
      if (data) tableData._value.getData()
      showBreadCrumb.value = false
      const navigationStore = useNavigationStore()
      navigationStore.updateChild(null)
    }
    watch(
      () => navigationStore.child,
      (newVal) => {
        if (newVal == null) {
          showBreadCrumb.value = false
        }
      },
      {
        immediate: true
      }
    )
    const filters = (data) => {
      drawerVisible.value = true
    }
    const closeRightSide = (data) => {
      drawerVisible.value = true
    }
    const handleCancelDrawer = (data) => {
      drawerVisible.value = false
    }
    return {
      createPermission,
      hideBreadCrumb,
      filters,
      closeRightSide,
      handleCancelDrawer,
      showDetail,
      showBreadCrumb,
      tableData,
      breadList,
      titles,
      form,
      drawerVisible
    }
  }
}
</script>

<style lang="less" scoped>
.platform {
  width: 100%;
  height: 100%;
}
.dalst {
  padding: 0 10px;
  cursor: pointer;
}
.bod {
  border-right: 1px solid #e5e6e8;
  color: #165dff;
}
.col {
  color: red;
}
.outerLayer {
  display: flex;
  margin-bottom: 20px;
  .contentxt {
    width: 48%;
    display: flex;
    justify-content: space-between;
  }
}
.addData {
  width: calc(100% - 40px);
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .bz {
    color: red;
  }
  .box3 {
    width: 30%;
  }
  .box6 {
    width: 65%;
  }
}
.submits {
  margin-top: 20px;
  width: 30%;
  .arco-btn-size-medium {
    width: 30%;
    margin-left: 20px;
  }
}
.addHeader {
  padding: 20px 0 20px 20px;
  font-weight: 600;
}
</style>