# 多语言包管理平台

> 随着越来越多的项目需要做多语言包管理，语言包文件变得越来越庞大，传统的考手动维护语言包变得越来越费力，总是会出现中英文对不上，或者漏掉翻译的情况，该平台可以系统的管理这些语言包。

> 该平台采用 Node.js + Egg.js + Mysql + Vue + ElementUI 作为技术栈，便于前端同学维护。

## 目录结构说明

```text
|- front-end  //后端部分
|- server //前端部分
```

## 部署说明

首先需要一台服务器主机，操作系统可以是windows或者Linux，安装好Node环境、Mysql数据库环境。

* 创建一个新数据库，数据名假如取名为`fed_i18n`，字符编码为utf8 .
* 进入`/server/data_bakup`目录找到data.sql, 把该sql脚本执行恢复到`fed_i18n`数据库中。
* 进入`/config/config.default.js`文件，修改数据库连接配置。
* 进入`/front-end`目录，执行`npm i`命令，再执行`npm run build`编译前端部分代码，将生成的`dist`目录中的代码全部拷贝至`/server/public`目录中。
* 进入`/server/`并运行`npm run start`把后端项目跑起来，这个时候在浏览器访问`http://127.0.0.1:7001/`即可打开本项目。
* 最后就可以注册帐号登录尽情体验了！