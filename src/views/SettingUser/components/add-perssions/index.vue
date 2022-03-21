<template>
  <OperationWrapper :title="titles">
    <template v-slot:formContent>
      <div v-show="titles!='详情'">
        <div>
          <div class="asasdads">
            <div class="addData">
              <div class="box3">
                <p> <span class="bz">*</span>用户名</p>
                <a-input v-model="form.username"
                         placeholder="please enter..." />
              </div>
              <div class="box3">
                <p><span class="bz">*</span>会话超时时间</p>
                <a-input v-model="form.sessionTimeout"
                         placeholder="please enter..." />
              </div>
              <div class="box3">
                <p><span class="bz">*</span>过期时间</p>
                <a-date-picker v-model="form.expiredTime" />
              </div>
              <div class="box3">
                <p><span class="bz">*</span>角色</p>
                <a-select v-model="form.roleId"
                          placeholder="Please select ...">
                  <a-option v-for="role in roleList"
                            :key="role.roleId"
                            :label="role.roleNameZh"
                            :value="role.roleId"></a-option>
                </a-select>
              </div>
              <div class="box3">
                <p><span class="bz">*</span>电子邮箱</p>
                <a-input v-model="form.email"
                         placeholder="please enter..." />
              </div>
              <div class="box3">
                <p><span class="bz">*</span>电话号码</p>
                <a-input v-model="form.phone"
                         placeholder="please enter..." />
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
      </div>
      <div>
        <div v-show="titles=='详情'"
             class="outerBox">
          <div class="centerBox">
            <div class="labels"><span class="bz">*</span>用户名</div>
            <div class="detail">{{form.username}}</div>
          </div>
          <div class="centerBox">
            <div class="labels"><span class="bz">*</span>密码</div>
            <div class="detail">{{form.password}}</div>
          </div>
          <div class="centerBox">
            <div class="labels">过期时间</div>
            <div class="detail">{{form.registerTime}}</div>
          </div>
          <div class="centerBox">
            <div class="labels"><span class="bz">*</span>角色</div>
            <div class="detail">{{form.timeZone}}</div>
          </div>
          <div class="centerBox">
            <div class="labels"><span class="bz">*</span>会话超时时间</div>
            <div class="detail">{{form.sessionTimeout}}</div>
          </div>
          <div class="centerBox">
            <div class="labels"><span class="bz">*</span>电话号码</div>
            <div class="detail">{{form.timeZone}}</div>
          </div>
          <div class="centerBox">
            <div class="labels"><span class="bz">*</span>电子邮箱</div>
            <div class="detail1">{{form.email}}</div>
          </div>

          <div class="centerBox">
            <div class="labels">描述</div>
            <div class="detail1">{{form.description}}</div>
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
import { setUser } from '@/services/api/system-settings'
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
    const roleList = ref([])
    const form = computed(() => reactive(props.formData))
    console.log(form)
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
      let params = form
      let title = ref(props.titles).value
      params.situsIdList = [5, 0, 17, 18, 19, 31, 32]
      if (title == '详情') {
        setUser.postUser(form._value).then((data) => {
          context.emit('cancelAdd', true)
        })
      } else {
        setUser.putUser(form._value).then((data) => {
          context.emit('cancelAdd', true)
        })
      }
    }
    onMounted(() => {
      RoleList()
    })
    return {
      cancel,
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
  width: calc(100% - 40px);
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .bz {
    color: #f53f3f;
  }
  .box3 {
    width: 30%;
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
      border: 1px solid #e5e6eb;
    }
    .detail {
      width: 320px;
      height: 40px;
      border: 1px solid #e5e6eb;
    }
    .detail1 {
      width: 1280px;
      height: 40px;
      border: 1px solid #e5e6eb;
    }
  }
}
</style>