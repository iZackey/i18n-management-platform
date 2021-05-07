<template>
    <div class="clearfix" :class="prefixCls" v-loading="isLoading" :element-loading-text="loadingText">
        <div class="clearfix" :class="prefixCls + '-top'">
            <h1>
                <span>语言包详情</span>
                <el-tooltip class="item" effect="dark" content="温馨提示：双击下面数据可以在线编辑；列的宽度可拖拽调整；" placement="right">
                    <i class="el-icon-info"></i>
                </el-tooltip>
            </h1>

            <h2 class="lib-name">
                语言包名称：{{libName}}
            </h2>
        </div>
        <div class="button-list clearfix">
            <div class="left">
                <el-button
                    size="small"
                    type="primary"
                    v-if="parentId && parentId != '0'"
                    @click="gobackTop">返回顶级</el-button>
                <el-button
                    size="small"
                    type="primary"
                    @click="handleAddChildGrade">添加{{parentId? '子': ''}}字段</el-button>
                <el-button
                    size="small"
                    type="primary"
                    @click="handleBatchAddChildGrade">批量添加{{parentId && parentId != '0'? '子': ''}}字段</el-button>

                <span style="margin-left: 10px;" v-if="parentId && parentId != '0'">父字段为：{{formatParentKey(parentKey)}}</span>
            </div>
           <div class="right">
               <div class="search-wrapper">
                   <el-input size="small" clearable placeholder="请输入关键词搜索" @keyup.native.enter="handlerSearch" v-model="keyword" @clear="handlerSearch" class="input-with-select">
                       <el-select v-model="searchType" slot="prepend" placeholder="请选择" style="width: 100px; text-align: center;">
                           <el-option label="精确搜索" value="0"></el-option>
                           <el-option label="模糊搜索" value="1"></el-option>
                           <el-option label="全局搜索" value="2"></el-option>
                       </el-select>
                       <el-button size="small" slot="append" icon="el-icon-search" @click="handlerSearch"></el-button>
                   </el-input>
               </div>
               <el-button type="primary" size="small" @click="previewJson()">预览&导出JSON</el-button>

         <!-- <el-dropdown size="small">
                   <el-button type="primary" size="small">
                       导出JSON<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>
                   </el-button>
                   <el-dropdown-menu slot="dropdown">
                       <el-dropdown-item @click.native="downLoad('zh')">导出简体中文</el-dropdown-item>
                       <el-dropdown-item @click.native="downLoad('zh-hk')">导出繁体中文</el-dropdown-item>
                       <el-dropdown-item @click.native="downLoad('en')">导出英文</el-dropdown-item>
                   </el-dropdown-menu>
               </el-dropdown>-->
           </div>
        </div>

        <div class="page-table-data" :id="prefixCls + '-page-table'">
            <!--有border属性，列的宽度可拖拽调整-->
            <el-table
                :data="tableData"
                style="width: 100%;margin-bottom: 20px;"
                :height="tableHeight"
                ref='multipleTable'
                border
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
                    align="center"
                    class-name="field-id"
                    width="70">
                </el-table-column>

                <el-table-column
                    prop="key"
                    label="字段名"
                    class-name="field-name"
                >
                    <template slot="header">
                        字段名
                    </template>
                    <template slot-scope="scope">
                        <div v-if="scope.row.parent_key" style="display: inline;">
                            <span title="进入子级" v-for="(item, i) in scope.row.parent_key" :key="i" @click="goToChildrenKeys(scope.row, i)">
                                <i class="parent-key">{{item}}</i> /
                            </span>
                        </div>

                        <template v-if="scope.row.keyIsEdit">
                            <el-input v-model="scope.row.key" type="text" style="width: 150px" @blur="blurEdit(scope.row, 'key')" :ref="'key'+scope.row.id"></el-input>
                        </template>
                        <template v-else>
                            <span @dblclick="dblclickEdit(scope.row, 'key')" >{{ scope.row.key }}</span>
                            <span style="margin-left: 10px;" class="parent-key" v-if="scope.row.is_has_children == '1'" @click="goToChildrenKeys(scope.row)">进入子级</span>
                        </template>
                        <el-button size="mini" type="success" plain title="复制key的完整路径" class="cell-btn-copy" @click.native="copyFullKeyPath(scope.row)">复制</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="zh"
                    label="中文(zh)"
                >
                    <template slot-scope="scope">
                        <template v-if="scope.row.zhIsEdit">
                            <el-input v-model="scope.row.zh" type="text" @blur="blurEdit(scope.row, 'zh')" :ref="'zh'+scope.row.id"></el-input>
                        </template>
                        <template v-else>
                            <p class="lang-field-content" @dblclick="dblclickEdit(scope.row, 'zh')" v-if="scope.row.is_has_children != '1'">{{ scope.row.zh }}</p>
                            <i class="el-icon-search find-translate-from-history" title="查找历史翻译" @click="findHistoryTranslate(scope.row)"></i>
                        </template>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="en"
                    label="English(en)"
                >
                    <template slot-scope="scope">
                        <template v-if="scope.row.enIsEdit">
                            <el-input v-model="scope.row.en" type="text" @blur="blurEdit(scope.row, 'en')" :ref="'en'+scope.row.id"></el-input>
                        </template>
                        <template v-else>
                            <p class="lang-field-content" @dblclick="dblclickEdit(scope.row, 'en')" v-if="scope.row.is_has_children != '1'">{{ scope.row.en }}</p>
                        </template>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="update_time"
                    label="更新时间"
                    width="160px"
                >
                </el-table-column>
                <el-table-column
                    prop="user_name"
                    label="最后修改人"
                    width="110px"
                >
                </el-table-column>
                <el-table-column label="操作" width="200px"  class-name="field-opration">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            class="btn-add-children"
                            type="success"
                            plain
                            @click="handleAddBrotherGrade(scope.row)">增加同级</el-button>
                        <el-button
                            size="mini"
                            class="btn-add-children"
                            type="success"
                            plain
                            @click="handleAddChildGrade(scope.row)">增加子级</el-button>
                        <el-button
                            size="mini"
                            class="btn-delete"
                            type="danger"
                            plain
                            @click="handleDeleteData(scope.row)">删除</el-button>
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

         <!--复制专用文本框，隐藏-->
         <div :class="prefixCls + '-copy-text-wrapper'">
             <textarea :class="prefixCls + '-copy-text'"></textarea>
         </div>

        <!-- 新增字段 -->
        <el-dialog
            :title="addFieldForm.parent_id && addFieldForm.parent_id != '0'? '增加子结点': '增加结点'"
            custom-class="addField_cancel"
            :visible.sync="addFieldForm.addFieldCancel"
            :close-on-click-modal="false"
            width="500px"
            v-dialogDrag
        >
            <el-form size="small" :model="addFieldForm" ref="addFieldForm" label-width="120px" :rules="rules" v-if="addFieldForm.addFieldCancel">
                <el-form-item label="父级名称：" v-if="addFieldForm.parent_id && addFieldForm.parent_id != '0'">
                    {{ addFieldForm.parent_key }}
                </el-form-item>
                <el-form-item
                    label="字段名"
                    size="small"
                    prop="name">
                    <el-input v-model="addFieldForm.key"></el-input>
                </el-form-item>
                <el-form-item
                    label="中文"
                    size="small"
                    prop="zh_cn">
                    <el-input v-model="addFieldForm.zh"></el-input>
                </el-form-item>
                <el-form-item
                    label="英文"
                    size="small"
                    prop="en_cn">
                    <el-input v-model="addFieldForm.en"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addFieldSubmit" size="small">保 存</el-button>
                    <el-button @click="addFieldForm.addFieldCancel = false" size="small">取 消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <el-dialog
            :title="'批量' + (parentId? '增加子结点': '增加结点')"
            :visible.sync="batchAddFieldForm.isShow"
            :close-on-click-modal="false"
            width="600px"
            v-dialogDrag
        >
            <el-form size="small" :model="batchAddFieldForm" ref="batchAddFieldForm" label-width="0px" :rules="batchRules" v-if="batchAddFieldForm.isShow" :class="[prefixCls + '-batchAddFieldForm']">
                <el-form-item
                    size="small"
                    prop="jsonStr">
                    <div>
                        在此处粘贴json字符串，以便快速添加，格式如：{"a": "我是A"}
                    </div>
                    <div>
                        <el-input type="textarea" v-model="batchAddFieldForm.jsonStr" :rows="20" autofocus></el-input>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="batchAddFieldSubmit" size="small">保 存</el-button>
                    <el-button @click="batchAddFieldForm.isShow = false" size="small">取 消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <el-dialog
            title="预览json"
            :visible.sync="previewJsonObj.isShow"
            :close-on-click-modal="false"
            width="90%"
            v-dialogDrag
        >
            <div :class="prefixCls + '-preview-json-text'">
                <ul class="title">
                    <li>
                        中文json
                        <a href="javascript:void (0)" @click="copyText(previewJsonObj.jsonStrZh)">复制代码</a>
                        <a href="javascript:void (0)" @click="downloadFile('zh.json', previewJsonObj.jsonStrZh)">下载JSON</a>
                    </li>
                    <li>
                        繁体中文json
                        <a href="javascript:void (0)" @click="copyText(previewJsonObj.jsonStrZhHk)">复制代码</a>
                        <a href="javascript:void (0)" @click="downloadFile('zh-hk.json', previewJsonObj.jsonStrZhHk)">下载JSON</a>
                    </li>
                    <li>
                        英文json
                        <a href="javascript:void (0)" @click="copyText(previewJsonObj.jsonStrEn)">复制代码</a>
                        <a href="javascript:void (0)" @click="downloadFile('en.json', previewJsonObj.jsonStrEn)">下载JSON</a>
                    </li>
                </ul>
                <ul>
                    <li>
                        <el-input type="textarea" v-model="previewJsonObj.jsonStrZh" :rows="20" autofocus spellcheck="false" readonly></el-input>
                    </li>
                    <li>
                        <el-input type="textarea" v-model="previewJsonObj.jsonStrZhHk" :rows="20" autofocus spellcheck="false" readonly></el-input>
                    </li>
                    <li>
                        <el-input type="textarea" v-model="previewJsonObj.jsonStrEn" :rows="20" autofocus spellcheck="false" readonly></el-input>
                    </li>
                </ul>
            </div>
        </el-dialog>

        <el-dialog
            :title="'预览('+previewJsonBeforeDownload.title+')，待下载'"
            :visible.sync="previewJsonBeforeDownload.isShow"
            :close-on-click-modal="false"
            width="800px"
            v-dialogDrag
        >
            <div :class="prefixCls + '-preview-json-text'">
                <div class="preview-content">
                    <el-input type="textarea" v-model="previewJsonBeforeDownload.jsonStr" :rows="20" autofocus spellcheck="false" readonly></el-input>
                </div>
                <div class="btns">
                    <el-button type="primary" size="small" @click="copyText(previewJsonBeforeDownload.jsonStr)">复制代码</el-button>
                    <el-button type="primary"  size="small" @click="downloadFile(previewJsonBeforeDownload.type + '.json', previewJsonBeforeDownload.jsonStr)">下载JSON</el-button>
                </div>
            </div>
        </el-dialog>

        <el-dialog
            :title="'全局查看历史相关翻译'"
            :visible.sync="isShowHistoryTransDialog"
            :close-on-click-modal="false"
            width="1000px"
            v-dialogDrag
        >
            <div :class="prefixCls + '-translate-from-history'">
                <div class="history-search">
                    <el-input size="small" clearable placeholder="请输入关键词搜索" @keyup.native.enter="handlerHistorySearch" v-model="historyKeyword" @clear="handlerHistorySearch" class="input-with-select">
                        <el-select v-model="historySearchType" slot="prepend" placeholder="请选择" style="width: 100px; text-align: center;">
                            <el-option label="模糊匹配" value="1"></el-option>
                            <el-option label="精确匹配" value="2"></el-option>
                        </el-select>
                        <el-button size="small" slot="append" icon="el-icon-search" @click="handlerHistorySearch"></el-button>
                    </el-input>
                </div>
                <el-table
                    :data="historyTransData"
                    style="width: 100%;"
                    :height="500"
                    border
                    stripe
                >
                    <el-table-column
                        prop="id"
                        label="ID"
                        align="center"
                        width="80">
                    </el-table-column>
                    <el-table-column
                        prop="key"
                        label="字段名"
                        width="100"
                        >
                        <template slot-scope="scope">
                            <div style="display: inline;" v-html="scope.row.keyStr"></div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="lib_name"
                        label="所属语言包"
                        width="100"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="zh"
                        label="中文"
                        width="200"
                        >
                        <template slot-scope="scope">
                            <div style="display: inline;" v-html="scope.row.zhStr"></div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="en"
                        label="英文"
                        >
                    </el-table-column>
                </el-table>

                <div style="text-align: right; margin-top:10px;">
                    <el-pagination
                        size="small"
                        background
                        layout="total, prev, pager, next"
                        :page-size="Number(historyPageSize)"
                        :total="Number(historyPageTotal)"
                        :current-page="Number(historyPageNo)"
                        @current-change="onChangeHistoryPageNo"
                    ></el-pagination>
                </div>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import ajax from '@/utils/ajax.js'
    import tools from '@/utils/tools.js'
    import moment from 'moment';
    import '@/directive/element-dialog.js'
    import Utils from "@/utils/utils";

    export default {
        data(){
            return {
                prefixCls:'views-lang-detail',
                isLoading: false,
                loadingText:'加载中，请稍后...',
                libName: '',
                rules:{
                    // name: [{ required: true, message: '请输入字段名', trigger: 'blur' }],
                },
                batchRules:{

                },
                addFieldForm: {
                    addFieldCancel: false,
                    parent_key: '',
                    parent_id: '',
                    zh:'',
                    en:'',
                },
                batchAddFieldForm:{
                    isShow:false,
                    jsonStr:'',
                },
                previewJsonObj:{
                    isShow:false,
                    jsonStrZh:'',
                    jsonStrEn:'',
                },
                //下载前预览
                previewJsonBeforeDownload:{
                    isShow:false,
                    jsonStr:'',
                    title:'',
                    type:''
                },
                libId:'',
                parentId:'',//父id
                parentKey:'', //父key
                idIndex: 0,
                tableData: [],
                isEditing: false,
                brotherList: [],
                uploadJsonHasArray: false,
                pageSize:50,
                pageTotal:0,
                pageNo:1,
                tableHeight: 200,
                keyword:'',
                isShowHistoryTransDialog:false,
                historyTransData:[],
                historyPageSize:20,
                historyPageNo:1,
                historyPageTotal:0,
                searchType: '0', //默认局部搜索
                historySearchType:'1', //默认模糊匹配，2：精确匹配
                historyKeyword:'',
                is_exact_match: '1', //是否精确匹配搜索, 1:是， 0：否
            }
        },

        watch:{
            '$route.query.parentId'(val, old){
                if(val != old){
                    this.init();
                }
            }
        },

        mounted(){
            this.init();
            this.getLibInfo();
            setTimeout(() => {
                this.setTableHeight();
            }, 20)
            window.addEventListener('resize', this.setTableHeight);
        },

        beforeDestroy() {
            window.removeEventListener('resize', this.setTableHeight);
        },

        methods: {
            init(){
                this.libId = this.$route.query.libId;
                let queryParentId = this.$route.query.parentId;
                this.parentId = queryParentId && queryParentId != '0' ? queryParentId:'';
                this.pageNo = 1;
                this.getDetail();
            },

            getLangList(){
                return new Promise((resolve, reject) => {
                    ajax({
                        url:'getLangListByTypeId',
                        data:{
                            typeId:'' //为空表示获取全部的分类
                        }
                    }).then((json) => {
                        let obj = {};
                        if(json.result == 'true'){
                            const data = json.data || [];
                            data.forEach(item => {
                                obj[item.id] = item.name;
                            });
                        }
                        resolve(obj);
                    })
                })
            },

            handlerHistorySearch(){
                this.findHistoryTranslate({
                    id:'0',
                    zh: (this.historyKeyword || '').trim(),
                    historySearchType: this.historySearchType //匹配方式， 模糊，精确
                });
            },

            findHistoryTranslate(row){
                if(row){
                    this.isLoading = true;
                }

                this.isShowHistoryTransDialog = true;
                const historyRow = row || this.historyRow;
                this.historyKeyword = historyRow.zh;

                this.getLangList().then(obj => {
                    ajax({
                        url:'fields/findHistoryTranslate',
                        data:{
                            keyword: this.historyKeyword,
                            id: historyRow.id,
                            historySearchType: historyRow.historySearchType, //匹配方式
                            pageSize: Number(this.historyPageSize),
                            pageNo: Number(this.historyPageNo)
                        }
                    }).then(json => {
                        if(row){
                            this.historyRow = row;
                            this.isLoading = false;
                        }

                        if(json.result == 'true'){

                            const regKeyword = new RegExp(this.historyKeyword, 'g');
                            this.historyTransData = (json.list || []).map((item,i) => {
                                return {
                                    ...item,
                                    iIndex: i + 1,
                                    lib_name:obj[item.lib_id],
                                    keyStr: item.key.replace(regKeyword, ($0, $1) => {
                                        return '<strong style="color: red;">' + $0 + '</strong>'
                                    }),
                                    zhStr: item.zh.replace(regKeyword, ($0, $1) => {
                                        return '<strong style="color: red;">' + $0 + '</strong>'
                                    })
                            }
                            });
                            this.historyPageTotal = json.total || 0;
                        }
                    })
                });
            },

            copyFullKeyPath(row){
                console.log('row',row);
                this.copyText([...(row.parent_key || []), row.key].join('.'));
            },

            //复制内容
            copyText(str = ''){
                let  urlEle = document.querySelector('.' + this.prefixCls + '-copy-text');
                urlEle.value = str;
                urlEle.select(); // 选择对象
                document.execCommand("Copy"); // 执行浏览器复制命令
                urlEle.value = '';
                this.$showOk('复制成功，可贴粘！')
            },

            setTableHeight() {
                this.tableHeight =
                    document.documentElement.clientHeight -
                    document.querySelector('#' + this.prefixCls + '-page-table').getBoundingClientRect().top - 75; //60的值为为底部和翻页控件预留空间
            },

            gobackTop(){
                this.pageNo = 1;
                this.keyword = '';
                this.$router.push({
                    path: this.$route.path,
                    query:{
                        libId: this.$route.query.libId
                    }
                })
            },

            handlerSearch(){
                let keyword = this.keyword.trim();

                //包内搜索（如果是模糊搜索或者精确搜索）
                if(this.searchType == '1' || this.searchType == '0'){
                    this.keyword = keyword;
                    this.pageNo = 1;

                    this.is_exact_match = this.searchType == '0'? '1': '0'; //是否精确匹配搜索，仅限局部包内搜索使用

                    //如果url参数中有parentId就删除parentId跳到所有的下面去查询关键词
                    if(this.$route.query.parentId){
                        let query = {...this.$route.query};
                        delete query.parentId;
                        this.$router.push({
                            path: this.$route.path,
                            query:{...query}
                        })
                    }else{
                        //如果没有parentId就直接查询
                        this.getDetail();
                    }
                }

                //全局搜索
                else {
                    this.isShowHistoryTransDialog = true;
                    this.findHistoryTranslate({
                        id: '0',
                        zh: keyword
                    });
                }

            },

            getLibInfo(){
                ajax({
                    url:'lib/getLibInfo',
                    method:'post',
                    data:{
                        id: this.libId
                    }
                }).then(json => {
                    if(json.result == 'true'){
                        this.libName = (json.data || {}).name;
                    }
                })
            },

            onChangePageNo(num) {
                this.pageNo = String(num);
                this.getDetail(() => {
                    this.$refs.multipleTable.bodyWrapper.scrollTop = 0;
                });
            },

            onChangeHistoryPageNo(num) {
                this.historyPageNo = String(num);
                this.findHistoryTranslate();
            },

            onPageSizeChange(num) {
                this.pageSize = String(num);
                this.getDetail(() => {
                    this.$refs.multipleTable.bodyWrapper.scrollTop = 0;
                });
            },

            getDetail(callback, isWidthoutLoading) {
                if(!isWidthoutLoading){
                    this.isLoading = true
                }

                ajax({
                    url:'fields/list',
                    data: {
                        lib_id: this.libId,
                        parent_id: this.parentId && this.parentId != '0'? this.parentId: '',
                        pageSize: Number(this.pageSize),
                        pageNo: Number(this.pageNo),
                        keyword: this.keyword,
                        is_exact_match: this.is_exact_match, //是否是精确搜索
                    },
                }).then(json => {
                    if(json.result == 'true'){
                        this.tableData = (json.list || []).map((item, i) => {
                            return {
                                ...item,
                                iIndex: i +1,
                                parent_key: item.parent_key? item.parent_key.split(',') : [],
                            }
                        });
                        this.pageTotal = json.total || 0;
                        this.parentKey = json.parent_key_arr || [];
                    }
                    if(!isWidthoutLoading){
                        this.isLoading = false
                    }
                    typeof callback == 'function' && callback();
                })
            },

            formatParentKey(arr){
                return Array.isArray(arr)?arr.join(' / '):'';
            },

            goToChildrenKeys(row, i){
                this.pageNo = 1;
                this.keyword = '';
                //如果是在父级路劲进去的
                if(row.is_has_children != '1'){
                    const parentIdArr = row.parent_id && row.parent_id != '0'?  String(row.parent_id).split(',') :[];
                    let parentId = '';
                    for(let j=0;j<parentIdArr.length;j++){
                        if(j <= i + 1){
                            parentId += (j === 0?'':',') + parentIdArr[j];
                        }
                    }
                    console.log('goToChildrenKeys:', arguments);
                    if(parentId == this.parentId){
                        return;
                    }
                    if(parentId){
                        this.$router.push({
                            path: this.$route.path,
                            query:{
                                ...this.$route.query,
                                parentId: parentId
                            }
                        })
                    }
                }
                //否则是从“进入子级”文字按钮进去的
                else if(row.is_has_children == '1'){
                    this.$router.push({
                        path: this.$route.path,
                        query:{
                            ...this.$route.query,
                            parentId: (row.parent_id ? row.parent_id + ',': '') + row.id
                        }
                    })
                }
            },

            /* 增加子级-弹框 */
            handleAddChildGrade(row = {}) {
                console.log('row', row);
                if(this.isEditing) {
                    this.$showError('有一条数据正在编辑中！');
                    return false;
                }

                //如果是从数据按钮上点击添加
                if(row.id){
                    this.addFieldForm = {
                        addFieldCancel : true,
                        parent_key : row.parent_key ? (row.parent_key.join(' / ') + (row.parent_key.length?' / ':'') + row.key) : '',
                        parent_id : row.parent_id? (row.parent_id + ',' + row.id) : '',
                        key: '',
                        zh:'',
                        en:''
                    };
                }else{
                    //否则是顶部点击添加
                    //如果当前只在某个父级下面
                    if(this.parentId && this.parentId != '0'){
                        this.addFieldForm = {
                            addFieldCancel : true,
                            parent_key : this.parentKey.join(' / '),
                            parent_id : `${this.parentId}`,
                            key: '',
                            zh:'',
                            en:''
                        };
                    }else{
                        //否则添加顶级
                        this.addFieldForm = {
                            addFieldCancel : true,
                            parent_key : '',
                            parent_id : '0',
                            key: '',
                            zh:'',
                            en:''
                        };
                    }
                }
            },

            //添加同级
            handleAddBrotherGrade(row = {}){
                this.addFieldForm = {
                    addFieldCancel : true,
                    parent_key : row.parent_key? row.parent_key.join(' / ') : '',
                    parent_id : row.parent_id? row.parent_id : '',
                    key: '',
                    zh:'',
                    en:''
                };
            },

            //批量添加
            handleBatchAddChildGrade(){
                let batchAddFieldForm = this.batchAddFieldForm;
                batchAddFieldForm.isShow = true;
                batchAddFieldForm.jsonStr = '';
                this.batchAddFieldForm = batchAddFieldForm;
            },

            /* 增加子级-提交 */
            addFieldSubmit() {
                const addFieldForm = this.addFieldForm;
                if($.trim(addFieldForm.key || '') === '') {
                    this.$showError('字段名不能为空！');
                    return false;
                }

                ajax({
                    url:'fields/addFields',
                    data:{
                        zh: addFieldForm.zh || '',
                        en: addFieldForm.en || '',
                        key: addFieldForm.key,
                        lib_id: this.libId,
                        parent_id: addFieldForm.parent_id || '0',
                    }
                }).then(json => {
                    if(json.result == 'true'){
                        this.$showOk('添加成功');
                        this.addFieldForm.addFieldCancel = false; //关闭弹窗
                        this.getDetail();
                    }
                })
            },

            batchAddFieldSubmit(){
                const batchAddFieldForm = this.batchAddFieldForm;
                if(!batchAddFieldForm.jsonStr.trim()){
                    this.$showError('json字符串内容不能为空');
                    return;
                }
                let isJsonCheck = true;
                let jsonObj = null;
                try {
                    jsonObj = JSON.parse(batchAddFieldForm.jsonStr);
                } catch (e) {
                    isJsonCheck = false;
                }
                if(!isJsonCheck || !jsonObj){
                    this.$showError('json字符串格式不正确');
                    return;
                }

                let jsonArr = [];
                for(let i in jsonObj){
                    jsonArr.push({key: i, zh: jsonObj[i]});
                }

                let saveIndex = 0;
                let failNum = 0;
                let failResult = [];
                const saveData = (item) => {
                    if(saveIndex >= jsonArr.length){
                        let okStr = '批量添加完毕';
                        if(failNum > 0){
                            okStr += '，其中失败了'+failNum+'个'
                        }
                        // this.$showOk(okStr, {duration: 4000});
                        let failHtml = [];
                        failResult.forEach(item => {
                            failHtml.push(`<tr><td style="padding: 2px 5px;">${item.key}</td><td style="padding: 2px 5px;">${item.resultDes}</td></tr>`)
                        });
                        this.$alert(`
                            <div>
                                <div style="font-size: 14px;line-height: 28px;">${okStr}</div>
                                <div style="display: ${failNum > 0? 'block': 'none'}; max-height: 300px;overflow: auto;">
                                    <div><strong>失败原因如下：</strong></div>
                                    <table cellpadding="2" cellspacing="0" border="1" bordercolor="#ccc" width="100%">
                                        <tr><th style="padding: 2px 5px;">key</th><th style="padding: 2px 5px;">失败说明</th></tr>
                                       ${failHtml.join('')}
                                    </table>
                                </div>
                            </div>
                        `, '提示', {
                            dangerouslyUseHTMLString: true
                        });
                        this.isLoading = false;
                        this.getDetail();
                        return;
                    }
                    ajax({
                        url:'fields/addFields',
                        data:{
                            zh: item.zh || '',
                            key: item.key,
                            lib_id: this.libId,
                            parent_id : this.parentId && this.parentId != '0'? `${this.parentId}` : '0',
                        },
                        isPassFalse: true //不针对每个报错
                    }).then(json => {
                        if(json.result == 'true'){

                        }else{
                            failNum ++;
                            failResult.push({
                                key: item.key,
                                resultDes: json.resultDes || '未知原因'
                            });
                        }
                        saveIndex ++;
                        saveData(jsonArr[saveIndex]);
                    })
                }

                batchAddFieldForm.isShow = false;
                this.isLoading = true;
                saveData(jsonArr[saveIndex]);

            },

            /* 删除 */
            handleDeleteData(row) {
                let _self = this;
                let tips = '确定要删除（'+ row.key +'）这条数据吗？';

                if(_self.isEditing) {
                    tools.showMsg.error('有一条数据正在编辑中！');
                    return false;
                }

                if(row.children && row.children.length > 0) {
                    tips = '当前数据中含有子级，确定要删除这条数据吗？'
                }
                _self.$confirm(tips, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                    this.isLoading = true;
                    ajax({
                        url: 'fields/delete',
                        data:{
                            id: row.id
                        }
                    }).then(json => {
                        this.isLoading = false;
                        if(json.result == 'true'){
                            this.$showOk('删除成功');
                            this.getDetail();
                        }
                    })
                }).catch(() => {

                });
            },

            /* 增加子级、删除，循环获取表格数据 */
            funcData(list, id, type) {
                list.forEach((item, key) => {
                    if(item.id == id) {
                        /* 增加子级 */
                        if(type == 'addChild') {
                            item.children.push({
                                id: new Date().getTime(),
                                name: $.trim(this.addFieldForm.name),
                                zh_cn: $.trim(this.addFieldForm.zh_cn),
                                en_cn: $.trim(this.addFieldForm.en_cn),
                                children: [],
                                nameIsEdit: false,
                                zh_cnIsEdit: false,
                                en_cnIsEdit: false,
                            })
                            /* 删除 */
                        } else if(type == 'delete') {
                            list.splice(key, 1)
                        }
                    } else {
                        if(item.children && item.children.length > 0) {
                            this.funcData(item.children, id, type)
                        }
                    }
                })
                return list;
            },

            /* 双击文本框 */
            dblclickEdit(obj, type) {
                if(obj.is_has_children == '1'){
                    this.$showError('不允许直接编辑父级');
                    return;
                }
                if(this.isEditing) {
                    this.$showError('有一条数据正在编辑中！');
                } else {
                    obj[type + 'IsEdit'] = true;
                    obj.oldValues = {...obj};
                    this.isEditing = true;
                    this.tableData = JSON.parse(JSON.stringify(this.tableData));
                    this.$nextTick(() => {
                        this.$refs[type+obj.id] && this.$refs[type+obj.id].focus();
                    })
                }
            },

            /* input失焦 */
            blurEdit(obj, type) {
                const handlerComplete = () => {
                    delete obj.oldValues;
                    obj[type + 'IsEdit'] = false;
                    this.isEditing = false;
                }

                const handlerFailComplete = () => {
                    obj[type] = obj.oldValues[type];
                    delete obj.oldValues;
                    obj[type + 'IsEdit'] = false;
                    this.isEditing = false;
                }

                //如果没修改，就不发请求
                if(obj.oldValues && obj.oldValues[type] == obj[type]){
                    this.$showOk('没修改');
                    handlerComplete();
                    return ;
                }

                this.isLoading = true;
                ajax({
                    url:'fields/updateFields',
                    data:{
                        lib_id: obj.lib_id,
                        id: obj.id,
                        zh: obj.zh,
                        en: obj.en,
                        key: obj.key,
                    }
                }).then(json => {
                    this.isLoading = false;
                    if(json.result == 'true'){
                        this.$showOk('更新成功');
                        handlerComplete();
                        this.getDetail(() => {}, true);
                    }else{
                        handlerFailComplete();
                    }
                })
            },

            /* 获取父节点的children */
            getBrother(obj, list) {
                list.forEach((item) => {
                    if(item.id == obj.id) {
                        this.brotherList = list;
                    } else {
                        if(item.children.length > 0) {
                            this.getBrother(obj, item.children)
                        }
                    }
                })
            },

            /* 验证同一级字段名是否重复-新增子级时,input框失焦时 */
            verifySameNameBlur(name, list) {
                let isSame = false;
                let sameNum = 0;
                if(list && list.length > 0) {
                    for (let i in list) {
                        if(list[i].name == name) {
                            sameNum++
                        }
                    }
                }
                if((sameNum > 1)) {
                    isSame = true;
                }
                return isSame;
            },

            /* 验证同一级字段名是否重复-新增子级时,input框失焦时 */
            verifySameName(name, list) {
                let isSame = false;
                if(list && list.length > 0) {
                    for (let i in list) {
                        if(list[i].name == name) {
                            isSame = true;
                        }
                    }
                }
                return isSame;
            },

            //返回列表
            goback(){
                this.$router.go(-1);
            },


            /* 上传json */
            onChangeFile($event){
                let _self = this;
                _self.$confirm('上传文件将覆盖表格数据，确定要执行此操作吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    if(!this.$refs.fileEle.files[0]){
                        return;
                    }
                    if(this.getExtensions(this.$refs.fileEle.files[0].name) != '.json') {
                        tools.showMsg.error('只能上传json文件！');
                        return false;
                    }

                    const reader = new FileReader();
                    reader.onload = (e) => {
                        if(!this.isJsonFormat(e.target.result)) {
                            tools.showMsg.error('json文件格式不正确！');
                            return false;
                        }

                        this.idIndex = 0;
                        this.uploadJsonHasArray = false;
                        let tableData = this.uploadJsonToTable(JSON.parse(e.target.result));
                        if(this.uploadJsonHasArray) {
                            tools.showMsg.error('json文件格式不正确！');
                            return false;
                        }
                        this.tableData = tableData;
                    }
                    reader.readAsText(this.$refs.fileEle.files[0])
                }).catch(() => {

                });
            },
            /* 获取文件后缀名 */
            getExtensions(name) {
                return name.substring(name.lastIndexOf('.'));
            },
            /* 判断json文件格式是否正确 */
            isJsonFormat(value) {
                try {
                    value = JSON.parse(value);
                } catch (e) {
                    value = null;
                }
                return value;
            },
            /* 上传的json 转化为tableData */
            uploadJsonToTable(obj) {
                if(Array.isArray(obj)) {
                    this.uploadJsonHasArray = true;
                }
                let list = [];
                Object.keys(obj).forEach(key => {
                    if($.trim(key) === '') {
                        this.uploadJsonHasArray = true;
                    }
                    this.idIndex ++
                    let currentObj = {
                        id: this.idIndex,
                        name: $.trim(key),
                        en_cn: '',
                        nameIsEdit: false,
                        zh_cnIsEdit: false,
                        en_cnIsEdit: false,
                    }
                    if(typeof obj[key] == 'object') {
                        currentObj['zh_cn'] = '';
                        currentObj['children'] = this.uploadJsonToTable(obj[key]);
                    } else {
                        currentObj['zh_cn'] = obj[key];
                        currentObj['children'] = [];
                    }
                    list.push(currentObj);
                })
                return list;
            },


            /* 下载json */
            downLoad(type) {
                if(this.isEditing) {
                    tools.showMsg.error('有一条数据正在编辑中！');
                    return false;
                }
                this.isLoading = true;
                ajax({
                    url: 'fields/exportJson',
                    data: {
                        lib_id: this.libId,
                        lib_lang: type === 'zh-hk'? 'zh': type
                    }
                }).then(json => {
                    if(json.result == 'true'){
                        const data = Utils.fieldsArrToJsonList(json.jsonList, type);
                        const previewJsonBeforeDownload = {
                            isShow:true,
                            jsonStr: this.formatJsonStr(JSON.stringify(data)),
                            title: {'zh':'简体中文', 'zh-hk':'繁体中文', 'en':'English'}[type],
                            type:type
                        };
                        this.previewJsonBeforeDownload = previewJsonBeforeDownload;
                        this.isLoading = false;
                    }else{
                        this.isLoading = false;
                    }
                })
            },
            downloadFile(filename, text){
                var element = document.createElement('a');
                element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
                element.setAttribute('download', filename);
                element.style.display = 'none';
                document.body.appendChild(element);
                element.click();
                document.body.removeChild(element);
            },

            //预览json
            previewJson(){
                if(this.isEditing) {
                    tools.showMsg.error('有一条数据正在编辑中！');
                    return false;
                }

                const getZh = () => {
                    return new Promise((resolve, reject) => {
                        ajax({
                            url: 'fields/exportJson',
                            data: {
                                lib_id: this.libId,
                                lib_lang: 'zh'
                            }
                        }).then(json => {
                            if(json.result == 'true'){
                                const data = Utils.fieldsArrToJsonList(json.jsonList, 'zh');
                                // const data = {};
                                const dataZhHk = Utils.fieldsArrToJsonList(json.jsonList, 'zh-hk');
                                console.log('dataZhHk',dataZhHk)
                                resolve({
                                    zh: this.formatJsonStr(JSON.stringify(data)),
                                    zhHk: this.formatJsonStr(JSON.stringify(dataZhHk)),
                                });
                            }
                        })
                    })
                }

                const getEn = () => {
                    return new Promise((resolve, reject) => {
                        ajax({
                            url: 'fields/exportJson',
                            data: {
                                lib_id: this.libId,
                                lib_lang: 'en'
                            }
                        }).then(json => {
                            if(json.result == 'true'){
                                const data = Utils.fieldsArrToJsonList(json.jsonList, 'en');
                                resolve(this.formatJsonStr(JSON.stringify(data)));

                            }
                        })
                    })
                }

                this.isLoading = true;
                Promise.all([getZh(), getEn()]).then(([zhOrZhHkObj, en]) => {
                    this.isLoading = false;
                    let previewJsonObj = this.previewJsonObj;
                    previewJsonObj.isShow = true;
                    previewJsonObj.jsonStrZh = zhOrZhHkObj.zh;
                    previewJsonObj.jsonStrZhHk = zhOrZhHkObj.zhHk;
                    previewJsonObj.jsonStrEn = en;
                }).catch(() => {});


            },

            /* tableData数据转化为json */
            dataToJson(list, type) {
                let Obj = {};
                list.forEach((item) => {
                    if(item.children.length > 0) {
                        Obj[item.name] = this.dataToJson(item.children, type)
                    } else {
                        Obj[item.name] = item[type]
                    }
                })
                return Obj;
            },

            /*
            * 格式化JSON源码(对象转换为JSON文本)
            * @param text String 将要压缩的json字符串
            */
            formatJsonStr(str){
                let newStr = '';
                try {
                    newStr = JSON.stringify(JSON.parse(str), null, 4);
                } catch (error) {
                    console.error('json格式有误', str);
                }
                return newStr;
            }
        }
    }
</script>

<style lang="scss">
    $prefixCls: views-lang-detail;
    .#{$prefixCls} {
        &-top{
            margin-bottom: 10px;

            h1{
                font-size:28px;
                display: inline-block;
                vertical-align: middle;
                span{
                    vertical-align: middle;
                }

                i{
                    font-size:22px;
                    vertical-align: middle;
                    margin-left: 10px;
                }
            }
            .lib-name{
                font-size:16px;
                line-height: 22px;
                display: inline-block;
                vertical-align: middle;
                margin-left: 20px;
                margin-top: 5px;
                font-family: "楷体";
            }
        }

        &-copy-text-wrapper{
            position: absolute;
            width:1px;
            height:2px;
            opacity: 0;
            left:0;
            top:0;
        }

        .button-list{
            margin-bottom: 15px;
            .left{
                float:left;
            }
            .right{
                float:right;
                .el-button{
                    margin-right: 10px;
                }
            }
        }
        .search-wrapper{
            width:380px;
            margin-right: 10px;
            display: inline-block;
            .el-input-group__append{
                padding:0 10px;
            }
            .el-button{
                margin-right: auto !important;
                margin-left: auto;
            }
            .el-input-group__append, .el-input-group__prepend{
                background-color: #0068ff;
                color: #ffffff;
                border-color: #0068ff;
            }
        }
        .change-file-box {
            float: left;
            margin-left: 10px;
            position: relative;

            div {
                position: relative;
                color: #fff;
                background: #ed6c2b;
                border-color: #ed6c2b;
                font-size: 14px;
                border-radius: 4px;
                text-align: center;
                width: 130px;
                height: 32px;
                line-height: 32px;
                overflow: hidden;
                &:hover {
                    opacity: .8;
                }
            }
            input[type=file] {
                opacity: 0;
                width: 230px;
                height: 32px;
                position: absolute;
                top: 0;
                left: -100px;
                cursor: pointer;
            }
            .tips {
                color: red;
                position: absolute;
                left: calc(100% + 10px);
                top: 6px;
                width: 200px;
            }
        }


        .el-table__row--level-1{
            .btn-add-children{
                visibility: hidden;
            }
        }

        .el-table{
            td {
                padding: 5px 0;
            }
            .parent-key{
                text-decoration: underline;
                font-style: normal;
                cursor: pointer;
                color:#00a4e2;
            }
            .lang-field-content{
                min-width: 100px;
                min-height: 30px;
                word-break: break-all;
                display: inline-block;
            }
            .find-translate-from-history{
                cursor: pointer;
                margin-left: 5px;
                color: #0068ff;
                font-weight: bold;
                font-size: 15px;
                display: none;
            }
            .cell-btn-copy{
                margin-left: 8px;
                display: none;
                padding: 3px 8px;
            }
            .field-opration{
                .el-button{
                    padding-left:5px;
                    padding-right:5px;
                    display: none;
                }
            }
            tr.el-table__row:hover{
                .cell-btn-copy{
                    display: inline-block;
                }
                .field-opration{
                    .el-button{
                        display: inline-block;
                    }
                }
                .find-translate-from-history{
                    display: inline;
                }
            }
        }
        &-pager{
            text-align: right;
        }
    }

    .#{$prefixCls}-preview-json-text{
        textarea{
            width:100%;
            font-size: 12px;
            line-height: 18px;
        }
        ul{
            display: flex;
            li{
                flex: 1;
                padding-right: 5px;

                &:last-child{
                    padding-left: 5px;
                }

                textarea{
                    min-height: 680px!important;
                }
            }

            &.title{
                li{
                    font-weight: bold;
                    color:#555;
                    line-height: 22px;
                    margin-bottom: 5px;

                    a{
                        color: blue;
                        margin-left: 10px;
                        &:hover{
                            text-decoration: underline;
                        }
                    }
                }
            }
        }
        .btns{
            text-align: right;
            margin-top:10px;
        }
    }

    .#{$prefixCls}-translate-from-history{
        .history-search{
            margin:0 auto;
            margin-bottom: 10px;
            width:50%;

            .el-input-group__append, .el-input-group__prepend{
                background-color: #0068ff;
                color: #ffffff;
                border-color: #0068ff;
            }
        }
    }
</style>
