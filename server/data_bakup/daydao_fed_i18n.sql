/*
 Navicat Premium Data Transfer

 Source Server         : 192.168.8.178
 Source Server Type    : MySQL
 Source Server Version : 50725
 Source Host           : 192.168.8.178:3306
 Source Schema         : daydao_fed_i18n

 Target Server Type    : MySQL
 Target Server Version : 50725
 File Encoding         : 65001

 Date: 27/07/2020 15:46:38
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for language_fields
-- ----------------------------
DROP TABLE IF EXISTS `language_fields`;
CREATE TABLE `language_fields`  (
  `id` int(255) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `zh` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '中文描述',
  `en` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '英文描述',
  `key` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '语言包变量的键',
  `lib_id` int(11) NOT NULL COMMENT '语言包id',
  `parent_id` int(11) DEFAULT NULL COMMENT 'key的父id',
  `update_time` datetime(0) DEFAULT NULL COMMENT '更新时间',
  `create_time` datetime(0) DEFAULT NULL COMMENT '创建时间',
  `parent_key` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '父级key',
  `is_has_children` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '0' COMMENT '是否有子级，1：是，0：否',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 33 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of language_fields
-- ----------------------------
INSERT INTO `language_fields` VALUES (8, '水电费', 'dfgf', 'test1', 11, NULL, '2020-07-24 17:37:14', '2020-07-24 17:37:14', '', '1');
INSERT INTO `language_fields` VALUES (9, '梵蒂冈的个', 'dfg', 'dfg', 11, NULL, '2020-07-24 17:37:21', '2020-07-24 17:37:21', '', '1');
INSERT INTO `language_fields` VALUES (19, '阿斯顿发', 'adf', 'asdf', 11, 9, '2020-07-27 11:01:53', '2020-07-27 11:01:53', 'dfg', '0');
INSERT INTO `language_fields` VALUES (20, '的点点滴滴', 'a', 'sa', 11, 9, '2020-07-27 11:01:58', '2020-07-27 11:01:58', 'dfg', '0');
INSERT INTO `language_fields` VALUES (21, '个地方和打回', 'ss', 'asdfd', 11, 8, '2020-07-27 11:02:10', '2020-07-27 11:02:10', 'test1', '0');
INSERT INTO `language_fields` VALUES (22, '啊啊啊', 'a', 'a', 11, NULL, '2020-07-27 11:25:18', '2020-07-27 11:25:18', '', '0');
INSERT INTO `language_fields` VALUES (27, '收费的', 'f', 'b', 11, NULL, '2020-07-27 15:03:57', '2020-07-27 15:03:57', '', '0');
INSERT INTO `language_fields` VALUES (28, 'a', 'a', 'a', 33, NULL, '2020-07-27 15:08:45', '2020-07-27 15:08:45', '', '0');
INSERT INTO `language_fields` VALUES (29, '1', '1', '1', 11, NULL, '2020-07-27 15:16:02', '2020-07-27 15:16:02', '', '0');
INSERT INTO `language_fields` VALUES (30, '啊', 'a', 'a', 11, 9, '2020-07-27 15:24:21', '2020-07-27 15:24:21', 'dfg', '0');
INSERT INTO `language_fields` VALUES (31, 'sdf', 'sd', 'b', 11, 9, '2020-07-27 15:29:26', '2020-07-27 15:29:26', 'dfg', '0');
INSERT INTO `language_fields` VALUES (32, 'asd', 'sd', 'sdf', 11, 9, '2020-07-27 15:36:25', '2020-07-27 15:36:25', 'dfg', '0');

-- ----------------------------
-- Table structure for language_lib
-- ----------------------------
DROP TABLE IF EXISTS `language_lib`;
CREATE TABLE `language_lib`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id索引',
  `json_str` longtext CHARACTER SET utf8 COLLATE utf8_general_ci COMMENT 'json字符串',
  `type` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '语言包分类',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '语言包名称',
  `create_time` datetime(0) DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime(0) DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 34 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of language_lib
-- ----------------------------
INSERT INTO `language_lib` VALUES (1, '[{\"id\":1579080103669,\"name\":\"title\",\"zh_cn\":\"标题\",\"en_cn\":\"title\",\"children\":[],\"nameIsEdit\":false,\"zh_cnIsEdit\":false,\"en_cnIsEdit\":false},{\"id\":1579080136694,\"name\":\"sumit_btn\",\"zh_cn\":\"提交\",\"en_cn\":\"submit\",\"children\":[],\"nameIsEdit\":false,\"zh_cnIsEdit\":false,\"en_cnIsEdit\":false}]', '1', '组织人事PC端语言包', NULL, NULL);
INSERT INTO `language_lib` VALUES (2, '[]', '1', '组织人事移动端语言包', NULL, NULL);
INSERT INTO `language_lib` VALUES (3, '[bbb]', '1', '组织人事移动端语言包1', NULL, NULL);
INSERT INTO `language_lib` VALUES (17, '[]', '1', '组织人事语言包test1', NULL, NULL);
INSERT INTO `language_lib` VALUES (18, '[{\"name\":\"emptyTexst\",\"zh_cn\":\"暂无数据\",\"heeh\":\"lsdkfjsdlfsd\",\"id\":1,\"en_cn\":\"\",\"nameIsEdit\":false,\"zh_cnIsEdit\":false,\"en_cnIsEdit\":false,\"children\":[]},{\"name\":\"colorpicker\",\"children\":[{\"name\":\"confirm\",\"zh_cn\":\"确定\",\"en_cn\":\"confirms\",\"id\":3,\"nameIsEdit\":false,\"zh_cnIsEdit\":false,\"en_cnIsEdit\":false,\"children\":[]},{\"name\":\"clearsss\",\"zh_cn\":\"清空\",\"en_cn\":\"clears\",\"id\":4,\"nameIsEdit\":false,\"zh_cnIsEdit\":false,\"en_cnIsEdit\":false,\"children\":[]}],\"id\":2,\"zh_cn\":\"\",\"en_cn\":\"\",\"nameIsEdit\":false,\"zh_cnIsEdit\":false,\"en_cnIsEdit\":false}]', '1', '组织人事语言包test2', NULL, NULL);
INSERT INTO `language_lib` VALUES (19, '[{\"id\":1579080271686,\"name\":\"page_title\",\"zh_cn\":\"day招聘\",\"en_cn\":\"day job\",\"children\":[{\"id\":1584061517468,\"name\":\"aa\",\"zh_cn\":\"a\",\"en_cn\":\"a\",\"children\":[{\"id\":1584061524005,\"name\":\"b\",\"zh_cn\":\"b\",\"en_cn\":\"b\",\"children\":[{\"id\":1584061530141,\"name\":\"c\",\"zh_cn\":\"c\",\"en_cn\":\"c\",\"children\":[],\"nameIsEdit\":false,\"zh_cnIsEdit\":false,\"en_cnIsEdit\":false}],\"nameIsEdit\":false,\"zh_cnIsEdit\":false,\"en_cnIsEdit\":false}],\"nameIsEdit\":false,\"zh_cnIsEdit\":false,\"en_cnIsEdit\":false}],\"nameIsEdit\":false,\"zh_cnIsEdit\":false,\"en_cnIsEdit\":false}]', '1', 'ats pc语言包', NULL, NULL);
INSERT INTO `language_lib` VALUES (24, '[{\"id\":1584068784118,\"name\":\"welcome_login\",\"zh_cn\":\"欢迎登录\",\"en_cn\":\"\",\"children\":[],\"nameIsEdit\":false,\"zh_cnIsEdit\":false,\"en_cnIsEdit\":false},{\"id\":1584068818190,\"name\":\"login\",\"zh_cn\":\"登录\",\"en_cn\":\"\",\"children\":[],\"nameIsEdit\":false,\"zh_cnIsEdit\":false,\"en_cnIsEdit\":false},{\"id\":1584068841671,\"name\":\"account_login\",\"zh_cn\":\"账号登录\",\"en_cn\":\"\",\"children\":[],\"nameIsEdit\":false,\"zh_cnIsEdit\":false,\"en_cnIsEdit\":false},{\"id\":1584068876013,\"name\":\"qr_code_login\",\"zh_cn\":\"扫码登陆\",\"en_cn\":\"\",\"children\":[],\"nameIsEdit\":false,\"zh_cnIsEdit\":false,\"en_cnIsEdit\":false},{\"id\":1584068915362,\"name\":\"remember_account\",\"zh_cn\":\"记住账号\",\"en_cn\":\"\",\"children\":[],\"nameIsEdit\":false,\"zh_cnIsEdit\":false,\"en_cnIsEdit\":false},{\"id\":1584513485068,\"name\":\"sort_message_code_login\",\"zh_cn\":\"短信验证码登录\",\"en_cn\":\"\",\"children\":[],\"nameIsEdit\":false,\"zh_cnIsEdit\":false,\"en_cnIsEdit\":false},{\"id\":1584513541481,\"name\":\"click_to_get_validate_code\",\"zh_cn\":\"点击获取\",\"en_cn\":\"\",\"children\":[],\"nameIsEdit\":false,\"zh_cnIsEdit\":false,\"en_cnIsEdit\":false}]', '13', '登录(passport)模块', NULL, NULL);
INSERT INTO `language_lib` VALUES (25, '[{\"id\":1,\"name\":\"home_page\",\"en_cn\":\"\",\"nameIsEdit\":false,\"zh_cnIsEdit\":false,\"en_cnIsEdit\":false,\"zh_cn\":\"\",\"children\":[{\"id\":3,\"name\":\"top_new_candidate\",\"en_cn\":\"New candidates\",\"nameIsEdit\":false,\"zh_cnIsEdit\":false,\"en_cnIsEdit\":false,\"zh_cn\":\"新候选人\",\"children\":[]},{\"id\":4,\"name\":\"top_first_selection_part\",\"en_cn\":\"Screen process\",\"nameIsEdit\":false,\"zh_cnIsEdit\":false,\"en_cnIsEdit\":false,\"zh_cn\":\"初选环节\",\"children\":[]},{\"id\":5,\"name\":\"interview_part\",\"en_cn\":\"Interview process\",\"nameIsEdit\":false,\"zh_cnIsEdit\":false,\"en_cnIsEdit\":false,\"zh_cn\":\"面试环节\",\"children\":[]},{\"id\":6,\"name\":\"offter_part\",\"en_cn\":\"Offer process\",\"nameIsEdit\":false,\"zh_cnIsEdit\":false,\"en_cnIsEdit\":false,\"zh_cn\":\"offer环节\",\"children\":[]},{\"id\":7,\"name\":\"first_selection_pass\",\"en_cn\":\"Screening through\",\"nameIsEdit\":false,\"zh_cnIsEdit\":false,\"en_cnIsEdit\":false,\"zh_cn\":\"初选通过\",\"children\":[]},{\"id\":8,\"name\":\"inviting_postion\",\"en_cn\":\"Positions\",\"nameIsEdit\":false,\"zh_cnIsEdit\":false,\"en_cnIsEdit\":false,\"zh_cn\":\"招聘中职位\",\"children\":[]},{\"id\":9,\"name\":\"candidate_total\",\"en_cn\":\"Candidates\",\"nameIsEdit\":false,\"zh_cnIsEdit\":false,\"en_cnIsEdit\":false,\"zh_cn\":\"候选人总数\",\"children\":[]},{\"id\":10,\"name\":\"recently_async_date_num\",\"en_cn\":\"last sync date/number\",\"nameIsEdit\":false,\"zh_cnIsEdit\":false,\"en_cnIsEdit\":false,\"zh_cn\":\"最近同步日期/数量\",\"children\":[]},{\"id\":11,\"name\":\"backlog\",\"en_cn\":\"Backlog\",\"nameIsEdit\":false,\"zh_cnIsEdit\":false,\"en_cnIsEdit\":false,\"zh_cn\":\"待办事项\",\"children\":[]},{\"id\":12,\"name\":\"today_interview\",\"en_cn\":\"Interviews today\",\"nameIsEdit\":false,\"zh_cnIsEdit\":false,\"en_cnIsEdit\":false,\"zh_cn\":\"今日面试\",\"children\":[]},{\"id\":13,\"name\":\"undistributed_postion\",\"en_cn\":\"Unassigned position\",\"nameIsEdit\":false,\"zh_cnIsEdit\":false,\"en_cnIsEdit\":false,\"zh_cn\":\"未分配职位\",\"children\":[]},{\"id\":14,\"name\":\"recommended_feedback\",\"en_cn\":\"Recommended feedback\",\"nameIsEdit\":false,\"zh_cnIsEdit\":false,\"en_cnIsEdit\":false,\"zh_cn\":\"推荐反馈\",\"children\":[]},{\"id\":15,\"name\":\"today_entry\",\"en_cn\":\"Entries today\",\"nameIsEdit\":false,\"zh_cnIsEdit\":false,\"en_cnIsEdit\":false,\"zh_cn\":\"今日入职\",\"children\":[]},{\"id\":16,\"name\":\"recrut_info\",\"en_cn\":\"Recruitment messages\",\"nameIsEdit\":false,\"zh_cnIsEdit\":false,\"en_cnIsEdit\":false,\"zh_cn\":\"招聘消息\",\"children\":[]},{\"id\":17,\"name\":\"more\",\"en_cn\":\"more\",\"nameIsEdit\":false,\"zh_cnIsEdit\":false,\"en_cnIsEdit\":false,\"zh_cn\":\"更多\",\"children\":[]},{\"id\":18,\"name\":\"yesterday\",\"en_cn\":\"yesterday\",\"nameIsEdit\":false,\"zh_cnIsEdit\":false,\"en_cnIsEdit\":false,\"zh_cn\":\"昨天\",\"children\":[]},{\"id\":19,\"name\":\"lookover_resume\",\"en_cn\":\"resume\",\"nameIsEdit\":false,\"zh_cnIsEdit\":false,\"en_cnIsEdit\":false,\"zh_cn\":\"查看简历\",\"children\":[]},{\"id\":20,\"name\":\"lookover_offer\",\"en_cn\":\"offer\",\"nameIsEdit\":false,\"zh_cnIsEdit\":false,\"en_cnIsEdit\":false,\"zh_cn\":\"查看offer\",\"children\":[]},{\"id\":21,\"name\":\"lookover_video_interview\",\"en_cn\":\" interview video\",\"nameIsEdit\":false,\"zh_cnIsEdit\":false,\"en_cnIsEdit\":false,\"zh_cn\":\"查看面试视频\",\"children\":[]},{\"id\":22,\"name\":\"no_more_message\",\"en_cn\":\"No more messages\",\"nameIsEdit\":false,\"zh_cnIsEdit\":false,\"en_cnIsEdit\":false,\"zh_cn\":\"无更多消息\",\"children\":[]},{\"id\":23,\"name\":\"shortcut_entry\",\"en_cn\":\"Quick Links\",\"nameIsEdit\":false,\"zh_cnIsEdit\":false,\"en_cnIsEdit\":false,\"zh_cn\":\"快捷入口\",\"children\":[]},{\"id\":24,\"name\":\"has_been_around_interview\",\"en_cn\":\"Interviews scheduled \",\"nameIsEdit\":false,\"zh_cnIsEdit\":false,\"en_cnIsEdit\":false,\"zh_cn\":\"已约面试\",\"children\":[]},{\"id\":25,\"name\":\"add_candidate\",\"en_cn\":\"Add candidate\",\"nameIsEdit\":false,\"zh_cnIsEdit\":false,\"en_cnIsEdit\":false,\"zh_cn\":\"添加候选人\",\"children\":[]},{\"id\":26,\"name\":\"upload_resume\",\"en_cn\":\"Upload resume\",\"nameIsEdit\":false,\"zh_cnIsEdit\":false,\"en_cnIsEdit\":false,\"zh_cn\":\"上传附件简历\",\"children\":[]},{\"id\":27,\"name\":\"excel_batch_import\",\"en_cn\":\"Excel import\",\"nameIsEdit\":false,\"zh_cnIsEdit\":false,\"en_cnIsEdit\":false,\"zh_cn\":\"Excel批量导入\",\"children\":[]},{\"id\":28,\"name\":\"add_recrut_position\",\"en_cn\":\"Add position\",\"nameIsEdit\":false,\"zh_cnIsEdit\":false,\"en_cnIsEdit\":false,\"zh_cn\":\"添加招聘职位\",\"children\":[]},{\"id\":29,\"name\":\"recrut_h5\",\"en_cn\":\"Recruitment H5\",\"nameIsEdit\":false,\"zh_cnIsEdit\":false,\"en_cnIsEdit\":false,\"zh_cn\":\"招聘H5\",\"children\":[]},{\"id\":30,\"name\":\"interview_sign_in_code\",\"en_cn\":\"Sign-in code\",\"nameIsEdit\":false,\"zh_cnIsEdit\":false,\"en_cnIsEdit\":false,\"zh_cn\":\"面试签到码\",\"children\":[]},{\"id\":31,\"name\":\"recrut_params_setting\",\"en_cn\":\"Recruitment setting\",\"nameIsEdit\":false,\"zh_cnIsEdit\":false,\"en_cnIsEdit\":false,\"zh_cn\":\"招聘参数设置\",\"children\":[]},{\"id\":32,\"name\":\"email_templete_setting\",\"en_cn\":\"Template setting\",\"nameIsEdit\":false,\"zh_cnIsEdit\":false,\"en_cnIsEdit\":false,\"zh_cn\":\"邮件模板设置\",\"children\":[]},{\"id\":33,\"name\":\"channel_setting\",\"en_cn\":\"Channel setting\",\"nameIsEdit\":false,\"zh_cnIsEdit\":false,\"en_cnIsEdit\":false,\"zh_cn\":\"渠道设置\",\"children\":[]},{\"id\":34,\"name\":\"interview_video\",\"en_cn\":\" Interview video\",\"nameIsEdit\":false,\"zh_cnIsEdit\":false,\"en_cnIsEdit\":false,\"zh_cn\":\"面试视频\",\"children\":[]},{\"id\":35,\"name\":\"interviewer\",\"en_cn\":\"interviewee\",\"nameIsEdit\":false,\"zh_cnIsEdit\":false,\"en_cnIsEdit\":false,\"zh_cn\":\"面试者\",\"children\":[]},{\"id\":36,\"name\":\"interview_position\",\"en_cn\":\"position\",\"nameIsEdit\":false,\"zh_cnIsEdit\":false,\"en_cnIsEdit\":false,\"zh_cn\":\"面试职位\",\"children\":[]},{\"id\":37,\"name\":\"recently_num_days\",\"en_cn\":\"Recent {num} days\",\"nameIsEdit\":false,\"zh_cnIsEdit\":false,\"en_cnIsEdit\":false,\"zh_cn\":\"最近{num}日\",\"children\":[]},{\"id\":38,\"name\":\"more_statistics\",\"en_cn\":\"More statistics\",\"nameIsEdit\":false,\"zh_cnIsEdit\":false,\"en_cnIsEdit\":false,\"zh_cn\":\"更多统计\",\"children\":[]},{\"id\":39,\"name\":\"delivery_trend\",\"en_cn\":\"Delivery trend\",\"nameIsEdit\":false,\"zh_cnIsEdit\":false,\"en_cnIsEdit\":false,\"zh_cn\":\"投递趋势\",\"children\":[]},{\"id\":40,\"name\":\"to\",\"en_cn\":\"to\",\"nameIsEdit\":false,\"zh_cnIsEdit\":false,\"en_cnIsEdit\":false,\"zh_cn\":\"至\",\"children\":[]},{\"id\":41,\"name\":\"channel_quality\",\"en_cn\":\"Channel quality\",\"nameIsEdit\":false,\"zh_cnIsEdit\":false,\"en_cnIsEdit\":false,\"zh_cn\":\"渠道质量\",\"children\":[]},{\"id\":42,\"name\":\"sort\",\"en_cn\":\"sort\",\"nameIsEdit\":false,\"zh_cnIsEdit\":false,\"en_cnIsEdit\":false,\"zh_cn\":\"排序\",\"children\":[]},{\"id\":43,\"name\":\"candidate_number\",\"en_cn\":\"candidates\",\"nameIsEdit\":false,\"zh_cnIsEdit\":false,\"en_cnIsEdit\":false,\"zh_cn\":\"候选人数\",\"children\":[]},{\"id\":44,\"name\":\"has_been_around_person_number\",\"en_cn\":\"interviewees\",\"nameIsEdit\":false,\"zh_cnIsEdit\":false,\"en_cnIsEdit\":false,\"zh_cn\":\"约面人数\",\"children\":[]},{\"id\":45,\"name\":\"send_offer_number\",\"en_cn\":\"offers\",\"nameIsEdit\":false,\"zh_cnIsEdit\":false,\"en_cnIsEdit\":false,\"zh_cn\":\"发offer人数\",\"children\":[]},{\"id\":46,\"name\":\"empty_data\",\"en_cn\":\"No data\",\"nameIsEdit\":false,\"zh_cnIsEdit\":false,\"en_cnIsEdit\":false,\"zh_cn\":\"暂无数据\",\"children\":[]},{\"id\":47,\"name\":\"select_date\",\"en_cn\":\"Select date\",\"nameIsEdit\":false,\"zh_cnIsEdit\":false,\"en_cnIsEdit\":false,\"zh_cn\":\"选择日期\",\"children\":[]},{\"id\":48,\"name\":\"interviewer_total\",\"en_cn\":\"interviewees\",\"nameIsEdit\":false,\"zh_cnIsEdit\":false,\"en_cnIsEdit\":false,\"zh_cn\":\"面试总人次\",\"children\":[]},{\"id\":49,\"name\":\"morning_interview\",\"en_cn\":\"morning\",\"nameIsEdit\":false,\"zh_cnIsEdit\":false,\"en_cnIsEdit\":false,\"zh_cn\":\"上午面试\",\"children\":[]},{\"id\":50,\"name\":\"afternoon_interview\",\"en_cn\":\"afternoon\",\"nameIsEdit\":false,\"zh_cnIsEdit\":false,\"en_cnIsEdit\":false,\"zh_cn\":\"下午面试\",\"children\":[]},{\"id\":51,\"name\":\"no_interview_is_scheduled\",\"en_cn\":\"No interview schedule\",\"nameIsEdit\":false,\"zh_cnIsEdit\":false,\"en_cnIsEdit\":false,\"zh_cn\":\"暂无面试安排\",\"children\":[]}]}]', '14', 'ATS平台PC端', NULL, NULL);
INSERT INTO `language_lib` VALUES (11, NULL, '1', '组织人事PC端语言包1', NULL, '2020-07-27 15:36:25');
INSERT INTO `language_lib` VALUES (33, NULL, '1', 'aaaa', '2020-07-27 15:08:39', '2020-07-27 15:08:45');

-- ----------------------------
-- Table structure for language_type
-- ----------------------------
DROP TABLE IF EXISTS `language_type`;
CREATE TABLE `language_type`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '类型id',
  `typeName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '类型名称',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 15 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of language_type
-- ----------------------------
INSERT INTO `language_type` VALUES (1, '组织人事');
INSERT INTO `language_type` VALUES (13, '用户中心');
INSERT INTO `language_type` VALUES (14, 'ATS');

-- ----------------------------
-- Table structure for language_user
-- ----------------------------
DROP TABLE IF EXISTS `language_user`;
CREATE TABLE `language_user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `mobile` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '手机号',
  `dd` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT 'dd号',
  `user_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '姓名',
  `update_time` datetime(0) DEFAULT NULL COMMENT '更新时间',
  `create_time` datetime(0) DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of language_user
-- ----------------------------
INSERT INTO `language_user` VALUES (1, '17688798968', '100438847', '张淇', '2020-07-24 14:17:07', '2019-12-20 15:17:26');
INSERT INTO `language_user` VALUES (2, '17688798969', '10000001', '小明', '2020-07-21 11:56:00', NULL);

SET FOREIGN_KEY_CHECKS = 1;
