const { app, BrowserWindow, dialog } = require('electron');

let mainWindow = null;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    show: false,
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
    }
  });


  mainWindow.loadURL(`file://${__dirname}/index.html`);

  mainWindow.once('ready-to-show', () => {
    // mainWindow.webContents.openDevTools();
    mainWindow.show();
    getFileFromUser();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});

const getFileFromUser = () => {
  const files = dialog.showOpenDialog({
    properties: ['openFile']
  }).then(result => {
    console.log("filePath", result.filePaths);
  });
}
