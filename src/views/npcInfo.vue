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

  <!-- 列表展示 -->
  <div class="list-box" v-if="activeName == '2'">
    <!-- 成果展示 -->
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
        v-for="item in resultList"
        class="swiper-slide-box"
        style="height: 45%"
        @click="toDetail"
      >
        <div class="result-item flex-c">
          <img class="npc-img" src="../assets/img/npc.png" alt="" />
          <!-- <span class="title-color m-t-16">{{ item.title }}</span> -->
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
import { useRouter } from "vue-router"
import type { TabsPaneContext } from "element-plus"
import Header from "../components/header.vue"
import Footer from "../components/footer.vue"
import { InitData } from "../types/representative"
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
    // const titleFlag = ref(1)
    const activeName = ref("1")
    const handleClick = (tab: TabsPaneContext, event: Event) => {
      console.log(activeName.value)
    }
    const onSwiper = (swiper: any) => {
      // console.log(swiper);
    }
    const onSlideChange = () => {
      // console.log('slide change');
    }
    const toDetail = () => {
      router.push({
        path: "/npcDetail",
        query: {
          // goodsId: id,
        },
      })
    }
    onMounted(() => {
      // document.body.style.setProperty("--el-color-primary", "#F31A1A")
    })
    return {
      ...toRefs(data),
      activeName,
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
  width: 380px;
  height: 270px;
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
