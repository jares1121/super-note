const { app, BrowserWindow, Menu } = require('electron')

var menu = Menu.buildFromTemplate([
	{
		label: '文件',
		submenu: [
			{
				label: '新建',
				click: () => {
					app.hide()
				}
			},
			{
				label: '重启',
				click: () => {
					app.relaunch()
					app.exit(0)
				}
			},
			{
				label: '退出',
				click: () => {
					app.quit()
				}
			}
		]
	}
])
Menu.setApplicationMenu(menu)
