/**
 * SparkleFall - Beautiful falling sparkle animations for your website
 * @version 1.0.0
 * @author Theresa Summa
 * @license MIT
 */

class SparkleFall {
  constructor(options = {}) {
    // Default configuration
    this.config = {
      // Container selector or element
      container: document.body,
      
      // Animation settings
      interval: 800, // How often to spawn sparkles (ms)
      duration: 5000, // How long sparkles fall (ms)
      
      // Sparkle appearance
      sparkles: ['✨', '⭐', '💫', '🌟'],
      colors: null, // Use null for emoji colors, or array of colors
      minSize: 10, // Minimum size in pixels
      maxSize: 30, // Maximum size in pixels
      
      // Animation behavior
      minDuration: 2, // Minimum fall duration in seconds
      maxDuration: 5, // Maximum fall duration in seconds
      wind: 0, // Wind effect (-1 to 1)
      spin: true, // Enable rotation
      
      // Performance
      maxSparkles: 50, // Maximum sparkles on screen
      autoStart: true, // Start immediately
      
      // Z-index for sparkle container
      zIndex: 9999,
      
      ...options
    };
    
    this.sparkleContainer = null;
    this.intervalId = null;
    this.sparkleCount = 0;
    this.isRunning = false;
    
    this.init();
  }
  
  init() {
    // Get container element
    if (typeof this.config.container === 'string') {
      this.config.container = document.querySelector(this.config.container);
    }
    
    if (!this.config.container) {
      console.error('SparkleFall: Container element not found');
      return;
    }
    
    // Create sparkle container
    this.createContainer();
    
    // Add styles if not already present
    this.injectStyles();
    
    // Auto start if enabled
    if (this.config.autoStart) {
      this.start();
    }
  }
  
  createContainer() {
    this.sparkleContainer = document.createElement('div');
    this.sparkleContainer.className = 'sparklefall-container';
    this.sparkleContainer.style.zIndex = this.config.zIndex;
    this.config.container.appendChild(this.sparkleContainer);
  }
  
  injectStyles() {
    // Check if styles already exist
    if (document.getElementById('sparklefall-styles')) {
      return;
    }
    
    const styles = `
      .sparklefall-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        overflow: hidden;
      }
      
      .sparklefall-sparkle {
        position: absolute;
        pointer-events: none;
        user-select: none;
        will-change: transform, opacity;
        filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.8));
      }
      
      @keyframes sparklefall-drop {
        to {
          transform: translateY(110vh) translateX(var(--wind-offset)) rotate(var(--rotation));
          opacity: 0;
        }
      }
      
      @keyframes sparklefall-drop-no-spin {
        to {
          transform: translateY(110vh) translateX(var(--wind-offset));
          opacity: 0;
        }
      }
    `;
    
    const styleElement = document.createElement('style');
    styleElement.id = 'sparklefall-styles';
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);
  }
  
  createSparkle() {
    // Check if container exists
    if (!this.sparkleContainer) {
      return;
    }
    
    // Check max sparkles limit
    if (this.sparkleCount >= this.config.maxSparkles) {
      return;
    }
    
    const sparkle = document.createElement('div');
    sparkle.className = 'sparklefall-sparkle';
    
    // Select random sparkle
    const sparkleChar = this.config.sparkles[
      Math.floor(Math.random() * this.config.sparkles.length)
    ];
    sparkle.textContent = sparkleChar;
    
    // Random position
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.top = '-50px';
    
    // Random size
    const size = Math.random() * (this.config.maxSize - this.config.minSize) + this.config.minSize;
    sparkle.style.fontSize = size + 'px';
    
    // Apply color if specified
    if (this.config.colors && this.config.colors.length > 0) {
      const color = this.config.colors[
        Math.floor(Math.random() * this.config.colors.length)
      ];
      sparkle.style.color = color;
    }
    
    // Animation duration
    const duration = Math.random() * 
      (this.config.maxDuration - this.config.minDuration) + 
      this.config.minDuration;
    sparkle.style.animationDuration = duration + 's';
    
    // Animation name based on spin setting
    const animationName = this.config.spin ? 'sparklefall-drop' : 'sparklefall-drop-no-spin';
    sparkle.style.animationName = animationName;
    
    // CSS variables for animation
    const windOffset = this.config.wind * 100 + 'px';
    const rotation = this.config.spin ? (Math.random() * 720 - 360) + 'deg' : '0deg';
    sparkle.style.setProperty('--wind-offset', windOffset);
    sparkle.style.setProperty('--rotation', rotation);
    
    sparkle.style.animationTimingFunction = 'linear';
    sparkle.style.animationFillMode = 'forwards';
    
    this.sparkleContainer.appendChild(sparkle);
    this.sparkleCount++;
    
    // Remove sparkle after animation
    setTimeout(() => {
      sparkle.remove();
      this.sparkleCount--;
    }, duration * 1000);
  }
  
  start() {
    if (this.isRunning) {
      return;
    }
    
    this.isRunning = true;
    
    // Create initial sparkles
    const initialCount = Math.min(5, this.config.maxSparkles);
    for (let i = 0; i < initialCount; i++) {
      setTimeout(() => this.createSparkle(), i * 200);
    }
    
    // Continue creating sparkles at interval
    this.intervalId = setInterval(() => {
      this.createSparkle();
    }, this.config.interval);
  }
  
  stop() {
    if (!this.isRunning) {
      return;
    }
    
    this.isRunning = false;
    
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
  
  clear() {
    this.stop();
    
    // Remove all sparkles
    if (this.sparkleContainer) {
      const sparkles = this.sparkleContainer.querySelectorAll('.sparklefall-sparkle');
      sparkles.forEach(sparkle => sparkle.remove());
    }
    this.sparkleCount = 0;
  }
  
  destroy() {
    this.clear();
    
    // Remove container
    if (this.sparkleContainer) {
      this.sparkleContainer.remove();
      this.sparkleContainer = null;
    }
    
    // Note: We don't remove styles as other instances might be using them
  }
  
  updateConfig(options) {
    this.config = { ...this.config, ...options };
  }
  
  burst(count = 10) {
    // Create a burst of sparkles
    const burstCount = Math.min(count, this.config.maxSparkles - this.sparkleCount);
    for (let i = 0; i < burstCount; i++) {
      setTimeout(() => this.createSparkle(), i * 50);
    }
  }
}

// Export for different module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SparkleFall;
} else if (typeof define === 'function' && define.amd) {
  define(() => SparkleFall);
} else {
  window.SparkleFall = SparkleFall;
}
