# 战争情报雷达仪表盘（GitHub Pages 可上线版）

这是一个静态网页项目，适合直接部署到 GitHub Pages。

## 目录结构

- `index.html`：主页面
- `css/styles.css`：样式文件
- `js/app.js`：读取数据并渲染页面
- `data/latest.json`：你日常更新的核心数据文件
- `.github/workflows/pages.yml`：自动部署 GitHub Pages 的工作流
- `.github/workflows/validate-data.yml`：每天自动校验 JSON 是否格式正常

## 最快上线步骤

### 1. 新建 GitHub 仓库
仓库名可用：`war-radar-dashboard`

### 2. 上传全部文件
把本文件夹中的全部内容上传到仓库根目录。

### 3. 打开 GitHub Pages
进入仓库：
`Settings → Pages → Build and deployment → Source 选择 GitHub Actions`

### 4. 首次提交后自动生成网页
推送一次代码后，GitHub Actions 会自动部署。

部署成功后，访问地址通常是：
`https://你的GitHub用户名.github.io/仓库名/`

---

## 日常更新方法（最简单）

你只需要改一个文件：

`data/latest.json`

例如：
- `snapshot_date` 改成最新日期
- `risk_score` 改成新的战争指数
- `brent.price`、`gold.price` 改成最新价格
- `alerts` 更新成新的 48 小时预警信号

改完后提交到 GitHub，网页就会自动刷新。

---

## 推荐更新节奏

### 每日必更
- 日期
- 风险指数
- 油价
- 黄金
- 黑天鹅概率

### 事件驱动更新
- 美军增兵 / 航母进入关键海域
- 霍尔木兹、红海、阿曼湾航运异常
- 伊朗、以色列重大空袭
- 油田、港口、核设施遭袭

---

## 自动更新的现实说明

这个版本已经支持“自动部署”，但不包含“自动抓取新闻和自动研判”。
原因是：
- 自动抓取涉及新闻源 API 或网页抓取
- 自动判断战争风险指数需要额外规则引擎或模型

因此最稳妥的做法是：
1. 你手动更新 `data/latest.json`
2. GitHub 自动重新部署

如果你后续要升级，可以做成：
- 接入 News API / GDELT / RSS
- 用 GitHub Actions 定时拉取数据
- 自动生成 `latest.json`

---

## 你下一步可以怎么用

### 方案 A：纯手动但最稳
适合先快速上线。

### 方案 B：半自动
让 GitHub Actions 每天运行脚本，自动更新部分市场价格。

### 方案 C：全自动情报版
接入外部 API，自动更新新闻、价格和事件标签。

