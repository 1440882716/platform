<template>
  <div class="bg-box" :style="{ backgroundImage: `url(${imgUrl})` }">
    <Header></Header>
    <div class="flex-r fff active-box flex-b">
      <div
        class="active-item text-center pointer"
        v-for="item in showData"
        @click="toDetail(item)"
      >
        <img class="npc-icon" src="../assets/img/npc-icon.png" alt="" />
        <p class="font28 name-p two-line-text">{{ item.name }}</p>
      </div>
    </div>
    <!-- <div class="footer-fixed">
      <div class="footer-box">
        <div class="footer-icon flex-r">
          <img @click="toHome" src="../assets/img/home-icon.png" alt="" />
          <img @click="backPage" src="../assets/img/back-icon.png" alt="" />
        </div>
      </div>
    </div> -->
    <Footer style="position: fixed; bottom: 0"></Footer>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue"
import { useRouter, useRoute } from "vue-router"
import Header from "../components/header.vue"
import Footer from "../components/footer.vue"
import { ElMessage } from "element-plus"
export default defineComponent({
  components: {
    Header,
    Footer,
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const allData = ref()
    const parentData = ref()
    const showData = ref()
    const imgUrl = ref()
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

      if (info.type == 0 && info.children.length != 0) {
        parentData.value = showData.value
        showData.value = info.children
      } else if (info.type == 1 && info.children.length != 0) {
        parentData.value = showData.value
        showData.value = info.children
        console.log(info.children)
        localStorage.setItem("npcinfo", JSON.stringify(info.children))
        router.push({
          path: "/npcInfo",
          query: {
            bgi: info.backgroundImage,
          },
        })
      } else if (info.type == 7 && info.children.length != 0) {
        parentData.value = showData.value
        showData.value = info.children
        localStorage.setItem("fileData", JSON.stringify(info.children))
        router.push({
          path: "/WorkSystem",
          query: {
            bgi: info.backgroundImage,
          },
        })
      } else if (info.type == 8 && info.children.length != 0) {
        parentData.value = showData.value
        showData.value = info.children
        localStorage.setItem("mapData", JSON.stringify(info.children))
        router.push({
          path: "/infomation",
          query: {
            bgi: info.backgroundImage,
          },
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
        // console.log("文件没有内容")
        ElMessage({
          message: "该文件夹没有内容",
          type: "warning",
        })
      }
    }
    onMounted(() => {
      let name = route.query.name
      const storage = require("electron-localstorage")
      let path = storage.getItem("filePath")
      let url = path + "\\"
      url = url.replace(/\\/g, "/")
      let bgImg = url + route.query.bgi
      imgUrl.value = bgImg
      const ipcRenderer = require("electron").ipcRenderer
      ipcRenderer.send("get-data", name)
      ipcRenderer.on("read-renda", (event, data) => {
        // 本页面所有的数据
        localStorage.setItem("allData", data)
        allData.value = JSON.parse(data)
        showData.value = JSON.parse(data)
        // showObj.value.showData = JSON.parse(data)
        // console.log("获取该页面的数据===", showData.value)
      })
    })
    const toHome = () => {
      router.push({
        path: "/home",
      })
    }
    const backPage = () => {
      console.log(allData.value)
      console.log(parentData)
      // showData.value = allData.value
      router.back()
    }
    return {
      allData,
      parentData,
      showData,
      imgUrl,
      toDetail,
      toHome,
      backPage,
    }
  },
})
</script>
<style scoped>
@import "../assets/glob.css";
.active-box {
  /* min-width: 706px; */
  width: 1109px;
  margin: 0 auto;
  margin-top: 275px;
  /* background-color: burlywood; */
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
/* ==================底部 */
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
