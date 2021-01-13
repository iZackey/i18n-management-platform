/**
 * 浏览器兼容性检测，仅PC端用的，如果不是PC端就跳转到app的下载页面去了
 */
var oCheckBrowser = {
    /**
     * 检验移动端浏览器
     */
    browserRedirect:function(){
        var sUserAgent = navigator.userAgent.toLowerCase();
        var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
        var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
        var bIsMidp = sUserAgent.match(/midp/i) == "midp";
        var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
        var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
        var bIsAndroid = sUserAgent.match(/android/i) == "android";
        var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
        var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";

        //如果是移动端就跳转到app下载页面
        if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
            return true;
        }else{
            return false;
        }
    }
    /**
     * 检验PC端浏览器
     */
    ,getIEVersion:function(){
        var sVersion = "undefined";
        var userAgent = navigator.userAgent.toLowerCase();
        if (userAgent.match(/msie ([\d.]+)/) != null) {
            uaMatch = userAgent.match(/msie ([\d.]+)/); //ie6--ie9
            sVersion =  uaMatch[1];
        } else if (userAgent.match(/(trident)\/([\w.]+)/)) {
            uaMatch = userAgent.match(/trident\/([\w.]+)/);
            switch (uaMatch[1]) {
                case "4.0":
                    sVersion = "8";
                    break;
                case "5.0":
                    sVersion = "9";
                    break;
                case "6.0":
                    sVersion = "10";
                    break;
                case "7.0":
                    sVersion = "11";
                    break;
                default:
                    sVersion = "undefined";
            }
        }
        return sVersion;
    }
};


//PC浏览器的判断
if (oCheckBrowser.getIEVersion() != "undefined") {
    if (parseInt(oCheckBrowser.getIEVersion()) < 11) {
        window.location.href = "//static.daydao.com/static/common/html/nonsupport/notsupport.html?v=" + (new Date()).getTime(); //跳转到不支持的页面
    }
}
