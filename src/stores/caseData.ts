import { defineStore } from "pinia";

export const useData = defineStore("use-data", {
  state: () => ({
    goodsCategory: undefined,
    propGroupOption: [],
  }),
  actions: {
    updataPropGroupOption(value) {
      this.propGroupOption = value;
    },

    updateGoodsCategory(value) {
        this.goodsCategory = value
      },
  },
});
