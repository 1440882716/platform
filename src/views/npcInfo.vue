<template>
  <div class="bg-box" :style="{ backgroundImage: `url(${imgUrl})` }">
    <Header></Header>
    <div>
      <div class="flex-r font24 tab">
        <el-tabs
          v-model="activeName"
          class="demo-tabs font24"
          @tab-click="handleClick"
        >
          <el-tab-pane label="默认展示" name="1"></el-tab-pane>
          <el-tab-pane label="列表展示" name="2"></el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <!-- 默认展示 -->
    <!-- <el-carousel
      indicator-position="outside"
      :autoplay="false"
      v-if="activeName == '1'"
    >
      <el-carousel-item
        style="height: 800px"
        v-for="(info, k) in rotateNpc"
        :key="k"
      >
        <div class="box">
          <div class="box1">
            <div
              v-for="(item, index) in info"
              :class="[
                index == 0 ? 'one' : '',
                index == 1 ? 'two' : '',
                index == 2 ? 'three' : '',
                index == 3 ? 'four' : '',
                index == 4 ? 'five' : '',
                index == 5 ? 'six' : '',
                index == 6 ? 'seven' : '',
                index == 7 ? 'eight' : '',
              ]"
              @click="toDetail(item)"
            >
              <div class="npc-img flex-r">
                <img
                  class="npc-photo-test"
                  src="../assets/img/peopel.png"
                  alt=""
                />
                <div class="flex-c m-l-16 text-left test-right-text">
                  <p class="font38">{{ item.npcMember.name }}</p>
                  <p class="font20 m-t-20">{{ item.npcMember.introduction }}</p>
                  <p class="font18 m-t-56">{{ item.npcMember.mobile }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel> -->
    <!-- src="src/static/npc-page/index.html" -->
    <iframe
      v-if="activeName == '1'"
      id="mainIframe"
      ref="iframeRef"
      name="iframeRef"
      :src="'D:/npc-page/index.html?time=' + new Date().getTime()"
      scrolling="auto"
      frameborder="0"
      style="width: 80%; height: 600px"
    ></iframe>

    <!-- 列表展示 -->
    <div class="list-box" v-if="activeName == '2'">
      <swiper
        class="swiper-box"
        style="width: 1680px; height: 700px"
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
          v-for="item in dataInfo"
          class="swiper-slide-box"
          style="height: 45%"
          @click="toDetail(item)"
        >
          <div class="result-item flex-c">
            <div class="npc-img flex-r">
              <img
                class="npc-photo"
                :src="staticUrl + item.npcMember.avatar"
                alt=""
              />
              <div class="flex-c m-l-16 text-left">
                <p class="font38">{{ item.npcMember.name }}</p>
                <p class="font20 m-t-20 three-line-text npc-des-box">
                  {{ item.npcMember.introduction }}
                </p>
                <!-- <p class="font20 m-t-20 three-line-text">
                  四川天味食品集团股份有限公司四川天味食品集团股份有限公司四川天味食品集团股份有限公司
                </p> -->
                <p class="font18 m-t-56">{{ item.npcMember.mobile }}</p>
              </div>
            </div>
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
import { defineComponent, ref, reactive, toRefs, onMounted } from "vue"
import { useRouter, useRoute } from "vue-router"
import type { TabsPaneContext } from "element-plus"
import Header from "../components/header.vue"
import Footer from "../components/footer.vue"
import { InitData } from "../types/representative"
import { Navigation, Pagination, Autoplay, Grid } from "swiper"
import { Swiper, SwiperSlide } from "swiper/vue"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/grid"
const $ = require("jquery")
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
    const staticUrl = ref() //本地路径地址
    const route = useRoute()
    const imgUrl = ref()
    const currentPage = ref()
    const activeName = ref("1")
    const npsData = ref()
    const dataInfo = ref()
    const rotateNpc = ref()
    const activeClass = ref()
    let iframeRef = ref<any>(null) // 和iframe标签的ref绑定
    let iframeWindow: any = null //iframe的window对象

    const onSwiper = (swiper: any) => {}
    const onSlideChange = () => {}
    const toDetail = (info: any) => {
      if (
        info.type == 2 &&
        info.npcMember.name != "" &&
        info.npcMember.name != undefined
      ) {
        localStorage.setItem("npcDetail", JSON.stringify(info.npcMember))
        let npcdata = JSON.stringify(info.npcMember)
        router.push({
          path: "/npcDetail",
          query: {
            npcType: activeName.value,
          },
        })
      }
    }
    const changePage = (val: any) => {}

    // 处理人员数组==>二维数组
    const handleArr = (array: any, size: number) => {
      const length = array.length
      if (!length || !size || size < 1) {
        return []
      }
      let index = 0 //用来表示切割元素的范围start
      let resIndex = 0 //用来递增表示输出数组的下标
      let result = new Array(Math.ceil(length / size))
      //进行循环
      while (index < length) {
        result[resIndex++] = array.slice(index, (index += size))
      }
      return result
    }
    const handleClick = (tab: TabsPaneContext, event: Event) => {
      console.log(activeName.value)
      console.log(tab.props.name)
      let type = tab.props.name?.toString()
      console.log(type)

      if (type) localStorage.setItem("npcType", type)
      if (activeName.value == "2") {
        // 刷新是为了加载npc-page页面
        window.location.reload()
      } else {
      }
    }

    onMounted(() => {
      let npcType = localStorage.getItem("npcType") as string
      if (npcType) {
        console.log("缓存的类型值是===", npcType)
        activeName.value = npcType
        npsData.value = localStorage.getItem("npcinfo") as string
        dataInfo.value = JSON.parse(npsData.value)
      }
      // else {
      console.log("初始值==", activeName.value)
      npsData.value = localStorage.getItem("npcinfo") as string
      dataInfo.value = JSON.parse(npsData.value)
      // const storage = require("electron-localstorage")

      const Store = require("electron-store")
      const db = new Store()
      let path = db.get("filePath")
      let url = path + "\\"
      // let path = storage.getItem("filePath")
      // let url = path + "\\"
      url = url.replace(/\\/g, "/")
      staticUrl.value = url
      let bgImg = url + route.query.bgi
      imgUrl.value = bgImg
      rotateNpc.value = handleArr(dataInfo.value, 8)
      // 代表信息和代表图片的地址头
      let npcObj = {
        imgSrc: staticUrl.value,
        data: npsData.value,
      }
      // 向iframe嵌套的页面传值
      iframeWindow = iframeRef.value.contentWindow
      setTimeout(() => {
        iframeWindow.postMessage(npcObj, "*")
      }, 1000)
      // 接收iframe传递过来的uid
      window.addEventListener("message", (e) => {
        for (let i = 0; i < dataInfo.value.length; i++) {
          if (e.data == dataInfo.value[i].npcMember.uid) {
            toDetail(dataInfo.value[i])
          }
        }
      })
      // }
    })
    return {
      ...toRefs(data),
      currentPage,
      staticUrl,
      imgUrl,
      activeName,
      dataInfo,
      rotateNpc,
      activeClass,
      iframeRef,
      iframeWindow,
      npsData,
      handleClick,
      onSwiper,
      onSlideChange,
      toDetail,
      handleArr,
      changePage,
      modules: [Navigation, Pagination, Autoplay, Grid],
    }
  },
})
</script>
<style scoped>
@import "../assets/glob.css";
.tab {
  width: 15%;
  margin: 0 auto;
  margin-top: 53px;
  display: flex;
  align-items: center;
  /* background-color: cadetblue; */
}
.tab-box {
  width: 96px;
  /* height: 40px; */
  flex: 1;
  /* background-color: burlywood; */
}
.list-box {
  margin-top: 60px;
  /* background-color: cadetblue; */
}
.result-item {
  text-align: center;
  margin-left: 18px;
  margin-right: 18px;
  /* background-color: cadetblue; */
}
.npc-img {
  width: 348px;
  height: 230px;
  padding: 20px 16px;
  background-color: #fff;
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
.npc-photo {
  width: 168px;
  height: 230px;
  /* background-color: aquamarine; */
  /* margin-left: 15px; */
}

/* ==================================================================旋转名片 */
/* * {
  margin: 0;
  padding: 0;
}


body {
  background: url(../image/7.jpg) no-repeat;
  background-size: 100%;
} */
.el-carousel__container {
  height: 600px !important;
}
.el-carousel__indicators--outside {
  margin-top: 100px !important;
}
/* .el-carousel__indicators {
  margin-top: 200px !important;
} */

.box {
  position: relative;
  width: 380px;
  height: 400px;
  margin: 100px auto;
  transform-style: preserve-3d;
  /* transform: rotate(30deg); */
  /* animation: move 8s linear infinite; */
}

.box1 {
  position: relative;
  width: 380px;
  height: 400px;
  transform-style: preserve-3d;
  animation: run 18s linear infinite;
}

.box div {
  position: absolute;
  /* width: 400px;
  height: 400px; */
}

.box div img {
  width: 380px;
  height: 270px;
}
.npc-des-box {
  height: 80px;
  /* background-color: cadetblue; */
}

.one {
  transform: translateZ(400px) rotateY(0deg);
}

.two {
  transform: translateZ(200px) translateX(400px) rotateY(45deg);
}

.three {
  transform: translateZ(200px) translateX(-400px) rotateY(-45deg);
}

.four {
  transform: translateZ(-200px) translateX(400px) rotateY(90deg);
}

.five {
  transform: translateZ(-200px) translateX(-400px) rotateY(-90deg);
}
.six {
  transform: translateZ(-400px) translateX(400px) rotateY(135deg);
  /* transform: rotateY(180deg); */
}
.seven {
  transform: translateZ(-400px) translateX(-400px) rotateY(-135deg);
  /* transform: rotateY(180deg); */
}
.eight {
  transform: translateZ(-400px) rotateY(180deg);
  /* transform: rotateY(180deg); */
}

@keyframes move {
  /* 0% {
    transform: rotateX(30deg);
  }
  50% {
    transform: rotateX(-30deg);
  }
  100% {
    transform: rotateX(30deg);
  } */
}

@keyframes run {
  100% {
    transform: rotateY(-360deg);
  }
}

.box:hover {
  animation-play-state: paused;
}

.box:hover .box1 {
  animation-play-state: paused;
}

/* ==============================================第二版 */
.npc-img .npc-photo-test {
  width: 168px;
  height: 230px;
}
.test-right-text {
  /* width: calc(100% - 200px); */
  margin-left: 180px;
}
.el-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
}
/* .tab-box {
  width: 230px;
  height: 40px;
  margin: 0 auto;
  margin-top: 24px;
}
.slide-bar {
  width: 94px;
  height: 2px;
  background-color: #f31a1a;
  margin-top: 10px;
}
.left-side {
  animation: mymove 1s infinite;
}
@keyframes mymove {
  from {
    left: 837px;
  }
  to {
    left: 967px;
  }
}
@-webkit-keyframes mymove  {
  from {
    left: 837px;
  }
  to {
    left: 967px;
  }
} */
</style>
