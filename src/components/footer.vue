<template>
  <div class="footer-box">
    <div class="footer-icon flex-r">
      <img @click="toHome" src="../assets/img/home-icon.png" alt="" />
      <img @click="backPage" src="../assets/img/back-icon.png" alt="" />
    </div>
  </div>
</template>
<script lang="ts">
import { json } from "stream/consumers"
import { defineComponent, onMounted, ref } from "vue"
import { useRouter, useRoute } from "vue-router"
export default defineComponent({
  setup() {
    const router = useRouter()
    const route = useRoute()
    const allData = ref()
    const toHome = () => {
      let str = localStorage.getItem("bgi") as string
      // console.log(str)
      router.push({
        path: "/",
        query: {
          bgi: str,
        },
      })
    }

    let parentNav: any = []
    let parentType: Number
    const dataList = (data: any[], uid: string) => {
      let arr: any = data
      data.map((item: any) => {
        if (uid === item.uid) {
          parentNav = arr
          parentType = item.type
        } else {
          if (item.children) {
            dataList(item.children, uid)
          }
        }
      })
    }

    const backPage = () => {
      // console.log(route.path)
      // let uid = localStorage.getItem("parent_uid") as string
      // console.log(uid)
      // let navData = localStorage.getItem("navData") as string
      // let navDataArr = JSON.parse(navData) as any[]

      // // 遍历目录找到要返回的父级目录
      // dataList(navDataArr, uid)
      // console.log(parentNav)
      // console.log(parentType)
      // if (route.path === "/npcDetail") {
      //   // let npcType = localStorage.getItem("npcType")
      //   router.back()
      // }
      // if (parentType === 0 || 1) {
      //   localStorage.setItem("back_nav_uid", parentNav[0].parentUid)
      //   localStorage.setItem("back_nav_data", JSON.stringify(parentNav))
      //   router.push({
      //     path: "/representative",
      //     query: {
      //       name: "back",
      //       bgi: parentNav[0].backgroundImage,
      //     },
      //   })
      // } else {
      let navArr = JSON.parse(localStorage.getItem("nav_arr") as string)
      navArr.pop()
      localStorage.setItem("nav_arr", JSON.stringify(navArr))
      router.back()
      // }
    }
    onMounted(() => {
      // 这个页面的所有数据
      // allData.value = localStorage.getItem("allData") as string
      allData.value = localStorage.getItem("nav_page_data") as string
      // console.log(JSON.parse(allData.value))
    })
    return {
      allData,
      toHome,
      backPage,
    }
  },
})
</script>
<style scoped>
.footer-box {
  width: 100%;
  height: 76px;
  position: relative;
  background-image: url(../assets/img/footer.png);
}
.footer-icon {
  position: absolute;
  width: 480px;
  height: 140px;
  top: -57px;
  left: 50%;
  margin-left: -240px;
  z-index: 99;
}
</style>
