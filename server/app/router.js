'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;
    router.get('/', controller.home.index);

    router.post('/lib/getLibInfo', controller.home.getLibInfo);

    router.post('/lib/addLib', controller.home.addLib);
    router.post('/lib/editLib', controller.home.editLib);

    router.get('/getTypeInfoById', controller.home.getTypeInfoById);
    router.get('/getTypeList', controller.home.getTypeList);
    router.post('/addType', controller.home.addType);
    router.post('/editType', controller.home.editType);
    router.post('/deleteType', controller.home.deleteType);
    router.post('/getLangListByTypeId', controller.home.getLangListByTypeId);
    router.post('/lib/deleteLib', controller.home.deleteLib);

    router.post('/fields/addFields', controller.fields.addFields); //{"zh": "标题的司法斯蒂芬", "en": "titleaaaaaaaaaad", "key": "title", "lib_id":"2", "parent_lib_id":"2"}
    router.post('/fields/updateFields', controller.fields.updateFields);  //{"zh": "标题的司法斯蒂芬", "en": "titleaaaaaaaaaad", "key": "title", "id":"2"}
    router.post('/fields/list', controller.fields.getList);  //{"pageNo": "1", "pageSize": "20"}
    router.post('/fields/delete', controller.fields.delete);  //{"id": "1"}
    router.post('/fields/exportJson', controller.fields.exportJson); //导出json
    router.post('/fields/getRecycleList', controller.fields.getRecycleList); //查询回收站列表
    router.post('/fields/findHistoryTranslate', controller.fields.findHistoryTranslate); //查找历史翻译

    router.post('/user/add', controller.user.addUser); //添加用户
    router.post('/user/list', controller.user.getList); //用户列表 {"pageNo": "1", "pageSize": "20"}
    router.post('/user/login', controller.user.login); //登录接口
    router.post('/user/logout', controller.user.logout); //退出接口
    router.post('/user/register', controller.user.register); //注册
};
