<template>
  <Header></Header>
  <div class="content">
    <div class="duty-box">
      <div class="flex-r flex-start text-left title-color font28">
        <img class="arrow-icon" src="../assets/img/arrow.png" alt="" />
        <div class="duty-title">履职标题:</div>
        <span>人大代表视察黄水镇水情况</span>
      </div>
      <div class="flex-r flex-start text-left title-color font28 m-t-28">
        <img class="arrow-icon" src="../assets/img/arrow.png" alt="" />
        <div class="duty-title">履职类型:</div>
        <span>其他</span>
      </div>
      <div class="flex-r flex-start text-left title-color font28 m-t-28">
        <img class="arrow-icon" src="../assets/img/arrow.png" alt="" />
        <div class="duty-title">履职人:</div>
        <span>尹宏波</span>
      </div>
      <div class="flex-r flex-start text-left title-color font28 m-t-28">
        <img class="arrow-icon" src="../assets/img/arrow.png" alt="" />
        <div class="duty-title">履职时间:</div>
        <span>2022-08-08 13:52:37</span>
      </div>
      <div class="flex-r flex-start text-left title-color font28 m-t-28">
        <img class="arrow-icon" src="../assets/img/arrow.png" alt="" />
        <div class="duty-title">履职标题:</div>
        <span>人大代表视察黄水镇水情况</span>
      </div>
      <div class="flex-r flex-start text-left title-color font28 m-t-28">
        <img class="arrow-icon" src="../assets/img/arrow.png" alt="" />
        <div class="duty-title-content">履职内容:</div>
        <div class="content-duty">
          XXX地区道路乱七八糟，XXX地区道路乱七八糟XXX地区道路乱七八糟，XXX地区道路乱七八糟XXX地区道路乱七八糟，XXX地区道路乱七八糟XXX地区道路乱七八糟，XXX地区道路乱七八糟XXX地区道路乱七八糟
          <div class="flex-r">
            <img class="duty-img" src="../assets/img/Rectangle55.png" alt="" />
            <img class="duty-img" src="../assets/img/Rectangle55.png" alt="" />
            <img class="duty-img" src="../assets/img/Rectangle55.png" alt="" />
          </div>
        </div>
      </div>
      <!-- <div class="flex-r flex-start text-left title-color font28 m-t-28">
        <img class="arrow-icon" src="../assets/img/arrow.png" alt="" />
        <div class="duty-title-content">履职内容:</div>
        <div class="content-duty">
          XXX地区道路乱七八糟，XXX地区道路乱七八糟XXX地区道路乱七八糟，XXX地区道路乱七八糟XXX地区道路乱七八糟，XXX地区道路乱七八糟XXX地区道路乱七八糟，XXX地区道路乱七八糟XXX地区道路乱七八糟
        </div>
      </div> -->
    </div>
  </div>
  <Footer style="position: fixed; bottom: 0"></Footer>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue"
import { useRouter } from "vue-router"
import Header from "../components/header.vue"
import Footer from "../components/footer.vue"

export default defineComponent({
  components: {
    Header,
    Footer,
  },
  setup() {
    return {}
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
  width: 88px;
  height: 88px;
  margin-right: 16px;
  margin-top: 22px;
}
</style>
