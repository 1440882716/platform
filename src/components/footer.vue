<template>
  <div class="footer-box">
    <div class="footer-icon flex-r">
      <img @click="toHome" src="../assets/img/home-icon.png" alt="" />
      <img @click="backPage" src="../assets/img/back-icon.png" alt="" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue"
import { useRouter, useRoute } from "vue-router"
export default defineComponent({
  setup() {
    const router = useRouter()
    const route = useRoute()
    const toHome = () => {
      router.push({
        path: "/home",
      })
    }
    const backPage = () => {
      console.log(66666)
      router.back()
    }
    return {
      toHome,
      backPage,
    }
  },
})
</script>
<style scoped>
.footer-box {
  width: 100%;
  height: 76px;
  position: relative;
  background-image: url(../assets/img/footer.png);
}
.footer-icon {
  position: absolute;
  width: 480px;
  height: 140px;
  top: -57px;
  left: 50%;
  margin-left: -240px;
}
</style>
