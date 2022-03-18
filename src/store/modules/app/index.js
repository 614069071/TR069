import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => {
   return {
    menuCollapse: false,
    username: '',
    permissionsRow: {},
    permissionsModifyRow: {},
    showRightBox: false
   }
  },
  getters: {},
  actions: {
    updateSettings(partial) {
      this.$patch(partial)
    },
    updatePermissionsRow(menu) {
      this.permissionsRow = menu
    },
    updateShowRightBox(value) {
      this.showRightBox = value
    }
  }
})