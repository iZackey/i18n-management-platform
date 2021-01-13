<template>
    <div class="views-type-list" v-loading="isLoading">
        <h1>项目分类</h1>

        <div class="type-list">
            <el-row :gutter="20">
                <el-col :span="6" v-for="(item,i) in list" :key="i">
                    <div class="grid-content bg-purple" @click="goLangList(item)">
                        <div class="type-name">{{item.typeName}}</div>

                        <div class="operation-btn">
                            <i class="el-icon-delete" slot="reference" @click.stop="deleteType(item)"></i>
                            <i class="el-icon-edit" @click.stop="editType(item)"></i>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple" @click="addTypeItem" style="cursor:pointer">
                        <div class="type-name"><i class="el-icon-circle-plus"></i></div>
                    </div>
                </el-col>
            </el-row>
        </div>

        <el-dialog
        title="提示"
        :visible.sync="isShowAddDialog"
        width="30%"
        :destroy-on-close="true"
        @before-close="beforeCloseAddDialog"
        :close-on-click-modal="false"
        >

        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
            <el-form-item label="项目名称" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
            <el-button @click="isShowAddDialog = false">取 消</el-button>
            <el-button type="primary" @click="submitData">确 定</el-button>
        </div>
        </el-dialog>


    </div>
</template>
<script>
import ajax from '@/utils/ajax.js'

export default{
    data(){
        return {
            list:[],
            isShowAddDialog: false,
            ruleForm:{
                id:'',
                name:''
            },
            rules:{
                name: [
                    { required: true, message: '请输入项目名称', trigger: 'blur' }
                ],
            },
            isLoading: false,
        }
    },

    mounted(){
        this.getTypeList()
    },

    methods:{
        getTypeList(){
            this.isLoading = true;
            ajax({
                url:'getTypeList',
                method:'get'
            }).then(json => {
                if(json.result == 'true'){
                    this.list = json.data || [];
                }
                this.isLoading = false;
            })
        },

        addTypeItem(){
            this.isShowAddDialog = true;
        },

        submitData(){
            if(this.ruleForm.name){
                let params = {
                    typeName: this.ruleForm.name
                }
                if(this.ruleForm.id){
                    params.id = this.ruleForm.id;
                }
                ajax({
                    url: this.ruleForm.id? 'editType': 'addType',
                    method:'post',
                    data:{
                        ...params
                    }
                }).then(json => {
                    if(json.result == 'true'){
                        this.$showOk('添加成功');
                        this.getTypeList();
                        this.isShowAddDialog = false;
                    }
                })
            }
        },

        deleteType(item){
             this.$confirm('确认删除（'+item.typeName+'）吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                ajax({
                    url:'deleteType',
                    method:'post',
                    data:{
                        id: item.id
                    }
                }).then(json => {
                    if(json.result == 'true'){
                        this.$showOk('删除成功');
                         this.getTypeList();
                    }
                })
            }).catch(() => {

            });

        },

        //编辑项目
        editType(item){
            this.ruleForm.id = item.id;
            this.ruleForm.name = item.typeName;
            this.isShowAddDialog = true;
        },

        beforeCloseAddDialog(){
            this.ruleForm.id = '';
            this.ruleForm.name = '';
        },

        goLangList(item){
            this.$router.push({
                path:'/langList',
                query:{
                    typeId: item.id,
                    typeName: item.typeName
                }
            })
        }

    }
}
</script>

<style lang="scss" scoped>
h1{
    font-size:28px;
    margin-bottom: 20px;
}
.type-list{
    .el-row {
        margin-bottom: 20px;

        &:last-child {
            margin-bottom: 0;
        }
    }

    .el-col {
        border-radius: 4px;
        margin-bottom: 10px;
    }

    .bg-purple-dark {
        background: #99a9bf;
    }

    .bg-purple {
        background: #d3dce6;
    }

    .bg-purple-light {
        background: #e5e9f2;
    }

    .grid-content {
        border-radius: 4px;
        height: 100px;
        position:relative;

        .type-name{
            line-height:100px;
            text-align:center;
            font-size:26px;
            cursor: pointer;
        }
        .el-icon-circle-plus{
            font-size:30px;
            line-height:102px;
        }

        .operation-btn{
            position:absolute;
            right:20px;
            top:10px;

            i{
                margin-left:5px;
                cursor:pointer;
            }
        }
    }

    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
}
</style>
