<template>
  <div class="header-box flex-r flex-b">
    <div class="flex-r">
      <img class="gh-icon" src="../assets/img/gh-icon.png" alt="" />
      <div class="fff system-title">{{ locationName }}人大代表之家智慧平台</div>
    </div>
    <div style="margin-right: 148px; margin-top: 10px" class="font24">
      <span class="fff" style="margin-right: 16px">{{ date }}</span>
      <span class="fff" style="margin-right: 27px">{{ time }}</span>
      <span class="fff">{{ weekday }}</span>
      <span class="fff go-out pointer" @click="update">刷新资源</span>
      <span class="fff go-out pointer" @click="goOut">退出</span>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from "vue"
import { useRouter } from "vue-router"
export default defineComponent({
  setup() {
    const router = useRouter()
    const locationName = ref()
    const addZero = (num: any) => {
      if (parseInt(num) < 10) {
        num = "0" + num
      }
      return num
    }
    const formatDate = () => {
      var t
      clearTimeout(t)
      // 格式化日期，获取今天的日期
      const Dates = new Date(new Date().getTime())
      const year: number = Dates.getFullYear()
      const month: any =
        Dates.getMonth() + 1 < 10
          ? "0" + (Dates.getMonth() + 1)
          : Dates.getMonth() + 1
      const day: any =
        Dates.getDate() < 10 ? "0" + Dates.getDate() : Dates.getDate()
      const h: number = Dates.getHours()
      const m: number = Dates.getMinutes()
      const s: number = Dates.getSeconds()
      switch (Dates.getDay()) {
        case 1:
          weekday.value = "星期一"
          break
        case 2:
          weekday.value = "星期二"
          break
        case 3:
          weekday.value = "星期三"
          break
        case 4:
          weekday.value = "星期四"
          break
        case 5:
          weekday.value = "星期五"
          break
        case 6:
          weekday.value = "星期六"
          break
        case 7:
          weekday.value = "星期日"
          break
      }
      date.value = year + "年" + month + "月" + day + "日"
      time.value = addZero(h) + ":" + addZero(m) + ":" + addZero(s)
      t = setTimeout(formatDate, 1000) //设置定时器，循环运行
    }
    const date = ref() // 年月日
    const time = ref() // 时分秒
    const weekday = ref() // 时分秒
    const update = () => {
      let token = localStorage.getItem("token")
      if (token) {
        const ipcRenderer = require("electron").ipcRenderer
        let version = 0
        ipcRenderer.send("get-version", "getVersion")
        ipcRenderer.on("read-version", (_event, data) => {
          console.log(data)
          version = JSON.parse(data).version
          console.log("下载的进度是===", version)
          // let wsUrl = "wss://www.yarenda.cn/api/manager/display/websocket"
          let wsUrl = "wss://admin.slqrd.gov.cn/api/manager/display/websocket"
          var ws = new WebSocket(
            wsUrl + "?version=" + version + "&Authorization=" + token
          )
          // 心跳检测
          var heartCheck = {
            timeout: 55000, // 9分钟发一次心跳，比server端设置的连接时间稍微小一点，在接近断开的情况下以通信的方式去重置连接时间。
            serverTimeoutObj: 0,
            reset: function () {
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
            // 设置背景图
            // homeBgi = files.homeBackgroundImage
            localStorage.setItem(
              "bgi",
              JSON.stringify(files.homeBackgroundImage)
            )
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
                  // loading.value = false
                  router.push({
                    path: "/",
                  })
                }
              })
            } else {
              const ipcRenderer = require("electron").ipcRenderer
              // 监听主进程过来的消息
              // 向主进程发送消息，保存应用的目录
              ipcRenderer.send("save-data", navList)
            }
            // 重置心跳检测
            heartCheck.reset().start()
          }
          window.alert("刷新成功")
          // this.$message('这是一条消息提示');
        })

        // window.location.reload()
      } else {
        router.push({
          path: "/login",
        })
      }
    }
    const goOut = () => {
      // router.push({
      //   path: "/login",
      // })
      // return
      // 退出清空token，回到登录页面
      let wsUrl = "wss://admin.slqrd.gov.cn/api/manager/display/websocket"
      // let wsUrl = "wss://www.khdpro1.top/api/manager/display/websocket"
      // let wsUrl = "wss://192.168.1.200:9527/api/manager/display/websocket"
      var ws = new WebSocket(wsUrl)
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
              // console.log("连接状态，发送消息保持连接")
              ws.send("ping")
              heartCheck.reset().start() // 如果获取到消息，说明连接是正常的，重置心跳检测
            } else {
              // console.log("断开状态，尝试重连")
              ws.onopen = function () {
                // 重置心跳检测
                heartCheck.reset().start()
              }
            }
          }, this.timeout)
        },
      }
      ws.onclose = function () {
        localStorage.setItem("token", "")
        heartCheck.reset()
      }
      localStorage.setItem("token", "")
      localStorage.setItem("location", "")
      router.push({
        path: "/login",
      })
    }
    onMounted(() => {
      locationName.value = localStorage.getItem("location")
      formatDate()
    })
    return {
      locationName,
      date,
      time,
      weekday,
      addZero,
      formatDate,
      update,
      goOut,
    }
  },
})
</script>
<style scoped>
@import "../assets/glob.css";
.header-box {
  width: 100%;
  height: 100px;
  /* background-color: burlywood; */
  background-image: url(../assets/img/header-title.png);
  text-align: left;
}
.gh-icon {
  width: 63px;
  height: 66px;
  margin-left: 53px;
  margin-top: 17px;
}
.system-title {
  width: auto;
  height: 100px;
  line-height: 100px;
  font-size: 38px;
  margin-left: 20px;
  letter-spacing: 5px;
}
.go-out {
  margin-left: 20px;
}
</style>
