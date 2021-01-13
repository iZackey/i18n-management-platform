<template>
    <div :class="prefixCls">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <h1>多语言包管理平台</h1>

            <el-form-item label="帐号" prop="account">
                <el-input type="text" v-model="ruleForm.account" placeholder="daydao手机号、注册邮箱" @keyup.native.enter="submitForm"></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="password" style="margin-bottom:15px!important;">
                <el-input type="password" v-model="ruleForm.password" placeholder="daydao登录密码、注册密码" @keyup.native.enter="submitForm"></el-input>
            </el-form-item>

            <el-form-item label="" style="margin-bottom:5px!important;">
                <el-checkbox v-model="isRemenberPass">记住用户名密码</el-checkbox>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm" :loading="isLoading" style="margin-right:20px;">登录</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>

                <div class="text-btn-wrapper">
                    <el-button type="text" class="text-btn" @click="$router.push('/register')">注册</el-button>
                    <el-button type="text" class="text-btn">忘记密码</el-button>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import Cookie from 'js-cookie'
    import axios from 'axios'
    import {apiBasePath} from '@/config/config.js'

    export default {
        name: "login",
        data(){
            return {
                prefixCls:'views-user-login',
                isLoading: false,
                ruleForm:{
                    account:'',
                    password:'',
                },
                rules:{
                    account:[
                        { required: true, message: '请输入帐号', trigger: 'blur' }
                    ],
                    password:[
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                },
                isRemenberPass: true
            }
        },

        mounted() {
            if(localStorage.getItem('login-account')){
                this.ruleForm.account = localStorage.getItem('login-account');
            }
            if(localStorage.getItem('login-password')){
                this.ruleForm.password = window.atob(localStorage.getItem('login-password'));
            }
        },

        methods:{
            submitForm(){
                this.$refs['ruleForm'].validate((valid) => {
                    if (valid) {
                        if(this.isRemenberPass){
                            localStorage.setItem('login-account', this.ruleForm.account);
                            localStorage.setItem('login-password', window.btoa(this.ruleForm.password));
                        }

                        this.isLoading = true;
                        axios({
                            url:apiBasePath + 'user/login',
                            method: 'post',
                            data: {
                                account: this.ruleForm.account,
                                password: this.ruleForm.password,
                            }
                        }).then(response => {
                            const json = response.data;
                            this.isLoading = false;
                            if(json.result == 'true'){
                                const userInfo = json.userInfo || {};
                                Cookie.set('userName', userInfo.user_name || '', {path:'/'});
                                Cookie.set('mobile', userInfo.mobile || '', {path:'/'});
                                Cookie.set('dd', userInfo.dd || '', {path:'/'});
                                Cookie.set('email', userInfo.email || '', {path:'/'});

                                this.$showOk('登录成功');
                                this.$router.push({
                                    path:'/typeList'
                                })
                            }else{
                                this.$showError(json.resultDes || '登录失败');
                            }
                        })

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            resetForm(){
                this.$refs['ruleForm'].resetFields();
            }
        }
    }
</script>

<style lang="scss">
$prefixCls: views-user-login;
.#{$prefixCls}{
    background-image: url(./img/bg.jpg);
    background-repeat: no-repeat;
    background-position: center center;
    background-color: #01031c;
    width:100%;
    height: 100vh;

    h1{
        font-size:26px;
        text-align:center;
        margin-bottom:20px;
    }

    form{
        position: absolute;
        width:500px;
        left:50%;
        top:50%;
        transform: translate(-50%, -60%);
        background: #ffffff5c;
        border-radius: 10px;
        padding-top: 23px;
        padding-right: 56px;
        padding-bottom:10px;
        color: #fff;

        .el-form-item__label{
            color:#fff!important;
            &:before{
                display: none;
            }
        }

        .el-form-item{
            margin-bottom:26px!important;

            .text-btn-wrapper{
                margin-left:30px;
                display:inline;

                 .text-btn{
                    color: #ccc;
                }
            }
        }
    }
}
</style>
