<template>
    <div :class="prefixCls" v-loading="isLoading">
        <h1>语言包列表 <span class="type-name">({{typeName}})</span></h1>
        <el-row class="top-btns">
            <el-button type="primary" size="small" @click="addLang">添加语言包</el-button>
            <el-button size="small" @click="goback">返回</el-button>
        </el-row>

        <div class="lang-list-table" v-loading="isLoading">
                <el-table
                :data="tableData"
                style="width: 100%"
                stripe
                >
                    <el-table-column
                        prop="iIndex"
                        label="序号"
                        align="center"
                        width="50">
                    </el-table-column>
                    <el-table-column
                        prop="id"
                        label="ID"
                        width="100">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="名称"
                        >
                        <template slot-scope="scope">
                            <p class="lang-name" @click="goLangDetail(scope.row)">{{scope.row.name}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="type"
                        label="类型">
                        <template slot-scope="scope">
                            <p>{{getTypeName(scope.row.type)}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="create_time"
                        label="创建时间">
                    </el-table-column>

                    <el-table-column
                        prop="update_time"
                        label="最后更新时间">
                    </el-table-column>

                    <el-table-column
                        prop="type"
                        label="操作">
                        <template slot-scope="scope">
                            <p class="lang-operation">
                                <i class="el-icon-delete" @click="deleteLang(scope.row)"></i>
                                <i class="el-icon-edit" @click="editLang(scope.row)" style="margin-left:10px;"></i>
                            </p>
                        </template>
                    </el-table-column>

                </el-table>
        </div>

        <el-dialog
            :title="(editFormData.id? '编辑':'新增') + '语言包'"
           :visible.sync="editFormData.isShow"
           :close-on-click-modal="false"
            width="500px"
        >
            <el-form size="small" :model="editFormData" ref="editFormData" label-width="120px" :rules="formRules" v-if="editFormData.isShow" >
                <el-form-item
                    label="语言包名"
                    size="small"
                    prop="name">
                    <el-input v-model="editFormData.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="saveEditFormData" size="small">保 存</el-button>
                    <el-button @click="editFormData.isShow = false" size="small">取 消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import ajax from '@/utils/ajax.js'
export default {
    data(){
        return {
            prefixCls:'views-lang-list',
            isLoading: false,
            tableData: [],
            typeName:'',
            typeList:[],
            editFormData:{
                isShow:false,
                name:'',
                id:'', //为空表示新增
            },
            formRules:{},
        }
    },

    mounted(){
        this.typeName = this.$route.query.typeName;
        this.isLoading = true;
        Promise.all([this.getList(), this.getTypeList()]).then(() => {
            this.isLoading = false;
        })
    },

    methods:{
        getList(){
            return new Promise((resolve, reject) => {
                ajax({
                    url:'getLangListByTypeId',
                    data:{
                        typeId: this.$route.query.typeId
                    }
                }).then(json => {
                    if(json.result == 'true'){
                        this.tableData = (json.data || []).map((item,i) => ({...item, iIndex: i +1}));
                    }
                    resolve();
                })
            })
        },

        reloadList(){
            this.isLoading = true;
            this.getList().then(() => {
                this.isLoading = false;
            })
        },

        getTypeList(){
             return new Promise((resolve, reject) => {
                ajax({
                    url:'getTypeList',
                    method:'get'
                }).then(json => {
                    if(json.result == 'true'){
                        this.typeList = json.data || [];
                    }
                    resolve();
                })
             });
        },

        saveEditFormData(){
            this.isLoading = true;
            ajax({
                url: this.editFormData.id? 'lib/editLib': 'lib/addLib',
                data: this.editFormData.id? {
                    id: this.editFormData.id,
                    name: this.editFormData.name
                }: {
                    type: this.$route.query.typeId,
                    name: this.editFormData.name
                }
            }).then(json => {
                this.isLoading = false;
                if(json.result == 'true'){
                    this.$showOk('添加成功');
                    this.editFormData.isShow = false;
                    this.reloadList();
                }
            })
        },

        getTypeName(id){
            return (this.typeList.find(item => item.id == id) || {}).typeName;
        },

        //查看语言包详情，进入编辑
        goLangDetail(item){
            this.$router.push({
                path:'/langDetail',
                query:{
                    libId: item.id
                }
            })
        },

        //删除语言包
        deleteLang(item){
             this.$confirm('确认删除（'+item.name+'）吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.isLoading = true;
                ajax({
                    url:'lib/deleteLib',
                    method:'post',
                    data:{
                        id: item.id
                    }
                }).then(json => {
                    this.isLoading = false;
                    if(json.result == 'true'){
                        this.$showOk('删除成功');
                        this.getList()
                    }
                })
            }).catch(() => {

            });
        },

        editLang(row){
            let editFormData = this.editFormData;
            editFormData.isShow = true;
            editFormData.name = row.name;
            editFormData.id = row.id;
            this.editFormData = editFormData;
        },

        //添加语言包
        addLang(){
            let editFormData = this.editFormData;
            editFormData.isShow = true;
            editFormData.name = '';
            editFormData.id = ''; //为空标示新增
            this.editFormData = editFormData;
        },

        goback(){
            this.$router.go(-1);
        },
    }
}
</script>

<style lang="scss">
    $prefixCls:views-lang-list;
    .#{$prefixCls}{
        h1{
            font-size:28px;
            margin-bottom: 20px;

            span.type-name{
                font-size:16px;
                font-weight: normal;
            }
        }

        .top-btns{
            margin-bottom: 15px;
        }

        .lang-list-table{
            .lang-name{
                color:blue;
                cursor:pointer;
            }

            .lang-operation{
                font-size:16px;

                i{
                    cursor:pointer;
                }
            }
        }
    }
</style>
