"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var url = require("url");
var fromBuild = false;
var win;
electron_1.app.on('ready', createWindow);
electron_1.app.on('activate', function () {
    if (win === null) {
        createWindow();
    }
});
//require('electron-reload')(__dirname, { electron: require('${__dirname}/../../node_modules/electron') });
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
    win.webContents.openDevTools();
    win.on('closed', function () {
        win = null;
    });
}
//# sourceMappingURL=main.js.map