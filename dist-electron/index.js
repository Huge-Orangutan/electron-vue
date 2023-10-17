"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const electron = require("electron");
const path = require("path");
const _WindowItem = class _WindowItem {
  constructor() {
    /** 当前的window实例 */
    __publicField(this, "window");
  }
  /** 创建 */
  createWindow(options) {
    this.window = new electron.BrowserWindow(options);
    _WindowItem.windowMap.set(this.window, this.window);
    return this;
  }
  /** 获取windowsMap */
  getWindowMap() {
    return _WindowItem.windowMap;
  }
  /** 
   *  获取window实例  
   *  -- 不传值就默认获取当前实例
   */
  getWindow(broswerWindow) {
    return this.window && _WindowItem.windowMap.get(broswerWindow || this.window);
  }
};
__publicField(_WindowItem, "instance", new _WindowItem());
__publicField(_WindowItem, "windowMap", /* @__PURE__ */ new WeakMap());
__publicField(_WindowItem, "getWindowMapinstance", () => _WindowItem.instance);
let WindowItem = _WindowItem;
const createWindowItem = () => WindowItem.getWindowMapinstance();
const getWindowItem = createWindowItem();
electron.app.whenReady().then(() => {
  const mainWindow = getWindowItem.createWindow().getWindow();
  if (process.env["NODE_ENV"] === "development") {
    console.log(mainWindow);
    mainWindow.loadURL("http://127.0.0.1:5173");
  } else {
    mainWindow.loadFile(path.join(__dirname, "../renderer/index.html"));
  }
  electron.app.on("activate", () => {
    if (electron.BrowserWindow.getAllWindows().length === 0) {
      getWindowItem.createWindow().getWindow();
    }
  });
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
  }
});
