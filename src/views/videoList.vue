<template>
  <div class="bg-box" :style="{ backgroundImage: `url(${imgUrl})` }">
    <Header></Header>
    <div class="content-box">
      <!-- 成果展示 -->
      <swiper
        class="swiper-box"
        style="width: 1480px; height: 700px"
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
          v-for="item in systemList"
          class="swiper-slide-box"
          style="height: 50%"
        >
          <div
            class="result-item font24 text-left flex-c pointer"
            @click="toDetail(item)"
          >
            <div class="book-img">
              <p class="file-name font24 tab-red">{{ item.name }}</p>
            </div>
            <span class="title-color m-t-16 text-width two-line-text">{{
              item.name
            }}</span>
          </div>
        </swiper-slide>
      </swiper>
      <div class="swiper-button-prev" style="color: #ffffff"></div>
      <div class="swiper-button-next" style="color: #ffffff"></div>
    </div>
    <Footer class="footer-fixed"></Footer>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, ref } from "vue"
import { useRouter, useRoute } from "vue-router"
import { InitData } from "../types/workSystem"
import Header from "../components/header.vue"
import Footer from "../components/footer.vue"
import { Navigation, Pagination, Autoplay, Grid } from "swiper"
import { Swiper, SwiperSlide } from "swiper/vue"
import "swiper/css"
import "swiper/css/navigation"
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
    const route = useRoute()
    const imgUrl = ref()
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
    const toDetail = (info: any) => {
      if (info.type == 6) {
        router.push({
          path: "/video",
          query: {
            videoUrl: info.url,
            name: info.name,
          },
        })
      }
    }
    onMounted(() => {
      const storage = require("electron-localStorage")
      let path = storage.getItem("filePath")
      let url = path + "\\"
      url = url.replace(/\\/g, "/")
      let bgImg = url + route.query.bgi
      imgUrl.value = bgImg
      let files = localStorage.getItem("fileData") as string
      data.systemList = JSON.parse(files)
      console.log("视频列表", data.systemList)
    })
    return {
      ...toRefs(data),
      imgUrl,
      toHome,
      onSwiper,
      onSlideChange,
      toDetail,
      modules: [Navigation, Pagination, Autoplay, Grid],
    }
  },
})
</script>
<style scoped>
@import "../assets/glob.css";
.div-box {
  /* background: url(../assets/img/active-bg.png); */
}
.content-box {
  margin-top: 96px;
}
.result-item {
  width: 207px;
  /* height: 230px; */
  height: auto;
  margin: 0 auto;
  /* background-image: url(../assets/img/result-item.png); */
  padding-top: 34px;
  padding-left: 26px;
  padding-right: 17px;
  /* background-color: burlywood; */
}
.book-img {
  width: 220px;
  height: 235px;
  background: url(../assets/img/空白封面.png);
  background-size: 220px 235px;
}
.file-name {
  width: 160px;
  margin: 0 auto;
  margin-top: 100px;
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  word-break: break-all;
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
