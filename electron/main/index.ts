import { app, BrowserWindow, } from 'electron';

import { join } from 'path'

import { createWindowItem } from './window'

/** 创建一个实例 */
const getWindowItem = createWindowItem()


app.whenReady().then(() => {
  const mainWindow= getWindowItem.createWindow().getWindow();
  if (process.env['NODE_ENV'] === 'development') {
    console.log(mainWindow)
    mainWindow.loadURL('http://127.0.0.1:5173')
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      const mainWindowItem = getWindowItem.createWindow().getWindow();
    }
  });
});

app.on('window-all-closed', () => {
  /** 如果是苹果的话就调用退出 */
  if (process.platform !== 'darwin') {
    app.quit();
  }
});