<template>
  <div id="mask">
    <div class="banner">
      <el-carousel :interval="5000" indicator-position="none">
        <el-carousel-item>
          <img src="../assets/img/home-bgi.jpeg" alt="" />
        </el-carousel-item>
        <el-carousel-item>
          <img src="../assets/img/main-bg.png" alt="" />
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue"
import { useRouter, useRoute } from "vue-router"
export default defineComponent({
  setup() {
    const router = useRouter()
    const route = useRoute()
    const carouselList = ref([])
    onMounted(() => {})
    return {
      carouselList,
    }
  },
})
</script>
<style scoped>
#mask {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  z-index: 101;
}

.banner /deep/ .el-carousel__container {
  height: 100% !important;
}

.banner /deep/ .el-carousel__container .el-carousel__arrow {
  display: none;
}

.banner img {
  display: inline-block;
  height: auto;
  max-width: 100%;
}
.banner,
.banner div {
  width: 1280px;
  height: 1024px;
}
</style>
