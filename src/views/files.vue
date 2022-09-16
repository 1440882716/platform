<template>
  <div class="bg-box" :style="{ backgroundImage: `url(${imgUrl})` }">
    <Header></Header>
    <div class="turn-container">
      <iframe
        id="mainIframe"
        ref="iframeRef"
        name="iframeRef"
        src="src/static/pdf-page/entry.html"
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
import turn from "../utils/turn.js"
const $ = require("jquery")
export default defineComponent({
  components: {
    Header,
    // Flipbook
    Footer,
  },
  setup() {
    const route = useRoute()
    const mainIframe = ref(null)
    const currentPage = ref(1)
    const imgUrl = ref()
    const imgList = ref([{ url: "./assets/fsc/turn-img/1.jpg" }])

    // let iframeSrc = ref<string>("http://localhost:3344")
    let iframeRef = ref<any>(null) // 和iframe标签的ref绑定
    let iframeWindow: any = null //iframe的window对象
    // const UrlSearch = () => {
    //   var name, value
    //   var str = location.href //取得整个地址栏
    //   var num = str.indexOf("?")
    //   str = str.substr(num + 1) //取得所有参数   stringvar.substr(start [, length ]
    //   var arr = str.split("&") //各个参数放到数组里
    //   for (var i = 0; i < arr.length; i++) {
    //     num = arr[i].indexOf("=")
    //     if (num > 0) {
    //       name = arr[i].substring(0, num)
    //       value = arr[i].substr(num + 1)
    //       //  this[name]=value;
    //     }
    //   }
    // }
    // const sendMessage = (url: string) => {
    //   if (iframeRef.value.attachEvent) {
    //     // 兼容IE浏览器判断 ie的window.onload 是隐藏的 需要用attachEvent注册
    //     // iframeRef.value.attachEvent("onload", function () {
    //     //postMessage（message,origin） 向iframe发送参数
    //     //message：iframe接收的参数，最好字符串   origin：其值可以是字符串"*"（表示无限制）或者一个url
    //     iframeWindow.postMessage("message", url)
    //     // })
    //   } else {
    //     iframeRef.value.onload = function () {
    //       iframeWindow.postMessage("message", "*")
    //     }
    //   }
    // }
    onMounted(() => {
      const storage = require("electron-localStorage")
      let path = storage.getItem("filePath")
      let url = path + "\\"
      url = url.replace(/\\/g, "/")
      let bgImg = url + route.query.bgi
      imgUrl.value = bgImg
      let pdfUrl = route.query.pdfUrl
      // let fileUrl = "D:\\khd\\bigdata\\test_files\\" + pdfUrl
      let fileUrl = url.replace(/\//g, "\\\\") + pdfUrl
      console.log(fileUrl)
      // 向iframe传参
      // window.addEventListener("message", handleMessage) // 监听iframe的事件
      //vue3使用ref定义的变量需要使用.value获取值， vue2直接iframeRef.contentWindow
      iframeWindow = iframeRef.value.contentWindow
      console.log("iframe的window对象===", iframeWindow)

      setTimeout(() => {
        // sendMessage(fileUrl)
        iframeWindow.postMessage(fileUrl, "*")
      }, 1000)
    })
    return {
      currentPage,
      imgList,
      mainIframe,
      imgUrl,
      // iframeSrc,
      iframeRef,
      iframeWindow,
      // sendMessage,
      // UrlSearch,
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
