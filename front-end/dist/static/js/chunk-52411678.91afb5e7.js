(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-52411678"],{"1a47":function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"clearfix",class:e.prefixCls},[a("h1",[e._v("用户列表")]),a("el-row",{staticClass:"top-btns"}),a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.isLoading,expression:"isLoading"}],staticClass:"lang-list-table",attrs:{id:e.prefixCls+"-page-table"}},[a("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:e.tableData,height:e.tableHeight,stripe:""}},[a("el-table-column",{attrs:{prop:"iIndex",label:"序号",width:"100"}}),a("el-table-column",{attrs:{prop:"user_name",label:"用户名"}}),a("el-table-column",{attrs:{prop:"mobile",label:"手机号"}}),a("el-table-column",{attrs:{prop:"update_time",label:"登录时间"}}),a("el-table-column",{attrs:{prop:"create_time",label:"首次登录时间"}}),a("el-table-column",{attrs:{prop:"id",label:"操作"}},[[a("p",{staticClass:"lang-operation"})]],2)],1)],1),a("div",{class:[e.prefixCls+"-pager"]},[a("el-pagination",{attrs:{size:"small",background:"",layout:"total, prev, pager, next, sizes","page-sizes":[10,20,50,100],"page-size":Number(e.pageSize),total:Number(e.pageTotal),"current-page":Number(e.pageNo)},on:{"current-change":e.onChangePageNo,"size-change":e.onPageSizeChange}})],1)],1)},n=[],l=(a("2eeb"),a("e18c"),a("96db"),a("af86"),a("2ba1")),s=a("ab3e"),o=(a("35f4e"),{data:function(){return{prefixCls:"views-userList-userList",isLoading:!1,tableData:[],tableHeight:200,pageSize:50,pageTotal:0,pageNo:1}},mounted:function(){var e=this;setTimeout((function(){e.setTableHeight()}),20),window.addEventListener("resize",this.setTableHeight),this.isLoading=!0,Promise.all([this.getList()]).then((function(){e.isLoading=!1}))},beforeDestroy:function(){window.removeEventListener("resize",this.setTableHeight)},methods:{getList:function(){var e=this;return new Promise((function(t,a){Object(s["a"])({url:"user/list",data:{pageSize:50,pageNo:1}}).then((function(a){"true"==a.result&&(e.tableData=(a.list||[]).map((function(e,t){return Object(l["a"])(Object(l["a"])({},e),{},{iIndex:t+1})})),e.pageTotal=a.total||0),t()}))}))},setTableHeight:function(){this.tableHeight=document.documentElement.clientHeight-document.querySelector("#"+this.prefixCls+"-page-table").getBoundingClientRect().top-75},onChangePageNo:function(e){var t=this;this.pageNo=String(e),this.getDetail((function(){t.$refs.multipleTable.bodyWrapper.scrollTop=0}))},onPageSizeChange:function(e){var t=this;this.pageSize=String(e),this.getDetail((function(){t.$refs.multipleTable.bodyWrapper.scrollTop=0}))},goback:function(){this.$router.go(-1)}}}),r=o,u=(a("fa88"),a("9ca4")),c=Object(u["a"])(r,i,n,!1,null,null,null);t["default"]=c.exports},ae38:function(e,t,a){},fa88:function(e,t,a){"use strict";var i=a("ae38"),n=a.n(i);n.a}}]);