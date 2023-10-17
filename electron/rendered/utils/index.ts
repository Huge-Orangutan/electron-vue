import { NIcon } from "naive-ui";
import { h } from "vue";
import dayjs from "dayjs";

export * from "./lib/build-tree.util";
export * from "./lib/connect.util";
export * from "./lib/download.util";
export * from "./lib/to-map.util";

/**
 * @description 格式化日期
 * @param date 日期
 */
export function getDate(date: string): string {
  const [hour, am_pm] = dayjs(date).format("h,A").split(",");
  let dateOut;
  if (am_pm === "AM") {
    dateOut = `早上`;
  } else {
    if (hour === "12") {
      dateOut = "中午";
    } else {
      dateOut = "下午";
    }
  }
  return dateOut + " " + dayjs(date).format("h:mm:ss");
}


/**
 *  render 图标
 *  @param icon 图标
 *  @param set 设置项
 */
export const renderIcon = (icon: any, set = {}) => () => h(NIcon, set, { default: () => h(icon) })
