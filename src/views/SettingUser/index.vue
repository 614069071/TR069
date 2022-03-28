<template>
  <Wrapper :title="'用户管理'"
           :breadList="breadList"
           :showBreadCrumb="showBreadCrumb">
    <template v-slot:operation>
      <a-button type="primary"
                size="small"
                @click="addPermission('添加用户')">添加用户</a-button>
      <a-button type="primary"
                size="small"
                @click="filters">筛选</a-button>
    </template>
    <template v-slot:contentMain>
      <CreatePermission v-show="showBreadCrumb"
                        :titles="titles"
                        :formData="form"
                        @cancelAdd="hideBreadCrumb"></CreatePermission>
      <Table v-show="!showBreadCrumb"
             @showBread="addPermission"
             ref="tableData"></Table>
      <RightSide v-show="drawerVisible"
                 :showpow="drawerVisible"
                 @closePops='handleCancelDrawer()'>
        <template v-slot:rightSidePopUpWindow>
          <div>
            <p>用户名</p>
            <a-input v-model="form.value1"
                     placeholder="please enter..." />
          </div>
          <div>
            <p>角色</p>
            <a-input v-model="form.value1"
                     placeholder="please enter..." />
          </div>
          <div>
            <p>是否启用</p>
            <a-input v-model="form.value1"
                     placeholder="please enter..." />
          </div>
        </template>
      </RightSide>
    </template>
  </Wrapper>
</template>

<script>
// import { putUser, postUser } from '@/services/api/system-settings'
import Table from './components/table/index.vue'
import Wrapper from '@/components/wrapper/index.vue'
import CreatePermission from './components/add-perssions/index.vue'
// import RightSide from '@/components/rightSidePopUpBox/index.vue'
import { ref } from 'vue'
export default {
  components: {
    Wrapper,
    Table,
    CreatePermission
  },
  setup(props, context) {
    const showBreadCrumb = ref(false)
    const drawerVisible = ref(false)
    const showRightBox = ref(false)
    const breadList = ref([])
    const tableData = ref(null)
    const titles = ref('')
    const form = ref({})
    const addPermission = (data, type) => {
      showBreadCrumb.value = true
      if (data == '添加用户' && !type) {
        form.value = {
          roleId: '',
          username: '',
          password: '',
          parentId: '',
          platformId: '',
          enable: 1,
          avatar: '',
          email: '',
          phone: '',
          registerTime: '',
          expiredTime: '2099-01-01 00:00:00',
          firstLogin: 1,
          sessionTimeout: 600,
          description: '',
          enabled: false
        }
        titles.value = '添加用户'
        breadList.value = ['系统设置', '用户权限管理', '用户管理', '添加用户']
      } else if (data != '添加用户' && !type) {
        form.value = data
        titles.value = '修改'
        breadList.value = ['系统设置', '用户权限管理', '用户管理', '修改']
      } else {
        form.value = data
        titles.value = '详情'
        breadList.value = ['系统设置', '用户权限管理', '用户管理', '详情']
      }
    }
    const hideBreadCrumb = (data) => {
      if (data) tableData._value.getData()
      showBreadCrumb.value = false
    }
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
      addPermission,
      hideBreadCrumb,
      filters,
      closeRightSide,
      handleCancelDrawer,
      showBreadCrumb,
      breadList,
      showBreadCrumb,
      titles,
      form,
      tableData,
      drawerVisible,
      showRightBox
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