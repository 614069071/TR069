import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => {
    return {
      menuCollapse: false,
      selectedMenuKey: '',
      username: '',
      permissionsRow: {},
      permissionsModifyRow: {},
      showRightBox: false,
      invitationCreation: {},
      userModifyRow: {},
      roleModifyCreation: {},
      platformCreation: {}
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
  },
  persist: {
    enabled: true
  }
})