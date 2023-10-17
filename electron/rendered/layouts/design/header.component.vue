<template>
  <header class="design-header">
    <!-- 头部左边 -->
    <div class="design-header-left">
      <n-space>
        <n-tooltip
          v-for="item in functionButtonList"
          :key="item.title"
          placement="bottom"
          trigger="hover"
        >
          <template #trigger>
            <n-button size="small" ghost :focusable="false">
              <component :is="item.icon"></component>
            </n-button>
          </template>
          <span>{{ item.title }}</span>
        </n-tooltip>

        <n-divier vertical />

        <!-- 历史记录按钮 -->
        <n-tooltip
          v-for="item in historyButtonList"
          :key="item.title"
          placement="bottom"
          trigger="hover"
        >
          <template #trigger>
            <n-button size="small" ghost type="primary">
              <component :is="item.icon"></component>
            </n-button>
          </template>
          <span>{{ item.title }}</span>
        </n-tooltip>
      </n-space>
    </div>

    <!-- 头部中间 -->
    <div class="design-header-center">
      <n-button
        v-show="!isShowPresentationNameInput"
        size="small"
        style="margin-left: 5px"
        :focusable="false"
        strong
        secondary
        type="tertiary"
        @click="controlPresentationNameInputShowStatus(true)"
        >{{ presentationNameShow }}</n-button
      >

      <n-input
        ref="presentationNameInputComponent"
        :autofocus="true"
        @blur="controlPresentationNameInputShowStatus(false)"
        size="small"
        placeholder="请输入幻灯片名称"
        v-show="isShowPresentationNameInput"
        v-model:value="presentationName"
        style="max-width: 100%"
      />
    </div>

    <!-- 头部右边 -->
    <div class="design-header-right">
      <n-space align="center" :size="30">
        <n-tooltip
          v-for="item in list"
          :key="item.title"
          placement="bottom"
          trigger="hover"
        >
          <template #trigger>
            <n-button size="small" strong secondary>
              <component :is="item.icon" />
            </n-button>
          </template>
          <span>{{ item.title }}</span>
        </n-tooltip>

        <n-dropdown trigger="hover" :options="userInfoDrowdownOptions">
          <n-avatar
            round
            size="small"
            src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
          />
        </n-dropdown>
      </n-space>
    </div>
  </header>
</template>

<script setup lang="ts">
import { h } from "vue";
import { NAvatar, NText } from "naive-ui";
import { usePresentationName, useFunctionButton } from "./header/hooks";
import {
  SaveSharp as SaveSharpIcon,
  ArrowDownSharp as ArrowDownSharpIcon,
} from "@vicons/ionicons5";
import { renderIcon } from "@/utils";

// 中间命名功能
const {
  isShowPresentationNameInput,
  presentationName,
  presentationNameInputComponent,
  presentationNameShow, 
  controlPresentationNameInputShowStatus,
} = usePresentationName();

// 左侧按钮功能
const { functionButtonList, historyButtonList } = useFunctionButton();

/** 自定义渲染用户信息下拉头部 */
function renderCustomHeader() {
  return h(
    "div",
    {
      style: "display: flex; align-items: center; padding: 8px 12px;",
    },
    [
      h(NAvatar, {
        round: true,
        style: "margin-right: 12px;",
        src: "https://07akioni.oss-cn-beijing.aliyuncs.com/demo1.JPG",
      }),
      h("div", null, [
        h("div", null, [h(NText, { depth: 2 }, { default: () => "打工仔" })]),
        h("div", { style: "font-size: 12px;" }, [
          h(
            NText,
            { depth: 3 },
            { default: () => "毫无疑问，你是办公室里最亮的星" }
          ),
        ]),
      ]),
    ]
  );
}

/** 用户信息下拉选项  */
const userInfoDrowdownOptions = [
  {
    key: "header",
    type: "render",
    render: renderCustomHeader,
  },
  {
    key: "header-divider",
    type: "divider",
  },
  {
    label: "处理群消息 342 条",
    key: "stmt1",
  },
  {
    label: "被 @ 58 次",
    key: "stmt2",
  },
  {
    label: "加入群 17 个",
    key: "stmt3",
  },
];

const list = [
  {
    title: "导出",
    icon: renderIcon(ArrowDownSharpIcon),
  },
  {
    title: "保存",
    icon: renderIcon(SaveSharpIcon),
  },
];
</script>

<style scoped lang="scss">
.design-header {
  display: grid;
  grid-template-columns: repeat(3, 33%);
  height: 60px;
  padding: 0 20px 0 60px;
}

.design-header > * {
  display: flex;
  align-items: center;
  min-width: 520px;
}
.design-header-left {
  justify-content: flex-start;
}

.design-header-center {
  justify-content: center;
}

.design-header-right {
  justify-content: end;
}
</style>
