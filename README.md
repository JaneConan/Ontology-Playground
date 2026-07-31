# Ontology Playground 本体学习实训平台

> 说明：本项目使用 AI 辅助编程开发。

一个免费、开源、纯静态的前端应用，用于**学习、探索、设计、分享本体（Ontology）**。它可以把任意本体渲染成交互式知识图谱，内置精选的领域本体目录、可视化设计器、引导式学习课堂、游戏化闯关任务，以及自然语言查询演练场——全部在客户端运行，无需后端服务器。

**多端适配**：已打包为 HarmonyOS 原生应用，完美运行在 **手机、平板、PC 2-in-1、折叠屏** 等多种设备形态上，并针对折叠屏做了专门的响应式布局（展开/折叠、横竖屏自适应）。

## 下载与安装

- 在 **华为应用市场** 搜索「Ontology Playground」即可下载安装；
- 或点击应用详情页直接获取：

  👉 https://appgallery.huawei.com/app/detail?id=com.janeconan.ontologyplayground&channelId=SHARE&source=appshare

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## 核心功能

### 交互式图谱探索
基于 Cytoscape.js 的力导向图，把任意本体渲染成「实体—关系」节点图：实体类型即节点，属性与关系即连线。支持平移、缩放、点击节点在侧边检视器中查看其属性与关系，并用实时搜索栏过滤实体与关系。

### 本体目录
精选的官方与社区本体库，覆盖零售、电商、医疗、金融、制造、教育、食品等多个领域。可按分类浏览、按名称或标签搜索，一键把任意本体载入工作区，并查看其 RDF 源。每个本体都有可分享的深层链接（如 `/#/catalogue/official/cosmic-coffee`）。

### 可视化本体设计器
全屏分栏编辑器，可从零创建或编辑现有本体。为实体类型添加图标、颜色、类型化属性；定义带基数的关系；实时图谱预览随输入即时更新。支持撤销/重做（50 级）、实时校验，并导出为 RDF/XML 或 JSON。提供多个领域的起步模板，免去面对空白画布的困扰。

### RDF 导入与导出
完整支持 RDF/XML 往返（OWL 类、数据类型属性、对象属性及基数）。可导入 `.rdf` / `.owl` 文件，导出为标准 RDF/XML，并通过自动化往返测试校验保真度。

### 一键贡献本体
（可选）通过 GitHub 设备流登录后，可直接从设计器把你的本体提交到社区目录——应用会 fork 仓库、创建分支、提交 RDF 与元数据，并自动发起 Pull Request。

### 可嵌入组件
一段自包含的脚本，用单个 `<script>` 标签即可在任何网页上渲染交互式本体查看器。支持深色/浅色主题、多种加载方式（目录 ID、URL、内联 base64）、点击检视。详见 `docs/embed-guide.md`。

### 本体课堂（Ontology School）
结构化的学习中心（`/#/learn`），包含概念课程与领域实操学习路径。文章支持演示模式（`##` 标题分页）、即时反馈的互动测验。本体嵌入会从目录加载实时图谱，并支持差异高亮。

### 闯关任务系统
渐进式任务，用多步指引、提示、进度条与成就徽章引导用户理解本体概念。任务按当前载入的本体**动态生成**，叙事永远引用该本体真实的实体与关系。

### 自然语言查询演练场
输入自然语言问题（如「哪些客户下过订单？」），通过内置查询引擎查看它如何映射到本体的实体与关系。

### 命令面板与快捷键
按 `⌘K` / `Ctrl+K` 打开可搜索命令面板，无需离开键盘即可跳转到目录、设计器、课堂、导入导出、帮助等。按 `?` 查看快捷帮助。

### 新手引导
首次访问者会获得聚光灯式引导，高亮头部、图谱、任务、检视器、设计器，可勾选「不再显示」并持久化到 `localStorage`。

### 深层链接与路由
采用客户端 hash 路由，每个页面都有可分享的 URL：

| 路由 | 页面 |
|-------|------|
| `/#/` | 首页（默认本体） |
| `/#/catalogue` | 本体目录 |
| `/#/catalogue/<source>/<slug>` | 指定本体 |
| `/#/designer` | 可视化设计器 |
| `/#/designer/<source>/<slug>` | 预载某目录本体的设计器 |
| `/#/learn` | 本体课堂——课程总览 |
| `/#/learn/<course>` | 课程详情 |
| `/#/learn/<course>/<article>` | 文章视图（演示模式） |

### 国际化
界面提供**英文与简体中文（`zh-CN`）**两种语言。语言根据浏览器自动检测，并持久化到 `localStorage` 的 `op-lang` 键。翻译目录位于 `src/i18n/locales`（`en.ts`、`zh-CN.ts`）。

## 实训案例（内置本体目录）

平台内置丰富的示例本体，覆盖多个行业，可作为学习本体的真实案例：

**官方精选案例**

| 案例 | 领域 | 简介 |
|------|------|------|
| Fourth Coffee | 零售 · 咖啡 | 现代咖啡连锁，含供应商、商品、门店、客户与订单 |
| E-Commerce Platform | 电商 | 线上零售，含买家、商品、购物车、订单与评论 |
| Banking & Finance | 金融 | 金融服务，含账户、交易、贷款与投资 |
| Healthcare System | 医疗 | 患者诊疗，含医生、预约、诊断与处方 |
| Smart Manufacturing | 制造 | 智能制造，含机器、传感器、工单与质检 |
| University System | 教育 | 高校，含学生、教授、课程与院系 |
| Zava Grove-to-Shelf | 食品供应链 | 从种植到货架的全链路，含多源采购、四段质检、冷链物流 |

**社区贡献案例（节选）**：大学选课、预防式健康、邮轮运营、IT 事件管理、DevOps 价值流、销售分析、服务订单管理、人力资源、供应链风险传播、Discord 社区、婴儿日常记录等。

**外部参考本体**：FIBO（金融行业标准本体）、Schema.org（CreativeWork / Event / LocalBusiness / MedicalEntity）、Pizza（OWL 教学经典）等。

## 技术架构

- **框架**：React 19 + TypeScript 5，使用 Vite 8 构建。
- **状态管理**：Zustand（`src/store`）管理应用态与设计器态。
- **图谱渲染**：Cytoscape.js + `cytoscape-fcose` 布局引擎。
- **动画**：Framer Motion。
- **国际化**：`react-i18next` + `i18next-browser-languagedetector`。
- **内容渲染**：`sanitize-html` + `marked` 安全渲染学习内容。
- **图标**：`lucide-react`。
- **可选后端**：`api/` 下的云函数（`generate-ontology`、`github-oauth-proxy`）支撑 AI 构建器与一键 GitHub 目录 PR。Web 应用本身**无需后端**即可运行。
- **测试**：Vitest（单元 + 组件测试，位于 `src/**/*.test.ts(x)`）。

### 目录结构

```
Ontology-Playground/
├── src/
│   ├── components/       # React 组件（图谱、设计器、弹窗、课堂、面板）
│   ├── data/             # 本体模型、查询引擎、任务与目录翻译
│   ├── lib/              # 路由、RDF 解析/序列化、目录工具
│   ├── store/            # Zustand 状态（应用态、设计器态）
│   ├── i18n/             # 国际化配置与语言包（en、zh-CN）
│   ├── hooks/            # 自定义 React Hook
│   ├── styles/           # 样式（深色/浅色主题）
│   ├── types/            # TypeScript 类型定义
│   └── test/             # 测试工具
├── catalogue/            # 官方 + 社区本体 RDF 文件（official/、community/、external/）
├── content/learn/        # 课程目录，含 Markdown 文章、测验与元数据
├── scripts/              # 构建期编译器（目录、学习内容）
├── api/                  # 云函数后端（可选）
├── docs/                 # 指南与文档
├── public/               # 静态资源（编译后的 catalogue.json、og-image）
└── .github/workflows/    # CI/CD 流水线
```

## 构建与运行

### 环境要求

- Node.js 22.x
- npm 9+

### 安装

```bash
npm install
```

### 开发

```bash
npm run dev        # 启动 Vite 开发服务器 → http://localhost:5173
```

### 构建变体

```bash
npm run build           # Web 构建（编译目录与学习内容、类型检查、打包、构建嵌入组件）→ build/
npm run build:harmony   # 面向 HarmonyOS ArkWeb 壳的单文件离线构建 → build/index.html
npm run build:embed     # 构建独立的可嵌入组件
npm test                # 单次运行测试（vitest）
npm run lint            # eslint
```

### 鸿蒙 / 离线模式

`npm run build:harmony` 会产出一个**完全自包含的 `index.html`**：所有 JS、CSS、字体均内联，并把 `catalogue.json` / `learn.json` 数据通过 `window.fetch` 垫片注入，使该包可以被 ArkWeb 的 `rawfile` 加载，**无任何网络请求或子资源请求**。学习内容中的外链会在构建期被剥离，确保离线包永远不会因为点击链接而跳出应用。这正是 HarmonyOS 原生壳所加载的包。

### 环境变量

| 变量 | 默认值 | 说明 |
|------|--------|------|
| `VITE_ENABLE_AI_BUILDER` | `false` | 启用 AI 本体构建器 |
| `VITE_ENABLE_LEGACY_FORMATS` | `false` | 启用 JSON/YAML/CSV 导入导出 |
| `VITE_BASE_PATH` | `/` | 基路径（GitHub Pages 部署时自动设置） |
| `VITE_GITHUB_CLIENT_ID` | *(空)* | 用于目录 PR 的 GitHub OAuth 客户端 ID |
| `VITE_GITHUB_OAUTH_BASE` | *(空)* | GitHub Pages 部署的外部 OAuth 代理地址 |

## 部署

仓库内置 GitHub Actions 流水线，可部署到 Azure Static Web Apps 与 GitHub Pages。详见 `.github/workflows/`。

## 文档

`docs/` 目录下提供了创作指南、贡献流程、嵌入指南、GitHub OAuth 配置、学习内容指南与主题指南。

## 许可证

基于 MIT 许可证开源，详见 [LICENSE](LICENSE) 文件。
