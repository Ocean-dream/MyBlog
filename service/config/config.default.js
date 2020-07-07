/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1586142732218_6294';

  // 配置mysql
  config.mysql = {
    // database configuration
    client: {
      // host
      host: '101.201.253.124',  
      // host: 'localhost', 
      // port
      port: '3306',
      // username
      user: 'root',
      // password
      // password: '123456',
      password: '52541',
      // database
      database: 'react_blog',    
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  }

  // 配置egg-cors解决跨域
  config.security = {
    csrf: {
      enable: false
    },
    domainWhiteList: ['*']
  }
  config.cors = {
    origin: 'http://127.0.0.1:3000',
    credentials: true,
    allowMethods: 'GET,HEAD,PUT,DELETE,PATCH,OPTIONS,POST'
  }

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
