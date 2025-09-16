# ✨ SparkleFall

Beautiful, customizable falling sparkle animations for your website. Zero dependencies, easy to use, and fully customizable.

![npm version](https://img.shields.io/npm/v/sparklefall.svg)
![license](https://img.shields.io/npm/l/sparklefall.svg)
![size](https://img.shields.io/bundlephobia/minzip/sparklefall.svg)

## ✨ Features

- 🎨 **Fully Customizable** - Control colors, sizes, speed, and more
- 🚀 **Zero Dependencies** - Pure vanilla JavaScript, no frameworks needed
- 📦 **Tiny Size** - Less than 3KB minified and gzipped
- 🎯 **Simple API** - Get started with just one line of code
- 📱 **Mobile Friendly** - Optimized performance on all devices
- 🔧 **TypeScript Support** - Full type definitions included
- 🌈 **Multiple Effects** - Wind, spin, burst modes and more

## 📦 Installation

### NPM
```bash
npm install sparklefall
```

### Yarn
```bash
yarn add sparklefall
```

### CDN
```html
<!-- Latest version -->
<script src="https://unpkg.com/sparklefall/dist/sparklefall.min.js"></script>

<!-- Specific version -->
<script src="https://unpkg.com/sparklefall@1.0.0/dist/sparklefall.min.js"></script>
```

## 🚀 Quick Start

### Basic Usage

```javascript
// ES6 Modules
import SparkleFall from 'sparklefall';

// CommonJS
const SparkleFall = require('sparklefall');

// Create sparkles with default settings
const sparkles = new SparkleFall();
```

### HTML Script Tag
```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://unpkg.com/sparklefall/dist/sparklefall.min.js"></script>
</head>
<body>
  <script>
    // SparkleFall is available globally
    const sparkles = new SparkleFall();
  </script>
</body>
</html>
```

## ⚙️ Configuration

### All Options

```javascript
const sparkles = new SparkleFall({
  // Container
  container: document.body,     // Element or selector for sparkle container
  
  // Timing
  interval: 800,                // Time between new sparkles (ms)
  duration: 5000,               // How long sparkles remain visible (ms)
  
  // Appearance
  sparkles: ['✨', '⭐', '💫', '🌟'],  // Array of sparkle characters
  colors: null,                 // null for emoji colors, or ['#FFD700', '#FFF']
  minSize: 10,                  // Minimum sparkle size (px)
  maxSize: 30,                  // Maximum sparkle size (px)
  
  // Animation
  minDuration: 2,               // Minimum fall time (seconds)
  maxDuration: 5,               // Maximum fall time (seconds)
  wind: 0,                      // Wind effect (-1 to 1)
  spin: true,                   // Enable rotation
  
  // Performance
  maxSparkles: 50,              // Max sparkles on screen
  autoStart: true,              // Start automatically
  zIndex: 9999                  // Z-index of sparkle container
});
```

## 🎨 Examples

### Custom Colors
```javascript
const goldSparkles = new SparkleFall({
  colors: ['#FFD700', '#FFA500', '#FF8C00'],
  sparkles: ['●', '◆', '■', '▲'],
  minSize: 8,
  maxSize: 20
});
```

### Holiday Theme
```javascript
const holidaySparkles = new SparkleFall({
  sparkles: ['❄️', '🎄', '🎅', '🎁', '⭐'],
  interval: 600,
  wind: 0.3,
  spin: true
});
```

### Fast and Minimal
```javascript
const minimalSparkles = new SparkleFall({
  sparkles: ['·'],
  colors: ['rgba(255,255,255,0.8)'],
  minSize: 2,
  maxSize: 4,
  interval: 100,
  minDuration: 1,
  maxDuration: 2,
  maxSparkles: 100
});
```

### Wind Effect
```javascript
const windySparkles = new SparkleFall({
  wind: 0.5,  // Blow right
  spin: true,
  minDuration: 3,
  maxDuration: 6
});
```

## 🎮 API Methods

### start()
Start the sparkle animation
```javascript
sparkles.start();
```

### stop()
Stop creating new sparkles (existing ones continue falling)
```javascript
sparkles.stop();
```

### clear()
Remove all sparkles immediately
```javascript
sparkles.clear();
```

### burst(count)
Create a burst of sparkles
```javascript
sparkles.burst(20); // Create 20 sparkles instantly
```

### updateConfig(options)
Update configuration on the fly
```javascript
sparkles.updateConfig({
  colors: ['#FF0000', '#00FF00', '#0000FF'],
  wind: 0.5
});
```

### destroy()
Clean up and remove the instance
```javascript
sparkles.destroy();
```

## 🎯 Use Cases

### Page Load Celebration
```javascript
// Sparkles for 5 seconds on page load
const celebration = new SparkleFall();
setTimeout(() => celebration.destroy(), 5000);
```

### Button Click Effect
```javascript
document.querySelector('#special-button').addEventListener('click', () => {
  const sparkles = new SparkleFall({
    container: '#special-button',
    maxSparkles: 30
  });
  sparkles.burst(30);
  setTimeout(() => sparkles.destroy(), 3000);
});
```

### Scroll Triggered
```javascript
let sparkles;
window.addEventListener('scroll', () => {
  if (window.scrollY > 500 && !sparkles) {
    sparkles = new SparkleFall();
  }
});
```

### Interactive Following
```javascript
document.addEventListener('mousemove', (e) => {
  const sparkle = new SparkleFall({
    container: document.body,
    maxSparkles: 5,
    interval: 100
  });
  
  // Position sparkles at cursor
  sparkle.sparkleContainer.style.left = e.clientX + 'px';
  sparkle.sparkleContainer.style.top = e.clientY + 'px';
  sparkle.sparkleContainer.style.width = '10px';
  sparkle.sparkleContainer.style.height = '10px';
  
  sparkle.burst(1);
  setTimeout(() => sparkle.destroy(), 1000);
});
```

## 🌐 React Component Example

```jsx
import React, { useEffect, useRef } from 'react';
import SparkleFall from 'sparklefall';

const SparkleContainer = ({ children, ...options }) => {
  const containerRef = useRef(null);
  const sparklesRef = useRef(null);
  
  useEffect(() => {
    if (containerRef.current) {
      sparklesRef.current = new SparkleFall({
        container: containerRef.current,
        ...options
      });
    }
    
    return () => {
      if (sparklesRef.current) {
        sparklesRef.current.destroy();
      }
    };
  }, []);
  
  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      {children}
    </div>
  );
};

// Usage
<SparkleContainer 
  sparkles={['🌟', '✨']}
  interval={500}
  maxSparkles={30}
>
  <h1>Sparkly Content!</h1>
</SparkleContainer>
```

## 🎭 Vue Component Example

```vue
<template>
  <div ref="sparkleContainer">
    <slot></slot>
  </div>
</template>

<script>
import SparkleFall from 'sparklefall';

export default {
  props: {
    options: {
      type: Object,
      default: () => ({})
    }
  },
  mounted() {
    this.sparkles = new SparkleFall({
      container: this.$refs.sparkleContainer,
      ...this.options
    });
  },
  beforeDestroy() {
    if (this.sparkles) {
      this.sparkles.destroy();
    }
  }
};
</script>
```

## 📊 Performance Tips

1. **Limit Max Sparkles**: Keep `maxSparkles` under 100 for smooth performance
2. **Adjust Interval**: Higher interval values = fewer sparkles = better performance
3. **Container Size**: Smaller containers need fewer sparkles
4. **Mobile**: Consider reducing sparkles on mobile devices

```javascript
const isMobile = window.innerWidth < 768;
const sparkles = new SparkleFall({
  maxSparkles: isMobile ? 20 : 50,
  interval: isMobile ? 1200 : 800
});
```

## 🔧 Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+
- iOS Safari 12+
- Chrome for Android

## 📝 License

MIT License - feel free to use in personal and commercial projects.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🐛 Issues

Found a bug? Please [create an issue](https://github.com/yourusername/sparklefall/issues) with a description and steps to reproduce.

## 💖 Support

If you like this project, please consider:
- ⭐ Starring the repository
- 🐦 Sharing on social media
- ☕ [Buying me a coffee](https://buymeacoffee.com/yourusername)

## 🚀 Roadmap

- [ ] Custom SVG shapes support
- [ ] Particle physics mode
- [ ] 3D rotation effects
- [ ] Performance mode for low-end devices
- [ ] Accessibility options
- [ ] Canvas rendering mode
- [ ] WebGL rendering mode

---

Made with ✨ by [Your Name](https://github.com/yourusername)