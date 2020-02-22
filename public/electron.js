const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Log = require("electron-log");
const { autoUpdater } = require("electron-updater");
const isDev = require("electron-is-dev");
const Path = require("path");

let win;

//-------------------------------------------------------------------
// Logger
//-------------------------------------------------------------------

autoUpdater.logger = Log;
autoUpdater.logger.transports.file.level = "info";

const sendStatusToWindow = text => {
  Log.info(text);
  win.webContents.send("message", text);
};

//-------------------------------------------------------------------
// IPC Communication
//-------------------------------------------------------------------

const ipcEventsCommunication = require("./ipcEventsCommunication.js");

//-------------------------------------------------------------------
// Window
//-------------------------------------------------------------------

const createDefaultWindow = () => {
  win = new BrowserWindow({
    width: 900,
    height: 680,
    webPreferences: {
      nodeIntegration: true,
      preload: Path.join(__dirname, "preload.js")
    }
  });
  if (isDev) {
    win.webContents.openDevTools();
  }
  win.on("closed", () => {
    win = null;
  });
  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${Path.join(
          __dirname,
          `../build/index.html#v${app.getVersion()}`
        )}`
  );
  return win;
};

app.on("ready", () => {
  // Create the Menu
  // const menu = Menu.buildFromTemplate(template);
  // Menu.setApplicationMenu(menu);
  try {
    createDefaultWindow();
    autoUpdater.checkForUpdatesAndNotify();
  } catch (error) {
    Log.info("Startup Sequence Error:", error);
  }
});

app.on("window-all-closed", () => {
  app.quit();
});

//-------------------------------------------------------------------
// Auto-Updater
//-------------------------------------------------------------------

autoUpdater.on("checking-for-update", () => {
  sendStatusToWindow("Checking for update...");
});
autoUpdater.on("update-available", info => {
  sendStatusToWindow("Update available.");
});
autoUpdater.on("update-not-available", info => {
  sendStatusToWindow("Update not available.");
});
autoUpdater.on("error", err => {
  sendStatusToWindow("Error in auto-updater. " + err);
});
autoUpdater.on("download-progress", progressObj => {
  let log_message = "Download speed: " + progressObj.bytesPerSecond;
  log_message = log_message + " - Downloaded " + progressObj.percent + "%";
  log_message =
    log_message +
    " (" +
    progressObj.transferred +
    "/" +
    progressObj.total +
    ")";
  sendStatusToWindow(log_message);
});
autoUpdater.on("update-downloaded", info => {
  sendStatusToWindow("Update downloaded");
});

//-------------------------------------------------------------------
// Comments
//-------------------------------------------------------------------

//
// CHOOSE one of the following options for Auto updates
//

//-------------------------------------------------------------------
// Auto updates - Option 1 - Simplest version
//
// This will immediately download an update, then install when the
// app quits.
//-------------------------------------------------------------------

//-------------------------------------------------------------------
// Auto updates - Option 2 - More control
//
// For details about these events, see the Wiki:
// https://github.com/electron-userland/electron-builder/wiki/Auto-Update#events
//
// The app doesn't need to listen to any events except `update-downloaded`
//
// Uncomment any of the below events to listen for them.  Also,
// look in the previous section to see them being used.
//-------------------------------------------------------------------
// app.on('ready', function()  {
//   autoUpdater.checkForUpdates();
// });
// autoUpdater.on('checking-for-update', () => {
// })
// autoUpdater.on('update-available', (info) => {
// })
// autoUpdater.on('update-not-available', (info) => {
// })
// autoUpdater.on('error', (err) => {
// })
// autoUpdater.on('download-progress', (progressObj) => {
// })
// autoUpdater.on('update-downloaded', (info) => {
//   autoUpdater.quitAndInstall();
// })
