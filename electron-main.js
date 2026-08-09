const { app, BrowserWindow } = require("electron");

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    title: "Kai-Netz",
    backgroundColor: "#0d0f12",
    webPreferences: {
      contextIsolation: true,
    },
  });

  // Electron-Menü entfernen
  win.removeMenu();

  // Scrollbar komplett verstecken
  win.webContents.insertCSS(`
        ::-webkit-scrollbar {
            width: 0px !important;
            height: 0px !important;
            display: none !important;
        }

        ::-webkit-scrollbar-track {
            display: none !important;
        }

        ::-webkit-scrollbar-thumb {
            display: none !important;
        }
    `);

  win.loadURL("https://kainetz.dpdns.org/");
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
