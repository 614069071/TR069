<template>
  <Wrapper :title="'权限集管理'"
           :breadList="breadList"
           :showBreadCrumb="showBreadCrumb">
    <template v-slot:operation>
      <a-button type="primary"
                size="large"
                @click="addPermission">添加权限集</a-button>
    </template>
    <template v-slot:contentMain>
      <CreatePermission v-show="showBreadCrumb&&!isModify"
                        @cancelAdd="hideBreadCrumb"></CreatePermission>
      <Revise v-show="showBreadCrumb&&isModify"
              @cancelRevise="hideBreadCrumb"></Revise>
      <Table :tableData="tableData" v-show="!showBreadCrumb" @modify="modify" @deleteSuccess="deleteSuccess" :tableNums="tableNums" @changePage="changePage" @changeSize="changeSize"></Table>
      <Resource></Resource>
    </template>
  </Wrapper>
</template>

<script>
import { ref,watch } from 'vue'
import Wrapper from '@/components/wrapper/index.vue'
import Table from './components/table/index.vue'
import CreatePermission from './components/add-perssions/index.vue'
import Revise from './components/revise/index.vue'
import Resource from './components/resource/index.vue'
import { getPermissionListApi } from "@/services/api/system-settings"
import { useAppStore } from '@/store'

export default {
  components: {
    Wrapper,
    Table,
    CreatePermission,
    Revise,
    Resource
  },
  setup() {
    const appStore = useAppStore()
    let showBreadCrumb = ref(false)
    const breadList = ref([])
    const isModify = ref(false)
    const tableNums = ref(0)
    const addPermission = () => {
      showBreadCrumb.value = true
      breadList.value = ['系统设置', '用户权限管理', '权限集管理', '添加权限集']
    }
    const hideBreadCrumb = (val) => {
      if (val) {
        getData()
      }
      isModify.value = false
      showBreadCrumb.value = false
    }

    const modify = () => {
      breadList.value = ['系统设置', '用户权限管理', '权限集管理', '修改']
      isModify.value = true
      showBreadCrumb.value = true
    }

    const deleteSuccess = () => {
      getData()
    }

    const tableData = ref([])
    const currentPage = ref(1)
    const currentSize = ref(15)
    const getData = () => {
      getPermissionListApi(currentPage.value, currentSize.value).then(res => {
        tableData.value = []
        const permissionData = res?.data
        tableNums.value = permissionData.total
        permissionData.data.forEach((item, index) => {
          let { permissionName, createBy, menus, permissionId } = item
          const tableItem = {
            index: index + 1,
            permissionName: permissionName,
            createBy: createBy,
            menu: menus,
            permissionId: permissionId
          }
          tableData.value.push(tableItem)
        });
      })
    }
    getData()

    const changePage = (currentPage) => {
      currentPage.value = currentPage
      getData()
    }

    const changeSize = (pageSize) => {
      currentPage.value = pageSize
      getData()
    }

    return {
      addPermission,
      hideBreadCrumb,
      deleteSuccess,
      changePage,
      changeSize,
      modify,
      showBreadCrumb,
      breadList,
      tableData,
      isModify,
      tableNums
    }
  }
}
</script>