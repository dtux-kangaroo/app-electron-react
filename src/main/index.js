import { app, BrowserWindow , ipcMain} from 'electron';
import MenuBuilder from './menu';
const path = require('path');
const server=require('../../build/server.conf')
let win = null;

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const extensions = ['REACT_DEVELOPER_TOOLS','REDUX_DEVTOOLS']; //
  return Promise.all(
    extensions.map(name => installer.default(installer[name]))
  ).catch('start...error');
};

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', async () => {
  win = new BrowserWindow({
    show:false,
    width: 1024,
    height: 728,
    frame: false,
  });
  if (process.env.NODE_ENV === 'development') {
    win.loadURL(`http://${server.host}:${server.port}/index.html`);
    await installExtensions(); //用于调试代码
    win.webContents.openDevTools(); 
  }else{
    win.loadURL(`file://${path.resolve(__dirname, './index.html')}`);
  }
  win.webContents.on('did-finish-load', () => {
    if (!win) {
      throw new Error('"win" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      win.minimize();
    } else {
      win.show();
      win.focus();
    }
  });
 
  win.on('closed', () => {
    win = null;
  });
  ipcMain.on("loadingSuccess", (event) => {
    win.setResizable(true);
    event.returnValue = 'setSuccess'
  });
  ipcMain.on("headerType", (event, args) => {
    switch (args) {
      case 'minimize':
      if (process.platform === 'darwin') {
        if (win.isFullScreen()) {
          win.setFullScreen(false);
        }
      }
      //win.unmaximize(); 
      win.minimize();break;
      case 'restore':
        if (process.platform === 'darwin') {
          if (win.isFullScreen()) {
            win.setFullScreen(false);
          }
        }
          win.unmaximize();
        break;
      case 'maximize':
        if (process.platform === 'darwin') {
          win.setFullScreen(true);
        } else {
          win.maximize();
        }
        break;
      case 'close': win && win.close();break;
      default: break;
    }
    event.returnValue = 'setSuccess'
  });

  const menuBuilder = new MenuBuilder(win);
  menuBuilder.buildMenu();
});
