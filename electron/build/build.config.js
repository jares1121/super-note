/*
 * @Author: jares
 * @Date: 2023-01-03 22:07:25
 * @LastEditors: jares
 * @LastEditTime: 2023-01-04 11:29:43
 * @Description:
 *
 * Copyright (c) 2023 by jares, All Rights Reserved.
 */
const path = require('path')

const config = {
	productName: '新睿软件',
	appId: 'com.electron.jares',
	copyright: 'Copyright © 2023 ${author}',
	asar: true,
	directories: {
		output: 'release/${version}'
	},
	win: {
		icon: path.join(__dirname, '../static/images/favicon.ico'),
		target: [
			{
				target: 'nsis',
				arch: ['x64', 'ia32']
			}
		]
	},
	nsis: {
		oneClick: false,
		allowElevation: true,
		allowToChangeInstallationDirectory: true,
		installerIcon: path.join(__dirname, '../static/images/favicon.ico'),
		uninstallerIcon: path.join(__dirname, '../static/images/favicon.ico'),
		installerHeaderIcon: path.join(__dirname, '../static/images/favicon.ico'),
		createDesktopShortcut: true,
		createStartMenuShortcut: true,
		shortcutName: '新睿软件'
	}
}
module.exports = config
