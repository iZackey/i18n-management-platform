import Vue from 'vue'
import ElementUI, {
    Message,
    Loading
} from 'element-ui'
import './style/element-variables.scss'
import './style/element-rewrite.scss'
import Utils from '@/utils/utils'

Vue.use(ElementUI)

// 通用工具的注入到vue中
Vue.mixin({
    created: function () {
        //成功提示
        this.$showOk = (str = '', options = {}) => {
            Message.closeAll();
            Message({
                type: 'success',
                duration: 3000, //默认显示3秒
                ...options,
                message: str
            })
        };

        //失败提示
        this.$showError = (str = '', options = {}) => {
            Message.closeAll();
            Message({
                type: 'error',
                duration: 3000, //默认显示3秒
                ...options,
                message: str
            })
        };

        //警告提示
        this.$showWarning = (str = '', options = {}) => {
            Message.closeAll();
            Message({
                type: 'warning',
                duration: 3000, //默认显示3秒
                ...options,
                message: str
            })
        };

        //全屏遮罩加载中
        this.$loading = (options = {}) => {
            return Loading.service({
                fullscreen: true,
                ...options
            })
        }
    },

    methods: {
        /**
         * 是否具备某模块、功能的权限
         * @param moduleId String 模块id
         * @param functionId String 功能id
         * @return Boolean 是否有权限
         * */
        isHasAuth(moduleId, functionId) {
            return Utils.isHasAuth(moduleId, functionId)
        }
    }
});
