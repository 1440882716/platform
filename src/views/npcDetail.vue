<template>
  <Header></Header>
  <div class="duty-box text-left flex-r">
    <!-- <div class="npc-box text-left flex-r"> -->
    <img class="peopel" src="../assets/img/peopel.png" alt="" />
    <div>
      <p class="font36 m-t-16">尹宏波</p>
      <p class="font20 m-t-24">
        <span class="deep-gray m-r-20">现任职位</span>
        黄甲街道党工委委员、区人大常委会黄甲街道工委主任
      </p>
      <p class="font20 m-t-16">
        <span class="deep-gray m-r-20">联系电话</span>138 8021 8999
      </p>
    </div>
    <!-- </div> -->
  </div>
  <!-- 履职风采 -->
  <div class="conetent-box relative">
    <div class="mid-line"></div>
    <div class="duty-list-box text-left m-t-16">
      <div class="font28 tab-red m-b-20">履职风采</div>
      <div class="flex-r list-box flex-b">
        <div
          class="duty-list pointer flex-r flex-b"
          v-for="item in resultList"
          @click="toDetail"
        >
          <div class="flex-r">
            <div class="title-tag font16 tab-red">参加人大会议</div>
            <div class="font20 title-color">
              参加双流区、镇人大代表换届选举工作会
            </div>
          </div>
          <span class="font16 gray-title">2022-08-15</span>
        </div>
      </div>
      <div class="flex-r flex-end m-t-16">
        <el-pagination background layout="prev, pager, next" :total="100" />
      </div>
    </div>
  </div>

  <Footer style="position: fixed; bottom: 0"></Footer>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue"
import { useRouter } from "vue-router"
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
    const router = useRouter()
    const toDetail = () => {
      router.push({
        path: "/dutiesDetail",
        query: {
          // goodsId: id,
        },
      })
    }
    return {
      ...toRefs(data),
      toDetail,
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
.title-tag {
  padding: 3px 12px;
  border: 1px solid #f31a1a;
  border-radius: 4px;
  margin-right: 10px;
  /* margin-left: 6px; */
}
.mid-line {
  width: 1px;
  height: 365px;
  background-color: #e5e5e5;
  position: absolute;
  top: 90px;
  left: 50%;
}
</style>
