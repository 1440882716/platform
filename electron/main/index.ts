import { app, BrowserWindow, shell, ipcMain,session  } from 'electron'
import { release } from 'os'
import { join } from 'path'
import fs from 'fs'
import path from 'path'

// Disable GPU Acceleration for Windows 7
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
// Here, you can also use other preload
const preload = join(__dirname, '../preload/index.js')
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin
const url = `http://${process.env['VITE_DEV_SERVER_HOST']}:${process.env['VITE_DEV_SERVER_PORT']}`
const indexHtml = join(ROOT_PATH.dist, 'index.html')

async function createWindow() {
  win = new BrowserWindow({
    title: 'Main window',
    fullscreen: true,
    icon: join(ROOT_PATH.public, 'favicon.ico'),
    webPreferences: {
      preload,
      // Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
      // Consider using contextBridge.exposeInMainWorld
      // Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
      nodeIntegration: true,
      contextIsolation: false,
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




  // 主进程与渲染进程通信
  ipcMain.on("save-data",(event,arg)=>{

      // 接受渲染进程的数据并存导本地
      fs.writeFile(path.join(__dirname, "../renderer/data.json"),arg, "utf8",(err)=>{
        if(err){
           event.sender.send('main-process-message', "写入失败"+err);
        }else {
          event.sender.send('main-process-message', "写入成功");
          // 读取本地文件发给渲染进程
          fs.readFile(path.join(__dirname, "../renderer/data.json"), "utf8",(error,data)=>{
            if(error){
               event.sender.send('read-file', "读取失败");
            }else {
              event.sender.send('read-file', data);
              
            }
          })
        }
      })
    
  })


  // ipcMain.on('download', (evt, args) => {
    // win.webContents.downloadURL("http://106.13.196.72:9000/npc/file/display/c9fd7a730230a7190f68311276bd0b37_1661248552327.jpeg")
    // downloadObj.downloadPath = args.downloadPath
    // downloadObj.fileName = args.fileName
    // let ext = path.extname(downloadObj.fileName)
    // let filters = [{ name: '全部文件', extensions: ['*'] }]
    // if (ext && ext !== '.') {
    //   filters.unshift({
    //     name: '',
    //     extensions: [ext.match(/[a-zA-Z]+$/)[0]]
    //   })
    // }
    // // 弹出另存为弹框，用于获取保存路径
    // dialog
    //   .showSaveDialog(win, {
    //     filters,
    //     defaultPath: downloadObj.fileName
    //   })
    //   .then((result) => {
    //     downloadObj.savedPath = result.filePath
    //     if (downloadObj.savedPath) {
    //       win.webContents.downloadURL(downloadObj.downloadPath) // 触发will-download事件
    //     }
    //   })
    //   .catch(() => {})
  // })
  // 下载
  win.webContents.downloadURL("http://106.13.196.72:9000/npc/file/display/c9fd7a730230a7190f68311276bd0b37_1661248552327.jpeg")
  win.webContents.session.on('will-download', (event:any, item:any, webContents:any) => {
    debugger
    // 无需对话框提示， 直接将文件保存到路径
    item.setSavePath('../renderer/img')
  
    // item.on('updated', (event, state) => {
    //   if (state === 'interrupted') {
    //     console.log('Download is interrupted but can be resumed')
    //   } else if (state === 'progressing') {
    //     if (item.isPaused()) {
    //       console.log('Download is paused')
    //     } else {
    //       console.log(`Received bytes: ${item.getReceivedBytes()}`)
    //     }
    //   }
    // })
    // item.once('done', (event, state) => {
    //   if (state === 'completed') {
    //     console.log('Download successfully')
    //   } else {
    //     console.log(`Download failed: ${state}`)
    //   }
    // })



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
