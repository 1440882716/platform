<template>
  <Header></Header>
  <div style="margin-top: 252px">
    <swiper
      class="swiper-box"
      style="width: 1688px; height: 650px"
      :modules="modules"
      :space-between="50"
      :slidesPerView="3"
      :coverflowEffect="{
        rotate: 30,
        stretch: 10,
        depth: 60,
        modifier: 2,
        slideShadows: true,
      }"
      :autoplay="autoplayOptions"
      :navigation="{
        nextEl: '.swiper-button-next', //前进后退按钮
        prevEl: '.swiper-button-prev',
      }"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <swiper-slide @click="toPage(1)">
        <img
          style="width: 600px; height: 300px"
          src="../assets/img/test1.png"
          alt=""
        />
      </swiper-slide>
      <swiper-slide @click="toPage(2)">
        <img
          style="width: 600px; height: 300px"
          src="../assets/img/test2.png"
          alt=""
        />
      </swiper-slide>
      <swiper-slide @click="toPage(3)">
        <img
          style="width: 600px; height: 300px"
          src="../assets/img/test3.png"
          alt=""
        />
      </swiper-slide>
      <swiper-slide @click="toPage(4)">
        <img
          style="width: 600px; height: 300px"
          src="../assets/img/test1.png"
          alt=""
        />
      </swiper-slide>
      <swiper-slide @click="toPage(5)">
        <img
          style="width: 600px; height: 300px"
          src="../assets/img/test2.png"
          alt=""
        />
      </swiper-slide>
      <swiper-slide>
        <img
          style="width: 600px; height: 300px"
          src="../assets/img/test3.png"
          alt=""
        />
      </swiper-slide>
      <!-- <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div> -->
    </swiper>
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue"
import { useRouter } from "vue-router"
import Header from "../components/header.vue"
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  EffectCoverflow,
} from "swiper"
import { Swiper, SwiperSlide } from "swiper/vue"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/scrollbar"
import { array } from "yargs"

export default defineComponent({
  components: {
    Header,
    Swiper,
    SwiperSlide,
  },
  setup() {
    const router = useRouter()
    //     const swiper = new Swiper('.swiper', {
    //   effect: 'coverflow',
    //   coverflowEffect: {
    //     rotate: 30,
    //     slideShadows: false,
    //   },
    // });
    //自动轮播的配置
    const autoplayOptions = {
      //   delay: 2000,
      disableOnInteraction: false,
      loop: true,
      pauseOnMouseEnter: true,
      reverseDirection: true,
    }

    const onSwiper = (swiper: any) => {
      // console.log(swiper);
    }
    const onSlideChange = () => {
      // console.log('slide change');
    }
    const toPage = (num: number) => {
      if (num == 1) {
        router.push({
          path: "/result",
          query: {
            // goodsId: id,
          },
        })
      } else if (num == 2) {
        router.push({
          path: "/workSystem",
          query: {
            // goodsId: id,
          },
        })
      } else if (num == 3) {
        router.push({
          path: "/active",
          query: {
            // goodsId: id,
          },
        })
      } else if (num == 4) {
        router.push({
          path: "/representative",
          query: {
            // goodsId: id,
          },
        })
      } else if (num == 5) {
        router.push({
          path: "/infomation",
          query: {
            // goodsId: id,
          },
        })
      }
    }
    return {
      autoplayOptions,
      onSwiper,
      onSlideChange,
      toPage,
      modules: [
        Navigation,
        Pagination,
        Scrollbar,
        A11y,
        Autoplay,
        EffectCoverflow,
      ],
    }
  },
})
</script>
<style scoped>
.swiper-box {
  /* width: 1688px;
  height: 650px; */
}
</style>
