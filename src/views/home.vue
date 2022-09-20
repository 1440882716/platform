<template>
  <div class="background-page" :style="{ backgroundImage: `url(${imgUrl})` }">
    <!-- D:\khd\bigdata\test_files\554f31ddea1605af86e55795be4832ba_1662443630171.jpeg -->
    <!-- <div
    class="background-page"
    style="
      background-image: url(D:/khd/bigdata/test_files/554f31ddea1605af86e55795be4832ba_1662443630171.jpeg);
    "
  > -->
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
        :navigation="{
          nextEl: '.swiper-button-next', //前进后退按钮
          prevEl: '.swiper-button-prev',
        }"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
      >
        <swiper-slide v-for="item in navList" @click="nextPage(item)">
          <div class="slide-box">
            <div class="text-center">
              <!-- :src="'D:/khd/bigdata/test_files/' + item.icon" -->
              <img class="tab-item" :src="staticUrl + item.icon" alt="" />
              <p class="font28 fff">{{ item.name }}</p>
            </div>
          </div>
        </swiper-slide>
      </swiper>
      <div class="swiper-button-prev" style="color: #ffffff"></div>
      <div class="swiper-button-next" style="color: #ffffff"></div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue"
import { useRouter } from "vue-router"
import { ElMessage } from "element-plus"
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
import { json } from "stream/consumers"
import { url } from "inspector"
import path from "path"
export default defineComponent({
  components: {
    Header,
    Swiper,
    SwiperSlide,
  },
  setup() {
    const router = useRouter()
    const imgUrl = ref()
    // /@fs/D:/khd/bigdata/test_files/icon_基本信息_1662448716087.png
    // http://localhost:3344/@fs/D:/khd/bigdata/test_files/icon_基本信息_1662448716087.png
    const staticUrl = ref()
    const tokenStr = ref()
    const navList = ref()
    // const backgroudImg = ref()
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
    const nextPage = (info: any) => {
      // return
      if (info.type == 0 && info.children.length != 0) {
        router.push({
          path: "/representative",
          query: {
            name: info.name,
            bgi: info.backgroundImage,
          },
        })
      } else if (info.type == 1 && info.children.length != 0) {
        router.push({
          path: "/representative",
          query: {
            name: info.name,
            bgi: info.backgroundImage,
          },
        })
      } else if (info.type == 6 && info.children.length != 0) {
        localStorage.setItem("fileData", JSON.stringify(info.children))
        router.push({
          path: "/videoList",
          query: {
            bgi: info.backgroundImage,
          },
        })
      } else if (info.type == 7 && info.children.length != 0) {
        localStorage.setItem("fileData", JSON.stringify(info.children))
        router.push({
          path: "/WorkSystem",
          query: {
            bgi: info.backgroundImage,
          },
        })
      } else if (info.type == 8 && info.children.length != 0) {
        const storage = require("electron-localStorage")
        // 加载地图网页
        let zipPath = info.children[0].url
        let path = storage.getItem("filePath")
        var admZip = require("adm-zip-iconv")
        console.log(path + "\\" + zipPath)
        var zip = new admZip(path + "\\" + zipPath, "GBK")
        // 解压文件
        zip.extractAllTo(path)
        let pageUrl = path + "\\index.html"
        router.push({
          path: "/infomation",
          query: {
            url: pageUrl,
          },
        })
      } else if (info.type == 9 && info.children.length != 0) {
        localStorage.setItem("fileData", JSON.stringify(info.children))
        router.push({
          path: "/videoList",
          query: {
            bgi: info.backgroundImage,
          },
        })
      } else {
        ElMessage({
          message: "该文件夹没有内容",
          type: "warning",
        })
      }
    }
    // 解压文件
    const zipHandle = () => {
      var admZip = require("adm-zip")
      // var zip = new admZip("@/static/testpage.zip")
      let path = "D:\\khd\\bigdata\\test_files"
      var zip = new admZip(path + "\\testpage.zip")
      zip.extractAllTo(path)
      // debugger
      var entry = zip.getEntry("index.html")
      // console.log("解压的文件===", entry)
    }
    // 监听websocket推送的更新文件
    const wsFun = () => {
      const storage = require("electron-localStorage")
      let token = localStorage.getItem("token")
      let version = storage.getItem("version")
      if (version == undefined || version == "") {
        version = 0
        console.log("初始化进度===", version)
      } else {
        // version = 1.71
        // storage.setItem("version", 1.71)
        console.log("历史下载进度===", version)
      }
      var ws = new WebSocket(
        "ws://192.168.1.116:9527/api/manager/display/websocket?version=" +
          version +
          "&Authorization=" +
          token
      )
      // ws.onerror = function () {}
      ws.onopen = function () {}
      ws.onmessage = function (e) {
        let files = JSON.parse(e.data)
        let fileList = JSON.stringify(files.fileList)
        let navList = JSON.stringify(files.nodeList)
        console.log(files)
        if (files.fileList.length == 0) {
          // 没有更新文件
          console.log("没有更新文件")
        } else {
          localStorage.setItem("bgi", JSON.stringify(files.homeBackgroundImage))
          const ipcRenderer = require("electron").ipcRenderer
          // 监听主进程过来的消息
          ipcRenderer.on("main-process-message", (_event, ...args) => {
            // console.log("接收主进程过来的消息===", ...args)
          })
          ipcRenderer.on("read-file", (_event, ...args) => {
            // console.log("文件信息", ...args)
          })
          // 向主进程发送消息，保存应用的下载文件
          ipcRenderer.send("down-file-list", fileList)
          // 向主进程发送消息，保存应用的目录
          ipcRenderer.send("save-data", navList)
        }
      }
    }
    onMounted(() => {
      const storage = require("electron-localStorage")
      let path = storage.getItem("filePath")
      let url = path + "\\"
      staticUrl.value = url.replace(/\\/g, "/")
      // 讲图片的根路径存下
      localStorage.setItem("imgSrc", url)
      let str = localStorage.getItem("bgi") as string
      imgUrl.value = path + "\\" + str.replace(/"/g, "")
      imgUrl.value = imgUrl.value.replace(/\\/g, "/")
      const ipcRenderer = require("electron").ipcRenderer
      // 监听主进程过来的消息..
      ipcRenderer.on("read-nav", (_event, data) => {
        // backgroudImg.value = "@/assets/img/main-bg.png"
        navList.value = JSON.parse(data)
      })
      ipcRenderer.send("get-nav", "getNav")
      // 监听ws推送的消息
      wsFun()
    })
    return {
      tokenStr,
      imgUrl,
      staticUrl,
      navList,
      // backgroudImg,
      autoplayOptions,
      onSwiper,
      onSlideChange,
      nextPage,
      zipHandle,
      wsFun,
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
.background-page {
  /* background: url(../assets/img/home-bgi.jpeg); */
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  position: fixed;
}
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
  width: 108px;
  height: 108px;
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
