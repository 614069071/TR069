<template>
  <OperationWrapper :title="title">
    <template v-slot:formContent>
      <div v-show="title != '详情'">
        <div>
          <a-form layout="vertical" :model="form" @submit-success="handleBeforeOk">
            <a-row :gutter="40" align-items="align">
              <a-col :span="8">
                <a-form-item label="平台名称" field="platformName" maxLength="50" :validate-trigger="['change', 'blur']" required>
                  <a-input v-model="form.platformName" placeholder="please enter..." />
                </a-form-item>
              </a-col>
              <a-col :span="8" v-if="title == '新增'">
                <a-form-item label="root账号" field="rootUsername" :rules="chineseVerificationRules" minLength="8" maxLength="50" :validate-trigger="['change', 'blur']" required>
                  <a-input v-model="form.rootUsername" placeholder="please enter..." />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="最大用户数" field="maxUser" :rules="validTimesRules" :validate-trigger="['change', 'blur']" required>
                  <a-input v-model="form.maxUser" type="number" placeholder="please enter..." />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="客户编码" required :rules="chineseVerificationRules" maxLength="50" :validate-trigger="['change', 'blur']" field="platformCode">
                  <a-input v-model="form.platformCode" placeholder="please enter..." />
                </a-form-item>
              </a-col>
              <a-col :span="8" v-if="title != '修改'">
                <a-form-item label="root密码" type="password" field="rootPassword" :rules="chineseVerificationRules" minLength="8" maxLength="50" :validate-trigger="['change', 'blur']" required>
                  <a-input v-model="form.rootPassword" placeholder="please enter..." />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="时区" field="timeZone" required>
                  <a-select v-model="form.timeZone" placeholder="Please select ...">
                    <a-option v-for="role in timeZoneOption" :key="role.value" :label="role.value" :value="role.value"></a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="有效日期" field="expiredTime" required>
                  <a-date-picker v-model="form.expiredTime" show-time :disabled="aging" :disabledDate="current => dayjs(current).isBefore(dayjs())" format="YYYY-MM-DD HH:mm:ss" />
                  <a-checkbox v-model="aging" @change="changeAging">永久</a-checkbox>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="启用" field="enable" required>
                  <a-select v-model="form.enable" placeholder="Please select ...">
                    <a-option label="是" :value="1"></a-option>
                    <a-option label="否" :value="0"></a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <!-- <a-col :span="8">
                <a-form-item label="上传LOGO"
                             field="description">
                  <a-space direction="vertical"
                           :style="{ width: '100%' }">
                    <a-upload action="/"
                              :fileList="file ? [file] : []"
                              :show-file-list="false"
                              @change="onChange"
                              @progress="onProgress">
                      <template #upload-button>
                        <div :class="`arco-upload-list-item${
            file && file.status === 'error' ? ' arco-upload-list-item-error' : ''
          }`">
                          <div class="arco-upload-list-picture custom-upload-avatar"
                               v-if="file && file.url">
                            <img :src="file.url" />
                            <div class="arco-upload-list-picture-mask">
                              <IconEdit />
                            </div>
                            <a-progress v-if="file.status === 'uploading' && file.percent < 100"
                                        :percent="file.percent"
                                        type="circle"
                                        size="mini"
                                        :style="{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translateX(-50%) translateY(-50%)',
              }" />
                          </div>
                          <div class="arco-upload-picture-card"
                               v-else>
                            <div class="arco-upload-picture-card-text">
                              <IconPlus />
                              <div style="margin-top: 10px; font-weight: 600">Upload</div>
                            </div>
                          </div>
                        </div>
                      </template>
                    </a-upload>
                  </a-space>
                </a-form-item>
              </a-col> -->
              <a-col :span="16">
                <a-form-item label="描述" field="description">
                  <a-input v-model="form.description" placeholder="please enter..." />
                </a-form-item>
              </a-col>
              <!-- <a-col :span="8">
                <a-form-item label="描述"
                             field="menuType"
                             required>
                  <a-select v-model="form.menuType"
                            placeholder="Please select ...">
                    <a-option v-for="role in menuType"
                              :key="role.value"
                              :label="role.label"
                              :value="role.value"></a-option>
                  </a-select>
                </a-form-item>
              </a-col> -->
              <a-col :span="16">
                <a-form-item>
                  <a-space>
                    <a-button @click="handleCancel">取消</a-button>
                    <a-button html-type="submit" type="primary">确定</a-button>
                  </a-space>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </div>
      </div>
      <div>
        <div v-show="title == '详情'" class="outerBox">
          <div class="centerBox">
            <div class="labels">平台名称</div>
            <div class="detail">{{ form.platformName }}</div>
          </div>
          <!-- <div class="centerBox">
            <div class="labels">root账号</div>
            <div class="detail">{{ form.rootUsername }}</div>
          </div> -->
          <div class="centerBox">
            <div class="labels">最大用户数</div>
            <div class="detail">{{ form.maxUser }}</div>
          </div>
          <div class="centerBox">
            <div class="labels">客户编码</div>
            <div class="detail">{{ form.identificationCode }}</div>
          </div>
          <!-- <div class="centerBox">
            <div class="labels">root密码</div>
            <div class="detail">{{form.rootPassword}}</div>
          </div> -->
          <div class="centerBox">
            <div class="labels">时区</div>
            <div class="detail">{{ form.timeZone }}</div>
          </div>
          <div class="centerBox">
            <div class="labels">有效日期</div>
            <div class="detail">{{ form.expiredTime }}</div>
          </div>
          <div class="centerBox">
            <div class="labels">创建日期</div>
            <div class="detail">{{ form.registerTime }}</div>
          </div>
          <div class="centerBox">
            <div class="labels">是否启用</div>
            <div class="detail">{{ form.enable == 1 ? "是" : "否" }}</div>
          </div>
          <!-- <div class="centerBox">
            <div class="labels">上传LOGO</div>
            <div class="detail">{{form.logo}}</div>
          </div> -->
          <div class="centerBox">
            <div class="labels" style="height: 100px;">描述</div>
            <div class="detail" style="height: 100px;">{{ form.description }}</div>
          </div>
          <!-- <div class="centerBox">
            <div class="labels"></div>
            <div class="detail"></div>
          </div> -->
        </div>
        <a-button html-type="submit" v-show="title == '详情'" @click="handleCancel">取消</a-button>
      </div>
    </template>
  </OperationWrapper>
</template>

<script>
import OperationWrapper from "@/components/operation-wrapper/index.vue";
import { platformManagement } from "@/services/api/system-settings";
import { ref, onMounted, toRef, watch } from "vue";
import dayjs from "dayjs";
import { useAppStore } from "@/store";
import { jumpTo } from "@/utils/common";
export default {
  components: {
    OperationWrapper,
  },
  setup(props, context) {
    const appStore = useAppStore();
    const menuType = ref([]);
    const timeZoneOption = ref([
      {
        value: "GMT-12",
      },
      {
        value: "GMT-11",
      },
      {
        value: "GMT-10",
      },
      {
        value: "GMT-9",
      },
      {
        value: "GMT-8",
      },
      {
        value: "GMT-7",
      },
      {
        value: "GMT-6",
      },
      {
        value: "GMT-5",
      },
      {
        value: "GMT-4",
      },
      {
        value: "GMT-3",
      },
      {
        value: "GMT-2",
      },
      {
        value: "GMT-1",
      },
      {
        value: "GMT",
      },
      {
        value: "GMT+1",
      },
      {
        value: "GMT+2",
      },
      {
        value: "GMT+3",
      },
      {
        value: "GMT+4",
      },
      {
        value: "GMT+5",
      },
      {
        value: "GMT+6",
      },
      {
        value: "GMT+7",
      },
      {
        value: "GMT+8",
      },
      {
        value: "GMT+9",
      },
      {
        value: "GMT+10",
      },
      {
        value: "GMT+11",
      },
      {
        value: "GMT+12",
      },
    ]);
    const file = ref({});
    const aging = ref(false);
    const needCheckList = ref([
      { label: "是", value: "1" },
      { label: "否", value: "0" },
    ]);

    const title = ref("");
    const form = ref({});
    watch(
      () => appStore.platformCreation,
      newVal => {
        for (let key in newVal.form) {
          if (key == "expiredTime") {
            if (newVal.form[key] == "2099-01-01 00:00:00") {
              aging.value = true;
            } else {
              aging.value = false;
            }
          }
          form[key] = toRef(newVal.form, key);
        }
        title.value = newVal.titles;
        form.value = newVal.form;
      },
      {
        deep: true,
        immediate: true,
      }
    );

    const menuTypeList = async () => {
      // const dataInfo = await platformManagement.getPlatformMenuType()
      menuType.value = [
        { label: "NMS平台管理", value: "0" },
        { label: "TR069终端管理配置菜单", value: "1" },
      ];
    };

    const handleCancel = () => {
      jumpTo("/backstage/platformManagement");
    };
    const handleBeforeOk = () => {
      if (title.value == "修改") {
        platformManagement.putPlatform(form.value).then(data => {
          jumpTo("/backstage/platformManagement");
        });
      } else {
        platformManagement.newPlatform(form.value).then(data => {
          jumpTo("/backstage/platformManagement");
        });
      }
    };
    const onChange = (_, currentFile) => {
      file.value = {
        ...currentFile,
        // url: URL.createObjectURL(currentFile.file),
      };
    };
    const onProgress = currentFile => {
      file.value = currentFile;
    };
    const changeAging = data => {
      if (data) {
        form.value.expiredTime = "2099-01-01 00:00:00";
      }
      aging.value = data;
    };
    onMounted(() => {
      menuTypeList();
    });
    return {
      handleCancel,
      changeAging,
      handleBeforeOk,
      onProgress,
      onChange,
      title,
      form,
      menuType,
      file,
      dayjs,
      needCheckList,
      timeZoneOption,
      aging,
      validTimesRules: [
        {
          validator: (value, callback) => {
            if (value < 1) {
              callback("最大用户数需大于0");
            }
          },
        },
      ],
      chineseVerificationRules: [
        {
          validator: (value, callback) => {
            var reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
            if (reg.test(value)) {
              callback("格式不正确");
            }
          },
        },
      ],
    };
  },
};
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
  }
}
</style>
