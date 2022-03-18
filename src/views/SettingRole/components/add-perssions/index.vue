<template>
  <OperationWrapper :title="titles">
    <template v-slot:formContent>
      <div>
        <div class="asasdads">
          <div class="addData">
            <div class="box3">
              <p> <span class="bz">*</span>角色名称</p>
              <a-input v-model="form.roleNameZh"
                       placeholder="please enter..." />
            </div>
            <div class="box3">
              <p><span class="bz">*</span>权限集</p>
              <!-- <a-select :OptionData="roleList"
                        v-model="form.selectedPermissions"
                        placeholder="Please select ..."
                        multiple /> -->
              <a-select :size="size"
                        v-model="form.selectedPermissions"
                        placeholder="Please select ..."
                        multiple>
                <a-option v-for="item in roleList"
                          :key="item.value"
                          :value="item.value"
                          :label="item.label"></a-option>

              </a-select>

            </div>

            <div class="box6">
              <p>描述</p>
              <a-textarea v-model="form.description"
                          placeholder="Please enter something"
                          allow-clear />
            </div>
          </div>

        </div>
      </div>
      <div class="submits">
        <a-button html-type="submit"
                  @click="handleCancel">取消</a-button>
        <a-button html-type="submit"
                  type="primary"
                  @click="handleBeforeOk">确定</a-button>
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