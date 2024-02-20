const { app, BrowserWindow, dialog } = require('electron');
const fs = require('fs');

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
  let fileContent = null;

  dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [
      { name: 'Text Files', extensions: ['txt'] },
      { name: 'Markdown Files', extensions: ['md', 'markdown'] }
    ]    
  }).then(result => {
    console.log("filePath", result.filePaths);
    if (result.filePaths.length > 0) {
      const file = result.filePaths[0];
      fileContent = fs.readFileSync(file).toString();

      console.log('fileContent', fileContent);
    }
  });
}
