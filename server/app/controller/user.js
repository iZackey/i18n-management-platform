'use strict';
const Controller = require('egg').Controller;
const oRegExp = require('../utils/regexpRules.js');

class UserController extends Controller {
    async addUser() {
        const { ctx } = this;
        let query = ctx.request.body;
        if (!query.mobile) {
            ctx.body = {
                result: 'false',
                resultDes:'手机号不能为空'
            }
            return;
        }
        if (!query.dd) {
            ctx.body = {
                result: 'false',
                resultDes:'dd号不能为空'
            }
            return;
        }
        if (!query.user_name) {
            ctx.body = {
                result: 'false',
                resultDes:'用户名不能为空'
            }
            return;
        }

        const result = await ctx.service.languageUser.add(query);
        ctx.body = result || {
            result: 'false',
            resultDes: '操作失败'
        }
    }

    async getList(){
        const { ctx } = this;
        let query = ctx.request.body;
        if (!query.pageSize) {
            ctx.body = {
                result: 'false',
                resultDes:'pageSize不能为空'
            }
            return;
        }
        if (!query.pageNo) {
            ctx.body = {
                result: 'false',
                resultDes:'pageNo不能为空'
            }
            return;
        }
        const result = await ctx.service.languageUser.list(query);
        ctx.body = result || {
            result: 'false',
            resultDes: '操作失败'
        }
    }

    //登录
    async login(){
        const { ctx } = this;
        let query = ctx.request.body;

        if (!query.account) {
            ctx.body = {
                result: 'false',
                resultDes:'帐号不能为空'
            }
            return;
        }
        if (!query.password) {
            ctx.body = {
                result: 'false',
                resultDes:'密码不能为空'
            }
            return;
        }

        //如果是用的手机号登录，说明是daydao手机号登录的方式
        if (oRegExp.mobile.test(query.account)) {
            const result = await ctx.curl('https://assembly-java.daydao.com/user/login', {
                // 必须指定 method
                method: 'POST',
                // 通过 contentType 告诉 HttpClient 以 JSON 格式发送
                contentType: 'json',
                data: {
                    userName: query.account,
                    password: query.password,
                },
                // 明确告诉 HttpClient 以 JSON 格式处理返回的响应 body
                dataType: 'json',
            });

            if (result.data) {
                if (result.data.result == 'true') {
                    const userInfo = result.data.bean || {};
                    ctx.session.user_name = userInfo.userName;
                    ctx.session.dd = userInfo.dd;
                    ctx.session.mobile = userInfo.account;

                    const params = {
                        user_name: userInfo.userName,
                        dd: userInfo.dd,
                        mobile: userInfo.account
                    };
                    const result2 = await ctx.service.languageUser.add(params);

                    if (result2) {
                        ctx.body = { ...result2, userInfo: params };
                    } else {
                        ctx.body = {
                            result: 'false',
                            resultDes: '操作失败'
                        }
                    }
                }
                else {
                    ctx.body = {
                        result: 'false',
                        resultDes: result.data.message || '登录失败'
                    }
                }
            } else {
                ctx.body = {
                    result: 'false',
                    resultDes: '登录失败'
                }
            }
        } else {
            //用邮箱登录的情况
            const result = await ctx.service.languageUser.queryUserByEmail(query);
            if (result.userInfo) {
                const userInfo = result.userInfo;
                ctx.session.user_name = userInfo.user_name || '';
                ctx.session.mobile = userInfo.mobile || '';
                ctx.session.email = userInfo.email || '';
            }
            ctx.body = result || {
                result: 'false',
                resultDes: '操作失败'
            }
        }

    }

    //注册
    async register() {
        const { ctx } = this;
        let query = ctx.request.body;
        if (!query.nickName) {
            ctx.body = {
                result: 'false',
                resultDes: '昵称不能为空'
            }
            return;
        }
        if (!query.email) {
            ctx.body = {
                result: 'false',
                resultDes: '邮箱账号不能为空'
            }
            return;
        }
        if (!query.password) {
            ctx.body = {
                result: 'false',
                resultDes: '密码不能为空'
            }
            return;
        }
        const result = await ctx.service.languageUser.register(query);
        ctx.body = result || {
            result: 'false',
            resultDes: '操作失败'
        }
    }

    //退出
    async logout(){
        const { ctx } = this;
        ctx.session = null;
        ctx.body = {
            result: 'true'
        }
    }

}

module.exports = UserController;
