<template>
  <Header></Header>
  <div>
    <iframe
      :src="pageUrl"
      scrolling="auto"
      frameborder="0"
      class="iframe-box"
      style="width: 100%"
    ></iframe>
  </div>
  <Footer style="position: fixed; bottom: 0"></Footer>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue"
import { useRoute } from "vue-router"
import Header from "../components/header.vue"
import Footer from "../components/footer.vue"
import { ElMessageBox } from "element-plus"
export default defineComponent({
  components: {
    Header,
    Footer,
  },
  setup() {
    const route = useRoute()
    const dialogVisible = ref(false)
    const pageUrl = ref()
    const toDetail = () => {}
    // 解压zip文件
    const zipHandle = () => {
      var admZip = require("adm-zip")
      var zip = new admZip("d:/test.zip")
    }

    onMounted(() => {
      pageUrl.value = route.query.url
      console.log("网页文件地址===", pageUrl)

      // let pageData = localStorage.getItem("mapData") as string
      // let page = JSON.parse(pageData)
      // let zipPath = page[0].url
      // let path = "D:\\khd\\bigdata\\test_files"
      // var admZip = require("adm-zip")
      // // console.log(path + "\\" + zipPath)
      // var zip = new admZip(path + "\\" + zipPath)
      // zip.extractAllTo(path)
    })
    return {
      dialogVisible,
      pageUrl,
      toDetail,
      zipHandle,
    }
  },
})
</script>
<style scoped>
@import "../assets/glob.css";
.iframe-box {
  min-height: 1100px;
}
.info-box {
  width: 1138px;
  height: 678px;
  margin-top: 24px;
  margin-left: 24px;
  padding: 32px;
  background-color: #fff;
  border-radius: 16px;
}
.centent-box {
  width: 48%;
}
.title-img {
  width: 336px;
  height: 48px;
  line-height: 54px;
  background: url(../assets/img/info-icon.png) center center no-repeat;
  text-align: center;
}
.npc-img {
  width: 124px;
  height: 154px;
  border-radius: 8px;
  margin-right: 20px;
}
.title-box {
  width: 72px;
  height: 27px;
}
.position {
  width: calc(100% - 86px);
}
.map-img {
  width: 523px;
  height: 738px;
  margin-top: 24px;
  margin-right: 77px;
}
/* 弹框 */
.dialog-box {
  width: 100%;
  height: 600px;
  background: url(../assets/img/map-pop2.png) center center no-repeat;
}
.map-item {
  width: 401px;
  height: 525px;
}
.map-content {
  width: 50%;
  padding: 0 50px;
}
.map-content-npc {
  width: 120px;
  margin-right: 60px;
}
</style>
