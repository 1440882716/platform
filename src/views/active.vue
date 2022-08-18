<template>
  <Header></Header>
  <div class="flex-r fff active-box flex-b">
    <div class="active-item text-center pointer">
      <img class="flag-icon" src="../assets/img/flag-icon.png" alt="" />
      <p class="font32">代表活动修改</p>
    </div>
    <div class="active-item text-center pointer">
      <img class="flag-icon" src="../assets/img/flag-icon.png" alt="" />
      <p class="font32">人大计划</p>
    </div>
  </div>
  <Footer class="footer-fixed"></Footer>
</template>
<script lang="ts">
import { defineComponent } from "vue"
import { useRouter } from "vue-router"
import Header from "../components/header.vue"
import Footer from "../components/footer.vue"
export default defineComponent({
  components: {
    Header,
    Footer,
  },
  setup() {
    const router = useRouter()
    return {}
  },
})
</script>
<style scoped>
@import "../assets/glob.css";
.active-box {
  /* min-width: 706px; */
  width: 706px;
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

.flag-icon {
  margin-top: 50px;
}
.footer-fixed {
  position: fixed;
  bottom: 0;
}
</style>
