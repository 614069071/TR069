<template>
  <div class="layout-page-view-wrapper">
    <a-form :model="dataInfo" layout="vertical" ref="systemFormRef">
      <a-row>
        <a-col :span="8"
          ><a-form-item field="platformName" label="平台名称" :rules="[{ required: true, message: '请输入平台名称' }]" :validate-trigger="['change', 'blur']">
            <a-input placeholder="Please enter something" allow-clear v-model="dataInfo.platformName" size="medium" /> </a-form-item
        ></a-col>
        <a-col :span="8"
          ><a-form-item field="identificationCode" label="平台识别码">
            <a-input v-model="dataInfo.identificationCode" placeholder="Please enter something" allow-clear disabled="true" size="medium">
              <template #suffix>
                <icon-copy @click="copyCode" />
              </template>
            </a-input> </a-form-item
        ></a-col>
        <a-col :span="8"
          ><a-form-item field="expiredTime" label="有效日期">
            <a-date-picker show-time v-model="dataInfo.expiredTime" disabled="true" :time-picker-props="{ defaultValue: dayjs('09:09:06', 'HH:mm:ss') }" format="YYYY-MM-DD HH:mm:ss" /> </a-form-item
        ></a-col>
      </a-row>
      <a-row>
        <a-col :span="8">
          <a-form-item field="timeZone" label="时区">
            <a-select v-model="dataInfo.timeZone" placeholder="Please select ...">
              <a-option v-for="item in timeZoneOption" :key="item.value" :label="item.value" :value="item.value"></a-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="8">
          <a-form-item>
            <a-button type="primary" long @click="changeTheData">应用</a-button>
          </a-form-item></a-col
        >
      </a-row>
    </a-form>
  </div>
</template>

<script>
import { platformManagement } from "@/services/api/system-settings";
import ContentWrapper from "@/components/content-wrapper/index.vue";
import dayjs from "dayjs";
import { IconCopy } from "@arco-design/web-vue/es/icon";
import { Message } from "@arco-design/web-vue";
export default {
  components: {
    ContentWrapper,
    IconCopy,
  },
  data() {
    return {
      dayjs,
      dataInfo: {},
      timeZoneOption: [
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
      ],
    };
  },
  mounted() {
    this.getValue();
  },
  methods: {
    async getValue() {
      // console.log(getPlatform(), 111)
      const dataInfo = await platformManagement.getSystemSettings();
      this.dataInfo = dataInfo;
      this.timeZone = dataInfo.timeZone;
    },
    changeTheData() {
      let params = this.dataInfo;
      platformManagement.putPlatform(params).then(data => {
        this.getValue();
      });
    },
    copyCode() {
      const _input = document.createElement("input");
      _input.value = this.dataInfo.identificationCode;
      document.body.appendChild(_input);
      _input.select();
      if (document.execCommand("copy")) {
        document.execCommand("copy");
        document.body.removeChild(_input);
        Message.success("复制成功");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.layout-page-view-wrapper {
  :deep(.arco-form) {
    .arco-row {
      .arco-col {
        &:nth-of-type(1),
        &:nth-of-type(2) {
          padding-right: 40px;
        }
        .arco-form-item {
          max-width: 360px;
          .arco-form-item-content {
            .arco-picker {
              width: 100% !important;
            }
            .arco-btn {
              width: 68px;
            }
            .arco-input-wrapper {
              .arco-input-suffix {
                color: #000000;
                cursor: grab;
                svg {
                  font-size: 18px;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
