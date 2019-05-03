import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';
import { setInterval } from 'timers';

let fromBuild: boolean = false;

let win: BrowserWindow;

app.on('ready', createWindow)

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
    },
  })

  if (fromBuild) {
    win.loadURL(
      url.format({
        pathname: path.join(__dirname, '../../dist/recall/index.html'),
        protocol: 'file:',
        slashes: true,
      })
    )
  } else {
    win.loadURL("http://localhost:4200");
  }

  win.webContents.once('dom-ready', () => {
    win.webContents.send("fromBuild", fromBuild);
  });

  app.getAppPath;

  setInterval(() => { 
    console.log(win.webContents.getURL());
  },1000)

  win.webContents.openDevTools()

  win.on('closed', () => {
    win = null
  })
}
