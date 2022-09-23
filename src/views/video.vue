<template>
  <div>
    <Header></Header>
    <div style="margin-top: 200px">
      <video :src="videoUrl" width="800" height="440" controls autoplay></video>
    </div>

    <Footer class="footer-fixed"></Footer>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue"
import { useRoute } from "vue-router"
import Header from "../components/header.vue"
import Footer from "../components/footer.vue"
export default defineComponent({
  components: {
    Header,
    Footer,
  },
  setup() {
    const route = useRoute()
    const videoUrl = ref()
    const videoName = ref()
    onMounted(() => {
      videoName.value = route.query.name
      let url = route.query.videoUrl
      const storage = require("electron-localstorage")
      let path = storage.getItem("filePath")
      videoUrl.value = path + "\\" + url
      console.log("本地视频地址", videoUrl.value)
      //   return
      //   videoUrl.value = videoUrl.value.replace(/\\/g, "/")
    })
    return {
      videoUrl,
      videoName,
    }
  },
})
</script>
<style scoped>
@import "../assets/glob.css";
.footer-fixed {
  position: fixed;
  bottom: 0;
}
</style>
