# FrameFlow - Birthday Experience 🎂

An interactive 3D birthday celebration and story experience built with React, Vite, Three.js / React Three Fiber, and Tailwind CSS.
[Click Me](https://frame-flow-sand.vercel.app/)

## 📸 Replacing Photos & Customizing Images

All personal images have been replaced with royalty-free sample images. You can easily customize the images with your own memories:

### Method 1: Drop-in Replacement (Recommended)
Place your own photos into the `public/images/` directory using the existing file names and subfolders:

- `public/images/Main.jpg` - Main cover/featured childhood memory image
- `public/images/MaiNn.jpg` - Additional featured story photo
- `public/images/papa/child/` - Childhood and early memory photos (`one.jpg`, `two.jpg`, `three.JPG`, `four.JPG`, `five.JPG`, `six.JPG`, `seven.JPG`, `Eigth.JPG`, `nine.JPG`)
- `public/images/papa/Add-ons/` - Train & travel journey photos (`one.jpg`, `two.jpg`, `three.JPG`, `Four.jpg`, `20250201_110952.jpg`)
- `public/images/papa/inter/` - Celebration and holiday photos (`one.jpg` to `eleven.jpg`, etc.)
- `public/images/papa/international/` - World travel and scenic landmark photos

### Method 2: Custom Audio & Path Configuration
Create or modify `.env` from [.env.example](file:///.env.example):

```env
VITE_PHOTO_PATH=/images/papa/child/
VITE_PHOTO_PATH1=/images/papa/Add-ons/
VITE_PHOTO_PATH2=/images/papa/inter/
VITE_MUSIC_PATH=/audio/music.mp3
```

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run local dev server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

