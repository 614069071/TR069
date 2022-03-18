<template>
  <OperationWrapper :title="titles">
    <template v-slot:formContent>
      <div v-show="titles!='详情'">
        <div>
          <div class="asasdads">
            <div class="addData">
              <div class="box3">
                <p> <span class="bz">*</span>账号角色</p>
                <a-select v-model="form.roleId"
                          placeholder="Please select ...">
                  <a-option v-for="role in roleList"
                            :key="role.roleId"
                            :label="role.roleNameZh"
                            :value="role.roleId"></a-option>
                </a-select>
              </div>
              <div class="box3">
                <p><span class="bz">*</span>账号过期时间</p>
                <a-date-picker v-model="form.userExpiredTime"
                               show-time
                               style="width:360px"
                               format="YYYY-MM-DD HH:mm:ss" />

              </div>
              <div class="box6">
                <p><span class="bz">*</span>账号描述</p>
                <a-input v-model="form.userDescription"
                         placeholder="please enter..." />
              </div>
              <div class="box3">

                <p><span class="bz">*</span>邀请码有效次数</p>
                <a-input v-model="form.validTimes"
                         placeholder="please enter..." />
              </div>
              <div class="box3">
                <p>邀请码过期时间</p>
                <a-date-picker v-model="form.expiredTime"
                               show-time
                               style="width:360px"
                               format="YYYY-MM-DD HH:mm:ss" />
              </div>
              <div class="box6">
                <p><span class="bz">*</span>邀请码描述</p>
                <a-input v-model="form.description"
                         placeholder="please enter..." />
              </div>
              <div class="box3">
                <p>是否需要再次确认</p>
                <a-select v-model="form.needCheck"
                          placeholder="Please select ...">
                  <a-option v-for="item in needCheckList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"></a-option>
                </a-select>

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
      </div>
      <div>
        <div v-show="titles=='详情'"
             class="outerBox">
          <div class="centerBox">
            <div class="labels"><span class="bz">*</span>平台名称</div>
            <div class="detail">{{form.platformName}}</div>
          </div>
          <div class="centerBox">
            <div class="labels"><span class="bz">*</span>root账号</div>
            <div class="detail">{{form.rootUsername}}</div>
          </div>
          <div class="centerBox">
            <div class="labels">最大用户数</div>
            <div class="detail">{{form.userTotal}}</div>
          </div>
          <div class="centerBox">
            <div class="labels"><span class="bz">*</span>平台编号</div>
            <div class="detail">{{form.identificationCode}}</div>
          </div>
          <div class="centerBox">
            <div class="labels"><span class="bz">*</span>root密码</div>
            <div class="detail">{{form.rootPassword}}</div>
          </div>
          <div class="centerBox">
            <div class="labels"><span class="bz">*</span>时区</div>
            <div class="detail">{{form.timeZone}}</div>
          </div>
          <div class="centerBox">
            <div class="labels"><span class="bz">*</span>有效日期</div>
            <div class="detail">{{form.expiredTime}}</div>
          </div>
          <div class="centerBox">
            <div class="labels">创建日期</div>
            <div class="detail">{{form.registerTime}}</div>
          </div>
          <div class="centerBox">
            <div class="labels">是否启用</div>
            <div class="detail">{{form.enable}}</div>
          </div>
          <div class="centerBox">
            <div class="labels">上传LOGO</div>
            <div class="detail">{{form.logo}}</div>
          </div>
          <div class="centerBox">
            <div class="labels">描述</div>
            <div class="detail">{{form.description}}</div>
          </div>
          <div class="centerBox">
            <div class="labels"></div>
            <div class="detail"></div>
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
      menuType
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
    text-align: center;
    line-height: 40px;
    .labels {
      background: #f7f8fa;
      width: 160px;
      height: 40px;
      border-top: 1px solid #e5e6eb;
      border-left: 1px solid #e5e6eb;
    }
    .detail {
      width: 320px;
      height: 40px;
      border-top: 1px solid #e5e6eb;
      border-left: 1px solid #e5e6eb;
    }
  }
}
</style>