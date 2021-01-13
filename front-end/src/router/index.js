import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'hash',
    routes: [
        {
            path: '/',
            component: () => import('@/Main.vue'),
            children: [
                //默认没参数的跳转
                {
                    path: '/',
                    redirect: '/login'
                },
                //首页
                {
                    path: '/home',
                    component: () => import(/* webpackChunkName: "home" */ '@/views/typeList/list.vue')
                },

                //语言包详情
                {
                    path: '/langDetail',
                    component: () => import(/* webpackChunkName: "langDetail" */'@/views/langDetail/detail.vue')
                },

                //项目分类页
                {
                    path:'/typeList',
                    component: () => import(/* webpackChunkName: "typeList" */'@/views/typeList/list.vue')
                },

                //设置
                {
                    path: '/setting',
                    component: () => import(/* webpackChunkName: "setting" */'@/views/setting/setting.vue')
                },

                //语言包列表
                {
                    path: '/langList',
                    component: () => import(/* webpackChunkName: "langList" */'@/views/langList/langList.vue')
                },

                {
                    path:'/userList',
                    component: () => import(/* webpackChunkName: "userList" */'@/views/userList/userList.vue')
                },

                {
                    path:'/recycleList',
                    component: () => import(/* webpackChunkName: "recycleList" */'@/views/recycleList/recycleList.vue')
                },

                //测试页面
                {
                    path: '/test',
                    name: 'test',
                    component: () => import(/* webpackChunkName: "test" */'@/views/test/test.vue')
                },
            ]
        },

        //登录页
        {
            path:'/login',
            name:'login',
            component: () => import(/* webpackChunkName: "login" */'@/views/user/login.vue')
        },

        //注册页
        {
            path: '/register',
            component: () => import(/* webpackChunkName: "register" */ '@/views/user/register.vue')
        },

        //注意：下面这个404的匹配要放到最下面
        {
            path: '*',
            component: () => import('@/views/404/index.vue')
        }
    ]
})
