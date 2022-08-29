<template>
  <Header></Header>
  <div style="margin-top: 252px">
    <swiper
      class="swiper-box pointer"
      style="width: 1688px; height: 650px"
      :modules="modules"
      :space-between="50"
      :slidesPerView="5"
      :coverflowEffect="{
        rotate: 30,
        stretch: 10,
        depth: 60,
        modifier: 2,
        slideShadows: true,
      }"
      autoplay="false"
      :navigation="{
        nextEl: '.swiper-button-next', //前进后退按钮
        prevEl: '.swiper-button-prev',
      }"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <swiper-slide @click="toPage(1)">
        <div class="slide-box">
          <div class="text-center">
            <img
              class="tab-item"
              src="../assets/img/icon_成果展示.png"
              alt=""
            />
            <p class="font28 fff">成果展示</p>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide @click="toPage(2)">
        <div class="slide-box">
          <div class="text-center">
            <img
              class="tab-item"
              src="../assets/img/icon_工作制度.png"
              alt=""
            />
            <p class="font28 fff">工作制度</p>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide @click="toPage(3)">
        <div class="slide-box">
          <div class="text-center">
            <img class="tab-item" src="../assets/img/flag-icon.png" alt="" />
            <p class="font28 fff">活动情况</p>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide @click="toPage(4)">
        <div class="slide-box">
          <div class="text-center">
            <img
              class="tab-item"
              src="../assets/img/icon_代表信息.png"
              alt=""
            />
            <p class="font28 fff">代表信息</p>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide @click="toPage(5)">
        <div class="slide-box">
          <div class="text-center">
            <img
              class="tab-item"
              src="../assets/img/icon_基本信息.png"
              alt=""
            />
            <p class="font28 fff">基本信息</p>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide @click="toPage(6)">
        <div class="slide-box">
          <div class="text-center">
            <img
              class="tab-item"
              src="../assets/img/icon_工作计划.png"
              alt=""
            />
            <p class="font28 fff">工作计划</p>
          </div>
        </div>
      </swiper-slide>
    </swiper>
    <div class="swiper-button-prev" style="color: #ffffff"></div>
    <div class="swiper-button-next" style="color: #ffffff"></div>
    <!-- <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="item in 6" :key="item">
        <h3 text="2xl" justify="center">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel> -->
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue"
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
    const tokenStr = ref()
    //自动轮播的配置
    const autoplayOptions = {
      // delay: 2000,
      // disableOnInteraction: false,
      // loop: true,
      // pauseOnMouseEnter: true,
      // reverseDirection: true,
    }

    const onSwiper = (swiper: any) => {
      // console.log(swiper)
      // console.log(swiper.slides.length)
      for (var i = 0; i < swiper.slides.length; i++) {
        // debugger
        // console.log(i)
      }
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
      } else if (num == 6) {
        router.push({
          path: "/",
          query: {
            // goodsId: id,
          },
        })
      }
    }
    const ipcRenderer = require("electron").ipcRenderer
    onMounted(() => {
      let token = localStorage.getItem("token")
      tokenStr.value = token
      // console.log(tokenStr.value)
      var ws = new WebSocket(
        "ws://192.168.1.116:9527/api/manager/display/websocket?version=1.06&Authorization=" +
          tokenStr.value
      )
      // console.log(ws)

      ws.onerror = function () {
        console.log("error")
      }
      ws.onopen = function () {
        console.log("连接成功...")
      }
      ws.onmessage = function (e) {
        console.log(e.data)
        let files = JSON.parse(e.data)
        console.log(files)
        // return
        // 监听主进程过来的消息
        ipcRenderer.on("main-process-message", (_event, ...args) => {
          console.log("接收主进程过来的消息===", ...args)
        })
        // 向主进程发送消息
        ipcRenderer.send("save-data", "我是渲染进程的消息")
        // ipcRenderer.send("save-data", e.data)
      }
    })
    return {
      tokenStr,
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
@import "../assets/glob.css";
.swiper-box {
  /* width: 1688px;
  height: 650px; */
}
.slide-box {
  /* padding-top: 40px; */
  width: 329px;
  height: 306px;
  background: url(../assets/img/active-bg.png) center center no-repeat;
}
.icon-box {
  width: 108px;
  height: 108px;
  /* margin-top: 40px; */
}
.tab-item {
  margin-top: 40px;
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
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
