<template>
  <div class="asasdads">
    <div>
      <a-table :data="data"
               :scroll="{y:650}"
               :pagination="false">
        <template #columns>
          <a-table-column title="序号"
                          data-index="index"></a-table-column>
          <a-table-column title="角色名称"
                          data-index="roleNameZh"></a-table-column>
          <a-table-column title="包含的权限集">
            <template #cell="{ record }">
              <span v-for="item in record.permissions"
                    :key="item.permissionId"
                    style="margin-right: 10px">{{item.permissionName}};</span>
            </template>

          </a-table-column>
          <a-table-column title="描述"
                          data-index="description"></a-table-column>
          <a-table-column title="操作">
            <template #cell="{ record }">
              <span @click="handleClick(record)"
                    class="dalst bod">修改</span>
              <span class="dalst col"
                    @click="handleDelete(record)">删除</span>
            </template>
          </a-table-column>
        </template>
      </a-table>
      <Pagination :paginationData="paginationData"
                  @changePage="handlePage"
                  @changeSize="handleSize"></Pagination>
    </div>
  </div>
</template>
<script>
import { roleManagement, initAllMenu } from '@/services/api/system-settings'
import { Modal } from '@arco-design/web-vue'
import '@arco-design/web-vue/es/message/style/css.js'
import Pagination from '@/components/pagination/index.vue'
import RightSide from '@/components/rightSidePopUpBox/index.vue'
export default {
  props: {
    drawerVisible: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Pagination,
    RightSide
  },
  data() {
    return {
      form: {},
      current: 1,
      pageSize: 15,
      roleList: [],
      paginationData: null,
      data: null
    }
  },
  mounted() {
    this.getRole()
    this.getData()
  },
  methods: {
    async getRole() {
      const dataInfo = await initAllMenu()
      this.roleList = dataInfo
    },
    async getData(form) {
      let params = {
        roleName: form ? form.roleName : '',
        page: this.current,
        size: this.pageSize,
        permissionIdList: form ? form.permissionIdList :""
      }
      const dataInfo = await roleManagement.getRole(params)
      dataInfo.data.forEach((element, index) => {
        element.index = index + 1
      })
      this.data = dataInfo.data
      this.paginationData = dataInfo.total
    },
    changeEnabled(record) {
      let event
      if (record.enable === 3 || record.enable === 4) {
        event = 0
      } else {
        event = 1
      }
      let params = {
        userId: record.userId,
        username: record.username,
        enable: event
      }
      roleManagement.putUserStatus(params).then((data) => {
        this.getData()
      })
    },
    handlePage(current) {
      this.current = current
      this.getData()
    },
    handleSize(pageSize) {
      this.pageSize = pageSize
      this.getData()
    },
    handleClick(record) {
      this.$emit('showBread', record)
      if (typeof record == 'object') {
        this.title = '修改'
        this.form = JSON.parse(JSON.stringify(record))
      } else {
        this.title = '新增'
      }
    },
    handleDelete(record) {
      let params = record.roleId
      Modal.warning({
        title: '删除',
        content: '是否删除',
        hideCancel: false,
        onOk: async () => {
          await roleManagement.deleteRole(params)
          this.getData()
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
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
</style>