import { lstat } from 'fs/promises'
import { cwd } from 'process'
import { ipcRenderer } from 'electron'

// ipcRenderer.on('main-process-message', (_event, ...args) => {
//   console.log('接收主进程过来的消息===', ...args)
// })
// ipcRenderer.send('save-data',"我是渲染进程的消息")
lstat(cwd()).then(stats => {
  console.log('[fs.lstat]', stats)
}).catch(err => {
  console.error(err)
})
