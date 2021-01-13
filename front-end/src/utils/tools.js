/**
 * Created by zhangqi on 2015/7/10.
 * 一些工具函数
 */

const Tools = {
  /**
     * 浏览器缓存工具利用webStorage(sessionStorage、localStorage)
     * */
  Cache:{
    /**
         * 获取缓存
         * @key 缓存的键
         * @type 缓存的类型 local:localStorage,session:sessionStorage，默认使用localStorage
         * */
    getCache:function(key,type){
      type = type || 'local';
      var oVal = null;
      var sVal;
      //如果是localStorage

      if(type == 'local'){
        sVal = localStorage.getItem(key);
      }else if(type == 'session'){ //如果是sessionStorage
        sVal = sessionStorage.getItem(key);
      }else{
        sVal = localStorage.getItem(key);
      }
      //转换数据
      try {
        oVal = JSON.parse(sVal);
      } catch (e) {
        oVal = null;
        console.error('json格式有误');
      }
      return oVal;
    },
    /**
         * 设置缓存
         * @key 缓存的键
         * @type 缓存的类型(local,session)：localStorage、sessionStorage，默认使用localStorage
         * */
    setCache:function(key,value,type){
      type = type || 'local';
      if(!value){
        return;
      }
      //如果是localStorage
      if(type == 'local'){
        if(typeof value === 'string'){
          localStorage.setItem(key,value);
        }
        if(typeof value === 'object'){
          localStorage.setItem(key,JSON.stringify(value));
        }
      }else if(type == 'session'){ //如果是sessionStorage
        if(typeof value === 'string'){
          sessionStorage.setItem(key,value);
        }
        if(typeof value === 'object'){
          sessionStorage.setItem(key,JSON.stringify(value));
        }
      }
    },
    /**
         * 移除缓存
         * @key 缓存的键
         * @type 缓存的类型 local:localStorage,session:sessionStorage，默认使用localStorage
         * */
    removeCache:function(key,type){
      type = type || 'local';
      //如果是localStorage
      if(type == 'local'){
        localStorage.removeItem(key);
      }else if(type == 'session'){ //如果是sessionStorage
        sessionStorage.removeItem(key);
      }
    }

  },
  /**
     * 加密结果工具
     * */
  LockerStr:{
    /**
         * 加密
         * @str 字符串
         * @secretKey key
         * */
    encrypt:function(str, secretKey) {
      if (secretKey == null || secretKey.length <= 0) {
        alert('Please enter a key with which to encrypt the message.');
        return null;
      }
      var prand = '';

      for (var i = 0; i < secretKey.length; i++) {
        prand += secretKey.charCodeAt(i).toString();
      }
      var sPos = Math.floor(prand.length / 5);
      var mult = parseInt(prand.charAt(sPos) + prand.charAt(sPos * 2) + prand.charAt(sPos * 3) + prand.charAt(sPos * 4) + prand.charAt(sPos * 5));
      var incr = Math.ceil(secretKey.length / 2);
      var modu = Math.pow(2, 31) - 1;

      if (mult < 2) {
        alert('Algorithm cannot find a suitable hash. Please choose a different key. \nPossible considerations are to choose a more complex or longer key.');
        return null;
      }
      var salt = Math.round(Math.random() * 1000000000) % 100000000;

      prand += salt;
      while (prand.length > 10) {
        prand = (parseInt(prand.substring(0, 10)) + parseInt(prand.substring(10, prand.length))).toString();
      }
      prand = (mult * prand + incr) % modu;
      var enc_chr = '';
      var enc_str = '';

      for (var i = 0; i < str.length; i++) {
        enc_chr = parseInt(str.charCodeAt(i) ^ Math.floor(prand / modu * 255));
        if (enc_chr < 16) {
          enc_str += '0' + enc_chr.toString(16);
        } else {
          enc_str += enc_chr.toString(16);
        }
        prand = (mult * prand + incr) % modu;
      }
      salt = salt.toString(16);
      while (salt.length < 8) {
        salt = '0' + salt;
      }
      enc_str += salt;
      return enc_str;
    },
    /**
         * 加密
         * @str 字符串
         * @secretKey key
         * */
    decrypt:function(str, secretKey) {
      if (str == null || str.length < 8) {
        alert('A salt value could not be extracted from the encrypted message because it\'s length is too short. The message cannot be decrypted.');
        return;
      }
      if (secretKey == null || secretKey.length <= 0) {
        alert('Please enter a password with which to decrypt the message.');
        return;
      }
      var prand = '';

      for (var i = 0; i < secretKey.length; i++) {
        prand += secretKey.charCodeAt(i).toString();
      }
      var sPos = Math.floor(prand.length / 5);
      var mult = parseInt(prand.charAt(sPos) + prand.charAt(sPos * 2) + prand.charAt(sPos * 3) + prand.charAt(sPos * 4) + prand.charAt(sPos * 5));
      var incr = Math.round(secretKey.length / 2);
      var modu = Math.pow(2, 31) - 1;
      var salt = parseInt(str.substring(str.length - 8, str.length), 16);

      str = str.substring(0, str.length - 8);
      prand += salt;
      while (prand.length > 10) {
        prand = (parseInt(prand.substring(0, 10)) + parseInt(prand.substring(10, prand.length))).toString();
      }
      prand = (mult * prand + incr) % modu;
      var enc_chr = '';
      var enc_str = '';

      for (var i = 0; i < str.length; i += 2) {
        enc_chr = parseInt(parseInt(str.substring(i, i + 2), 16) ^ Math.floor(prand / modu * 255));
        enc_str += String.fromCharCode(enc_chr);
        prand = (mult * prand + incr) % modu;
      }
      return enc_str;
    }
  },
  /**
     * 对日期进行格式化，
     * @param date 要格式化的日期
     * @param format 进行格式化的模式字符串
     *     支持的模式字母有：
     *     y:年,
     *     M:年中的月份(1-12),
     *     d:月份中的天(1-31),
     *     h:小时(0-23),
     *     m:分(0-59),
     *     s:秒(0-59),
     *     S:毫秒(0-999),
     *     q:季度(1-4)
     * @return String
     * @demo: dateFormat(new Date(),'yyyy-MM-dd hh:mm:ss')
     */
  dateFormat:function(date, format){
    if(format ===undefined){
      format = date;
      date =new Date();
    }
    var map ={
      'M': date.getMonth()+1,//月份
      'd': date.getDate(),//日
      'h': date.getHours(),//小时
      'm': date.getMinutes(),//分
      's': date.getSeconds(),//秒
      'q':Math.floor((date.getMonth()+3)/3),//季度
      'S': date.getMilliseconds()//毫秒
    };

    format = format.replace(/([yMdhmsqS])+/g,function(all, t){
      var v = map[t];

      if(v !==undefined){
        if(all.length >1){
          v ='0'+ v;
          v = v.substr(v.length-2);
        }
        return v;
      }else if(t ==='y'){
        return String(date.getFullYear()).substr(4- all.length);
      }
      return all;
    });
    return format;
  },
  /**
     * 转换为unix时间戳
     * @demo get_unix_time("2014-02-27 20:24:50") ==>  "1393503890"
     * */
  getUnixTime:function (dateStr) {
    var newstr = dateStr.replace(/-/g,'/');
    var date = new Date(newstr);
    var time_str = date.getTime().toString();

    return time_str.substring(0, time_str.length-3);
  },
  /**
     * 获取Html转义字符
     * */
  htmlEncode:function(html){
    return document.createElement('a').appendChild(document.createTextNode(html)).parentNode.innerHTML;
  },
  /**
     * 获取Html
     * */
  htmlDecode:function(html){
    var a = document.createElement( 'a' );

    a.innerHTML = html;
    return a.textContent;
  },
  /**
     * 显示信息提示
     * */
  showMsg:{
    //显示正确信息提示
    ok:function (str) {
      window.globalVueApp && window.globalVueApp.$showOk(str);
    },
    //显示错误信息提示
    error:function (str) {
      window.globalVueApp && window.globalVueApp.$showError(str);
    }
  },
  /**
     * 获取url参数
     * url: /index.php?a=1&b=2
     * 调用方式  tools.getUrlParam("a");
     * @name url参数名称
     * */
  getUrlParam:function (name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);

    if (r != null){
      return unescape(r[2]);
    }return null;
  },
  /**
     * param 将要转为URL参数字符串的对象
     * key URL参数字符串的前缀
     * encode true/false 是否进行URL编码,默认为true
     *
     * return URL参数字符串
     * demo: urlParams({a:1,b:2,c:"ccccc"}) -----> "&a=1&b=2&c=ccccc"
     */
  urlParams:function (param, key, encode) {
    var that = this;

    if (param == null) {
      return '';
    }
    var paramStr = '';
    var t = typeof param;

    if (t == 'string' || t == 'number' || t == 'boolean') {
      paramStr += '&' + key + '=' + (encode == null || encode ? encodeURIComponent(param) : param);
    } else {
      for (var i in param) {
        var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);

        paramStr += that.urlParams(param[i], k, encode);
      }
    }
    return paramStr;
  },
  /**
     * 将框架的 infoSetId:org_list&navigationId:355b0215be39 url参数转换成对象
     * */
  paramsToObject:function (str) {
    var t = this;
    var oPara = {}; //附加其他参数
    var params = str;

    if(params && params.indexOf(':') > -1) {
      params.replace(/(\w+)\s*:\s*([\w-]+)/g, function(a, b, c) {
        b && (oPara[b] = c);
      });
    } else {
      oPara = params;
    }
    return oPara;
  },
  /**
     * 国际化语言包处理
     * */
  getI18nLang:function (obj) {
    if(!$.isEmptyObject(obj)){
      var currentLang = $.cookie('lang') || 'zh'; //默认中文

      for(var i in obj){
        if(!$.isEmptyObject(obj[i])){
          for(var j in obj[i]){
            obj[i][j] = obj[i][j][currentLang] || '';
          }
        }
      }
    }
    return obj;
  },

  /**
     * 基础工具---组合URL参数
     * @param params
     * @returns {string}
     */
  getParamsStr: function (params) {
    var paramStr = '';

    if (params) {
      for (var k in params) {
        if (k && params[k] != null) {
          var sParaVal = '';

          if(typeof params[k] === 'string' || typeof params[k] === 'number'){
            sParaVal = params[k];
          }else if(typeof params[k] === 'object'){
            sParaVal = JSON.stringify(params[k]);
          }
          paramStr += '&' + k + '=' + sParaVal;
        }
      }
    }
    if(paramStr){
      paramStr = '?'+paramStr.substring(1);
    }
    return paramStr;
  },
  /**
     * 页面加载的时候的页面显示loading处理方案
     * */
  oPageLoading:{
    //启动loading
    start:function () {
      $('#main_wrap').loading();
      $('#main_wrap').css({minHeight:$(window).height() - ($('#main_menu').height() + $('#main_menu').offset().top) + 'px'});
    },
    //结束loading
    end:function () {
      $('#main_wrap').loading({state:false}); //关闭loading
    }
  },
  /**
     * 表单验证的提示模拟
     * @opts.$input 要验证的表单的jq对象
     * @opts.msg 设置tip提示的内容
     * @opts.zIndex 设置tip提示的显示层级
     * */
  formTipMsg:function (opts) {
    opts = opts || {};
    var t = this;
    var $input = opts.$input;
    var iZindex = opts.zIndex;
    var msg = opts.msg || '格式不正确';

    $input.focus();
    $('body').find('.formTipMsg').remove();

    //遍历页面所有弹窗的层级，保持当前的层级始终处于最高的状态
    var iMaxIndex = 99;

    $('body').find('>.ui-popup,>.layui-layer').each(function(){
      if(parseInt($(this).css('zIndex')) >= iMaxIndex){
        iMaxIndex = parseInt($(this).css('zIndex')) + 1;
      }
    });

    var oStyle = {
      left:$input.offset().left + $input.outerWidth() + 10 + 'px',
      top:$input.offset().top + 'px',
      zIndex:iZindex || iMaxIndex
    };
    var $tip = $('<div class="formTipMsg" style="left: 1924.5px;top: 237px;z-index: 99999;position: absolute;padding: 0px 9px;line-height: 30px;font-size: 12px;border: 1px solid transparent;background-color: #fffcef;border-color: #ffbb76;color: #db7c22;box-shadow: 0 1px 3px #ccc;border-radius: 2px;">' +
            '<span class="icon" style="background: url('+ gMain.baseStaticPath + 'common/plugins/jquery.validator/images/validator_simple.png' +');display: inline-block;vertical-align: middle;background-position: -1px -1px;width: 16px;height: 16px;margin-right: 6px;"></span>' +
            '<span class="des">'+msg+'</span>' +
            '<span class="triangle" style="background:url('+ gMain.baseStaticPath + 'common/images/bgs.png' +');position: absolute;width: 6px;height: 11px;b;left: -6px;top: 9px;"></span>' +
            '</div>');

    if($input.is(':visible')){
      $('body').append($tip);
    }else {
      return false;
    }
    $tip.css(oStyle);
    $input.on('focus click input',function () {
      $('body').find('.formTipMsg').remove();
    });

    $(document).off('click.formTipMsg').on('click.formTipMsg',function (e) {
      $('body').find('.formTipMsg').remove();
    });
  },
  /**
     * 把vuejs格式的数据转换成json
     * */
  parseJson:function (vueData) {
    return JSON.parse(JSON.stringify(vueData));
  },
  /**
     * 格式化文件大小, 输出成带单位的字符串
     * @method formatSize
     * @grammar Base.formatSize( size ) => String
     * @grammar Base.formatSize( size, pointLength ) => String
     * @grammar Base.formatSize( size, pointLength, units ) => String
     * @param {Number} size 文件大小
     * @param {Number} [pointLength=2] 精确到的小数点数。
     * @param {Array} [units=[ 'B', 'K', 'M', 'G', 'TB' ]] 单位数组。从字节，到千字节，一直往上指定。如果单位数组里面只指定了到了K(千字节)，同时文件大小大于M, 此方法的输出将还是显示成多少K.
     * @example
     * console.log( tools.formatSize( 100 ) );    // => 100B
     * console.log( tools.formatSize( 1024 ) );    // => 1.00K
     * console.log( tools.formatSize( 1024, 0 ) );    // => 1K
     * console.log( tools.formatSize( 1024 * 1024 ) );    // => 1.00M
     * console.log( tools.formatSize( 1024 * 1024 * 1024 ) );    // => 1.00G
     * console.log( tools.formatSize( 1024 * 1024 * 1024, 0, ['B', 'KB', 'MB'] ) );    // => 1024MB
     */
  formatSize: function( size, pointLength, units ) {
    var unit;

    units = units || ['B', 'K', 'M', 'G', 'TB'];
    while ( (unit = units.shift()) && size > 1024 ) {
      size = size / 1024;
    }
    return (unit === 'B' ? size : size.toFixed( pointLength || 2 )) + unit;
  },

  /**
     * 将aFields中的字段找到field_name满足条件的字段对象
     */
  findField(sourceArr, field_name) {
    let field = {};

    function findField(sourceArr) {
      for (let i = 0; i < sourceArr.length; i++) {
        let field_type = sourceArr[i].field_type;

        if(field_type === 'group') {
          if (sourceArr[i].field_name === field_name) {
            field = sourceArr[i];
          } else {
            findField(sourceArr[i].group.fields);
          }
        } else if (field_type === 'twoColumns') {
          findField(sourceArr[i].firstCol.fields);
          findField(sourceArr[i].secondCol.fields);
        } else if (field_type === 'threeColumns') {
          findField(sourceArr[i].firstCol.fields);
          findField(sourceArr[i].secondCol.fields);
          findField(sourceArr[i].thirdCol.fields);
        } else if (sourceArr[i].field_name === field_name) {
          field = sourceArr[i];
        }
      }
    }
    findField(sourceArr);
    return field;
  }


};

export default Tools;
