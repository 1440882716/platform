<template>
  <div class="bg-box" :style="{ backgroundImage: `url(${imgUrl})` }">
    <Header></Header>
    <div class="turn-container">
      <!-- src="D:/pdf-page/entry.html" -->
      <iframe
        id="mainIframe"
        ref="iframeRef"
        name="iframeRef"
        src="D:/pdf-page/entry.html"
        scrolling="auto"
        frameborder="0"
        style="width: 100%; height: 900px"
      ></iframe>
    </div>
    <Footer style="position: fixed; bottom: 0"></Footer>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, nextTick, onMounted } from "vue"
import { useRoute } from "vue-router"
import Header from "../components/header.vue"
import Footer from "../components/footer.vue"
const $ = require("jquery")
export default defineComponent({
  components: {
    Header,
    Footer,
  },
  setup() {
    const route = useRoute()
    const mainIframe = ref(null)
    const currentPage = ref(1)
    const imgUrl = ref()
    let iframeRef = ref<any>(null) // 和iframe标签的ref绑定
    let iframeWindow: any = null //iframe的window对象
    onMounted(() => {
      const storage = require("electron-localstorage")
      let path = storage.getItem("filePath")
      let url = path + "\\"
      url = url.replace(/\\/g, "/")
      let bgImg = url + route.query.bgi
      imgUrl.value = bgImg
      let pdfUrl = route.query.pdfUrl
      let fileUrl = url.replace(/\//g, "\\\\") + pdfUrl
      console.log(fileUrl)
      iframeWindow = iframeRef.value.contentWindow
      setTimeout(() => {
        iframeWindow.postMessage(fileUrl, "*")
      }, 1000)
    })
    return {
      currentPage,
      mainIframe,
      imgUrl,
      iframeRef,
      iframeWindow,
    }
  },
})
</script>
<style scoped>
#flipbook {
  margin: 0 auto;
}
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
