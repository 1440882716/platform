<script setup lang="ts">
import { defineComponent, ref, reactive, toRefs, onMounted } from "vue"
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
// import HelloWorld from "./components/HelloWorld.vue"
onMounted(() => {
  document.body.style.setProperty("--el-color-primary", "#F31A1A")
  document.body.style.setProperty("--el-font-size-base", "24px")
})
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <keep-alive v-if="route.meta.keepAlive">
      <component :is="Component"></component>
    </keep-alive>
    <component v-else :is="Component"></component>
  </router-view>
</template>

<style>
* {
  padding: 0;
  margin: 0;
}
body {
  min-height: 100%;
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-image: url(./assets/img/main-bg.png);
  width: 100%;
  height: 100%;
  /* height: 1080px; */
  background-size: cover;
}

.logo-box {
  display: flex;
  width: 100%;
  justify-content: center;
}
.logo-box span {
  width: 74px;
}
.static-public {
  display: flex;
  align-items: center;
  justify-content: center;
}
.static-public code {
  background-color: #eee;
  padding: 2px 4px;
  margin: 0 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
