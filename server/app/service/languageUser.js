'use strict';
const Service = require('egg').Service;
const libTbName = 'language_lib'; //语言包表
const typelibTbName = 'language_type'; //类型表
const fieldsTbName = 'language_fields'; //语言字段表
const userTbName = 'language_user'; //用户表
const moment  = require('moment');

class LanguageUserService extends Service {
    //添加用户
    async add(query) {
        const checkData = await this.app.mysql.get(userTbName, { mobile: query.mobile });
        //如果已存在就更新信息
        if (checkData && checkData.id) {
            const result = await this.app.mysql.update(userTbName, {
                dd: String(query.dd),
                user_name: query.user_name,
                update_time: moment().format('YYYY-MM-DD HH:mm:ss')
            }, {
                where: {
                    id: checkData.id,
                }
            });
            if (result.affectedRows === 1) {
                return {
                    result: 'true'
                }
            } else {
                return null;
            }
        }

        //否则就插入数据
        else{
            const result = await this.app.mysql.insert(userTbName, {
                mobile: String(query.mobile),
                dd: String(query.dd),
                user_name: query.user_name,
                create_time: moment().format('YYYY-MM-DD HH:mm:ss'),
                update_time: moment().format('YYYY-MM-DD HH:mm:ss')
            });
            if (result.affectedRows === 1) {
                return {
                    result: 'true'
                }
            } else {
                return null;
            }
        }
    }

    async register(query) {
        let checkData = await this.app.mysql.get(userTbName, { email: query.email });
        //判断是否已经注册
        if (checkData && checkData.id) {
            return {
                result: 'true',
                resultDes: '该邮箱账号已注册，请更换邮箱注册',
            }
        }

        checkData = await this.app.mysql.get(userTbName, { user_name: query.nickName });
        //判断昵称是否重复
        if (checkData && checkData.id) {
            return {
                result: 'true',
                resultDes: '你输入的昵称已存在，请更换',
            }
        }

        const result = await this.app.mysql.insert(userTbName, {
            email: String(query.email),
            dd: '',
            user_name: query.nickName,
            password: query.password,
            create_time: moment().format('YYYY-MM-DD HH:mm:ss'),
            update_time: moment().format('YYYY-MM-DD HH:mm:ss')
        });
        if (result.affectedRows === 1) {
            return {
                result: 'true'
            }
        } else {
            return null;
        }
    }

    //根据邮箱号查询用户
    async queryUserByEmail(query) {
        let checkData = await this.app.mysql.get(userTbName, { email: query.account });
        //判断是否已存在
        if (checkData && checkData.id) {
            return {
                result: 'true',
                userInfo: {
                    user_name: checkData.user_name,
                    mobile: '',
                    email: checkData.email
                }
            }
        } else {
            return {
                result: 'false',
                resultDes:'当前帐号不存在'
            }
        }
    }

    async list(query){
        const result = await this.app.mysql.select(userTbName, {
            limit: parseInt(query.pageSize), // 返回数据量
            offset: query.pageNo? parseInt(query.pageNo) - 1 : 0, // 数据偏移量
            orders: [['update_time','desc']], // 排序方式
        });
        const resultCount = await this.app.mysql.query('select count(`id`) as `total` from ' + userTbName);
        if (Array.isArray(result) && Array.isArray(resultCount) && resultCount.length) {
            return {
                result:'true',
                list: result.map(item => {
                    return {
                        ...item,
                        update_time: item.update_time? moment(item.update_time).format('YYYY-MM-DD HH:mm:ss'):'',
                        create_time: item.create_time? moment(item.create_time).format('YYYY-MM-DD HH:mm:ss'):'',
                    }
                }),
                total: resultCount[0].total
            };
        } else {
            return {
                result:'true',
                list: [],
                total: 0
            };
        }
    }

}

module.exports = LanguageUserService;
