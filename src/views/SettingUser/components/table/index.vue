<template>
  <div class="asasdads">
    <div>
      <a-table :data="data"
               :scroll="{y:650}"
               :pagination="false">
        <template #columns>
          <a-table-column title="序号"
                          data-index="index"></a-table-column>
          <a-table-column title="用户名"
                          data-index="username"></a-table-column>
          <a-table-column title="角色"
                          data-index="roleNameZh"></a-table-column>
          <a-table-column title="描述"
                          data-index="description"></a-table-column>
          <a-table-column title="状态">
            <template #cell="{ record }">
              <div class="cell"
                   v-if="record.enable === 3"
                   style="color: #67C23A">在线</div>
              <div class="cell"
                   v-if="record.enable === 4"
                   style="color: #F56C6C">离线</div>
              <div class="cell"
                   v-if="record.enable === 2"
                   style="color: #E6A23C">待确认</div>
              <div class="cell"
                   v-if="record.enable === 0"
                   style="color: #F56C6C">禁用</div>
            </template>
          </a-table-column>
          <a-table-column title="启用">
            <template #cell="{ record }">
              <a-switch v-model="record.enableType"
                        checked-value="1"
                        unchecked-value="0"
                        @change="changeEnabled(record)" />
            </template>
          </a-table-column>
          <a-table-column title="操作"
                          width="300">
            <template #cell="{ record }">
              <span @click="handleClick(record)"
                    class="dalst bod">修改</span>
              <span @click="handleDetail(record)"
                    class="dalst bod">详情</span>
              <span @click="changePassword(record)"
                    class="dalst bod">修改密码</span>
              <span class="dalst col"
                    @click="handleDelete(record)">删除</span>
            </template>
          </a-table-column>
        </template>
      </a-table>
      <Pagination :paginationData="paginationData"
                  @changePage="handlePage"
                  @changeSize="handleSize"></Pagination>
      <a-modal v-model:visible="visible"
               @cancel="handleCancel"
               @before-ok="handleBeforeOk">
        <template #title>
          修改密码
        </template>
        <div class="changePasswordCss">
          <span class="label">密码</span>
          <a-input v-model="Password"
                   type="password"
                   placeholder="please enter..." />
        </div>
        <div class="changePasswordCss">
          <span class="label">确认密码</span>
          <a-input v-model="confirmPassword"
                   type="password"
                   placeholder="please enter..." />
        </div>
      </a-modal>

    </div>
  </div>
</template>
<script>
import { setUser } from '@/services/api/system-settings'
import Pagination from '@/components/pagination/index.vue'
import { Modal } from '@arco-design/web-vue'
import RightSide from '@/components/rightSidePopUpBox/index.vue'
import { Message } from '@arco-design/web-vue'
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
      data: null,
      visible: false,
      visiblePassword: false,
      Password: '',
      confirmPassword: '',
      recordForm: {}
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getRole() {
      const dataInfo = await setUser.getRoleList()
      return dataInfo
    },
    async getData(forms) {
      const roleList = await this.getRole()
      let params = {
        page: this.current,
        size: this.pageSize,
        username: forms ? forms.username : '',
        roleId: forms ? forms.roleId : '',
        online: forms ? forms.online : ''
      }
      console.log(forms)
      const dataInfo = await setUser.getUser(params)
      dataInfo.data.forEach((element, index) => {
        element.index = index + 1
        console.log()
        element.enableType = element.enable == 0 ? '0' : '1'
        roleList.forEach((data) => {
          if (element.roleId == data.roleId) {
            element.roleNameZh = data.roleNameZh
          }
        })
      })
      this.data = dataInfo.data
      this.paginationData = dataInfo.total
    },
    changeEnabled(record) {
      let params = {
        userId: record.userId,
        username: record.username,
        enable: record.enableType
      }
      setUser.putUserStatus(params).then((data) => {
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
      this.title = '修改'
      this.form = JSON.parse(JSON.stringify(record))
    },
    handleDetail(record) {
      this.title = '详情'
      this.$emit('showBread', record, true)
    },
    changePassword(record) {
      this.recordForm = record
      this.visible = true
    },
    handleCancel() {
      this.visible = false
    },
    handleBeforeOk() {
      if (this.Password !== this.confirmPassword) {
        Message.error({
          id: 'httpInfo',
          content: "两次密码不一致",
          duration: 2000,
          position: 'top'
        })
        return
      }
      this.recordForm.password = this.Password
      setUser.putUser(this.recordForm).then((data) => {
        this.visible = false
      })
    },
    handleDelete(record) {
      let params = record.userId
      Modal.warning({
        title: '删除',
        content: '是否删除',
        hideCancel: false,
        onOk: async () => {
          await setUser.deleteUser(params)
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
.changePasswordCss {
  display: flex;
  width: 100%;
  margin-bottom: 10px;
  .label {
    width: 20%;
    line-height: 30px;
    text-align: center;
  }
  .arco-input-wrapper {
    width: 65%;
  }
}
</style>