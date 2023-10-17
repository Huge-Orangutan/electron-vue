import { BrowserWindow } from "electron";

export class WindowItem implements IWindowItem{
  private static instance = new WindowItem();

  private static windowMap = new WeakMap<BrowserWindow, BrowserWindow>()

  static getWindowMapinstance = () => this.instance

  /** 当前的window实例 */
  private window?: BrowserWindow

  /** 创建 */
  createWindow(options?: Electron.BrowserWindowConstructorOptions | undefined) {
    this.window = new BrowserWindow(options)
    WindowItem.windowMap.set(this.window, this.window)
    return this
  }
  
  /** 获取windowsMap */
  getWindowMap() {
    return WindowItem.windowMap 
  }

  /** 
   *  获取window实例  
   *  -- 不传值就默认获取当前实例
   */
  getWindow(broswerWindow?: BrowserWindow) {
    return this.window && WindowItem.windowMap.get(broswerWindow || this.window)
  }
}

/** 创建一个windowMap实例 */
export const createWindowItem = (): CreateWindow => WindowItem.getWindowMapinstance()
