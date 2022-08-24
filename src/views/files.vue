<template>
  <Header></Header>
  <div class="turn-container">
    <div class="turn-banner">
      <div class="turn-content">
        <div id="flipbook">
          <!-- <el-image
            v-for="(item, index) in imgList"
            :key="index"
            fit="fill"
            :src="item.url"
            alt=""
            srcset=""
          /> -->
          <!-- <image class="" src="../assets/img/test1.png" > -->
          <img src="../assets/img/test1.png" alt="" />
          <img src="../assets/img/test2.png" alt="" />
          <img src="../assets/img/test3.png" alt="" />
        </div>
      </div>
    </div>
  </div>
  <Footer style="position: fixed; bottom: 0"></Footer>
</template>
<script lang="ts">
import { defineComponent, ref, nextTick, onMounted } from "vue"
import Header from "../components/header.vue"
import Footer from "../components/footer.vue"
import turn from "../utils/turn.js"
// import turn = require("../utils/turn.js")
const $ = require("jquery")
export default defineComponent({
  components: {
    Header,
    Footer,
  },
  setup() {
    // const turn: any = require("../utils/turn.js")
    // const $: any = require("@/jquery")
    const currentPage = ref(1)
    const imgList = ref([{ url: "./assets/fsc/turn-img/1.jpg" }])
    const onTurn = () => {
      nextTick(() => {
        console.log($("#flipbook"))
        console.log(turn)
        $("#flipbook").turn({
          autoCenter: true,
          height: 646, //高度
          width: 996, //宽度
          display: "double", //单页显示/双页显示  single/double
          elevation: 50,
          duration: 500, //翻页速度(毫秒), 默认600ms
          gradients: true, //翻页时的阴影渐变, 默认true
          autoCenter: true, //自动居中, 默认false
          acceleration: true, //硬件加速, 默认true, 如果是触摸设备设置为true
          page: 1, //设置当前显示第几页
          //   pages: imgList.value.length, //总页数
          pages: 3,
          when: {
            //监听事件
            turning: function (e: any, page: number, view: any) {
              console.log(e, page, view)
              // 翻页前触发
            },
            turned: function (e: any, page: number) {
              console.log(e, page)
              currentPage.value = page
              // 翻页后触发
            },
          },
        })
      })
    }

    const toPage = (i: number) => {
      currentPage.value = i + 1
      $("#flipbook").turn("page", currentPage.value) //进度条跳转到对应的页数
    }
    onMounted(() => {
      onTurn()
    })
    return {
      currentPage,
      imgList,
      onTurn,
      toPage,
    }
  },
})
</script>
<style scoped>
.turn-banner {
  width: 60vw;
  height: 30vh;
}
.turn-content {
  display: flex;
  margin: 0px auto;
  overflow: hidden;
}
.slider-bar {
  width: 900px;
  height: 8px;
  border-radius: 5px;
  background-color: #ccc;
  margin-top: 15px;
  display: flex;
  overflow: hidden;
}
.slider {
  flex: 1;
  cursor: pointer;
}
.slider-current {
  background-color: #666;
  border-radius: 5px;
}
</style>
