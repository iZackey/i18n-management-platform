'use strict';
const Service = require('egg').Service;
const libTbName = 'language_lib';
const typelibTbName = 'language_type';
const fieldsTbName = 'language_fields';
const moment = require('moment');

class LanguageLibService extends Service {
    //根据id获取json
    async getLibInfo(id) {
        //  id 从数据库获取用户详细信息
        const result = await this.app.mysql.get(libTbName, { id });
        if (result) {
            return {
                result:'true',
                data: result
            };
        } else {
            return null;
        }
    }

    //设置json
    async addLib(id, opts = {}) {
        let params = {};
        params.type = opts.type;
        params.name = opts.name;

        let result = {};
        if (id) {
            //判断名称是否重复，查询别的记录是否存在同名
            const sql = 'select * from ' + libTbName + ' where id != ? and name = ? LIMIT 0, 1 '
            const checkData = await this.app.mysql.query(sql, [id, params.name]);
            //排除当前传过来的这条数据
            if (checkData && checkData.length && checkData[0].id != id) {
                return {
                    result: 'false',
                    resultDes: '语言包名称已存在'
                }
            }

            result = await this.app.mysql.update(libTbName, {
                name: params.name,
            }, {
                where:{
                    id
                }
            })
        } else {
            //判断名称是否重复
            const sql = 'select * from ' + libTbName + ' where name = ? LIMIT 0, 1 '
            const checkData = await this.app.mysql.query(sql, [params.name]);
            if (checkData && checkData.length) {
                return {
                    result: 'false',
                    resultDes: '语言包名称已存在'
                }
            }

            result = await this.app.mysql.insert(libTbName, {
                ...params,
                create_time: moment().format('YYYY-MM-DD HH:mm:ss')
            })
        }

        if (result.affectedRows === 1) {
            return { result: 'true' };
        } else {
            return null;
        }

    }


    //获取语言包列表
    async getJsonList(){
        const result = await this.app.mysql.select(libTbName);
        if (result) {
            return result;
        } else {
            return null;
        }
    }

    /**
     * 根据项目id获取jsonlib
     * @param type String 项目类型id
    */
    async getJsonListByTypeId(type, limit) {
        let oCondition = {
            orders: [['id', 'desc']],
            limit: 100
        };
        if(type){
            oCondition.where = { type };
        }
        if(limit){
            oCondition.limit = Number(limit);
        }
        const result = await this.app.mysql.select(libTbName, oCondition);
        if (result) {
            if (result.length) {
                return {
                    result: 'true',
                    data: result.map(item => {
                        return {
                            ...item,
                            create_time: item.create_time?moment(item.create_time).format('YYYY-MM-DD HH:mm:ss'):'',
                            update_time: item.update_time?moment(item.update_time).format('YYYY-MM-DD HH:mm:ss'):''
                        }
                    })
                };
            } else {
                return {
                    result: 'true',
                    data: []
                };
            }
        } else {
            return null;
        }
    }

    //删除json数据
    async deleteLib(query){
        //先查下有没有数据
        const resultCount = await this.app.mysql.query('select count(`id`) as `total` from ' + fieldsTbName + ' where `lib_id` = ? ', [query.id]);
        if(resultCount && resultCount[0].total > 0){
            return {
                result:'false',
                resultDes:'不能删除，该语言包下面还有'+resultCount[0].total+'条数据'
            }
        }

        const result = await this.app.mysql.delete(libTbName, {id: query.id});
        if (result) {
            return {
                result:'true'
            };
        } else {
            return null;
        }
    }

    //获取项目信息
    async getTypeInfoById(id) {
        const result = await this.app.mysql.get(typelibTbName, { id });
        if (result) {
            return result;
        } else {
            return null;
        }
    }

    //获取项目列表
    async getTypeList() {
        const result = await this.app.mysql.select(typelibTbName);
        if (result) {
            return result;
        } else {
            return null;
        }
    }

    //添加项目
    async addType(typeName) {
        const checkData = await this.app.mysql.get(typelibTbName, { typeName });
        if (checkData && checkData.id) {
            return {
                result: 'false',
                resultDes:'该记录已存在'
            }
        }
        const result = await this.app.mysql.insert(typelibTbName, {
            typeName: typeName
        });
        if (result.affectedRows === 1) {
            return {
                result: 'true'
            }
        } else {
            return null;
        }
    }


    //编辑项目
    async editType(id, typeName) {
        const sql = 'select * from ' + typelibTbName + ' where id != ? and typeName = ? LIMIT 0, 1 '
        const checkData = await this.app.mysql.query(sql, [id, typeName]);
        if (checkData && checkData.length) {
            return {
                result: 'false',
                resultDes: '该记录已存在'
            }
        }
        const result = await this.app.mysql.update(typelibTbName, {
            id,
            typeName
        });
        if (result.affectedRows === 1) {
            return {
                result: 'true'
            }
        } else {
            return null;
        }
    }

    //删除项目
    async deleteType(id) {
        //先判断这个分类下面有没有创建语言包
        const resultCount = await this.app.mysql.query('select count(`id`) as `total` from ' + libTbName + ' where `type` = ? ', [id]);
        if(resultCount && resultCount[0].total > 0){
            return {
                result:'false',
                resultDes:'不能删除，该项目下面还有'+resultCount[0].total+'个语言包'
            }
        }

        const result = await this.app.mysql.delete(typelibTbName, {id});
        if (result.affectedRows === 1) {
            return {
                result: 'true'
            }
        } else {
            return null;
        }
    }

}

module.exports = LanguageLibService;
