# Footer 重新设计方案

把现在的简单 4 栏 Footer 重做为一个与 Header 信息架构完全一致的国际机器人品牌风格 Footer：白色/极浅冰蓝背景、深蓝灰文字、细线分隔、充足留白，不使用大面积深色或厚重阴影。

## 1. 共享导航数据

Header 里的菜单数据（`productGroups`、`industryMenu`、`caseMenu`、`resourceMenu`、`aboutMenu`、`supportMenu`）目前写在 `site-header.tsx` 内部。

- 抽出到 `src/lib/nav.ts`，Header 和 Footer 共用同一份数据，保证两边一级架构永远是：Products / Industries / Case Studies / Resources / About Us / Support。
- Footer 链接指向现有路由与锚点：`/products`、`/industries`、`/case-studies`、`/resources`、`/about`、`/support` 及已有 `#` 区块（如 `/support#repair`、`/support#faq`、`/about#contact`、`/resources#downloads`）。

## 2. Footer 结构（Desktop）

```text
┌──────────────────────────────────────────────────────────┐
│ Logo + Subscribe to Our News          [ Enter email → ]  │
├──────────────────────────────────────────────────────────┤
│ Products   Industries  Case Studies  Resources  About  Support │
│ (6 栏等宽，超宽屏一排；较窄屏 3×2)                          │
├──────────────────────────────────────────────────────────┤
│ Social icons (LinkedIn YouTube TikTok Instagram X)        │
├──────────────────────────────────────────────────────────┤
│ © 2026 LEC Robotics        Privacy | Terms | Cookies      │
└──────────────────────────────────────────────────────────┘
```

- **Newsletter 层**：左上是现有文字 Logo（LEC.ROBOTICS），下方标题 “Subscribe to Our News”（20–24px medium，深蓝灰）+ 副文案 “Get product updates, robotics insights and company news.”；右侧是 1px 浅灰蓝边框、圆角 8px、白底的 email 输入框，focus 时品牌蓝细边框，右侧一个箭头按钮（lucide `ArrowRight`）。订阅先只做前端演示（提交后 toast 提示），不接后端。
- **Products 栏**：只列 4 个功能分类（Cleaning / Food Service / Autonomous Delivery / Automated F&B，链接到 `/products` 对应锚点或分类筛选）+ View All Products →，不直接列 8 个型号。
- **Industries 栏**：列前 6 个行业 + View All Industries →（共 10 个行业在 `/industries` 页面完整展示）。
- **Case Studies 栏**：Featured + 5 个行业入口（链接到 `/case-studies` 筛选 hash）+ View All Case Studies。
- **Resources 栏**：News / Events / Insights / Downloads / Product Brochures；Open Platform 隐藏（暂无实际页面）。
- **About Us 栏**：Company / Mission & Vision / Technology & Innovation / Global Presence / Careers / Contact Us。
- **Support 栏**：Service & Support / Online Service Request / Documents & Manuals / Service Plans / FAQ / Contact Support。不编造电话、邮箱、地址、保修或响应时效。
- **Social 图标**：lucide 图标（Linkedin、Youtube、Instagram、X/Twitter、Music2 代替 TikTok 或自绘简单字形），默认深蓝灰，hover 变品牌蓝 + 轻微 scale/opacity 过渡（150–200ms），一律用 `#` 占位 href 并标注 aria-label，不链接到任何真实第三方账号。
- **Bottom bar**：细分隔线，左侧 `© 2026 LEC Robotics. All rights reserved.`，右侧 Privacy Policy / Terms of Use / Cookie Policy（这三个页面暂不存在，先作为占位链接指向 `#`，或如你希望我可以顺手建三个简易法律页面占位——默认先占位）。

## 3. 视觉规范（与 Header 一致）

- 背景：`bg-card`（白色）+ 顶部 1px 细边框；Newsletter 区可用极浅冰蓝底 `bg-catalog`。
- 栏目标题 15–16px medium 深蓝灰；链接 14px regular 蓝灰（`text-muted-foreground`），hover 品牌蓝 `text-primary`。
- 最大宽度与页面内容容器一致（`max-w-6xl` 居中），顶部留白 80px（`pt-20`），栏目间距 ≥48px，链接行距 `space-y-3`，bottom bar 上下 24px。
- 无阴影、无彩色社交图标、无大面积深色块。

## 4. Mobile

单栏布局：Logo → Newsletter → Social 图标，然后 6 个栏目用 Accordion（复用 Header 移动菜单的手风琴模式，点击展开二级链接），最底部依次是 Privacy / Terms / Cookies 和版权行。

## 涉及文件

- 新建 `src/lib/nav.ts`（共享导航数据）
- 重写 `src/components/site-footer.tsx`
- 修改 `src/components/site-header.tsx`（改为从 nav.ts 导入，逻辑不变）
- 不改任何页面内容、路由和业务逻辑

## 验证

- `tsgo` 类型检查 + 构建 build OK
- Playwright 截图桌面（1280px）与移动（390px）Footer，确认多栏对齐、手风琴展开、hover 颜色、无横向溢出
