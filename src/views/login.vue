<template>
  <div>
    <div class="title-img">
      <img src="../assets/img/title-img.png" alt="" />
    </div>
    <div class="flex-r flex-a login-content">
      <img class="login-left-img" src="../assets/img/login-left.png" alt="" />
      <div class="login-box">
        <img class="gh-img" src="../assets/img/gh.png" alt="" />
        <p class="font36 login-text">人大代表之家智慧平台</p>
        <input
          v-model="account.username"
          class="login-item m-t-56"
          placeholder="输入账号"
          type="text"
        />
        <input
          v-model="account.password"
          class="login-item m-t-20"
          placeholder="输入密码"
          type="text"
        />
        <div class="btn-box font16 fff" @click="toHome">登录</div>
      </div>
    </div>
    <div>
      <img src="../assets/img/login-bottom.png" alt="" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue"
import { useRouter } from "vue-router"
import { login } from "../http/api"
export default defineComponent({
  setup() {
    const router = useRouter()
    const account = ref({
      username: "",
      password: "",
    })
    const toHome = () => {
      // login(account.value).then((res) => {
      //   console.log(res)
      // })
      // return
      router.push({
        path: "/home",
        query: {
          // goodsId: id,
        },
      })
    }
    return {
      account,
      toHome,
    }
  },
})
</script>
<style scoped>
@import "../assets/glob.css";
.title-img {
  padding-top: 92px;
  /* margin-top: 92px; */
}
.login-content {
  margin-top: 55px;
}
.login-left-img {
  width: 984px;
  height: 600px;
}
.login-box {
  width: 540px;
  height: 622px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 3px 20px 0px rgba(0, 0, 0, 0.16);
}
.gh-img {
  margin-top: 36px;
}
.login-item {
  width: 372px;
  height: 44px;
  background: #f7f7f7;
  border-radius: 22px;
  border: none;
  padding-left: 24px;
}
.btn-box {
  width: 396px;
  height: 44px;
  background: linear-gradient(140deg, #ff662c 0%, #f52821 48%, #f31a1a 100%);
  border-radius: 20px;
  text-align: center;
  line-height: 44px;
  margin: 0 auto;
  margin-top: 58px;
}
</style>
