# 🌹 Qixi Festival Gift

<div align="center">

[![GitHub stars](https://img.shields.io/github/stars/yourusername/QiXi-Festival-Gift?style=social)](https://github.com/yourusername/QiXi-Festival-Gift/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/yourusername/QiXi-Festival-Gift?style=social)](https://github.com/yourusername/QiXi-Festival-Gift/network/members)
[![GitHub issues](https://img.shields.io/github/issues/yourusername/QiXi-Festival-Gift)](https://github.com/yourusername/QiXi-Festival-Gift/issues)
[![License](https://img.shields.io/github/license/yourusername/QiXi-Festival-Gift)](https://github.com/yourusername/QiXi-Festival-Gift/blob/main/LICENSE)

**A romantic interactive website for Qixi Festival with heart-catching game, music player, and photo carousel**

[🎮 Live Demo](https://yourusername.github.io/QiXi-Festival-Gift/) | [📖 中文文档](README.md) | [📖 English Docs](#english-documentation)

</div>

---

## 🌟 Features

- 💖 **Interactive Heart-Catching Game** - Click flying hearts to collect romantic blessings
- 🎵 **Background Music Player** - Built-in romantic music with playback controls and volume adjustment
- 📸 **Automatic Photo Carousel** - Showcase beautiful memories with manual navigation support
- ✨ **Beautiful Animations** - Smooth transitions and particle effects throughout the experience
- 📱 **Responsive Design** - Perfect adaptation for mobile, tablet, and desktop devices
- 🎨 **Romantic Color Scheme** - Pink and purple theme specially designed for Qixi Festival
- 🌙 **Immersive Experience** - Full-screen background with elegant UI design

---

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/QiXi-Festival-Gift.git

# Navigate to project directory
cd QiXi-Festival-Gift

# Install dependencies
npm install

# Build for production
npm run build

# Development mode (watch for changes)
npm run dev
```

### Local Development

```bash
# Start local server
python -m http.server 8000
# Or
npx serve .

# Open in browser
# http://localhost:8000
```

---

## 📁 Project Structure

```
QiXi-Festival-Gift/
├── 📁 src/
│   └── input.css          # Tailwind directives and custom CSS
├── 📁 dist/
│   └── output.css         # Compiled production CSS
├── 📁 album/              # Photo gallery images
│   ├── 1.jpg ~ 7.jpg      # Carousel images
├── 📁 music/              # Background music files
│   ├── 1.mp3 ~ 4.mp3      # Music files
│   └── tap.mp3            # Click sound effect
├── 📁 fonts/              # Font files
├── index.html             # Main HTML file
├── game.js                # Game logic
├── tailwind.config.js     # Tailwind configuration
├── package.json           # Dependencies and scripts
└── README.md              # Project documentation
```

---

## 🛠️ Tech Stack

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Styling**: Tailwind CSS
- **Build Tool**: Tailwind CLI
- **Fonts**: Dancing Script, Font Awesome
- **Animations**: CSS Keyframes, Transitions
- **Responsive**: CSS Grid, Flexbox

---

## 🎨 Customization

### Modify Color Theme

Edit color configuration in `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        'love-pink': '#ff6b8b',    // Primary pink
        'love-purple': '#c955e8',  // Primary purple
        'love-blue': '#6a8fff',    // Primary blue
        'love-red': '#ff3366',     // Primary red
      }
    }
  }
}
```

### Replace Photos

Place your photos in the `album/` directory, named `1.jpg` to `7.jpg`

### Replace Music

Place music files in the `music/` directory, MP3 format supported

### Add Custom Styles

Add your custom CSS in `src/input.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Your custom styles */
.custom-animation {
  /* Custom animation */
}
```

---

## 📱 Browser Support

| Browser | Version |
|---------|--------|
| Chrome  | ≥ 60   |
| Firefox | ≥ 60   |
| Safari  | ≥ 12   |
| Edge    | ≥ 79   |

---

## 🚀 Deployment

### GitHub Pages

1. Fork this repository
2. Enable GitHub Pages in repository settings
3. Select `main` branch as source
4. Visit `https://yourusername.github.io/QiXi-Festival-Gift/`

### Netlify

1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `.`
4. Deploy!

### Vercel

```bash
npm i -g vercel
vercel --prod
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

---

## 💝 Acknowledgments

- Thanks to all developers who contribute to the open source community
- Special thanks to the Tailwind CSS team
- Music and image resources are from the internet, for learning purposes only

---

## 📞 Contact

- Author: Your Name
- Email: your.email@example.com
- Project Link: [https://github.com/yourusername/QiXi-Festival-Gift](https://github.com/yourusername/QiXi-Festival-Gift)

---

<div align="center">

**If this project helps you, please give it a ⭐️**

*Made with ❤️ for Qixi Festival*

</div>