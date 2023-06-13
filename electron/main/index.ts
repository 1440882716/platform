import { app, BrowserWindow, shell, ipcMain, session } from "electron"
import { release } from "os"
import { join } from "path"
import fs from "fs"
import path from "path"
import { json } from "node:stream/consumers"
import { string } from "yargs"

if (release().startsWith("6.1")) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === "win32") app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

// Remove electron security warnings
// This warning only shows in development mode
// Read more on https://www.electronjs.org/docs/latest/tutorial/security
// process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

export const ROOT_PATH = {
  // /dist
  dist: join(__dirname, "../.."),
  // /dist or /public
  public: join(__dirname, app.isPackaged ? "../.." : "../../../public"),
}

let win: BrowserWindow | null = null
// 下载文件的保存地址和下载的序号version
let savePath: string
let version: string
// Here, you can also use other preload
const preload = join(__dirname, "../preload/index.js")
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin
const url = `http://${process.env["VITE_DEV_SERVER_HOST"]}:${process.env["VITE_DEV_SERVER_PORT"]}`
const indexHtml = join(ROOT_PATH.dist, "index.html")



async function createWindow() {
  win = new BrowserWindow({
    title: "Main window",
    width: 1800,
    height: 1000,
    // fullscreen: true,//全屏模式
    // frame: false,//左上角菜单栏
    icon: join(ROOT_PATH.public, "favicon.ico"),
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
      devTools:true,
    },
  })
// 引入electron-store
const Store = require('electron-store')
const db = new Store()
  // 初始化store
  Store.initRenderer();
  // db.set("userUid",0)

  if (app.isPackaged) {
    win.loadFile(indexHtml)
  } else {
    win.loadURL(url)
    // Open devTool if the app is not packaged
    win.webContents.openDevTools()
  }

  // Test actively push message to the Electron-Renderer
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString())
  })

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https:")) shell.openExternal(url)
    return { action: "deny" }
  })

  // 下载
  const filesDown = (
    win: any,
    downPath: string,
    savePath: string,
    filesNum: string,
    filesCount: number
  ) => {
    win.webContents.downloadURL(downPath)
    console.log("address=========",downPath);
    
    win.webContents.session.on(
      "will-download",
      (event: any, item: any, webContents: any) => {
        let url = savePath + `\\${item.getFilename()}`
        item.setSavePath(url)
        item.once("done", (event: any, state: any) => {
          if (state === "completed") {
            //  将下载进度写入本地文件
            let obj = { version: filesNum }
            let dataV = JSON.stringify(obj)
            // const storage = require("electron-localstorage")
            // var newFiles = storage.getItem("filesName")
            var newFiles = db.get("userUid")
            var versionName = "D:\\" + newFiles + "Version.json"
            // "D:\\version.json"
            fs.writeFile(versionName, dataV, (err) => {
              if (err) {
              } else {
                // if(filesCount == filesNum){
                //   let obj = {state:"ok"}
                //   let data = JSON.stringify(obj)
                //   win.webContents.send('down-over', data);
                // }
              }
            })
          } else {
          }
        })
      }
    )
  }

  // 主进程监听渲染进程的消息
  // 保存目录
  ipcMain.on("save-data", (event, arg) => {
    // const storage = require("electron-localstorage")
    // var newFiles = storage.getItem("filesName")
    var newFiles = db.get("userUid")
    var navName = "D:\\" + newFiles + "NavData.json"
    fs.writeFile(navName, arg, (err) => {
      if (err) {
        console.log("navName=======", err)
      } else {
        console.log("navName=======success")
      }
    })
  })
  // 保存下载文件
  ipcMain.on("down-file-list", (event, arg) => {
    // const storage = require("electron-localstorage")
    // var newFiles = storage.getItem("filesName")
    var newFiles = db.get("userUid")
    var fileName = "D:\\" + newFiles + "FileData.json"
    fs.writeFile(fileName, arg, (err) => {
      if (err) {
        console.log(err)
      } else {
        // const storage = require("electron-localstorage")
        // 读本地文件目录并且下载
        fs.readFile(path.join(fileName), "utf8", (error, data) => {
          if (error) {
            // 文件读取失败;
          } else {
            let fileList = JSON.parse(data)
            // let baseurl = "https://www.khdpro1.top"
            // let baseurl = "https://www.yarenda.cn"
            let baseurl = "https://admin.slqrd.gov.cn"
            // 获取文件的安装地址
            let homeDir = "D:\\"
            // let newFiles = storage.getItem("filesName")
            var newFiles = db.get("filePath")
            // 创建对应地区的文件夹
            let filesPath = ""
            // fs.mkdir(path.join(homeDir, newFiles), (err) => {
            fs.mkdir(path.join(newFiles), (err) => {
              if (err) {
                // 该文件夹已经存在
                if (err.code == "EEXIST") {
                  filesPath = err.path as string
                }
                console.log("creating is error ====", err)
                let filesCount = fileList[fileList.length - 1].version
                // 遍历所有文件下载
                for (let i = 0; i < fileList.length; i++) {
                  filesDown(
                    win,
                    baseurl + fileList[i].url,
                    filesPath,
                    fileList[i].version.toString(),
                    filesCount
                  )
                }
              } else {
                // 文件夹创建成功,讲下载的文件放入这个文件夹
                filesPath = homeDir + newFiles
                let filesCount = fileList[fileList.length - 1].version
                for (let i = 0; i < fileList.length; i++) {
                  filesDown(
                    win,
                    baseurl + fileList[i].url,
                    filesPath,
                    fileList[i].version.toString(),
                    filesCount
                  )
                }
              }
              // 将文件下载的目录缓存
              // storage.setItem("filePath", filesPath)
              db.set("filePath", "D:\\" + filesPath)
              // 遍历文件下载
            })
          }
        })
      }
    })
   
  })
  // 登录页获取下载进度
  ipcMain.on("get-version", (event, arg) => {
    const storage = require("electron-localstorage")
    // var newFiles = storage.getItem("filesName")
    var newFiles = db.get("filePath")
    console.log("versionFile=======",newFiles);
    
    var versionName = newFiles + "Version.json"

    if (arg == "getVersion") {
      console.log("versionName=======",versionName);
      console.log("store----versionName=======",newFiles);
      // fs.readFile(path.join(versionName), "utf8", (error, data) => {
        fs.readFile(versionName, "utf8", (error, data) => {
        console.log("11111111111111111111===============",data);
        if (error) {
          let obj = { version: 0 }
          let data = JSON.stringify(obj)
          
          
          event.sender.send("read-version", data)
        } else {
          event.sender.send("read-version", data)
        }
      })
    }
  })
  // 首页获取目录信息
  ipcMain.on("get-nav", (event, arg) => {
    // const storage = require("electron-localstorage")
    // var newFiles = storage.getItem("filesName")
    var newFiles = db.get("filePath")

    var navName = newFiles + "NavData.json"
    if (arg == "getNav") {
      fs.readFile(path.join(navName), "utf8", (error, data) => {
        if (error) {
        } else {
          event.sender.send("read-nav", data)
        }
      })
    } else {
    }
  })
  // 获取对应children里面的内容
  ipcMain.on("get-data", (event, arg) => {
    const storage = require("electron-localstorage")
    var newFiles = db.get("filePath")
    var navName = newFiles + "NavData.json"
    
    fs.readFile(path.join(navName), "utf8", (error, data) => {
      if (error) {
        event.sender.send("read-renda", {
          status: 0,
          msg: "目录数据存储失败",
        })
      } else {
        //取出数据处理后 返回所需数据
        let dataArr = JSON.parse(data)
        for (let i = 0; i < dataArr.length; i++) {
          if (arg == dataArr[i].name) {
            let dataList = JSON.stringify(dataArr[i].children)
            event.sender.send("read-renda", dataList)
          }
        }
      }
    })
  })
  // 解压文件时，创建对应的文件夹
  ipcMain.on("create-zipFile", (event, arg) => {
    // const storage = require("electron-localstorage")
    // var newFiles = storage.getItem("filesName")
    // var zip_name = storage.getItem("zipFiles")
    var newFiles = db.get("filePath")
    var zip_name = db.get("zipFiles")
    // var newFiles = db.get("userUid")
    let zipName = newFiles+"\\" + zip_name
    fs.exists( zipName,(exists)=>{
      let msgObj = {status:0} 
      if(exists){
          msgObj.status = 1
          let data = JSON.stringify(msgObj)
          event.sender.send("has-file", data) 
      }
      else{
          msgObj.status = 0
          let data = JSON.stringify(msgObj)
          event.sender.send("has-file", data) 
          fs.mkdirSync(zipName)
      }
  });
  })
}

app.whenReady().then(createWindow)

app.on("window-all-closed", () => {
  win = null
  if (process.platform !== "darwin") app.quit()
})

app.on("second-instance", () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

app.on("activate", () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    createWindow()
  }
})

// new window example arg: new windows url
ipcMain.handle("open-win", (event, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
    },
  })

  if (app.isPackaged) {
    childWindow.loadFile(indexHtml, { hash: arg })
  } else {
    childWindow.loadURL(`${url}/#${arg}`)
    // childWindow.webContents.openDevTools({ mode: "undocked", activate: true })
  }
})
