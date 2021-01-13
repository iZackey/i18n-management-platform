'use strict';
const Controller = require('egg').Controller;
const regexpRules = require('../utils/regexpRules')

class FieldsController extends Controller {
    async addFields() {
        const { ctx } = this;
        let query = ctx.request.body;
        if (!query.zh) {
            ctx.body = {
                result: 'false',
                resultDes:'中文描述(zh)参数不能为空'
            }
            return;
        }

        if (typeof query.zh !== 'string') {
            ctx.body = {
                result: 'false',
                resultDes:'中文描述(zh)参数必须是字符串'
            }
            return;
        }
        if (!query.key) {
            ctx.body = {
                result: 'false',
                resultDes:'语言key参数不能为空'
            }
            return;
        }

        if(!regexpRules.libKey.test(query.key)) {
            ctx.body = {
                result: 'false',
                resultDes:'字段名只能包含英文、数字、下划线'
            }
            return;
        }
        if (!query.lib_id) {
            ctx.body = {
                result: 'false',
                resultDes:'lib_id参数不能为空'
            }
            return;
        }

        const result = await ctx.service.languageFields.add(query);
        ctx.body = result || {
            result: 'false',
            resultDes: '操作失败'
        }
    }

    async updateFields(){
        const { ctx } = this;
        let query = ctx.request.body;
        if (!query.id) {
            ctx.body = {
                result: 'false',
                resultDes:'id不能为空'
            }
            return;
        }
        if (!query.zh) {
            ctx.body = {
                result: 'false',
                resultDes:'中文描述(zh)参数不能为空'
            }
            return;
        }

        if (!query.key) {
            ctx.body = {
                result: 'false',
                resultDes:'语言key参数不能为空'
            }
            return;
        }

        if(!regexpRules.libKey.test(query.key)) {
            ctx.body = {
                result: 'false',
                resultDes:'字段名只能包含英文、数字、下划线'
            }
            return;
        }

        if (!query.lib_id) {
            ctx.body = {
                result: 'false',
                resultDes:'lib_id参数不能为空'
            }
            return;
        }

        const result = await ctx.service.languageFields.update(query);
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
        if (!query.lib_id) {
            ctx.body = {
                result: 'false',
                resultDes:'语言包id不能为空'
            }
            return;
        }
        const result = await ctx.service.languageFields.list(query);
        ctx.body = result || {
            result: 'false',
            resultDes: '操作失败'
        }
    }

    async delete(){
        const { ctx } = this;
        let query = ctx.request.body;
        if (!query.id) {
            ctx.body = {
                result: 'false',
                resultDes:'id不能为空'
            }
            return;
        }
        const result = await ctx.service.languageFields.delete(query);
        ctx.body = result || {
            result: 'false',
            resultDes: '操作失败'
        }
    }

    //导出json
    async exportJson(){
        const { ctx } = this;
        const query = ctx.request.body;
        const lib_id = query.lib_id; //语言包id
        const lib_lang = query.lib_lang; //语言包语言类型
        if (!lib_id) {
            ctx.body = {
                result: 'false',
                resultDes:'语言包id(lib_id)不能为空'
            }
            return;
        }
        if (!lib_lang) {
            ctx.body = {
                result: 'false',
                resultDes:'语言包类型(lib_lang)不能为空'
            }
            return;
        }
        const result = await ctx.service.languageFields.exportJson({lib_id});
        if(result.result == 'true'){
            const list = result.list || [];
            ctx.body = {
                result:'true',
                jsonList:list
            }

        }else{
            ctx.body = {
                result: 'false',
                resultDes: '操作失败'
            }
        }
    }

    async getRecycleList(){
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
        const result = await ctx.service.languageFields.getRecycleList(query);
        ctx.body = result || {
            result: 'false',
            resultDes: '操作失败'
        }
    }

    async findHistoryTranslate(){
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
        if (!query.keyword) {
            ctx.body = {
                result: 'false',
                resultDes:'关键词不能为空'
            }
            return;
        }
        if (!query.id) {
            ctx.body = {
                result: 'false',
                resultDes:'id不能为空'
            }
            return;
        }
        const result = await ctx.service.languageFields.findHistoryTranslate(query);
        ctx.body = result || {
            result: 'false',
            resultDes: '操作失败'
        }
    }
}

module.exports = FieldsController;
