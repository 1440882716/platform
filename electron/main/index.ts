import { app, BrowserWindow, shell, ipcMain,session  } from 'electron'
import { release } from 'os'
import { join } from 'path'
import fs from 'fs'
import path from 'path'
import { json } from 'node:stream/consumers'
import { string } from 'yargs'

if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

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
  dist: join(__dirname, '../..'),
  // /dist or /public
  public: join(__dirname, app.isPackaged ? '../..' : '../../../public'),
  
}

let win: BrowserWindow | null = null
// 下载文件的保存地址和下载的序号version
let savePath:string
let version:string
// Here, you can also use other preload
const preload = join(__dirname, '../preload/index.js')
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin
const url = `http://${process.env['VITE_DEV_SERVER_HOST']}:${process.env['VITE_DEV_SERVER_PORT']}`
const indexHtml = join(ROOT_PATH.dist, 'index.html')

async function createWindow() {
  win = new BrowserWindow({
    title: 'Main window',
    // fullscreen: true,
    width:1000,
    height:800,
    // frame: false,
    icon: join(ROOT_PATH.public, 'favicon.ico'),
    webPreferences: {
      preload,
      // Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
      // Consider using contextBridge.exposeInMainWorld
      // Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false

    },
    
  })

  if (app.isPackaged) {
    win.loadFile(indexHtml)
  } else {
    win.loadURL(url)
    // Open devTool if the app is not packaged
    win.webContents.openDevTools()
  }

  // Test actively push message to the Electron-Renderer
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString())
  })

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url)
    return { action: 'deny' }
  })



  // 下载
  const filesDown=(win:any,downPath:string,savePath:string,filesNum:number,filesCount:number)=>{
    win.webContents.downloadURL(downPath)
    win.webContents.session.on('will-download', (event:any, item:any, webContents:any) => {
      let url = savePath+`\\${item.getFilename()}`;
      item.setSavePath(url);
      item.once('done', (event:any, state:any) => {
        if (state === 'completed') {
          //  将下载进度写入本地文件
          let obj = {version:filesNum}
          let dataV= JSON.stringify(obj)
          fs.writeFile("D:\\version.json", dataV,  (err)=> {
            if (err) {
            }else{
              // if(filesCount == filesNum){
              //   let obj = {state:"ok"}
              //   let data = JSON.stringify(obj)
              //   win.webContents.send('down-over', data);
              // }
            }
          });
        } else {
        }
      })
    })
  }

  // 主进程监听渲染进程的消息
  // 保存目录
  ipcMain.on("save-data",(event,arg)=>{
    // const navContent = arg
    // const file = './src/renderer/data.json';
    // fs.access(file, fs.constants.W_OK, (err) => {
    //     if(err){
    //     event.sender.send('has-render-data', {
    //       "status" : 0 ,
    //       "msg"    : "该文件不可写"
    //       });
    //   }else{
    //     event.sender.send('has-render-data', {
    //       "status" : 0 ,
    //       "msg"    : "该文件可写"
    //       });
    //   }
    //   }); 
    // console.log("content===",arg);
    
    fs.writeFile("D:\\navData.json", arg,  (err)=> {
      if (err) {
        // console.log(err);
      }
      // console.log("=======success");
    });
    
  })
  // 保存下载文件
  ipcMain.on("down-file-list",(event,arg)=>{
    fs.writeFile("D:\\fileData.json", arg,  (err)=> {
      if (err) {
        console.log(err);
      }else{
         const storage = require('electron-localstorage');
         // 读本地文件目录并且下载
         fs.readFile(path.join("D:\\fileData.json"), "utf8",(error,data)=>{  
           if(error){
             // 文件读取失败;
           }else {
             let fileList = JSON.parse(data)
             let baseurl = "http://106.13.196.72:9000"
             // 获取文件的安装地址
            //  let homeDir =  path.dirname(app.getPath('exe'))
             let homeDir = "D:\\"
             // console.log("set-------",homeDir);
             let newFiles = storage.getItem("filesName")
             // 创建对应地区的文件夹
             let filesPath="";
             fs.mkdir(path.join(homeDir, newFiles), (err) => { 
               if (err) { 
               // 该文件夹已经存在
                 if(err.code == "EEXIST"){
                   filesPath = err.path as string
                 }
                 console.log("creating is error ====",err);
                 let filesCount = fileList[fileList.length-1].version
                 for(let i=0;i<fileList.length;i++){
                   filesDown(win,baseurl+fileList[i].url,filesPath,fileList[i].version,filesCount)
                 }
               }else{
                 // 文件夹创建成功,讲下载的文件放入这个文件夹
                 filesPath = homeDir+newFiles
                 let filesCount = fileList[fileList.length-1].version
                 for(let i=0;i<fileList.length;i++){
                   filesDown(win,baseurl+fileList[i].url,filesPath,fileList[i].version,filesCount)
                 }
               }
               // 将文件下载的目录缓存
               storage.setItem('filePath',filesPath)
               
                // 遍历文件下载
              
             });
           }
         })
      }
    });

    // // 接受渲染进程的数据并存导本地
    // fs.writeFile(path.join("./src/renderer/files.json"),arg, "utf8",(err)=>{
    //   if(err){
    //     //  event.sender.send('main-process-message', "下载文件写入失败"+err);
    //   }else {
    //     // event.sender.send('main-process-message', "下载文件写入成功");
    //     const storage = require('electron-localstorage');
    //     // 读本地文件目录并且下载
    //     fs.readFile(path.join("./src/renderer/files.json"), "utf8",(error,data)=>{  
    //       if(error){
    //         // 文件读取失败;
    //       }else {
    //         let fileList = JSON.parse(data)
    //         let baseurl = "http://106.13.196.72:9000"
    //         // 获取文件的安装地址
    //         let homeDir =  path.dirname(app.getPath('exe'))
    //         // let homeDir = "D:\\"
    //         // console.log("set-------",homeDir);
    //         let newFiles = storage.getItem("filesName")
    //         // 创建对应地区的文件夹
    //         let filesPath="";
    //         fs.mkdir(path.join(homeDir, newFiles), (err) => { 
    //           if (err) { 
    //           // 该文件夹已经存在
    //             if(err.code == "EEXIST"){
    //               filesPath = err.path as string
    //             }
    //             console.log("creating is error ====",err);
    //             // console.log("save path is =====",filesPath);
    //             for(let i=0;i<fileList.length;i++){
    //               filesDown(win,baseurl+fileList[i].url,filesPath,fileList[i].version)
    //             }
    //           }else{
    //             // 文件夹创建成功,讲下载的文件放入这个文件夹
    //             console.log('Directory created successfully!'); 
    //             // let homePath = homeDir.replace(/\\/g, "\\\\")
    //             filesPath = homeDir+"\\"+newFiles
    //             console.log("files down path is =====",filesPath);
    //             for(let i=0;i<fileList.length;i++){
    //               filesDown(win,baseurl+fileList[i].url,filesPath,fileList[i].version)
    //             }
    //           }
    //           // 将文件下载的目录缓存
    //           storage.setItem('filePath',filesPath)
              
    //            // 遍历文件下载
             
    //         });
    //       }
    //     })
    //   }
    // })
})
// 登录页获取下载进度
ipcMain.on("get-version",(event,arg)=>{
  if(arg == "getVersion"){
    fs.readFile(path.join("D:\\version.json"), "utf8",(error,data)=>{
      if(error){
        let obj = {version:0}
        let data = JSON.stringify(obj)
        event.sender.send('read-version', data);
      }else {
        event.sender.send('read-version', data);
        
      }
    })
  }
   
 
})
// 首页获取目录信息
ipcMain.on("get-nav",(event,arg)=>{
  if(arg == "getNav"){
    fs.readFile(path.join("D:\\navData.json"), "utf8",(error,data)=>{
      if(error){
      }else {
        event.sender.send('read-nav', data);
        
      }
    })
  }else{
  }
})
// 获取对应children里面的内容
ipcMain.on("get-data",(event,arg)=> {
  // fs.readFile(path.join("./src/renderer/data.json"), "utf8",(error,data)=>{
  fs.readFile(path.join("D:\\navData.json"), "utf8",(error,data)=>{
    if(error){
      //  event.sender.send('read-renda', "读取失败");
      event.sender.send('read-renda', {
        "status" : 0 ,
        "msg"    : "目录数据存储失败"
        });
    }else {
      //取出数据处理后 返回所需数据  
      let dataArr = JSON.parse(data)
      for(let i=0;i<dataArr.length;i++){
        if(arg == dataArr[i].name){
          let dataList = JSON.stringify(dataArr[i].children)
          event.sender.send('read-renda', dataList);
        }
      }
      // for(let i=0;i<dataArr.length;i++){
      //   if(dataArr[i].name==arg){
      //     let dataList = JSON.stringify(dataArr[i].children)
      //     event.sender.send('read-renda', dataList);
      //   }
      // }
    }
  })

})




}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  win = null
  if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    createWindow()
  }
})

// new window example arg: new windows url
ipcMain.handle('open-win', (event, arg) => {
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
