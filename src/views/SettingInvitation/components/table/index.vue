<template>
  <div class="asasdads">
    <div>
      <a-table :data="data"
               :scroll="{y:650}"
               :pagination="false">
        <template #columns>
          <a-table-column title="序号"
                          width="60"
                          data-index="index"></a-table-column>
          <a-table-column title="邀请码"
                          data-index="invitationCode"></a-table-column>
          <a-table-column title="创建者"
                          data-index="createBy"></a-table-column>
          <a-table-column title="是否需要再次确认">
            <template #cell="{ record }">
              <span>{{record.needCheck==1?'是':'否'}}</span>
            </template>
          </a-table-column>
          <a-table-column title="剩余有效次数"
                          data-index="validTimes"></a-table-column>
          <a-table-column title="描述"
                          data-index="description"></a-table-column>
          <a-table-column title="状态">
            <template #cell="{ record }">
              <div class="cell"
                   v-if="record.enable === 0"
                   style="color: #F56C6C">已禁用</div>
              <div class="cell"
                   v-else-if="compareDate(record.expiredTime)"
                   style="color: #F56C6C">已过期</div>
              <div class="cell"
                   v-else
                   style="color: #67C23A">生效中</div>
            </template>
          </a-table-column>
          <a-table-column title="操作"
                          width="330">
            <template #cell="{ record }">

              <span @click="handleDetail(record)"
                    class="dalst bod">详情</span>
              <span class="dalst col"
                    @click="handleDelete(record)">删除</span>
            </template>
          </a-table-column>
        </template>
      </a-table>
      <Pagination :paginationData="paginationData"
                  @changePage="handlePage"
                  @changeSize="handleSize"></Pagination>
      <a-modal v-model="visible"
               @cancel="handleCancel"
               @before-ok="handleBeforeOk">
        <template #title>
          修改密码
        </template>
        <a-input v-model="username"
                 type="password"
                 placeholder="please enter..." />
      </a-modal>
    </div>
  </div>
</template>
<script>
import { invitationCodeManagement } from '@/services/api/system-settings'
import Pagination from '@/components/pagination/index.vue'
import { Modal } from '@arco-design/web-vue'
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
      data: null,
      visible: false,
      rowSelection: {
        type: 'checkbox',
        showCheckedAll: true
      }
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      let params = { page: this.current, size: this.pageSize }
      const dataInfo = await invitationCodeManagement.getInvitation(params)
      dataInfo.data.forEach((element, index) => {
        element.index = index + 1
        this.roleList.forEach((data) => {
          if (element.roleId == data.roleId) {
            element.roleNameZh = data.roleNameZh
          }
        })
      })
      this.data = dataInfo.data
      this.paginationData = dataInfo.total
    },
    compareDate(expiredTime) {
      return new Date().getTime() > new Date(expiredTime).getTime()
    },
    handlePage(current) {
      this.current = current
      this.getData()
    },
    handleSize(pageSize) {
      this.pageSize = pageSize
      this.getData()
    },
    handleDetail(record) {
      this.title = '详情'
      this.$emit('showBread', record, true)
    },
    handleCancel() {
      this.visible = false
    },
    handleBeforeOk() {
      this.visible = false
    },
    handleDelete(record) {
      let params = record.invitationId
      Modal.warning({
        title: '删除',
        content: '是否删除',
        hideCancel: false,
        onOk: async () => {
          await invitationCodeManagement.deleteInvitation(params)
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