"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var url = require("url");
var timers_1 = require("timers");
var fromBuild = false;
var win;
electron_1.app.on('ready', createWindow);
electron_1.app.on('activate', function () {
    if (win === null) {
        createWindow();
    }
});
function createWindow() {
    win = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            webSecurity: false,
            nodeIntegration: true,
        },
    });
    if (fromBuild) {
        win.loadURL(url.format({
            pathname: path.join(__dirname, '../../dist/recall/index.html'),
            protocol: 'file:',
            slashes: true,
        }));
    }
    else {
        win.loadURL("http://localhost:4200");
    }
    win.webContents.once('dom-ready', function () {
        win.webContents.send("fromBuild", fromBuild);
    });
    electron_1.app.getAppPath;
    timers_1.setInterval(function () {
        console.log(win.webContents.getURL());
    }, 1000);
    win.webContents.openDevTools();
    win.on('closed', function () {
        win = null;
    });
}
//# sourceMappingURL=main.js.map