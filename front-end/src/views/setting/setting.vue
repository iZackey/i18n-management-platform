<template>
    <div class="views-setting-setting">
        <h1>设置页面</h1>
        <ul>
            <li>
                <span>是否开启本地接口调试调用： </span>

                <el-switch
                v-model="isLocalApiUse"
                @change="handlerChangeLocalApiUse"
                >
                </el-switch>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data(){
        return  {
            isLocalApiUse: false, //是否开启本地接口调试调用
        }
    },

    mounted(){
        if(sessionStorage.getItem('isLocalApiUse') == 'true'){
            this.isLocalApiUse = true;
        }
    },

    methods:{
        handlerChangeLocalApiUse(val){
            if(val){
                sessionStorage.setItem('isLocalApiUse', 'true')
                this.isLocalApiUse = true;
            }else{
                sessionStorage.removeItem('isLocalApiUse')
                this.isLocalApiUse = false;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
h1{
    font-size:28px;
    margin-bottom: 20px;
}
</style>
