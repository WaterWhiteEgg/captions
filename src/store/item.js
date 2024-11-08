import { ref } from "vue";
import { defineStore } from "pinia";

export const useCityArray = defineStore(
  "item",
  () => {
    // 全局保存CityArray

    return {};
  },
  { persist: true }
);
