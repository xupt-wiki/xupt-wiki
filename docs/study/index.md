---
author: [L33Z22L11]

bloggerList:
  - text: 方山厨子
    icon: https://p3-pc.douyinpic.com/img/aweme-avatar/tos-cn-avt-0015_6efed3b3259f7206e34ba9ea3a0f44e3~c5_300x300.jpeg
    iconSuffix: ri:bilibili-fill
    desc: 大学生生活指南
    link: https://space.bilibili.com/274459325/lists/3910642
  - text: 不加醋的氨基酸
    icon: https://p3-pc.douyinpic.com/img/aweme-avatar/tos-cn-i-0813_d09edbe5574a4090827916d8c8125f0a~c5_300x300.jpeg
    iconSuffix: ri:bilibili-fill
    desc: 择业知识
    link: https://space.bilibili.com/1283676771
  - text: 原子能
    icon: https://p3-pc.douyinpic.com/img/aweme-avatar/tos-cn-i-c9aec8xkvj_b78d3fb044be4369af94c2290528c7df~c5_300x300.jpeg
    iconSuffix: ri:bilibili-fill
    desc: 技术热点/架构/理念
    link: https://space.bilibili.com/162183

knowledgeList:
  - text: 你缺失的那门计算机课
    link: https://www.criwits.top/missing/
    icon: https://www.criwits.top/missing/favicon.png
    desc: 电脑小白入门电子书
  - text: 《上海交通大学生存手册》
    link: https://survivesjtu.gitbook.io/survivesjtumanual
    icon: https://survivesjtu.gitbook.io/survivesjtumanual/~gitbook/icon
    desc: 上海交通大学
  - text: 寻路之南
    link: https://cs4ncu.space/
    icon: https://cs4ncu.space/assets/ncuscc-logo.svg
    desc: 写给普通人的大学成长指南

csList:
  - text: CS 自学指南
    link: https://csdiy.wiki/
    icon: https://csdiy.wiki/images/favicon.ico
    desc: 献给北大信科的计算机自学指南
  - text: Linux101
    link: https://101.lug.ustc.edu.cn/
    icon: https://101.lug.ustc.edu.cn/assets/images/favicon.png
    desc: 中科大 LUG 编写的 Linux 入门
  - text: Missing Semester 中文版
    link: https://missing-semester-cn.github.io/
    icon: https://missing-semester-cn.github.io/favicon-32x32.png
    desc: 缺失的学期课程
  - text: HDU 计算机科学讲义
    link: https://hdu-cs.wiki/
    icon: https://hdu-cs.wiki/favicon.ico
    desc: 杭州电子科技大学
  - text: 西邮 Linux 兴趣小组培养计划
    link: https://plan.xiyoulinux.com/
    icon: https://plan.xiyoulinux.com/favicon.ico
    desc: Linux + 后端进阶入门指南
---

<script setup lang="ts">
import LinkList from "/.vitepress/components/unique/LinkList.vue";
</script>

# 学习

欢迎来到“学习”板块。

大学课程固然重要，但「自学」也是不可或缺的一环。

## 培养方案是忠实的讲述人

请阅读本年度培养方案，里面介绍有专业课程、学分要求、培养路线。

## 勿囿于课本

### 推荐博主

<LinkList :links="$frontmatter.bloggerList" />

### 应知应会

<LinkList :links="$frontmatter.knowledgeList" width="12em" />

### 计算机科学

<LinkList :links="$frontmatter.csList" width="12em" />

## 飞跃手册，常读常新

西安邮电大学飞跃手册是西安邮电大学飞跃手册项目组收集的，在考研、就业或申请中遇到一系列疑问和体悟总结出的一份电子书。

项目起始于2023年5月，邀请了西邮每年各个院系和专业的毕业生们，在书中分享他们在大学路上踩过的坑和填过的土。

[在线阅读](https://xuptflying.github.io/xupt-flying.github.io/#/)

[GitHub 仓库](https://github.com/xuptflying/xupt-flying.github.io)
