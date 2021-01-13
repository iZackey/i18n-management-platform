/* eslint valid-jsdoc: "off" */

'use strict';
const path = require('path');

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
    config.keys = appInfo.name + '_1578387089235_8916';

    // add your middleware config here
    config.middleware = ['auth'];

    config.cluster = {
        listen: {
            port: 7001,
            // hostname: '127.0.0.1', // 不建议设置 hostname 为 '0.0.0.0'，它将允许来自外部网络和来源的连接，请在知晓风险的情况下使用
            // path: '/var/run/egg.sock',
        }
    };

    //token安全验证
    config.security = {
        csrf: {
            headerName: 'x-csrf-token',// 自定义请求头
        }
    }

    //静态资源路径配置
    exports.static = {
        prefix: '/public/',
        dir: path.join(appInfo.baseDir, 'public'),
        gzip: true
    }

    // add your user config here
    const userConfig = {
        // myAppName: 'egg',
    };

    const mysqlConfig = {
        mysql: {
            // 单数据库信息配置
            client: {
                // host
                host: 'localhost',
                // 端口号
                port: '3306',
                // 用户名
                user: 'root',
                // 密码
                password: 'root',
                // 数据库名
                database: 'daydao_fed_i18n',
            },
            // 是否加载到 app 上，默认开启
            app: true,
            // 是否加载到 agent 上，默认关闭
            agent: false,
        },
    };

    //跨域配置
    const corsConfig = {
        security:{
            csrf: {
                enable: false
            },
            domainWhiteList:['*'],
        },
        cors:{
            origin: '*',
            allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
        }
    };

    return {
        ...config,
        ...userConfig,
        ...mysqlConfig,
        ...corsConfig,
    };
};
