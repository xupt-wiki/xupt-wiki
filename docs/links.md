---
author: [L33Z22L11]
aside: false

campusLinks:
  - text: CO 导航
    link: https://www.cooo.site/
    icon: https://www.cooo.site/favicon.ico
    desc: 西安邮电大学网址导航服务
  - text: 西邮 Linux 兴趣小组
    link: https://xiyoulinux.com/
    icon: https://xiyoulinux.com/favicon.ico
    desc: 西邮 Linux 兴趣小组
  - text: 邮立方
    link: https://cop.cooo.site/
    icon: https://cop.cooo.site/static/cop.svg
    desc: 西安邮电大学 MC 交流群体
  - text: 隔壁小O
    icon: https://q1.qlogo.cn/g?b=qq&nk=3820099583&s=3
    desc: 华硕合伙人-西邮生活公众号
  - text: 3G 实验室
    link: https://mobile.xupt.edu.cn/
    icon: https://wsrv.nl/?url=github.com/XiyouMobile.png%3fsize=92
    desc: 西邮移动应用开发实验室
  - text: 智邮普创实验室
    link: https://zypc.xupt.edu.cn/
    icon: https://zypc.xupt.edu.cn/favicon.ico
    desc: 西安邮电大学智邮普创工作室

wikiLinks:
  - text: 西安邮电大学飞跃手册
    link: https://xuptflying.github.io/xupt-flying.github.io/#/
    icon: https://xuptflying.github.io/xupt-flying.github.io/src/_media/school_logo.png
    desc: 毕业学长的择业路线心得分享
  - text: FZU Wiki
    link: https://fzuwiki.west2.online/
    icon: https://west2.online/img/favicon.ico
    desc: 福州大学校园指南
  - text: HDU 计算机科学讲义
    link: https://hdu-cs.wiki/
    icon: https://hdu-cs.wiki/favicon.ico
    desc: 杭州电子科技大学
  - text: 重庆大学资源共享计划
    link: https://cqu-openlib.cn/
    icon: https://cqu-openlib.cn/assets/favicon.png
    desc: 重庆大学资源共享网站
  - text: 科成星球
    link: https://cduestc.fun/
    icon: https://cduestc.fun/logo.svg
    desc: 电子科技大学成都学院校园生活指南
  - text: Ac-Wiki
    link: https://ac-wiki.org/
    icon: https://ac-wiki.org/assets/logo_clear.png
    desc: 大学生的百科全书
  - text: 你缺失的那门计算机课
    link: https://www.criwits.top/missing/
    icon: https://www.criwits.top/missing/favicon.png
    desc: 电脑小白入门指南
  - text: 寻路之南
    link: https://cs4ncu.space/
    icon: https://cs4ncu.space/assets/ncuscc-logo.svg
    desc: 写给普通人的大学成长指南
---

<script setup lang="ts">
import LinkList from "/.vitepress/components/unique/LinkList.vue";
</script>

# 友情链接

## 校内组织

<LinkList :links="$frontmatter.campusLinks" />

## 姊妹 Wiki

<LinkList :links="$frontmatter.wikiLinks" />
