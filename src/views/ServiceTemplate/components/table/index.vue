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
          <a-table-column title="业务名称"
                          data-index="profileName"></a-table-column>
          <a-table-column title="模板成员"
                          data-index="createBy">
            <template #cell="{ record }">
              <span v-for="val in record.actionList"
                    :key="val.id">{{val.name}},</span>

            </template>
          </a-table-column>
          <a-table-column title="备注"
                          data-index="remark"></a-table-column>
          <a-table-column title="状态">
            <template #cell="{ record }">
              <div class="cell"
                   v-if="record.enable === 0"
                   style="color: #F56C6C">禁用</div>
              <div class="cell"
                   v-else
                   style="color: #67C23A">启用</div>
            </template>
          </a-table-column>
          <a-table-column title="操作"
                          width="330">
            <template #cell="{ record }">
              <span @click="handleDetail(record)"
                    class="dalst bod">明细</span>
              <span @click="handleClick(record)"
                    class="dalst bod">编辑</span>
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
import { serviceTemplate } from '@/services/api/terminal-managenent'
import Pagination from '@/components/pagination/index.vue'
import { Modal } from '@arco-design/web-vue'
import RightSide from '@/components/rightSidePopUpBox/index.vue'
import { ref, onMounted } from 'vue'
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
  setup(props, context) {
    const current = ref(1)
    const pageSize = ref(15)
    const paginationData = ref(0)
    const data = ref([])
    const visible = ref(false)
    const title = ref('')
    const getData = async () => {
      let params = {
        rowSize: current.value,
        pageSize: pageSize.value,
        profileName: '',
        status: ''
      }
      const dataInfo = await serviceTemplate.getProfile(params)
      dataInfo.data.forEach((element, index) => {
        element.index = index + 1
      })
      data.value = dataInfo.data
      paginationData.value = dataInfo.total
    }
    const compareDate = () => {
      return new Date().getTime() > new Date(expiredTime).getTime()
    }
    const handlePage = (size) => {
      current.value = size
      getData()
    }
    const handleSize = (size) => {
      pageSize.value = size
      getData()
    }
    const handleDetail = (record) => {
      title.value = '明细'
      context.emit('showBread', record, true)
    }
    const handleClick = (record) => {
      title.value = '编辑'
      context.emit('showBread', record)
    }
    const handleCancel = () => {
      visible.value = false
    }
    const handleBeforeOk = () => {
      visible.value = false
    }
    const handleDelete = (record) => {
      let params = record.id
      Modal.warning({
        title: '删除',
        content: '是否删除',
        hideCancel: false,
        onOk: async () => {
          await serviceTemplate.delProfile(params)
          getData()
        }
      })
    }
    onMounted(() => {
      getData()
    })
    return {
      current: 1,
      pageSize: 15,
      paginationData,
      data,
      title,
      visible: false,
      getData,
      compareDate,
      handlePage,
      handleSize,
      handleDetail,
      handleCancel,
      handleBeforeOk,
      handleDelete,
      handleClick 
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