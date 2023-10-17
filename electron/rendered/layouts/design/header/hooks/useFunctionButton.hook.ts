import { renderIcon } from "@/utils";
import { reactive } from "vue";
import { BarChart as BarChartIcon, Layers as LayersIcon, Prism as PrismIcon,ArrowBack as ArrowBackIcon, ArrowForward as ArrowForwardIcon } from '@vicons/ionicons5'
export function useFunctionButton() {

  /** 左侧功能按钮列表 */
  const functionButtonList = reactive([
    {
      title: "图表组件",
      icon: renderIcon(BarChartIcon),
    },
    {
      title: "图层控制",
      icon: renderIcon(LayersIcon),
    },
    {
      title: "详情设置",
      icon: renderIcon(PrismIcon),
    },
  ]);


  /** 左侧历史按钮列表 */
  const historyButtonList = reactive([
    {
      title: "后退",
      icon: renderIcon(ArrowBackIcon),
    },
    {
      title: "前进",
      icon: renderIcon(ArrowForwardIcon),
    },
  ])

  return {
    /** 左侧功能按钮列表 */
    functionButtonList,
    /** 左侧历史按钮列表 */
    historyButtonList,
  }
}