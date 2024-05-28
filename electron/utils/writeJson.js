const fs = require('fs')
const path = require('path')
/**
 * @description: 写入数据到JSON文件
 * @param {*} jsonFile 文件路径
 * @param {*} data 文件数据
 * @return {*}
 */
let writeJsonData = (jsonFile, data) => {
	// 将JSON对象转换为字符串
	const jsonString = JSON.stringify(data)

	fs.readFile(jsonFile, 'utf8', (err, fileContent) => {
		if (err) {
			if (err.code === 'ENOENT') {
				// 如果文件不存在，则创建文件并写入数组形式的JSON
				fs.writeFile(
					jsonFile,
					'[' + jsonString + ']',
					(writeErr) => {
						if (writeErr) throw writeErr
					}
				)
			} else {
				throw err
			}
		} else {
			// 文件存在，检查内容是否已经是JSON数组
			try {
				const parsedContent = JSON.parse(fileContent)
				if (!Array.isArray(parsedContent)) {
					// 如果不是数组，转换当前内容为数组，并追加新数据
					const newData = [parsedContent, data]
					const updatedContent = JSON.stringify(newData)
					fs.writeFile(
						jsonFile,
						updatedContent,
						(writeErr) => {
							if (writeErr) throw writeErr
						}
					)
				} else {
					// 如果是数组，直接追加新数据
					const updatedContent =
						fileContent.trim().slice(0, -1) + ',' + jsonString + ']'
					fs.writeFile(
						jsonFile,
						updatedContent,
						(writeErr) => {
							if (writeErr) throw writeErr
						}
					)
				}
			} catch (parseErr) {
				// 如果文件内容不是有效的JSON，则当作新文件处理
				console.error(
					'Existing file content is not valid JSON. Creating a new array.'
				)
				fs.writeFile(
					jsonFile,
					'[' + jsonString + ']',
					(writeErr) => {
						if (writeErr) throw writeErr
					}
				)
			}
		}
	})
}
module.exports = writeJsonData
