(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4a4c59a2"],{"996e":function(e,s,i){},d1b1:function(e,s,i){"use strict";var t=i("996e"),n=i.n(t);n.a},e0df:function(e,s,i){"use strict";i.r(s);var t=function(){var e=this,s=e.$createElement,i=e._self._c||s;return i("div",{staticClass:"views-setting-setting"},[i("h1",[e._v("设置页面")]),i("ul",[i("li",[i("span",[e._v("是否开启本地接口调试调用： ")]),i("el-switch",{on:{change:e.handlerChangeLocalApiUse},model:{value:e.isLocalApiUse,callback:function(s){e.isLocalApiUse=s},expression:"isLocalApiUse"}})],1)])])},n=[],a={data:function(){return{isLocalApiUse:!1}},mounted:function(){"true"==sessionStorage.getItem("isLocalApiUse")&&(this.isLocalApiUse=!0)},methods:{handlerChangeLocalApiUse:function(e){e?(sessionStorage.setItem("isLocalApiUse","true"),this.isLocalApiUse=!0):(sessionStorage.removeItem("isLocalApiUse"),this.isLocalApiUse=!1)}}},o=a,c=(i("d1b1"),i("9ca4")),l=Object(c["a"])(o,t,n,!1,null,"c199f7b2",null);s["default"]=l.exports}}]);