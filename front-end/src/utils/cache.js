const Cache = {
  /**
     * 获取缓存
     * @key 缓存的键
     * @type 缓存的类型 local:localStorage,session:sessionStorage，默认使用localStorage
     * */
  getCache:function(key,type){
    type = type || 'local';
    var oVal = null;
    var sVal;

    //组装key，根据dd号，项目标识
    key = this._getFullKey(key);

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
    //组装key，根据dd号，项目标识
    key = this._getFullKey(key);

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

    //组装key，根据dd号，项目标识
    key = this._getFullKey(key);

    //如果是localStorage
    if(type == 'local'){
      localStorage.removeItem(key);
    }else if(type == 'session'){ //如果是sessionStorage
      sessionStorage.removeItem(key);
    }
  },
  /**
     * 组装key，根据dd号，项目标识
     * */
  _getFullKey:function (key) {
    //组装key，根据dd号，项目标识
    const userInfo = localStorage.getItem('userInfo') || {};

    if(userInfo.dd){
      key = userInfo.dd + '-' + key;
    }
    return key;
  }

};

export default Cache;
