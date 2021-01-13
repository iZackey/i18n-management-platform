<template>
    <div class="components-leftAside">
        <div class="wellcom">
            你好！ {{userName}}
        </div>
         <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
                <el-menu
                :default-openeds="['1', '3']"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
                >
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-menu"></i>导航
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="1-0" @click="goTo('/typeList')">项目分类</el-menu-item>
                            <el-menu-item index="1-1" @click="goTo('/recycleList')">字段回收站</el-menu-item>
                            <el-menu-item index="1-2" @click="goTo('/userList')">用户列表</el-menu-item>
                            <el-menu-item index="1-3" @click="goTo('/setting')">设置</el-menu-item>
                            <el-menu-item index="1-4" @click="handlerLogout">退出登录</el-menu-item>
                        </el-menu-item-group>

                    </el-submenu>

                </el-menu>
            </el-aside>
    </div>
</template>

<script>
import myAjax, {sessionTimeoutLogout} from "@/utils/ajax.js";
import Cookie from 'js-cookie'
export default {
    data(){
        return {
            userName:''
        }
    },

    mounted(){
        if(Cookie.get('userName')){
            this.userName = Cookie.get('userName');
        }
    },

    methods:{
        goTo(path){
            if(this.$route.path == path){
                return;
            }
            this.$router.push({path: path});
        },

        handlerLogout(){
            if(this.$route.path == '/login'){
                return;
            }
            this.$confirm('确认退出吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                myAjax({
                    url:'user/logout'
                }).then(json => {
                    sessionTimeoutLogout();
                })
            }).catch(() => {

            });

        }
    }
}
</script>

<style lang="scss" scoped>
.components-leftAside{
    border-right: solid 1px #e6e6e6;
    background-color: #545c64;

    .wellcom{
        color: #b0e9ff;
        padding: 10px;
        margin-top: 20px;
        background: #687077;
        margin-left: 10px;
        margin-right: 10px;
    }

    ul.el-menu{
        border-right:none;

        .el-submenu__title i {
            color: #909399;
        }
    }
}
</style>
