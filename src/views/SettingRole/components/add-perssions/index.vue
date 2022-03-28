<template>
  <OperationWrapper :title="titles">
    <template v-slot:formContent>
      <div>
        <a-form layout="vertical"
                :model="form"
                @submit-success="handleBeforeOk">
          <a-row :gutter="40">
            <a-col :span="8">
              <a-form-item label="角色名"
                           field="roleNameZh"
                           required
                           :validate-trigger="['change', 'blur']">
                <a-input v-model="form.roleNameZh"
                         placeholder="please enter..." />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="权限集"
                           field="selectedPermissions"
                           required>
                <a-select :size="size"
                          v-model="form.selectedPermissions"
                          placeholder="Please select ..."
                          multiple>
                  <a-option v-for="item in roleList"
                            :key="item.value"
                            :value="item.value"
                            :label="item.label"></a-option>

                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="描述">
                <a-textarea v-model="form.description"
                            placeholder="Please enter something"
                            allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item>
                <a-space>
                  <a-button @click="handleCancel">取消</a-button>
                  <a-button html-type="submit"
                            type="primary"
                            @submit-success="handleBeforeOk">确定</a-button>
                </a-space>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>

      </div>

    </template>
  </OperationWrapper>
</template>

<script>
import OperationWrapper from '@/components/operation-wrapper/index.vue'
import { roleManagement } from '@/services/api/system-settings'
import { ref, onMounted, reactive, computed } from 'vue'
export default {
  components: {
    OperationWrapper
  },
  props: {
    titles: {
      type: String,
      default: ''
    },
    formData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  setup(props, context) {
    const roleList = ref([])
    const form = computed(() => reactive(props.formData))
    const getRole = async () => {
      let datas = []
      const dataInfo = await roleManagement.getPermissionList()
      dataInfo.forEach((item) => {
        let dataInfo = { label: item.permissionName, value: item.permissionId }
        datas.push(dataInfo)
      })
      roleList.value = datas
    }
    const cancel = () => {
      context.emit('cancelAdd')
    }
    const handleCancel = () => {
      context.emit('cancelAdd')
    }
    const handleBeforeOk = (done) => {
      let params = form._value
      params.selectedPermissions.forEach((item) => {
        let dataInfo = { permissionId: item }
        params.permissions.push(dataInfo)
      })
      if (props.titles === '详情') {
        roleManagement.putRole(params).then((data) => {
          context.emit('cancelAdd', true)
          getRole
        })
      } else {
        roleManagement.newRole(params).then((data) => {
          context.emit('cancelAdd', true)
          getRole
        })
      }
      // done()
    }
    onMounted(() => {
      getRole()
    })
    return {
      cancel,
      getRole,
      handleCancel,
      handleBeforeOk,
      form,
      roleList
    }
  }
}
</script>
<style lang="less" scoped>
.addData {
  width: calc(60% - 40px);
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .bz {
    color: #f53f3f;
  }
  .box3 {
    width: 46%;
  }
  .box6 {
    width: 100%;
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