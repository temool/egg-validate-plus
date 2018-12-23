'use strict';
const path = require('path');
/**
 * 参数校验文件放在 /app/rules 下
 */
module.exports = app => {
  const directory = path.join(app.config.baseDir, 'app/rules');
  app.loader.loadToApp(directory, 'rules');
};
