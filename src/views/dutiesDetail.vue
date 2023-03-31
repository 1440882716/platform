<template>
  <Header></Header>
  <div class="content">
    <div class="duty-box">
      <div class="flex-r flex-start text-left title-color font28">
        <img class="arrow-icon" src="../assets/img/arrow.png" alt="" />
        <div class="duty-title">履职标题:</div>
        <span>{{ dutyData.title }}</span>
      </div>
      <div class="flex-r flex-start text-left title-color font28 m-t-28">
        <img class="arrow-icon" src="../assets/img/arrow.png" alt="" />
        <div class="duty-title">履职类型:</div>
        <span>{{ dutyData.typeName }}</span>
      </div>
      <div class="flex-r flex-start text-left title-color font28 m-t-28">
        <img class="arrow-icon" src="../assets/img/arrow.png" alt="" />
        <div class="duty-title">履职人:</div>
        <span>{{ name }}</span>
      </div>
      <div class="flex-r flex-start text-left title-color font28 m-t-28">
        <img class="arrow-icon" src="../assets/img/arrow.png" alt="" />
        <div class="duty-title">履职时间:</div>
        <span>{{ dutyData.workAt }}</span>
      </div>
      <div class="flex-r flex-start text-left title-color font28 m-t-28">
        <img class="arrow-icon" src="../assets/img/arrow.png" alt="" />
        <div class="duty-title">履职标题:</div>
        <span>{{ dutyData.title }}</span>
      </div>
      <div class="flex-r flex-start text-left title-color font28 m-t-28">
        <img class="arrow-icon" src="../assets/img/arrow.png" alt="" />
        <div class="duty-title-content">履职内容:</div>
        <div class="content-duty">
          {{ dutyData.content }}
          <div class="flex-r" v-if="dutyData.images.length != 0">
            <!-- <img
              v-for="item in dutyData.images"
              :src="'https://www.yarenda.cn' + item"
            /> -->
            <el-image
              class="duty-img"
              v-for="item in dutyData.images"
              v-if="imgFlag"
              :src="'https://www.yarenda.cn' + item"
              :preview-src-list="bigImgList"
              @error="imgError"
              @load="imgSuccess"
              alt="图片加载失败"
            ></el-image>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer style="position: fixed; bottom: 0"></Footer>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, ref } from "vue"
import { useRouter, useRoute } from "vue-router"
import Header from "../components/header.vue"
import Footer from "../components/footer.vue"
import { InitData } from "../types/representative"
export default defineComponent({
  components: {
    Header,
    Footer,
  },
  setup() {
    const data = reactive(new InitData())
    const route = useRoute()
    const name = ref()
    const staticUrl = ref()
    const bigImgList = ref()
    onMounted(() => {
      const storage = require("electron-localstorage")
      let path = storage.getItem("filePath")
      let url = path + "\\"
      staticUrl.value = url.replace(/\\/g, "/")
      let npsData = localStorage.getItem("dutyDetail") as string
      name.value = route.query.name
      data.dutyData = JSON.parse(npsData)
      let img_arr = data.dutyData.images
      bigImgList.value = img_arr.map((item) => {
        return "https://www.yarenda.cn" + item
      })
      // console.log(a)

      // bigImgList.value = data.dutyData.images
    })
    const imgFlag = ref(true)
    const imgError = (e: Error) => {
      imgFlag.value = false
    }
    const imgSuccess = (e: Event) => {
      imgFlag.value = true
    }
    return {
      ...toRefs(data),
      imgFlag,
      name,
      staticUrl,
      bigImgList,
      imgError,
      imgSuccess,
    }
  },
})
</script>
<style scoped>
@import "../assets/glob.css";
.content {
  margin-top: 24px;
  padding: 0 42px;
}
.duty-box {
  background-color: #fff;
  padding-top: 32px;
  padding-left: 42px;
  padding-bottom: 154px;
}
.arrow-icon {
  width: 20px;
  height: 20px;
  text-align: left;
  margin-top: 8px;
  margin-right: 12px;
}
.duty-title {
  margin-right: 56px;
  width: 120px;
  height: 37px;
  line-height: 37px;
}
.duty-title-content {
  margin-right: 56px;
  width: 120px;
  /* height: 37px; */
  /* line-height: 37px; */
}
.content-duty {
  width: calc(100% - 220px);
}
.duty-img {
  width: 176px;
  height: 176px;
  margin-right: 16px;
  margin-top: 22px;
}
</style>
