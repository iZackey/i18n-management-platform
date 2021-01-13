/**
 * 项目配置文件
 * */
if (!window.location.origin) {
    window.location.origin = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
}

const staticPath = '/static'; //静态资源服务器中的路径
const projectDomain = process.env.NODE_ENV === 'development' ? '/' : `${window.location.origin}/`; //项目域名
const apiProdBasePath = projectDomain + (process.env.NODE_ENV === 'development' ?'apiI18n/': ''); //项目生产接口请求前缀
const apiLocalBasePath = projectDomain + (process.env.NODE_ENV === 'development' ?'apiILocal18n/': ''); //项目本地开发接口请求前缀
const apiBasePath = sessionStorage.getItem('isLocalApiUse') === 'true' ? apiLocalBasePath : apiProdBasePath; //接口实际前缀
const libPath = process.env.NODE_ENV === 'development' ? '/lib/' : staticPath + '/lib/';

export {
    staticPath,
    projectDomain,
    apiProdBasePath,
    apiBasePath,
    apiLocalBasePath,
    libPath,
}
