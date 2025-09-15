---
author: [L33Z22L11]
aside: false
studyApps:
  - text: 学习通
    icon: https://p19.qhimg.com/t01e56f9a7cebff2ea2.png
    desc: 多数课程均在此；不要忘记期末考试
  - text: U校园
    icon: http://p18.qhimg.com/t015ca67b31f18fc4e3.png
    desc: 大学英语要用
  - text: 中国大学MOOC
    icon: http://p17.qhimg.com/t0155917bbe9d6eabc9.png
    desc: 一部分课程要用；注意作业截止时间
  - text: 雨课堂
    icon: http://p16.qhimg.com/t01e315ad2852d5b7c6.png
    desc: 一部分课程要用
  - text: 云班课
    icon: http://p15.qhimg.com/t012d99363e7640f5ba.png
    desc: 操作系统上课用；签到/作业有💩摇一摇广告；搭配云教材APP使用
  - text: 大学搜题酱
    icon: http://p19.qhimg.com/t01d349081b85401905.png
    desc: 拍照搜题；查习题册答案；夸克APP也挺好用
  - text: 体适能
    icon: http://file.market.xiaomi.com/thumbnail/PNG/l62/AppStore/030f185b65da24325a716e41b42724479524d6685
    desc: 体育选课；体育理论考试
  - text: 步道乐跑
    icon: http://p18.qhimg.com/t01af7dbe39618208df.png
    desc: 校园跑，一学期80km左右；aka 步道乐骑，步道乐摇

orgApps:
  - text: 志愿汇
    icon: http://p19.qhimg.com/t01ee80da7f31430c22.png
    desc: 部分组织团体用来记录志愿时长
  - text: 学习强国
    icon: http://p15.qhimg.com/t01e6a78df67ae66ca9.png
    desc: 相关作业文档参考；入组织需学习公社APP

lifeApps:
  - text: 菜鸟
    icon: http://p16.qhimg.com/dr/_72_/t01950c338d20f6ccaa.png
    desc: 查快递、身份码取快递；淘宝“我的驿站”小程序也可
  - text: 云达人
    icon: http://p18.qhimg.com/t011e18028f5c93e2a1.png
    desc: 长安校区东/西区洗澡；APP设置使用码，洗澡无需手机
  - text: 海乐生活
    icon: https://p0.qhimg.com/t0127c180245cf04171.png
    desc: 长安校区公共洗衣机；微信、支付宝小程序
  - text: 企鹅共享APP服务
    icon: https://yyb-community-1258344701.file.myqcloud.com/wx_mini_app_icon/wx52cfa5fc8d32a43d.png
    desc: 雁塔校区公共洗衣机；微信小程序
---

<script setup>
import LinkList from "/.vitepress/components/unique/LinkList.vue";
</script>

# 手机上的 APP 们

## 课堂学习

<LinkList :links="$frontmatter.studyApps" :desc-lines="false" />

## 组织培训

<LinkList :links="$frontmatter.orgApps" :desc-lines="false" />

## 生活

<LinkList :links="$frontmatter.lifeApps" :desc-lines="false" />
