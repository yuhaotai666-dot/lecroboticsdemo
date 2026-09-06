# Header 搜索 + 多语言切换方案

在 Header 右侧（Support 按钮旁）新增两个功能：站内搜索弹层、语言切换器（EN / FR / DE / IT / ES）。全站内容翻译为五种语言。

## 1. 站内搜索弹层

- Header 右侧添加放大镜图标按钮，点击展开全宽搜索弹层（位于 Header 下方，白色/毛玻璃背景，与 Mega Menu 同风格）。
- 输入即时筛选，搜索范围：
  - 8 款机器人（名称、分类、一句话定位）→ 跳转产品详情页
  - 10 个行业 → 跳转行业页对应锚点
  - 页面入口（Case Studies、Resources、About、Support、Book a Demo、ROI Calculator）→ 跳转对应页面
- 结果按 Products / Industries / Pages 分组，带产品小图；支持键盘上下选择 + Enter 跳转，Esc 关闭；无结果时显示提示。
- 移动端全屏菜单顶部同样加入搜索框。
- 纯前端实现，数据来自现有 `src/lib/products.ts` 和 `src/lib/nav.ts`，无需后端。

## 2. 多语言（i18n）框架

- 新建 `src/lib/i18n/`：
  - `locales.ts` — 语言列表：English (en)、Français (fr)、Deutsch (de)、Italiano (it)、Español (es)。
  - `translations/<lang>.ts` — 每种语言一个字典文件，key 结构一致。
  - `i18n-context.tsx` — React Context 提供当前语言、`t(key)` 函数、切换方法；选择持久化到 localStorage，默认英文；同步更新 `<html lang>`。
- 翻译文案用 AI 生成初版（机器人/自动化行业术语尽量准确），后续可人工校对替换。

## 3. 全站文案接入翻译

将以下文件中的硬编码英文文案抽取为翻译 key：
- `site-header.tsx`、`site-footer.tsx`、`hero-carousel.tsx`
- 路由页：`index`、`products.index`、`products.$slug`、`industries`、`case-studies`、`resources`、`about`、`support`、`book-a-demo`、`roi`、`videos.$slug`、`solutions`
- 产品数据（`products.ts` 的 blurb/规格描述）和导航菜单（`nav.ts`）也按 key 翻译；型号名（Kleenbot C40 等）不翻译。
- SEO metadata（title/description）同样按语言输出。

## 4. 语言切换器 UI

- Header 右侧（Support 左侧）放 Globe 图标 + 当前语言代码（如 EN），点击展开下拉：五种语言全称，当前语言高亮品牌蓝。
- 风格与现有导航一致：白色面板、细边框、200ms 过渡、无重阴影。
- 移动端菜单底部放语言选择（五行列表）。
- 切换语言即时更新全站文案，不刷新页面。

## Header 右侧最终顺序

`Products … About Us` ｜ 搜索图标 ｜ 语言切换 ｜ Support 按钮 ｜ Book a demo

## 验证

- TypeScript + build 通过；各路由 HTTP 200。
- Playwright 截图验证：搜索弹层交互、语言下拉、切换到法语/德语后页面文案变化、移动端菜单。
- 控制台无错误。

## 说明

- 翻译为 AI 初版，正式发布前建议人工校对专业术语。
- 不改变 URL 结构（不加 /fr/ 前缀），语言为用户偏好设置。
