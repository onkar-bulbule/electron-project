const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    saveIntoFile: (blobStr) => ipcRenderer.invoke("saveIntoFile", blobStr),
    getAllFilenames: () => ipcRenderer.invoke("getAllFilenames"),
    getSongURL: (path) => ipcRenderer.invoke("getSongURL", path),
});
