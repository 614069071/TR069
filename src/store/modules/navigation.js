import { defineStore } from "pinia";

export const useNavigationStore = defineStore('navigation', {
  state: () => {
    return {
      parent: [],
      child: null,
      event: null
    }
  },
  actions: {
    updateParent(v) {
      this.parent = v;
      this.child = null;
    },
    updateChild(v) {
      this.child = v;
    },
    updateEvent(v) {
      this.event = v;
    }
  },
  persist: { enabled: true }
})