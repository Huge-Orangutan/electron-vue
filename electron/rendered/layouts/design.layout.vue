<template>
    <n-layout style="height: 100vh">
        <n-layout-header style="height: 60px;" bordered>
            <Header />
        </n-layout-header>
        <n-layout position="absolute" style="top: 64px; " has-sider>
            <n-layout-sider content-style="padding: 24px;" :native-scrollbar="false" bordered>
            </n-layout-sider>
            <n-layout content-style="padding: 24px;" :native-scrollbar="false">
               
            </n-layout>
        </n-layout>
    </n-layout>
</template>

<script setup lang="ts">
import Header from './design/header.component.vue'
</script>

<style scoped lang="scss">
.design-slides {}

.design-edit-screen {}
</style>