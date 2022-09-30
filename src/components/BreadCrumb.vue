<template>
  <div class="nav-box">
    <div class="flex-r" v-for="(item, index) in navArray">
      <span style="fontsize: 24px; margin-left: 10px; margin-right: 10px">{{
        item
      }}</span>
      <span v-if="index != navArray.length - 1">></span>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, watch, ref, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
// import { ArrowRight } from '@element-plus/icons-vue'
export default defineComponent({
  setup() {
    const navArray = ref([])
    const route = useRoute()
    const router = useRouter()
    // 监听函数监听路径的变化
    const goback = () => {}
    onMounted(() => {
      let navArr = JSON.parse(localStorage.getItem("nav_arr") as string)
      navArray.value = navArr
    })
    return {
      navArray,
      goback,
    }
  },
})
</script>
<style scoped>
.nav-box {
  padding-left: 24px;
  margin-top: 20px;
  text-align: left;
  display: flex;
  flex-direction: row;
}
</style>
