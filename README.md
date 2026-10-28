# 西邮 Wiki | XUPT Wiki

西邮 Wiki 是由西邮 Wiki 项目组编撰的西安邮电大学第三方公益校园生活百科。

[访问在线版 wiki.cooo.site](https://wiki.cooo.site)。

## 加入我们

项目组 QQ 群：924632788

## 贡献指南

阅读[在线版](https://wiki.cooo.site/contributing)或仓库内[源文档](/docs/contributing.md)。

## 更新日志

阅读[在线版](https://wiki.cooo.site/changelog)或仓库内[源文档](/docs/changelog.md)。

## 本地运行/部署

项目采用 VitePress 构建。

### 安装依赖

```sh
pnpm i
```

### 本地测试

```sh
pnpm run dev
```

### 推送

提交 Pull Request。


### 文章索引与搜索

`/articles` 在构建时汇总文章，支持标题、分类、标签筛选和卡片／列表切换；首页展示最近更新的 5 篇。

- 标题优先读取 frontmatter `title`，其次读取正文一级标题；分类按目录映射。
- `author` 沿用成员 ID 数组，`tags` 可填写字符串数组，`description` 可补充卡片简介；`article: false` 可排除汇总页面。
- 更新日期优先使用 `updated`，否则读取 Git 最后提交时间；群、实验室和博客页面同时计算对应 JSON 文件。作者署名不代表最后修改者。
- 构建环境应提供完整 Git 历史；日期无法取得时留空，不使用构建当天日期。批量格式调整也会影响 Git 日期，需要保持内容日期时可显式填写 `updated`。
- 搜索使用 VitePress 本地索引和中文分词，支持正文高亮。群、实验室、博客卡片由 `search.ts` 补充索引，并通过稳定锚点定位；修改卡片字段时同步检查 `SearchExcerpt` 的摘要内容。
- `search: false` 可排除搜索；搜索弹窗会记住用户的正文摘要显示偏好。

验证命令：`pnpm build`。


### 代码与样式检查

统一使用 `pnpm lint` 检查、`pnpm lint:fix` 自动修复。ESLint 同时处理独立 CSS 和 Vue 的 `<style>`，不再需要 Stylelint 扩展；项目 VS Code 设置使用 ESLint 格式化与保存时修复。CSS 使用 Tab 缩进和小写十六进制色值。

### 校园地图

`/campus/map` 使用本地 SVG 校园示意图，将长安校区东西区放在同一张地图中，雁塔校区独立展示。用矩形表达楼栋、体育场地，以路径绘制湖泊轮廓及道路。支持校区切换、分类、搜索、点击详情、拖动、滚轮/双指缩放、键盘操作和地点分享；无需外部地图服务、API Key、地图图片或额外依赖。

- 地图占满顶部导航以外的可用屏幕，校区、搜索、分类和地点详情在图内操作。页面使用 `layout: page`，关闭文档侧栏、文章信息和页脚。
- 数据：`docs/.vitepress/data/campus-map.ts`。长安（`changan`）、雁塔（`yanta`）两个地图视图，共 117 个地点、96 个矩形；建筑通过 `poiId` 关联地点。
- `width` / `height` 定义 SVG 绘图范围；`x` / `y` 为绘图单位，描述简化的相对位置，不是经纬度。修改楼栋范围时同步调整地点中心。
- 湖泊轮廓使用 `zones` 中 `kind: 'water'` 的闭合 SVG 路径，关联播云湖地点；轮廓概括参考图中的岸线。
- 每个地点使用完整 `name` 显示一次标签，在各缩放级别持续显示。窄屏全览按密度缩小字号，放大后逐步增大；发生文字碰撞时优先缩字并微调位置，必要时寻找邻近空位，避免标签重叠。允许文字溢出楼栋范围，不截断行数。筛选时只淡化未匹配地点及文字，保留空间参照。
- `major` 只影响字号与排版，不影响标签可见性；`label` 字段保留，目前不参与显示。标签独立绘制在建筑上层，通过换行、位置微调及引线减少遮挡。
- 保留稳定地点 `id`，并兼容合并前的 `?area=changan-west&focus=changan-west-18` 等东西区地点链接。
- 东区家属院按 1–14 号楼分别标注，13、14 号楼属于 E 段教工公寓，分类为宿舍公寓。楼号排列依据仓库已有的 `docs/public/xupt-map-changan.drawio`；E 段用途由[学校基建处](https://jijian.xupt.edu.cn/)说明核对。`campusPoiAliases` 兼容拆分前的 E 段、教师公寓整体地点链接。
- 名称与布局参考 PR #7 固定提交 `4c880f7736cca10453fe103272649dcc28d041af` 的 `docs/campus/1.jpg`（雁塔）、`2.jpg`（长安西区）、`3.jpg`（长安东区）。图片不放入仓库，布局由矩形和少量主路重新绘制，历史/建设状态需另行核实。

维护后运行 `pnpm lint` 和 `pnpm build`，并检查校区切换、东西区旧链接、湖泊轮廓、移动端全览与放大后的完整标签。
