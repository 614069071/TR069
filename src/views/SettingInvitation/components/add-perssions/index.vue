<template>
  <OperationWrapper :title="titles">
    <template v-slot:formContent>
      <div v-show="titles!='详情'"
           class="newBox">
        <a-form layout="vertical"
                :model="form"
                @submit-success="handleBeforeOk">
          <a-row :gutter="24">
            <a-col :span="12">
              <a-form-item label="账号角色"
                           field="roleId"
                           required>
                <a-select v-model="form.roleId"
                          placeholder="Please select ...">
                  <a-option v-for="role in roleList"
                            :key="role.roleId"
                            :label="role.roleNameZh"
                            :value="role.roleId"></a-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="账号过期时间"
                           field="userExpiredTime"
                           required>
                <a-date-picker v-model="form.userExpiredTime"
                               show-time
                               :disabledDate="(current) => dayjs(current).isBefore(dayjs())"
                               style="width:360px"
                               format="YYYY-MM-DD HH:mm:ss" />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="账号描述"
                           field="userDescription">
                <a-input v-model="form.userDescription"
                         placeholder="please enter..." />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="邀请码有效次数"
                           field="validTimes"
                           :rules="validTimesRules"
                           :validate-trigger="['change', 'blur']"
                           required>
                <a-input v-model="form.validTimes"
                         type="number"
                         placeholder="please enter..." />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="邀请码过期时间"
                           field="expiredTime"
                           required>
                <a-date-picker v-model="form.expiredTime"
                               show-time
                               :disabledDate="(current) => dayjs(current).isBefore(dayjs())"
                               style="width:360px"
                               format="YYYY-MM-DD HH:mm:ss" />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="邀请码描述"
                           field="description">
                <a-input v-model="form.description"
                         placeholder="please enter..." />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="是否需要再次确认"
                           field="needCheck"
                           required>
                <a-select v-model="form.needCheck"
                          placeholder="Please select ...">
                  <a-option v-for="item in needCheckList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"></a-option>
                </a-select>
              </a-form-item>
            </a-col>

            <a-col :span="24">
              <a-form-item>
                <a-space>
                  <a-button @click="handleCancel">取消</a-button>
                  <a-button html-type="submit"
                            @submit-success="handleBeforeOk"
                            type="primary">确定</a-button>
                </a-space>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <div>
        <div v-show="titles=='详情'"
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
            <div class="detail">{{form.roleNameZh}}</div>
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
                  v-show="titles=='详情'"
                  @click="handleCancel">取消</a-button>
      </div>
    </template>
  </OperationWrapper>
</template>

<script>
import OperationWrapper from '@/components/operation-wrapper/index.vue'
import { Message } from '@arco-design/web-vue'
import dayjs from 'dayjs';
import {
  invitationCodeManagement,
  setUser
} from '@/services/api/system-settings'
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
    // let form = reactive(props.formData)
    const menuType = ref([])
    const roleList = ref([])
    const needCheckList = ref([
      { label: '是', value: '1' },
      { label: '否', value: '0' }
    ])
    const form = computed(() => reactive(props.formData))
    const RoleList = async () => {
      const dataInfo = await setUser.getRoleList()
      roleList.value = dataInfo
    }

    const cancel = () => {
      context.emit('cancelAdd')
    }
    const handleCancel = () => {
      context.emit('cancelAdd')
    }
    const handleBeforeOk = () => {
      let message = ''
      let dataInfo = form._value
      roleList._value.forEach((item) => {
        if (item.roleId == dataInfo.roleId) {
          dataInfo.roleNameZh = item.roleNameZh
        }
      })
      if (form._value.userExpiredTime > form._value.expiredTime) {
        message = '日期不正确'
      }
      if (message) {
        Message.error({
          id: 'httpInfo',
          content: message,
          duration: 2000,
          position: 'top'
        })
        return
      }
      invitationCodeManagement.newInvitation(form._value).then((data) => {
        context.emit('cancelAdd', true)
      })
    }
    onMounted(() => {
      RoleList()
    })
    return {
      roleList,
      needCheckList,
      cancel,
      handleCancel,
      handleBeforeOk,
      form,
      menuType,
      dayjs,
      validTimesRules: [
        {
          required: true,
          validator: async (value, callback) => {
            if (value < 1) {
              callback('次数需大于0')
            }
          }
        }
      ]
    }
  }
}
</script>
<style lang="less" scoped>
.newBox {
  width: 750px;
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