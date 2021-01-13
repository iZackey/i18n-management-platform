<template>
    <div class="clearfix" :class="prefixCls">
        <h1>字段回收站</h1>
        <el-row class="top-btns">

        </el-row>

        <div class="lang-list-table" v-loading="isLoading" :id="prefixCls + '-page-table'">
            <el-table
                :data="tableData"
                style="width: 100%"
                :height="tableHeight"
                ref='multipleTable'
                stripe
            >
                <el-table-column
                    prop="iIndex"
                    label="序号"
                    align="center"
                    width="100">
                </el-table-column>

                <el-table-column
                    prop="field_id"
                    label="字段id"
                    width="110px"
                >
                </el-table-column>

                <el-table-column
                    prop="lib_name"
                    label="所属语言包"
                    width="110px"
                >
                </el-table-column>

                <el-table-column
                    prop="field_key"
                    label="字段key"
                    width="200px"
                >
                </el-table-column>

                <el-table-column
                    prop="field_detail_json"
                    label="语言包详情"
                >
                </el-table-column>

                <el-table-column
                    prop="user_name"
                    label="删除人"
                    width="110px"
                >
                </el-table-column>

                <el-table-column
                    prop="delete_time"
                    label="删除时间"
                    width="160px"
                >
                </el-table-column>

                <el-table-column
                    prop="id"
                    label="操作"
                    width="110px"
                >
                    <template>
                        <p class="lang-operation">

                        </p>
                    </template>
                </el-table-column>

            </el-table>
        </div>

        <!--翻页-->
        <div :class="[prefixCls + '-pager']">
            <el-pagination
                size="small"
                background
                layout="total, prev, pager, next, sizes"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="Number(pageSize)"
                :total="Number(pageTotal)"
                :current-page="Number(pageNo)"
                @current-change="onChangePageNo"
                @size-change="onPageSizeChange"
            ></el-pagination>
        </div>

    </div>
</template>

<script>
import ajax from '@/utils/ajax.js'
import moment from 'moment';

export default {
    data(){
        return {
            prefixCls:'views-recycleList-recycleList',
            isLoading: false,
            tableData: [],
            langList:[],
            tableHeight: 200,
            pageSize:50,
            pageTotal:0,
            pageNo:1,
        }
    },

    mounted(){
        setTimeout(() => {
            this.setTableHeight();
        }, 20)
        window.addEventListener('resize', this.setTableHeight);

        this.isLoading = true;
        this.getLangList().then(() => {
            this.getList().then(() => {
                this.isLoading = false;
            })
        })
    },

    beforeDestroy(){
        window.removeEventListener('resize', this.setTableHeight);
    },

    methods:{
        getLangList(){
            return new Promise((resolve, reject) => {
                ajax({
                    url:'getLangListByTypeId',
                    data:{
                        typeId:'' //为空表示获取全部的分类
                    }
                }).then((json) => {
                    if(json.result == 'true'){
                        const data = json.data || [];
                        let obj = {};
                        data.forEach(item => {
                            obj[item.id] = item.name;
                        });
                        this.langList = obj;
                    }
                    resolve();
                })
            })
        },

        getList(){
            return new Promise((resolve, reject) => {
                ajax({
                    url:'fields/getRecycleList',
                    data:{
                        pageSize: Number(this.pageSize),
                        pageNo: Number(this.pageNo)
                    }
                }).then(json => {
                    if(json.result == 'true'){
                        this.tableData = (json.list || []).map((item,i) => ({
                            ...item,
                            iIndex: i +1,
                            lib_name: this.langList[item.lib_id]
                        }));
                        this.pageTotal = json.total || 0
                    }
                    resolve();
                })
            })
        },

        setTableHeight() {
            this.tableHeight =
                document.documentElement.clientHeight -
                document.querySelector('#' + this.prefixCls + '-page-table').getBoundingClientRect().top - 75; //60的值为为底部和翻页控件预留空间
        },

        onChangePageNo(num) {
            this.pageNo = String(num);
            this.getList(() => {
                this.$refs.multipleTable.bodyWrapper.scrollTop = 0;
            });
        },
        onPageSizeChange(num) {
            this.pageSize = String(num);
            this.getList(() => {
                this.$refs.multipleTable.bodyWrapper.scrollTop = 0;
            });
        },

        goback(){
            this.$router.go(-1);
        },
    }
}
</script>

<style lang="scss">
$prefixCls: views-recycleList-recycleList;
.#{$prefixCls}{
    h1{
        font-size:28px;
        margin-bottom: 20px;
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

            .el-icon-delete{
                cursor:pointer;
            }
        }
    }

    &-pager{
        margin-top:15px;
        text-align: right;
    }
}
</style>
