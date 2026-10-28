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
