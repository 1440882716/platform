<template>
  <div>
    <h1 @click="toHome">登录页面</h1>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue"
import { useRouter } from "vue-router"
export default defineComponent({
  setup() {
    const router = useRouter()
    const toHome = () => {
      router.push({
        path: "/home",
        query: {
          // goodsId: id,
        },
      })
    }
    return {
      toHome,
    }
  },
})
</script>
<style scoped></style>
