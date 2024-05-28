/*
 * @Author: jares
 * @Date: 2022-12-28 17:56:16
 * @LastEditors: jares
 * @LastEditTime: 2023-01-09 23:19:39
 * @Description:
 *
 * Copyright (c) 2023 by jares, All Rights Reserved.
 */
// const os = require('os')
const { contextBridge, ipcRenderer } = require('electron')
window.addEventListener('DOMContentLoaded', () => {
	const replaceText = (selector, text) => {
		const element = document.getElementById(selector)
		if (element) element.innerText = text
	}

	for (const dependency of ['chrome', 'node', 'electron']) {
		replaceText(`${dependency}-version`, process.versions[dependency])
	}
})
contextBridge.exposeInMainWorld('electronAPI', {
	// platform: os.platform(),
	electron: () => process,
	maximize: (params) => ipcRenderer.send('maximize', params),
	unmaximize: (params) => ipcRenderer.send('unmaximize', params),
	minimize: (params) => ipcRenderer.send('minimize', params),
	restore: (params) => ipcRenderer.send('restore', params),
	close: (params) => ipcRenderer.send('close', params),
	reset: (params) => ipcRenderer.send('reset', params),
	submit: (params) => ipcRenderer.send('submit', params)
})
contextBridge.exposeInMainWorld('musicAPI', {
	play: (params) => ipcRenderer.send('musicPlay', params)
})
contextBridge.exposeInMainWorld('trayAPI', {
	quit: (params) => ipcRenderer.send('quit', params)
})
