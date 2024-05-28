/*
 * @Author: jares
 * @Date: 2022-12-28 17:56:14
 * @LastEditors: jares
 * @LastEditTime: 2024-05-28 23:41:45
 * @Description:
 *
 * Copyright (c) 2022 by jares, All Rights Reserved.
 */
const path = require('path')
const { app, BrowserWindow, shell, dialog } = require('electron')
const writeJsonData = require('../utils/writeJson.js')
// const menu = require('./menu.js')
try {
	require('electron-reloader')(module)
} catch (_) {}
var mainWindow
function createWindow() {
	mainWindow = new BrowserWindow({
		width: 1200,
		height: 800,
		resizable:false,
		icon: path.join(__dirname, '/static/images/icon.png'),
		webPreferences: {
			preload: path.join(__dirname, 'preload.js')
		},
		backgroundColor: 'rgb(255, 145, 145)',
		frame: false, // 无边框窗口
		transparent: false // 窗口透明
	})
	mainWindow.loadFile(path.join(__dirname, '../html/test.html'))
	// mainWindow.loadURL('http://localhost:8080')
	mainWindow.webContents.openDevTools()
	module.exports = { mainWindow }
}
function openShell() {
	let filePath = path.join(__dirname, './bat.bat')
	shell.openPath(filePath)
}
app.whenReady().then(() => {
	createWindow()
	app.on('activate', function () {
		if (BrowserWindow.getAllWindows().length === 0) createWindow()
		// menu()
	})
	const tray = require('./tray.js')
	// openShell()
})
const { ipcMain } = require('electron')

ipcMain.on('minimize', (event, message) => {
	console.log(`receive message from render: ${message}`)
	mainWindow.minimize()
})
ipcMain.on('maximize', (event, message) => {
	console.log(`receive message from render: ${message}`)
	if (mainWindow.isMaximized()) {
		mainWindow.restore()
	} else {
		mainWindow.maximize()
	}
})
ipcMain.on('close', (event, message) => {
	console.log(`receive message from render: ${message}`)
	mainWindow.close()
})
ipcMain.on('quit', (event, message) => {
	console.log(`receive message from render: ${message}`)
	app.quit()
})
ipcMain.on('submit', async (event, message) => {
	// 假设你要写入的JSON文件名为data.json
	const jsonFile = path.join(__dirname, 'data.json') // 文件路径
	// 写入数据到JSON文件
	const data = { createTime: Date.parse(new Date()), text: message }
	writeJsonData(jsonFile, data)
})
