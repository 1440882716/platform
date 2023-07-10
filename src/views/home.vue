<template>
  <div @click="creenSaver">
    <u-banner v-if="bannerShow" @click.native="hideBanner"></u-banner>
  </div>
  <div class="background-page" :style="{ backgroundImage: `url('${imgUrl}')` }">
    <!-- <div class="background-page"> -->
    <Header></Header>
    <!-- <div @click="update">刷新</div> -->
    <div style="margin-top: 252px">
      <swiper
        class="swiper-box pointer"
        style="width: 1688px; height: 363px"
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
        <swiper-slide
          class="swiper-slide-box"
          v-for="(item, index) in navList"
          @click="nextPage(item, index)"
        >
          <div class="slide-box">
            <div class="text-center">
              <!-- <div v-if="item.icon">
                <img class="tab-item" :src="staticUrl + item.icon" alt="" />
              </div>
              <div v-else>
                <img
                  class="tab-item"
                  src="../assets/img/icon_基本信息.png"
                  alt=""
                />
              </div> -->
              <div class="font28 fff files-name">{{ item.name }}</div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
      <div class="swiper-button-prev" style="color: #ffffff"></div>
      <div class="swiper-button-next" style="color: #ffffff"></div>
    </div>
    <!-- <Footer style="position: fixed; bottom: 0"></Footer> -->
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  getCurrentInstance,
  reactive,
} from "vue"
import { useRouter, useRoute } from "vue-router"
import { ElMessage } from "element-plus"
import Header from "../components/header.vue"
import Footer from "../components/footer.vue"
import Bannar from "../components/bannar.vue"
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
import { array, string } from "yargs"
import { json } from "stream/consumers"
import { url } from "inspector"
import path from "path"
export default defineComponent({
  components: {
    Header,
    Footer,
    Bannar,
    Swiper,
    SwiperSlide,
  },
  setup() {
    // const imgUrl = getCurrentInstance()
    const router = useRouter()
    const route = useRoute()
    const staticUrl = ref()
    const imgUrl = ref()

    const tokenStr = ref()
    const navList = ref()
    const bannerShow = ref(false)
    const autoplayOptions = {
      // delay: 2000,
      // disableOnInteraction: false,
      // loop: true,
      // pauseOnMouseEnter: true,
      // reverseDirection: true,
    }
    const state = reactive({
      time: 10, // 60s倒计时
      // timer: 0,
    })
    // 定时器对象
    let timer: NodeJS.Timer | null = null
    const onSwiper = (swiper: any) => {}
    const onSlideChange = () => {
      // console.log('slide change');
    }
    const creenSaver = () => {
      state.time = 0
    }
    // 设置定时器，展示屏保
    // 设置计时器方法
    const setTimer = () => {
      // clearTimeout(timer)
      timer = null
      timer = setTimeout(() => {
        if (state.time < 10) {
          state.time++
          console.log(state.time)
          setTimer()
        } else {
          bannerShow.value = true
          state.time = 0
        }
      }, 1000)
    }
    const hideBanner = () => {
      bannerShow.value = false
      state.time = 0
      setTimer()
    }
    const nextPage = (info: any, ind: number) => {
      //存首页的uid ===> first_uid
      localStorage.setItem("first_uid", info.parentUid)
      // 当前点击的uid
      localStorage.setItem("current_uid", info.uid)
      //父级uid
      localStorage.setItem("parent_uid", info.parentUid)

      // return
      let navArr = []
      navArr.push(info.name)
      localStorage.setItem("nav_arr", JSON.stringify(navArr))
      // return
      if (info.type == 0 || (info.type == 7 && info.children.length != 0)) {
        // debugger
        if (info.children.length === 1) {
          router.push({
            path: "/files",
            query: {
              pdfUrl: info.children[0].url,
            },
          })
        } else {
          localStorage.setItem("fileData", JSON.stringify(info.children))
          localStorage.setItem("nav_page_data", JSON.stringify(info.children))
          router.push({
            path: "/representative",
            query: {
              name: info.name,
              bgi: info.backgroundImage,
              num: ind,
            },
          })
        }
      } else if (info.type == 1 && info.children.length != 0) {
        // parentData.value = showData.value
        // showData.value = info.children
        localStorage.setItem("npcinfo", JSON.stringify(info.children))
        router.push({
          path: "/npcInfo",
          query: {
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
        // localStorage.setItem("fileData", JSON.stringify(info.children))
        // localStorage.setItem("nav_page_data", JSON.stringify(info.children))
        // router.push({
        //   path: "/WorkSystem",
        //   query: {
        //     bgi: info.backgroundImage,
        //   },
        // })
      } else if (info.type == 8 && info.children.length != 0) {
        const Store = require("electron-store")
        const db = new Store()
        const ipcRenderer = require("electron").ipcRenderer
        // 加载地图网页
        let zipPath = info.children[0].url
        // let path = storage.getItem("filePath")
        let path = db.get("userUid")
        var admZip = require("adm-zip-iconv")
        let pathNameArr = zipPath.split(".")
        let pathName = pathNameArr[0]
        console.log("解压路径====" + "D:\\" + path + "\\" + zipPath)
        var zip = new admZip("D:\\" + path + "\\" + zipPath, "GBK")
        // 解压文件
        // 创建属于这个压缩包的文件夹
        // storage.setItem("zipFiles", pathName)
        db.set("zipFiles", pathName)
        ipcRenderer.send("create-zipFile", "getVersion")
        ipcRenderer.on("has-file", (_event, data) => {
          let hasFiles = JSON.parse(data)
          // debugger
          if (hasFiles.status) {
            let pageUrl = "D:\\" + path + "\\" + pathName + "\\" + "index.html"
            router.push({
              path: "/infomation",
              query: {
                url: pageUrl,
                bgi: info.backgroundImage,
              },
            })
          } else {
            // 解压文件
            zip.extractAllTo("D:\\" + path + "\\" + pathName, true)
            let pageUrl = "D:\\" + path + "\\" + pathName + "\\" + "index.html"
            // 打开地图页面的iframe
            router.push({
              path: "/infomation",
              query: {
                url: pageUrl,
                bgi: info.backgroundImage,
              },
            })
          }
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

    // 监听websocket推送的更新文件
    const wsFun = () => {
      const storage = require("electron-localstorage")
      let token = localStorage.getItem("token")
      let version = storage.getItem("version")
      if (!version) {
        version = 0
      } else {
        version = 1.71
        // storage.setItem("version", 1.71)
      }
      var ws = new WebSocket(
        "ws://192.168.1.116:9527/api/manager/display/websocket?version=" +
          version +
          "&Authorization=" +
          token
      )
      ws.onopen = function () {}
      ws.onmessage = function (e) {
        let files = JSON.parse(e.data)
        let fileList = JSON.stringify(files.fileList)
        let navList = JSON.stringify(files.nodeList)
        if (files.fileList.length == 0) {
        } else {
          localStorage.setItem("bgi", JSON.stringify(files.homeBackgroundImage))
          const ipcRenderer = require("electron").ipcRenderer
          ipcRenderer.on("main-process-message", (_event, ...args) => {})
          ipcRenderer.on("read-file", (_event, ...args) => {})
          ipcRenderer.send("down-file-list", fileList)
          ipcRenderer.send("save-data", navList)
        }
      }
    }

    const update = () => {
      window.location.reload()
    }

    onMounted(() => {
      setTimer()
      const Store = require("electron-store")
      const db = new Store()
      let path = db.get("filePath")
      let url = path + "\\"

      staticUrl.value = url.replace(/\\/g, "/")

      const ipcRenderer = require("electron").ipcRenderer
      // 监听主进程过来的消息..
      ipcRenderer.on("read-nav", (_event, data) => {
        navList.value = JSON.parse(data)
        localStorage.setItem("navData", JSON.stringify(navList.value))
      })
      ipcRenderer.send("get-nav", "getNav")
      // 监听ws推送的消息
      // wsFun()
      let str = localStorage.getItem("bgi") as string
      imgUrl.value = path + "\\" + str.replace(/"/g, "")
      imgUrl.value = imgUrl.value.replace(/\\/g, "/")

      // 讲图片的根路径存下
      // localStorage.setItem("imgSrc", url)
    })
    return {
      tokenStr,
      staticUrl,
      imgUrl,
      navList,
      // backgroudImg,
      autoplayOptions,
      state,
      timer,
      bannerShow, //控制屏保显示
      onSwiper,
      onSlideChange,
      nextPage,
      wsFun,
      update,
      creenSaver, //屏保
      hideBanner,
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
  /* background: url(../assets/img/DSbgi.png); */
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  position: fixed;
}
.swiper-box {
  /* width: 1688px;
  height: 650px; */
}
.swiper-slide-box {
  width: 220px !important;
}
.slide-box {
  width: 329px;
  /* height: 306px; */
  text-align: center;

  /* background: url(../assets/img/active-bg.png) center center no-repeat; */
}
.files-name {
  margin: 0 auto;
  /* margin-left: 32px; */
  width: 106px;
  height: 363px;
  text-align: center;
  writing-mode: vertical-lr;
  padding-left: 62px;
  background: url(../assets/img/图标.png) center center no-repeat;
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
