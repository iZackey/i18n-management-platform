/**
 * 首页控制器
*/

'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
    //默认首页
    async index() {
        const { ctx } = this;
        const requestUrl = 'http://127.0.0.1:7001/public/index.html'; //内网请求当前项目中的 /public/index.html文件
        const result = await ctx.curl(requestUrl, {
            // 必须指定 method
            method: 'GET',
            dataType:'text'
        });
        ctx.body = result.data;
    }

    //获取json内容
    async getLibInfo() {
        const { ctx } = this;
        let query = ctx.request.body;
        const id = query.id;
        const result = await ctx.service.languageLib.getLibInfo(id);
        ctx.body = result || {
            result: 'false',
            resultDes: '获取数据失败'
        }
    }


    //插入json数据
    async addLib() {
        const { ctx } = this;
        let query = ctx.request.body;
        const type = query.type;
        const name = query.name;
        if (!type || !name) {
            ctx.body = {
                result: 'false',
                resultDes: '类型(type) 或 名称(name) 为空了，添加失败'
            }
            return;
        }

        const result = await ctx.service.languageLib.addLib(null, { type, name });
        ctx.body = result || {
            result: 'false',
            resultDes: '操作失败'
        }
    }

    async editLib(){
        const { ctx } = this;
        let query = ctx.request.body;
        const type = query.type;
        const name = query.name;
        const id = query.id;
        if (!name || !id) {
            ctx.body = {
                result: 'false',
                resultDes: 'id 或 名称(name) 为空了，修改失败'
            }
            return;
        }
        const result = await ctx.service.languageLib.addLib(id, { type, name });
        ctx.body = result || {
            result: 'false',
            resultDes: '操作失败'
        }
    }

    async deleteLib(){
        const { ctx } = this;
        let query = ctx.request.body;
        const id = query.id;
        if (!id) {
            ctx.body = {
                result: 'false',
                resultDes: 'id不能为空'
            }
            return;
        }
        const result = await ctx.service.languageLib.deleteLib(query);
        ctx.body = result || {
            result: 'false',
            resultDes: '操作失败'
        }
    }

    //根据id获取项目信息
    async getTypeInfoById() {
        const { ctx } = this;
        const id = ctx.query.id;
        const result = await ctx.service.languageLib.getTypeInfoById(id);
        if (result) {
            ctx.body = {
                result: 'true',
                data: result
            }
        } else {
            ctx.body = {
                result: 'false',
                resultDes: '获取数据失败'
            }
        }
    }

    //获取项目列表
    async getTypeList() {
        const { ctx } = this;
        const result = await ctx.service.languageLib.getTypeList();
        if (result) {
            ctx.body = {
                result: 'true',
                data: result
            }
        } else {
            ctx.body = {
                result: 'false',
                resultDes: '获取数据失败'
            }
        }
    }

    //添加项目
    async addType() {
        const { ctx } = this;
        let query = ctx.request.body;
        if (!query.typeName) {
            ctx.body = {
                result: 'false',
                resultDes:'typeName参数不能为空'
            }
            return;
        }
        const result = await ctx.service.languageLib.addType(query.typeName);
        if (result.result == 'true') {
            ctx.body = {
                result: 'true'
            }
        }

        else if (result.result == 'false') {
            ctx.body = {
                result: 'false',
                resultDes: '项目名称已存在'
            }
        }

        else {
            ctx.body = {
                result: 'false',
                resultDes: '操作失败'
            }
        }
    }

    //编辑项目
    async editType() {
        const { ctx } = this;
        let query = ctx.request.body;
        if (!query.id) {
            ctx.body = {
                result: 'false',
                resultDes: 'id参数不能为空'
            }
            return;
        }
        if (!query.typeName) {
            ctx.body = {
                result: 'false',
                resultDes: 'typeName参数不能为空'
            }
            return;
        }

        const result = await ctx.service.languageLib.editType(query.id, query.typeName);
        if (result.result == 'true') {
            ctx.body = {
                result: 'true'
            }
        }

        else if (result.result == 'false') {
            ctx.body = {
                result: 'false',
                resultDes: '项目名称已存在'
            }
        }

        else {
            ctx.body = {
                result: 'false',
                resultDes: '操作失败'
            }
        }
    }

    //删除项目
    async deleteType() {
        const { ctx } = this;
        let query = ctx.request.body;
        if (!query.id) {
            ctx.body = {
                result: 'false',
                resultDes: 'id参数不能为空'
            }
            return;
        }

        const result = await ctx.service.languageLib.deleteType(query.id);
        ctx.body = result || {
            result: 'false',
            resultDes: '操作失败'
        }
    }

    //获取语言包列表
    async getLangListByTypeId() {
        const { ctx } = this;
        const query = ctx.request.body;
        const result = await ctx.service.languageLib.getJsonListByTypeId(query.typeId, query.limit);
        if (result) {
            if (result.result == 'true') {
                ctx.body = {
                    result: 'true',
                    data: result.data
                }
            } else {
                ctx.body = {
                    result: 'false',
                    resultDes: '操作失败'
                }
            }
        } else {
            ctx.body = {
                result: 'false',
                resultDes: '操作失败'
            }
        }
    }

}

module.exports = HomeController;
