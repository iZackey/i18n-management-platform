module.exports = options => {
    return async function auth(ctx, next) {
        await next();

        if(ctx.request.url !== '' && ctx.request.url !== '/' && ctx.request.url !== '/public/' && ctx.request.url !== '/public' && ctx.request.url !== '/user/login' && ctx.request.url !== '/user/logout'){
            if (ctx.request.host != '127.0.0.1:7001' && (!ctx.session || !ctx.session.mobile)) {
                ctx.body = {
                    result:'false',
                    retCode: '104',
                    resultDes:'登录状态超时'
                };
            }
        }

    };
};
