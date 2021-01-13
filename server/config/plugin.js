'use strict';

/** @type Egg.EggPlugin */
module.exports = {
    // had enabled by egg
    // static: {
    //   enable: true,
    // }

    //数据库连接插件
    mysql: {
        enable: true,
        package: 'egg-mysql',
    },

    //跨域插件
    cors: {
        enable: true,
        package: 'egg-cors'
    }
};
