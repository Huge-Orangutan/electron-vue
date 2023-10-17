import { createI18n } from "vue-i18n";
import * as zh from "@/assets/langs/zh.lang";
import * as en from "@/assets/langs/en.lang";
export const i18n = createI18n({
  globalInjection: true, //全局生效$t
  legacy: false,
  locale: localStorage.getItem("lang") === "en" ? "en" : "zh", // 语言标识
  messages: {
    zh,
    en,
  },
});
