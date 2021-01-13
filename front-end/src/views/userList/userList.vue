<template>
    <div class="clearfix" :class="prefixCls">
        <h1>用户列表</h1>
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
                        width="100">
                    </el-table-column>
                    <el-table-column
                        prop="user_name"
                        label="用户名"
                        >
                    </el-table-column>

                    <el-table-column
                        prop="mobile"
                        label="手机号">
                        <template slot-scope="scope">
                            {{hideMobile(scope.row.mobile)}}
                        </template>
                    </el-table-column>

                    <el-table-column
                        prop="email"
                        label="邮箱">
                    </el-table-column>

                    <el-table-column
                        prop="update_time"
                        label="登录时间">
                    </el-table-column>

                    <el-table-column
                        prop="create_time"
                        label="首次登录时间">
                    </el-table-column>

                    <el-table-column
                        prop="id"
                        label="操作">
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
            prefixCls:'views-userList-userList',
            isLoading: false,
            tableData: [],
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
        Promise.all([this.getList()]).then(() => {
            this.isLoading = false;
        })
    },

    beforeDestroy(){
        window.removeEventListener('resize', this.setTableHeight);
    },

    methods:{
        //隐藏手机号码部分
        hideMobile(str){
            str = str || '';
            return str.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
        },

        getList(){
            return new Promise((resolve, reject) => {
                ajax({
                    url:'user/list',
                    data:{
                        pageSize:50,
                        pageNo:1
                    }
                }).then(json => {
                    if(json.result == 'true'){
                        this.tableData = (json.list || []).map((item,i) => ({
                            ...item,
                            iIndex: i +1
                        }));
                        this.pageTotal = json.total || 0;
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
            this.getDetail(() => {
                this.$refs.multipleTable.bodyWrapper.scrollTop = 0;
            });
        },
        onPageSizeChange(num) {
            this.pageSize = String(num);
            this.getDetail(() => {
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
$prefixCls: views-userList-userList;
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
