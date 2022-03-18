<template>
  <div class="system">
    <ContentWrapper :title="'系统管理'">
      <template v-slot:operation>
        <!-- <a-button type="primary" size="small">系统1</a-button>
        <a-button type="primary" size="small">系统2</a-button> -->
      </template>
      <template v-slot:contentMain>
        <div class="contentxt">
          <p><span>*</span>平台名称</p>
          <a-input :style="{width:'240px'}"
                   placeholder="Please enter something"
                   allow-clear
                   v-model="platformName"
                   size="small" />
        </div>
        <div class="contentxt">
          <p>平台识别码</p>
          <a-input :style="{width:'240px'}"
                   v-model="identificationCode"
                   placeholder="Please enter something"
                   allow-clear
                   disabled="true"
                   size="small" />
        </div>
        <div class="contentxt">
          <p>有效日期</p>
          <a-date-picker style="width: 240px;"
                         show-time
                         v-model="expiredTime"
                         disabled="true"
                         :time-picker-props="{ defaultValue: dayjs('09:09:06', 'HH:mm:ss') }"
                         format="YYYY-MM-DD HH:mm:ss" />
        </div>
        <div class="contentxt">
          <p>时区</p>
          <a-select :style="{width:'240px'}"
                    v-model="timeZone"
                    placeholder="Please select ...">
            <a-option v-for="item in timeZoneOption"
                      :key="item.value"
                      :label="item.value"
                      :value="item.value"></a-option>

          </a-select>
        </div>
        <div class="but">
          <a-button html-type="submit"
                    @click="changeTheData">应用</a-button>
        </div>
      </template>
    </ContentWrapper>
  </div>
</template>

<script>
import { platformManagement } from '@/services/api/system-settings'
import ContentWrapper from '@/components/content-wrapper/index.vue'
import dayjs from 'dayjs'
export default {
  components: {
    ContentWrapper
  },
  data() {
    return {
      dayjs,
      timeZoneOption: [
        {
          value: 'GMT-12'
        },
        {
          value: 'GMT-11'
        },
        {
          value: 'GMT-10'
        },
        {
          value: 'GMT-9'
        },
        {
          value: 'GMT-8'
        },
        {
          value: 'GMT-7'
        },
        {
          value: 'GMT-6'
        },
        {
          value: 'GMT-5'
        },
        {
          value: 'GMT-4'
        },
        {
          value: 'GMT-3'
        },
        {
          value: 'GMT-2'
        },
        {
          value: 'GMT-1'
        },
        {
          value: 'GMT'
        },
        {
          value: 'GMT+1'
        },
        {
          value: 'GMT+2'
        },
        {
          value: 'GMT+3'
        },
        {
          value: 'GMT+4'
        },
        {
          value: 'GMT+5'
        },
        {
          value: 'GMT+6'
        },
        {
          value: 'GMT+7'
        },
        {
          value: 'GMT+8'
        },
        {
          value: 'GMT+9'
        },
        {
          value: 'GMT+10'
        },
        {
          value: 'GMT+11'
        },
        {
          value: 'GMT+12'
        }
      ],
      timeZone: '',
      identificationCode: '',
      platformName: '',
      expiredTime: ''
    }
  },
  mounted() {
    this.getValue()
  },
  methods: {
    async getValue() {
      // console.log(getPlatform(), 111)
      const dataInfo = await platformManagement.getSystemSettings()
      this.timeZone = dataInfo.timeZone
      this.identificationCode = dataInfo.identificationCode
      this.platformName = dataInfo.platformName
      this.expiredTime = dataInfo.expiredTime
    },
    changeTheData() {
      let params = {
        timeZone: this.timeZone,
        platformName: this.platformName
      }
      platformManagement.putPlatform(params).then((data) => {})
    }
  }
}
</script>

<style lang="less" scoped>
.system {
  width: 100%;
  height: 100%;
}
.contentxt {
  display: flex;
  justify-content: space-around;
  width: 360px;
  margin-bottom: 20px;
  p {
    text-align: right;
    width: 70px;
    span {
      color: red;
    }
  }
}
.but {
  display: flex;
  width: 360px;
  justify-content: center;
}
</style>