<template>
  <OperationWrapper :title="titles">
    <template v-slot:formContent>
      <div v-show="titles!='明细'">
        <a-form layout="vertical"
                :model="form"
                @submit-success="handleBeforeOk">
          <a-row :gutter="40">
            <a-col :span="8">
              <a-form-item label="模板名称"
                           field="profileName">
                <a-input v-model="form.profileName"
                         placeholder="please enter..." />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="状态"
                           field="status"
                           required>
                <a-select :size="size"
                          v-model="form.status"
                          placeholder="Please select ...">
                  <a-option v-for="item in statusList"
                            :key="item.value"
                            :value="item.value"
                            :label="item.label"></a-option>

                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="描述">
                <a-textarea v-model="form.remark"
                            placeholder="Please enter something"
                            allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="配置模板">
                <a-transfer :data="alternateTemplate"
                            :model-value="form.actionIdArray"
                            :title="['备选模板','已选模板']" />
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
      <div>
        <div v-show="titles=='明细'"
             class="outerBox">
          <div class="centerBox">
            <div class="labels"><span class="bz">*</span>邀请码</div>
            <div class="detail">{{form.invitationCode}}</div>
          </div>
          <div class="centerBox">
            <div class="labels"><span class="bz">*</span>创建人</div>
            <div class="detail">{{form.createBy}}</div>
          </div>
          <div class="centerBox">
            <div class="labels">账号角色</div>
            <div class="detail">{{form.userTotal}}</div>
          </div>
          <div class="centerBox">
            <div class="labels"><span class="bz">*</span>账号过期时间</div>
            <div class="detail1">{{form.userExpiredTime}}</div>
          </div>
          <div class="centerBox">
            <div class="labels"><span class="bz">*</span>账号描述</div>
            <div class="detail1">{{form.userDescription}}</div>
          </div>
          <div class="centerBox">
            <div class="labels"><span class="bz">*</span>邀请码有效次数</div>
            <div class="detail">{{form.validTimes}}</div>
          </div>
          <div class="centerBox">
            <div class="labels"><span class="bz">*</span>邀请码过期时间</div>
            <div class="detail">{{form.expiredTime}}</div>
          </div>
          <div class="centerBox">
            <div class="labels">邀请码创建时间</div>
            <div class="detail">{{form.registerTime}}</div>
          </div>
          <div class="centerBox">
            <div class="labels">邀请码描述</div>
            <div class="detail1">{{form.description}}</div>
          </div>
          <div class="centerBox">
            <div class="labels">是否需要再次确认</div>
            <div class="detail1">{{form.needCheck==1?"是":'否'}}</div>
          </div>

        </div>
        <a-button html-type="submit"
                  v-show="titles=='明细'"
                  @click="handleCancel">取消</a-button>
      </div>
    </template>
  </OperationWrapper>
</template>

<script>
import OperationWrapper from '@/components/operation-wrapper/index.vue'
import { actionPool,serviceTemplate  } from '@/services/api/terminal-managenent'
import { ref, onMounted, reactive, watch, toRefs } from 'vue'
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
    // let form = reactive(props.formData)
    const menuType = ref([])
    const actionIdArray = ref([])
    const alternateTemplate = ref([])
    const statusList = ref([
      { label: '开启', value: 1 },
      { label: '禁用', value: 0 }
    ])
    const form = ref({})
    watch(
      () => toRefs(props.formData),
      (newValue, oldValue) => {
        form.value = reactive(props.formData)
      },
      { immediate: true }
    )
    const RoleList = async () => {
      let val = []
      const dataInfo = await actionPool.actionList()
      dataInfo.data.forEach((item) => {
        val.push({ label: item.name, value: item.id })
      })
      alternateTemplate.value = val
    }

    const cancel = () => {
      context.emit('cancelAdd')
    }
    const handleCancel = () => {
      context.emit('cancelAdd')
    }
    const handleBeforeOk = () => {
      serviceTemplate.postProfile(form.value).then((data) => {
        context.emit('cancelAdd', true)
      })
    }
    onMounted(() => {
      RoleList()
    })
    return {
      cancel,
      handleCancel,
      handleBeforeOk,
      statusList,
      alternateTemplate,
      form,
      menuType,
      actionIdArray
    }
  }
}
</script>
<style lang="less" scoped>
.addData {
  width: 800px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .bz {
    color: #f53f3f;
  }
  .box3 {
    width: 360px;
  }
  .box6 {
    width: 760px;
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
.outerBox {
  width: 100%;
  padding: 20px 0;
  display: flex;
  flex-wrap: wrap;

  .centerBox {
    display: flex;
    text-align: left;
    line-height: 40px;
    .labels {
      text-align: center;
      background: #f7f8fa;
      width: 160px;
      height: 40px;
      border: 1px solid #e5e6eb;
    }
    .detail {
      width: 320px;
      height: 40px;
      padding-left: 20px;
      border: 1px solid #e5e6eb;
    }
    .detail1 {
      width: 1280px;
      height: 40px;
      padding-left: 20px;
      border: 1px solid #e5e6eb;
    }
  }
}
</style>