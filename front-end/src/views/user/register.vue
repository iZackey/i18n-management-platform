<template>
    <div :class="prefixCls">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <h1>注册帐号</h1>

            <el-form-item label="昵称" prop="nickName">
                <el-input type="text" v-model="ruleForm.nickName" placeholder="请输入昵称" @keyup.native.enter="submitForm"></el-input>
            </el-form-item>

            <el-form-item label="邮箱帐号" prop="account">
                <el-input type="text" v-model="ruleForm.account" placeholder="请输入邮箱帐号" @keyup.native.enter="submitForm"></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="ruleForm.password" placeholder="请输入密码" @keyup.native.enter="submitForm"></el-input>
            </el-form-item>

            <el-form-item label="确认密码" prop="password">
                <el-input type="password" v-model="ruleForm.againPassword" placeholder="再次输入密码" @keyup.native.enter="submitForm"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm" :loading="isLoading" style="margin-right:20px;">注册</el-button>

                <div class="text-btn-wrapper">
                    <el-button type="text" class="text-btn" @click="$router.push('/login')">已有帐号，去登录</el-button>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import Cookie from 'js-cookie'
    import axios from 'axios'
    import {apiBasePath} from '@/config/config.js'
    import regexp from '@/utils/regexp.js'

    export default {
        name: "register",
        data(){
            const checkPassword = (rule, value, callback) => {
                if(value === ''){
                    callback(new Error('请输入6-16位数字、字母组成的密码'));
                }else{
                    const checkStrong = this.checkstrong(value);
                    if(checkStrong){
                        callback(new Error(checkStrong));
                    }else if(this.ruleForm.againPassword){
                        if(this.ruleForm.againPassword != value){
                            callback(new Error('两次输入密码不一致'));
                        }else{
                            //验证成功的同时去掉第二次密码的错误提示
                            this.$refs.ruleForm.clearValidate('againPassword');
                            callback();
                        }
                    }else{
                        callback();
                    }
                }
            }
            const checkAgainPassword = (rule, value, callback) => {
                if(value === ''){
                    callback(new Error('请再次输入密码'));
                }else if(value !== this.ruleForm.password){
                    callback(new Error('两次输入密码不一致'));
                }else{
                    if(this.ruleForm.password){
                        //验证成功的同时去掉第一次密码的错误提示
                        this.$refs.ruleForm.clearValidate('password');
                        callback();
                    }else{
                        callback();
                    }
                }
            }

              const checkAccount = (rule, value, callback) => {
                if(value == ''){
                    callback(new Error('邮箱号不能为空'));
                }else if(!regexp.email.test(value)){
                    callback(new Error('邮箱号格式不正确'));
                }else{
                    callback();
                }
            }

             //检测手机号注册情况
            const checkAccountRegister = (rule, value, callback) => {
                callback();
                /* if(value != ''){
                    Ajax({
                        url: `${apiAccount}reg/checkAccount`,
                        data:{
                            account: encryptedString(this.bodyRSA(), value)
                        },
                        transformRequest: [Utils.transformRequest],
                        headers:{
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        isPassFalse: true
                    }).then(json => {
                        if(json.ok){
                            callback();
                        }else if(json.error){
                            callback(new Error(json.error));
                        }else{
                            callback(new Error(this.$t('register_page.mobile_account_cannot_be_register')));
                        }
                    })
                }else{
                    callback();
                } */
            }

            return {
                prefixCls:'views-user-register',
                isLoading: false,
                ruleForm:{
                    nickName:'', //昵称
                    account:'', //邮箱帐号
                    password:'', //密码
                    againPassword:'', //再次输入的密码
                },
                rules:{
                    //昵称
                    nickName:[
                        { required: true, message: '请输入帐号', trigger: 'blur' }
                    ],
                    account:[
                        { required: true, message: '请输入邮箱帐号', trigger: 'blur' },
                        { validator: checkAccount, trigger: 'change' },
                        { validator: checkAccountRegister, trigger: 'blur' }
                    ],
                    password:[
                        { validator: checkPassword, trigger: 'change' }
                    ],
                    againPassword:[
                        { validator: checkAgainPassword, trigger: 'change' }
                    ],
                }
            }
        },

        mounted() {

        },

        methods:{
              checkstrong(str){
                var sPw = (str || '').trim();
                var Modes = 0;
                for (var i = 0; i < sPw.length; i++) {
                    //测试每一个字符的类别并统计一共有多少种模式.
                    Modes |= this.CharMode(sPw.charCodeAt(i));
                }
                var mode= this.bitTotal(Modes);
                if(mode == 1){
                    return '密码过于简单,不能纯字母或纯数字';
                }
                return '';
            },
            CharMode (iN) {
                if (iN >= 48 && iN <= 57) //数字
                {
                    return 1;
                }
                if (iN >= 65 && iN <= 90) //大写字母
                {
                    return 2;
                }
                if (iN >= 97 && iN <= 122) //小写
                {
                    return 4;
                }
                return 8; //特殊字符
            },
            /*
                统计字符类型
            */
            bitTotal (num) {
                var modes = 0;
                for (var i = 0; i < 4; i++) {
                    if (num & 1) {
                        modes++;
                    }
                    num >>>= 1;
                }
                return modes;
            },

            submitForm(){
                this.$refs['ruleForm'].validate((valid) => {
                    if (valid) {
                        this.isLoading = true;
                        axios({
                            url:apiBasePath + 'user/register',
                            method: 'post',
                            data: {
                                nickName: this.ruleForm.nickName,
                                email: this.ruleForm.account,
                                password: this.ruleForm.password,
                            }
                        }).then(response => {
                            const json = response.data;
                            this.isLoading = false;
                            if(json.result == 'true'){
                                this.$showOk('注册成功！请登录');
                                this.$router.push('/login');
                            }else{
                                this.$showError(json.resultDes || '注册失败');
                            }
                        })

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            /*submitForm(){
                this.$refs['ruleForm'].validate((valid) => {
                    if (valid) {
                        if(this.isRemenberPass){
                            localStorage.setItem('login-userName', this.ruleForm.userName);
                            localStorage.setItem('login-password', window.btoa(this.ruleForm.password));
                        }

                        this.isLoading = true;
                        axios({
                            url:'https://assembly-java.daydao.com/user/login',
                            method:'post',
                            data:{
                                "userName": this.ruleForm.userName,
                                "password": this.ruleForm.password
                            }
                        }).then(response => {
                            const json = response.data;
                            if(json.result == 'true'){
                                const userInfo = json.bean || {};
                                Cookie.set('userName', userInfo.userName, {path:'/'});
                                Cookie.set('account', userInfo.account, {path:'/'});
                                Cookie.set('dd', userInfo.dd, {path:'/'});
                                Cookie.set('token', userInfo.token, {path:'/'});

                                //存储用户信息
                                axios({
                                    url:apiBasePath + 'user/add',
                                    method: 'post',
                                    data: {
                                        mobile :userInfo.account,
                                        dd : userInfo.dd,
                                        user_name: userInfo.userName
                                    }
                                }).then(response => {
                                    const json = response.data;
                                    this.isLoading = false;
                                    if(json.result == 'true'){
                                        this.$router.push({
                                            path:'/typeList'
                                        })
                                    }else{
                                        this.$showError(json.message || '登录失败');
                                    }
                                })

                            }else{
                                this.isLoading = false;
                                this.$showError(json.message || '登录失败');
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },*/
        }
    }
</script>

<style lang="scss">
$prefixCls:views-user-register;
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
