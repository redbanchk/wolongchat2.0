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
2. 在项目根目录创建 `.env.local` 并设置：
   - `VITE_ARK_API_KEY=<你的 Ark API Key>`
   - `VITE_ARK_MODEL_ID=ep-20251117054244-cqwzw`（如需更换模型，填入你的 Model/Endpoint ID）
3. 开发运行：
   `npm run dev`
4. 生产构建与预览：
   - 构建：`npm run build`
   - 预览：`npm run preview`
