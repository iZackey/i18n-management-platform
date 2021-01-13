const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const staticPath = 'static';
const staticDomain = '/public/';

module.exports = {
    outputDir: 'dist/' + staticPath,
    indexPath: '../index.html',
    publicPath: process.env.NODE_ENV === 'production' ? staticDomain + staticPath + '/' : '/',
    productionSourceMap: false,
    devServer: {
        host: 'dev.daydao.com',
        port: 7002,
        proxy: {
            //开发环境接口
            '/apiI18n': {
                target: 'https://lang.daydao.com',
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    '^/apiI18n': ''
                }
            },

            //本地接口
            '/apiILocal18n': {
                target: 'http://127.0.0.1:7001',
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    '^/apiILocal18n': ''
                }
            }
        }
    },
    configureWebpack: config => {
        config.resolve.alias['vue$'] = 'vue/dist/vue.esm.js';
        config.plugins.push(
            //解决moment打包的时候把所有的语言都打包进去的问题
            new webpack.ContextReplacementPlugin(
                /moment[\\/]locale$/,
                /^\.\/(zh-cn)$/
            )
        )

        if (process.env.NODE_ENV === 'production') {
            // 为生产环境修改配置...
            config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true; //去掉console
            config.plugins.push(
                //清理目录
                new CleanWebpackPlugin(['dist'], {
                    root: path.resolve(__dirname, './'),
                    verbose: true
                })
            )
        }
    },
    css: {
        loaderOptions: {
            sass: {
                prependData: '@import "@/style/var.scss";'
            }
        }
    }
}
