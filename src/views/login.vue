<template>
  <div class="page" v-loading="loading">
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
import { ElMessage } from "element-plus"
// import Store from "electron-store"
export default defineComponent({
  setup() {
    const router = useRouter()
    const loading = ref(false)
    const account = ref({
      username: "",
      password: "",
    })
    const toHome = () => {
      if (!account.value.username) {
        ElMessage({
          message: "请输入账号",
          type: "warning",
        })
      } else if (!account.value.password) {
        ElMessage({
          message: "请输入登录密码",
          type: "warning",
        })
      } else {
        loading.value = true
        login(account.value).then((res: any) => {
          if (res.status == "OK") {
            let homeBgi = ""
            const filePath = "D:\\" + res.data.location
            const ipcRenderer = require("electron").ipcRenderer
            const storage = require("electron-localstorage")
            // const store = new Store()
            const Store = require("electron-store")
            const db = new Store()
            db.set("userUid", res.data.location)
            // console.log("使用store获取到的地区uid:", db.get("userUid"))
            console.log("请求到的地区文件夹名===", res.data.location)
            // 登录成功
            localStorage.setItem("location", res.data.locationName)
            localStorage.setItem("token", res.data.token)
            // storage.removeItem("filesName")
            // 清除文件版本号的缓存再重新设置缓存
            // let versionName = storage.getItem("filesName")
            let versionName = db.get("userUid")
            // console.log("本地已经存在的版本文件夹名字==", versionName)
            if (versionName) {
              storage.removeItem("filesName")
            } else {
              storage.setItem("filesName", res.data.location)
              db.set("userUid", res.data.location)
            }

            // 设置本地资源的根目录
            localStorage.setItem("imgSrc", filePath + "\\")
            db.set("filePath", filePath)
            // debugger
            let version = 0
            ipcRenderer.send("get-version", "getVersion")
            ipcRenderer.on("read-version", (_event, data) => {
              console.log("获取版本的结果===", data)
              version = JSON.parse(data).version
              version = Number(version)
              console.log("下载的进度是===", version)
              let wsUrl =
                "wss://admin.slqrd.gov.cn/api/manager/display/websocket"
              // let wsUrl = "wss://www.yarenda.cn/api/manager/display/websocket"
              var ws = new WebSocket(
                wsUrl +
                  "?version=" +
                  version +
                  "&Authorization=" +
                  res.data.token
              )
              // 心跳检测
              var heartCheck = {
                timeout: 55000, // 9分钟发一次心跳，比server端设置的连接时间稍微小一点，在接近断开的情况下以通信的方式去重置连接时间。
                serverTimeoutObj: 0,
                reset: function () {
                  // clearTimeout(this.timeoutObj)
                  clearTimeout(this.serverTimeoutObj)
                  return this
                },
                start: function () {
                  var self = this
                  heartCheck.serverTimeoutObj = window.setInterval(() => {
                    if (ws.readyState == 1) {
                      console.log("连接状态，发送消息保持连接")
                      ws.send("ping")
                      heartCheck.reset().start() // 如果获取到消息，说明连接是正常的，重置心跳检测
                    } else {
                      console.log("断开状态，尝试重连")
                      ws.onopen = function () {
                        // 重置心跳检测
                        heartCheck.reset().start()
                      }
                    }
                  }, this.timeout)
                },
              }
              ws.onerror = function () {}
              ws.onopen = function () {
                // 重置心跳检测
                heartCheck.reset().start()
              }
              ws.onmessage = function (e) {
                let files = JSON.parse(e.data)
                // 需要判断fileList是否有内容
                // if(files.fileList){
                let fileList = JSON.stringify(files.fileList)
                // }

                let navList = JSON.stringify(files.nodeList)
                console.log(files)
                homeBgi = files.homeBackgroundImage
                localStorage.setItem(
                  "bgi",
                  JSON.stringify(files.homeBackgroundImage)
                )
                // 有更新的内容需要下载
                if (files.fileList && files.fileList.length != 0) {
                  // 监听主进程过来的消息
                  ipcRenderer.on("has-render-data", (_event, ...args) => {
                    // console.log("接收主进程过来的消息===", ...args)
                  })
                  ipcRenderer.on("main-process-message", (_event, ...args) => {
                    // console.log("接收主进程过来的消息===", ...args)
                  })
                  // 向主进程发送消息，保存应用的目录
                  ipcRenderer.send("save-data", navList)
                  ipcRenderer.send("down-file-list", fileList)
                  ipcRenderer.on("down-over", (_event, data) => {
                    console.log("主进程的下载进度===", JSON.parse(data))
                    let downover = JSON.parse(data)
                    if (downover.state == "ok") {
                      loading.value = false
                      router.push({
                        path: "/",
                        query: {
                          bgi: homeBgi,
                        },
                      })
                    }
                  })
                } else {
                  const ipcRenderer = require("electron").ipcRenderer
                  // 监听主进程过来的消息
                  // 向主进程发送消息，保存应用的目录
                  ipcRenderer.send("save-data", navList)
                  // loading.value = false
                  // router.push({
                  //   path: "/home",
                  // })
                }
                // localStorage.setItem(
                //   "bgi",
                //   JSON.stringify(files.homeBackgroundImage)
                // )
                // 重置心跳检测
                heartCheck.reset().start()
              }
            })
            loading.value = false
            router.push({
              path: "/",
              query: {
                bgi: homeBgi,
              },
            })
          } else {
            ElMessage.error(res.message)
            loading.value = false
          }
        })
      }
    }
    return {
      account,
      loading,
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
