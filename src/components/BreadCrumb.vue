<template>
  <div>
    <el-breadcrumb separator="/">
      <!-- 自定义返回函数 -->
      <el-breadcrumb-item @click="goback"> ← 返回</el-breadcrumb-item>
      <!--item.meta.title  显示的还是路由里面的名字 -->
      <el-breadcrumb-item v-for="(item, index) in navArray">{{
        // item.meta.title
      }}</el-breadcrumb-item>
    </el-breadcrumb>
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
    watch(
      () => route.path,
      (newValue, oldValue) => {
        // route.matched 目前匹配的是哪个 获得的值赋给  navArray.valu 上面用 v-for遍历值
        // navArray.value = route.matched
      }
    )
    const goback = () => {}
    return {
      navArray,
      goback,
    }
  },
})
</script>
<style scoped></style>
