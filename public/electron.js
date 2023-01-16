const path = require("path");
const { app, ipcMain, BrowserWindow } = require("electron");
const electron = require("electron");
const isDev = require("electron-is-dev");
const fs = require("fs");
const { type } = require("os");
const { Buffer, Blob } = require("buffer");
const dataurl = require("dataurl");

function createWindow() {
    // Create the browser window.
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, "preload.js"),
        },
    });

    // and load the index.html of the app.
    // win.loadFile("index.html");
    win.loadURL(
        isDev
            ? "http://localhost:3000"
            : `file://${path.join(__dirname, "../build/index.html")}`
    );
    // Open the DevTools.
    if (isDev) {
        win.webContents.openDevTools({ mode: "detach" });
    }
}

async function handleSaveIntoFile(e, blobStr) {
    const userDataPath = (electron.app || electron.remote.app).getPath(
        "userData"
    );
    const nameOfFile = Date.now();
    const pathOfFile = path.join(userDataPath, nameOfFile + ".ogg");
    // const blob = new Blob([blobStr], { type: "plain/text" });
    // const arrayBuffer = await blob.arrayBuffer();
    // const buffer = Buffer.from(arrayBuffer);
    fs.writeFile(pathOfFile, blobStr, () => {
        return true;
    });
}

async function handleGetFilenames() {
    const userDataPath = (electron.app || electron.remote.app).getPath(
        "userData"
    );
    // const filenames = fs.readdir(userDataPath, { withFileTypes: true })
    //     .filter((item) => !item.isDirectory())
    //     .map((item) => item.name);

    let filenames = [];
    let filenamesStr = await new Promise((resolve, reject) => {
        fs.readdir(userDataPath, (err, files) => {
            if (err) console.log(err);
            else {
                files.forEach((file) => {
                    if (path.extname(file) == ".ogg") {
                        const filename = path.join(userDataPath, file);
                        //const filename = path.join("http://localhost:3000/", file);
                        filenames.push(filename);
                    }
                });
                resolve(filenames.join());
            }
        });
    });
    return filenamesStr;
}

const convertSong = (e, filePath) => {
    console.log("Reached here alright");
    const song = new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if(err) reject(err);
            console.log(data.toString());
            resolve(data);
        });
    });
    
    // const songPromise = new Promise((resolve, reject) => {
    //     fs.readFile(filePath, (err, data) => {
    //         if (err) {
    //             reject(err);
    //         }
    //         resolve(dataurl.convert({ data, mimetype: "audio/ogg" }));
    //     });
    // });
    return song;
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    ipcMain.handle("saveIntoFile", handleSaveIntoFile);
    ipcMain.handle("getAllFilenames", handleGetFilenames);
    ipcMain.handle("getSongURL", convertSong);
    createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
