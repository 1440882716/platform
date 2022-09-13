<template>
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
  <!-- 第一版 -->
  <div class="box" v-if="activeName == '1'">
    <!-- <div class="stage"> -->
    <!-- <div class="container"> -->
    <div class="flex-r">
      <div class="result-item" v-for="(item, index) in dataInfo">
        <div :class="['npc-img', 'flex-r', activeClass + index]">
          <img class="npc-photo" src="../assets/img/peopel.png" alt="" />
          <div class="flex-c m-l-16 text-left">
            <p class="font38">{{ item.npcMember.name }}</p>
            <p class="font20 m-t-20">{{ item.npcMember.introduction }}</p>
            <p class="font18 m-t-56">{{ item.npcMember.mobile }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- </div> -->
    <!-- </div> -->

    <!-- <div class="box1">
      <div class="one" @click="toDetail">
        <img src="../assets/img/npc.png" />
      </div>
      <div class="two" @click="toDetail">
        <img src="../assets/img/npc.png" />
      </div>
      <div class="three" @click="toDetail">
        <img src="../assets/img/npc.png" />
      </div>
      <div class="four" @click="toDetail">
        <img src="../assets/img/npc.png" />
      </div>
      <div class="five" @click="toDetail">
        <img src="../assets/img/npc.png" />
      </div>
      <div class="six" @click="toDetail">
        <img src="../assets/img/npc.png" />
      </div>
      <div class="seven" @click="toDetail">
        <img src="../assets/img/npc.png" />
      </div>
    </div> -->
  </div>
  <!-- 第二版 -->

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
            <img class="npc-photo" src="../assets/img/peopel.png" alt="" />
            <div class="flex-c m-l-16 text-left">
              <p class="font38">{{ item.npcMember.name }}</p>
              <p class="font20 m-t-20">{{ item.npcMember.introduction }}</p>
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
    const route = useRoute()
    // const titleFlag = ref(1)
    const activeName = ref("1")
    const dataInfo = ref()
    const activeClass = ref()
    const handleClick = (tab: TabsPaneContext, event: Event) => {
      console.log(activeName.value)
    }
    const onSwiper = (swiper: any) => {
      // console.log(swiper);
    }
    const onSlideChange = () => {
      // console.log('slide change');
    }
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
            // npcInfo: npcdata,
          },
        })
      }
    }
    onMounted(() => {
      let npsData = localStorage.getItem("npcinfo") as string
      dataInfo.value = JSON.parse(npsData)
      let bgistr = route.query.bgi
      console.log("背景图片==", bgistr)
      // 默认图片旋转
      var imgL = dataInfo.value.length
      var deg = 360 / imgL
      var roY = 0,
        roX = -10
      var xN = 0,
        yN = 0
      var play = null
      $(".result-item").each(function (i: any) {
        console.log(i)

        //   //     $(this).css({
        //   // //translateZ 定义2d旋转沿着z轴
        // "transform": "rotateY(" + i * deg + "deg) translateZ(530px)"
        //   //     });
        //   // //防止图片被拖拽
        //   //     $(this).attr('ondragstart', 'return false');
      })
    })
    return {
      ...toRefs(data),
      activeName,
      dataInfo,
      activeClass,
      handleClick,
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
  /* margin-left: 15px; */
}

/* ==================================================================第一版3d照片墙 */
/* * {
  margin: 0;
  padding: 0;
}


body {
  background: url(../image/7.jpg) no-repeat;
  background-size: 100%;
} */

/* .box {
  position: relative;
  width: 400px;
  height: 400px;
  margin: 100px auto;
  transform-style: preserve-3d;
  transform: rotate(30deg);
  animation: move 8s linear infinite;
}

.box1 {
  position: relative;
  width: 400px;
  height: 400px;
  transform-style: preserve-3d;
  animation: run 15s linear infinite;
}

.box div {
  position: absolute;
  width: 400px;
  height: 400px;
}

.box div img {
  width: 380px;
  height: 270px;
}


.one {
  transform: translateZ(400px);
}

.two {
  transform: translateZ(200px) translateX(400px) rotateY(60deg);
}

.three {
  transform: translateZ(200px) translateX(-400px) rotateY(-60deg);
}

.four {
  transform: translateZ(-200px) translateX(400px) rotateY(-60deg);
}

.five {
  transform: translateZ(-200px) translateX(-400px) rotateY(60deg);
}
.six {
  transform: translateZ(-200px) translateX(-400px) rotateY(60deg);
}

.seven {
  transform: translateZ(-400px);
}


@keyframes move {
  0% {
    transform: rotateX(30deg);
  }
  50% {
    transform: rotateX(-30deg);
  }
  100% {
    transform: rotateX(30deg);
  }
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
} */

/* ==============================================第二版 */
</style>
