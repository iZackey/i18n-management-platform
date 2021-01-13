'use strict';
const Service = require('egg').Service;
const libTbName = 'language_lib';
const typelibTbName = 'language_type';
const fieldsTbName = 'language_fields';
const recycleFieldTbName = 'language_recycle_fields';
const moment = require('moment');

class LanguageFieldsService extends Service {
    //添加
    async add(query) {
        let queryParentId = query.parent_id || '0';
        //非0的时候如果不是0开头的就追加0开头
        if(query.parent_id != '0' && !/^0,/.test(queryParentId)){
            queryParentId = `0,${query.parent_id}`;
        }
        const checkData = await this.app.mysql.get(fieldsTbName, { key: query.key, lib_id: query.lib_id, parent_id: queryParentId });
        if (checkData && checkData.id) {
            return {
                result: 'false',
                resultDes:'key为“'+ checkData.key +'”的记录已存在'
            }
        }

        //根据parent_id的的组合值查parent_key数组
        let parentKeyArr = [];
        if(queryParentId != '0'){
            let parentArr = queryParentId.split(',');
            const findParentNodes = await this.app.mysql.query('select * from ' + fieldsTbName + ' where `lib_id` = ? LIMIT 0, 10000 ', [query.lib_id]);
            findParentNodes.forEach(item => {
                parentArr.forEach(item2 => {
                    if(item2 == item.id){
                        parentKeyArr.push(item.key);
                    }
                })
            })
        }

        //用事务执行多个sql
        const result = await this.app.mysql.beginTransactionScope(async conn => {
            const result2 = await conn.insert(fieldsTbName, {
                zh: (query.zh || '').trim(),
                en: (query.en || '').trim(),
                key: query.key.trim(),
                lib_id: query.lib_id,
                parent_id: queryParentId,
                parent_key: parentKeyArr.join(','),
                create_time: moment().format('YYYY-MM-DD HH:mm:ss'),
                update_time: moment().format('YYYY-MM-DD HH:mm:ss'),
                mobile: this.ctx.session.mobile,
                user_name: this.ctx.session.user_name,
            });
            //如果存在parent_id就要把该父级结点的is_has_children设置为1
            let resultSetParent = null;
            if(queryParentId != '0'){
                //parent_id如果有多个，取最末端一个
                let arr = queryParentId.split(',');
                let lastParentId = arr[arr.length - 1];
                resultSetParent = await conn.update(fieldsTbName, {is_has_children: '1'}, {where: {id: lastParentId}});
            }

            //更新语言包表的时间
            await conn.update(libTbName, {
                update_time: moment().format('YYYY-MM-DD HH:mm:ss')
            }, {
                where:{id: query.lib_id}
            });

            if (result2.affectedRows === 1 && (resultSetParent && resultSetParent.affectedRows === 1 || !resultSetParent)) {
                return {
                    success: true
                }
            } else {
                return {
                    success: false
                }
            }
        }, this.ctx); // ctx 是当前请求的上下文，如果是在 service 文件中，可以从 `this.ctx` 获取到

        if(result.success){
            return {
                result: 'true'
            }
        }else{
            return null;
        }

    }

    //更新
    async update(query){
        let parentId = null;
        //查询改结点的详情，并读取parent_id
        const queryDataForParent = await this.app.mysql.get(fieldsTbName, { id: query.id });
        if(queryDataForParent && queryDataForParent.parent_id){
            parentId = queryDataForParent.parent_id;
        }

        const sql = 'select * from ' + fieldsTbName + ' where `id` != ? and `key` = ? and `lib_id` = ? and `parent_id` = ? LIMIT 0, 1 '
        const checkData = await this.app.mysql.query(sql, [parseInt(query.id), query.key, query.lib_id, parentId]);
        //排除当前传过来的这条数据
        if (checkData && checkData.length) {
            return {
                result: 'false',
                resultDes: '同级下key为“'+ checkData[0].key +'”的记录已存在'
            }
        }
        const result = await this.app.mysql.update(fieldsTbName, {
            zh: (query.zh || '').trim(),
            en: (query.en || '').trim(),
            key: query.key.trim(),
            update_time: moment().format('YYYY-MM-DD HH:mm:ss'),
            mobile: this.ctx.session.mobile,
            user_name: this.ctx.session.user_name,
        }, {
            where: {
                id: parseInt(query.id),
            }
        });

        //更新语言包表的时间
        await this.app.mysql.update(libTbName, {
            update_time: moment().format('YYYY-MM-DD HH:mm:ss')
        }, {
            where:{id: query.lib_id}
        });

        if (result.affectedRows === 1) {
            return {
                result: 'true'
            }
        } else {
            return null;
        }
    }

    //列表
    async list(query){
        let offset = (query.pageNo? parseInt(query.pageNo) - 1 : 0) * parseInt(query.pageSize); // 数据偏移量
        let limit = parseInt(query.pageSize); // 返回数据量
        let query_parent_id = String(query.parent_id || '');
        let where = ' where `lib_id` = ? ' + (query_parent_id? ' and (`parent_id` = \'' + query_parent_id + '\' or `parent_id` REGEXP \'^'+query_parent_id+',\' )' :' ') + (query.keyword? ' and  (`key` like \"%'+query.keyword+'%\" or `zh` like \"%'+query.keyword+'%\" )':' ');
        let whereArr = [
            query.lib_id
        ];
        const result = await this.app.mysql.query('select * from ' + fieldsTbName + where +' order by id desc ' + ' LIMIT '+offset+','+limit, whereArr);
        const resultCount = await this.app.mysql.query('select count(`id`) as `total` from ' + fieldsTbName + where, whereArr);

        //根据parent_id的的组合值查parent_key数组
        let parentKeyArr = [];
        if(query_parent_id){
            let parentArr = query_parent_id.split(',');
            const findParentNodes = await this.app.mysql.query('select * from ' + fieldsTbName + ' where `lib_id` = ? LIMIT 0, 10000 ', [query.lib_id]);
            findParentNodes.forEach(item => {
                parentArr.forEach(item2 => {
                    if(item2 == item.id){
                        parentKeyArr.push(item.key);
                    }
                })
            })
        }

        if (result && Array.isArray(resultCount) && resultCount.length) {
            return {
                result:'true',
                list: result.map(item => {
                    return {
                        ...item,
                        update_time: moment(item.update_time).format('YYYY-MM-DD HH:mm:ss')
                    }
                }),
                parent_key_arr:parentKeyArr,
                total: resultCount[0].total
            };
        } else {
            return null;
        }
    }

    //删除
    async delete(query){
        //先查询有没没关联子节点
        const checkData = await this.app.mysql.query(`select * from ${fieldsTbName} where parent_id = '${String(query.id)}' or parent_id REGEXP ',${String(query.id)}$' `);
        if (checkData && checkData.length) {
            console.log('checkData',checkData)
            return {
                result: 'false',
                resultDes: `该数据存在个${checkData.length}子结点，不能删除`
            }
        }

        let parentId = null;
        //查询该结点的详情，并读取parent_id
        const queryDataForParent = await this.app.mysql.get(fieldsTbName, { id: query.id });
        if(queryDataForParent && queryDataForParent.parent_id){
            const arr = queryDataForParent.parent_id.split(',');
            parentId = arr[arr.length - 1];
        }

        //用事务执行多个sql
        const result = await this.app.mysql.beginTransactionScope(async conn => {
            const result2 = await conn.delete(fieldsTbName, {id: query.id});
            if(parentId){
                //查询改父id的剩余子节点数量
                const resultLeftChildren = await conn.query(`select * from ${fieldsTbName} where parent_id = '${String(parentId)}' or parent_id REGEXP ',${String(parentId)}$' limit 0,1 `)

                //如果没有子节点，就标记父节点的is_has_children为0
                if(resultLeftChildren.length == 0){
                    let resultSetParent = await conn.update(fieldsTbName, {is_has_children: '0'}, {where: {id: parentId}});
                }
            }

            //把详情备份到回收表
            if(queryDataForParent && queryDataForParent.id){
                let dataObj = {...queryDataForParent};
                dataObj.update_time = moment(dataObj.update_time).format('YYYY-MM-DD HH:mm:ss');
                dataObj.create_time = moment(dataObj.create_time).format('YYYY-MM-DD HH:mm:ss');
                const resultRecycle = await conn.insert(recycleFieldTbName, {
                    field_id: queryDataForParent.id,
                    lib_id: queryDataForParent.lib_id,
                    field_key: queryDataForParent.key,
                    field_detail_json: JSON.stringify(dataObj),
                    mobile: this.ctx.session.mobile,
                    user_name: this.ctx.session.user_name,
                    delete_time: moment().format('YYYY-MM-DD HH:mm:ss'),
                });
            }

            if (result2.affectedRows === 1) {
                return { success: true };
            }else{
                return  { success: false };
            }

        }, this.ctx);

        if(result.success){
            return {
                result: 'true'
            }
        }else{
            return null;
        }

    }

    async exportJson({lib_id}){
        const result = await this.app.mysql.select(fieldsTbName, {
            where: {lib_id}, // WHERE 条件
            limit: 10000, // 返回数据量，几乎所有的
            offset: 0, // 数据偏移量
            orders: [['id','asc']], // 排序方式
        });
        return {
            result: 'true',
            list: result
        }
    }

    async getRecycleList(query){
        let offset = (query.pageNo? parseInt(query.pageNo) - 1 : 0) * parseInt(query.pageSize); // 数据偏移量
        let limit = parseInt(query.pageSize); // 返回数据量
        const result = await this.app.mysql.query('select * from ' + recycleFieldTbName +' order by id desc ' + ' LIMIT '+offset+','+limit);
        const resultCount = await this.app.mysql.query('select count(`id`) as `total` from ' + recycleFieldTbName);
        if (result && Array.isArray(resultCount) && resultCount.length) {
            return {
                result:'true',
                list: result.map(item => {
                    return {
                        ...item,
                        delete_time: item.delete_time?moment(item.delete_time).format('YYYY-MM-DD HH:mm:ss'):''
                    }
                }),
                total: resultCount[0].total
            };
        } else {
            return null;
        }
    }

    //查找历史翻译
    async findHistoryTranslate(query){
        let offset = (query.pageNo? parseInt(query.pageNo) - 1 : 0) * parseInt(query.pageSize); // 数据偏移量
        let limit = parseInt(query.pageSize); // 返回数据量
        let zhLike = `zh like '%${query.keyword}%'`;
        if(query.historySearchType == '2'){
            zhLike = `zh = '${query.keyword}'`;
        }
        let where = ` where ${zhLike} and id != ${query.id} and is_has_children = 0  `;
        const result = await this.app.mysql.query('select * from ' + fieldsTbName + where +' order by id desc ' + ' LIMIT '+offset+','+limit);
        const resultCount = await this.app.mysql.query('select count(`id`) as `total` from ' + fieldsTbName + where);
        if (result && Array.isArray(resultCount) && resultCount.length) {
            return {
                result:'true',
                list: result.map(item => {
                    return {
                        ...item
                    }
                }),
                total: resultCount[0].total
            };
        } else {
            return null;
        }
    }

}

module.exports = LanguageFieldsService;
