import { ref, nextTick, computed, onMounted} from "vue";
import { InputInst } from "naive-ui";


/**  
 * 命名功能钩子函数
*/
export function usePresentationName() {

  /** 输入框组件 */
  const presentationNameInputComponent = ref<undefined | InputInst>();

  /** 幻灯片命名 */
  const presentationName = ref("");

  /** 空白时显示未命名幻灯片 */
  const presentationNameShow = computed(() =>
    presentationName.value ? presentationName.value : "未命名"
  );

  /** 是否显示幻灯片命名输入框 */
  const isShowPresentationNameInput = ref(false);

  /** 控制是否显示幻灯片命名输入框 */
  const controlPresentationNameInputShowStatus = async (status: boolean) => {
    isShowPresentationNameInput.value = status;
    await nextTick();
    presentationNameInputComponent.value?.focus();
  };


  onMounted(() => {
    const params = new URLSearchParams(location.search);
  
    const id = params.get("id");
  
    // 如果有id就获取线上的幻灯片
    if (id) {
      //
    } else {
      presentationName.value = Math.random().toString(36).substring(2);
    }
  });

  return {
    /** 输入框组件 */
    presentationNameInputComponent,
    /** 幻灯片命名 */
    presentationName,
    /** 空白时显示未命名幻灯片 */
    presentationNameShow,
    /** 是否显示幻灯片命名输入框 */
    isShowPresentationNameInput,
    /** 控制是否显示幻灯片命名输入框 */
    controlPresentationNameInputShowStatus
  }
}