<template>
  <Header></Header>
  <div class="content-box">
    <!-- 成果展示 -->
    <swiper
      class="swiper-box"
      style="width: 1480px; height: 650px"
      :modules="modules"
      :slidesPerView="4"
      :grid="{
        rows: 2,
        fill: 'column',
      }"
      :navigation="{
        nextEl: '.swiper-button-next', //前进后退按钮
        prevEl: '.swiper-button-prev',
      }"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <swiper-slide
        v-for="item in resultList"
        class="swiper-slide-box"
        style="height: 50%"
      >
        <div class="result-item title-red font28 text-left">
          <span class="">{{ item.title }}</span>
        </div>
      </swiper-slide>
      <!-- <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div> -->
    </swiper>
    <div class="swiper-button-prev" style="color: #ffffff"></div>
    <div class="swiper-button-next" style="color: #ffffff"></div>
  </div>
  <Footer class="footer-fixed"></Footer>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue"
import { useRouter } from "vue-router"
import { InitData } from "../types/result"
import Header from "../components/header.vue"
import Footer from "../components/footer.vue"
import { Navigation, Pagination, Autoplay, Grid } from "swiper"
import { Swiper, SwiperSlide } from "swiper/vue"
import "swiper/css"
import "swiper/css/navigation"
// import "swiper/css/pagination"
import "swiper/css/grid"

export default defineComponent({
  components: {
    Header,
    Footer,
    Swiper,
    SwiperSlide,
  },
  setup() {
    const data = reactive(new InitData())
    const router = useRouter()
    const onSwiper = (swiper: any) => {
      // console.log(swiper);
    }
    const onSlideChange = () => {
      // console.log('slide change');
    }
    const toHome = () => {
      router.push({
        path: "/home",
        query: {
          // goodsId: id,
        },
      })
    }
    return {
      ...toRefs(data),
      toHome,
      onSwiper,
      onSlideChange,
      modules: [Navigation, Pagination, Autoplay, Grid],
    }
  },
})
</script>
<style scoped>
@import "../assets/glob.css";
.content-box {
  margin-top: 96px;
}
.result-item {
  width: 207px;
  height: 230px;
  margin: 0 auto;
  background-image: url(../assets/img/result-item.png);
  padding-top: 34px;
  padding-left: 26px;
  padding-right: 17px;
  /* background-color: burlywood; */
}
.swiper-button-prev {
  width: 68px;
  height: 136px;
  background-image: url(../assets/img/left-btn.png);
}
.swiper-button-next {
  width: 68px;
  height: 136px;
  background-image: url(../assets/img/right-btn.png);
}
.footer-fixed {
  position: fixed;
  bottom: 0;
}
</style>
