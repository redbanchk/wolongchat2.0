<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# 诸葛问策台前端

This contains everything you need to run your app locally.

本项目为纯前端，直接调用火山方舟 Ark Chat Completions 接口。

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. 环境变量：
   - 生产部署（Vercel）：在 Vercel 项目设置添加 `ARK_API_KEY`（密钥，Server Only）与可选 `ARK_MODEL_ID`
   - 本地开发（可选）：在 `.env.local` 设置 `VITE_ARK_API_KEY`（仅本地调试用）、`VITE_ARK_MODEL_ID`
3. 开发运行：
   `npm run dev`
4. 生产构建与预览：
   - 构建：`npm run build`
   - 预览：`npm run preview`

## 架构说明
- 前端通过 `services/arkService.ts` 调用：
  - 生产环境：请求 `/api/chat`（Vercel Serverless Function），服务端读取 `ARK_API_KEY` 调用 Ark API
  - 本地开发：若存在 `VITE_ARK_API_KEY`，则直接调用 Ark API 方便调试
- 服务端函数：`api/chat.ts`，接收 `{messages, system, model}` 并返回 `content`

## Vercel 环境变量配置指南
- 打开 Vercel 项目：`wolongchat2-0`
- Settings → Environment Variables：
  - Key: `ARK_API_KEY`，Value: `<你的 Ark API Key>`，Target: `Production/Preview/Development`
  - 可选 Key: `ARK_MODEL_ID`，Value: `<你的模型ID>`，Target: 同上
- 保存后重新触发部署即可生效（推送到 `main` 会自动部署）。本仓库已连接 GitHub，任何推送都会触发部署。
