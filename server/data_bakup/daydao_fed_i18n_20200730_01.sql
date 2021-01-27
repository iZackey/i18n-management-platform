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

 Date: 30/07/2020 21:19:14
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
  `parent_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '0' COMMENT 'key的父id',
  `update_time` datetime(0) DEFAULT NULL COMMENT '更新时间',
  `create_time` datetime(0) DEFAULT NULL COMMENT '创建时间',
  `parent_key` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '父级key',
  `is_has_children` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '0' COMMENT '是否有子级，1：是，0：否',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 260 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of language_fields
-- ----------------------------
INSERT INTO `language_fields` VALUES (8, '水电费', 'dfgf', 'test1', 11, '0', '2020-07-24 17:37:14', '2020-07-24 17:37:14', '', '1');
INSERT INTO `language_fields` VALUES (9, '梵蒂冈的个', 'dfg', 'dfg', 11, '0', '2020-07-24 17:37:21', '2020-07-24 17:37:21', '', '1');
INSERT INTO `language_fields` VALUES (19, '阿斯顿发', 'adf', 'asdf1', 11, '9', '2020-07-27 18:17:57', '2020-07-27 11:01:53', 'dfg', '0');
INSERT INTO `language_fields` VALUES (20, '的点点滴滴', 'a', 'sa', 11, '9', '2020-07-27 11:01:58', '2020-07-27 11:01:58', 'dfg', '0');
INSERT INTO `language_fields` VALUES (21, '个地方和打回', 'ss', 'asdfd', 11, '8', '2020-07-27 11:02:10', '2020-07-27 11:02:10', 'test1', '0');
INSERT INTO `language_fields` VALUES (22, '啊啊啊', 'a', 'a', 11, '0', '2020-07-27 11:25:18', '2020-07-27 11:25:18', '', '0');
INSERT INTO `language_fields` VALUES (27, '收费的', 'f', 'b', 11, '0', '2020-07-27 15:03:57', '2020-07-27 15:03:57', '', '0');
INSERT INTO `language_fields` VALUES (29, '1', '1', '1', 11, '0', '2020-07-27 15:16:02', '2020-07-27 15:16:02', '', '0');
INSERT INTO `language_fields` VALUES (30, '啊', 'a', 'a', 11, '9', '2020-07-27 15:24:21', '2020-07-27 15:24:21', 'dfg', '0');
INSERT INTO `language_fields` VALUES (31, 'sdf', 'sd', 'b', 11, '9', '2020-07-27 15:29:26', '2020-07-27 15:29:26', 'dfg', '0');
INSERT INTO `language_fields` VALUES (32, 'asd', 'sd', 'sdf', 11, '9', '2020-07-27 15:36:25', '2020-07-27 15:36:25', 'dfg', '0');
INSERT INTO `language_fields` VALUES (33, '首页', '', 'home_page', 25, '0', '2020-07-27 04:20:14', '2020-07-27 04:20:14', '', '1');
INSERT INTO `language_fields` VALUES (34, '入职环节', 'New candidates', 'top_new_candidate', 25, '33', '2020-07-27 04:20:31', '2020-07-27 04:20:31', 'home_page', '0');
INSERT INTO `language_fields` VALUES (36, '筛选环节', 'Screen process', 'top_first_selection_part', 25, '33', '2020-07-27 19:30:31', '2020-07-27 04:21:03', 'home_page', '0');
INSERT INTO `language_fields` VALUES (37, '面试环节', 'Interview process', 'interview_part', 25, '33', '2020-07-27 19:35:54', '2020-07-27 04:21:12', 'home_page', '0');
INSERT INTO `language_fields` VALUES (38, '面试通过', 'Interview Pass', 'interview_pass', 25, '33', '2020-07-27 19:38:26', '2020-07-27 04:21:20', 'home_page', '0');
INSERT INTO `language_fields` VALUES (41, 'asd', 'd', 'dddd', 11, '0', '2020-07-27 17:09:54', '2020-07-27 17:09:54', '', '0');
INSERT INTO `language_fields` VALUES (42, '我是A', NULL, 'a1', 11, '0', '2020-07-27 17:37:05', '2020-07-27 17:37:05', '', '0');
INSERT INTO `language_fields` VALUES (43, '我是A2', NULL, 'a2', 11, '0', '2020-07-27 17:37:05', '2020-07-27 17:37:05', '', '0');
INSERT INTO `language_fields` VALUES (44, '我是A', NULL, 'a1', 11, '9', '2020-07-27 17:37:26', '2020-07-27 17:37:26', 'dfg', '0');
INSERT INTO `language_fields` VALUES (45, '我是A2', NULL, 'a2', 11, '9', '2020-07-27 17:37:26', '2020-07-27 17:37:26', 'dfg', '0');
INSERT INTO `language_fields` VALUES (46, '我是A3', NULL, 'a3', 11, '0', '2020-07-27 17:40:53', '2020-07-27 17:40:53', '', '0');
INSERT INTO `language_fields` VALUES (47, '入职环节', NULL, 'top_new_candidate', 11, '9', '2020-07-27 17:43:32', '2020-07-27 17:43:32', 'dfg', '0');
INSERT INTO `language_fields` VALUES (48, '筛选环节', NULL, 'top_first_selection_part', 11, '9', '2020-07-27 17:43:32', '2020-07-27 17:43:32', 'dfg', '0');
INSERT INTO `language_fields` VALUES (49, '面试环节', NULL, 'interview_part', 11, '9', '2020-07-27 17:43:32', '2020-07-27 17:43:32', 'dfg', '0');
INSERT INTO `language_fields` VALUES (50, '面试通过', NULL, 'interview_pass', 11, '9', '2020-07-27 17:43:32', '2020-07-27 17:43:32', 'dfg', '0');
INSERT INTO `language_fields` VALUES (51, 'offer环节', NULL, 'offter_part', 11, '9', '2020-07-27 17:43:32', '2020-07-27 17:43:32', 'dfg', '0');
INSERT INTO `language_fields` VALUES (52, '已发offer', NULL, 'sent_offer', 11, '9', '2020-07-27 17:43:32', '2020-07-27 17:43:32', 'dfg', '0');
INSERT INTO `language_fields` VALUES (53, '面试官筛选', NULL, 'interviewer_selection', 11, '9', '2020-07-27 17:43:32', '2020-07-27 17:43:32', 'dfg', '0');
INSERT INTO `language_fields` VALUES (54, '初选通过', NULL, 'first_selection_pass', 11, '9', '2020-07-27 17:43:32', '2020-07-27 17:43:32', 'dfg', '0');
INSERT INTO `language_fields` VALUES (55, '招聘中职位', NULL, 'inviting_postion', 11, '9', '2020-07-27 17:43:32', '2020-07-27 17:43:32', 'dfg', '0');
INSERT INTO `language_fields` VALUES (56, '候选人总数', NULL, 'candidate_total', 11, '9', '2020-07-27 17:43:32', '2020-07-27 17:43:32', 'dfg', '0');
INSERT INTO `language_fields` VALUES (57, '招聘中候选人', NULL, 'inviting_candidate', 11, '9', '2020-07-27 17:43:32', '2020-07-27 17:43:32', 'dfg', '0');
INSERT INTO `language_fields` VALUES (58, '最近同步日期/数量', NULL, 'recently_async_date_num', 11, '9', '2020-07-27 17:43:32', '2020-07-27 17:43:32', 'dfg', '0');
INSERT INTO `language_fields` VALUES (59, '待办事项', NULL, 'backlog', 11, '9', '2020-07-27 17:43:32', '2020-07-27 17:43:32', 'dfg', '0');
INSERT INTO `language_fields` VALUES (115, '放弃人数', NULL, 'abandonee', 11, '9', '2020-07-27 17:43:33', '2020-07-27 17:43:33', 'dfg', '0');
INSERT INTO `language_fields` VALUES (116, '入职环节', NULL, 'top_new_candidate', 11, '0', '2020-07-27 17:45:18', '2020-07-27 17:45:18', '', '0');
INSERT INTO `language_fields` VALUES (117, '筛选环节', NULL, 'top_first_selection_part', 11, '0', '2020-07-27 17:45:18', '2020-07-27 17:45:18', '', '0');
INSERT INTO `language_fields` VALUES (118, '面试环节', NULL, 'interview_part', 11, '0', '2020-07-27 17:45:18', '2020-07-27 17:45:18', '', '0');
INSERT INTO `language_fields` VALUES (119, '面试通过', NULL, 'interview_pass', 11, '0', '2020-07-27 17:45:18', '2020-07-27 17:45:18', '', '0');
INSERT INTO `language_fields` VALUES (120, 'offer环节', NULL, 'offter_part', 11, '0', '2020-07-27 17:45:18', '2020-07-27 17:45:18', '', '1');
INSERT INTO `language_fields` VALUES (185, 'offer环节', 'Offer process', 'offter_part', 25, '33', '2020-07-27 20:58:34', '2020-07-27 19:09:44', 'home_page', '0');
INSERT INTO `language_fields` VALUES (186, '已发offer', NULL, 'sent_offer', 25, '33', '2020-07-27 19:09:44', '2020-07-27 19:09:44', 'home_page', '0');
INSERT INTO `language_fields` VALUES (187, '面试官筛选', NULL, 'interviewer_selection', 25, '33', '2020-07-27 19:09:44', '2020-07-27 19:09:44', 'home_page', '0');
INSERT INTO `language_fields` VALUES (188, '初选通过', 'Screening through', 'first_selection_pass', 25, '33', '2020-07-27 20:59:09', '2020-07-27 19:09:44', 'home_page', '0');
INSERT INTO `language_fields` VALUES (189, '招聘中职位', 'Positions', 'inviting_postion', 25, '33', '2020-07-27 21:05:03', '2020-07-27 19:09:44', 'home_page', '0');
INSERT INTO `language_fields` VALUES (190, '候选人总数', 'Candidates', 'candidate_total', 25, '33', '2020-07-27 21:05:12', '2020-07-27 19:09:44', 'home_page', '0');
INSERT INTO `language_fields` VALUES (191, '招聘中候选人', NULL, 'inviting_candidate', 25, '33', '2020-07-27 19:09:44', '2020-07-27 19:09:44', 'home_page', '0');
INSERT INTO `language_fields` VALUES (192, '最近同步日期/数量', 'last sync date/number', 'recently_async_date_num', 25, '33', '2020-07-27 21:05:30', '2020-07-27 19:09:44', 'home_page', '0');
INSERT INTO `language_fields` VALUES (193, '待办事项', 'Backlog', 'backlog', 25, '33', '2020-07-27 21:05:37', '2020-07-27 19:09:44', 'home_page', '0');
INSERT INTO `language_fields` VALUES (194, '今日面试', 'Interviews today', 'today_interview', 25, '33', '2020-07-27 21:05:49', '2020-07-27 19:09:44', 'home_page', '0');
INSERT INTO `language_fields` VALUES (195, '未分配职位', 'Unassigned position', 'undistributed_postion', 25, '33', '2020-07-27 21:06:01', '2020-07-27 19:09:44', 'home_page', '0');
INSERT INTO `language_fields` VALUES (196, '推荐反馈', 'Recommended feedback', 'recommended_feedback', 25, '33', '2020-07-27 21:06:13', '2020-07-27 19:09:44', 'home_page', '0');
INSERT INTO `language_fields` VALUES (197, '待入职', NULL, 'waiting_entry', 25, '33', '2020-07-27 19:09:44', '2020-07-27 19:09:44', 'home_page', '0');
INSERT INTO `language_fields` VALUES (198, '今日入职', 'Entries today', 'today_entry', 25, '33', '2020-07-27 21:06:29', '2020-07-27 19:09:44', 'home_page', '0');
INSERT INTO `language_fields` VALUES (199, '招聘消息', 'Recruitment messages', 'recrut_info', 25, '33', '2020-07-27 21:06:38', '2020-07-27 19:09:44', 'home_page', '0');
INSERT INTO `language_fields` VALUES (200, '更多', 'more', 'more', 25, '33', '2020-07-27 21:21:48', '2020-07-27 19:09:44', 'home_page', '0');
INSERT INTO `language_fields` VALUES (201, '昨天', 'yesterday', 'yesterday', 25, '33', '2020-07-27 21:21:42', '2020-07-27 19:09:44', 'home_page', '0');
INSERT INTO `language_fields` VALUES (202, '查看简历', 'resume', 'lookover_resume', 25, '33', '2020-07-27 21:21:35', '2020-07-27 19:09:44', 'home_page', '0');
INSERT INTO `language_fields` VALUES (203, '查看offer', 'offer', 'lookover_offer', 25, '33', '2020-07-27 21:21:29', '2020-07-27 19:09:44', 'home_page', '0');
INSERT INTO `language_fields` VALUES (204, '查看面试视频', 'interview video', 'lookover_video_interview', 25, '33', '2020-07-27 21:21:21', '2020-07-27 19:09:44', 'home_page', '0');
INSERT INTO `language_fields` VALUES (205, '无更多消息', 'No more messages', 'no_more_message', 25, '33', '2020-07-27 21:21:11', '2020-07-27 19:09:44', 'home_page', '0');
INSERT INTO `language_fields` VALUES (206, '快捷入口', 'Quick Links', 'shortcut_entry', 25, '33', '2020-07-27 21:21:03', '2020-07-27 19:09:44', 'home_page', '0');
INSERT INTO `language_fields` VALUES (207, '已约面试', 'Interviews scheduled', 'has_been_around_interview', 25, '33', '2020-07-27 21:20:55', '2020-07-27 19:09:44', 'home_page', '0');
INSERT INTO `language_fields` VALUES (208, '添加候选人', 'Add candidates', 'add_candidate', 25, '33', '2020-07-27 21:20:46', '2020-07-27 19:09:44', 'home_page', '0');
INSERT INTO `language_fields` VALUES (209, '上传附件简历', 'Upload resume', 'upload_resume', 25, '33', '2020-07-27 21:20:36', '2020-07-27 19:09:44', 'home_page', '0');
INSERT INTO `language_fields` VALUES (210, 'Excel批量导入', 'Excel import', 'excel_batch_import', 25, '33', '2020-07-27 21:20:27', '2020-07-27 19:09:44', 'home_page', '0');
INSERT INTO `language_fields` VALUES (211, '添加招聘职位', 'Add position', 'add_recrut_position', 25, '33', '2020-07-27 21:20:16', '2020-07-27 19:09:44', 'home_page', '0');
INSERT INTO `language_fields` VALUES (212, '招聘H5', 'Recruitment H5', 'recrut_h5', 25, '33', '2020-07-27 21:20:06', '2020-07-27 19:09:44', 'home_page', '0');
INSERT INTO `language_fields` VALUES (213, '面试签到码', 'Sign-in code', 'interview_sign_in_code', 25, '33', '2020-07-27 21:19:58', '2020-07-27 19:09:44', 'home_page', '0');
INSERT INTO `language_fields` VALUES (214, '招聘参数设置', 'Recruitment setting', 'recrut_params_setting', 25, '33', '2020-07-27 21:19:48', '2020-07-27 19:09:44', 'home_page', '0');
INSERT INTO `language_fields` VALUES (215, '邮件模板设置', 'Template setting', 'email_templete_setting', 25, '33', '2020-07-27 21:19:40', '2020-07-27 19:09:44', 'home_page', '0');
INSERT INTO `language_fields` VALUES (216, '渠道设置', 'Channel setting', 'channel_setting', 25, '33', '2020-07-27 21:19:32', '2020-07-27 19:09:44', 'home_page', '0');
INSERT INTO `language_fields` VALUES (217, '面试视频', 'Interview video', 'interview_video', 25, '33', '2020-07-27 21:19:22', '2020-07-27 19:09:44', 'home_page', '0');
INSERT INTO `language_fields` VALUES (218, '面试者', 'interviewee', 'interviewer', 25, '33', '2020-07-27 21:19:12', '2020-07-27 19:09:44', 'home_page', '0');
INSERT INTO `language_fields` VALUES (219, '面试职位', 'position', 'interview_position', 25, '33', '2020-07-27 21:19:01', '2020-07-27 19:09:44', 'home_page', '0');
INSERT INTO `language_fields` VALUES (220, '最近{num}日', 'Recent {num} days', 'recently_num_days', 25, '33', '2020-07-27 21:18:54', '2020-07-27 19:09:44', 'home_page', '0');
INSERT INTO `language_fields` VALUES (221, '更多统计', 'More statistics', 'more_statistics', 25, '33', '2020-07-27 21:18:44', '2020-07-27 19:09:44', 'home_page', '0');
INSERT INTO `language_fields` VALUES (222, '投递趋势', 'Delivery trend', 'delivery_trend', 25, '33', '2020-07-27 21:18:37', '2020-07-27 19:09:44', 'home_page', '0');
INSERT INTO `language_fields` VALUES (223, '至', 'to', 'to', 25, '33', '2020-07-27 21:18:29', '2020-07-27 19:09:44', 'home_page', '0');
INSERT INTO `language_fields` VALUES (224, '渠道质量', 'Channel quality', 'channel_quality', 25, '33', '2020-07-27 21:09:11', '2020-07-27 19:09:44', 'home_page', '0');
INSERT INTO `language_fields` VALUES (225, '排序', 'sort', 'sort', 25, '33', '2020-07-27 21:09:03', '2020-07-27 19:09:44', 'home_page', '0');
INSERT INTO `language_fields` VALUES (226, '候选人数', 'candidates', 'candidate_number', 25, '33', '2020-07-27 21:08:55', '2020-07-27 19:09:44', 'home_page', '0');
INSERT INTO `language_fields` VALUES (227, '约面人数', 'interviewees', 'has_been_around_person_number', 25, '33', '2020-07-27 21:08:42', '2020-07-27 19:09:44', 'home_page', '0');
INSERT INTO `language_fields` VALUES (228, '发offer人数', 'offers', 'send_offer_number', 25, '33', '2020-07-27 21:08:32', '2020-07-27 19:09:44', 'home_page', '0');
INSERT INTO `language_fields` VALUES (229, '暂无数据', 'No data', 'empty_data', 25, '33', '2020-07-27 21:08:26', '2020-07-27 19:09:44', 'home_page', '0');
INSERT INTO `language_fields` VALUES (230, '选择日期', 'Select date', 'select_date', 25, '33', '2020-07-27 21:08:17', '2020-07-27 19:09:44', 'home_page', '0');
INSERT INTO `language_fields` VALUES (231, '面试总人次', 'interviewees', 'interviewer_total', 25, '33', '2020-07-27 21:08:06', '2020-07-27 19:09:44', 'home_page', '0');
INSERT INTO `language_fields` VALUES (232, '上午面试', 'morning', 'morning_interview', 25, '33', '2020-07-27 21:07:56', '2020-07-27 19:09:44', 'home_page', '0');
INSERT INTO `language_fields` VALUES (233, '下午面试', 'afternoon', 'afternoon_interview', 25, '33', '2020-07-27 21:07:49', '2020-07-27 19:09:44', 'home_page', '0');
INSERT INTO `language_fields` VALUES (234, '暂无面试安排', 'No interview schedule', 'no_interview_is_scheduled', 25, '33', '2020-07-27 21:07:39', '2020-07-27 19:09:44', 'home_page', '0');
INSERT INTO `language_fields` VALUES (235, '一', 'MON', 'MON', 25, '33', '2020-07-27 21:07:30', '2020-07-27 19:09:45', 'home_page', '0');
INSERT INTO `language_fields` VALUES (236, '二', 'TUE', 'TUE', 25, '33', '2020-07-27 21:07:26', '2020-07-27 19:09:45', 'home_page', '0');
INSERT INTO `language_fields` VALUES (237, '三', 'WED', 'WED', 25, '33', '2020-07-27 21:07:22', '2020-07-27 19:09:45', 'home_page', '0');
INSERT INTO `language_fields` VALUES (238, '四', 'THU', 'THU', 25, '33', '2020-07-27 21:07:19', '2020-07-27 19:09:45', 'home_page', '0');
INSERT INTO `language_fields` VALUES (239, '五', 'FRI', 'FRI', 25, '33', '2020-07-27 21:07:10', '2020-07-27 19:09:45', 'home_page', '0');
INSERT INTO `language_fields` VALUES (240, '六', 'SAT', 'SAT', 25, '33', '2020-07-27 21:07:06', '2020-07-27 19:09:45', 'home_page', '0');
INSERT INTO `language_fields` VALUES (241, '日', 'SUN', 'SUN', 25, '33', '2020-07-27 21:06:58', '2020-07-27 19:09:45', 'home_page', '0');
INSERT INTO `language_fields` VALUES (242, '早上好', 'Good morning', 'good_morning', 25, '33', '2020-07-27 21:06:51', '2020-07-27 19:09:45', 'home_page', '0');
INSERT INTO `language_fields` VALUES (243, '上午好', 'Good morning', 'good_morning2', 25, '33', '2020-07-27 21:18:09', '2020-07-27 19:09:45', 'home_page', '0');
INSERT INTO `language_fields` VALUES (244, '中午好', 'Good afternoon', 'good_afternoon', 25, '33', '2020-07-27 21:16:48', '2020-07-27 19:09:45', 'home_page', '0');
INSERT INTO `language_fields` VALUES (245, '下午好', 'Good afternoon', 'good_afternoon2', 25, '33', '2020-07-27 21:16:22', '2020-07-27 19:09:45', 'home_page', '0');
INSERT INTO `language_fields` VALUES (246, '晚上好', 'Good evening', 'good_evening', 25, '33', '2020-07-27 21:09:55', '2020-07-27 19:09:45', 'home_page', '0');
INSERT INTO `language_fields` VALUES (247, '深夜辛苦了', 'Thank you for your hard work at the late night.', 'late_at_night', 25, '33', '2020-07-27 21:09:41', '2020-07-27 19:09:45', 'home_page', '0');
INSERT INTO `language_fields` VALUES (248, '入职人数', 'employees', 'employees', 25, '33', '2020-07-27 21:09:32', '2020-07-27 19:09:45', 'home_page', '0');
INSERT INTO `language_fields` VALUES (249, '放弃人数', 'abandonee', 'abandonee', 25, '33', '2020-07-27 21:09:22', '2020-07-27 19:09:45', 'home_page', '0');
INSERT INTO `language_fields` VALUES (255, 'weqe', 'qweqwe', 'das', 24, '0', '2020-07-28 05:20:15', '2020-07-28 05:20:15', '', '0');
INSERT INTO `language_fields` VALUES (259, '的方式', 'test1', 'test1', 11, '120', '2020-07-30 14:33:34', '2020-07-30 14:33:34', 'offter_part', '0');

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
) ENGINE = MyISAM AUTO_INCREMENT = 40 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of language_lib
-- ----------------------------
INSERT INTO `language_lib` VALUES (35, NULL, '1', '组织人事PC端', '2020-07-27 21:31:34', '2020-07-28 05:45:34');
INSERT INTO `language_lib` VALUES (36, NULL, '1', '薪酬PC端', '2020-07-27 21:31:44', NULL);
INSERT INTO `language_lib` VALUES (37, NULL, '1', '绩效PC端', '2020-07-27 21:31:56', NULL);
INSERT INTO `language_lib` VALUES (24, '', '13', '用户中心PC端', NULL, '2020-07-28 05:20:15');
INSERT INTO `language_lib` VALUES (25, '', '14', 'ATS平台PC端', NULL, '2020-07-27 21:21:48');
INSERT INTO `language_lib` VALUES (11, NULL, '1', '测试测试语言包', '2020-07-25 10:19:34', '2020-07-30 14:33:34');
INSERT INTO `language_lib` VALUES (34, NULL, '1', 'HR首页', '2020-07-27 21:31:24', NULL);

-- ----------------------------
-- Table structure for language_type
-- ----------------------------
DROP TABLE IF EXISTS `language_type`;
CREATE TABLE `language_type`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '类型id',
  `typeName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '类型名称',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 16 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

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
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of language_user
-- ----------------------------
INSERT INTO `language_user` VALUES (1, '17688798968', '100438847', '张淇', '2020-07-30 21:17:37', '2019-12-20 15:17:26');
INSERT INTO `language_user` VALUES (2, '17688798969', '10000001', '小明', '2020-07-21 11:56:00', NULL);
INSERT INTO `language_user` VALUES (3, '18938854218', '100000477', '萧峰', '2020-07-27 22:50:21', '2020-07-27 22:13:07');
INSERT INTO `language_user` VALUES (4, '15616010182', '209948307', '王运根', '2020-07-28 04:49:39', '2020-07-28 04:49:39');
INSERT INTO `language_user` VALUES (5, '13715236750', '209960744', '张鹏', '2020-07-28 05:02:30', '2020-07-28 05:02:30');
INSERT INTO `language_user` VALUES (6, '15576685145', '208869891', '邓灿', '2020-07-28 05:11:44', '2020-07-28 05:11:44');
INSERT INTO `language_user` VALUES (7, '13681874729', '209960047', '李博', '2020-07-28 05:20:01', '2020-07-28 05:20:01');
INSERT INTO `language_user` VALUES (8, '18611374775', '209950934', '杨明', '2020-07-28 05:20:31', '2020-07-28 05:20:31');
INSERT INTO `language_user` VALUES (9, '17397361501', '209960872', '方立飞', '2020-07-28 05:22:58', '2020-07-28 05:22:58');
INSERT INTO `language_user` VALUES (10, '17373930173', '209942579', '戴柳明', '2020-07-29 21:21:06', '2020-07-28 05:26:47');
INSERT INTO `language_user` VALUES (11, '17621920232', '209953972', '林峰', '2020-07-28 05:46:09', '2020-07-28 05:46:09');
INSERT INTO `language_user` VALUES (12, '15914081717', '100001933', '丁程洪', '2020-07-29 01:57:47', '2020-07-29 01:56:37');

SET FOREIGN_KEY_CHECKS = 1;
