(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e1533ce6"],{"71a8":function(e,r,t){"use strict";t.r(r);var s=function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",{staticClass:"views-login-index"},[t("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,"status-icon":"",rules:e.rules,"label-width":"100px"}},[t("h1",[e._v("DAYDAO多语言包管理平台")]),t("el-form-item",{attrs:{label:"账号",prop:"userName"}},[t("el-input",{attrs:{type:"text",placeholder:"daydao账号手机号"},nativeOn:{keyup:function(r){return!r.type.indexOf("key")&&e._k(r.keyCode,"enter",13,r.key,"Enter")?null:e.submitForm(r)}},model:{value:e.ruleForm.userName,callback:function(r){e.$set(e.ruleForm,"userName",r)},expression:"ruleForm.userName"}})],1),t("el-form-item",{staticStyle:{"margin-bottom":"15px!important"},attrs:{label:"密码",prop:"password"}},[t("el-input",{attrs:{type:"password",placeholder:"daydao密码"},nativeOn:{keyup:function(r){return!r.type.indexOf("key")&&e._k(r.keyCode,"enter",13,r.key,"Enter")?null:e.submitForm(r)}},model:{value:e.ruleForm.password,callback:function(r){e.$set(e.ruleForm,"password",r)},expression:"ruleForm.password"}})],1),t("el-form-item",{staticStyle:{"margin-bottom":"5px!important"},attrs:{label:""}},[t("el-checkbox",{model:{value:e.isRemenberPass,callback:function(r){e.isRemenberPass=r},expression:"isRemenberPass"}},[e._v("记住用户名密码")])],1),t("el-form-item",[t("el-button",{staticStyle:{"margin-right":"20px"},attrs:{type:"primary",loading:e.isLoading},on:{click:e.submitForm}},[e._v("登录")]),t("el-button",{on:{click:function(r){return e.resetForm("ruleForm")}}},[e._v("重置")])],1)],1)],1)},o=[],a=t("e04f"),l=t.n(a),n=t("82ae"),i=t.n(n),u=t("a078"),m={name:"login",data:function(){return{isLoading:!1,ruleForm:{userName:"",password:""},rules:{userName:[{required:!0,message:"请输入账号",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"}]},isRemenberPass:!0}},mounted:function(){localStorage.getItem("login-userName")&&(this.ruleForm.userName=localStorage.getItem("login-userName")),localStorage.getItem("login-password")&&(this.ruleForm.password=window.atob(localStorage.getItem("login-password")))},methods:{submitForm:function(){var e=this;this.$refs["ruleForm"].validate((function(r){if(!r)return!1;e.isRemenberPass&&(localStorage.setItem("login-userName",e.ruleForm.userName),localStorage.setItem("login-password",window.btoa(e.ruleForm.password))),e.isLoading=!0,i()({url:u["a"]+"user/login",method:"post",data:{user_name:e.ruleForm.userName,password:e.ruleForm.password}}).then((function(r){var t=r.data;if(e.isLoading=!1,"true"==t.result){var s=t.userInfo||{};l.a.set("userName",s.user_name,{path:"/"}),l.a.set("mobile",s.mobile,{path:"/"}),l.a.set("dd",s.dd,{path:"/"}),e.$router.push({path:"/typeList"})}else e.$showError(t.resultDes||"登录失败")}))}))},resetForm:function(){this.$refs["ruleForm"].resetFields()}}},d=m,c=(t("f4f1"),t("9ca4")),p=Object(c["a"])(d,s,o,!1,null,"3e1dc9fa",null);r["default"]=p.exports},f4f1:function(e,r,t){"use strict";var s=t("fec2"),o=t.n(s);o.a},fec2:function(e,r,t){}}]);