<template>
    <div :id="prefixCls">
        <el-container :style="{height: mainHeight}">
            <left-aside></left-aside>

            <el-container>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
import leftAside from '@/components/leftAside/leftAside.vue'
export default {
    name:'daydaoMain',
    components:{
        leftAside
    },
    data() {
        const item = {
            date: "2016-05-02",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1518 弄"
        };
        return {
            prefixCls: "daydao-app-main",
            mainHeight: "100%"
        };
    },

    mounted(){
        this.mainHeight = document.documentElement.clientHeight + 'px'
        window.addEventListener('resize', this.handlerResize)
    },

    beforeDestroy(){
        window.removeEventListener('resize', this.handlerResize);
    },

    methods:{
        handlerResize(){
            this.mainHeight = document.documentElement.clientHeight + 'px'
        }
    }

};
</script>
<style lang="scss">
$prefixCls: "daydao-app-main";
##{$prefixCls} {
    .el-header {
        background-color: #b3c0d1;
        color: #333;
        line-height: 60px;
    }

    .el-aside {
        color: #333;
    }
}
</style>
