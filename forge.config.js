/*
 * @Author: jares
 * @Date: 2024-05-29 00:05:29
 * @LastEditors: jares
 * @LastEditTime: 2024-05-29 00:05:45
 * @Description: 
 * 
 * Copyright (c) 2024 by jares, All Rights Reserved. 
 */
module.exports = {
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'github-user-name',
          name: 'github-repo-name'
        },
        prerelease: false,
        draft: true
      }
    }
  ]
}