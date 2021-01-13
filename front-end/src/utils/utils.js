import store from '@/store/index'

const Utils = {
    /**
     * 把接口的数据转换成下拉级联插件的所需的数据
     * */
    formatTreeData(data, disableField = 'disabled', parentId = '') {
        let arr = [];

        if (Array.isArray(data) && data.length) {
            for (let i = 0; i < data.length; i++) {
                let isDisabled = false;

                //如果是personFlag，特殊处理
                if (disableField === 'personFlag') {
                    if (!data[i][disableField] && !data[i].children) {
                        isDisabled = true;
                    }
                } else if (data[i][disableField]) {
                    isDisabled = true;
                }

                let obj = {
                    label: data[i].name,
                    value: data[i].id,
                    customData: {
                        ...data[i]
                    } //其他属性都收入其中
                };

                if (isDisabled) {
                    obj.disabled = 'disabled';
                }

                if (parentId) {
                    obj.parentId = parentId; //父节点的id
                }

                if (data[i].children && data[i].children.length) {
                    obj.children = this.formatTreeData(data[i].children, disableField, obj.value)
                }
                arr.push(obj);
            }
            return arr;
        }
    },

    /**
     * 根据apiAts/common/org接口获取的组织数接口的数据转换成级联下拉树的数据
     * @param data Array 接口返回的数组
     * @param parentId String 父级id
     * @param type String 类型 1：表示转换组织树，2：表示转换成组织人员树
     * @return Array 返回级联菜单支持的数组
     * */
    convertTree(data, parentId, type) {
        let arry = [];

        if (Array.isArray(data) && data.length) {
            for (let i = 0; i < data.length; i++) {
                const newitem = {
                    type: item.orgName ? 'org' : 'person',
                    label: item.orgName || item.personName,
                    value: item.orgId || item.personId,
                    children: item.children && type == 2 ? item.children.concat(item.personList) : item.children,
                    personList: item.personList,
                    parentId,
                    disabled: item.children && item.children.length == 0 && item.personList && item.personList.length == 0 && type == 2 ? 'disabled' : ''
                };

                if (item.children && item.children.length > 0) {
                    item.children = this.convertTree(item.children, item.value, type);
                } else if (item.personList && item.personList.length > 0 && type == 2) {
                    item.children = this.convertTree(item.personList, item.value, type);
                } else {
                    item.children = undefined;
                }

                arry.push(newitem);
            }

            return arry;
        }
    },

    /**
     * 获取url参数
     * @param name String 参数的name
     * @return String 返回参数对应的值
     * */
    getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);

        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    },

    /**
     * 正则替换文本中的字符串为目标字符串
     * */
    regExpHelp(reg, txt, replacetxt) {
        let result = txt.match(reg)

        if (result) {
            for (let i = 0; i < result.length; i++) {
                let r = result[i].replace(result[i], replacetxt)

                txt = txt.replace(result[i], r);
            }
        }
        return txt
    },

    /**
     * 再Cascader数据中根据value值查找结点
     * @param value String 树节点的id
     * @param json Array 树json
     * */
    findNodeByValue(value, json, isFindPerson) {
        let node = null;
        const deepFind = (jsonArr) => {
            if (Array.isArray(jsonArr)) {
                for (let i = 0; i < jsonArr.length; i++) {
                    if (jsonArr[i].value == value && (!isFindPerson || isFindPerson && jsonArr[i].type === 'person')) {
                        node = {
                            ...jsonArr[i]
                        };
                        break;
                    }
                    if (jsonArr[i].children && jsonArr[i].children.length) {
                        deepFind(jsonArr[i].children);
                    }
                }
            }

        }

        deepFind(json);
        return node;
    },

    /**
     * 再Cascader数据中根据label名查找结点
     * */
    findNodeByLabel(label, json) {
        let node = null;
        const deepFind = (jsonArr) => {
            if (Array.isArray(jsonArr)) {
                for (let i = 0; i < jsonArr.length; i++) {
                    if (jsonArr[i].label == label) {
                        node = {
                            ...jsonArr[i]
                        };
                        break;
                    }
                    if (jsonArr[i].children && jsonArr[i].children.length) {
                        deepFind(jsonArr[i].children);
                    }
                }
            }

        }

        deepFind(json);
        return node;
    },

    /**
     * 通过label值找所有的级联value数据
     * */
    findCascaderValueByLabel(label, json) {
        if (!label) {
            return [];
        }
        let nodes = [];

        //第一次通过label查找
        let node = this.findNodeByLabel(label, json);

        if (node) {
            nodes.push(node);

            const findNodes = (value) => {
                const newNode = this.findNodeByValue(value, json);

                nodes.push(newNode);
                if (newNode.parentId) {
                    findNodes(newNode.parentId);
                }
            }

            if (node.parentId) {
                findNodes(node.parentId);
            }
        }

        return nodes.map(item => item.value).reverse();
    },

    /**
     * 通过value值找所有的级联value数据
     * */
    findCascaderValueByValue(value, json) {
        if (!value) {
            return [];
        }
        let nodes = [];

        const findNodes = (value) => {
            const newNode = this.findNodeByValue(value, json);

            if (newNode) {
                nodes.push(newNode);
                if (newNode.parentId) {
                    findNodes(newNode.parentId);
                }
            }
        }

        findNodes(value);
        return nodes.map(item => item.value).reverse();
    },

    /**
     * 是否具备某模块、功能的权限
     * @param moduleId String 模块id
     * @param functionId String 功能id
     * @return Boolean 是否有权限
     * */
    isHasAuth(moduleId, functionId) {
        const authorityList = store.state.app.authorityList || [];

        //如果一级模块不存在
        if (!moduleId) {
            return false;
        }

        //如果只传了一级模块，没有传二级模块
        if (!functionId) {
            //查找一级模块是否存在，如果不存在
            if (authorityList.findIndex(item => item.moduleCode === moduleId) === -1) {
                return false;
            }
            return true;

        }
        const currentFunc = authorityList.find(item => item.moduleCode === moduleId) || {};

        if (currentFunc.children && currentFunc.children.length) {
            return currentFunc.children.findIndex(item => item.moduleCode === functionId) !== -1;
        }
        return false;


    },

    /**
     *
     * @param {*} enumObj 需转换的枚举对象
     */
    convertEnum2List(enumObj) {
        let list = [];

        Object.keys(enumObj).forEach(key => {
            list.push({
                label: enumObj[key],
                value: key
            })
        });

        return list;
    },

    /**
     * 获取随机颜色
     * */
    getRandomColor: function (num) {
        var t = this;
        var aRandomColors = ['#07a9ea', '#82c188', '#ab97c2', '#ffb500', '#59ccce', '#ff5959']; //蓝，绿，紫，黄，浅蓝,浅红

        if (typeof num === 'number') {
            if (num > 5) {
                num = 0;
            }
            return aRandomColors[num];
        }
        return aRandomColors[t.random(0, 5)];

    },
    /**
     * 取min与max之间的随机数
     * */
    random: function (min, max) {
        if (max == null) {
            max = min;
            min = 0;
        }
        return min + Math.floor(Math.random() * (max - min + 1));
    },

    /**
     * 显示最大长度，多余...
     * */
    cutShowStr(str, num) {
        if (typeof num === 'number' && str.length > num) {
            return str.substr(0, num) + '...';
        }
        return str;

    },

    /**
     * 递归从json数组中取出field_name值符合要求的json项
     */
    findField(sourceArr, field_name) {
        let field = {};

        function findField(sourceArr) {
            for (let i = 0; i < sourceArr.length; i++) {
                let field_type = sourceArr[i].field_type;

                if (field_type === 'group') {
                    if (sourceArr[i].field_name === field_name) {
                        field = sourceArr[i];
                    } else {
                        findField(sourceArr[i].group.fields);
                    }
                } else if (field_type === 'twoColumns') {
                    findField(sourceArr[i].firstCol.fields);
                    findField(sourceArr[i].secondCol.fields);
                } else if (field_type === 'threeColumns') {
                    findField(sourceArr[i].firstCol.fields);
                    findField(sourceArr[i].secondCol.fields);
                    findField(sourceArr[i].thirdCol.fields);
                } else if (sourceArr[i].field_name === field_name) {
                    field = sourceArr[i];
                }
            }
        }

        findField([...sourceArr]);
        return field;
    },

    /**
     * 字段数组转json
     * */
    fieldsArrToJsonList(list, lib_lang) {
        let jsonList = {};
        let realityLang = lib_lang === 'zh-hk' ? 'zh' : lib_lang;

        for (let i = 0; i < list.length; i++) {
            if (list[i].parent_id == '0') {
                list[i].has_used = true;
                let value = list[i][realityLang] || '';
                //如果是繁体中文就转一下
                if (lib_lang == 'zh-hk') {
                    value = this.formatTraditionalZh(value);
                }
                jsonList[list[i].key] = {$ID: list[i]['id'], $VALUE: value}; //只能通过id来匹配父级，因为key又能在不同级中是重复的
            }
        }
        const handlerJson = (obj) => {
            for (let i in obj) {
                list = list.filter(item => !item.has_used);

                let tempObj = {};
                let isEmpty = true;
                for (let j = 0; j < list.length; j++) {
                    let parentIdArr = list[j].parent_id.split(',');
                    let parentId = parentIdArr[parentIdArr.length - 1];
                    if (parentId == obj[i]['$ID']) {
                        list[j].has_used = true;
                        isEmpty = false;

                        let value = list[j][realityLang] || '';
                        //如果是繁体中文就转一下
                        if (lib_lang == 'zh-hk') {
                            value = this.formatTraditionalZh(value);
                        }
                        tempObj[list[j].key] = {$ID: list[j]['id'], $VALUE: value};
                    }
                }

                //对象不为空就继续找子级
                if (!isEmpty) {
                    obj[i] = tempObj;
                    handlerJson(obj[i]);
                } else {
                    //否则就直接赋值成字符串value值
                    obj[i] = obj[i].$VALUE;
                }
            }
        }
        handlerJson(jsonList);

        return jsonList;
    },

    /**
     * 简体中文转换成繁体中文
     * @param str String 待转的字符串
     * @param zh_choose String 转换类型，t则翻译成繁体(默认值)，为s则翻译为简体
     * @return String 返回转换之后的值
     * */
    formatTraditionalZh(str, zh_choose = 't') {
        //简体繁体对照字表,可以自行替换
        var zh_s = '皑蔼碍爱翱袄奥坝罢摆败颁办绊帮绑镑谤剥饱宝报鲍辈贝钡狈备惫绷笔毕毙闭边编贬变辩辫鳖瘪濒滨宾摈饼拨钵铂驳卜补参蚕残惭惨灿苍舱仓沧厕侧册测层诧搀掺蝉馋谗缠铲产阐颤场尝长偿肠厂畅钞车彻尘陈衬撑称惩诚骋痴迟驰耻齿炽冲虫宠畴踌筹绸丑橱厨锄雏础储触处传疮闯创锤纯绰辞词赐聪葱囱从丛凑窜错达带贷担单郸掸胆惮诞弹当挡党荡档捣岛祷导盗灯邓敌涤递缔点垫电淀钓调迭谍叠钉顶锭订东动栋冻斗犊独读赌镀锻断缎兑队对吨顿钝夺鹅额讹恶饿儿尔饵贰发罚阀珐矾钒烦范贩饭访纺飞废费纷坟奋愤粪丰枫锋风疯冯缝讽凤肤辐抚辅赋复负讣妇缚该钙盖干赶秆赣冈刚钢纲岗皋镐搁鸽阁铬个给龚宫巩贡钩沟构购够蛊顾剐关观馆惯贯广规硅归龟闺轨诡柜贵刽辊滚锅国过骇韩汉阂鹤贺横轰鸿红后壶护沪户哗华画划话怀坏欢环还缓换唤痪焕涣黄谎挥辉毁贿秽会烩汇讳诲绘荤浑伙获货祸击机积饥讥鸡绩缉极辑级挤几蓟剂济计记际继纪夹荚颊贾钾价驾歼监坚笺间艰缄茧检碱硷拣捡简俭减荐槛鉴践贱见键舰剑饯渐溅涧浆蒋桨奖讲酱胶浇骄娇搅铰矫侥脚饺缴绞轿较秸阶节茎惊经颈静镜径痉竞净纠厩旧驹举据锯惧剧鹃绢杰洁结诫届紧锦仅谨进晋烬尽劲荆觉决诀绝钧军骏开凯颗壳课垦恳抠库裤夸块侩宽矿旷况亏岿窥馈溃扩阔蜡腊莱来赖蓝栏拦篮阑兰澜谰揽览懒缆烂滥捞劳涝乐镭垒类泪篱离里鲤礼丽厉励砾历沥隶俩联莲连镰怜涟帘敛脸链恋炼练粮凉两辆谅疗辽镣猎临邻鳞凛赁龄铃凌灵岭领馏刘龙聋咙笼垄拢陇楼娄搂篓芦卢颅庐炉掳卤虏鲁赂禄录陆驴吕铝侣屡缕虑滤绿峦挛孪滦乱抡轮伦仑沦纶论萝罗逻锣箩骡骆络妈玛码蚂马骂吗买麦卖迈脉瞒馒蛮满谩猫锚铆贸么霉没镁门闷们锰梦谜弥觅绵缅庙灭悯闽鸣铭谬谋亩钠纳难挠脑恼闹馁腻撵捻酿鸟聂啮镊镍柠狞宁拧泞钮纽脓浓农疟诺欧鸥殴呕沤盘庞国爱赔喷鹏骗飘频贫苹凭评泼颇扑铺朴谱脐齐骑岂启气弃讫牵扦钎铅迁签谦钱钳潜浅谴堑枪呛墙蔷强抢锹桥乔侨翘窍窃钦亲轻氢倾顷请庆琼穷趋区躯驱龋颧权劝却鹊让饶扰绕热韧认纫荣绒软锐闰润洒萨鳃赛伞丧骚扫涩杀纱筛晒闪陕赡缮伤赏烧绍赊摄慑设绅审婶肾渗声绳胜圣师狮湿诗尸时蚀实识驶势释饰视试寿兽枢输书赎属术树竖数帅双谁税顺说硕烁丝饲耸怂颂讼诵擞苏诉肃虽绥岁孙损笋缩琐锁獭挞抬摊贪瘫滩坛谭谈叹汤烫涛绦腾誊锑题体屉条贴铁厅听烃铜统头图涂团颓蜕脱鸵驮驼椭洼袜弯湾顽万网韦违围为潍维苇伟伪纬谓卫温闻纹稳问瓮挝蜗涡窝呜钨乌诬无芜吴坞雾务误锡牺袭习铣戏细虾辖峡侠狭厦锨鲜纤咸贤衔闲显险现献县馅羡宪线厢镶乡详响项萧销晓啸蝎协挟携胁谐写泻谢锌衅兴汹锈绣虚嘘须许绪续轩悬选癣绚学勋询寻驯训讯逊压鸦鸭哑亚讶阉烟盐严颜阎艳厌砚彦谚验鸯杨扬疡阳痒养样瑶摇尧遥窑谣药爷页业叶医铱颐遗仪彝蚁艺亿忆义诣议谊译异绎荫阴银饮樱婴鹰应缨莹萤营荧蝇颖哟拥佣痈踊咏涌优忧邮铀犹游诱舆鱼渔娱与屿语吁御狱誉预驭鸳渊辕园员圆缘远愿约跃钥岳粤悦阅云郧匀陨运蕴酝晕韵杂灾载攒暂赞赃脏凿枣灶责择则泽贼赠扎札轧铡闸诈斋债毡盏斩辗崭栈战绽张涨帐账胀赵蛰辙锗这贞针侦诊镇阵挣睁狰帧郑证织职执纸挚掷帜质钟终种肿众诌轴皱昼骤猪诸诛烛瞩嘱贮铸筑驻专砖转赚桩庄装妆壮状锥赘坠缀谆浊兹资渍踪综总纵邹诅组钻致钟么为只凶准启板里雳余链泄';
        var zh_t = '皚藹礙愛翺襖奧壩罷擺敗頒辦絆幫綁鎊謗剝飽寶報鮑輩貝鋇狽備憊繃筆畢斃閉邊編貶變辯辮鼈癟瀕濱賓擯餅撥缽鉑駁蔔補參蠶殘慚慘燦蒼艙倉滄廁側冊測層詫攙摻蟬饞讒纏鏟産闡顫場嘗長償腸廠暢鈔車徹塵陳襯撐稱懲誠騁癡遲馳恥齒熾沖蟲寵疇躊籌綢醜櫥廚鋤雛礎儲觸處傳瘡闖創錘純綽辭詞賜聰蔥囪從叢湊竄錯達帶貸擔單鄲撣膽憚誕彈當擋黨蕩檔搗島禱導盜燈鄧敵滌遞締點墊電澱釣調叠諜疊釘頂錠訂東動棟凍鬥犢獨讀賭鍍鍛斷緞兌隊對噸頓鈍奪鵝額訛惡餓兒爾餌貳發罰閥琺礬釩煩範販飯訪紡飛廢費紛墳奮憤糞豐楓鋒風瘋馮縫諷鳳膚輻撫輔賦複負訃婦縛該鈣蓋幹趕稈贛岡剛鋼綱崗臯鎬擱鴿閣鉻個給龔宮鞏貢鈎溝構購夠蠱顧剮關觀館慣貫廣規矽歸龜閨軌詭櫃貴劊輥滾鍋國過駭韓漢閡鶴賀橫轟鴻紅後壺護滬戶嘩華畫劃話懷壞歡環還緩換喚瘓煥渙黃謊揮輝毀賄穢會燴彙諱誨繪葷渾夥獲貨禍擊機積饑譏雞績緝極輯級擠幾薊劑濟計記際繼紀夾莢頰賈鉀價駕殲監堅箋間艱緘繭檢堿鹼揀撿簡儉減薦檻鑒踐賤見鍵艦劍餞漸濺澗漿蔣槳獎講醬膠澆驕嬌攪鉸矯僥腳餃繳絞轎較稭階節莖驚經頸靜鏡徑痙競淨糾廄舊駒舉據鋸懼劇鵑絹傑潔結誡屆緊錦僅謹進晉燼盡勁荊覺決訣絕鈞軍駿開凱顆殼課墾懇摳庫褲誇塊儈寬礦曠況虧巋窺饋潰擴闊蠟臘萊來賴藍欄攔籃闌蘭瀾讕攬覽懶纜爛濫撈勞澇樂鐳壘類淚籬離裏鯉禮麗厲勵礫曆瀝隸倆聯蓮連鐮憐漣簾斂臉鏈戀煉練糧涼兩輛諒療遼鐐獵臨鄰鱗凜賃齡鈴淩靈嶺領餾劉龍聾嚨籠壟攏隴樓婁摟簍蘆盧顱廬爐擄鹵虜魯賂祿錄陸驢呂鋁侶屢縷慮濾綠巒攣孿灤亂掄輪倫侖淪綸論蘿羅邏鑼籮騾駱絡媽瑪碼螞馬罵嗎買麥賣邁脈瞞饅蠻滿謾貓錨鉚貿麽黴沒鎂門悶們錳夢謎彌覓綿緬廟滅憫閩鳴銘謬謀畝鈉納難撓腦惱鬧餒膩攆撚釀鳥聶齧鑷鎳檸獰甯擰濘鈕紐膿濃農瘧諾歐鷗毆嘔漚盤龐國愛賠噴鵬騙飄頻貧蘋憑評潑頗撲鋪樸譜臍齊騎豈啓氣棄訖牽扡釺鉛遷簽謙錢鉗潛淺譴塹槍嗆牆薔強搶鍬橋喬僑翹竅竊欽親輕氫傾頃請慶瓊窮趨區軀驅齲顴權勸卻鵲讓饒擾繞熱韌認紉榮絨軟銳閏潤灑薩鰓賽傘喪騷掃澀殺紗篩曬閃陝贍繕傷賞燒紹賒攝懾設紳審嬸腎滲聲繩勝聖師獅濕詩屍時蝕實識駛勢釋飾視試壽獸樞輸書贖屬術樹豎數帥雙誰稅順說碩爍絲飼聳慫頌訟誦擻蘇訴肅雖綏歲孫損筍縮瑣鎖獺撻擡攤貪癱灘壇譚談歎湯燙濤縧騰謄銻題體屜條貼鐵廳聽烴銅統頭圖塗團頹蛻脫鴕馱駝橢窪襪彎灣頑萬網韋違圍爲濰維葦偉僞緯謂衛溫聞紋穩問甕撾蝸渦窩嗚鎢烏誣無蕪吳塢霧務誤錫犧襲習銑戲細蝦轄峽俠狹廈鍁鮮纖鹹賢銜閑顯險現獻縣餡羨憲線廂鑲鄉詳響項蕭銷曉嘯蠍協挾攜脅諧寫瀉謝鋅釁興洶鏽繡虛噓須許緒續軒懸選癬絢學勳詢尋馴訓訊遜壓鴉鴨啞亞訝閹煙鹽嚴顔閻豔厭硯彥諺驗鴦楊揚瘍陽癢養樣瑤搖堯遙窯謠藥爺頁業葉醫銥頤遺儀彜蟻藝億憶義詣議誼譯異繹蔭陰銀飲櫻嬰鷹應纓瑩螢營熒蠅穎喲擁傭癰踴詠湧優憂郵鈾猶遊誘輿魚漁娛與嶼語籲禦獄譽預馭鴛淵轅園員圓緣遠願約躍鑰嶽粵悅閱雲鄖勻隕運蘊醞暈韻雜災載攢暫贊贓髒鑿棗竈責擇則澤賊贈紮劄軋鍘閘詐齋債氈盞斬輾嶄棧戰綻張漲帳賬脹趙蟄轍鍺這貞針偵診鎮陣掙睜猙幀鄭證織職執紙摯擲幟質鍾終種腫衆謅軸皺晝驟豬諸誅燭矚囑貯鑄築駐專磚轉賺樁莊裝妝壯狀錐贅墜綴諄濁茲資漬蹤綜總縱鄒詛組鑽緻鐘麼為隻兇準啟闆裡靂餘鍊洩';
        var s1, s2;
        if (zh_choose == 't') {
            s1 = zh_s;
            s2 = zh_t;
        } else if (zh_choose == 's') {
            s1 = zh_t;
            s2 = zh_s;
        } else {
            return str;
        }
        var newText = '';
        for (var i = 0; i < str.length; i++) {
            var word = str.charAt(i);
            var isExtant = s1.indexOf(word);
            newText += isExtant < 0 ? word : s2.charAt(isExtant);
        }
        return newText;
    },

};

export default Utils;
