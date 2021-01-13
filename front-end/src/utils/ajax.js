/**
 * ajax封装处理
 * */
import axios from 'axios';
import store from '../store/index'
import { apiBasePath } from '@/config/config';
import Cache from '@/utils/cache';
import Cookie from 'js-cookie';

export const sessionTimeoutLogout = (url) => {
    if(window.globalVueApp.$route.path == '/login'){
        return ;
    }
    window.globalVueApp.$router.replace({
        path:'/login'
    })
}

const myAjax = (options) => {
    return new Promise((resolve, reject) => {
        //判断是用模拟url还是用http全url还是相对url
        const url = options.isMock ? options.mockUrl || '' :
            /^https?:\/\//.test(options.url) ? options.url : apiBasePath + options.url;
        const params = options.data || {};

        axios({
            ...options,
            method: options.isMock ? 'post' : options.method || 'post',
            url: url,
            data: options.isMock ? params : JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'x-csrf-token': Cookie.get("csrfToken"), // 前后端不分离的情况加每次打开客户端，egg会直接在客户端的 Cookie 中写入密钥 ，密钥的 Key 就是 'scrfToken' 这个字段，所以直接获取就好了
                ...options.headers || {}
            },
            withCredentials: true // 跨域带cookie
        }).then(json => {
            const data = json.data || {};
            //如果会话超时

            if (data.retCode == 104) {
                window.globalVueApp.$showError('系统登录状态超时，即将退出登录');
                setTimeout(() => {
                    sessionTimeoutLogout();
                }, 2000)
                return;
            }

            if ((data.result === 'false' || data.result === false) && !options.isPassFalse) {
                window.globalVueApp.$showError(data.resultDes || '接口请求出错');
            }
            resolve(data);
        }).catch(e => {
            window.globalVueApp.$showError('接口请求出错');
            reject(e);
        });

    })
}

export default myAjax;
