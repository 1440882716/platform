<template>
  <div class="page">
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
          type="password"
        />
        <div class="btn-box font16 fff pointer" @click="toHome">登录</div>
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
      username: "admin",
      password: "123456",
    })
    const toHome = () => {
      // let systemPath =
      //   "D:\\img\\1fb4ed79a8d463f7136b8a187112017f_1661334648771.jpg"
      // let index = systemPath.lastIndexOf("\\")
      // let pos = systemPath.substring(0, index)
      // console.log("文件保存的位置===", pos)
      // return
      login(account.value).then((res: any) => {
        // console.log(res)
        if (res.status == "OK") {
          // 登录成功
          localStorage.setItem("token", res.data.token)
          var ws = new WebSocket(
            "ws://192.168.1.116:9527/api/manager/display/websocket?version=0&Authorization=" +
              res.data.token
          )
          ws.onerror = function () {
            // console.log("error")
          }
          ws.onopen = function () {
            // console.log("连接成功...")
          }
          // 接收websocket推送的消息
          ws.onmessage = function (e) {
            // console.log(e.data)
            let files = JSON.parse(e.data)
            let fileList = JSON.stringify(files.fileList)
            let navList = JSON.stringify(files.nodeList)
            // let bgi = JSON.stringify(files.homeBackgroundImage)
            console.log(files)

            localStorage.setItem(
              "bgi",
              JSON.stringify(files.homeBackgroundImage)
            )
            // console.log(JSON.parse(fileList))
            // console.log(JSON.parse(navList))

            // return
            // const ipcRenderer = require("electron").ipcRenderer
            // // 监听主进程过来的消息
            // ipcRenderer.on("main-process-message", (_event, ...args) => {
            //   // console.log("接收主进程过来的消息===", ...args)
            // })
            // ipcRenderer.on("read-file", (_event, ...args) => {
            //   // console.log("文件信息", ...args)
            // })
            // // 向主进程发送消息，保存应用的下载文件
            // ipcRenderer.send("down-file-list", fileList)
            // // 向主进程发送消息，保存应用的目录
            // ipcRenderer.send("save-data", navList)
            router.push({
              path: "/home",
            })
          }
          // return
        }
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
.page {
  background: url(../assets/img/main-bg.png);
  background-size: 100% 100%;
  height: 100%;
  position: fixed;
  width: 100%;
  /* width: 100%;
  height: 1080px; */
}
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
