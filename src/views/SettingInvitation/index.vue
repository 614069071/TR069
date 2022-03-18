<template>
  <Wrapper :title="'平台管理'"
           :breadList="breadList"
           :showBreadCrumb="showBreadCrumb">
    <template v-slot:operation>
      <a-button type="primary"
                size="small"
                @click="addPermission('生成邀请码')">生成邀请码</a-button>
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
            <p>创建者</p>
            <a-input v-model="form.value1"
                     placeholder="please enter..." />
          </div>
          <div>
            <p>状态</p>
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
import RightSide from '@/components/rightSidePopUpBox/index.vue'
import { ref } from 'vue'
export default {
  components: {
    Wrapper,
    Table,
    CreatePermission,
    RightSide
  },
  setup(props, context) {
    const showBreadCrumb = ref(false)
    const drawerVisible = ref(false)
    const tableData = ref(null)
    const showRightBox = ref(false)
    const breadList = ref([])
    const titles = ref('')
    const form = ref({})
    const addPermission = (data, type) => {
      showBreadCrumb.value = true
      if (data == '生成邀请码') {
        form.value = {
          createBy: '',
          description: '',
          enable: '',
          expiredTime: '',
          invitationCode: '',
          needCheck: '',
          platformId: '',
          registerTime: '',
          roleId: '',
          userDescription: '',
          userExpiredTime: '',
          validTimes: ''
        }
        titles.value = '生成邀请码'
        breadList.value = [
          '系统设置',
          '邀请码管理',
          '用户权限管理',
          '生成邀请码'
        ]
      } else {
        form.value = data
        titles.value = '详情'
        breadList.value = ['系统设置', '邀请码管理', '用户权限管理', '详情']
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
      tableData,
      refreshData,
      breadList,
      titles,
      form,
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