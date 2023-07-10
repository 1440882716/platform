<template>
  <div class="bg-box" :style="{ backgroundImage: `url('${imgUrl}')` }">
    <!-- <div class="bg-box"> -->
    <Header></Header>
    <!-- 滑动组件 -->
    <div class="big-box" style="margin-top: 252px">
      <swiper
        class="swiper-box pointer"
        style="height: 363px"
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
          v-for="item in showData"
          @click="toDetail(item)"
          class="slide-item"
        >
          <div class="slide-box">
            <!-- <div class="text-center"> -->
            <!-- <div v-if="item.icon">
                <img class="npc-icon" src="../assets/img/npc-icon.png" alt="" />
              </div>
              <div v-else>
                <img
                  class="tab-item"
                  src="../assets/img/icon_基本信息.png"
                  alt=""
                />
              </div> -->
            <div class="font28 fff files-name">{{ item.name }}</div>
            <!-- </div> -->
          </div>
        </swiper-slide>
      </swiper>
      <div class="swiper-button-prev" style="color: #ffffff"></div>
      <div class="swiper-button-next" style="color: #ffffff"></div>
    </div>
    <!-- <Footer style="position: fixed; bottom: 0"></Footer> -->
    <div class="footer-box" style="position: fixed; bottom: 0">
      <div class="footer-icon flex-r">
        <img @click="toHome" src="../assets/img/home-icon.png" alt="" />
        <img @click="backPage" src="../assets/img/back-icon.png" alt="" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue"
import { useRouter, useRoute } from "vue-router"
import Header from "../components/header.vue"
import BreadCrumb from "../components/BreadCrumb.vue"
import Footer from "../components/footer.vue"
import { ElMessage } from "element-plus"
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
import { children } from "dom7"
export default defineComponent({
  components: {
    Header,
    BreadCrumb,
    Footer,
    Swiper,
    SwiperSlide,
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const allData = ref()
    const parentData = ref()
    const showData = ref()
    const imgUrl = ref()
    const filesNum = ref()
    const toDetail = (info: any) => {
      // type用来判断文件夹的类型children的长度！=0说明下级页面有内容
      // type==0 普通文件夹
      // type==1 人员信息文件夹
      // type==2 人员数据
      // type==3 网页文件  比如地图
      // type==4 图片 （目前没有用到）
      // type==5 文本文档
      // type==6 视频文件
      // type==7 文档文件夹
      // type==8 网页文件夹
      // type==9 视频文件夹
      // console.log("文件类型===", info.type, info.name)
      // debugger
      let navArr = JSON.parse(localStorage.getItem("nav_arr") as string)
      navArr.push(info.name)
      localStorage.setItem("nav_arr", JSON.stringify(navArr))

      if (info.type == 0 || (info.type == 7 && info.children.length != 0)) {
        if (info.children.length === 1) {
          router.push({
            path: "/files",
            query: {
              pdfUrl: info.children[0].url,
            },
          })
        } else {
          // 更换当前页面数据，没有跳转
          localStorage.setItem("nav_page_data", JSON.stringify(info.children))
          // 重置父级uid
          parentData.value = showData.value
          showData.value = info.children
          currentUid.value = localStorage.getItem("current_uid") as string
          localStorage.setItem("parent_uid", currentUid.value) //点击下一级后，当前目录就变成下级目录的父级
          localStorage.setItem("current_uid", info.uid) //保存当前点击的目录uid
          localStorage.setItem("back-data", JSON.stringify(showData.value))
        }
      } else if (info.type == 1 && info.children.length != 0) {
        parentData.value = showData.value
        showData.value = info.children
        localStorage.setItem("npcinfo", JSON.stringify(info.children))
        router.push({
          path: "/npcInfo",
          query: {
            bgi: info.backgroundImage,
          },
        })
      } else if (info.type == 5) {
        router.push({
          path: "/files",
          query: {
            pdfUrl: info.url,
          },
        })
      } else if (
        info.type == 7 &&
        info.children.length != 0 &&
        info.name != "代表履职风采"
      ) {
      } else if (
        info.type == 7 &&
        info.children.length != 0 &&
        info.name == "代表履职风采"
      ) {
        // 更换当前页面数据，没有跳转
        parentData.value = showData.value
        showData.value = info.children
        currentUid.value = localStorage.getItem("current_uid") as string
        localStorage.setItem("parent_uid", currentUid.value) //点击下一级后，当前目录就变成下级目录的父级
        localStorage.setItem("current_uid", info.uid) //保存当前点击的目录uid
      } else if (info.type == 8 && info.children.length != 0) {
        const storage = require("electron-localstorage")
        const Store = require("electron-store")
        const db = new Store()
        const ipcRenderer = require("electron").ipcRenderer
        // 加载地图网页
        let zipPath = info.children[0].url
        let path = db.get("userUid")
        var admZip = require("adm-zip-iconv")
        let pathNameArr = zipPath.split(".")
        let pathName = pathNameArr[0]
        var zip = new admZip("D:\\" + path + "\\" + zipPath, "GBK")
        // 解压文件
        // 创建属于这个压缩包的文件夹
        db.set("zipFiles", pathName)
        ipcRenderer.send("create-zipFile", "getVersion")
        ipcRenderer.on("has-file", (_event, data) => {
          let hasFiles = JSON.parse(data)
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
            zip.extractAllTo(path + "\\" + pathName, true)
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
        parentData.value = showData.value
        showData.value = info.children
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

    // 递归遍历目录取父级目录
    //data 全目录
    //uid 当前目录
    let parentNav: any = []
    const dataList = (data: any[], uid: string) => {
      let arr: any = data
      data.map((item: any) => {
        if (uid === item.uid) {
          parentNav = arr
          localStorage.setItem("parent_uid", item.parentUid)
          localStorage.setItem("current_node", JSON.stringify(item))
        } else {
          if (item.children) {
            dataList(item.children, uid)
          }
        }
      })
    }
    // 递归取子级目录
    let currentNav: any = []
    const childrenList = (data: any[], uid: string) => {
      data.map((item: any) => {
        if (uid === item.uid) {
          currentNav = item.children
        } else {
          if (item.children) {
            childrenList(item.children, uid)
          }
        }
      })
    }
    const currentUid = ref()
    const parentUid = ref()
    let homeUid = localStorage.getItem("first_uid") as string
    parentUid.value = localStorage.getItem("parent_uid") as string
    currentUid.value = localStorage.getItem("current_uid") as string
    onMounted(() => {
      const storage = require("electron-localstorage")
      const Store = require("electron-store")
      const db = new Store()
      let path = db.get("filePath")
      let url = path + "\\"
      url = url.replace(/\\/g, "/")
      let bgImg = url + route.query.bgi
      imgUrl.value = bgImg
      let navData = localStorage.getItem("navData") as string
      let navDataArr = JSON.parse(navData) as any[]
      let parentUid = localStorage.getItem("parent_uid") as string
      let currentUid = localStorage.getItem("current_uid") as string
      dataList(navDataArr, currentUid)
      childrenList(navDataArr, currentUid)
      showData.value = currentNav
    })

    const toHome = () => {
      let str = localStorage.getItem("bgi") as string
      router.push({
        path: "/",
        query: {
          bgi: str,
        },
      })
    }
    const backPage = () => {
      let navData = localStorage.getItem("navData") as string
      let navDataArr = JSON.parse(navData) as any[]
      let parentUid = localStorage.getItem("parent_uid") as string
      let currentUid = parentUid
      localStorage.setItem("current_uid", currentUid)
      // 上级目录的uid 在这里需要判断是不是回到首页，如果不是回到首页则需要替换当前页面的数据
      if (parentUid === homeUid) {
        toHome()
      }
      // 遍历目录找到要返回的父级目录
      dataList(navDataArr, currentUid)
      childrenList(navDataArr, currentUid)
      showData.value = currentNav
    }
    const onSwiper = (swiper: any) => {}
    const onSlideChange = () => {}
    return {
      allData,
      parentData,
      showData,
      imgUrl,
      filesNum,
      toDetail,
      toHome,
      backPage,
      onSwiper,
      onSlideChange,
      // nextPage,
      // wsFun,
      // update,
      // creenSaver, //屏保
      // hideBanner,
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
.bg-box {
  /* background: url(../assets/img/file-bgi.png); */
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  position: fixed;
}
.active-box {
  min-width: 706px;
  /* width: 1109px; */
  margin: 0 50px;
  margin-top: 275px;
  /* background-color: burlywood; */
  white-space: nowrap;
  overflow-x: auto;
}
.active-item {
  width: 303px;
  height: 278px;
  background-image: url(../assets/img/active-bg.png);
  /* opacity: 0.63; */
  /* background: #eb3737; */
  border-radius: 0px 0px 40px 0px;
  box-shadow: 0px 3px 6px 0px rgba(84, 4, 4, 0.33);
  margin: 0 auto;
  margin: 0;
}

.npc-icon {
  margin-top: 50px;
}

.name-p {
  padding-left: 30px;
  padding-right: 20px;
}
/* ======================swiper组件样式 */
.big-box {
  width: auto;
  /* background-color: thistle; */
  align-items: center;
}
.swiper-box {
  margin: 0 auto;
  /* background-color: wheat; */
  display: flex;
  align-items: center;
}
.slide-item {
  width: 106px;
  height: 363px;
  flex: 1;
  /* background-color: tomato; */
  display: flex;
  align-items: center;
}
.slide-box {
  width: 200px;
  /* padding-top: 10px; */
  /* height: 306px; */

  text-align: center;
  flex: 1;
  /* background-color: antiquewhite; */
  /* background: url(../assets/img/active-bg.png) center center no-repeat; */
}

.files-name {
  margin: 0 auto;
  padding-top: 40px;
  /* padding-bottom: 40px; */
  /* margin-left: 32px; */
  width: 106px;
  height: 340px;
  text-align: center;
  writing-mode: vertical-lr;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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

/* ==================底部 */
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
  z-index: 99;
}
.footer-fixed {
  width: 100%;
  position: fixed;
  bottom: 0;
  text-align: center;
  display: flex;
  align-items: center;
}
.footer-box {
  width: 100%;
  height: 76px;
  position: relative;
  background-image: url(../assets/img/footer.png);
}
.footer-icon {
  position: absolute;
  height: 140px;
  top: -57px;
  left: 50%;
  margin-left: -140px;
}
</style>
