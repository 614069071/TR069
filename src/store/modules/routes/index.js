import { defineStore } from "pinia";

export const useRoutesStore = defineStore('routes', {
  state: () => {
    return {
      routes: [],
      flatRoutes: []
    }
  },
  actions: {
    updateRoutes(routes) {
      this.routes = routes
    },
    updateFlatRoutes(flatRoutes) {
      this.flatRoutes = flatRoutes
    }
  },
  persist: {
    enabled: true
  }
})