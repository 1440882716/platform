<template>
  <Header></Header>
  <div class="duty-box text-left flex-r">
    <img class="peopel" :src="staticUrl + npc_img" alt="" />
    <div>
      <p class="font36 m-t-16">{{ npc_name }}</p>
      <p class="font20 m-t-24">
        <span class="deep-gray m-r-20">现任职位</span>
        {{ npc_des }}
      </p>
      <p class="font20 m-t-16">
        <span class="deep-gray m-r-20">联系电话</span>{{ npc_phone }}
      </p>
    </div>
  </div>
  <!-- 履职风采 需要联网请求 -->
  <div class="conetent-box relative">
    <div class="mid-line"></div>
    <div class="duty-list-box text-left m-t-16">
      <div class="font28 tab-red m-b-20">履职风采</div>
      <!-- 有网络，展示履职列表 -->
      <div>
        <div class="flex-r list-box flex-b">
          <div
            class="duty-list pointer flex-r flex-b"
            v-for="item in resultList"
            @click="toDetail(item)"
          >
            <div class="flex-r">
              <div class="title-tag font16 tab-red">{{ item.typeName }}</div>
              <div class="font20 title-color npc-content-duty">
                {{ item.title }}
              </div>
            </div>
            <span class="font16 gray-title">{{ item.workAt }}</span>
          </div>
        </div>
        <div class="flex-r flex-end m-t-16">
          <!-- @current-change="handleCurrentChange" -->
          <el-pagination
            background
            layout="prev, pager, next"
            :page-count="totalPages"
            :page-size="12"
            @current-change="handleCurrentChange"
            @prev-click="prevPage"
            @next-click="nextPage"
          />
        </div>
      </div>
    </div>
  </div>

  <Footer style="position: fixed; bottom: 0"></Footer>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, ref, onMounted } from "vue"
import { useRouter, useRoute } from "vue-router"
import Header from "../components/header.vue"
import Footer from "../components/footer.vue"
import { InitData } from "../types/representative"
import { duties } from "../http/api"
export default defineComponent({
  components: {
    Header,
    Footer,
  },
  setup() {
    const data = reactive(new InitData())
    const router = useRouter()
    const route = useRoute()
    const staticUrl = ref()
    const npc_name = ref()
    const npc_des = ref()
    const npc_phone = ref()
    const npc_img = ref()
    const npc_uid = ref()
    const totalPages = ref(1)
    const page = ref(1)
    const size = ref(12)
    // 获取代表的履职信息
    const getNpc = () => {
      let requestData = {
        uid: npc_uid.value,
        page: currentPage.value,
        size: size.value,
      }
      duties(requestData).then((res: any) => {
        if (res.status == "OK") {
          totalPages.value = res.data.totalPages
          data.resultList = res.data.content
        } else {
          // 履职信息获取失败
        }
        // console.log("请求到的履职信息===", data.resultList)
      })
    }
    const toDetail = (info: any) => {
      // console.log(info)
      localStorage.removeItem("dutyDetail")
      localStorage.setItem("dutyDetail", JSON.stringify(info))
      // return
      router.push({
        path: "/dutiesDetail",
        query: {
          name: npc_name.value,
          info: JSON.stringify(info),
        },
      })
    }
    // const handleSizeChange =(val) => {
    //   this.pageSize = val
    //   getNpc()
    // }
    const currentPage = ref(1)
    const handleCurrentChange = (val: number) => {
      currentPage.value = val
      getNpc()
    }
    const prevPage = (val: number) => {
      currentPage.value = val
      getNpc()
    }

    const nextPage = (val: number) => {
      currentPage.value = val
      getNpc()
    }
    onMounted(() => {
      // let npcType = route.query.npcType
      let npsData = localStorage.getItem("npcDetail") as string
      const storage = require("electron-localstorage")
      // let path = storage.getItem("filePath")
      const Store = require("electron-store")
      const db = new Store()
      let path = db.get("filePath")
      let url = path + "\\"
      staticUrl.value = url.replace(/\\/g, "/")
      if (npsData != "" && npsData != undefined) {
        npc_name.value = JSON.parse(npsData).name
        npc_des.value = JSON.parse(npsData).introduction
        npc_phone.value = JSON.parse(npsData).mobile
        npc_img.value = JSON.parse(npsData).avatar
        npc_uid.value = JSON.parse(npsData).uid
        console.log(JSON.parse(npsData))
        getNpc()
      }
    })
    return {
      ...toRefs(data),
      staticUrl,
      npc_name,
      npc_des,
      npc_phone,
      npc_img,
      totalPages,
      page,
      size,
      getNpc,
      toDetail,
      handleCurrentChange,
      prevPage,
      nextPage,
    }
  },
})
</script>
<style scoped>
@import "../assets/glob.css";
.duty-box {
  margin: 24px 42px;
  padding: 24px;
  /* padding: 0 42px; */
  background: url("../assets/img/npc-bgi.png") center center no-repeat;
}
.npc-box {
}
.peopel {
  width: 120px;
  height: 164px;
  /* margin-top: 24px; */
  /* margin-left: 24px; */
  margin-right: 40px;
}
.conetent-box {
  padding: 0 42px;
  overflow: hidden;
}
.duty-list-box {
  background-color: #fff;
  padding: 24px 36px;
}
.list-box {
  /* background-color: cadetblue; */
  flex-wrap: wrap;
}
.duty-list {
  width: 47%;
  padding-bottom: 16px;
  padding-top: 17px;
  padding-left: 6px;
  border-bottom: 1px solid #e5e5e5;
  /* background-color: darkgoldenrod; */
}

.mid-line {
  width: 1px;
  height: 365px;
  background-color: #e5e5e5;
  position: absolute;
  top: 90px;
  left: 50%;
}
.npc-content-duty {
  overflow: hidden;
  text-overflow: ellipsis;
  /* width: calc(100% -232px); */
  width: 500px;
  height: 29px;
  line-height: 29px;
  /* width: 100%; */
  white-space: nowrap;
  /* background-color: cadetblue; */
}
.title-tag {
  padding: 3px 12px;
  max-width: 122px;
  border: 1px solid #f31a1a;
  border-radius: 4px;
  margin-right: 10px;
  /* margin-left: 6px; */
}
</style>
