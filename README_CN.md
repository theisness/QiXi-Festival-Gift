# 🌹 七夕特别礼物

<div align="center">

[![GitHub stars](https://img.shields.io/github/stars/yourusername/QiXi-Festival-Gift?style=social)](https://github.com/yourusername/QiXi-Festival-Gift/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/yourusername/QiXi-Festival-Gift?style=social)](https://github.com/yourusername/QiXi-Festival-Gift/network/members)
[![GitHub issues](https://img.shields.io/github/issues/yourusername/QiXi-Festival-Gift)](https://github.com/yourusername/QiXi-Festival-Gift/issues)
[![License](https://img.shields.io/github/license/yourusername/QiXi-Festival-Gift)](https://github.com/yourusername/QiXi-Festival-Gift/blob/main/LICENSE)

**一个浪漫的七夕节互动网站，包含爱心收集游戏、音乐播放器和照片轮播**

[🎮 在线体验](https://yourusername.github.io/QiXi-Festival-Gift/) | [📖 中文文档](#中文文档) | [📖 English Docs](README_EN.md)

</div>

---

## 🌟 功能特性

- 💖 **互动爱心收集游戏** - 点击飞舞的爱心，收集浪漫祝福
- 🎵 **背景音乐播放器** - 内置多首浪漫音乐，支持切换和音量控制
- 📸 **自动照片轮播** - 展示美好回忆，支持手动切换
- ✨ **精美动画效果** - 流畅的过渡动画和粒子特效
- 📱 **响应式设计** - 完美适配手机、平板和桌面设备
- 🎨 **浪漫配色方案** - 专为七夕节设计的粉紫色调
- 🌙 **沉浸式体验** - 全屏背景和优雅的UI设计

---

## 🚀 快速开始

### 环境要求

- Node.js (v14 或更高版本)
- npm 或 yarn

### 安装步骤

```bash
# 克隆项目
git clone https://github.com/yourusername/QiXi-Festival-Gift.git

# 进入项目目录
cd QiXi-Festival-Gift

# 安装依赖
npm install

# 构建生产版本
npm run build

# 开发模式（监听文件变化）
npm run dev
```

### 本地运行

```bash
# 启动本地服务器
python -m http.server 8000
# 或者
npx serve .

# 在浏览器中打开
# http://localhost:8000
```

---

## 📁 项目结构

```
QiXi-Festival-Gift/
├── 📁 src/
│   └── input.css          # Tailwind 指令和自定义样式
├── 📁 dist/
│   └── output.css         # 编译后的生产CSS
├── 📁 album/              # 照片库图片
│   ├── 1.jpg ~ 7.jpg      # 轮播图片
├── 📁 music/              # 背景音乐文件
│   ├── 1.mp3 ~ 4.mp3      # 音乐文件
│   └── tap.mp3            # 点击音效
├── 📁 fonts/              # 字体文件
├── index.html             # 主HTML文件
├── game.js                # 游戏逻辑
├── tailwind.config.js     # Tailwind配置
├── package.json           # 依赖和脚本
└── README.md              # 项目文档
```

---

## 🛠️ 技术栈

- **前端框架**: Vanilla JavaScript, HTML5, CSS3
- **样式框架**: Tailwind CSS
- **构建工具**: Tailwind CLI
- **字体**: Dancing Script, Font Awesome
- **动画**: CSS Keyframes, Transitions
- **响应式**: CSS Grid, Flexbox

---

## 🎨 自定义配置

### 修改颜色主题

编辑 `tailwind.config.js` 中的颜色配置：

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        'love-pink': '#ff6b8b',    // 主粉色
        'love-purple': '#c955e8',  // 主紫色
        'love-blue': '#6a8fff',    // 主蓝色
        'love-red': '#ff3366',     // 主红色
      }
    }
  }
}
```

### 替换照片

将您的照片放入 `album/` 目录，命名为 `1.jpg` 到 `7.jpg`

### 替换音乐

将音乐文件放入 `music/` 目录，支持 MP3 格式

### 添加自定义样式

在 `src/input.css` 中添加您的自定义CSS：

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* 您的自定义样式 */
.custom-animation {
  /* 自定义动画 */
}
```

---

## 📱 浏览器支持

| 浏览器 | 版本 |
|--------|------|
| Chrome | ≥ 60 |
| Firefox | ≥ 60 |
| Safari | ≥ 12 |
| Edge | ≥ 79 |

---

## 🚀 部署

### GitHub Pages

1. Fork 这个仓库
2. 在仓库设置中启用 GitHub Pages
3. 选择 `main` 分支作为源
4. 访问 `https://yourusername.github.io/QiXi-Festival-Gift/`

### Netlify

1. 连接您的 GitHub 仓库
2. 设置构建命令：`npm run build`
3. 设置发布目录：`.`
4. 部署！

### Vercel

```bash
npm i -g vercel
vercel --prod
```

---

## 🤝 贡献

欢迎贡献代码！请遵循以下步骤：

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

---

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

---

## 💝 致谢

- 感谢所有为开源社区做出贡献的开发者
- 特别感谢 Tailwind CSS 团队
- 音乐和图片资源来自网络，仅供学习使用

---

## 📞 联系方式

- 作者: Your Name
- 邮箱: your.email@example.com
- 项目链接: [https://github.com/yourusername/QiXi-Festival-Gift](https://github.com/yourusername/QiXi-Festival-Gift)

---

<div align="center">

**如果这个项目对您有帮助，请给它一个 ⭐️**

*Made with ❤️ for Qixi Festival*

</div>