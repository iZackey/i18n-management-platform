(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["login"],{"0a49":function(e,t,r){},"62cf":function(e,t,r){"use strict";r("0a49")},"71a8":function(e,t,r){"use strict";r.r(t);var o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{class:e.prefixCls},[r("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,"status-icon":"",rules:e.rules,"label-width":"100px"}},[r("h1",[e._v("多语言包管理平台")]),r("el-form-item",{attrs:{label:"帐号",prop:"account"}},[r("el-input",{attrs:{type:"text",placeholder:"daydao手机号"+(e.isShowRegister?"、注册邮箱":"")},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.submitForm(t)}},model:{value:e.ruleForm.account,callback:function(t){e.$set(e.ruleForm,"account",t)},expression:"ruleForm.account"}})],1),r("el-form-item",{staticStyle:{"margin-bottom":"15px!important"},attrs:{label:"密码",prop:"password"}},[r("el-input",{attrs:{type:"password",placeholder:"daydao登录密码"+(e.isShowRegister?"、注册密码":"")},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.submitForm(t)}},model:{value:e.ruleForm.password,callback:function(t){e.$set(e.ruleForm,"password",t)},expression:"ruleForm.password"}})],1),r("el-form-item",{staticStyle:{"margin-bottom":"5px!important"},attrs:{label:""}},[r("el-checkbox",{model:{value:e.isRemenberPass,callback:function(t){e.isRemenberPass=t},expression:"isRemenberPass"}},[e._v("记住用户名密码")])],1),r("el-form-item",[r("el-button",{staticStyle:{"margin-right":"20px"},attrs:{type:"primary",loading:e.isLoading},on:{click:e.submitForm}},[e._v("登录")]),r("el-button",{on:{click:function(t){return e.resetForm("ruleForm")}}},[e._v("重置")]),e.isShowRegister?r("div",{staticClass:"text-btn-wrapper"},[r("el-button",{staticClass:"text-btn",attrs:{type:"text"},on:{click:function(t){return e.$router.push("/register")}}},[e._v("注册")]),r("el-button",{staticClass:"text-btn",attrs:{type:"text"}},[e._v("忘记密码")])],1):e._e()],1)],1)],1)},s=[],a=r("e04f"),n=r.n(a),i=r("82ae"),l=r.n(i),u=r("a078"),c={name:"login",data:function(){return{prefixCls:"views-user-login",isLoading:!1,ruleForm:{account:"",password:""},rules:{account:[{required:!0,message:"请输入帐号",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"}]},isRemenberPass:!0,isShowRegister:!0}},mounted:function(){localStorage.getItem("login-account")&&(this.ruleForm.account=localStorage.getItem("login-account")),localStorage.getItem("login-password")&&(this.ruleForm.password=window.atob(localStorage.getItem("login-password"))),-1!=location.hostname.indexOf(".daydao.com")&&(this.isShowRegister=!1)},methods:{submitForm:function(){var e=this;this.$refs["ruleForm"].validate((function(t){if(!t)return!1;e.isRemenberPass&&(localStorage.setItem("login-account",e.ruleForm.account),localStorage.setItem("login-password",window.btoa(e.ruleForm.password))),e.isLoading=!0,l()({url:u["a"]+"user/login",method:"post",data:{account:e.ruleForm.account,password:e.ruleForm.password}}).then((function(t){var r=t.data;if(e.isLoading=!1,"true"==r.result){var o=r.userInfo||{};n.a.set("userName",o.user_name||"",{path:"/"}),n.a.set("mobile",o.mobile||"",{path:"/"}),n.a.set("dd",o.dd||"",{path:"/"}),n.a.set("email",o.email||"",{path:"/"}),e.$showOk("登录成功"),e.$router.push({path:"/typeList"})}else e.$showError(r.resultDes||"登录失败")}))}))},resetForm:function(){this.$refs["ruleForm"].resetFields()}}},m=c,d=(r("62cf"),r("5d22")),p=Object(d["a"])(m,o,s,!1,null,null,null);t["default"]=p.exports}}]);